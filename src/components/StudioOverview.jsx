import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import SchemeSpatialGallery from './SchemeSpatialGallery';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Exact ease from demo-main
const pageEase = CustomEase.create(
  'pageTransition',
  'M0,0 C0.38,0.05 0.48,0.58 0.65,0.82 0.82,1 1,1 1,1'
);

export default function StudioOverview() {
  const manifestoRef = useRef(null);
  const globeRef = useRef(null);
  const headingRef = useRef(null);
  const wrapperRef = useRef(null);

  const headlineText = "We design digital experiences that command awe, disrupt markets, and transform brands into cultural icons.";
  const words = headlineText.split(" ");

  useEffect(() => {
    const manifesto = manifestoRef.current;
    const globe = globeRef.current;
    const wrapper = wrapperRef.current;
    if (!manifesto || !globe || !wrapper) return;

    const ctx = gsap.context(() => {

      // ── 1. Word-by-word manifesto heading scroll reveal ──
      const wordElements = headingRef.current?.querySelectorAll('.studio-headline-word');
      if (wordElements && wordElements.length > 0) {
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalWords = wordElements.length;
            wordElements.forEach((word, index) => {
              const wordProgress = index / totalWords;
              const nextWordProgress = (index + 1) / totalWords;
              let opacity = 0.15;
              if (progress >= nextWordProgress) {
                opacity = 1;
              } else if (progress >= wordProgress) {
                opacity = (progress - wordProgress) / (nextWordProgress - wordProgress);
              }
              gsap.to(word, { opacity, duration: 0.1, overwrite: true });
            });
          },
        });
      }

      // ── 2. Globe sheet initial state (fixed overlay sliding up from bottom) ──
      gsap.set(globe, {
        clipPath: 'inset(100% 0% 0% 0%)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 10,
        overflowY: 'auto',
        pointerEvents: 'none',
      });

      // ── 3. Scroll trigger: pin manifesto while globe sheet slides up like demo-main ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=1000',
          scrub: 0.6,
          pin: manifesto,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.8) {
              gsap.set(globe, { pointerEvents: 'all' });
            } else {
              gsap.set(globe, { pointerEvents: 'none' });
            }
          }
        }
      });

      // Outgoing Manifesto: shrink & fade back (exact demo-main outgoing transition)
      tl.to(manifesto, {
        y: '-30vh',
        scale: 0.8,
        opacity: 0.4,
        duration: 1,
        ease: pageEase,
        force3D: true,
      }, 0);

      // Incoming Globe Sheet: slides up covering screen from bottom (exact demo-main incoming transition)
      tl.to(globe, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1,
        ease: pageEase,
        force3D: true,
      }, 0);

    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {/* ── MANIFESTO ── */}
      <section
        ref={manifestoRef}
        className="studio-manifesto-page"
        style={{
          minHeight: '100vh',
          padding: '8rem 3rem 6rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: 'var(--bg-cream)',
          color: '#0f0f0f',
          transformOrigin: 'center center',
        }}
      >
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <div className="badge" style={{ marginBottom: '2rem' }}>
            <SparklesIcon /> Studio Manifesto
          </div>

          <h2
            ref={headingRef}
            style={{
              marginBottom: '3rem',
              maxWidth: '1100px',
              fontSize: 'clamp(2.4rem, 4.5vw, 5rem)',
              textTransform: 'uppercase',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#0f0f0f'
            }}
          >
            {words.map((word, idx) => (
              <span key={idx} className="studio-headline-word">
                {word}{' '}
              </span>
            ))}
          </h2>

          <p style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
            maxWidth: '850px',
            color: '#27272a',
            lineHeight: 1.6
          }}>
            Vantum Studios operates at the intersection of high-end design, generative graphics, and state-of-the-art web technology. We don't build website templates; we craft living digital realities.
          </p>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.3)',
              fontFamily: 'var(--font-main)',
              fontWeight: 700,
            }}>
              Scroll to continue
            </span>
            <div style={{
              width: '1px',
              height: '3rem',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)',
              animation: 'scrollPulse 1.8s ease-in-out infinite',
            }} />
          </div>
        </div>
      </section>

      {/* ── GLOBE — starts clipped, transitions in on scroll ── */}
      <div ref={globeRef}>
        <SchemeSpatialGallery />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 0.4; transform: scaleY(0.6); transform-origin: top; }
        }
      `}</style>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}
