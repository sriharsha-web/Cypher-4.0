"use client";

import { useEffect, useMemo, useState } from "react";

const SEGMENT_COUNT = 36;
const STATUS_STEPS = [
  [0, "INITIALIZING CYPHER CORE"],
  [20, "ESTABLISHING NEURAL LINK"],
  [40, "DECRYPTING INTERFACE"],
  [60, "LOADING EXPERIENCE"],
  [80, "SYNCHRONIZING MODULES"],
  [95, "SYSTEM READY"],
] as const;

type BootLoaderProps = { onComplete?: () => void };

function getStatus(progress: number) {
  return [...STATUS_STEPS].reverse().find(([threshold]) => progress >= threshold)?.[1] ?? STATUS_STEPS[0][1];
}

export function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const segments = useMemo(() => Array.from({ length: SEGMENT_COUNT }), []);

  useEffect(() => {
    document.body.classList.add("boot-is-locked");
    if (!hasStarted) return () => document.body.classList.remove("boot-is-locked");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 1400 : 4600;
    const startedAt = performance.now();
    let frame = 0;
    let exitTimer = 0;
    let removeTimer = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const linearProgress = Math.min(1, elapsed / duration);
      const easedProgress = linearProgress > 0.95
        ? 0.95 + ((linearProgress - 0.95) / 0.05) * 0.05
        : linearProgress;
      const nextProgress = Math.min(100, Math.round(easedProgress * 100));
      setProgress(nextProgress);

      if (linearProgress < 1) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      setIsReady(true);
      exitTimer = window.setTimeout(() => setIsExiting(true), 350);
      removeTimer = window.setTimeout(() => {
        document.body.classList.remove("boot-is-locked");
        setIsVisible(false);
        onComplete?.();
      }, 1050);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("boot-is-locked");
    };
  }, [hasStarted, onComplete]);

  if (!isVisible) return null;

  const status = hasStarted ? getStatus(progress) : "PLACE POINTER TO INITIALIZE";

  return <div className={`boot-loader${isExiting ? " is-exiting" : ""}${hasStarted ? "" : " is-paused"}`} role="status" aria-live="polite" aria-busy={hasStarted && !isReady}>
    <div className="boot-grid" />
    <div className="boot-noise" />
    <section className="boot-window" onPointerEnter={() => setHasStarted(true)} onPointerDown={() => setHasStarted(true)} onFocus={() => setHasStarted(true)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setHasStarted(true); }} tabIndex={0} aria-label="CYPHER system boot sequence">
      <header className="boot-window-header"><span>CYPHER // SYSTEM BOOT</span><span>VERSION 4.0.0</span><i aria-hidden="true">+</i></header>
      <div className="boot-window-body">
        <div className="boot-heading"><span className="boot-kicker">CY_04 / SECURE INITIALIZATION</span><h1>CYPHER <b>4.0</b></h1><p>SYSTEM INITIALIZATION</p></div>
        <div className="boot-status-row"><span className="boot-indicator" aria-hidden="true" /><span>{status}</span><strong>{String(progress).padStart(2, "0")}%</strong></div>
        <div className="boot-progress" aria-label={`${progress}% loaded`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>{segments.map((_, index) => <span className={index < Math.ceil((progress / 100) * SEGMENT_COUNT) ? "is-active" : ""} key={index} />)}</div>
        <div className="boot-diagnostics"><span>NODE: CYPHER-04</span><span>CORE: ONLINE</span><span>MEM: 64K</span><span>SECURE CHANNEL: ACTIVE</span></div>
        <div className="boot-footer"><span>ATRIA INSTITUTE / ROTARACT CLUB</span><span>{isReady ? "SYSTEM READY" : "AWAITING HANDSHAKE"}</span></div>
      </div>
    </section>
  </div>;
}

export default BootLoader;