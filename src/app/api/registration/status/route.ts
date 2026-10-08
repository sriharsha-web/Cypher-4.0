import { NextResponse } from "next/server";
import { getRegisteredTeamsCount } from "@/lib/sheets";
import {
  SLABS,
  getActiveSlabId,
  isRegistrationClosed,
  REGISTRATION_CLOSED_MESSAGE,
  SLAB_4_OPEN_TIME,
  getBadgeText,
  IS_LIMITED_TIME,
  LIMITED_TIME_MESSAGE,
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
      badgeText: getBadgeText(),
      passes: currentSlab.passes,
      registeredCount,
      isClosed,
      closedMessage: isClosed ? REGISTRATION_CLOSED_MESSAGE : "",
      opensAt: SLAB_4_OPEN_TIME,
      isLimitedTime: IS_LIMITED_TIME,
      limitedTimeMessage: LIMITED_TIME_MESSAGE,
    });
  } catch (error) {
    console.error("Failed to fetch registration status:", error);
    const isClosed = isRegistrationClosed();
    const slab: SlabId = getActiveSlabId();
    const fallbackSlab = SLABS[slab];
    return NextResponse.json({
      slab,
      label: fallbackSlab.label,
      badgeText: getBadgeText(),
      passes: fallbackSlab.passes,
      registeredCount: 0,
      isClosed,
      closedMessage: isClosed ? REGISTRATION_CLOSED_MESSAGE : "",
      opensAt: SLAB_4_OPEN_TIME,
      isLimitedTime: IS_LIMITED_TIME,
      limitedTimeMessage: LIMITED_TIME_MESSAGE,
    });
  }
}
