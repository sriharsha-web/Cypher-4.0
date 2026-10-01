import { NextRequest, NextResponse } from "next/server";
import { verifySignature } from "@/lib/razorpay";
import { updatePaymentStatus } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
    }

    // Verify signature
    const isValid = verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    // Update Google Sheets
    try {
      await updatePaymentStatus(
        razorpay_order_id,
        "PAID",
        razorpay_payment_id,
        razorpay_signature,
        "CONFIRMED"
      );
    } catch (sheetError) {
      console.error("Google Sheets update error:", sheetError);
      // Payment is verified even if sheets fail
    }

    return NextResponse.json({
      success: true,
      registrationId,
      message: "Payment verified successfully.",
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ error: "Verification failed. Please contact support." }, { status: 500 });
  }
}
