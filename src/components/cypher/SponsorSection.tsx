"use client";

import { useEffect, useRef } from "react";
import { SPONSORSHIP_BROCHURE_PATH } from "@/data/sponsors";

export function SponsorSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Load-in logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".sponsor-load-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="sponsor-section" ref={containerRef} id="sponsors">
      <div className="shell">
        {/* Heading */}
        <h2 className="sponsor-heading sponsor-load-in" style={{ transitionDelay: "100ms" }}>
          Sponsors
        </h2>

        {/* Supporting description */}
        <p
          className="sponsor-load-in"
          style={{
            transitionDelay: "200ms",
            maxWidth: "600px",
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.75)",
            marginBottom: "24px",
            lineHeight: "1.6",
          }}
        >
          Interested in supporting Cypher 4.0 and partnering with next-gen innovators? Explore our sponsorship opportunities and tiers.
        </p>

        {/* CTA Button linking to Sponsorship Brochure */}
        <a
          href={SPONSORSHIP_BROCHURE_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="sponsor-cta sponsor-load-in"
          style={{ transitionDelay: "300ms", maxWidth: "420px" }}
          aria-label="Become a sponsor - Download Sponsorship Brochure"
        >
          <span className="sponsor-cta-arrow-track">
            <span className="sponsor-cta-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </span>
          <span className="sponsor-cta-label">
            <span className="sponsor-roll">
              <span>Become a sponsor</span>
              <span>Become a sponsor</span>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}

