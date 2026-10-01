"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

// Exact 2.5D isometric keycap geometry
const KEY_PATHS = {
  baseLeft:
    "M5.22759 99.0471L0.0782774 148.857C-0.726302 158.372 4.74484 160.909 13.1125 164.239L18.1009 166.142L112.237 194.528C119.317 196.749 127.041 197.224 134.121 195.48L116.903 141.403C110.306 143.148 101.616 142.355 95.0187 140.61L16 119L10.1871 114.043L7.5 107.5L5.22759 99.0471Z",
  baseRight:
    "M173.779 31.6455L177.5 35.5L199.471 90.4686L199.548 90.7713L199.709 92.04L199.711 92.0575C200.221 96.5781 199.698 99.8502 197.479 104.055L197.468 104.076L154.182 182.574L154.121 182.674L153.488 183.61C153.486 183.612 153.484 183.615 153.482 183.618C144.834 196.809 127.21 199.303 113.057 194.926L113.053 194.925L93.5 162.5C93.5 162.5 110.788 140.056 115.11 138.813C119.382 137.584 123.134 134.571 126.971 128.793L127.581 127.74L171.973 43.2559C173.803 39.4941 174.385 36.7283 173.937 32.7351L173.779 31.6455ZM176.402 38.466C176.042 40.4015 175.354 42.2804 174.326 44.3911L174.309 44.426L129.896 128.951L129.87 128.998L129.226 130.108L129.186 130.173C125.145 136.268 120.937 139.827 115.844 141.292C110.8 142.743 102 166 102 166L113.829 192.458L113.838 192.461C127.359 196.645 143.52 194.065 151.286 182.209L151.297 182.193L151.908 181.29L195.155 102.864C195.157 102.86 195.159 102.857 195.16 102.853C197.119 99.1368 197.562 96.3853 197.108 92.3507C197.108 92.348 197.107 92.3453 197.107 92.3427L196.968 91.2475L176.402 38.466Z",
  top:
    "M160.532 24.7952C128.832 20.0377 109.844 14.4873 90.0513 4.97235C75.5688 -1.84671 59.7991 0.849193 53.3624 12.5843C39.0409 38.7505 22.9493 67.4539 8.46684 93.6201C2.0302 105.197 10.7197 116.773 24.8803 124.227C49.9832 137.548 62.6955 139.609 92.3041 145.159C108.235 148.331 125.453 144.525 131.729 132.79C146.211 106.624 160.693 80.4577 175.176 54.2916C181.452 42.5565 176.624 27.1739 160.532 24.7952Z",
  topBorder:
    "M52.2116 11.9703C59.1068 -0.600839 75.7772 -3.18035 90.6177 3.80729L90.6273 3.81182C110.268 13.2536 129.119 18.7744 160.73 23.5184C169.208 24.7721 174.829 29.4913 177.448 35.5271C180.049 41.5216 179.644 48.7085 176.336 54.8934L176.332 54.9016L132.889 133.392C132.888 133.395 132.886 133.397 132.885 133.4C129.532 139.662 123.31 143.718 116.003 145.805C108.694 147.892 100.193 148.046 92.0537 146.426C91.002 146.229 89.9713 146.036 88.9604 145.847C61.5071 140.712 48.6546 138.308 24.262 125.364C17.058 121.572 11.1231 116.671 7.82118 111.123C4.4826 105.512 3.85087 99.2387 7.31922 93.0003C12.4705 83.6931 17.8237 74.068 23.2277 64.3516C33.0219 46.7415 42.9829 28.8316 52.211 11.9713L52.2116 11.9703ZM54.5165 13.1981C45.2849 30.0647 35.3158 47.9894 25.5186 65.6049C20.1154 75.3198 14.7646 84.9407 9.6186 94.2382L9.6174 94.2404C6.64953 99.5782 7.14428 104.881 10.0813 109.816C13.0547 114.813 18.5437 119.427 25.4991 123.088L25.503 123.09C49.5384 135.844 62.0568 138.186 89.4878 143.318C90.4885 143.505 91.5089 143.696 92.5505 143.891L92.5579 143.892L92.5651 143.894C100.355 145.445 108.425 145.28 115.274 143.325C122.125 141.368 127.647 137.657 130.571 132.188L130.576 132.18L174.018 53.6895C174.02 53.6867 174.021 53.684 174.023 53.6812C176.987 48.1329 177.305 41.7647 175.039 36.5422C172.79 31.3585 167.952 27.1972 160.34 26.0719L160.337 26.0714C128.55 21.3009 109.426 15.7214 89.4831 6.13483C75.3602 -0.512633 60.4939 2.30029 54.5165 13.1981Z",
};

