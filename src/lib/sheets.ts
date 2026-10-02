import { google } from "googleapis";

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}");
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;

/** Map pass name to the correct sheet tab */
function getTabName(passName: string): string {
  const normalized = (passName || "").trim().toUpperCase();
  if (normalized === "NON-ATRIANS") return "Non-atrians";
  return "Atrians"; // fallback
}

export async function appendRegistration(data: {
  registrationId: string;
  timestamp: string;
  pass: string;
  teamName: string;
  teamLeaderName: string;
  contactNumber: string;
  email: string;
  collegeName: string;
  teamSize: number;
  members: string[];
  amount: number;
  currency: string;
  paymentStatus: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  registrationStatus: string;
}) {
  const sheets = getSheets();
  const members = [...data.members];
  while (members.length < 4) members.push("");

  const tab = getTabName(data.pass);

  const row = [
    data.registrationId,
    data.timestamp,
    data.pass,
    data.teamName,
    data.teamLeaderName,
    data.contactNumber,
    data.email,
    data.collegeName,
    data.teamSize,
    members[0],
    members[1],
    members[2],
    members[3],
    data.amount,
    data.currency,
    data.paymentStatus,
    data.razorpayOrderId,
    data.razorpayPaymentId,
    data.razorpaySignature,
    data.registrationStatus,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A:T`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export async function updatePaymentStatus(
  razorpayOrderId: string,
  paymentStatus: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  registrationStatus: string
) {
  const sheets = getSheets();

  // Search both tabs for the order ID
  for (const tab of ["Atrians", "Non-atrians"]) {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${tab}!Q:Q`,
      });

      const rows = response.data.values || [];
      let rowIndex = -1;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i]?.[0] === razorpayOrderId) {
          rowIndex = i + 1;
          break;
        }
      }

      if (rowIndex === -1) continue;

      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${tab}!P${rowIndex}:T${rowIndex}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[paymentStatus, razorpayOrderId, razorpayPaymentId, razorpaySignature, registrationStatus]],
        },
      });
      invalidateRegistrationCountCache();
      return; // Found and updated
    } catch (err) {
      console.error(`Error searching tab ${tab}:`, err);
    }
  }
}

let cachedTeamCount: number | null = null;
let lastCacheTimestamp = 0;
const CACHE_TTL_MS = 15_000; // 15 seconds

export function invalidateRegistrationCountCache() {
  cachedTeamCount = null;
  lastCacheTimestamp = 0;
}

/**
 * Counts total confirmed/paid teams across both Atrians and Non-atrians tabs.
 */
export async function getRegisteredTeamsCount(forceRefresh = false): Promise<number> {
  const now = Date.now();
  if (!forceRefresh && cachedTeamCount !== null && (now - lastCacheTimestamp) < CACHE_TTL_MS) {
    return cachedTeamCount;
  }

  // Support environment variable override for manual control / testing
  if (process.env.EARLY_BIRD_COUNT_OVERRIDE !== undefined) {
    const override = parseInt(process.env.EARLY_BIRD_COUNT_OVERRIDE, 10);
    if (!isNaN(override)) {
      cachedTeamCount = override;
      lastCacheTimestamp = now;
      return override;
    }
  }

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !process.env.GOOGLE_SHEETS_ID) {
    return 0;
  }

  try {
    const sheets = getSheets();
    let totalCount = 0;

    for (const tab of ["Atrians", "Non-atrians"]) {
      try {
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_ID,
          range: `${tab}!A2:T`,
        });

        const rows = response.data.values || [];
        for (const row of rows) {
          // Col P (index 15) is paymentStatus, Col T (index 19) is registrationStatus
          const paymentStatus = (row[15] || "").toString().trim().toUpperCase();
          const registrationStatus = (row[19] || "").toString().trim().toUpperCase();
          if (paymentStatus === "PAID" || registrationStatus === "CONFIRMED") {
            totalCount++;
          }
        }
      } catch (tabErr) {
        console.error(`Error reading tab ${tab} for team count:`, tabErr);
      }
    }

    cachedTeamCount = totalCount;
    lastCacheTimestamp = now;
    return totalCount;
  } catch (err) {
    console.error("Error calculating registered teams count:", err);
    return cachedTeamCount ?? 0;
  }
}
