import { NextResponse } from "next/server";
import { getRegisteredTeamsCount } from "@/lib/sheets";
import { EARLY_BIRD_LIMIT, SLABS } from "@/lib/passes";
import type { SlabId } from "@/lib/passes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const registeredCount = await getRegisteredTeamsCount();
    const isEarlyBirdClosed = registeredCount >= EARLY_BIRD_LIMIT;
    const slab: SlabId = isEarlyBirdClosed ? "slab-1" : "early-bird";
    const currentSlab = SLABS[slab];

    return NextResponse.json({
      slab,
      label: currentSlab.label,
      badgeText: currentSlab.badgeText,
      passes: currentSlab.passes,
      registeredCount,
    });
  } catch (error) {
    console.error("Failed to fetch registration status:", error);
    const fallbackSlab = SLABS["early-bird"];
    return NextResponse.json({
      slab: "early-bird",
      label: fallbackSlab.label,
      badgeText: fallbackSlab.badgeText,
      passes: fallbackSlab.passes,
      registeredCount: 0,
    });
  }
}
