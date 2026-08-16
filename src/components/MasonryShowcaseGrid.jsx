import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MasonryShowcaseGrid() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);

  /* ─────────────────────────────────────────────────────────
     CURATED HIGH-END PRODUCT & BRAND UI SHOWCASE MATRIX
     (Smooth multi-directional counter-parallax columns)
  ───────────────────────────────────────────────────────── */
  const leftColumnProjects = [
    { id: 'grid-l-1', image: '/grid-photos/grid1.png', aspect: '16/10' },
    { id: 'grid-l-2', image: '/grid-photos/grid4.png', aspect: '16/10' },
    { id: 'grid-l-3', image: '/grid-photos/grid3.png', aspect: '16/10' },
    { id: 'grid-l-4', image: '/experience_laptop.png', aspect: '16/10' },
    { id: 'grid-l-5', image: '/skincare_leaf.png', aspect: '16/10' },
    { id: 'grid-l-6', image: '/grid-photos/grid8.png', aspect: '16/10' },
  ];

  const centerColumnProjects = [
    { id: 'grid-c-1', image: '/grid-photos/grid5.png', aspect: '16/10' },
    { id: 'grid-c-2', image: '/grid-photos/grid6.png', aspect: '16/10' },
    { id: 'grid-c-3', image: '/grid-photos/grid7.png', aspect: '16/10' },
    { id: 'grid-c-4', image: '/moodtalk_dashboard.png', aspect: '16/10' },
    { id: 'grid-c-5', image: '/grid-new-1.png', aspect: '16/10' },
    { id: 'grid-c-6', image: '/grid-photos/grid2.png', aspect: '16/10' },
  ];

  const rightColumnProjects = [
    { id: 'grid-r-1', image: '/grid-photos/grid2.png', aspect: '16/10' },
    { id: 'grid-r-2', image: '/grid-photos/grid8.png', aspect: '16/10' },
    { id: 'grid-r-3', image: '/grid-photos/grid9.png', aspect: '16/10' },
    { id: 'grid-r-4', image: '/grid-photos/grid10.png', aspect: '16/10' },
    { id: 'grid-r-5', image: '/untitled-design-7.png', aspect: '16/10' },
    { id: 'grid-r-6', image: '/grid-photos/grid1.png', aspect: '16/10' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const centerCol = centerColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !leftCol || !centerCol || !rightCol) return;

    const isMobile = window.innerWidth <= 768;
    const moveDistance = isMobile ? 120 : 320;
    const scrubTime = 1.1;

    const ctx = gsap.context(() => {
      // Counter-Parallax Scroll Trigger:
      // Left and Right columns glide UP, while Center column glides DOWN
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: scrubTime,
        }
      })
      .fromTo(leftCol, { y: moveDistance * 0.65 }, { y: -moveDistance * 0.85, ease: 'none' }, 0)
      .fromTo(centerCol, { y: -moveDistance * 0.85 }, { y: moveDistance * 0.65, ease: 'none' }, 0)
      .fromTo(rightCol, { y: moveDistance * 0.65 }, { y: -moveDistance * 0.85, ease: 'none' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="sharp-parallax-wall-section">
      
      {/* ── Editorial Section Title Header ── */}
      <div className="masonry-header-block" style={{
        maxWidth: '1400px',
        margin: '0 auto 3rem auto',
        padding: '3rem 1.5rem 0 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 5.2rem)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: '#020b4d',
          marginBottom: '0.85rem',
          textTransform: 'uppercase',
        }}>
          Archive of <span style={{
            fontStyle: 'italic',
            fontFamily: 'var(--font-luxury-slim)',
            fontWeight: 400,
            color: '#001db8'
          }}>Creative Realities</span>
        </h2>

        <p style={{
          fontSize: 'clamp(0.9rem, 1.3vw, 1.15rem)',
          color: '#001db8',
          maxWidth: '650px',
          lineHeight: 1.5,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          Selected Realities & Interactive Works
        </p>
      </div>

      {/* ── Expansive Bounded Viewport Frame (Keeps top and bottom aligned in ONE straight line) ── */}
      <div className="grid-viewport-wrapper">
        <div className="sharp-columns-grid">
          
          {/* Left Column (Glides UP) */}
          <div ref={leftColRef} className="sharp-col col-left">
            {leftColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img
                  src={item.image}
                  alt={`Chanan digital showcase visual ${idx + 1}`}
                  className="sharp-card-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Center Column (Glides DOWN) */}
          <div ref={centerColRef} className="sharp-col col-center">
            {centerColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img
                  src={item.image}
                  alt={`Chanan product design interface ${idx + 1}`}
                  className="sharp-card-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Right Column (Glides UP) */}
          <div ref={rightColRef} className="sharp-col col-right">
            {rightColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img
                  src={item.image}
                  alt={`Chanan brand architecture showcase ${idx + 1}`}
                  className="sharp-card-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Pure Aesthetic Styles ── */}
      <style>{`
        .sharp-parallax-wall-section {
          position: relative;
          width: 100%;
          min-height: auto;
          background-color: #bfd7ff;
          color: #020b4d;
          padding: 1rem 1rem 5rem 1rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Expansive Bounded Straight-Line Viewport Frame */
        .grid-viewport-wrapper {
          position: relative;
          width: 100%;
          max-width: min(97vw, 1780px);
          height: clamp(750px, 94vh, 1200px);
          margin: 0 auto;
          overflow: hidden;
          border-radius: 28px;
          border: 1.5px solid rgba(0, 29, 184, 0.25);
          box-shadow: 0 28px 75px rgba(0, 29, 184, 0.2);
          background: #020b4d;
        }

        /* Counter-Parallax 3-Column Grid */
        .sharp-columns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          height: 100%;
          padding: 16px;
          box-sizing: border-box;
          align-items: flex-start;
        }

        .sharp-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          will-change: transform;
        }

        /* Sharp Rectangular Block Cards */
        .sharp-card-block {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #00127a;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          flex-shrink: 0;
        }

        .sharp-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── MOBILE RESPONSIVE BREAKPOINT (<768px) ── */
        @media (max-width: 768px) {
          .sharp-parallax-wall-section {
            padding: 0.5rem 0.5rem 2.5rem 0.5rem;
          }

          .grid-viewport-wrapper {
            height: 600px;
            border-radius: 18px;
          }

          .sharp-columns-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            padding: 10px !important;
          }

          .sharp-col {
            gap: 10px !important;
          }

          .col-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

