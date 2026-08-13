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
     BALANCED PARALLAX WALL DATA (ZERO TOP/BOTTOM BLACK SPACES)
     Replace any image path with your own custom image files!
  ───────────────────────────────────────────────────────── */
  const leftColumnProjects = [
    { id: 'left-1', image: '/img8.jpg', aspect: '4/3' },
    { id: 'left-2', image: '/img1.jpg', aspect: '1/1' },
    { id: 'left-3', image: '/amplo_brand.png', aspect: '4/3' },
    { id: 'left-4', image: '/img5.jpg', aspect: '16/10' },
  ];

  const centerColumnProjects = [
    { id: 'center-1', image: '/img6.jpg', aspect: '16/10' },
    { id: 'center-2', image: '/img7.jpg', aspect: '4/3' },
    { id: 'center-3', image: '/img4.jpg', aspect: '16/11' },
    { id: 'center-4', image: '/moodtalk_dashboard.png', aspect: '16/10' },
  ];

  const rightColumnProjects = [
    { id: 'right-1', image: '/img3.jpg', aspect: '16/10' },
    { id: 'right-2', image: '/img2.jpg', aspect: '16/10' },
    { id: 'right-3', image: '/skincare_leaf.png', aspect: '4/3' },
    { id: 'right-4', image: '/experience_laptop.png', aspect: '16/10' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const centerCol = centerColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !leftCol || !centerCol || !rightCol) return;

    const ctx = gsap.context(() => {
      // ── Calibrated Counter-Parallax Scroll Trigger Timeline ──
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
      
      {/* ── 3-Column Sharp Parallax Wall (Flush Fit, No Black Spaces) ── */}
      <div className="sharp-columns-grid">
        
        {/* Left Column (Scrolls DOWN) */}
        <div ref={leftColRef} className="sharp-col col-left">
          {leftColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
              <img src={item.image} alt="Showcase" className="sharp-card-img" />
            </div>
          ))}
        </div>

        {/* Center Column (Scrolls UP - Opposite Direction!) */}
        <div ref={centerColRef} className="sharp-col col-center">
          {centerColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
              <img src={item.image} alt="Showcase" className="sharp-card-img" />
            </div>
          ))}
        </div>

        {/* Right Column (Scrolls DOWN) */}
        <div ref={rightColRef} className="sharp-col col-right">
          {rightColumnProjects.map((item) => (
            <div key={item.id} className="sharp-card-block" style={{ aspectRatio: item.aspect }}>
              <img src={item.image} alt="Showcase" className="sharp-card-img" />
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

        /* Sharp Rectangular Block Cards (No Hover Glitches) */
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
