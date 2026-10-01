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

const TARGET_EVENT_DATE = new Date("2026-10-09T09:00:00+05:30").getTime();

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
      setTimeLeft(calculateTimeLeft());
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
