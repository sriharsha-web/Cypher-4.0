"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Clock } from "lucide-react";
import type { Track } from "./data";

type ScheduleSectionProps = {
  activeTrack: Track;
  tracks: Track[];
  onMove: (direction: number) => void;
  onSelect: (index: number) => void;
  activeIndex: number;
};

export function ScheduleSection({
  activeTrack,
  tracks,
  onSelect,
  activeIndex,
}: ScheduleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isClickingTab = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Smooth scroll handler for pinned timeline transition
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      if (isClickingTab.current) return;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // Calculate progress 0..1 through the section
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // 5 equal zones
      const newIndex = Math.min(
        tracks.length - 1,
        Math.max(0, Math.floor(progress * tracks.length))
      );

      if (newIndex !== activeIndex) {
        onSelect(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tracks.length, activeIndex, onSelect, reducedMotion]);

  // Click on a zone tab -> smoothly scroll to that zone
  const scrollToZone = useCallback(
    (index: number) => {
      onSelect(index);
      if (reducedMotion || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const sectionTop = window.scrollY + rect.top;
      // Target progress is centered in that zone segment
      const targetProgress = (index + 0.35) / tracks.length;
      const targetScroll = sectionTop + targetProgress * scrollableDistance;

      isClickingTab.current = true;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
      setTimeout(() => {
        isClickingTab.current = false;
      }, 700);
    },
    [onSelect, tracks.length, reducedMotion]
  );

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe must be greater than vertical movement
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && activeIndex < tracks.length - 1) {
        scrollToZone(activeIndex + 1);
      } else if (diffX < 0 && activeIndex > 0) {
        scrollToZone(activeIndex - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const progressPercent = ((activeIndex + 1) / tracks.length) * 100;

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className={`section tracks-section section-dark ${
        reducedMotion ? "reduced-motion" : ""
      }`}
      aria-label="Event Schedule Timeline"
    >
      <div className="shell schedule-shell">
        <div className="section-heading">
          <div>
            <p className="mono-label cyan-text">05 / TIMELINE</p>
            <h2>
              SYSTEM OVERRIDE <span>/ 4.0</span>
            </h2>
          </div>
          <p>
            The official 24-hour itinerary and timeline from check-in to final prize distribution.
          </p>
        </div>

        {/* Timeline progress rail */}
        <div className="timeline-progress-rail" aria-hidden="true">
          <div
            className="timeline-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Dynamic Card with smooth progressive transition */}
        <div
          className={`track-card track-${activeTrack.accent} track-animated`}
          key={activeTrack.number}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="track-content track-content-transition">
            <div className="zone-meta-row">
              <span className="zone-tag">ZONE {activeTrack.number}</span>
              <span className="zone-time">
                <Clock size={13} /> {activeTrack.time}
              </span>
            </div>
            <h3 className="track-title-transition">{activeTrack.title}</h3>
            <p className="track-copy-transition">{activeTrack.copy}</p>
          </div>
          <div className="track-number track-number-transition">
            {activeTrack.number}
          </div>
        </div>

        {/* 01 - 05 Tab Controls */}
        <div className="track-dots" role="tablist" aria-label="Schedule Zones">
          {tracks.map((track, index) => (
            <button
              key={track.number}
              onClick={() => scrollToZone(index)}
              className={index === activeIndex ? "active" : ""}
              aria-label={`Zone ${track.number}: ${track.title}`}
              role="tab"
              aria-selected={index === activeIndex}
            >
              {track.number}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScheduleSection;
