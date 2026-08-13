import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const textCharsRef = useRef([]);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const statusRef = useRef(null);
  const telemetryRef = useRef(null);

  const [counter, setCounter] = useState(0);

  const word1 = "CHANANA".split("");
  const word2 = "STUDIOS".split("");

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const panels = panelsRef.current.filter(Boolean);
    const textChars = textCharsRef.current.filter(Boolean);

    // Initial GSAP setup
    gsap.set(textChars, { y: 60, opacity: 0, rotateX: -90 });
    gsap.set([counterRef.current, statusRef.current, telemetryRef.current], { y: 20, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    });

    // 1. Staggered 3D character text reveal
    tl.to(textChars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: 'power3.out'
    });

    tl.to([counterRef.current, statusRef.current, telemetryRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4');

    // 2. Counter Odometer animation (0 -> 100)
    const countObj = { value: 0 };
    tl.to(countObj, {
      value: 100,
      duration: 2.0,
      ease: 'power3.inOut',
      onUpdate: () => {
        const val = Math.floor(countObj.value);
        setCounter(val);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${val}%`;
        }
      }
    }, '-=0.2');

    // 3. Outro Sequence: Elements slide out & 5 Shutter panels collapse vertically
    tl.to([textChars, counterRef.current, statusRef.current, telemetryRef.current, progressBarRef.current], {
      y: -30,
      opacity: 0,
      duration: 0.35,
      stagger: 0.02,
      ease: 'power2.in'
    }, '+=0.1');

    tl.to(panels, {
      scaleY: 0,
      duration: 0.85,
      stagger: {
        each: 0.07,
        from: 'center'
      },
      ease: 'power4.inOut'
    }, '-=0.1');

    tl.to(containerRef.current, {
      autoAlpha: 0,
      duration: 0.05
    });

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'auto',
        overflow: 'hidden'
      }}
    >
      {/* 5 Vertical GSAP Shutter Panels */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
            style={{
              background: 'linear-gradient(180deg, #09090b 0%, #040405 100%)',
              borderRight: i < 4 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
              transformOrigin: i % 2 === 0 ? 'top center' : 'bottom center'
            }}
          />
        ))}
      </div>

      {/* Preloader Inner Interface */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          padding: 'clamp(1.25rem, 4vw, 3.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Top Header Telemetry */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
          <div
            ref={telemetryRef}
            style={{
              fontFamily: 'monospace',
              fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
              color: 'var(--accent-volt)',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-volt)', boxShadow: '0 0 8px var(--accent-volt)', flexShrink: 0 }} />
            <span>CHANANA SYS</span>
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap'
            }}
          >
            [ WEBGL2 / 120 FPS ]
          </div>
        </div>

        {/* Center 3D Staggered Brand Title */}
        <div style={{ textAlign: 'center', margin: 'auto 0', perspective: '1000px', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.2em 0.5em',
              width: '100%',
              padding: '0.5rem 0'
            }}
          >
            {/* Word 1: VANTUM */}
            <div style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
              {word1.map((char, idx) => (
                <span
                  key={`w1-${idx}`}
                  ref={(el) => (textCharsRef.current[idx] = el)}
                  className="loader-char"
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Word 2: STUDIOS */}
            <div style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
              {word2.map((char, idx) => (
                <span
                  key={`w2-${idx}`}
                  ref={(el) => (textCharsRef.current[word1.length + idx] = el)}
                  className="loader-char"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={statusRef}
            className="loader-status"
          >
            CREATIVE ENGINEERING STUDIO
          </div>
        </div>

        {/* Bottom Odometer Counter & Linear Track */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 'clamp(0.65rem, 2vw, 0.8rem)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              LOADING ARCHITECTURE
            </div>

            {/* Odometer Counter Number */}
            <div
              ref={counterRef}
              style={{
                fontFamily: "'Syne', 'Outfit', monospace",
                fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
                fontWeight: 800,
                color: '#c4d600',
                lineHeight: 0.85,
                letterSpacing: '-0.05em'
              }}
            >
              {String(counter).padStart(3, '0')}
            </div>
          </div>

          {/* Glowing 1px Volt Progress Track */}
          <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              ref={progressBarRef}
              style={{
                width: '0%',
                height: '100%',
                background: 'linear-gradient(90deg, #c4d600 0%, #ffffff 100%)',
                boxShadow: '0 0 20px rgba(196, 214, 0, 0.9)',
                transition: 'width 0.05s linear'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
