"use client";

import { Calendar, Users, Rocket, Award, CheckCircle2, ArrowUpRight } from "lucide-react";

interface PastEvent {
  edition: string;
  year: string;
  codename: string;
  badge: string;
  accent: "acid" | "purple" | "cyan";
  stats: { label: string; value: string }[];
  summary: string;
  highlights: string[];
}

const pastEditions: PastEvent[] = [
  {
    edition: "CYPHER 1.0",
    year: "OCTOBER 2023",
    codename: "THE GENESIS ORBIT",
    badge: "MISSION 01 // ARCHIVED",
    accent: "acid",
    stats: [
      { label: "Astronauts", value: "250+" },
      { label: "Squadrons", value: "60+" },
      { label: "Campuses", value: "18+" },
    ],
    summary: "The foundational 24-hour sprint that established the CYPHER legacy. Student teams architected decentralized tools, hardware prototypes, and resilient cloud systems under high intensity.",
    highlights: [
      "Inaugural flagship 24-hour build-a-thon",
      "45+ functional prototypes shipped on stage",
      "Mentorship from startup founders & Atria alumni",
    ],
  },
  {
    edition: "CYPHER 2.0",
    year: "OCTOBER 2024",
    codename: "COSMIC EXPANSION",
    badge: "MISSION 02 // ARCHIVED",
    accent: "purple",
    stats: [
      { label: "Astronauts", value: "380+" },
      { label: "Squadrons", value: "95+" },
      { label: "Mentors", value: "30+" },
    ],
    summary: "Scaled to specialized developer tracks covering Autonomous AI agents, Computer Vision, and Web3 infrastructure, backed by developer tooling partners and tech leaders.",
    highlights: [
      "Dual specialized engineering tracks",
      "Fast-track interview pipelines for top squads",
      "₹50,000+ worth of bounties & hardware toolkits",
    ],
  },
  {
    edition: "CYPHER 3.0",
    year: "OCTOBER 2025",
    codename: "QUANTUM LEAP",
    badge: "MISSION 03 // ARCHIVED",
    accent: "cyan",
    stats: [
      { label: "Astronauts", value: "460+" },
      { label: "Squadrons", value: "115+" },
      { label: "Universities", value: "35+" },
    ],
    summary: "South India\'s premier student-led hackathon with non-stop hacking, round-the-clock technical architecture reviews, and high-stakes live demos evaluated by prominent industry judges.",
    highlights: [
      "35+ universities represented across Karnataka & beyond",
      "Multiple hackathon prototypes funded into early startups",
      "Record community acclaim & high-tier sponsor backing",
    ],
  },
];

export function PastEventsSection() {
  return (
    <section id="past-events" className="section past-events-section" aria-label="Past Events">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="mono-label acid-text">06 / ARCHIVES &amp; LEGACY</p>
            <h2>
              PAST EVENTS <span>// CYPHER</span>
            </h2>
          </div>
          <p>
            A battle-tested track record of technical intensity. Explore the lineage of South India&apos;s premier 24-hour build-a-thon.
          </p>
        </div>

        {/* 3-Column Clean Legacy Cards Grid */}
        <div className="past-events-grid-clean">
          {pastEditions.map((evt) => (
            <article
              key={evt.edition}
              className={`past-card-clean past-accent-${evt.accent}`}
            >
              <div className="past-card-top">
                <div className="past-badge-row">
                  <span className="past-edition-title">{evt.edition}</span>
                  <span className="past-badge-pill">{evt.badge}</span>
                </div>
                <div className="past-codename-row">
                  <span className="past-codename">{evt.codename}</span>
                  <span className="past-year-pill">{evt.year}</span>
                </div>
              </div>

              {/* 3 Stat Badges */}
              <div className="past-stats-clean">
                {evt.stats.map((s) => (
                  <div key={s.label} className="past-stat-item">
                    <strong>{s.value}</strong>
                    <small>{s.label}</small>
                  </div>
                ))}
              </div>

              <p className="past-summary-text">{evt.summary}</p>

              <div className="past-hl-list">
                <span className="past-hl-heading">KEY MILESTONES:</span>
                <ul>
                  {evt.highlights.map((hl, i) => (
                    <li key={i}>
                      <CheckCircle2 size={13} className="past-hl-check" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="past-card-footer">
                <span className="past-archived-stamp">✦ SPRINT ARCHIVED</span>
              </div>
            </article>
          ))}
        </div>

        {/* High-Voltage Banner for CYPHER 4.0 */}
        <div className="cypher4-banner">
          <div className="cypher4-banner-content">
            <div className="cypher4-banner-tag">
              <span className="pulse-dot" />
              <span>CURRENT MISSION: CYPHER 4.0</span>
            </div>
            <h3>READY TO WRITE THE NEXT CHAPTER?</h3>
            <p>
              Join 500+ builders, innovators, and squads at Atria Institute Auditorium on October 9–10, 2026.
              ₹75,000+ prize pool, elite mentorship, and round-the-clock fuel.
            </p>
          </div>
          <div className="cypher4-banner-action">
            <a href="#register" className="button button-acid cypher4-banner-btn">
              Register For 4.0 <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PastEventsSection;
