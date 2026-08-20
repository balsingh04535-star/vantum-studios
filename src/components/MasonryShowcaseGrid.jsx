import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MasonryShowcaseGrid({ onOpenInquiry }) {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);

  /* ─────────────────────────────────────────────────────────
     CURATED HIGH-END PRODUCT & BRAND UI SHOWCASE MATRIX
     (9 items per column: 2 top buffer images + 5 main images + 2 bottom buffer images)
  ───────────────────────────────────────────────────────── */
  const leftColumnProjects = [
    { id: 'grid-l-1', image: '/showcase-extra-2.png', title: 'Verde Dual Core OS', category: 'Generative Platform', aspect: '16/10' },
    { id: 'grid-l-2', image: '/grid-photos/grid10.png', title: 'Nebbi AI Studio', category: 'Creative Illustration', aspect: '16/10' },
    { id: 'grid-l-3', image: '/grid-photos/grid1.png', title: 'Aurelis Kinetic Skincare', category: '3D Web Experience', aspect: '16/10' },
    { id: 'grid-l-4', image: '/grid-photos/grid4.png', title: 'Nexus Neural Dashboard', category: 'Fintech UI / Web App', aspect: '16/10' },
    { id: 'grid-l-5', image: '/grid-photos/grid3.png', title: 'Nova Flow Interactive', category: 'Mobile Architecture', aspect: '16/10' },
    { id: 'grid-l-6', image: '/experience_laptop.png', title: 'Lumina Spatial OS', category: 'WebGL Platform', aspect: '16/10' },
    { id: 'grid-l-7', image: '/skincare_leaf.png', title: 'Botanical Organic Canvas', category: 'E-Commerce Platform', aspect: '16/10' },
    { id: 'grid-l-8', image: '/amplo_brand.png', title: 'Amplo Brand Architecture', category: 'Brand System', aspect: '16/10' },
    { id: 'grid-l-9', image: '/work/work1.jpg', title: 'Kinetic Lookbook Noir', category: 'High Fashion UI', aspect: '16/10' },
  ];

  const centerColumnProjects = [
    { id: 'grid-c-1', image: '/showcase-extra-3.gif', title: 'Pixel Kinetic Hologram', category: 'Motion Realities', aspect: '16/10' },
    { id: 'grid-c-2', image: '/showcase-extra-1.png', title: 'Chanan Hardware Core', category: 'Industrial Design', aspect: '16/10' },
    { id: 'grid-c-3', image: '/grid-photos/grid5.png', title: 'Clarity Decision Engine', category: '3D WebGL Realm', aspect: '16/10' },
    { id: 'grid-c-4', image: '/grid-photos/grid6.png', title: 'Velora Typographic Matrix', category: 'Creative Direction', aspect: '16/10' },
    { id: 'grid-c-5', image: '/grid-photos/grid7.png', title: 'Velora Brand Identity System', category: 'Design System', aspect: '16/10' },
    { id: 'grid-c-6', image: '/moodtalk_dashboard.png', title: 'MoodTalk AI Command Center', category: 'AI Application', aspect: '16/10' },
    { id: 'grid-c-7', image: '/grid-new-1.png', title: 'Typographic Kinetic Poster', category: 'Brand Experiment', aspect: '16/10' },
    { id: 'grid-c-8', image: '/data_jungle.png', title: 'Data Jungle Telemetry', category: 'Analytics Platform', aspect: '16/10' },
    { id: 'grid-c-9', image: '/work/work2.jpg', title: 'Lumina Dashboard OS', category: 'Fintech Platform', aspect: '16/10' },
  ];

  const rightColumnProjects = [
    { id: 'grid-r-1', image: '/grid-photos/grid9.png', title: 'Persona Digital Studio', category: 'Creative Portfolio', aspect: '16/10' },
    { id: 'grid-r-2', image: '/grid-photos/grid8.png', title: 'AmberPulse Analytics Core', category: 'SaaS Platform', aspect: '16/10' },
    { id: 'grid-r-3', image: '/grid-photos/grid2.png', title: 'Voltaria Magnetic Hardware', category: 'Product Showcase', aspect: '16/10' },
    { id: 'grid-r-4', image: '/grid-photos/grid11.png', title: 'Chanan Spatial Engine', category: 'WebGL Platform', aspect: '16/10' },
    { id: 'grid-r-5', image: '/untitled-design-7.png', title: 'Hyper-Clean Catalog Grid', category: 'Fashion Architecture', aspect: '16/10' },
    { id: 'grid-r-6', image: '/grid-new-2.png', title: 'Digital Brand Evolution', category: 'Brand System', aspect: '16/10' },
    { id: 'grid-r-7', image: '/work/work3.jpg', title: 'Velora Mobile Platform', category: 'Mobile App', aspect: '16/10' },
    { id: 'grid-r-8', image: '/work/work4.jpg', title: 'Minimalist Poster System', category: 'Editorial Brand', aspect: '16/10' },
    { id: 'grid-r-9', image: '/work/work5.jpg', title: 'Aura Interactive Spatial', category: 'Interactive Canvas', aspect: '16/10' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const centerCol = centerColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !leftCol || !centerCol || !rightCol) return;

    const isMobile = window.innerWidth <= 768;
    const moveDistance = isMobile ? 100 : 220;
    const scrubDamping = 2.4; // Silky high-inertia damping for slow, luxurious fluid motion

    const ctx = gsap.context(() => {
      // Counter-Parallax Scroll Trigger:
      // Left and Right columns glide UP gently and slowly as user scrolls down
      // Center column counter-glides DOWN at a relaxed, calm pace
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: scrubDamping,
          invalidateOnRefresh: true,
          refreshPriority: 0,
        }
      })
      .fromTo(leftCol, { y: 0 }, { y: -moveDistance, ease: 'power1.out' }, 0)
      .fromTo(centerCol, { y: -moveDistance }, { y: moveDistance * 0.45, ease: 'power1.out' }, 0)
      .fromTo(rightCol, { y: 0 }, { y: -moveDistance, ease: 'power1.out' }, 0);
    }, container);

    // Refresh ScrollTrigger at multiple staggered checkpoints to calibrate for upstream pinned sections
    const timers = [
      setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 100),
      setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 500),
      setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 1200),
    ];

    const handleResize = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="work" className="sharp-parallax-wall-section">
      
      {/* ── Editorial Section Title Header ── */}
      <div className="masonry-header-block" style={{
        maxWidth: '1600px',
        margin: '0 auto 3.5rem auto',
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
          color: '#ffffff',
          marginBottom: '0.85rem',
          textTransform: 'uppercase',
        }}>
          The Living <span style={{
            fontStyle: 'italic',
            fontFamily: 'var(--font-luxury-slim)',
            fontWeight: 400,
            color: '#dbe7ff'
          }}>Archive</span>
        </h2>

        <p style={{
          fontSize: 'clamp(0.85rem, 1.25vw, 1.1rem)',
          color: '#bfd7ff',
          maxWidth: '700px',
          lineHeight: 1.5,
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase'
        }}>
          A Visual Vault of 3D, Motion &amp; Digital Craft
        </p>
      </div>

      {/* ── Full-Bleed Bounded Showcase Viewport (Aligned straight line top & bottom) ── */}
      <div className="showcase-grid-wrapper">
        <div className="sharp-columns-grid">
          
          {/* Left Column (Glides UP) */}
          <div ref={leftColRef} className="sharp-col col-left">
            {leftColumnProjects.map((item) => (
              <div 
                key={item.id} 
                className="sharp-card-block" 
                style={{ aspectRatio: item.aspect }}
                onClick={() => onOpenInquiry && onOpenInquiry()}
              >
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
            {centerColumnProjects.map((item) => (
              <div 
                key={item.id} 
                className="sharp-card-block" 
                style={{ aspectRatio: item.aspect }}
                onClick={() => onOpenInquiry && onOpenInquiry()}
              >
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
            {rightColumnProjects.map((item) => (
              <div 
                key={item.id} 
                className="sharp-card-block" 
                style={{ aspectRatio: item.aspect }}
                onClick={() => onOpenInquiry && onOpenInquiry()}
              >
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
    </section>
  );
}


