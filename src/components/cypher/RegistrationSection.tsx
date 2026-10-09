"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUpRight, Check, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  SLABS,
  SLAB_4_OPEN_TIME,
  isRegistrationClosed,
  getActiveSlabId,
  getPassesForSlab,
  REGISTRATION_CLOSED_MESSAGE,
  IS_LIMITED_TIME,
  LIMITED_TIME_MESSAGE,
} from "@/lib/passes";
import type { PassConfig, PassId, SlabId } from "@/lib/passes";

interface RegistrationStatus {
  slab: SlabId;
  label: string;
  badgeText: string;
  passes: Record<PassId, PassConfig>;
  isClosed?: boolean;
  closedMessage?: string;
  opensAt?: number;
  isLimitedTime?: boolean;
  limitedTimeMessage?: string;
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

  const fetchStatus = useCallback(() => {
    fetch("/api/registration/status")
      .then((r) => r.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error("Could not fetch registration status:", err));
  }, []);

  useEffect(() => {
    fetchStatus();

    // Check periodically for status updates
    const interval = window.setInterval(fetchStatus, 15000);

    // Exact timer targeting 9:00:00 PM IST
    const targetTime = status?.opensAt ?? SLAB_4_OPEN_TIME;
    const msUntilOpen = targetTime - Date.now();
    let exactTimer: number | undefined;
    if (msUntilOpen > 0 && msUntilOpen < 86400000) {
      exactTimer = window.setTimeout(fetchStatus, msUntilOpen + 500);
    }

    return () => {
      window.clearInterval(interval);
      if (exactTimer) window.clearTimeout(exactTimer);
    };
  }, [fetchStatus, status?.opensAt]);

  const currentSlabId = status?.slab ?? getActiveSlabId();
  const passes = status?.passes ?? getPassesForSlab(currentSlabId);
  const badgeText = status?.badgeText ?? SLABS[currentSlabId].badgeText;
  const isClosed = status ? (status.isClosed ?? false) : isRegistrationClosed();
  const closedMessage = status?.closedMessage ?? (isClosed ? REGISTRATION_CLOSED_MESSAGE : "");
  const isLimitedTime = status ? (status.isLimitedTime ?? IS_LIMITED_TIME) : IS_LIMITED_TIME;
  const limitedTimeMessage = status?.limitedTimeMessage ?? LIMITED_TIME_MESSAGE;
  const opensAt = status?.opensAt ?? SLAB_4_OPEN_TIME;
  const isPendingOpen = isClosed && Date.now() < opensAt;

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

        {isClosed ? (
          <div className="reg-sold-out-banner">
            <AlertCircle size={20} />
            <div>
              <strong>Registrations Closed — House Full</strong>
              <p>{closedMessage || "Registrations are closed. House Full!"}</p>
            </div>
          </div>
        ) : isLimitedTime ? (
          <div className="reg-limited-banner">
            <Sparkles size={20} />
            <div>
              <strong>SLAB 4 ACTIVE — LIMITED TIME ACCESS</strong>
              <p>{limitedTimeMessage}</p>
            </div>
          </div>
        ) : null}

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
                House Full
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
                House Full
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
