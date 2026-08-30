import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SchemeSpatialGallery from './SchemeSpatialGallery';

gsap.registerPlugin(ScrollTrigger);

/* Studio manifesto. Italic words render in the serif face and keep their
   lower case, so they read as an aside against the uppercase sans. */
const quoteWords = [
  { text: 'Anyone', isItalic: false },
  { text: 'can', isItalic: false },
  { text: 'be', isItalic: false },
  { text: 'seen.', isItalic: false, breakAfter: true },
  { text: 'Being', isItalic: false },
  { text: 'remembered', isItalic: true },
  { text: 'is', isItalic: false },
  { text: 'the', isItalic: false },
  { text: 'hard', isItalic: false },
  { text: 'part.', isItalic: false },
];

/* Scrub shape for the character blur resolve. Each character resolves over
   RESOLVE_WINDOW of the runway, with start times staggered across
   RESOLVE_SPREAD, so a wide band of characters is always mid-resolve rather
   than each one snapping in isolation. The generous window is what keeps the
   sweep feeling unhurried. */
const RESOLVE_SPREAD = 0.94;
const RESOLVE_WINDOW = 0.40;
const MAX_BLUR = 16;

/* The eyebrow settles early, before the quote starts resolving. */
const EYEBROW_END = 0.16;

export default function StudioOverview({ onOpenInquiry }) {
  const containerRef = useRef(null);
  const quoteStageRef = useRef(null);
  const headingRef = useRef(null);
  const charElementsRef = useRef(null);
  const eyebrowRef = useRef(null);
  const ruleRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const quoteStage = quoteStageRef.current;
    const globe = globeRef.current;
    if (!container || !quoteStage || !globe) return;

    charElementsRef.current = headingRef.current
      ? Array.from(headingRef.current.querySelectorAll('.quote-char'))
      : [];

    const chars = charElementsRef.current;
    const eyebrow = eyebrowRef.current;
    const rule = ruleRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      chars.forEach((char) => {
        char.style.opacity = 1;
        char.style.filter = 'none';
      });
      if (eyebrow) eyebrow.style.opacity = 1;
      if (rule) rule.style.transform = 'scaleX(1)';
      return;
    }

    const ctx = gsap.context(() => {
      // The quote resolves as the section travels through the viewport — no
      // pinning, so the page keeps moving under the reader. The range spans
      // roughly 1.65 viewport heights so the sweep has room to breathe.
      ScrollTrigger.create({
        trigger: quoteStage,
        start: 'top 95%',
        end: 'bottom 30%',
        scrub: 1.1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Eyebrow and its hairline settle first, ahead of the quote
          const intro = Math.min(1, progress / EYEBROW_END);
          const introEased = 1 - Math.pow(1 - intro, 3);
          if (eyebrow) eyebrow.style.opacity = introEased;
          if (rule) rule.style.transform = `scaleX(${introEased})`;

          // Styles are written imperatively rather than tweened: one tween
          // per character would mean ~45 concurrent tweens a frame.
          if (!chars.length) return;

          const lastIndex = Math.max(1, chars.length - 1);
          const travel = RESOLVE_SPREAD - RESOLVE_WINDOW;

          for (let i = 0; i < chars.length; i += 1) {
            const start = (i / lastIndex) * travel;
            const raw = (progress - start) / RESOLVE_WINDOW;
            const clamped = raw < 0 ? 0 : raw > 1 ? 1 : raw;
            const eased = 1 - Math.pow(1 - clamped, 3);

            const char = chars[i];
            char.style.opacity = 0.1 + 0.9 * eased;
            // 'none' rather than blur(0px): a zero-radius filter still costs
            // a compositing layer, so drop it entirely once resolved.
            char.style.filter = eased >= 1
              ? 'none'
              : `blur(${(MAX_BLUR * (1 - eased)).toFixed(2)}px)`;
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

      {/* ── MANIFESTO QUOTE ── */}
      <section
        ref={quoteStageRef}
        id="manifesto"
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(5rem, 12vh, 10rem) clamp(2rem, 6vw, 6rem)',
          /* Charcoal panel sitting between two black sections — the tonal
             step is what separates it, rather than a border. */
          background: 'linear-gradient(180deg, #141414 0%, #0b0b0b 100%)',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ width: '100%', maxWidth: '1280px' }}>

          {/* Eyebrow — draws its hairline in before the quote resolves */}
          <p
            ref={eyebrowRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              margin: '0 0 clamp(1.75rem, 4vh, 3rem) 0',
              opacity: 0,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#7d7d7d',
            }}
          >
            <span
              ref={ruleRef}
              style={{
                display: 'block',
                width: 'clamp(28px, 4vw, 56px)',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'scaleX(0)',
                transformOrigin: 'left center',
              }}
            />
            Manifesto
          </p>

          <h1
            ref={headingRef}
            style={{
              margin: 0,
              maxWidth: '16em',
              fontSize: 'clamp(2.3rem, 5vw, 5.2rem)',
              lineHeight: 1.14,
              letterSpacing: '-0.022em',
              textTransform: 'uppercase',
            }}
          >
            {quoteWords.map((item, wordIdx) => (
              <React.Fragment key={wordIdx}>
                <span
                  className="quote-word"
                  style={{
                    display: 'inline-block',
                    marginRight: '0.24em',
                    fontFamily: item.isItalic
                      ? '"Cormorant Garamond", "Garamond", Georgia, serif'
                      : '"Outfit", "Plus Jakarta Sans", sans-serif',
                    fontWeight: item.isItalic ? 300 : 600,
                    fontStyle: item.isItalic ? 'italic' : 'normal',
                    textTransform: item.isItalic ? 'none' : 'uppercase',
                    color: item.isItalic ? '#b6c8e4' : '#d2d2d2',
                    fontSize: item.isItalic ? '1.14em' : '1em',
                  }}
                >
                  {item.text.split('').map((ch, charIdx) => (
                    <span
                      key={charIdx}
                      className="quote-char"
                      style={{
                        display: 'inline-block',
                        opacity: 0.1,
                        filter: `blur(${MAX_BLUR}px)`,
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {item.breakAfter && <br />}
              </React.Fragment>
            ))}
          </h1>
        </div>
      </section>

      {/* ── DOWNSTREAM: SchemeSpatialGallery (Work & Footer) ── */}
      <div ref={globeRef}>
        <SchemeSpatialGallery onOpenInquiry={onOpenInquiry} />
      </div>
    </div>
  );
}