interface KeyConfig {
  id: string;
  keyTrigger: string;
  label: string;
  color: string;
  fontSize?: number;
  freq: number;
  leftCqw: number;
  topCqw: number;
  zIndex: number;
}

// 3-row layout, centered in container query coordinate space
const KEYS_DATA: KeyConfig[] = [
  // Row 1: C, Y, P
  { id: "c", keyTrigger: "c", label: "C", color: "#FF5500", fontSize: 46, freq: 310, leftCqw: 4, topCqw: 1, zIndex: 2 },
  { id: "y", keyTrigger: "y", label: "Y", color: "#C084FC", fontSize: 46, freq: 340, leftCqw: 36, topCqw: 1, zIndex: 2 },
  { id: "p", keyTrigger: "p", label: "P", color: "#16D5D0", fontSize: 46, freq: 370, leftCqw: 68, topCqw: 1, zIndex: 2 },

  // Row 2: H, E, R
  { id: "h", keyTrigger: "h", label: "H", color: "#7B28BD", fontSize: 46, freq: 400, leftCqw: 6, topCqw: 25, zIndex: 4 },
  { id: "e", keyTrigger: "e", label: "E", color: "#FFD600", fontSize: 46, freq: 430, leftCqw: 38, topCqw: 25, zIndex: 4 },
  { id: "r", keyTrigger: "r", label: "R", color: "#00F29D", fontSize: 46, freq: 470, leftCqw: 70, topCqw: 25, zIndex: 4 },

  // Row 3: 4.0, </> (with speech bubble occupying col 1)
  { id: "four", keyTrigger: "4", label: "4.0", color: "#EAFF00", fontSize: 34, freq: 510, leftCqw: 38, topCqw: 49, zIndex: 6 },
  { id: "code", keyTrigger: "/", label: "</>", color: "#F5F4ED", fontSize: 36, freq: 560, leftCqw: 70, topCqw: 49, zIndex: 6 },
];

