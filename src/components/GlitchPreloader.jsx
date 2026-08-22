import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/\\[]{}';
const LABEL_WORD = 'CHANAN';

function scrambleWord(word, intensity = 0.3) {
  return word
    .split('')
    .map((char) =>
      Math.random() < intensity
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : char
    )
    .join('');
}

function scrambleNumber(num, intensity = 0.5) {
  return String(num)
    .padStart(3, '0')
    .split('')
    .map((d) =>
      Math.random() < intensity ? Math.floor(Math.random() * 10) : d
    )
    .join('');
}

export default function GlitchPreloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const countRef = useRef(0);
  const doneRef = useRef(false);

  const [displayCount, setDisplayCount] = useState('000');
  const [displayLabel, setDisplayLabel] = useState(scrambleWord(LABEL_WORD, 1));
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Pixel noise canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let running = true;

    const drawNoise = () => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() < 0.05 ? Math.floor(Math.random() * 80) : 0;
        imageData.data[i] = v;
        imageData.data[i + 1] = v + Math.floor(Math.random() * 30);
        imageData.data[i + 2] = v + Math.floor(Math.random() * 60);
        imageData.data[i + 3] = v > 0 ? Math.floor(Math.random() * 120) : 0;
      }
      ctx.putImageData(imageData, 0, 0);
      animFrameRef.current = requestAnimationFrame(drawNoise);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    drawNoise();

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Counter + glitch animation
  useEffect(() => {
    const TOTAL_DURATION = 2600; // ms
    const FPS = 60;
    const FRAME_MS = 1000 / FPS;
    const totalFrames = TOTAL_DURATION / FRAME_MS;
    let frame = 0;

    const tick = () => {
      if (doneRef.current) return;
      frame++;

      // Ease-out curve for progress
      const t = frame / totalFrames;
      const eased = 1 - Math.pow(1 - t, 2.5);
      const current = Math.min(Math.floor(eased * 100), 100);
      countRef.current = current;
      setProgress(current);

      // Glitch intensity decreases as we approach 100
      const glitchIntensity = Math.max(0.05, 0.9 - eased * 0.95);

      // Scramble the counter
      setDisplayCount(scrambleNumber(current, glitchIntensity * 0.6));

      // Settle to real number briefly
      setTimeout(() => {
        setDisplayCount(String(current).padStart(3, '0'));
      }, 60);

      // Scramble the label
      setDisplayLabel(scrambleWord(LABEL_WORD, glitchIntensity));

      if (current >= 100) {
        doneRef.current = true;
        setDisplayCount('100');
        setDisplayLabel('CHANAN');

        // Exit: slide up
        setTimeout(() => {
          setIsExiting(true);
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 1.1,
            ease: 'power4.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        }, 500);
        return;
      }

      setTimeout(tick, FRAME_MS);
    };

    setTimeout(tick, 120);

    return () => {
      doneRef.current = true;
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="glitch-preloader">
      {/* Pixel noise overlay */}
      <canvas ref={canvasRef} className="glitch-noise-canvas" />

      {/* Scanlines overlay */}
      <div className="glitch-scanlines" />

      {/* Main content */}
      <div className="glitch-content">
        {/* Glitch counter */}
        <div className="glitch-counter-wrap">
          <span className="glitch-counter" data-text={displayCount}>
            {displayCount}
          </span>
          <span className="glitch-counter-ghost ghost-r">{displayCount}</span>
          <span className="glitch-counter-ghost ghost-b">{displayCount}</span>
        </div>

        {/* Progress bar */}
        <div className="glitch-bar-track">
          <div
            className="glitch-bar-fill"
            style={{ width: `${progress}%` }}
          />
          <div
            className="glitch-bar-glitch"
            style={{ width: `${Math.min(progress + Math.random() * 8, 100)}%` }}
          />
        </div>

        {/* Label */}
        <div className="glitch-label" data-text={displayLabel}>
          {displayLabel}
        </div>
      </div>

      <style jsx>{`
        .glitch-preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0002b5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          will-change: transform;
        }

        .glitch-noise-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.55;
        }

        .glitch-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0, 0, 0, 0.12) 3px,
            rgba(0, 0, 0, 0.12) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .glitch-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          user-select: none;
        }

        /* ---- Counter ---- */
        .glitch-counter-wrap {
          position: relative;
          line-height: 1;
        }

        .glitch-counter {
          display: block;
          font-family: 'Outfit', 'Inter', 'DM Mono', monospace;
          font-size: clamp(6rem, 20vw, 18rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #fff;
          position: relative;
          z-index: 2;
          text-shadow:
            0 0 30px rgba(100, 150, 255, 0.6),
            0 0 80px rgba(0, 2, 181, 0.4);
          animation: glitch-flicker 0.18s infinite;
        }

        /* Chromatic aberration ghost layers */
        .glitch-counter-ghost {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          font-family: 'Outfit', 'Inter', 'DM Mono', monospace;
          font-size: clamp(6rem, 20vw, 18rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          opacity: 0.45;
          mix-blend-mode: screen;
          animation: glitch-flicker 0.18s infinite;
        }

        .ghost-r {
          color: #ff3366;
          transform: translate(-3px, 0);
          animation: ghost-r-drift 0.22s infinite;
        }

        .ghost-b {
          color: #00ffee;
          transform: translate(3px, 0);
          animation: ghost-b-drift 0.19s infinite;
        }

        /* ---- Progress bar ---- */
        .glitch-bar-track {
          position: relative;
          width: clamp(220px, 40vw, 480px);
          height: 2px;
          background: rgba(255, 255, 255, 0.12);
          overflow: visible;
        }

        .glitch-bar-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #fff;
          transition: width 0.06s linear;
          box-shadow: 0 0 12px rgba(200, 220, 255, 0.9);
        }

        .glitch-bar-glitch {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: rgba(100, 200, 255, 0.5);
          transition: width 0.04s linear;
          mix-blend-mode: screen;
        }

        /* ---- Label ---- */
        .glitch-label {
          font-family: 'Outfit', monospace;
          font-size: clamp(0.75rem, 1.6vw, 1.1rem);
          font-weight: 700;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: rgba(191, 215, 255, 0.75);
          animation: glitch-label-shift 0.25s infinite;
        }

        /* ---- Keyframes ---- */
        @keyframes glitch-flicker {
          0%, 89%, 100% { opacity: 1; clip-path: none; }
          90%  { opacity: 0.92; clip-path: inset(20% 0 30% 0); transform: translateX(-2px); }
          92%  { opacity: 1;    clip-path: none; transform: translateX(0); }
          94%  { opacity: 0.88; clip-path: inset(50% 0 10% 0); transform: translateX(3px); }
          96%  { opacity: 1;    clip-path: none; transform: translateX(0); }
        }

        @keyframes ghost-r-drift {
          0%   { transform: translate(-3px, 0); opacity: 0.45; }
          33%  { transform: translate(-6px, 1px); opacity: 0.35; }
          66%  { transform: translate(-1px, -1px); opacity: 0.5; }
          100% { transform: translate(-3px, 0); opacity: 0.45; }
        }

        @keyframes ghost-b-drift {
          0%   { transform: translate(3px, 0); opacity: 0.45; }
          33%  { transform: translate(5px, -1px); opacity: 0.3; }
          66%  { transform: translate(2px, 1px); opacity: 0.5; }
          100% { transform: translate(3px, 0); opacity: 0.45; }
        }

        @keyframes glitch-label-shift {
          0%, 85%, 100% { transform: translateX(0); opacity: 0.75; }
          87% { transform: translateX(-4px); opacity: 0.5; }
          89% { transform: translateX(4px); opacity: 0.9; }
          91% { transform: translateX(0); opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}
