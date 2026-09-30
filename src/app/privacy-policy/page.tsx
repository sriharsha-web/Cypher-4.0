import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | CYPHER 4.0",
  description: "Privacy Policy and data protection guidelines for CYPHER 4.0 organized by Rotaract Club of Atria Institute of Technology.",
};

export default function PrivacyPolicyPage() {
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
            Privacy <span>Policy</span>
          </h1>
          <p className="policy-lead">
            CYPER 3.0 &amp; CYPHER 4.0 — How we protect and use your information.
          </p>
          <p className="policy-lead" style={{ fontSize: "15px", marginTop: "8px", opacity: 0.85 }}>
            This Privacy Policy describes how Rotaract Club of Atria Institute of Technology collects, uses, and protects your information when you register for CYPER 3.0 / CYPHER 4.0 or use our website. We are committed to ensuring that your privacy is protected.
          </p>
          <div className="policy-meta-tags">
            <span className="policy-tag"><ShieldCheck size={14} /> PCI-DSS Compliant</span>
            <span className="policy-tag">Rotaract Club of Atria Institute of Technology</span>
            <span className="policy-tag">Last Updated: 2026</span>
          </div>

          <div className="policy-nav-strip">
            <span className="policy-nav-chip is-active">Privacy Policy</span>
            <Link href="/terms-and-conditions" className="policy-nav-chip">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="policy-nav-chip">Refund Policy</Link>
            <Link href="/shipping-policy" className="policy-nav-chip">Shipping &amp; Delivery</Link>
          </div>
        </div>
      </section>

      {/* CONTENT BODY */}
      <section className="policy-content-body">
        <div className="shell">
          <div className="policy-card-grid">

            {/* SECTION 1 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 1</span>
              <h2 className="policy-section-title">WHAT DO WE DO WITH YOUR INFORMATION?</h2>
              <div className="policy-text">
                <p>
                  When you register for CYPHER 3.0 / CYPHER 4.0, as part of the registration and event management process, we collect the personal information you provide such as your name, email address, phone number, educational institution, and any project details you submit.
                </p>
                <p>
                  When you browse our website, we also automatically receive your computer&apos;s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system for security and optimization purposes.
                </p>
                <p>
                  <strong>Email marketing:</strong> With your permission, we may send you emails about CYPHER 3.0 updates, event information, future hackathons, and other relevant educational opportunities from Rotaract Club of Atria Institute of Technology.
                </p>
                <p>
                  <strong>Event Documentation:</strong> We may collect photos, videos, and project submissions during the event for promotional and educational purposes, with appropriate consent.
                </p>
              </div>
            </article>

            {/* SECTION 2 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 2</span>
              <h2 className="policy-section-title">CONSENT</h2>
              <div className="policy-text">
                <p><strong>How do you get my consent?</strong></p>
                <p>
                  When you provide us with personal information to complete your registration, verify your payment, register for the event, or submit your project, we imply that you consent to our collecting it and using it for that specific reason only.
                </p>
                <p>
                  If we ask for your personal information for a secondary reason, like marketing or future event notifications, we will either ask you directly for your expressed consent, or provide you with an opportunity to opt out.
                </p>
                <p><strong>How do I withdraw my consent?</strong></p>
                <p>
                  If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by contacting us at{" "}
                  <a href="mailto:rotaractatriait3191@gmail.com">rotaractatriait3191@gmail.com</a> /{" "}
                  <a href="mailto:cyper@atria.edu">cyper@atria.edu</a> or mailing us at:
                </p>
                <div className="policy-contact-box">
                  <strong>Rotaract Club of Atria Institute of Technology</strong>
                  <p style={{ margin: 0 }}>ASKB Campus, Hebbal, Bengaluru, Karnataka 560024, India</p>
                </div>
              </div>
            </article>

            {/* SECTION 3 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 3</span>
              <h2 className="policy-section-title">DISCLOSURE</h2>
              <div className="policy-text">
                <p>
                  We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
                </p>
                <p>
                  We may also share anonymized, aggregated data about event participation and outcomes with our sponsors, educational partners, and industry collaborators for research and promotional purposes.
                </p>
                <p>
                  Your project submissions may be showcased publicly (with your consent) for educational purposes, winner announcements, and promoting future events.
                </p>
              </div>
            </article>

            {/* SECTION 4 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 4</span>
              <h2 className="policy-section-title">PAYMENT</h2>
              <div className="policy-text">
                <p>
                  We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
                </p>
                <p>
                  Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
                </p>
                <p>
                  PCI-DSS requirements help ensure the secure handling of credit card information by our event registration system and its service providers.
                </p>
                <p>
                  For more insight, you may also want to read the terms and conditions of Razorpay at{" "}
                  <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer">
                    https://razorpay.com <ArrowUpRight size={13} style={{ display: "inline" }} />
                  </a>
                </p>
              </div>
            </article>

            {/* SECTION 5 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 5</span>
              <h2 className="policy-section-title">THIRD-PARTY SERVICES</h2>
              <div className="policy-text">
                <p>
                  In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.
                </p>
                <p>
                  However, certain third-party service providers, such as payment gateways, email services, analytics tools, and other transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your registration-related transactions.
                </p>
                <p>
                  For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
                </p>
                <p>
                  In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
                </p>
                <p>
                  Once you leave our website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website&apos;s Terms of Service.
                </p>
                <p>
                  <strong>Links:</strong> When you click on links on our website, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
                </p>
              </div>
            </article>

            {/* SECTION 6 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 6</span>
              <h2 className="policy-section-title">SECURITY</h2>
              <div className="policy-text">
                <p>
                  To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
                </p>
                <p>Our security measures include:</p>
                <ul className="policy-list">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure servers with regular security updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Secure backup and recovery procedures</li>
                </ul>
              </div>
            </article>

            {/* SECTION 7 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 7</span>
              <h2 className="policy-section-title">COOKIES</h2>
              <div className="policy-text">
                <p>
                  We use cookies to maintain the session of your user account and improve your browsing experience. Cookies are not used to personally identify you on other websites.
                </p>
                <p><strong>Types of cookies we use:</strong></p>
                <ul className="policy-list">
                  <li><strong>Essential cookies:</strong> Required for website functionality and security</li>
                  <li><strong>Performance cookies:</strong> Help us understand how you use our website</li>
                  <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                </ul>
                <p>
                  You can choose to disable cookies through your browser settings, but this may limit some website functionality.
                </p>
              </div>
            </article>

            {/* SECTION 8 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 8</span>
              <h2 className="policy-section-title">AGE OF CONSENT</h2>
              <div className="policy-text">
                <p>
                  By using this site and registering for CYPER 3.0 / CYPHER 4.0, you represent that you are at least 18 years of age, or that you are at least 13 years of age and have parental/guardian consent to participate in the event and use this website.
                </p>
                <p>
                  For participants under 18, we may require additional consent forms and parental/guardian contact information for emergency purposes during the event.
                </p>
              </div>
            </article>

            {/* SECTION 9 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 9</span>
              <h2 className="policy-section-title">DATA RETENTION</h2>
              <div className="policy-text">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul className="policy-list">
                  <li>Provide you with event-related services</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Maintain records for future event planning (anonymized data)</li>
                </ul>
                <p>
                  Typically, personal data is retained for up to 3 years after the event, unless you request earlier deletion or longer retention is required by law.
                </p>
              </div>
            </article>

            {/* SECTION 10 */}
            <article className="policy-section-card">
              <span className="policy-section-badge">SECTION 10</span>
              <h2 className="policy-section-title">CHANGES TO THIS PRIVACY POLICY</h2>
              <div className="policy-text">
                <p>
                  We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
                </p>
                <p>
                  If our organization is acquired or merged with another institution, your information may be transferred to the new entity so that we may continue to provide you with educational services and event information.
                </p>
              </div>
            </article>

            {/* QUESTIONS AND CONTACT INFORMATION */}
            <article className="policy-section-card" style={{ borderColor: "var(--acid)" }}>
              <span className="policy-section-badge">CONTACT</span>
              <h2 className="policy-section-title">QUESTIONS AND CONTACT INFORMATION</h2>
              <div className="policy-text">
                <p>
                  If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer at:
                </p>
                <div className="policy-contact-box" style={{ background: "rgba(5,6,11,0.85)", borderColor: "var(--acid)" }}>
                  <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px" }}>
                    <Mail size={16} color="var(--acid)" /> <strong>Email:</strong>{" "}
                    <a href="mailto:rotaractatriait3191@gmail.com">rotaractatriait3191@gmail.com</a>
                  </p>
                  <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px" }}>
                    <Phone size={16} color="var(--cyan)" /> <strong>Phone:</strong> +91 96327 67475 / +91 8296869390
                  </p>
                  <p style={{ display: "flex", alignItems: "flex-start", gap: "8px", margin: 0 }}>
                    <MapPin size={16} color="var(--acid)" style={{ flexShrink: 0, marginTop: "4px" }} />
                    <span>
                      <strong>Address:</strong> Rotaract Club of Atria Institute of Technology, ASKB Campus, Hebbal, Bengaluru, Karnataka 560024, India
                    </span>
                  </p>
                </div>
              </div>
            </article>

          </div>

          {/* ACTION BUTTONS REQUIRED BY USER */}
          <div className="policy-actions-row">
            <Link href="/" className="button button-acid">
              <ArrowLeft size={16} /> Back to CYPHER 4.0
            </Link>
            <Link href="/terms-and-conditions" className="button button-cyan">
              Terms and Conditions <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
