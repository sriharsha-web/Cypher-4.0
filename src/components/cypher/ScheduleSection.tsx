"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
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
  onMove,
  onSelect,
  activeIndex,
}: ScheduleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Scroll-based timeline zone switching
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Check if section is pinned or in view
          const stickyTop = 90;
          const scrollableDistance = rect.height - (windowHeight - stickyTop);

          if (scrollableDistance > 100) {
            // Desktop sticky scrolling mode
            const currentScroll = stickyTop - rect.top;
            if (currentScroll >= 0 && currentScroll <= scrollableDistance) {
              const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));
              const newIndex = Math.min(tracks.length - 1, Math.floor(progress * tracks.length));
              if (newIndex !== activeIndex) {
                onSelect(newIndex);
              }
            }
          } else {
            // Normal section scrolling mode (tablet / mobile)
            const enterPoint = windowHeight * 0.7;
            const exitPoint = -rect.height * 0.3;
            const totalSpan = enterPoint - exitPoint;
            if (totalSpan > 0 && rect.top <= enterPoint && rect.top >= exitPoint) {
              const progress = Math.max(0, Math.min(1, (enterPoint - rect.top) / totalSpan));
              const newIndex = Math.min(tracks.length - 1, Math.floor(progress * tracks.length));
              if (newIndex !== activeIndex) {
                onSelect(newIndex);
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tracks.length, activeIndex, onSelect]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        // Swiped left -> next
        onMove(1);
      } else {
        // Swiped right -> prev
        onMove(-1);
      }
    }
    touchStartX.current = null;
  };

  const progressPercent = Math.round(((activeIndex + 1) / tracks.length) * 100);

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="section tracks-section section-dark"
      aria-label="Event Schedule and Timeline"
    >
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="mono-label cyan-text">05 / TIMELINE</p>
            <h2>
              SYSTEM OVERRIDE <span>/ 4.0</span>
            </h2>
          </div>
          <p>
            The official 24-hour itinerary and timeline from check-in to final demos and awards ceremony.
          </p>
        </div>

        {/* Timeline Progress Bar */}
        <div className="timeline-progress-track" aria-hidden="true">
          <div
            className="timeline-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Active Track Card with keyframe transition */}
        <div
          key={activeTrack.number}
          className={`track-card track-${activeTrack.accent} track-animated`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="track-content">
            <div className="zone-meta-row">
              <span className="zone-tag">ZONE {activeTrack.number} / 05</span>
              <span className="zone-time">
                <Clock size={13} /> {activeTrack.time}
              </span>
              <div className="track-nav-arrows">
                <button
                  type="button"
                  onClick={() => onMove(-1)}
                  className="track-arrow-btn"
                  aria-label="Previous Zone"
                  title="Previous Zone"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onMove(1)}
                  className="track-arrow-btn"
                  aria-label="Next Zone"
                  title="Next Zone"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <h3 className="track-title">{activeTrack.title}</h3>
            <p className="track-copy">{activeTrack.copy}</p>
          </div>

          <div className="track-number" aria-hidden="true">
            <span>{activeTrack.number}</span>
          </div>
        </div>

        {/* Interactive Zone Buttons */}
        <div className="track-dots" role="tablist" aria-label="Schedule Zones">
          {tracks.map((track, index) => (
            <button
              key={track.number}
              onClick={() => onSelect(index)}
              className={index === activeIndex ? "active" : ""}
              aria-label={`Zone ${track.number}: ${track.title}`}
              role="tab"
              aria-selected={index === activeIndex}
            >
              <span>{track.number}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScheduleSection;
