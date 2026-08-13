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
     USER-PROVIDED GRID PHOTOS (from C:\Users\unfaz\Downloads\photos for the grid)
  ───────────────────────────────────────────────────────── */
  const leftColumnProjects = [
    { id: 'grid-1', image: '/grid-photos/grid1.png' },
    { id: 'grid-2', image: '/grid-photos/grid2.png' },
    { id: 'grid-3', image: '/grid-photos/grid3.png' },
    { id: 'grid-4', image: '/grid-photos/grid4.png' },
  ];

  const centerColumnProjects = [
    { id: 'grid-5', image: '/grid-photos/grid5.png' },
    { id: 'grid-6', image: '/grid-photos/grid6.png' },
    { id: 'grid-7', image: '/grid-photos/grid7.png' },
    { id: 'grid-8', image: '/grid-photos/grid8.png' },
  ];

  const rightColumnProjects = [
    { id: 'grid-9', image: '/grid-photos/grid9.png' },
    { id: 'grid-10', image: '/grid-photos/grid10.png' },
    { id: 'grid-11', image: '/grid-photos/grid11.png' },
    { id: 'grid-12', image: '/grid-photos/grid1.png' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const centerCol = centerColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !leftCol || !centerCol || !rightCol) return;

    const ctx = gsap.context(() => {
      // ── Counter-Parallax Scroll Trigger Timeline ──
      // Starts y:0 (Flush) and translates moderately so NO black gaps appear
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2,
        }
      })
      .fromTo(leftCol, { y: 0 }, { y: 60, ease: 'none' }, 0)
      .fromTo(centerCol, { y: 0 }, { y: -60, ease: 'none' }, 0) // Counter movement!
      .fromTo(rightCol, { y: 0 }, { y: 60, ease: 'none' }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="sharp-parallax-wall-section">
      
      {/* ── 3-Column Sharp Parallax Wall (Flush Fit with User Photos) ── */}
      <div className="sharp-columns-grid">
        
        {/* Left Column (Scrolls DOWN) */}
        <div ref={leftColRef} className="sharp-col col-left">
          {leftColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block">
              <img src={item.image} alt="Grid Showcase" className="sharp-card-img" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Center Column (Scrolls UP - Opposite Direction!) */}
        <div ref={centerColRef} className="sharp-col col-center">
          {centerColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block">
              <img src={item.image} alt="Grid Showcase" className="sharp-card-img" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Right Column (Scrolls DOWN) */}
        <div ref={rightColRef} className="sharp-col col-right">
          {rightColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block">
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

        /* Grid Layout Wall */
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

        /* Sharp Rectangular Block Cards (NO HOVER EFFECTS AT ALL) */
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
          height: auto;
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
