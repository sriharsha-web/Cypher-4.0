import { NextResponse } from "next/server";
import { getRegisteredTeamsCount } from "@/lib/sheets";
import { ACTIVE_SLAB, SLABS } from "@/lib/passes";
import type { SlabId } from "@/lib/passes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const registeredCount = await getRegisteredTeamsCount();
    const slab: SlabId = ACTIVE_SLAB;
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
    const fallbackSlab = SLABS[ACTIVE_SLAB];
    return NextResponse.json({
      slab: ACTIVE_SLAB,
      label: fallbackSlab.label,
      badgeText: fallbackSlab.badgeText,
      passes: fallbackSlab.passes,
      registeredCount: 0,
    });
  }
}
