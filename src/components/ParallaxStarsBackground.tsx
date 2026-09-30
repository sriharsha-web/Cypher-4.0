"use client";

import { useEffect, useMemo, useRef } from "react";

export interface ParallaxStarsBackgroundProps {
  className?: string;
  speed?: number;
}

function generateBoxShadows(count: number, seed: number, color: string) {
  let state = seed;
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  return Array.from({ length: count }, () => `${Math.floor(next() * 2000)}px ${Math.floor(next() * 2000)}px ${color}`).join(",");
}

export function ParallaxStarsBackground({ className = "", speed = 1 }: ParallaxStarsBackgroundProps) {
  const smallRef = useRef<HTMLDivElement>(null);
  const mediumRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const shadows = useMemo(() => [
    generateBoxShadows(420, 11, "rgba(245,244,237,.72)"),
    generateBoxShadows(140, 37, "rgba(22,213,208,.86)"),
    generateBoxShadows(60, 73, "rgba(234,255,0,.92)"),
  ], []);

  useEffect(() => {
    const layerRefs = [smallRef, mediumRef, bigRef];
    let frame = 0;
    const updateParallax = () => {
      const offset = window.scrollY;
      layerRefs.forEach((layer, index) => {
        if (layer.current) layer.current.style.transform = `translate3d(0, ${-offset * (0.018 + index * 0.018)}px, 0)`;
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const durations = [50, 100, 150].map((duration) => `${duration / Math.max(speed, 0.1)}s`);

  return (
    <div className={`parallax-stars-bg ${className}`} aria-hidden="true">
      <style>{`
        @keyframes cypher-stars-rise { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, -2000px, 0); } }
        .cypher-star-layer { position: absolute; left: 0; top: 0; background: transparent; will-change: transform; }
        .cypher-star-layer::after { content: ""; position: absolute; top: 2000px; left: 0; background: transparent; }
      `}</style>
      {[1, 2, 3].map((size, index) => (
        <div
          className="cypher-star-layer"
          key={size}
          ref={[smallRef, mediumRef, bigRef][index]}
          style={{
            width: size,
            height: size,
            boxShadow: shadows[index],
            animation: `cypher-stars-rise ${durations[index]} linear infinite`,
          }}
        >
          <div style={{ width: size, height: size, boxShadow: shadows[index], background: "transparent" }} />
        </div>
      ))}
    </div>
  );
}

export default ParallaxStarsBackground;