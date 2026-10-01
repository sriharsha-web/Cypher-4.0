import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updatePaymentStatus } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET!;
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    if (eventType === "payment.captured") {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      await updatePaymentStatus(orderId, "PAID", payment.id, "", "CONFIRMED");
    } else if (eventType === "payment.failed") {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      await updatePaymentStatus(orderId, "FAILED", payment.id || "", "", "FAILED");
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
