"use client";

import { useEffect, useMemo, useState } from "react";

const SEGMENT_COUNT = 24;
const STATUS_STEPS = [
  [0,  "INITIALIZING"],
  [30, "DECRYPTING"],
  [60, "LOADING"],
  [90, "READY"],
] as const;

function getStatus(progress: number) {
  return [...STATUS_STEPS].reverse().find(([t]) => progress >= t)?.[1] ?? STATUS_STEPS[0][1];
}

type BootLoaderProps = { onComplete?: () => void };

export function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const segments = useMemo(() => Array.from({ length: SEGMENT_COUNT }), []);

  useEffect(() => {
    document.body.classList.add("boot-is-locked");
    const duration = 2800;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = t < 1 ? t : 1;
      const next = Math.min(100, Math.round(eased * 100));
      setProgress(next);

      if (t < 1) { frame = requestAnimationFrame(tick); return; }

      setIsReady(true);
      setTimeout(() => setIsExiting(true), 400);
      setTimeout(() => {
        document.body.classList.remove("boot-is-locked");
        setIsVisible(false);
        onComplete?.();
      }, 900);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("boot-is-locked");
    };
  }, [onComplete]);

  if (!isVisible) return null;

  const activeSegments = Math.ceil((progress / 100) * SEGMENT_COUNT);
  const status = getStatus(progress);

  return (
    <div
      className={`boot-loader bl2${isExiting ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!isReady}
    >
      {/* Subtle grid */}
      <div className="bl2-grid" />

      {/* Card */}
      <div className="bl2-card">
        {/* Corner brackets */}
        <span className="bl2-corner bl2-corner--tl" />
        <span className="bl2-corner bl2-corner--br" />

        {/* Top label */}
        <p className="bl2-eyebrow">CYPHER // SYSTEM BOOT &nbsp;&bull;&nbsp; V4.0.0</p>

        {/* Title */}
        <h1 className="bl2-title">CYPHER <em>4.0</em></h1>

        {/* Status + percentage */}
        <div className="bl2-status">
          <span className="bl2-dot" aria-hidden="true" />
          <span className="bl2-status-text">{status}</span>
          <span className="bl2-pct">{String(progress).padStart(2, "0")}%</span>
        </div>

        {/* Segmented bar */}
        <div
          className="bl2-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          {segments.map((_, i) => (
            <span
              key={i}
              className={i < activeSegments ? "bl2-seg bl2-seg--on" : "bl2-seg"}
            />
          ))}
        </div>

        {/* Footer */}
        <p className="bl2-footer">
          <span>ATRIA INSTITUTE &bull; ROTARACT CLUB</span>
          <span>{isReady ? "SYSTEM READY" : "AWAITING HANDSHAKE"}</span>
        </p>
      </div>

      <style jsx>{`
        /* ── overlay ── */
        .bl2 {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          background: var(--paper, #05060b);
          font-family: var(--font-mono, monospace);
          color: var(--white, #f5f4ed);
          opacity: 1;
          transition: opacity .55s cubic-bezier(.65,0,.35,1);
        }
        .bl2.is-exiting { opacity: 0; pointer-events: none; }

        /* ── subtle grid ── */
        .bl2-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,244,237,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,244,237,.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* ── card ── */
        .bl2-card {
          position: relative;
          width: min(480px, calc(100vw - 40px));
          padding: 36px 36px 28px;
          border: 1px solid rgba(245,244,237,.12);
          background: rgba(255,255,255,.02);
          animation: bl2-in .6s cubic-bezier(.22,1,.36,1) both;
        }

        /* ── corner brackets ── */
        .bl2-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--acid, #eaff00);
          border-style: solid;
        }
        .bl2-corner--tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .bl2-corner--br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        /* ── eyebrow ── */
        .bl2-eyebrow {
          margin: 0 0 20px;
          font-size: 8px;
          letter-spacing: .18em;
          color: rgba(245,244,237,.35);
        }

        /* ── title ── */
        .bl2-title {
          margin: 0 0 28px;
          font-family: var(--font-display, sans-serif);
          font-size: clamp(3rem, 10vw, 4.5rem);
          font-weight: 400;
          letter-spacing: -.03em;
          line-height: 1;
          text-transform: uppercase;
        }
        .bl2-title em {
          color: var(--acid, #eaff00);
          font-style: normal;
        }

        /* ── status row ── */
        .bl2-status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .bl2-dot {
          width: 6px;
          height: 12px;
          background: var(--acid, #eaff00);
          flex-shrink: 0;
          animation: bl2-blink .8s steps(2,end) infinite;
        }
        .bl2-status-text {
          flex: 1;
          font-size: 9px;
          letter-spacing: .16em;
          color: var(--cyan, #00f0ff);
        }
        .bl2-pct {
          font-family: var(--font-display, sans-serif);
          font-size: 1.6rem;
          font-weight: 400;
          letter-spacing: -.04em;
          color: var(--white, #f5f4ed);
        }

        /* ── segmented bar ── */
        .bl2-bar {
          display: grid;
          grid-template-columns: repeat(${SEGMENT_COUNT}, 1fr);
          gap: 3px;
          margin-bottom: 24px;
        }
        .bl2-seg {
          height: 3px;
          background: rgba(245,244,237,.1);
          border-radius: 1px;
        }
        .bl2-seg--on {
          background: var(--acid, #eaff00);
        }
        .bl2-seg--on:nth-child(4n) {
          background: var(--cyan, #00f0ff);
        }

        /* ── footer ── */
        .bl2-footer {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin: 0;
          padding-top: 16px;
          border-top: 1px solid rgba(245,244,237,.08);
          font-size: 8px;
          letter-spacing: .12em;
          color: rgba(245,244,237,.28);
        }
        .bl2-footer span:last-child { color: var(--acid, #eaff00); }

        @media (max-width: 480px) {
          .bl2-card {
            padding: 24px 18px 20px;
            width: min(340px, calc(100vw - 28px));
          }
          .bl2-title {
            margin-bottom: 20px;
            font-size: 2.8rem;
          }
          .bl2-footer {
            flex-direction: column;
            gap: 4px;
            font-size: 7.5px;
          }
        }

        /* ── animations ── */
        @keyframes bl2-in {
          from { opacity: 0; transform: translateY(10px) scale(.97); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes bl2-blink {
          50% { opacity: .25; transform: scaleY(.5); }
        }
      `}</style>
    </div>
  );
}

export default BootLoader;
