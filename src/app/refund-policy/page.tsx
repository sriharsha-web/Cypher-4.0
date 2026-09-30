import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, RefreshCw, Mail, Phone, MapPin, AlertCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | CYPHER 4.0",
  description: "Event Registration & Ticket Refund Policy for CYPHER 4.0 organized by Rotaract Club of Atria Institute of Technology.",
};

export default function RefundPolicyPage() {
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
            Refund <span>Policy</span>
          </h1>
          <p className="policy-lead">
            CYPER 3.0 / CYPHER 4.0 - Event Registration &amp; Ticket Refunds
          </p>
          <p className="policy-lead" style={{ fontSize: "15px", marginTop: "8px", opacity: 0.85 }}>
            Guidelines and procedures for cancellation requests, ticket transfers, processing timelines, and exceptions for CYPHER registrations.
          </p>
          <div className="policy-meta-tags">
            <span className="policy-tag"><RefreshCw size={14} /> 7-Day Window Policy</span>
            <span className="policy-tag"><Clock size={14} /> 5-10 Business Days Processing</span>
            <span className="policy-tag">Rotaract Club of Atria Institute of Technology</span>
          </div>

          <div className="policy-nav-strip">
            <Link href="/privacy-policy" className="policy-nav-chip">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="policy-nav-chip">Terms &amp; Conditions</Link>
            <span className="policy-nav-chip is-active">Refund Policy</span>
            <Link href="/shipping-policy" className="policy-nav-chip">Shipping &amp; Delivery</Link>
          </div>
        </div>
      </section>

      {/* CONTENT BODY */}
      <section className="policy-content-body">
        <div className="shell">
          <div className="policy-card-grid">

            {/* RETURNS / ELIGIBILITY */}
            <article className="policy-section-card">
              <span className="policy-section-badge">ELIGIBILITY</span>
              <h2 className="policy-section-title">RETURNS &amp; CANCELLATIONS</h2>
              <div className="policy-text">
                <p>
                  Our refund policy lasts <strong>7 days before the event date</strong>. If 7 days have not passed since your registration, unfortunately we can&apos;t offer you a refund or exchange due to the nature of event planning and logistics.
                </p>
                <p>
                  To be eligible for a refund, your registration must be cancelled and you must not have received any event materials or started participation in pre-event activities.
                </p>
                <p><strong>Several types of registrations are exempt from being refunded:</strong></p>
                <ul className="policy-list">
                  <li>Early bird or discounted tickets</li>
                  <li>Group registration packages</li>
                  <li>Sponsor-provided complimentary tickets</li>
                  <li>Registrations made within 7 days of the event</li>
                </ul>
              </div>
            </article>

            {/* NON-REFUNDABLE ITEMS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">EXCLUSIONS</span>
              <h2 className="policy-section-title">NON-REFUNDABLE ITEMS</h2>
              <div className="policy-text">
                <p>Additional non-refundable items include:</p>
                <ul className="policy-list">
                  <li><strong>Digital certificates</strong> - Once issued</li>
                  <li><strong>Event merchandise</strong> - If already shipped or prepared</li>
                  <li><strong>Workshop materials</strong> - Downloaded content</li>
                  <li><strong>Networking session access</strong> - If already provided</li>
                  <li><strong>Meal packages</strong> - If catering is already arranged</li>
                </ul>
                <p style={{ marginTop: "14px" }}>
                  To complete your refund request, we require your registration confirmation email or proof of purchase.
                </p>
                <p style={{ color: "var(--acid)" }}>
                  <AlertCircle size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
                  Please do not contact third-party payment processors directly. All refund requests must go through our official channels.
                </p>
              </div>
            </article>

            {/* PARTIAL REFUNDS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">PARTIAL</span>
              <h2 className="policy-section-title">PARTIAL REFUNDS</h2>
              <div className="policy-text">
                <p>There are certain situations where only partial refunds are granted:</p>
                <ul className="policy-list">
                  <li>Cancellation between 3-7 days before the event (50% refund)</li>
                  <li>If you&apos;ve already received event merchandise or materials</li>
                  <li>If you&apos;ve attended part of the event (pro-rated refund)</li>
                  <li>Group registrations where only some participants cancel</li>
                  <li>Any registration that includes non-refundable components</li>
                </ul>
              </div>
            </article>

            {/* REFUND PROCESS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">TIMELINE</span>
              <h2 className="policy-section-title">REFUND PROCESS &amp; PROCESSING TIMES</h2>
              <div className="policy-text">
                <p>
                  Once your refund request is received and reviewed, we will send you an email to notify you that we have received your cancellation request. We will also notify you of the approval or rejection of your refund.
                </p>
                <p>
                  If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within <strong>5-10 business days</strong>.
                </p>
                <p><strong>Processing Times by Payment Method:</strong></p>
                <ul className="policy-list">
                  <li>• Credit/Debit Cards: 5-7 business days</li>
                  <li>• Bank Transfers: 7-10 business days</li>
                  <li>• Digital Wallets: 3-5 business days</li>
                  <li>• UPI/Online Banking: 3-5 business days</li>
                </ul>
              </div>
            </article>

            {/* LATE OR MISSING REFUNDS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SUPPORT</span>
              <h2 className="policy-section-title">LATE OR MISSING REFUNDS</h2>
              <div className="policy-text">
                <p>If you haven&apos;t received a refund yet, please follow these steps:</p>
                <ol className="policy-num-list">
                  <li>
                    <strong>Check your bank account again:</strong> Sometimes transactions take time to officially reflect.
                  </li>
                  <li>
                    <strong>Contact your bank or payment provider:</strong> There may be processing delays on their end.
                  </li>
                  <li>
                    <strong>Contact our support team:</strong> Email us at{" "}
                    <a href="mailto:cyper@atria.edu">cyper@atria.edu</a> /{" "}
                    <a href="mailto:rotaractatriait3191@gmail.com">rotaractatriait3191@gmail.com</a> with your registration details.
                  </li>
                </ol>
              </div>
            </article>

            {/* EARLY BIRD & SALE ITEMS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SPECIAL RATES</span>
              <h2 className="policy-section-title">EARLY BIRD &amp; SALE ITEMS</h2>
              <div className="policy-text">
                <p>
                  Only regular priced registrations may be refunded. Unfortunately, early bird tickets, discounted registrations, and promotional offers cannot be refunded due to their special pricing nature.
                </p>
                <p>
                  However, these tickets may be eligible for transfer to future events (subject to availability and terms).
                </p>
              </div>
            </article>

            {/* EXCHANGES & TRANSFERS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">TRANSFERS</span>
              <h2 className="policy-section-title">EXCHANGES &amp; TRANSFERS</h2>
              <div className="policy-text">
                <p>
                  We only offer ticket transfers in case of genuine emergencies or unforeseen circumstances. If you need to transfer your registration to another participant, please contact us at{" "}
                  <a href="mailto:cyper@atria.edu">cyper@atria.edu</a> at least <strong>48 hours before the event</strong>.
                </p>
                <p><strong>Transfer requests require:</strong></p>
                <ul className="policy-list">
                  <li>Original registration details</li>
                  <li>New participant&apos;s complete information (Name, College, Email, Phone)</li>
                  <li>Valid reason for transfer</li>
                  <li>Transfer processing fee may apply</li>
                </ul>
              </div>
            </article>

            {/* GROUP REGISTRATIONS & GIFTS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">GROUPS</span>
              <h2 className="policy-section-title">GROUP REGISTRATIONS &amp; GIFTS</h2>
              <div className="policy-text">
                <p>
                  <strong>Gift Registrations:</strong> Refunds will be processed to the original purchaser. Gift certificates may be issued for future events.
                </p>
                <p>
                  <strong>Group Bookings:</strong> Individual cancellations from group bookings may affect group pricing. Contact our team for specific terms.
                </p>
              </div>
            </article>

            {/* EVENT CANCELLATION BY ORGANIZERS */}
            <article className="policy-section-card">
              <span className="policy-section-badge">ORGANIZER CONTINGENCY</span>
              <h2 className="policy-section-title">EVENT CANCELLATION BY ORGANIZERS</h2>
              <div className="policy-text">
                <p>In the unlikely event that CYPER 3.0 / CYPHER 4.0 is cancelled by the organizers due to unforeseen circumstances:</p>
                <ul className="policy-list">
                  <li>Full refunds will be provided to all registered participants</li>
                  <li>Refunds will be processed within 14 business days</li>
                  <li>Alternative arrangements (virtual participation, future event credits) may be offered</li>
                  <li>Additional compensation may be provided for travel/accommodation costs in extreme cases</li>
                </ul>
              </div>
            </article>

            {/* CONTACT FOR REFUNDS */}
            <article className="policy-section-card" style={{ borderColor: "var(--acid)" }}>
              <span className="policy-section-badge">CONTACT</span>
              <h2 className="policy-section-title">CONTACT FOR REFUNDS</h2>
              <div className="policy-text">
                <p>To request a refund or for any refund-related queries, please contact us:</p>
                <div className="policy-contact-box" style={{ background: "rgba(5,6,11,0.85)", borderColor: "var(--acid)" }}>
                  <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px" }}>
                    <Mail size={16} color="var(--acid)" /> <strong>Email:</strong>{" "}
                    <a href="mailto:rotaractatriait3191@gmail.com">rotaractatriait3191@gmail.com</a> /{" "}
                    <a href="mailto:cyper@atria.edu">cyper@atria.edu</a>
                  </p>
                  <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px" }}>
                    <Phone size={16} color="var(--cyan)" /> <strong>Phone:</strong> +91 96327 67475 / +91 8296869390
                  </p>
                  <p style={{ display: "flex", alignItems: "flex-start", gap: "8px", margin: "0 0 10px" }}>
                    <MapPin size={16} color="var(--acid)" style={{ flexShrink: 0, marginTop: "4px" }} />
                    <span>
                      <strong>Address:</strong> Rotaract Club of Atria Institute of Technology, ASKB Campus, Hebbal, Bengaluru, Karnataka 560024
                    </span>
                  </p>
                  <p style={{ fontStyle: "italic", color: "var(--acid)", margin: 0, fontSize: "13px" }}>
                    Note: Please include your registration confirmation number, payment details, and reason for refund in your communication for faster processing.
                  </p>
                </div>
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
