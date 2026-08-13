import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ImageExpansionTypography({ onOpenInquiry }) {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const typeElements = container.querySelectorAll('.iet-type');

      typeElements.forEach((typeEl) => {
        const expandImg = typeEl.querySelector('.iet-img-wrap');
        const animTexts = typeEl.querySelectorAll('.iet-anim');
        const block = typeEl.closest('.iet-content')?.querySelector('.iet-block');

        if (expandImg) {
          gsap.fromTo(
            expandImg,
            { width: isMobile ? '60px' : '0%' },
            {
              width: isMobile ? '90vw' : '100%',
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: typeEl,
                start: 'top 80%',
                end: isMobile ? 'bottom 60%' : 'bottom 35%',
                scrub: 0.8,
              },
            }
          );
        }

        if (animTexts.length > 0) {
          gsap.fromTo(
            animTexts,
            { skewX: 0, color: '#0f0f0f' },
            {
              skewX: isMobile ? 0 : -18,
              color: '#829100',
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: typeEl,
                start: 'top 80%',
                end: isMobile ? 'bottom 60%' : 'bottom 35%',
                scrub: 0.8,
              },
            }
          );
        }

        if (block) {
          gsap.fromTo(
            block,
            { yPercent: 20, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 90%',
                end: 'bottom 60%',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="iet-section">

      {/* Project 01 */}
      <div className="iet-content">
        <div className="iet-project-label">
          <span className="iet-num">01</span>
          <span className="iet-client">Voltlites Audio Inc.</span>
          <span className="iet-cat">3D Web &amp; Generative Shaders · 2026</span>
        </div>
        <h2 className="iet-type">
          Gratitude is my<br />
          new response to
          <span className="iet-expand iet-expand--inline">
            <span className="iet-img-wrap">
              <span className="iet-img-inner" style={{ backgroundImage: 'url(/img1.jpg)' }} />
            </span>
            <span className="iet-anim iet-skewed">judgement.</span>
          </span>
        </h2>
        <p className="iet-block">
          Behold the boundless dance of yin and yang, where all is flux and nothing holds its shape but for a fleeting breath. Interactive WebGL spatial audio with real-time waveform visualization.
        </p>
        <button className="iet-cta" onClick={onOpenInquiry}>Commission Similar Work →</button>
      </div>

      {/* Project 02 */}
      <div className="iet-content">
        <div className="iet-project-label">
          <span className="iet-num">02</span>
          <span className="iet-client">Chronos Luxury</span>
          <span className="iet-cat">Brand Systems &amp; E-Commerce · 2026</span>
        </div>
        <h2 className="iet-type">
          Life's a wild journey;<br />
          embrace the detours
          <span className="iet-expand iet-expand--inline">
            <span className="iet-img-wrap">
              <span className="iet-img-inner" style={{ backgroundImage: 'url(/img4.jpg)' }} />
            </span>
            <span className="iet-anim iet-skewed">and dance.</span>
          </span>
        </h2>
        <p className="iet-block">
          High-fashion digital flagship store for next-generation timepiece collectors featuring real-time 3D watch customization and high-speed headless CMS.
        </p>
        <button className="iet-cta" onClick={onOpenInquiry}>Commission Similar Work →</button>
      </div>

      {/* Project 03 */}
      <div className="iet-content">
        <div className="iet-project-label">
          <span className="iet-num">03</span>
          <span className="iet-client">Aether Labs</span>
          <span className="iet-cat">Kinetic UI &amp; AI Dashboards · 2025</span>
        </div>
        <h2 className="iet-type">
          Let the miles unfurl<br />
          like stories each
          <span className="iet-expand iet-expand--full">
            <span className="iet-img-wrap">
              <span className="iet-img-inner" style={{ backgroundImage: 'url(/img5.jpg)' }} />
            </span>
          </span>
          one a breath in the<br />
          saga of the soul.
        </h2>
        <p className="iet-block">
          High-speed AI model training dashboard with GPU-accelerated canvas charts, real-time telemetry websockets, and a comprehensive dark mode design system.
        </p>
        <button className="iet-cta" onClick={onOpenInquiry}>Commission Similar Work →</button>
      </div>

      {/* Project 04 */}
      <div className="iet-content">
        <div className="iet-project-label">
          <span className="iet-num">04</span>
          <span className="iet-client">Hyperion Dynamic</span>
          <span className="iet-cat">Custom Canvas Engine · 2025</span>
        </div>
        <h2 className="iet-type">
          Soar above{' '}
          <span className="iet-expand iet-expand--stack">
            <span className="iet-anim iet-rotated">peaks</span>
            <span className="iet-img-wrap iet-img-small">
              <span className="iet-img-inner" style={{ backgroundImage: 'url(/img8.jpg)' }} />
            </span>
          </span>
          {' '}into{' '}
          <span className="iet-expand iet-expand--stack">
            <span className="iet-anim iet-rotated">clouds,</span>
            <span className="iet-img-wrap iet-img-small">
              <span className="iet-img-inner" style={{ backgroundImage: 'url(/img3.jpg)' }} />
            </span>
          </span>
          <br />
          and whispers of the wind.
        </h2>
        <p className="iet-block">
          Immersive 3D telemetry experience for electric hypercar racing with real-time aerodynamic simulation across global circuits.
        </p>
        <button className="iet-cta" onClick={onOpenInquiry}>Commission Similar Work →</button>
      </div>

      <style>{`
        @font-face {
          font-family: "Coconat";
          src: url("/fonts/Coconat-Regular.woff2") format("woff2");
          font-weight: normal;
          font-style: normal;
        }

        /* ── BASE ── */
        .iet-section {
          width: 100%;
          background-color: #ebf5df;
          padding: 5rem 5vw 8rem 5vw;
          box-sizing: border-box;
          overflow: hidden;
        }

        .iet-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 5rem;
          margin-bottom: 3rem;
          border-bottom: 1px solid rgba(15,15,15,0.1);
        }

        .iet-content:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        /* ── PROJECT LABEL ── */
        .iet-project-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .iet-num {
          font-family: var(--font-main);
          font-size: 0.75rem;
          font-weight: 700;
          color: #829100;
          letter-spacing: 0.15em;
        }

        .iet-client {
          font-family: var(--font-main);
          font-size: 0.78rem;
          font-weight: 600;
          color: #0f0f0f;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .iet-cat {
          font-family: var(--font-main);
          font-size: 0.72rem;
          color: #52525b;
          letter-spacing: 0.08em;
          margin-left: auto;
        }

        /* ── HEADLINE ── */
        .iet-type {
          font-family: "Coconat", serif;
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          font-weight: normal;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: #0f0f0f;
          margin: 0;
          word-break: break-word;
        }

        /* ── EXPAND SPANS ── */
        .iet-expand {
          display: inline-grid;
          vertical-align: middle;
        }

        .iet-expand--inline {
          grid-template-columns: min-content auto;
          align-items: center;
          gap: 0.5rem;
        }

        .iet-expand--full {
          display: block;
          width: 100%;
          margin: 0.6rem 0;
        }

        .iet-expand--stack {
          display: inline-grid;
          grid-template-rows: auto auto;
          justify-items: center;
          vertical-align: bottom;
          gap: 0.2rem;
        }

        /* ── IMAGE PILL ── */
        .iet-img-wrap {
          display: inline-block;
          height: clamp(50px, 7vw, 100px);
          width: 0;
          min-width: 0;
          overflow: hidden;
          border-radius: 100px;
          vertical-align: middle;
          background: #c8dab8;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          flex-shrink: 0;
        }

        .iet-expand--full .iet-img-wrap {
          display: block;
          width: 0;
          height: clamp(180px, 30vw, 420px);
          border-radius: 16px;
        }

        .iet-img-small {
          height: clamp(38px, 4.5vw, 70px) !important;
        }

        .iet-img-inner {
          display: block;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          min-width: 300px;
        }

        .iet-anim {
          display: inline-block;
          white-space: nowrap;
          font-style: italic;
        }

        .iet-skewed {
          color: #0f0f0f;
        }

        .iet-rotated {
          color: #0f0f0f;
        }

        /* ── DESCRIPTION ── */
        .iet-block {
          font-family: var(--font-main);
          font-size: clamp(0.9rem, 1.1vw, 1.05rem);
          line-height: 1.7;
          color: #27272a;
          max-width: 600px;
          margin: 0;
        }

        /* ── CTA ── */
        .iet-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.4rem;
          border-radius: 24px;
          border: 1px solid rgba(15,15,15,0.2);
          background: rgba(15,15,15,0.04);
          color: #0f0f0f;
          font-family: var(--font-main);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          width: fit-content;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .iet-cta:hover {
          background: #829100;
          color: #fff;
          border-color: #829100;
        }

        /* ── DESKTOP LAYOUT VARIANTS ── */
        @media (min-width: 900px) {
          .iet-section {
            padding: 7rem 5vw 10rem 5vw;
          }

          .iet-content {
            gap: 2rem;
            padding-bottom: 7rem;
            margin-bottom: 4rem;
          }

          .iet-type {
            font-size: clamp(3.5rem, 5.5vw, 6rem);
          }

          .iet-block {
            font-size: 1.05rem;
          }
        }

        /* ── MOBILE OVERRIDES ── */
        @media (max-width: 767px) {
          .iet-section {
            padding: 3rem 1.25rem 4rem 1.25rem;
          }

          .iet-content {
            gap: 1.25rem;
            padding-bottom: 3rem;
            margin-bottom: 1.5rem;
          }

          .iet-project-label {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }

          .iet-cat {
            margin-left: 0;
          }

          .iet-type {
            font-size: clamp(2rem, 8.5vw, 2.8rem);
            line-height: 1.15;
          }

          .iet-expand--inline {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            flex-wrap: nowrap;
          }

          .iet-expand--stack {
            display: inline-grid;
            vertical-align: bottom;
          }

          .iet-img-wrap {
            height: clamp(44px, 11vw, 60px);
            border-radius: 50px;
          }

          .iet-expand--full .iet-img-wrap {
            display: block;
            width: 0;
            height: clamp(140px, 45vw, 220px);
            border-radius: 12px;
          }

          .iet-img-small {
            height: clamp(32px, 9vw, 50px) !important;
          }

          .iet-block {
            font-size: 0.92rem;
            line-height: 1.65;
            max-width: 100%;
          }

          .iet-cta {
            font-size: 0.78rem;
            padding: 0.55rem 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
