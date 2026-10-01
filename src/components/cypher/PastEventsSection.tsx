"use client";

import { Calendar, Users, Rocket, Sparkles, ArrowUpRight, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PastEvent {
  edition: string;
  year: string;
  tag: string;
  status: string;
  isCurrent?: boolean;
  accent: "purple" | "cyan" | "acid";
  stats: { label: string; value: string }[];
  description: string;
  highlights: string[];
}

const pastEvents: PastEvent[] = [
  {
    edition: "CYPHER 1.0",
    year: "OCTOBER 2023",
    tag: "THE GENESIS SPRINT",
    status: "MISSION COMPLETED",
    accent: "acid",
    stats: [
      { label: "Astronauts", value: "250+" },
      { label: "Squadrons", value: "60+" },
      { label: "Campuses", value: "18+" },
    ],
    description: "The inaugural 24-hour build-a-thon uniting ambitious student developers. Squads architected decentralized protocols, hardware automation, and resilient cloud systems.",
    highlights: [
      "Inaugural flagship hackathon by Rotaract Atria",
      "45+ working prototypes shipped in 24 hours",
      "Hands-on mentorship from startup founders & alumni",
    ],
  },
  {
    edition: "CYPHER 2.0",
    year: "OCTOBER 2024",
    tag: "COSMIC EXPANSION",
    status: "MISSION COMPLETED",
    accent: "purple",
    stats: [
      { label: "Astronauts", value: "380+" },
      { label: "Squadrons", value: "95+" },
      { label: "Mentors", value: "30+" },
    ],
    description: "Scaled to dual engineering tracks covering Autonomous AI agents, Computer Vision, and Web3 infra. Backed by high-tier developer tooling sponsors and tech leaders.",
    highlights: [
      "Specialized tracks: AI/ML, Decentralized Web & IoT",
      "Direct fast-track interview opportunities for finalists",
      "₹50,000+ worth of bounties, hardware kits & swags",
    ],
  },
  {
    edition: "CYPHER 3.0",
    year: "OCTOBER 2025",
    tag: "QUANTUM LEAP",
    status: "MISSION COMPLETED",
    accent: "cyan",
    stats: [
      { label: "Astronauts", value: "460+" },
      { label: "Squadrons", value: "115+" },
      { label: "Universities", value: "35+" },
    ],
    description: "South India's premier student-led developer arena with non-stop hacking, round-the-clock architecture reviews, and high-stakes demos before industry judges.",
    highlights: [
      "35+ universities represented across Karnataka & beyond",
      "Multiple hackathon projects transitioned into early startups",
      "Overwhelming community feedback & record engagement",
    ],
  },
  {
    edition: "CYPHER 4.0",
    year: "OCT 9-10, 2026",
    tag: "THE CURRENT ORBIT",
    status: "REGISTRATIONS LIVE",
    isCurrent: true,
    accent: "acid",
    stats: [
      { label: "Astronauts", value: "500+" },
      { label: "Squadrons", value: "120+" },
      { label: "Fuel Pool", value: "₹75K+" },
    ],
    description: "The biggest, most ambitious edition yet. 24 hours of intense engineering, elite mentorship, production-ready tracks, and recognition at Atria Institute Auditorium.",
    highlights: [
      "Dedicated tracks for Atrians (₹250) & Non-Atrians (₹290)",
      "Meals, swags, certificates & round-the-clock mentorship",
      "Direct networking with top tech innovators & sponsors",
    ],
  },
];

export function PastEventsSection() {
  return (
    <section id="past-events" className="section past-events-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="mono-label acid-text">06 / ARCHIVES &amp; LEGACY</p>
            <h2>
              PAST EVENTS <span>// CYPHER</span>
            </h2>
          </div>
          <p>
            A proven track record of technical intensity. Explore the lineage of South India&apos;s premier 24-hour build-a-thon.
          </p>
        </div>

        <div className="past-events-grid">
          {pastEvents.map((evt) => (
            <article
              key={evt.edition}
              className={`past-event-card past-event-${evt.accent} ${evt.isCurrent ? "is-current-edition" : ""}`}
            >
              <div className="past-event-header">
                <div className="past-event-badge-row">
                  <span className="past-event-edition">{evt.edition}</span>
                  <span className={`past-event-status ${evt.isCurrent ? "status-live" : "status-done"}`}>
                    {evt.status}
                  </span>
                </div>
                <div className="past-event-tagline">
                  <span className="past-event-year">{evt.year}</span>
                  <span className="past-event-tag-pill">{evt.tag}</span>
                </div>
              </div>

              <div className="past-event-stats">
                {evt.stats.map((s) => (
                  <div key={s.label} className="past-event-stat-box">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <p className="past-event-desc">{evt.description}</p>

              <div className="past-event-highlights">
                <span className="past-event-hl-title">MISSION HIGHLIGHTS:</span>
                <ul>
                  {evt.highlights.map((hl, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} className="past-event-check" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {evt.isCurrent ? (
                <a href="#register" className="button button-acid past-event-action-btn">
                  Register For 4.0 <ArrowUpRight size={16} />
                </a>
              ) : (
                <div className="past-event-archive-flag">
                  <span>✦ ARCHIVED SPRINT</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PastEventsSection;
