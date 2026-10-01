"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";

export function PastEventsSection() {
  return (
    <section id="past-events" className="section past-events-section" aria-label="Past Events">
      <div className="shell">
        <div className="past-glimpse-wrapper">
          <a
            href="https://www.instagram.com/rotaract_atria"
            target="_blank"
            rel="noopener noreferrer"
            className="past-glimpse-card"
            aria-label="Have a glimpse of past events"
          >
            <div className="past-glimpse-left">
              <div className="past-glimpse-pill">
                <Sparkles size={13} className="glimpse-sparkle" />
                <span>ARCHIVES</span>
              </div>
              <h2 className="past-glimpse-title">Have a glimpse of past events</h2>
            </div>
            <div className="past-glimpse-action">
              <span className="past-glimpse-arrow">
                <ArrowUpRight size={22} />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default PastEventsSection;
