import { NextRequest, NextResponse } from "next/server";
import { getPass, getPrice, calculateTeamPrice, MIN_TEAM_SIZE, MAX_TEAM_SIZE, ACTIVE_SLAB } from "@/lib/passes";
import type { MemberAffiliation, PassId } from "@/lib/passes";
import { getRazorpayInstance, generateRegistrationId } from "@/lib/razorpay";
import { appendRegistration } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passId, teamName, teamLeaderName, contactNumber, email, collegeName, members, memberAffiliations } = body;

    const slab = ACTIVE_SLAB;

    const pass = getPass(passId, slab);
    if (!pass) {
      return NextResponse.json({ error: "Invalid pass selected." }, { status: 400 });
    }

    if (!teamName?.trim()) return NextResponse.json({ error: "Team name is required." }, { status: 400 });
    if (!teamLeaderName?.trim()) return NextResponse.json({ error: "Team leader name is required." }, { status: 400 });
    if (!contactNumber?.trim()) return NextResponse.json({ error: "Contact number is required." }, { status: 400 });
    if (!email?.trim()) return NextResponse.json({ error: "Email is required." }, { status: 400 });
    if (!collegeName?.trim()) return NextResponse.json({ error: "College name is required." }, { status: 400 });

    const phoneClean = contactNumber.replace(/\D/g, "");
    if (phoneClean.length !== 10) {
      return NextResponse.json({ error: "Phone number must be exactly 10 digits." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    if (!Array.isArray(members) || members.length < MIN_TEAM_SIZE || members.length > MAX_TEAM_SIZE) {
      return NextResponse.json({ error: "Team must have " + MIN_TEAM_SIZE + "-" + MAX_TEAM_SIZE + " members." }, { status: 400 });
    }
    for (const m of members) {
      if (!m?.trim()) return NextResponse.json({ error: "All team member names are required." }, { status: 400 });
    }

    // Resolve affiliations for price calculation
    const affiliations: MemberAffiliation[] = members.map((_, i) => {
      if (passId === "non-atrians") return "non-atrian";
      if (i === 0) return "atrian"; // Leader is always Atrian for atrian pass
      return memberAffiliations?.[i] === "non-atrian" ? "non-atrian" : "atrian";
    });

    const amount = calculateTeamPrice(passId as PassId, affiliations, slab);
    if (!amount) {
      return NextResponse.json({ error: "Unable to calculate price." }, { status: 400 });
    }

    const atrianCount = affiliations.filter((a) => a === "atrian").length;
    const nonAtrianCount = affiliations.filter((a) => a === "non-atrian").length;

    const razorpay = getRazorpayInstance();
    const registrationId = generateRegistrationId();

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: registrationId,
      notes: {
        passId,
        teamName,
        teamSize: String(members.length),
        registrationId,
        slab,
        atrianCount: String(atrianCount),
        nonAtrianCount: String(nonAtrianCount),
      },
    });


    try {
      await appendRegistration({
        registrationId,
        timestamp: new Date().toISOString(),
        pass: pass.name,
        teamName: teamName.trim(),
        teamLeaderName: teamLeaderName.trim(),
        contactNumber: "+91" + phoneClean,
        email: email.trim(),
        collegeName: collegeName.trim(),
        teamSize: members.length,
        members: members.map((m: string, idx: number) => {
          const cleanName = m.trim();
          if (passId === "atrians" && affiliations[idx] === "non-atrian") {
            return `${cleanName} (Non-Atrian)`;
          }
          return cleanName;
        }),
        amount,
        currency: "INR",
        paymentStatus: "CREATED",
        razorpayOrderId: order.id,
        razorpayPaymentId: "",
        razorpaySignature: "",
        registrationStatus: "PENDING",
      });
    } catch (sheetError) {
      console.error("Google Sheets append error:", sheetError);
    }

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: "INR",
      registrationId,
      keyId: process.env.RAZORPAY_KEY_ID,
      passName: pass.name,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create order. Please try again." }, { status: 500 });
  }
}
