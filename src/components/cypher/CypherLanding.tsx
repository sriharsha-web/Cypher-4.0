"use client";

import { useEffect, useState } from "react";
import { BootLoader } from "@/components/BootLoader";
import { ParallaxStarsBackground } from "@/components/ParallaxStarsBackground";
import { ScrollChoreography } from "@/components/ScrollChoreography";
import { AboutSection } from "./AboutSection";
import { ExperienceSection } from "./ExperienceSection";
import { FinaleSection } from "./FinaleSection";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { SponsorSection } from "./SponsorSection";
import { RegistrationSection } from "./RegistrationSection";
import { FaqSection } from "./FaqSection";
import { ScheduleSection } from "./ScheduleSection";
import { PastEventsSection } from "./PastEventsSection";
import { tracks } from "./data";

// October 9, 2026, 14:00:00 IST (2:00 PM IST => UTC+5:30 -> 08:30:00 UTC)
const TARGET_EVENT_DATE = Date.UTC(2026, 9, 9, 8, 30, 0);

function calculateTimeLeft() {
  const difference = TARGET_EVENT_DATE - Date.now();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function CypherLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = window.setInterval(() => {
      const current = calculateTimeLeft();
      setTimeLeft(current);
      if (
        current.days === 0 &&
        current.hours === 0 &&
        current.minutes === 0 &&
        current.seconds === 0
      ) {
        window.clearInterval(timer);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="site-shell">
      <BootLoader />
      <ParallaxStarsBackground speed={1} />
      <ScrollChoreography />
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />
      <main id="top">
        <HeroSection timeLeft={timeLeft} />
        <AboutSection />
        <ExperienceSection />
        <ScheduleSection
          activeTrack={tracks[trackIndex]}
          tracks={tracks}
          activeIndex={trackIndex}
          onMove={(direction) =>
            setTrackIndex((index) => (index + direction + tracks.length) % tracks.length)
          }
          onSelect={setTrackIndex}
        />
        <PastEventsSection />
        <SponsorSection />
        <RegistrationSection />
        <FaqSection />
        <FinaleSection />
      </main>
      <Footer />
    </div>
  );
}

export default CypherLanding;
