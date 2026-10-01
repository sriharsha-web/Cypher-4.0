"use client";

import { useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import type { Track } from "./data";

type ScheduleSectionProps = { activeTrack: Track; tracks: Track[]; onMove: (direction: number) => void; onSelect: (index: number) => void; activeIndex: number };

export function ScheduleSection({ activeTrack, tracks, onSelect, activeIndex }: ScheduleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;
      
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      
      let newIndex = Math.floor(scrollProgress * tracks.length);
      newIndex = Math.min(tracks.length - 1, Math.max(0, newIndex));
      
      if (newIndex !== activeIndex) {
        onSelect(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tracks.length, activeIndex, onSelect]);

  return (
    <section id="schedule" ref={sectionRef} className="section tracks-section section-dark">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="mono-label cyan-text">05 / TIMELINE</p>
            <h2>SYSTEM OVERRIDE <span>/ 4.0</span></h2>
          </div>
          <p>The official 24-hour itinerary and timeline from check-in to final prize distribution.</p>
        </div>
        
        <div className={`track-card track-${activeTrack.accent}`}>
          <div className="track-content">
            <div className="zone-meta-row">
              <span className="zone-tag">ZONE {activeTrack.number}</span>
              <span className="zone-time"><Clock size={13} /> {activeTrack.time}</span>
            </div>
            <h3>{activeTrack.title}</h3>
            <p>{activeTrack.copy}</p>
          </div>
          <div className="track-number">{activeTrack.number}</div>
        </div>
        
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
              {track.number}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScheduleSection;
