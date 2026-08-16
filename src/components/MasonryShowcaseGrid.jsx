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
     (8 projects per column with pre-loaded top/bottom buffers
      so Row 1 is 100% level & flush at the top with zero empty space)
  ───────────────────────────────────────────────────────── */
  const leftColumnProjects = [
    { id: 'grid-l-1', image: '/grid-photos/grid1.png', aspect: '16/10' },
    { id: 'grid-l-2', image: '/grid-photos/grid4.png', aspect: '16/10' },
    { id: 'grid-l-3', image: '/grid-photos/grid3.png', aspect: '16/10' },
    { id: 'grid-l-4', image: '/experience_laptop.png', aspect: '16/10' },
    { id: 'grid-l-5', image: '/skincare_leaf.png', aspect: '16/10' },
    { id: 'grid-l-6', image: '/grid-photos/grid8.png', aspect: '16/10' },
    { id: 'grid-l-7', image: '/grid-photos/grid11.png', aspect: '16/10' },
    { id: 'grid-l-8', image: '/work/work1.jpg', aspect: '16/10' },
  ];

  const centerColumnProjects = [
    // 2 Buffer images pre-positioned above the top crop
    { id: 'grid-c-buf1', image: '/grid-photos/grid10.png', aspect: '16/10' },
    { id: 'grid-c-buf2', image: '/grid-photos/grid2.png', aspect: '16/10' },
    // Row 1 aligned card
    { id: 'grid-c-1', image: '/grid-photos/grid5.png', aspect: '16/10' },
    { id: 'grid-c-2', image: '/grid-photos/grid6.png', aspect: '16/10' },
    { id: 'grid-c-3', image: '/grid-photos/grid7.png', aspect: '16/10' },
    { id: 'grid-c-4', image: '/moodtalk_dashboard.png', aspect: '16/10' },
    { id: 'grid-c-5', image: '/grid-new-1.png', aspect: '16/10' },
    { id: 'grid-c-6', image: '/work/work2.jpg', aspect: '16/10' },
  ];

  const rightColumnProjects = [
    { id: 'grid-r-1', image: '/grid-photos/grid9.png', aspect: '16/10' },
    { id: 'grid-r-2', image: '/grid-photos/grid8.png', aspect: '16/10' },
    { id: 'grid-r-3', image: '/grid-photos/grid2.png', aspect: '16/10' },
    { id: 'grid-r-4', image: '/grid-photos/grid10.png', aspect: '16/10' },
    { id: 'grid-r-5', image: '/untitled-design-7.png', aspect: '16/10' },
    { id: 'grid-r-6', image: '/grid-photos/grid1.png', aspect: '16/10' },
    { id: 'grid-r-7', image: '/grid-new-2.png', aspect: '16/10' },
    { id: 'grid-r-8', image: '/work/work3.jpg', aspect: '16/10' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const centerCol = centerColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !leftCol || !centerCol || !rightCol) return;

    const isMobile = window.innerWidth <= 768;
    const moveDistance = isMobile ? 180 : 420;
    const scrubTime = 1.2;

    const ctx = gsap.context(() => {
      // Counter-Parallax Scroll Trigger:
      // Left & Right columns start at 0 and glide UP as you scroll down
      // Center column starts with buffer hidden above and glides DOWN seamlessly
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: scrubTime,
        }
      })
      .fromTo(leftCol, { y: 0 }, { y: -moveDistance, ease: 'none' }, 0)
      .fromTo(centerCol, { y: 0 }, { y: moveDistance, ease: 'none' }, 0)
      .fromTo(rightCol, { y: 0 }, { y: -moveDistance, ease: 'none' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="sharp-parallax-wall-section">
      
      {/* ── Editorial Section Title Header ── */}
      <div className="masonry-header-block" style={{
        maxWidth: '1600px',
        margin: '0 auto 3rem auto',
        padding: '3.5rem 1.5rem 0 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        <h2 style={{
          fontSize: 'clamp(2.6rem, 6vw, 5.8rem)',
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
          fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)',
          color: '#001db8',
          maxWidth: '700px',
          lineHeight: 1.5,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase'
        }}>
          Selected Realities & Interactive Works
        </p>
      </div>

      {/* ── Full-Bleed Expansive Bounded Viewport Frame ── */}
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

          {/* Center Column (Has 2 buffer images above top edge, glides DOWN) */}
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
          padding: 1rem 0.5rem 6rem 0.5rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Full-Bleed Expansive Bounded Straight-Line Viewport Frame */
        .grid-viewport-wrapper {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: clamp(880px, 108vh, 1450px);
          margin: 0 auto;
          overflow: hidden;
          border-radius: 32px;
          border: 2px solid rgba(0, 29, 184, 0.25);
          box-shadow: 0 32px 90px rgba(0, 29, 184, 0.25);
          background: #020b4d;
        }

        /* Counter-Parallax 3-Column Grid */
        .sharp-columns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          height: 100%;
          padding: 20px;
          box-sizing: border-box;
          align-items: flex-start;
        }

        .sharp-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
          will-change: transform;
        }

        /* Center Column starts offset by 2 buffer cards so its 3rd card aligns with Row 1 */
        .col-center {
          margin-top: calc(-2 * ((100vw - 80px) / 3 * 10 / 16 + 20px));
        }

        /* Sharp Rectangular Block Cards */
        .sharp-card-block {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #00127a;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
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
            padding: 0.5rem 0.25rem 3rem 0.25rem;
          }

          .grid-viewport-wrapper {
            height: 680px;
            border-radius: 20px;
          }

          .sharp-columns-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            padding: 12px !important;
          }

          .sharp-col {
            gap: 12px !important;
          }

          .col-center {
            margin-top: calc(-2 * ((100vw - 48px) / 2 * 10 / 16 + 12px));
          }

          .col-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

