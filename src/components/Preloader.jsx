import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const logoImgRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const telemetryRef = useRef(null);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const panels = panelsRef.current.filter(Boolean);
    const logoImg = logoImgRef.current;

    // Initial GSAP setup
    if (logoImg) gsap.set(logoImg, { y: 40, opacity: 0, scale: 0.94 });
    gsap.set([counterRef.current, telemetryRef.current], { y: 20, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 60);
      }
    });

    // 1. Reveal Hero SVG Logo smoothly (No text!)
    if (logoImg) {
      tl.to(logoImg, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    tl.to([counterRef.current, telemetryRef.current], {
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

    // 3. Outro Sequence: Logo & telemetry slide out & 5 Shutter panels collapse vertically
    tl.to([logoImg, counterRef.current, telemetryRef.current, progressBarRef.current].filter(Boolean), {
      y: -30,
      opacity: 0,
      duration: 0.35,
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
              background: 'linear-gradient(180deg, #001db8 0%, #00127a 50%, #020b4d 100%)',
              borderRight: i < 4 ? '1px solid rgba(191, 215, 255, 0.12)' : 'none',
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
              color: '#bfd7ff',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              whiteSpace: 'nowrap',
              fontWeight: 700
            }}
          >
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#bfd7ff', boxShadow: '0 0 10px #bfd7ff', flexShrink: 0 }} />
            <span>CHANANA SYS</span>
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
              color: 'rgba(191, 215, 255, 0.65)',
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
              fontWeight: 700
            }}
          >
            [ WEBGL2 / 120 FPS ]
          </div>
        </div>

        {/* Center SVG Logo (Hero SVG Logo - No text!) */}
        <div style={{ textAlign: 'center', margin: 'auto 0', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            ref={logoImgRef}
            src="/hero-logo.svg"
            alt="Chanana Studios"
            style={{
              maxWidth: 'min(85vw, 650px)',
              maxHeight: '35vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 30px rgba(0, 0, 0, 0.8))'
            }}
          />
        </div>

        {/* Bottom Odometer Counter & Linear Track */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 'clamp(0.65rem, 2vw, 0.8rem)', color: 'rgba(191, 215, 255, 0.65)', letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap', fontWeight: 700 }}>
              LOADING ARCHITECTURE
            </div>

            {/* Odometer Counter Number */}
            <div
              ref={counterRef}
              style={{
                fontFamily: "'Syne', 'Outfit', monospace",
                fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
                fontWeight: 800,
                color: '#bfd7ff',
                lineHeight: 0.85,
                letterSpacing: '-0.05em'
              }}
            >
              {String(counter).padStart(3, '0')}
            </div>
          </div>

          {/* Glowing 1px Volt Progress Track */}
          <div style={{ width: '100%', height: '2px', background: 'rgba(191, 215, 255, 0.15)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              ref={progressBarRef}
              style={{
                width: '0%',
                height: '100%',
                background: 'linear-gradient(90deg, #001db8 0%, #bfd7ff 50%, #ffffff 100%)',
                boxShadow: '0 0 20px rgba(191, 215, 255, 0.9)',
                transition: 'width 0.05s linear'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
