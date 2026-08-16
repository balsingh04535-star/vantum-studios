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
     (5 items per column with identical 16:10 aspect ratio)
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

    const isMobile = window.innerWidth <= 768;
    const moveDistance = isMobile ? 60 : 160;
    const scrubTime = 1.0;

    const ctx = gsap.context(() => {
      // Fluid Counter-Parallax Scroll:
      // Left and Right glide UP, Center glides DOWN.
      // They smoothly converge to y: 0 at the bottom so the bottom row is 100% aligned in one clean line!
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 90%',
          scrub: scrubTime,
        }
      })
      .fromTo(leftCol, { y: moveDistance }, { y: 0, ease: 'power1.out' }, 0)
      .fromTo(centerCol, { y: -moveDistance }, { y: 0, ease: 'power1.out' }, 0)
      .fromTo(rightCol, { y: moveDistance }, { y: 0, ease: 'power1.out' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="sharp-parallax-wall-section">
      
      {/* ── Editorial Section Title Header ── */}
      <div className="masonry-header-block" style={{
        maxWidth: '1400px',
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

      {/* ── Direct 3-Column Parallax Grid (No dark box, cards sit directly on light blue page) ── */}
      <div className="sharp-columns-grid">
        
        {/* Left Column */}
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

        {/* Center Column (Opposite Scroll Direction) */}
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

        {/* Right Column */}
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

      {/* ── Pure Aesthetic Styles ── */}
      <style>{`
        .sharp-parallax-wall-section {
          position: relative;
          width: 100%;
          min-height: auto;
          background-color: #bfd7ff;
          color: #020b4d;
          padding: 1rem 1.25rem 6rem 1.25rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Direct 3-Column Parallax Grid on Light Blue Canvas */
        .sharp-columns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          box-sizing: border-box;
          align-items: flex-start;
        }

        .sharp-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
          will-change: transform;
        }

        /* Clean Luxury Cards */
        .sharp-card-block {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 29, 184, 0.15);
          box-shadow: 0 12px 35px rgba(0, 29, 184, 0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .sharp-card-block:hover {
          box-shadow: 0 20px 50px rgba(0, 29, 184, 0.22);
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
            padding: 0.5rem 0.75rem 3rem 0.75rem;
          }

          .sharp-columns-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
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

