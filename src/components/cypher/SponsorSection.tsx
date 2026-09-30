"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { sponsors } from "@/data/sponsors";

export function SponsorSection() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // We default to the last cell being active
  const [activeIndex, setActiveIndex] = useState<number>(sponsors.length - 1);

  // ResizeObserver & Highlight Logic
  useLayoutEffect(() => {
    const grid = gridRef.current;
    const highlight = highlightRef.current;
    if (!grid || !highlight) return;

    const moveHighlight = (index: number) => {
      const cell = cellRefs.current[index];
      if (!cell) return;
      const gRect = grid.getBoundingClientRect();
      const cRect = cell.getBoundingClientRect();

      highlight.style.transform = `translate(${cRect.left - gRect.left}px, ${cRect.top - gRect.top}px)`;
      highlight.style.width = `${cRect.width}px`;
      highlight.style.height = `${cRect.height}px`;
      highlight.style.backgroundColor = sponsors[index].color;
    };

    // First paint without transition
    highlight.style.transition = "none";
    moveHighlight(activeIndex);

    // Enable transition on next frame
    const frameId = requestAnimationFrame(() => {
      highlight.style.transition = `
        transform var(--dur-slide) var(--ease),
        width var(--dur-slide) var(--ease),
        height var(--dur-slide) var(--ease),
        background-color var(--dur-slide) var(--ease)
      `;
    });

    const observer = new ResizeObserver(() => {
      // Temporarily disable transition during resize for snappiness
      highlight.style.transition = "none";
      moveHighlight(activeIndex);
      // Re-enable transition
      requestAnimationFrame(() => {
        highlight.style.transition = `
          transform var(--dur-slide) var(--ease),
          width var(--dur-slide) var(--ease),
          height var(--dur-slide) var(--ease),
          background-color var(--dur-slide) var(--ease)
        `;
      });
    });
    observer.observe(grid);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [activeIndex]);

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

        {/* Big Heading */}
        <h2 className="sponsor-heading sponsor-load-in" style={{ transitionDelay: "100ms" }}>
          Sponsors
        </h2>

        {/* Grid Wrapper */}
        <div className="sponsor-grid-wrapper sponsor-load-in" style={{ transitionDelay: "200ms" }} ref={gridRef}>
          <div className="sponsor-highlight" ref={highlightRef}></div>
          <div className="sponsor-grid">
            {sponsors.map((sponsor, idx) => (
              <a
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`sponsor-cell ${activeIndex === idx ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onPointerEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                ref={(el) => { cellRefs.current[idx] = el; }}
              >
                <div className="sponsor-cell-label">{sponsor.name} [↗]</div>
                <div className="sponsor-cell-logo">{sponsor.logo}</div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <a href="#sponsor-form" className="sponsor-cta sponsor-load-in" style={{ transitionDelay: "300ms" }}>
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
