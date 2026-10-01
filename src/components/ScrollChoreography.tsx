"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ScrollChoreography() {
  useEffect(() => {
    const root = document.documentElement;
    const statement = document.querySelector<HTMLElement>(".statement");
    const stageProgress = (element: HTMLElement | null) => {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;
      const height = rect.height || element.offsetHeight;
      if (height > vh) {
        const range = height - vh;
        return clamp(-rect.top / range);
      }
      const total = vh + height;
      if (total <= 0) return 0;
      return clamp((vh - rect.top) / total);
    };

    if (statement) statement.dataset.copy = statement.textContent?.trim() ?? "";

    let frame = 0;
    const update = () => {
      const heroProgress = stageProgress(document.querySelector<HTMLElement>(".hero"));
      const manifestoProgress = stageProgress(document.querySelector<HTMLElement>("#about"));
      const scheduleProgress = stageProgress(document.querySelector<HTMLElement>("#schedule"));
      const passProgress = stageProgress(document.querySelector<HTMLElement>("#register"));
      const finaleProgress = stageProgress(document.querySelector<HTMLElement>(".finale"));

      root.style.setProperty("--hero-type-y", `${-90 * heroProgress}px`);
      root.style.setProperty("--hero-type-scale", `${1 - heroProgress * 0.26}`);
      root.style.setProperty("--hero-type-alpha", `${1 - heroProgress * 0.72}`);
      root.style.setProperty("--hero-stats-alpha", `${1 - heroProgress * 0.72}`);
      root.style.setProperty("--manifesto-wipe", `${manifestoProgress * 100}%`);
      root.style.setProperty("--manifesto-scale", `${1 + manifestoProgress * 0.05}`);
      root.style.setProperty("--manifesto-progress", `${manifestoProgress}`);
      root.style.setProperty("--schedule-progress", `${scheduleProgress}`);
      root.style.setProperty("--packet-enter", `${38 - passProgress * 38}px`);
      root.style.setProperty("--packet-scale", `${0.78 + passProgress * 0.22}`);
      root.style.setProperty("--packet-alpha", `${clamp(passProgress * 1.8)}`);
      root.style.setProperty("--season-y", `${-4 + finaleProgress * 8}%`);
      root.style.setProperty("--season-scale", `${1.1 - finaleProgress * 0.045}`);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll("[data-rev], .reveal").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

export default ScrollChoreography;