import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Send, Mail, Phone, QrCode, CheckCircle2, Globe, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | CYPHER 4.0",
  description: "Digital Ticket Delivery Policy for CYPHER 4.0 organized by Rotaract Club of Atria Institute of Technology.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="policy-page">
      {/* STICKY TOP BAR */}
      <header className="policy-header-bar">
        <div className="shell policy-header-inner">
          <Link href="/" className="brand" aria-label="CYPHER 4.0 Home">
            <Image
              src="/Rotaract_logo_white.png"
              alt="Rotaract Logo"
              width={180}
              height={55}
              priority
              style={{ height: "46px", width: "auto", objectFit: "contain" }}
            />
          </Link>
          <Link href="/" className="policy-back-btn">
            <ArrowLeft size={15} /> Back to CYPHER 4.0
          </Link>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="policy-hero">
        <div className="shell">
          <p className="mono-label">LEGAL DOCUMENTATION // CYPHER 4.0</p>
          <h1 className="policy-title">
            Shipping &amp; Delivery <span>Policy</span>
          </h1>
          <p className="policy-lead">
            Digital Ticket Delivery for CYPER 3.0 / CYPHER 4.0
          </p>
          <p className="policy-lead" style={{ fontSize: "15px", marginTop: "8px", opacity: 0.85 }}>
            All tickets for CYPER 3.0 / CYPHER 4.0 are delivered instantly via email immediately after your payment is successfully processed. Please make sure to provide a valid email address at checkout, as this is where your tickets will be sent.
          </p>
          <div className="policy-meta-tags">
            <span className="policy-tag"><Send size={14} /> Instant Email Delivery</span>
            <span className="policy-tag"><QrCode size={14} /> Digital QR Pass</span>
            <span className="policy-tag"><Globe size={14} /> Zero Shipping Fee Worldwide</span>
          </div>

          <div className="policy-nav-strip">
            <Link href="/privacy-policy" className="policy-nav-chip">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="policy-nav-chip">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="policy-nav-chip">Refund Policy</Link>
            <span className="policy-nav-chip is-active">Shipping &amp; Delivery</span>
          </div>
        </div>
      </section>

      {/* CONTENT BODY */}
      <section className="policy-content-body">
        <div className="shell">
          <div className="policy-card-grid">

            {/* DELIVERY TIMING */}
            <article className="policy-section-card">
              <span className="policy-section-badge">TIMING</span>
              <h2 className="policy-section-title">DELIVERY TIMING</h2>
              <div className="policy-text">
                <p>
                  Tickets are sent immediately after payment confirmation. In rare cases, it may take up to <strong>15 minutes</strong> due to payment verification or high order volumes during peak registration periods.
                </p>
                <p>
                  If you do not receive your tickets within this time, please check your spam/junk folder or contact our support team immediately.
                </p>
              </div>
            </article>

            {/* TICKET FORMAT */}
            <article className="policy-section-card">
              <span className="policy-section-badge">FORMAT</span>
              <h2 className="policy-section-title">TICKET FORMAT</h2>
              <div className="policy-text">
                <p>
                  Tickets are <strong>digital only</strong> and will be accessible directly from your email. No printing is required. Simply present your ticket on your device for entry to CYPER 3.0 / CYPHER 4.0.
                </p>
                <p><strong>Each ticket includes:</strong></p>
                <ul className="policy-list">
                  <li>Unique QR code for event entry</li>
                  <li>Event details (date, time, venue)</li>
                  <li>Participant information</li>
                  <li>Important event guidelines</li>
                </ul>
              </div>
            </article>

            {/* ORDER CONFIRMATION */}
            <article className="policy-section-card">
              <span className="policy-section-badge">COMMUNICATIONS</span>
              <h2 className="policy-section-title">ORDER CONFIRMATION EMAILS</h2>
              <div className="policy-text">
                <p>You will receive the following emails:</p>
                <ol className="policy-num-list">
                  <li>
                    <strong>Order Confirmation:</strong> Immediate confirmation with details of your purchase and payment receipt.
                  </li>
                  <li>
                    <strong>Ticket Delivery:</strong> Your digital ticket with QR code and event access information.
                  </li>
                  <li>
                    <strong>Event Reminders:</strong> Important updates and reminders leading up to CYPHER 4.0.
                  </li>
                </ol>
              </div>
            </article>

            {/* MULTIPLE TICKETS & TRANSFERS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">TEAM TICKETS</span>
              <h2 className="policy-section-title">MULTIPLE TICKETS &amp; TRANSFERS</h2>
              <div className="policy-text">
                <p>
                  If you purchase multiple tickets (for team registrations), each ticket will be included in the same email with unique QR codes for each participant.
                </p>
                <p>
                  <strong>Important:</strong> Tickets are non-transferable unless explicitly stated otherwise in the event&apos;s terms and conditions. Each ticket is tied to the registered participant&apos;s information.
                </p>
                <p>
                  For team changes or participant substitutions, please contact our support team at least <strong>48 hours before the event</strong>.
                </p>
              </div>
            </article>

            {/* SUPPORT & ASSISTANCE */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SUPPORT</span>
              <h2 className="policy-section-title">SUPPORT &amp; ASSISTANCE</h2>
              <div className="policy-text">
                <p>
                  For any issues regarding ticket delivery, please contact our support team immediately. We will ensure you receive your tickets promptly.
                </p>
                <div className="policy-contact-box" style={{ background: "rgba(5,6,11,0.85)", borderColor: "var(--cyan)" }}>
                  <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px" }}>
                    <Mail size={16} color="var(--cyan)" /> <strong>Email:</strong>{" "}
                    <a href="mailto:rotaractatriait3191@gmail.com">rotaractatriait3191@gmail.com</a>
                  </p>
                  <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px" }}>
                    <Phone size={16} color="var(--acid)" /> <strong>Phone:</strong> +91 96327 67475 / +91 8296869390
                  </p>
                  <p style={{ margin: 0, color: "var(--white)" }}>
                    <strong>Support Hours:</strong> 9:00 AM - 9:00 PM (IST)
                  </p>
                </div>
              </div>
            </article>

            {/* INTERNATIONAL PURCHASES */}
            <article className="policy-section-card">
              <span className="policy-section-badge">GLOBAL ACCESS</span>
              <h2 className="policy-section-title">INTERNATIONAL PURCHASES</h2>
              <div className="policy-text">
                <p>
                  Tickets can be purchased and delivered to any email address worldwide. Since delivery is fully digital, there are <strong>no shipping charges, import duties, or taxes</strong>.
                </p>
                <p><strong>International participants should note:</strong></p>
                <ul className="policy-list">
                  <li>All event timings are in Indian Standard Time (IST)</li>
                  <li>Virtual participation options may be available for certain events</li>
                  <li>Currency conversion will be handled by your payment provider</li>
                  <li>Digital tickets work globally with any internet-enabled device</li>
                </ul>
              </div>
            </article>

            {/* TROUBLESHOOTING */}
            <article className="policy-section-card">
              <span className="policy-section-badge">FAQ</span>
              <h2 className="policy-section-title">TROUBLESHOOTING COMMON ISSUES</h2>
              <div className="policy-text">
                <p><strong>Common issues and solutions:</strong></p>
                <div style={{ display: "grid", gap: "14px", marginTop: "12px" }}>
                  <div style={{ padding: "14px 18px", background: "rgba(11,16,48,0.7)", borderLeft: "3px solid var(--acid)" }}>
                    <p style={{ fontWeight: 700, color: "var(--acid)", margin: "0 0 4px" }}>Ticket not received?</p>
                    <p style={{ margin: 0, fontSize: "14px" }}>Check spam/junk folder, verify email address, wait up to 15 minutes, then contact support.</p>
                  </div>
                  <div style={{ padding: "14px 18px", background: "rgba(11,16,48,0.7)", borderLeft: "3px solid var(--cyan)" }}>
                    <p style={{ fontWeight: 700, color: "var(--cyan)", margin: "0 0 4px" }}>QR code not working?</p>
                    <p style={{ margin: 0, fontSize: "14px" }}>Ensure screen brightness is high, avoid low-res screenshots, and use the original email attachment.</p>
                  </div>
                  <div style={{ padding: "14px 18px", background: "rgba(11,16,48,0.7)", borderLeft: "3px solid var(--purple)" }}>
                    <p style={{ fontWeight: 700, color: "var(--white)", margin: "0 0 4px" }}>Payment processed but no ticket?</p>
                    <p style={{ margin: 0, fontSize: "14px" }}>Wait 15 minutes for processing, check all email folders, and contact support with your payment reference.</p>
                  </div>
                </div>
              </div>
            </article>

            {/* EVENT DAY INSTRUCTIONS */}
            <article className="policy-section-card" style={{ borderColor: "var(--acid)" }}>
              <span className="policy-section-badge">CHECK-IN</span>
              <h2 className="policy-section-title">EVENT DAY INSTRUCTIONS</h2>
              <div className="policy-text">
                <p><strong>On the day of CYPER 3.0 / CYPHER 4.0:</strong></p>
                <ul className="policy-list">
                  <li><CheckCircle2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px", color: "var(--acid)" }} /> Arrive at least 30 minutes before your scheduled time</li>
                  <li><CheckCircle2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px", color: "var(--acid)" }} /> Have your digital ticket ready on your device</li>
                  <li><CheckCircle2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px", color: "var(--acid)" }} /> Bring a valid photo ID matching your registration details</li>
                  <li><CheckCircle2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px", color: "var(--acid)" }} /> Ensure your device has sufficient battery life</li>
                  <li><CheckCircle2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px", color: "var(--acid)" }} /> Download offline copies of your tickets as backup</li>
                </ul>
              </div>
            </article>

          </div>

          {/* ACTION BUTTON */}
          <div className="policy-actions-row">
            <Link href="/" className="button button-acid">
              <ArrowLeft size={16} /> Back to CYPHER 4.0
            </Link>
            <Link href="/privacy-policy" className="button button-outline">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="button button-outline">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
