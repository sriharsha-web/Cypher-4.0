use client";

import { useEffect, useState } from "react";

type BootLoaderProps = { onComplete?: () => void };

export function BootLoader({ onComplete }: BootLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add("boot-is-locked");
    
    // Minimal loader duration
    const exitTimer = window.setTimeout(() => setIsExiting(true), 1500);
    const removeTimer = window.setTimeout(() => {
      document.body.classList.remove("boot-is-locked");
      setIsVisible(false);
      onComplete?.();
    }, 2000); 

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("boot-is-locked");
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`boot-loader minimal-loader ${isExiting ? "is-exiting" : ""}`} role="status" aria-live="polite">
      <div className="minimal-loader-content">
        <span className="minimal-spinner"></span>
        <h1>CYPHER 4.0</h1>
      </div>
      <style jsx>{`
        .minimal-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease;
        }
        .minimal-loader.is-exiting {
          opacity: 0;
          pointer-events: none;
        }
        .minimal-loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        h1 {
          font-size: 1.5rem;
          letter-spacing: 0.2em;
          font-weight: 300;
          margin: 0;
        }
        .minimal-spinner {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default BootLoader;