export function CypherKeyboardVisual() {
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [handActive, setHandActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Mechanical switch audio click with subtle pitch per key
  const playClick = useCallback(
    (freq = 380) => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
          }
        }
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const now = ctx.currentTime;

        // High crisp tactile transient
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = "sine";
        clickOsc.frequency.setValueAtTime(freq * 1.5, now);
        clickOsc.frequency.exponentialRampToValueAtTime(75, now + 0.035);

        clickGain.gain.setValueAtTime(0.09, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start(now);
        clickOsc.stop(now + 0.035);

        // Warm mechanical switch bottom-out thock
        const thockOsc = ctx.createOscillator();
        const thockGain = ctx.createGain();
        thockOsc.type = "triangle";
        thockOsc.frequency.setValueAtTime(freq * 0.7, now);
        thockOsc.frequency.exponentialRampToValueAtTime(50, now + 0.05);

        thockGain.gain.setValueAtTime(0.06, now);
        thockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        thockOsc.connect(thockGain);
        thockGain.connect(ctx.destination);
        thockOsc.start(now);
        thockOsc.stop(now + 0.05);
      } catch {
        // AudioContext ignored if blocked by autoplay policy
      }
    },
    [soundEnabled]
  );

  const triggerKeyAction = useCallback(
    (keyId: string, freq: number) => {
      setActiveKeys((prev) => ({ ...prev, [keyId]: true }));
      playClick(freq);

      if (keyId === "r") {
        setHandActive(true);
        setTimeout(() => setHandActive(false), 380);
      }

      setTimeout(() => {
        setActiveKeys((prev) => ({ ...prev, [keyId]: false }));
      }, 180);
    },
    [playClick]
  );

  // Global physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      const keyChar = e.key.toLowerCase();
      const matched = KEYS_DATA.find(
        (k) => k.keyTrigger === keyChar || (k.id === "four" && (keyChar === "4" || keyChar === "0"))
      );

      if (matched) {
        triggerKeyAction(matched.id, matched.freq);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerKeyAction]);

  return (
    <div className="cypher-keyboard-visual-wrapper" aria-label="Interactive CYPHER 4.0 Mechanical Keyboard Visual">
      {/* Sound Toggle Floating Control */}
      <div className="cypher-keyboard-header">
        <button
          type="button"
          className="sound-toggle-btn"
          onClick={() => setSoundEnabled((prev) => !prev)}
          aria-label={soundEnabled ? "Mute mechanical sounds" : "Enable mechanical sounds"}
          title={soundEnabled ? "Sound: ON (Click to mute)" : "Sound: MUTED (Click to unmute)"}
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{soundEnabled ? "SOUND ON" : "MUTED"}</span>
        </button>
      </div>

      {/* Transparent Keyboard Canvas */}
      <div className="cypher-keyboard-canvas">
        {/* Subtle Ambient Sparkles */}
        <div className="hero-star star-top-left" aria-hidden="true">
          <Sparkles size={20} />
        </div>
        <div className="hero-star star-top-right" aria-hidden="true">
          <Sparkles size={16} />
        </div>

        {/* 8 Isometric Mechanical Keys */}
        {KEYS_DATA.map((k) => {
          const isPressed = activeKeys[k.id];
          return (
            <div
              key={k.id}
              className={`hero-key ${isPressed ? "is-pressed" : ""}`}
              style={{
                left: `${k.leftCqw}cqw`,
                top: `${k.topCqw}cqw`,
                zIndex: k.zIndex,
              }}
              onMouseEnter={() => playClick(k.freq)}
              onClick={() => triggerKeyAction(k.id, k.freq)}
              role="button"
              tabIndex={0}
              aria-label={`Key ${k.label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  triggerKeyAction(k.id, k.freq);
                }
              }}
            >
              <svg className="hero-key-svg" viewBox="0 0 200 197" fill="none">
                {/* 3D Extrusion Walls */}
                <path
                  className="key-base-left"
                  d={KEY_PATHS.baseLeft}
                  fill="#060814"
                  stroke="rgba(22, 213, 208, 0.28)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  className="key-base-right"
                  d={KEY_PATHS.baseRight}
                  fill="#0E162B"
                  stroke="rgba(123, 40, 189, 0.3)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />

                {/* Moving Face Group (Depresses into the base) */}
                <g className="key-top-group">
                  {/* Vibrant Keycap Top Face */}
                  <path className="key-top" d={KEY_PATHS.top} fill={k.color} />
                  {/* Top Facet Ink Border */}
                  <path className="key-top-border" d={KEY_PATHS.topBorder} fill="#05060B" />

                  {/* Character Skewed to Isometric Plane */}
                  <g transform="translate(91, 75) matrix(1.08, 0.13, -0.44, 0.84, 0, 0)">
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily="var(--font-display), Anton, Impact, sans-serif"
                      fontWeight="900"
                      fontSize={k.fontSize || 46}
                      fill="#05060B"
                      letterSpacing="-0.02em"
                    >
                      {k.label}
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          );
        })}

        {/* 3D Cursor Arrow Pointer Sticker */}
        <div className="hero-cursor-pointer" aria-hidden="true">
          <svg viewBox="0 0 70 80" fill="none">
            <polygon points="10,6 10,64 26,48 40,76 52,70 38,44 60,44" fill="#05060B" />
            <polygon
              points="8,2 8,58 24,42 38,70 48,64 34,38 56,38"
              fill="#FFFFFF"
              stroke="#05060B"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Retro Hand Cursor Sticker */}
        <div
          className={`hero-hand ${handActive ? "clicked" : ""}`}
          onClick={() => triggerKeyAction("r", 470)}
          role="button"
          tabIndex={0}
          aria-label="Interactive hand pointer - Click me!"
          title="Click to press key R"
        >
          <svg viewBox="0 0 122 135" fill="none">
            <defs>
              <linearGradient id="handGradientDark" x1="49" y1="104" x2="102" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7B28BD" />
                <stop offset="1" stopColor="#16D5D0" />
              </linearGradient>
            </defs>
            <path
              d="M75.4 9.8L76.7 21L76.9 22.8L76.2 24.6L75.7 25.5L61.6 49.1L60.2 38L74.3 14.3L75.4 9.8Z"
              fill="#F5F4ED"
              stroke="#05060B"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M81.8 43.8L83.2 55V56.8L82.7 58.5L81.8 60.1L80.5 48.9L81.8 43.8Z"
              fill="#F5F4ED"
              stroke="#05060B"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M102.1 54.7L103.4 65.9L103.3 68.6L102.5 70.4L99.9 61.1L102.1 54.7Z"
              fill="#F5F4ED"
              stroke="#05060B"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Hand Cuff Gradient */}
            <path
              d="M118.5 64.6L119.8 75.9L118.6 81.1L108.4 94.8L93.5 113.7L82.3 127L69.8 132.7L23.4 120.9L3.7 101.8L2.4 90.6L22 109.7L51 118.8L68.3 121.5L82.3 114.5L100.2 92.2L113.7 74.7L118.5 64.6Z"
              fill="url(#handGradientDark)"
              stroke="#05060B"
              strokeWidth="2.6"
              strokeLinejoin="bevel"
            />
            {/* Hand Palm */}
            <path
              d="M67.7 2.1C74.1 4.2 77.1 9.7 74.3 14.3L60.1 38C63.8 35.5 69.3 34.7 74.1 36.1C80.7 38 83.5 43.6 80.8 48.3L80.5 48.9C84 46.4 89.5 45.6 94.4 47C100.9 49.1 103.9 54.5 101 59.2L99.9 61.1C103.6 58.5 107.6 57.3 112.4 58.9C119 60.8 120.1 66.4 116.7 70.7C105.8 85 97.2 96.5 84 112.2C77.5 120.4 70.4 124.7 51 118.8L22 109.7C5.3 104.5 3.4 99.6 2.1 88.7L3.6 48.6C3.9 42.4 10.9 37.5 19.4 37.7C23.9 37.7 28.3 40 30.3 41.4C30.3 41.1 31.8 38.8 32.4 37.7L50.9 6.9C53.6 2.3 61.1 0.2 67.7 2.1Z"
              fill="#F5F4ED"
              stroke="#05060B"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 3D Isometric Speech Bubble with Animated Bouncing Dots */}
        <div className="hero-speech" aria-hidden="true">
          <svg viewBox="0 0 274 165" fill="none">
            <defs>
              <linearGradient id="speechGradDark" x1="19" y1="110" x2="42" y2="93" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7B28BD" />
                <stop offset="1" stopColor="#16D5D0" />
              </linearGradient>
            </defs>
            <path
              d="M1.5 92.7L5.7 116.4L15.9 121.5L34.2 123L45.3 117L42.4 91.7L31.7 98.6L14.8 98.6L1.5 92.7Z"
              fill="url(#speechGradDark)"
              stroke="#05060B"
              strokeWidth="2.6"
            />
            <path
              d="M232.3 49.2L78.8 4.2C51.2 -3.7 20.9 9.3 11.1 33.4C7 43.9 7.3 54.8 11.3 64.5V64.6C15.2 74.1 13.7 88.5 1.5 92.3C0.9 93.9 28.1 108.4 42.4 91.7L196.9 136.9C224.3 144.9 254.8 131.8 264.5 107.7C274.3 83.5 259.7 57.2 232.3 49.2Z"
              fill="#F5F4ED"
              stroke="#05060B"
              strokeWidth="2.6"
            />
            {/* Animated 3 speech dots */}
            <g className="speech-dots">
              <circle cx="56" cy="46" r="8" fill="#05060B" className="speech-dot speech-dot-1" />
              <circle cx="94" cy="56" r="8" fill="#05060B" className="speech-dot speech-dot-2" />
              <circle cx="132" cy="67" r="8" fill="#05060B" className="speech-dot speech-dot-3" />
            </g>
          </svg>
        </div>

        {/* 3D Isometric Pencil Sticker */}
        <div className="hero-pencil" aria-hidden="true">
          <svg viewBox="0 0 309 134" fill="none">
            <defs>
              <linearGradient id="pencilEraserDark" x1="260" y1="105" x2="304" y2="79" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF5500" />
                <stop offset="1" stopColor="#EAFF00" />
              </linearGradient>
            </defs>
            <polygon points="16,5 9,19 2,33 5,48 8,63 19,64 29,64 37,50 44,35 41,20 37,5 27,5" fill="#FFFFFF" stroke="#05060B" strokeWidth="2.6" />
            <polygon points="244,73 16,5 9,19 2,33 229,102 237,87" fill="#F5F4ED" stroke="#05060B" strokeWidth="2.6" />
            <polygon points="5,48 8,64 236,131 233,116 229,102 2,33" fill="#05060B" stroke="#05060B" strokeWidth="2.6" />
            <polygon points="269,70 41,1 16,5 244,73" fill="#F5F4ED" stroke="#05060B" strokeWidth="2.6" />
            <polygon points="244,73 229,102 236,131 307,118 304,115 267,69" fill="url(#pencilEraserDark)" stroke="#05060B" strokeWidth="2.6" />
          </svg>
        </div>
      </div>

      {/* Minimalistic Interactive Prompt */}
      <div className="cypher-keyboard-footer">
        <span className="live-dot" />
        <span>CLICK OR TYPE [C, Y, P, H, E, R, 4, /]</span>
      </div>
    </div>
  );
}

export default CypherKeyboardVisual;
