import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpotlightSVGPath() {
  const sectionRef = useRef(null);
  const strokePathRef = useRef(null);

  useEffect(() => {
    const path = strokePathRef.current;
    const section = sectionRef.current;
    if (!path || !section) return;

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1.2,
      },
    });

    // Parallax scrolling effect for desktop (min-width: 901px)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
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

    return () => {
      mm.revert();
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
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

        {/* SVG Path Layer */}
        <div className="svg-path">
          <svg
            viewBox="0 -100 1378 2960"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
            style={{ overflow: 'visible' }}
          >
            <path
              ref={strokePathRef}
              id="stroke-path"
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#032b56"
              strokeWidth="200"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* ===== OUTRO ===== */}
      <section className="spotlight-outro">
        <h2>Built for Impact. Delivered with Zero Compromises.</h2>
      </section>

      {/* ===== 1:1 CSS Styles from style.css ===== */}
      <style>{`
        .spotlight-component-root {
          --base-100: #eaf4f9;
          --base-200: #e4f0f7;
          --base-300: #0f2942;
          background-color: #eaf4f9;
          background-image: radial-gradient(circle, rgba(14, 116, 144, 0.22) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          color: #0f2942;
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

        .spotlight-hero h1,
        .spotlight-outro h1 {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          font-size: clamp(2rem, 4.5vw, 4rem);
          font-weight: 500;
          line-height: 1.1;
          letterSpacing: -1.6px;
          color: #0f2942;
          padding: 2.5rem 3rem;
          border: 2px dashed rgba(14, 116, 144, 0.35);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 32px rgba(14, 116, 144, 0.08);
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
          color: #0e7490;
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
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 2px dashed rgba(14, 116, 144, 0.38);
          box-shadow: 0 12px 32px rgba(14, 116, 144, 0.08);
        }

        .spotlight .card h2 {
          font-size: clamp(1.6rem, 2.5vw, 2.5rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -1.2px;
          color: #0f2942;
        }

        .spotlight .card p {
          font-size: 1.1rem;
          font-weight: 500;
          color: #334155;
          line-height: 1.6;
        }

        .spotlight .svg-path {
          position: absolute;
          top: 15vh;
          left: 50%;
          z-index: 0;
          width: 90%;
          height: 100%;
          transform: translateX(-50%);
          pointer-events: none;
          overflow: visible;
        }

        .spotlight .svg-path svg {
          width: 100%;
          height: auto;
          opacity: 0.85;
          overflow: visible;
        }

        .spotlight .row {
          position: relative;
          z-index: 1;
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

        @media (max-width: 900px) {
          .spotlight-hero,
          .spotlight-outro {
            height: auto;
            min-height: 40vh;
            padding: 2.5rem 1rem;
          }

          .spotlight-hero h1,
          .spotlight-outro h1 {
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
          }

          .spotlight .card h2 {
            font-size: 1.4rem;
          }

          .spotlight .card p {
            font-size: 0.95rem;
          }

          .spotlight .svg-path {
            display: block !important;
            top: 2vh;
            left: 50%;
            width: 140%;
            height: 98%;
            transform: translateX(-50%);
            overflow: visible;
          }

          .spotlight .svg-path svg {
            width: 100%;
            height: 100%;
            opacity: 0.75;
            overflow: visible;
          }
        }
      `}</style>
    </div>
  );
}
