import { NextResponse } from "next/server";
import { getRegisteredTeamsCount } from "@/lib/sheets";
import {
  SLABS,
  getActiveSlabId,
  isRegistrationClosed,
  REGISTRATION_CLOSED_MESSAGE,
  SLAB_3_OPEN_TIME,
} from "@/lib/passes";
import type { SlabId } from "@/lib/passes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const registeredCount = await getRegisteredTeamsCount();
    const isClosed = isRegistrationClosed();
    const slab: SlabId = getActiveSlabId();
    const currentSlab = SLABS[slab];

    return NextResponse.json({
      slab,
      label: currentSlab.label,
      badgeText: currentSlab.badgeText,
      passes: currentSlab.passes,
      registeredCount,
      isClosed,
      closedMessage: isClosed ? REGISTRATION_CLOSED_MESSAGE : "",
      opensAt: SLAB_3_OPEN_TIME,
    });
  } catch (error) {
    console.error("Failed to fetch registration status:", error);
    const isClosed = isRegistrationClosed();
    const slab: SlabId = getActiveSlabId();
    const fallbackSlab = SLABS[slab];
    return NextResponse.json({
      slab,
      label: fallbackSlab.label,
      badgeText: fallbackSlab.badgeText,
      passes: fallbackSlab.passes,
      registeredCount: 0,
      isClosed,
      closedMessage: isClosed ? REGISTRATION_CLOSED_MESSAGE : "",
      opensAt: SLAB_3_OPEN_TIME,
    });
  }
}
