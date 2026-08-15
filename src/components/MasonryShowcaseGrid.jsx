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
     (Clean, 100% unique UI/UX, product, & brand design showcases — zero yellow AI art)
  ───────────────────────────────────────────────────────── */
  const leftColumnProjects = [
    { id: 'grid-l-1', image: '/grid-photos/grid1.png', aspect: '16/10' },
    { id: 'grid-l-2', image: '/grid-photos/grid4.png', aspect: '16/10' },
    { id: 'grid-l-3', image: '/grid-photos/grid3.png', aspect: '16/10' },
    { id: 'grid-l-4', image: '/experience_laptop.png', aspect: '16/10' },
    { id: 'grid-l-5', image: '/skincare_leaf.png', aspect: '16/10' },
  ];

  const centerColumnProjects = [
    { id: 'grid-c-1', image: '/grid-photos/grid5.png', aspect: '16/10' },
    { id: 'grid-c-2', image: '/grid-photos/grid6.png', aspect: '16/10' },
    { id: 'grid-c-3', image: '/grid-photos/grid7.png', aspect: '16/10' },
    { id: 'grid-c-4', image: '/moodtalk_dashboard.png', aspect: '16/10' },
    { id: 'grid-c-5', image: '/grid-new-1.png', aspect: '16/10' },
  ];

  const rightColumnProjects = [
    { id: 'grid-r-1', image: '/grid-photos/grid2.png', aspect: '16/10' },
    { id: 'grid-r-2', image: '/grid-photos/grid8.png', aspect: '16/10' },
    { id: 'grid-r-3', image: '/grid-photos/grid9.png', aspect: '16/10' },
    { id: 'grid-r-4', image: '/grid-photos/grid10.png', aspect: '16/10' },
    { id: 'grid-r-5', image: '/untitled-design-7.png', aspect: '16/10' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const centerCol = centerColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !leftCol || !centerCol || !rightCol) return;

    // ── Responsive Movement Calibration for Mobile vs Desktop ──
    const isMobile = window.innerWidth <= 768;
    const moveDistance = isMobile ? 30 : 90; // 90px smooth parallax travel distance
    const scrubTime = isMobile ? 1.5 : 1.2;

    const ctx = gsap.context(() => {
      // ── Counter-Parallax Scroll Trigger Timeline ──
      // Range starts offset so top/bottom buffer images cover initial position seamlessly
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: isMobile ? 'top 90%' : 'top 85%',
          end: isMobile ? 'bottom 10%' : 'bottom 15%',
          scrub: scrubTime,
        }
      })
      .fromTo(leftCol, { y: moveDistance * 0.5 }, { y: -moveDistance * 0.8, ease: 'none' }, 0)   // LEFT glides UP
      .fromTo(centerCol, { y: -moveDistance * 0.8 }, { y: moveDistance * 0.5, ease: 'none' }, 0)  // CENTER glides DOWN
      .fromTo(rightCol, { y: moveDistance * 0.5 }, { y: -moveDistance * 0.8, ease: 'none' }, 0);  // RIGHT glides UP
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="sharp-parallax-wall-section">
      
      {/* ── Editorial Section Title Header ── */}
      <div className="masonry-header-block" style={{
        maxWidth: '1200px',
        margin: '0 auto 2.5rem auto',
        padding: '3rem 1.5rem 0 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        <h2 style={{
          fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: '#ffffff',
          marginBottom: '0.85rem',
          textTransform: 'uppercase',
        }}>
          Archive of <span style={{
            fontStyle: 'italic',
            fontFamily: 'var(--font-luxury-slim)',
            fontWeight: 400,
            color: '#ffffff'
          }}>Creative Realities</span>
        </h2>

        <p style={{
          fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
          color: '#8e8e93',
          maxWidth: '600px',
          lineHeight: 1.5,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          Selected Realities & Interactive Works
        </p>
      </div>

      {/* ── Bounded Viewport Container (Strict overflow mask prevents overlapping header text or footer) ── */}
      <div className="grid-viewport-wrapper">
        <div className="sharp-columns-grid">
          
          {/* Left Column (Moves UP on scroll down) */}
          <div ref={leftColRef} className="sharp-col col-left">
            {leftColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img src={item.image} alt={`Chanan digital showcase visual ${idx + 1}`} className="sharp-card-img" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>

          {/* Center Column (Moves DOWN on scroll down) */}
          <div ref={centerColRef} className="sharp-col col-center">
            {centerColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img src={item.image} alt={`Chanan product design interface ${idx + 1}`} className="sharp-card-img" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>

          {/* Right Column (Moves UP on scroll down) */}
          <div ref={rightColRef} className="sharp-col col-right">
            {rightColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img src={item.image} alt={`Chanan brand architecture showcase ${idx + 1}`} className="sharp-card-img" loading="lazy" decoding="async" />
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
          background-color: #000000;
          color: #ffffff;
          padding: 1rem 0.5rem 4rem 0.5rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Strictly Bounded Grid Viewport Container */
        .grid-viewport-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin: 0 auto;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        /* Perfectly Aligned Grid Wall */
        .sharp-columns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 100%;
          margin: 0 auto;
          align-items: flex-start;
        }

        .sharp-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
          will-change: transform;
        }

        /* Sharp Rectangular Block Cards */
        .sharp-card-block {
          position: relative;
          width: 100%;
          border-radius: 0px;
          overflow: hidden;
          background: #0d0d12;
          cursor: default;
          pointer-events: none;
          box-shadow: none;
          transform: none !important;
          transition: none !important;
        }

        .sharp-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: none !important;
          transition: none !important;
          filter: none !important;
        }

        /* ── MOBILE RESPONSIVE BREAKPOINT (<768px) ── */
        @media (max-width: 768px) {
          .sharp-parallax-wall-section {
            padding: 0.5rem 0.25rem 2rem 0.25rem;
          }

          .sharp-columns-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 4px !important;
          }

          .sharp-col {
            gap: 4px !important;
          }

          .col-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

