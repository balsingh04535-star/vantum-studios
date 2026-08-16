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
     (9 items per column: 2 top buffer images + 5 main images + 2 bottom buffer images)
  ───────────────────────────────────────────────────────── */
  const leftColumnProjects = [
    // 2 Top buffer images
    { id: 'grid-l-top-1', image: '/grid-photos/grid10.png', title: 'Aetheria Minimal Luxury', category: 'Brand Architecture', aspect: '16/10' },
    { id: 'grid-l-top-2', image: '/grid-photos/grid8.png', title: 'AutoFlow Analytics Core', category: 'SaaS Platform', aspect: '16/10' },
    // 5 Main showcase images
    { id: 'grid-l-1', image: '/grid-photos/grid1.png', title: 'Aurelis Kinetic Skincare', category: '3D Web Experience', aspect: '16/10' },
    { id: 'grid-l-2', image: '/grid-photos/grid4.png', title: 'Nexus Neural Dashboard', category: 'Fintech UI / Web App', aspect: '16/10' },
    { id: 'grid-l-3', image: '/grid-photos/grid3.png', title: 'Neon Pulse Telemetry', category: 'Interactive Canvas', aspect: '16/10' },
    { id: 'grid-l-4', image: '/experience_laptop.png', title: 'Lumina Spatial OS', category: 'WebGL Platform', aspect: '16/10' },
    { id: 'grid-l-5', image: '/skincare_leaf.png', title: 'Botanical Organic Canvas', category: 'E-Commerce Platform', aspect: '16/10' },
    // 2 Bottom buffer images
    { id: 'grid-l-bot-1', image: '/grid-photos/grid11.png', title: 'Chanan Spatial Engine', category: 'WebGL Platform', aspect: '16/10' },
    { id: 'grid-l-bot-2', image: '/work/work1.jpg', title: 'Kinetic Fashion Realm', category: 'Brand System', aspect: '16/10' },
  ];

  const centerColumnProjects = [
    // 2 Top buffer images
    { id: 'grid-c-top-1', image: '/grid-photos/grid9.png', title: 'Persona Digital Studio', category: 'Creative Portfolio', aspect: '16/10' },
    { id: 'grid-c-top-2', image: '/grid-photos/grid2.png', title: 'Voltaria Magnetic Hardware', category: 'Product Showcase', aspect: '16/10' },
    // 5 Main showcase images
    { id: 'grid-c-1', image: '/grid-photos/grid5.png', title: 'Illumination Spatial Web', category: '3D WebGL Realm', aspect: '16/10' },
    { id: 'grid-c-2', image: '/grid-photos/grid6.png', title: 'Serenity Lake Interface', category: 'Creative Direction', aspect: '16/10' },
    { id: 'grid-c-3', image: '/grid-photos/grid7.png', title: 'Velora Brand Identity System', category: 'Design System', aspect: '16/10' },
    { id: 'grid-c-4', image: '/moodtalk_dashboard.png', title: 'MoodTalk AI Command Center', category: 'AI Application', aspect: '16/10' },
    { id: 'grid-c-5', image: '/grid-new-1.png', title: 'Typographic Kinetic Poster', category: 'Brand Experiment', aspect: '16/10' },
    // 2 Bottom buffer images
    { id: 'grid-c-bot-1', image: '/work/work2.jpg', title: 'Lumina Dashboard OS', category: 'Fintech Platform', aspect: '16/10' },
    { id: 'grid-c-bot-2', image: '/work/work5.jpg', title: 'Aura Interactive System', category: 'Interactive Canvas', aspect: '16/10' },
  ];

  const rightColumnProjects = [
    // 2 Top buffer images
    { id: 'grid-r-top-1', image: '/grid-photos/grid6.png', title: 'Serenity Lake Interface', category: 'Creative Direction', aspect: '16/10' },
    { id: 'grid-r-top-2', image: '/grid-photos/grid7.png', title: 'Velora Brand Identity System', category: 'Design System', aspect: '16/10' },
    // 5 Main showcase images
    { id: 'grid-r-1', image: '/grid-photos/grid2.png', title: 'Voltaria Magnetic Hardware', category: 'Product Showcase', aspect: '16/10' },
    { id: 'grid-r-2', image: '/grid-photos/grid8.png', title: 'AutoFlow Analytics Core', category: 'SaaS Platform', aspect: '16/10' },
    { id: 'grid-r-3', image: '/grid-photos/grid9.png', title: 'Persona Digital Studio', category: 'Creative Portfolio', aspect: '16/10' },
    { id: 'grid-r-4', image: '/grid-photos/grid10.png', title: 'Aetheria Minimal Luxury', category: 'Brand Architecture', aspect: '16/10' },
    { id: 'grid-r-5', image: '/untitled-design-7.png', title: 'Hyper-Clean Catalog Grid', category: 'Fashion Architecture', aspect: '16/10' },
    // 2 Bottom buffer images
    { id: 'grid-r-bot-1', image: '/grid-new-2.png', title: 'Digital Brand Evolution', category: 'Brand System', aspect: '16/10' },
    { id: 'grid-r-bot-2', image: '/work/work3.jpg', title: 'Velora Mobile Platform', category: 'Mobile App', aspect: '16/10' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const centerCol = centerColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !leftCol || !centerCol || !rightCol) return;

    const isMobile = window.innerWidth <= 768;
    const moveDistance = isMobile ? 140 : 360;
    const scrubTime = 1.1;

    const ctx = gsap.context(() => {
      // Counter-Parallax Scroll Trigger:
      // Left and Right columns glide UP as you scroll down
      // Center column glides DOWN in opposite direction
      // Top and bottom buffer cards ensure all 3 columns stay 100% filled and aligned
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: scrubTime,
        }
      })
      .fromTo(leftCol, { y: 0 }, { y: -moveDistance, ease: 'none' }, 0)
      .fromTo(centerCol, { y: -moveDistance }, { y: moveDistance * 0.5, ease: 'none' }, 0)
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
        padding: '3rem 1.5rem 0 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
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

      {/* ── Bounded Showcase Viewport (Aligned straight line top & bottom) ── */}
      <div className="showcase-grid-wrapper">
        <div className="sharp-columns-grid">
          
          {/* Left Column (Glides UP) */}
          <div ref={leftColRef} className="sharp-col col-left">
            {leftColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="sharp-card-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="card-hover-overlay">
                  <span className="card-cat-badge">{item.category}</span>
                  <h3 className="card-title-text">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column (Glides DOWN) */}
          <div ref={centerColRef} className="sharp-col col-center">
            {centerColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="sharp-card-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="card-hover-overlay">
                  <span className="card-cat-badge">{item.category}</span>
                  <h3 className="card-title-text">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (Glides UP) */}
          <div ref={rightColRef} className="sharp-col col-right">
            {rightColumnProjects.map((item, idx) => (
              <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="sharp-card-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="card-hover-overlay">
                  <span className="card-cat-badge">{item.category}</span>
                  <h3 className="card-title-text">{item.title}</h3>
                </div>
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
          padding: 1rem 0.75rem 6rem 0.75rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Expansive Bounded Showcase Viewport */
        .showcase-grid-wrapper {
          position: relative;
          width: 100%;
          max-width: min(98vw, 1750px);
          height: clamp(800px, 98vh, 1300px);
          margin: 0 auto;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 28px;
          border: 1.5px solid rgba(0, 29, 184, 0.25);
          box-shadow: 0 28px 75px rgba(0, 29, 184, 0.2);
          background: #020b4d;
        }

        /* 3-Column Aligned Grid Wall */
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

        /* Sharp Rectangular Block Cards with Hover Elevation */
        .sharp-card-block {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #00127a;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          flex-shrink: 0;
          cursor: pointer;
        }

        .sharp-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sharp-card-block:hover .sharp-card-img {
          transform: scale(1.04);
        }

        /* Card Hover Overlay Info */
        .card-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(2, 11, 77, 0.92) 100%);
          opacity: 0;
          display: flex;
          flex-direction: column;
          justifyContent: flex-end;
          padding: 1.5rem;
          box-sizing: border-box;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .sharp-card-block:hover .card-hover-overlay {
          opacity: 1;
        }

        .card-cat-badge {
          font-family: monospace, sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #bfd7ff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }

        .card-title-text {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* ── MOBILE RESPONSIVE BREAKPOINT (<900px) ── */
        @media (max-width: 900px) {
          .showcase-grid-wrapper {
            height: 620px;
            border-radius: 18px;
          }
          .sharp-columns-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            padding: 12px !important;
          }
          .sharp-col {
            gap: 12px !important;
          }
          .col-right {
            display: none !important;
          }
          .sharp-parallax-wall-section {
            padding: 1rem 0.5rem 3rem 0.5rem;
          }
        }

        @media (max-width: 600px) {
          .sharp-columns-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .sharp-col {
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}

