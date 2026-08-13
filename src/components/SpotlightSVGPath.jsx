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

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="spotlight-component-root">
      {/* ===== HERO ===== */}
      <section className="spotlight-hero">
        <h1>Designed to keep information clear and connected</h1>
      </section>

      {/* ===== SPOTLIGHT ===== */}
      <section ref={sectionRef} className="spotlight">
        <div className="row">
          <div className="img">
            <img src="/img/img_1.svg" alt="Workflow preview 1" />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <h2>A cleaner way to handle incoming updates</h2>
              <p>
                Instead of showing every message or notification instantly, the app groups related items and presents them in an organized panel. It keeps your workspace calm, even when activity spikes.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="img">
              <img src="/img/img_2.svg" alt="Workflow preview 2" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="img">
              <img src="/img/img_3.svg" alt="Workflow preview 3" />
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h2>Built for increasing information demands</h2>
              <p>
                Whether it is files, notes, or incoming messages, the app sorts and prioritizes items automatically. It prevents clutter and helps maintain clarity during busy periods.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="img">
            <img src="/img/img_4.svg" alt="Workflow preview 4" />
          </div>
        </div>

        {/* SVG Path Layer */}
        <div className="svg-path">
          <svg
            viewBox="0 0 1378 2760"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
          >
            <path
              ref={strokePathRef}
              id="stroke-path"
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#c4d600"
              strokeWidth="200"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* ===== OUTRO ===== */}
      <section className="spotlight-outro">
        <h1>Clearer organization ready for whatever comes next</h1>
      </section>

      {/* ===== 1:1 CSS Styles from style.css ===== */}
      <style>{`
        .spotlight-component-root {
          --base-100: var(--bg-cream, #f4f3ef);
          --base-200: #e8e6df;
          --base-300: #0f0f0f;
          background-color: var(--base-100);
          color: var(--base-300);
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
          background-color: var(--base-200);
        }

        .spotlight-hero h1,
        .spotlight-outro h1 {
          width: 60%;
          text-align: center;
          font-size: clamp(2rem, 4.5vw, 4rem);
          font-weight: 500;
          line-height: 1.1;
          letterSpacing: -1.6px;
          color: #0f0f0f;
        }

        .spotlight {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: 100%;
          height: 100%;
          padding: 32px 4vw;
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
        }

        .spotlight .row .img img {
          width: 100%;
          height: auto;
          display: block;
        }

        .spotlight .row:nth-child(1) .img,
        .spotlight .row:nth-child(4) .img {
          width: 50%;
          margin: 0 auto;
        }

        .spotlight .card {
          display: flex;
          flex-direction: column;
          width: 85%;
          margin: 0 auto;
          padding: 48px;
          gap: 16px;
          border-radius: 16px;
          background-color: var(--base-200);
        }

        .spotlight .card h2 {
          font-size: clamp(1.6rem, 2.5vw, 2.5rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -1.2px;
          color: #0f0f0f;
        }

        .spotlight .card p {
          font-size: 1.1rem;
          font-weight: 500;
          color: #52525b;
          line-height: 1.6;
        }

        .spotlight .svg-path {
          position: absolute;
          top: 25vh;
          left: 50%;
          z-index: 0;
          width: 90%;
          height: 100%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .spotlight .svg-path svg {
          width: 100%;
          height: auto;
          opacity: 0.85;
        }

        .spotlight .row {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1000px) {
          .spotlight-hero h1,
          .spotlight-outro h1 {
            width: 100%;
            font-size: 2rem;
          }

          .spotlight {
            gap: 80px;
          }

          .spotlight .row {
            flex-direction: column;
          }

          .spotlight .row:nth-child(1) .img,
          .spotlight .row:nth-child(4) .img {
            width: 100%;
          }

          .spotlight .card {
            width: 100%;
            padding: 24px;
          }

          .spotlight .svg-path {
            top: 15vh;
            width: 275%;
          }
        }
      `}</style>
    </div>
  );
}
