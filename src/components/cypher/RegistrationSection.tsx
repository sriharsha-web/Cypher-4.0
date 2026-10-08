"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { PASSES, ACTIVE_SLAB, SLABS, REGISTRATION_CLOSED, REGISTRATION_CLOSED_MESSAGE } from "@/lib/passes";
import type { PassConfig, PassId, SlabId } from "@/lib/passes";

interface RegistrationStatus {
  slab: SlabId;
  label: string;
  badgeText: string;
  passes: Record<PassId, PassConfig>;
  isClosed?: boolean;
  closedMessage?: string;
}

const passBenefits = [
  "Team of up to 4 members",
  "Access to mentors & workshops",
  "Swag kit included",
  "Meals & refreshments provided",
  "Certificate of participation",
  "Priority seating during talks",
  "Awards, bounties & recognition",
];

export function RegistrationSection() {
  const [status, setStatus] = useState<RegistrationStatus | null>(null);

  useEffect(() => {
    fetch("/api/registration/status")
      .then((r) => r.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error("Could not fetch registration status:", err));
  }, []);

  const passes = status?.passes ?? PASSES;
  const badgeText = status?.badgeText ?? SLABS[ACTIVE_SLAB].badgeText;
  const isClosed = status?.isClosed ?? REGISTRATION_CLOSED;
  const closedMessage = status?.closedMessage ?? REGISTRATION_CLOSED_MESSAGE;

  return (
    <section id="register" className="register-section">
      <div className="shell register-content">
        <p className="mono-label">07 / FUEL STATUS</p>
        <div className="passes-heading-row">
          <h2>ACCESS PASSES</h2>
          <span className={`early-bird-badge${isClosed ? " early-bird-sold-out" : ""}`}>
            {isClosed ? <AlertCircle size={13} /> : <Sparkles size={13} />} {badgeText}
          </span>
        </div>

        {isClosed && (
          <div className="reg-sold-out-banner">
            <AlertCircle size={20} />
            <div>
              <strong>Slab 2 Closed for Registrations</strong>
              <p>{closedMessage}</p>
            </div>
          </div>
        )}

        <div className="passes">
          <article className="pass-card">
            <h3>ATRIANS</h3>
            <div className="pass-price">
              <strong>₹{passes.atrians.perPerson}/-</strong>
              <small>per person</small>
            </div>
            <p className="pass-desc">Entry-level orbital access for Atria personnel.</p>
            <ul className="pass-benefits">
              {passBenefits.map((benefit, i) => (
                <li key={i}>
                  <Check size={15} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            {isClosed ? (
              <button className="button button-outline pass-btn pass-btn-disabled" disabled>
                Slab 2 Closed
              </button>
            ) : (
              <Link
                href="/register?pass=atrians"
                className="button button-outline pass-btn"
              >
                Register Now <ArrowUpRight size={16} />
              </Link>
            )}
          </article>

          <article className="pass-card featured-pass">
            <span className="featured-label">FEATURED PASS</span>
            <h3>NON-ATRIANS</h3>
            <div className="pass-price">
              <strong>₹{passes["non-atrians"].perPerson}/-</strong>
              <small>per person</small>
            </div>
            <p className="pass-desc">Interstellar access for all external technical entities.</p>
            <ul className="pass-benefits">
              {passBenefits.map((benefit, i) => (
                <li key={i}>
                  <Check size={15} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            {isClosed ? (
              <button className="button button-acid pass-btn pass-btn-disabled" disabled>
                Slab 2 Closed
              </button>
            ) : (
              <Link
                href="/register?pass=non-atrians"
                className="button button-acid pass-btn"
              >
                Register Now <ArrowUpRight size={16} />
              </Link>
            )}
          </article>
        </div>
      </div>

      <div className="register-moon-wrapper" aria-hidden="true">
        <img src="/moon.png" alt="" className="register-moon-img" />
      </div>
    </section>
  );
}

export default RegistrationSection;
