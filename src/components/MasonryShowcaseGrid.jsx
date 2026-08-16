import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MasonryShowcaseGrid() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  /* ─────────────────────────────────────────────────────────
     CURATED HIGH-END PRODUCT & BRAND UI SHOWCASE MATRIX
     (Clean, 100% unique UI/UX, product, & brand design showcases — perfectly aligned 3x5 grid)
  ───────────────────────────────────────────────────────── */
  const allShowcaseProjects = [
    // Row 1
    { id: 'grid-1', image: '/grid-photos/grid1.png', aspect: '16/10' },
    { id: 'grid-2', image: '/grid-photos/grid5.png', aspect: '16/10' },
    { id: 'grid-3', image: '/grid-photos/grid2.png', aspect: '16/10' },
    
    // Row 2
    { id: 'grid-4', image: '/grid-photos/grid4.png', aspect: '16/10' },
    { id: 'grid-5', image: '/grid-photos/grid6.png', aspect: '16/10' },
    { id: 'grid-6', image: '/grid-photos/grid8.png', aspect: '16/10' },
    
    // Row 3
    { id: 'grid-7', image: '/grid-photos/grid3.png', aspect: '16/10' },
    { id: 'grid-8', image: '/grid-photos/grid7.png', aspect: '16/10' },
    { id: 'grid-9', image: '/grid-photos/grid9.png', aspect: '16/10' },
    
    // Row 4
    { id: 'grid-10', image: '/experience_laptop.png', aspect: '16/10' },
    { id: 'grid-11', image: '/moodtalk_dashboard.png', aspect: '16/10' },
    { id: 'grid-12', image: '/grid-photos/grid10.png', aspect: '16/10' },
    
    // Row 5 (Bottom Row - perfectly aligned across the same horizontal line)
    { id: 'grid-13', image: '/skincare_leaf.png', aspect: '16/10' },
    { id: 'grid-14', image: '/grid-new-1.png', aspect: '16/10' },
    { id: 'grid-15', image: '/untitled-design-7.png', aspect: '16/10' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const cards = grid.querySelectorAll('.sharp-card-block');

    const ctx = gsap.context(() => {
      // Subtle synchronized fade/scale in batches across each row
      ScrollTrigger.batch(cards, {
        start: 'top 92%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        },
        once: true
      });
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
          fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
          color: '#001db8',
          maxWidth: '600px',
          lineHeight: 1.5,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}>
          Selected Realities & Interactive Works
        </p>
      </div>

      {/* ── Perfectly Level & Aligned Grid Viewport Container ── */}
      <div className="grid-viewport-wrapper">
        <div ref={gridRef} className="sharp-columns-grid">
          {allShowcaseProjects.map((item, idx) => (
            <div
              key={item.id}
              className="sharp-card-block"
              style={{
                aspectRatio: item.aspect,
                opacity: 0,
                transform: 'translateY(16px)',
              }}
            >
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
      </div>

      {/* ── Pure Aesthetic Styles ── */}
      <style>{`
        .sharp-parallax-wall-section {
          position: relative;
          width: 100%;
          min-height: auto;
          background-color: #bfd7ff;
          color: #020b4d;
          padding: 1rem 0.5rem 4rem 0.5rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Strictly Bounded Grid Viewport Container */
        .grid-viewport-wrapper {
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          margin: 0 auto;
          padding: 0 0.25rem;
          box-sizing: border-box;
        }

        /* Perfectly Aligned 3-Column Grid Wall */
        .sharp-columns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 100%;
          margin: 0 auto;
          align-items: stretch;
        }

        /* Sharp Rectangular Block Cards */
        .sharp-card-block {
          position: relative;
          width: 100%;
          border-radius: 0px;
          overflow: hidden;
          background: #020b4d;
          box-shadow: 0 10px 30px rgba(0, 29, 184, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
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
            padding: 0.5rem 0.25rem 2rem 0.25rem;
          }

          .sharp-columns-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </section>
  );
}

