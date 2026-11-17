import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RIBBON_WORDS = Array.from({ length: 9 }, () => 'Discovery call · Strategy and blueprint · Design and build · Launch day · ').join('');

export default function SpotlightSVGPath() {
  const rootRef = useRef(null);
  const sectionRef = useRef(null);
  const desktopStrokePathRef = useRef(null);
  const mobileStrokePathRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // ── COLOUR MORPH (all sizes) ──
    // The section above is black, so this block arrives black too. As it
    // scrolls in, both backgrounds shift to burgundy together, so the whole
    // screen changes colour with no hard edge between the two. The morph
    // completes as the opening heading reaches the middle of the screen, and
    // reverses on the way back up.
    mm.add('(min-width: 0px)', () => {
      const root = rootRef.current;
      if (!root) return;
      const surfaces = [root.previousElementSibling, root].filter(Boolean);
      gsap.fromTo(
        surfaces,
        { backgroundColor: '#000000' },
        {
          backgroundColor: '#5a0b20',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            end: 'top top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

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
            scrub: 0.4,
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
            { y: 60 },
            {
              y: -60,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.4,
              },
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { y: -40, scale: 0.97 },
            {
              y: 40,
              scale: 1.03,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
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
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="spotlight-component-root">
      {/* ===== HERO ===== */}
      <section className="spotlight-hero">
        <div className="spotlight-heading">
          <span className="spotlight-kicker">Our process · Four steps</span>
          <h2>From the first call<br /><em>to launch day.</em></h2>
        </div>
      </section>

      {/* ===== SPOTLIGHT ===== */}
      <section ref={sectionRef} className="spotlight">
        
        {/* ROW 1: STEP 1 */}
        <div className="row">
          <div className="col col-card">
            <div className="card">
              <span className="step-badge">STEP 01 · INITIAL CONSULTATION</span>
              <h2>When the client calls us</h2>
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
              <h2>When we plan everything</h2>
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
              <h2>When we build it</h2>
              <p>
                We execute with precision. Our developers and designers craft custom WebGL shaders, kinetic GSAP motion, and high-speed responsive code at 60fps with zero off-the-shelf templates.
              </p>
            </div>
          </div>
          <div className="col col-img">
            <div className="img">
              <img src="/steps/step3.svg" alt="03. When we build it" />
            </div>
          </div>
        </div>

        {/* ROW 4: STEP 4 */}
        <div className="row">
          <div className="col col-card">
            <div className="card">
              <span className="step-badge">STEP 04 · DEPLOYMENT & LAUNCH</span>
              <h2>When we ship it to you</h2>
              <p>
                After thorough cross-browser QA testing and performance calibration, we deploy your custom digital flagship to global edge networks — ready to captivate your audience.
              </p>
            </div>
          </div>
          <div className="col col-img">
            <div className="img">
              <img src="/steps/step4.svg" alt="04. When we ship it to you" />
            </div>
          </div>
        </div>

        {/* ── DESKTOP RIBBON ──
            One solid pink stroke. The words ride along the same path and are
            masked by a copy of the stroke, so they appear as the ribbon draws. */}
        <div className="svg-path desktop-svg-path">
          <svg
            viewBox="0 -100 1378 2960"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <path id="spotlight-ribbon-path" d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5" />
              <mask id="spotlight-ribbon-reveal" maskUnits="userSpaceOnUse" x="-400" y="-400" width="2200" height="3600">
                <path
                  className="anim-stroke"
                  d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
                  stroke="#ffffff"
                  strokeWidth="70"
                  strokeLinecap="round"
                />
              </mask>
            </defs>

            <path
              className="anim-stroke"
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#f7b5c9"
              strokeWidth="60"
              strokeLinecap="round"
            />

            <g mask="url(#spotlight-ribbon-reveal)">
              <text className="ribbon-words" dominantBaseline="central">
                <textPath href="#spotlight-ribbon-path" startOffset="40">
                  {RIBBON_WORDS}
                </textPath>
              </text>
            </g>
          </svg>
        </div>

        {/* ── MOBILE RIBBON ── solid pink stroke, no glow */}
        <div className="svg-path mobile-svg-path">
          <svg
            viewBox="0 0 400 3600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <path
              className="anim-stroke"
              d="M 200 40 C 40 240, 20 480, 40 700 C 60 940, 360 980, 360 1250 C 360 1520, 40 1680, 40 2000 C 40 2320, 360 2420, 360 2750 C 360 3080, 160 3320, 200 3560"
              stroke="#f7b5c9"
              strokeWidth="26"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ===== OUTRO ===== */}
      <section className="spotlight-outro">
        <div className="spotlight-heading">
          <span className="spotlight-kicker">Every project, every time</span>
          <h2>Built for impact.<br /><em>Delivered without compromise.</em></h2>
        </div>
      </section>

      {/* ===== CSS Styles ===== */}
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: "Spotlight Serif";
          src: url("/fonts/codevantum/instrument-serif-regular.ttf") format("truetype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Spotlight Serif";
          src: url("/fonts/codevantum/instrument-serif-italic.ttf") format("truetype");
          font-weight: 400;
          font-style: italic;
          font-display: swap;
        }

        /* Burgundy and pink. Flat ground, no dot grid, no glow. */
        .spotlight-component-root {
          --spot-wine: #5a0b20;
          --spot-wine-deep: #47081a;
          --spot-pink: #f7b5c9;
          --spot-pink-body: rgba(247, 181, 201, 0.84);
          --spot-pink-muted: #d98aa3;
          --spot-line: rgba(247, 181, 201, 0.16);
          background-color: var(--spot-wine);
          color: var(--spot-pink);
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
          min-height: 560px;
          padding: 32px;
          background-color: transparent;
        }

        .spotlight-heading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
          text-align: center;
        }

        .spotlight-kicker {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--spot-pink-muted);
        }

        .spotlight-hero h2,
        .spotlight-outro h2 {
          margin: 0;
          font-family: "Spotlight Serif", "Cormorant Garamond", Georgia, serif;
          font-size: clamp(3.2rem, 7.4vw, 7.4rem);
          font-weight: 400;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: var(--spot-pink);
        }

        .spotlight-hero h2 em,
        .spotlight-outro h2 em,
        .spotlight .card h2 em {
          font-style: italic;
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
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--spot-pink-muted);
          margin-bottom: 0.25rem;
        }

        .spotlight .card {
          display: flex;
          flex-direction: column;
          width: 85%;
          margin: 0 auto;
          padding: 44px 44px 46px;
          gap: 16px;
          border-radius: 18px;
          background-color: var(--spot-wine-deep);
          border: 1px solid var(--spot-line);
        }

        .spotlight .card h2 {
          margin: 0;
          font-family: "Spotlight Serif", "Cormorant Garamond", Georgia, serif;
          font-size: clamp(2.2rem, 3.3vw, 3.4rem);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.02em;
          color: var(--spot-pink);
        }

        .spotlight .card p {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--spot-pink-body);
          line-height: 1.6;
        }

        /* Desktop ribbon */
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
          overflow: visible;
        }

        .ribbon-words {
          fill: var(--spot-wine);
          font-family: "Plus Jakarta Sans", "Manrope", sans-serif;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 1.5px;
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

        /* ── MOBILE (<900px) ── */
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
            overflow: visible;
          }

          .spotlight-hero,
          .spotlight-outro {
            height: auto;
            min-height: 46vh;
            padding: 3.5rem 1.25rem;
          }

          .spotlight-heading {
            gap: 1.25rem;
          }

          .spotlight-hero h2,
          .spotlight-outro h2 {
            font-size: clamp(2.6rem, 12vw, 3.6rem);
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
            padding: 26px 22px 28px;
            border-radius: 16px;
          }

          .spotlight .card h2 {
            font-size: 2rem;
          }

          .spotlight .card p {
            font-size: 0.95rem;
          }
        }
      ` }} />
    </div>
  );
}

