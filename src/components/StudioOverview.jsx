import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import ManifestoBackgroundCanvas from './ManifestoBackgroundCanvas';
import SchemeSpatialGallery from './SchemeSpatialGallery';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function StudioOverview({ onOpenInquiry }) {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const globeRef = useRef(null);
  const headingRef = useRef(null);

  const [manifestoProgress, setManifestoProgress] = useState(0);

  const headlineWords = [
    { text: 'WE', isItalic: false },
    { text: 'BUILD', isItalic: false },
    { text: 'DIGITAL', isItalic: true },
    { text: 'EXPERIENCES', isItalic: true },
    { text: 'PEOPLE', isItalic: false },
    { text: 'REMEMBER.', isItalic: false },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const globe = globeRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !globe || !wrapper) return;

    const ctx = gsap.context(() => {
      // ── Pinned Full-Bleed Background Video Scrub ──
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * 2.2}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setManifestoProgress(progress);

          // Word-by-word headline luminosity reveal
          const wordElements = headingRef.current?.querySelectorAll('.manifesto-word');
          if (wordElements && wordElements.length > 0) {
            const totalWords = wordElements.length;
            wordElements.forEach((word, index) => {
              const wordStart = (index / totalWords) * 0.75;
              const wordEnd = ((index + 1) / totalWords) * 0.75;
              let opacity = 0.3;
              if (progress >= wordEnd) {
                opacity = 1;
              } else if (progress >= wordStart) {
                opacity = 0.3 + 0.7 * ((progress - wordStart) / (wordEnd - wordStart));
              }
              gsap.to(word, { opacity, duration: 0.05, overwrite: true });
            });
          }
        },
      });

      // ── Globe sheet natural flow ──
      gsap.set(globe, {
        clipPath: 'none',
        position: 'relative',
        width: '100%',
        height: 'auto',
        marginTop: 0,
        zIndex: 1,
        pointerEvents: 'all',
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {/* ── MANIFESTO SECTION (CLEAN FULL-BLEED BACKGROUND VIDEO CANVAS) ── */}
      <section
        ref={sectionRef}
        id="manifesto"
        className="studio-manifesto-cinematic"
        style={{
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: 'clamp(2rem, 4vw, 4rem) clamp(2rem, 5vw, 5rem)',
          boxSizing: 'border-box'
        }}
      >
        {/* Full-Bleed Video Canvas Background in Original Colors */}
        <ManifestoBackgroundCanvas scrollProgress={manifestoProgress} opacity={1} />

        {/* Subtle Bottom Ambient Scrim: Ensures text contrast while keeping 90% of artwork open */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.85) 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* ANCHORED MANIFESTO TYPOGRAPHY */}
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Main Headline */}
          <h1
            ref={headingRef}
            style={{
              margin: 0,
              fontSize: 'clamp(2.2rem, 4.6vw, 4.8rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              textTransform: 'uppercase'
            }}
          >
            {headlineWords.map((item, idx) => (
              <span
                key={idx}
                className="manifesto-word"
                style={{
                  opacity: 0.3,
                  fontFamily: item.isItalic
                    ? '"Cormorant Garamond", "Garamond", Georgia, serif'
                    : '"Outfit", "Plus Jakarta Sans", sans-serif',
                  fontWeight: item.isItalic ? 300 : 700,
                  fontStyle: item.isItalic ? 'italic' : 'normal',
                  color: item.isItalic ? '#bfd7ff' : '#ffffff',
                  marginRight: '0.24em',
                  display: 'inline-block'
                }}
              >
                {item.text}
              </span>
            ))}
          </h1>

          {/* Descriptive Paragraph */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.65,
              maxWidth: '680px',
              margin: 0,
              fontWeight: 400,
              letterSpacing: '0.01em'
            }}
          >
            Chanan is an independent creative agency specialising in web design and development, brand identity, 3D product visuals and motion design for ambitious brands worldwide.
          </p>
        </div>
      </section>

      {/* ── GLOBE & SHOWCASE GRID ── */}
      <div ref={globeRef}>
        <SchemeSpatialGallery onOpenInquiry={onOpenInquiry} />
      </div>
    </div>
  );
}
