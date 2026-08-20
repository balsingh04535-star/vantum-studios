import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpotlightSVGPath() {
  const sectionRef = useRef(null);
  const desktopStrokePathRef = useRef(null);
  const mobileStrokePathRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // ── DESKTOP SCROLLTRIGGER & PARALLAX (>900px) ──
    mm.add('(min-width: 901px)', () => {
      const desktopPaths = section.querySelectorAll('.desktop-svg-path .anim-stroke');
      if (desktopPaths && desktopPaths.length > 0) {
        desktopPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
          path.style.strokeDasharray = `${pathLength}`;
          path.style.strokeDashoffset = `${pathLength}`;
        });

        gsap.to(desktopPaths, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'bottom 40%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }

      const rows = section.querySelectorAll('.row');
      rows.forEach((row) => {
        const card = row.querySelector('.col-card');
        const img = row.querySelector('.col-img');

        if (card) {
          gsap.fromTo(
            card,
            { y: 80 },
            {
              y: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { y: -60, scale: 0.96 },
            {
              y: 60,
              scale: 1.04,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.6,
              },
            }
          );
        }
      });
    });

    // ── MOBILE RESPONSIVE SCROLLTRIGGER (<=900px) ──
    mm.add('(max-width: 900px)', () => {
      const mobPaths = section.querySelectorAll('.mobile-svg-path .anim-stroke');
      if (mobPaths && mobPaths.length > 0) {
        mobPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
          path.style.strokeDasharray = `${pathLength}`;
          path.style.strokeDashoffset = `${pathLength}`;
        });

        gsap.to(mobPaths, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="spotlight-component-root">
      {/* ===== HERO ===== */}
      <section className="spotlight-hero">
        <h2>Our 4-Step Client Journey &amp; Agency Process</h2>
      </section>

      {/* ===== SPOTLIGHT ===== */}
      <section ref={sectionRef} className="spotlight">
        
        {/* ROW 1: STEP 1 */}
        <div className="row">
          <div className="col col-card">
            <div className="card">
              <span className="step-badge">STEP 01 · INITIAL CONSULTATION</span>
              <h2>01. When the Client Calls Us</h2>
              <p>
                We begin with a deep-dive discovery call to understand your vision, objectives, and market positioning. We establish clear goals, scope boundaries, and project timelines.
              </p>
            </div>
          </div>
          <div className="col col-img">
            <div className="img">
              <img src="/steps/step1.svg" alt="01. When the client calls us" />
            </div>
          </div>
        </div>

        {/* ROW 2: STEP 2 */}
        <div className="row">
          <div className="col col-card">
            <div className="card">
              <span className="step-badge">STEP 02 · STRATEGY & BLUEPRINT</span>
              <h2>02. When We Plan Everything</h2>
              <p>
                Our team architects the complete creative and technical blueprint. From high-fidelity UX wireframes and 3D spatial concepts to technology stack selection and milestone planning.
              </p>
            </div>
          </div>
          <div className="col col-img">
            <div className="img">
              <img src="/steps/step2.svg" alt="02. When we plan everything" />
            </div>
          </div>
        </div>

        {/* ROW 3: STEP 3 */}
        <div className="row">
          <div className="col col-card">
            <div className="card">
              <span className="step-badge">STEP 03 · CRAFT & DEVELOPMENT</span>
              <h2>03. When We Work Out</h2>
              <p>
                We execute with precision. Our developers and designers craft custom WebGL shaders, kinetic GSAP motion, and high-speed responsive code at 60fps with zero off-the-shelf templates.
              </p>
            </div>
          </div>
          <div className="col col-img">
            <div className="img">
              <img src="/steps/step3.svg" alt="03. When we work out" />
            </div>
          </div>
        </div>

        {/* ROW 4: STEP 4 */}
        <div className="row">
          <div className="col col-card">
            <div className="card">
              <span className="step-badge">STEP 04 · DEPLOYMENT & LAUNCH</span>
              <h2>04. When We Ship to the Client</h2>
              <p>
                After thorough cross-browser QA testing and performance calibration, we deploy your custom digital flagship to global edge networks — ready to captivate your audience.
              </p>
            </div>
          </div>
          <div className="col col-img">
            <div className="img">
              <img src="/steps/step4.svg" alt="04. When we ship to the client" />
            </div>
          </div>
        </div>

        {/* ── DESKTOP MULTI-LAYER VOLUMETRIC GRADIENT RIBBON ── */}
        <div className="svg-path desktop-svg-path">
          <svg
            viewBox="0 -100 1378 2960"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Soft Diffusion Blur Filter for Ambient Aura */}
              <filter id="desktop-ribbon-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="24" result="blur" />
              </filter>

              {/* Ambient Glow Gradient */}
              <linearGradient id="desktop-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0038ff" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#00c8ff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#7dd3fc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0055ff" stopOpacity="0.8" />
              </linearGradient>

              {/* Core High-Def Gradient Ribbon */}
              <linearGradient id="desktop-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0022cc" />
                <stop offset="15%" stopColor="#0066ff" />
                <stop offset="35%" stopColor="#00d2ff" />
                <stop offset="55%" stopColor="#38bdf8" />
                <stop offset="75%" stopColor="#7dd3fc" />
                <stop offset="90%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>

              {/* Specular Fiber-Optic Core Highlight */}
              <linearGradient id="desktop-shine-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Layer 1: Ambient Glow Aura */}
            <path
              className="anim-stroke"
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="url(#desktop-glow-grad)"
              strokeWidth="240"
              strokeLinecap="round"
              filter="url(#desktop-ribbon-blur)"
              opacity="0.6"
            />

            {/* Layer 2: Main Vivid Gradient Ribbon */}
            <path
              className="anim-stroke"
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="url(#desktop-core-grad)"
              strokeWidth="190"
              strokeLinecap="round"
              opacity="0.95"
            />

            {/* Layer 3: Center Light Spine Specular Highlight */}
            <path
              className="anim-stroke"
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="url(#desktop-shine-grad)"
              strokeWidth="32"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* ── MOBILE MULTI-LAYER VOLUMETRIC GRADIENT RIBBON ── */}
        <div className="svg-path mobile-svg-path">
          <svg
            viewBox="0 0 400 3600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Soft Diffusion Blur Filter for Mobile Aura */}
              <filter id="mobile-ribbon-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="16" result="blur" />
              </filter>

              {/* Mobile Ambient Glow Gradient */}
              <linearGradient id="mobile-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0038ff" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#00c8ff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#7dd3fc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0055ff" stopOpacity="0.8" />
              </linearGradient>

              {/* Mobile Core High-Def Gradient */}
              <linearGradient id="mobile-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0022cc" />
                <stop offset="15%" stopColor="#0066ff" />
                <stop offset="35%" stopColor="#00d2ff" />
                <stop offset="55%" stopColor="#38bdf8" />
                <stop offset="75%" stopColor="#7dd3fc" />
                <stop offset="90%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>

              {/* Mobile Specular Center Highlight */}
              <linearGradient id="mobile-shine-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Layer 1: Ambient Glow Aura */}
            <path
              className="anim-stroke"
              d="M 200 40 C 40 240, 20 480, 40 700 C 60 940, 360 980, 360 1250 C 360 1520, 40 1680, 40 2000 C 40 2320, 360 2420, 360 2750 C 360 3080, 160 3320, 200 3560"
              stroke="url(#mobile-glow-grad)"
              strokeWidth="140"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#mobile-ribbon-blur)"
              opacity="0.55"
            />

            {/* Layer 2: Core Gradient Ribbon */}
            <path
              className="anim-stroke"
              d="M 200 40 C 40 240, 20 480, 40 700 C 60 940, 360 980, 360 1250 C 360 1520, 40 1680, 40 2000 C 40 2320, 360 2420, 360 2750 C 360 3080, 160 3320, 200 3560"
              stroke="url(#mobile-core-grad)"
              strokeWidth="105"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />

            {/* Layer 3: Specular Spine Light Highlight */}
            <path
              className="anim-stroke"
              d="M 200 40 C 40 240, 20 480, 40 700 C 60 940, 360 980, 360 1250 C 360 1520, 40 1680, 40 2000 C 40 2320, 360 2420, 360 2750 C 360 3080, 160 3320, 200 3560"
              stroke="url(#mobile-shine-grad)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        </div>
      </section>

      {/* ===== OUTRO ===== */}
      <section className="spotlight-outro">
        <h2>Built for Impact. Delivered with Zero Compromises.</h2>
      </section>

      {/* ===== CSS Styles ===== */}
      <style>{`
        .spotlight-component-root {
          --base-100: #0002b5;
          --base-200: #00127a;
          --base-300: #020b4d;
          background-color: #0002b5;
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          color: #ffffff;
          font-family: "Manrope", "Plus Jakarta Sans", sans-serif;
          width: 100%;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        .spotlight-hero,
        .spotlight-outro {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          width: 100%;
          height: 100vh;
          padding: 32px;
          background-color: transparent;
        }

        .spotlight-hero h2,
        .spotlight-outro h2 {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          font-size: clamp(2rem, 4.5vw, 4rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -1.6px;
          color: #ffffff;
          padding: 2.5rem 3rem;
          border: 2px dashed rgba(255, 255, 255, 0.35);
          border-radius: 24px;
          background: #020b4d;
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }

        .spotlight {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: visible;
          width: 100%;
          height: 100%;
          padding: 32px 4vw 160px 4vw;
          gap: 160px;
        }

        .spotlight .row {
          display: flex;
          justify-content: center;
          gap: 32px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .spotlight .row .col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }

        .spotlight .row .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .spotlight .row .img img {
          width: 100%;
          max-width: 520px;
          height: auto;
          display: block;
        }

        .step-badge {
          display: inline-block;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          color: #bfd7ff;
          margin-bottom: 0.5rem;
        }

        .spotlight .card {
          display: flex;
          flex-direction: column;
          width: 85%;
          margin: 0 auto;
          padding: 48px;
          gap: 16px;
          border-radius: 20px;
          background-color: #020b4d;
          backdrop-filter: blur(14px);
          border: 2px dashed rgba(255, 255, 255, 0.25);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
        }

        .spotlight .card h2 {
          font-size: clamp(1.6rem, 2.5vw, 2.5rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -1.2px;
          color: #ffffff;
        }

        .spotlight .card p {
          font-size: 1.1rem;
          font-weight: 500;
          color: #dbe7ff;
          line-height: 1.6;
        }

        /* Desktop SVG Path Styling */
        .desktop-svg-path {
          position: absolute;
          top: 15vh;
          left: 50%;
          z-index: 0;
          width: 90%;
          height: 100%;
          transform: translateX(-50%);
          pointer-events: none;
          overflow: visible;
          display: block;
        }

        .desktop-svg-path svg {
          width: 100%;
          height: auto;
          opacity: 0.85;
          overflow: visible;
        }

        .mobile-svg-path {
          display: none;
        }

        @media (min-width: 901px) {
          .spotlight .row:nth-child(even) .col-card {
            order: 2;
          }
          .spotlight .row:nth-child(even) .col-img {
            order: 1;
          }
          .spotlight .row:nth-child(odd) .col-card {
            order: 1;
          }
          .spotlight .row:nth-child(odd) .col-img {
            order: 2;
          }
        }

        /* ── MOBILE STYLES (<900px) ── */
        @media (max-width: 900px) {
          .desktop-svg-path {
            display: none !important;
          }

          .mobile-svg-path {
            display: block !important;
            position: absolute;
            top: 20px;
            left: 0;
            width: 100%;
            height: calc(100% - 40px);
            z-index: 0;
            pointer-events: none;
            overflow: visible;
          }

          .mobile-svg-path svg {
            width: 100%;
            height: 100%;
            opacity: 0.88;
            overflow: visible;
          }

          .spotlight-hero,
          .spotlight-outro {
            height: auto;
            min-height: 40vh;
            padding: 2.5rem 1rem;
          }

          .spotlight-hero h2,
          .spotlight-outro h2 {
            padding: 1.5rem 1.25rem;
            font-size: clamp(1.4rem, 6vw, 2rem);
            border-radius: 18px;
          }

          .spotlight {
            padding: 2rem 1rem 80px 1rem;
            gap: 64px;
          }

          .spotlight .row {
            flex-direction: column;
            gap: 20px;
          }

          .spotlight .row .col-card {
            order: 1 !important;
            width: 100%;
          }

          .spotlight .row .col-img {
            order: 2 !important;
            width: 100%;
          }

          .spotlight .card {
            width: 100%;
            padding: 24px 20px;
            border-radius: 18px;
            background-color: #020b4d;
            border: 2px dashed rgba(255, 255, 255, 0.25);
          }

          .spotlight .card h2 {
            font-size: 1.4rem;
            color: #ffffff;
          }

          .spotlight .card p {
            font-size: 0.95rem;
            color: #dbe7ff;
          }
        }
      `}</style>
    </div>
  );
}

