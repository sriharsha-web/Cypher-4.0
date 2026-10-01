"use client";

import { ChevronDown, ArrowUpRight } from "lucide-react";
import { CypherKeyboardVisual } from "./CypherKeyboardVisual";

type HeroSectionProps = { timeLeft: Record<string, number> };

export function HeroSection({ timeLeft }: HeroSectionProps) {
  return (
    <section className="hero section-grid">
      <div className="hero-inner shell">
        <div className="eyebrow">
          <span>✦ Rotaract Club of Atria Institute of Technology</span>
          <span className="eyebrow-secondary">Presents</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy reveal">
            <p className="mono-label">AN 18-HOUR HACKATHON FOR</p>
            <h1>
              CYPHER <span>4.0</span>
            </h1>
            <p className="hero-lede">Build beyond the brief. Ship something impossible.</p>

            <div className="hero-meta">
              <span>
                <small>EVENT DATE</small>
                OCTOBER 9, 10 2026
              </span>
              <span>
                <small>VENUE</small>
                ATRIA INSTITUTE AUDITORIUM
              </span>
            </div>

            <div className="countdown" aria-label="Countdown to CYPHER 4.0" suppressHydrationWarning>
              {Object.entries(timeLeft).map(([label, value]) => (
                <div className="countdown-item" key={label}>
                  <strong suppressHydrationWarning>{String(value).padStart(2, "0")}</strong>
                  <small>{label}</small>
                </div>
              ))}
            </div>

            <div className="action-row">
              <a className="button button-acid hero-register-btn" href="#register">
                Register Now <ArrowUpRight size={18} />
              </a>
              <a className="button button-dark" href="#about">
                Explore Void
              </a>
            </div>
          </div>

          <div className="hero-visual-col reveal reveal-delay">
            <CypherKeyboardVisual />
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to explore">
        <ChevronDown size={18} /> Scroll to descend
      </a>
    </section>
  );
}

export default HeroSection;
