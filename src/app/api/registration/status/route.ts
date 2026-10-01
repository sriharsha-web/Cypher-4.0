import { NextResponse } from "next/server";
import { getRegisteredTeamsCount } from "@/lib/sheets";
import { EARLY_BIRD_LIMIT } from "@/lib/passes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const registeredCount = await getRegisteredTeamsCount();
    const limit = EARLY_BIRD_LIMIT;
    const remainingSpots = Math.max(0, limit - registeredCount);
    const isSoldOut = registeredCount >= limit;

    return NextResponse.json({
      limit,
      registeredCount,
      remainingSpots,
      isSoldOut,
    });
  } catch (error) {
    console.error("Failed to fetch registration status:", error);
    return NextResponse.json({
      limit: EARLY_BIRD_LIMIT,
      registeredCount: 0,
      remainingSpots: EARLY_BIRD_LIMIT,
      isSoldOut: false,
    });
  }
}
