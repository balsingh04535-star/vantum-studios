import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ManifestoBackgroundCanvas from './ManifestoBackgroundCanvas';
import SchemeSpatialGallery from './SchemeSpatialGallery';

gsap.registerPlugin(ScrollTrigger);

export default function StudioOverview({ onOpenInquiry }) {
  const containerRef = useRef(null);
  const pinnedStageRef = useRef(null);
  const manifestoLayerRef = useRef(null);
  const globeRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);

  const [videoProgress, setVideoProgress] = useState(0);

  const headlineWords = [
    { text: 'WE', isItalic: false },
    { text: 'BUILD', isItalic: false },
    { text: 'DIGITAL', isItalic: true },
    { text: 'EXPERIENCES', isItalic: true },
    { text: 'PEOPLE', isItalic: false },
    { text: 'REMEMBER.', isItalic: false },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const pinnedStage = pinnedStageRef.current;
    const manifestoLayer = manifestoLayerRef.current;
    const globe = globeRef.current;
    if (!container || !pinnedStage || !manifestoLayer || !globe) return;

    const ctx = gsap.context(() => {
      // ── Pinned Stage: Snappy scroll runway tied directly to text illumination ──
      ScrollTrigger.create({
        trigger: pinnedStage,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.15}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        refreshPriority: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Scrub video frames smoothly across the sequence
          setVideoProgress(progress);

          // Word-by-word headline illumination from progress 0.0 to 0.85
          const wordElements = headingRef.current?.querySelectorAll('.manifesto-word');
          if (wordElements && wordElements.length > 0) {
            const totalWords = wordElements.length;
            wordElements.forEach((word, index) => {
              const wordStart = (index / totalWords) * 0.82;
              const wordEnd = ((index + 1) / totalWords) * 0.82;
              let opacity = 0.3;
              if (progress >= wordEnd) {
                opacity = 1;
              } else if (progress >= wordStart) {
                opacity = 0.3 + 0.7 * ((progress - wordStart) / (wordEnd - wordStart));
              }
              gsap.to(word, { opacity, duration: 0.05, overwrite: true });
            });
          }

          // Subtle illumination polish on description subtext
          if (subtextRef.current) {
            const subOpacity = 0.65 + 0.35 * Math.min(1, progress / 0.85);
            subtextRef.current.style.opacity = subOpacity;
          }
        },
      });

      // ── Living Archive / SchemeSpatialGallery flow downstream ──
      gsap.set(globe, {
        clipPath: 'none',
        position: 'relative',
        width: '100%',
        height: 'auto',
        marginTop: 0,
        zIndex: 1,
        pointerEvents: 'all',
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* ── PINNED STAGE (Video Frames + Illuminated Manifesto Typography) ── */}
      <div
        ref={pinnedStageRef}
        id="manifesto"
        style={{
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000000',
          boxSizing: 'border-box'
        }}
      >
        <div
          ref={manifestoLayerRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(2.5rem, 4vw, 4.5rem) clamp(2rem, 5vw, 5rem)',
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            color: '#ffffff',
            zIndex: 10
          }}
        >
          {/* Full-Bleed Video Frame Canvas */}
          <ManifestoBackgroundCanvas scrollProgress={videoProgress} opacity={1} />

          {/* Bottom Gradient Scrim for Contrast & Legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.85) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Anchored Manifesto Typography */}
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

            <p
              ref={subtextRef}
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)',
                color: 'rgba(255, 255, 255, 0.92)',
                lineHeight: 1.65,
                maxWidth: '680px',
                margin: 0,
                fontWeight: 400,
                letterSpacing: '0.01em',
                opacity: 0.65,
                transition: 'opacity 0.2s ease'
              }}
            >
              Chanan is an independent creative agency specialising in web design and development, brand identity, 3D product visuals and motion design for ambitious brands worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* ── DOWNSTREAM: SchemeSpatialGallery (The Living Archive & Footer) ── */}
      <div ref={globeRef}>
        <SchemeSpatialGallery onOpenInquiry={onOpenInquiry} />
      </div>
    </div>
  );
}

