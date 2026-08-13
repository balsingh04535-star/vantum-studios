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
     PERFECTLY ALIGNED MODULAR GRID MATRIX (USER PHOTOS)
  ───────────────────────────────────────────────────────── */
  const leftColumnProjects = [
    { id: 'grid-1', image: '/grid-photos/grid1.png', aspect: '16/10' },
    { id: 'grid-2', image: '/grid-photos/grid2.png', aspect: '16/10' },
    { id: 'grid-3', image: '/grid-photos/grid3.png', aspect: '16/10' },
    { id: 'grid-4', image: '/grid-photos/grid4.png', aspect: '16/10' },
  ];

  const centerColumnProjects = [
    { id: 'grid-5', image: '/grid-photos/grid5.png', aspect: '16/10' },
    { id: 'grid-6', image: '/grid-photos/grid6.png', aspect: '16/10' },
    { id: 'grid-7', image: '/grid-photos/grid7.png', aspect: '16/10' },
    { id: 'grid-8', image: '/grid-photos/grid8.png', aspect: '16/10' },
  ];

  const rightColumnProjects = [
    { id: 'grid-9', image: '/grid-photos/grid9.png', aspect: '16/10' },
    { id: 'grid-10', image: '/grid-photos/grid10.png', aspect: '16/10' },
    { id: 'grid-11', image: '/grid-photos/grid11.png', aspect: '16/10' },
    { id: 'grid-12', image: '/grid-photos/grid1.png', aspect: '16/10' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const centerCol = centerColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !leftCol || !centerCol || !rightCol) return;

    const ctx = gsap.context(() => {
      // ── Counter-Parallax Scroll Trigger Timeline ──
      // When scrolling DOWN: Left & Right columns move UP (-120px) while Center column moves DOWN (+120px)
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1.5,
        }
      })
      .fromTo(leftCol, { y: 0 }, { y: -120, ease: 'none' }, 0)   // LEFT moves UP on scroll down
      .fromTo(centerCol, { y: 0 }, { y: 120, ease: 'none' }, 0)  // CENTER moves DOWN on scroll down
      .fromTo(rightCol, { y: 0 }, { y: -120, ease: 'none' }, 0);  // RIGHT moves UP on scroll down
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="sharp-parallax-wall-section">
      
      {/* ── 3-Column Perfectly Aligned Modular Grid Matrix ── */}
      <div className="sharp-columns-grid">
        
        {/* Left Column (Moves UP on scroll down) */}
        <div ref={leftColRef} className="sharp-col col-left">
          {leftColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
              <img src={item.image} alt="Grid Showcase" className="sharp-card-img" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Center Column (Moves DOWN on scroll down) */}
        <div ref={centerColRef} className="sharp-col col-center">
          {centerColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
              <img src={item.image} alt="Grid Showcase" className="sharp-card-img" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Right Column (Moves UP on scroll down) */}
        <div ref={rightColRef} className="sharp-col col-right">
          {rightColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
              <img src={item.image} alt="Grid Showcase" className="sharp-card-img" loading="lazy" />
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
          background-color: #000000;
          color: #ffffff;
          padding: 0.5rem 0.5rem 3rem 0.5rem;
          box-sizing: border-box;
          overflow: hidden;
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
            padding: 0.25rem 0.25rem 2rem 0.25rem;
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
