import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ImageExpansionTypography({ onOpenInquiry }) {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const typeElements = container.querySelectorAll('.type');

      typeElements.forEach((typeEl) => {
        const expandImg = typeEl.querySelector('.type__expand-img');
        const animTexts = typeEl.querySelectorAll('.anim');
        const block = typeEl.closest('.content')?.querySelector('.block');

        // ScrollTrigger to animate type--open expansion on scroll (1:1 with reference ImageExpansionTypography-main)
        ScrollTrigger.create({
          trigger: typeEl,
          start: 'top 75%',
          end: 'bottom 25%',
          onEnter: () => typeEl.classList.add('type--open'),
          onLeaveBack: () => typeEl.classList.remove('type--open'),
          onEnterBack: () => typeEl.classList.add('type--open'),
          onLeave: () => typeEl.classList.remove('type--open'),
        });

        if (block) {
          gsap.fromTo(
            block,
            { yPercent: 40, opacity: 0.3, skewX: -6 },
            {
              yPercent: 0,
              opacity: 1,
              skewX: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                end: 'bottom 50%',
                scrub: 0.8,
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="image-expansion-typography-section">
      {/* ── Content 1: Project 1 ── */}
      <div className="content content--left">
        <h3 className="meta">Project 01 — Spatial Audio</h3>
        <h2 className="type" data-expand-1>
          Gratitude is my<br />
          new response<br />
          to
          <span className="type__expand type__expand--inline type__expand--reveal">
            <span className="type__expand-img">
              <span className="type__expand-img-inner" style={{ backgroundImage: 'url(/img1.jpg)' }} />
            </span>
            <span className="anim skewed">judgement.</span>
          </span>
        </h2>
        <p className="block">
          Behold the boundless dance of yin and yang, where all is flux and nothing holds its shape but for a fleeting breath. The mountain's might, though seeming steadfast, is but a moment's pause in the eternal march of grains of sand.
        </p>
      </div>

      {/* ── Content 2: Project 2 ── */}
      <div className="content content--center">
        <h3 className="meta">Project 02 — Cybernetic Horology</h3>
        <h2 className="type" data-expand-2>
          Life's a wild journey;<br />
          embrace the<br />
          <span className="type__expand type__expand--reveal type__expand--center">
            <span className="aright">detours </span>
            <span className="type__expand-img">
              <span className="type__expand-img-inner" style={{ backgroundImage: 'url(/img4.jpg)' }} />
            </span>
            <span className="anim skewed">and dance</span>
          </span>
          <br />
          under the stars.
        </h2>
        <p className="block">
          In this dance, even the stars, those ancient sentinels of the night sky, are not stationary but in perpetual motion, tracing their arcs in the fabric of the cosmos. Each spark of light, a testament to the infinite cycle of birth and rebirth.
        </p>
      </div>

      {/* ── Content 3: Project 3 ── */}
      <div className="content content--right">
        <h3 className="meta">Project 03 — Neural Compute</h3>
        <h2 className="type" data-expand-3>
          Let the miles unfurl<br />
          like stories each<br />
          <span className="type__expand type__expand--full">
            <span className="type__expand-img">
              <span className="type__expand-img-inner" style={{ backgroundImage: 'url(/img5.jpg)' }} />
            </span>
          </span>
          one a breath in the<br />
          saga of the soul.
        </h2>
        <p className="block">
          As we delve deeper into the mysteries of the cosmos, we encounter the profound realization that the universe itself breathes in a rhythm of creation and dissolution, a cosmic dance that mirrors the cycles of life and death.
        </p>
      </div>

      {/* ── Content 4: Project 4 ── */}
      <div className="content content--justify">
        <h3 className="meta">Project 04 — Autonomous Telemetry</h3>
        <h2 className="type" data-expand-4>
          Soar above
          <span className="type__expand type__expand--stack">
            <span className="anim rotated">peaks</span>
            <span className="type__expand-img type__expand-img--small">
              <span className="type__expand-img-inner" style={{ backgroundImage: 'url(/img8.jpg)' }} />
            </span>
          </span>
          into
          <span className="type__expand type__expand--stack">
            <span className="anim rotated">clouds,</span>
            <span className="type__expand-img type__expand-img--small">
              <span className="type__expand-img-inner" style={{ backgroundImage: 'url(/img3.jpg)' }} />
            </span>
          </span>
          <br />
          and the whispers of the wind<br />
          like
        </h2>
        <p className="block">
          The wind carries secrets of forgotten lands, whispering through ancient trees and singing over desolate dunes, reminding us of the eternal movement of spirit and form.
        </p>
      </div>

      <style>{`
        @font-face {
          font-family: "Coconat";
          src: url("/fonts/Coconat-Regular.woff2") format("woff2");
          font-weight: normal;
          font-style: normal;
        }

        .image-expansion-typography-section {
          width: 100%;
          padding: 6rem 2rem 10rem 2rem;
          color: #ffffff;
          position: relative;
          z-index: 3;
          box-sizing: border-box;
        }

        .content {
          padding: 1rem 2rem;
          display: grid;
          margin-bottom: 25vh;
          gap: 2rem;
          grid-template-columns: 100%;
          grid-template-areas: 'meta' 'type' 'block';
          grid-template-rows: auto auto auto;
        }

        .content:last-of-type {
          margin-bottom: 10vh;
        }

        .meta {
          grid-area: meta;
          font-family: var(--font-main);
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
          color: #8e8e93;
          margin-bottom: 2vh;
        }

        .meta::before {
          content: '\\2014';
          padding-right: 0.4rem;
          color: #c4d600;
        }

        .type {
          grid-area: type;
          font-family: "Coconat", serif;
          margin: 0;
          font-size: clamp(2.4rem, 5.2vw, 5.8rem);
          text-transform: none;
          line-height: 1.1;
          font-weight: normal;
          color: #ffffff;
        }

        .type__expand {
          vertical-align: top;
          display: inline-grid;
          grid-template-columns: min-content;
          transition: gap 0.5s ease;
        }

        .type__expand--center {
          display: block;
        }

        .type__expand--full {
          display: block;
          width: 100%;
        }

        .type__expand--stack {
          vertical-align: bottom;
          grid-template-columns: 100%;
          justify-items: center;
          display: inline-grid;
        }

        .type--open .type__expand {
          gap: 1.5rem;
        }

        .type--open .type__expand--stack {
          gap: 0.5rem;
          padding: 0 0 1rem 0;
        }

        .type__expand-img {
          display: inline-block;
          position: relative;
          aspect-ratio: 16/9;
          width: 0%;
          overflow: hidden;
          border-radius: 4rem;
          vertical-align: middle;
          transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.7s ease;
          background: #18181b;
        }

        .type__expand-img-inner {
          display: block;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .type__expand-img--small {
          aspect-ratio: 1;
        }

        .type__expand--reveal .type__expand-img-inner {
          width: 33vw;
          aspect-ratio: 16/9;
        }

        .type--open .type__expand-img {
          width: 100%;
        }

        .type--open .type__expand-img--small {
          width: 3.5em;
        }

        .anim {
          display: inline-block;
          white-space: nowrap;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .type--open .skewed {
          transform: skewX(-18deg);
          color: #c4d600;
        }

        .type--open .rotated {
          transform: skewX(-5deg) rotateZ(-8deg);
          color: #c4d600;
        }

        .block {
          grid-area: block;
          margin: 0;
          max-width: 480px;
          line-height: 1.6;
          font-family: var(--font-main);
          font-size: 0.95rem;
          color: #8e8e93;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media screen and (min-width: 53em) {
          .content--left {
            grid-template-columns: 1fr 42%;
            grid-template-rows: auto 19vw auto;
            grid-template-areas: 'meta meta' 'type type' '... block';
          }

          .content--center {
            text-align: center;
            place-items: center;
            grid-template-rows: auto 30vw auto;
          }

          .content--right {
            grid-column-gap: 10vw;
            grid-template-columns: auto 45%;
            grid-template-areas: 'block meta' 'block type';
            grid-template-rows: auto 40vw;
            text-align: right;
            justify-content: end;
          }

          .content--right .block {
            margin-top: 20vh;
          }

          .content--justify {
            max-width: 1200px;
            margin: 0 auto;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto 30vw auto;
            grid-template-areas: 'meta meta' 'type type' '... block';
          }

          .type__expand--inline {
            gap: 0.1em;
            grid-template-columns: repeat(3, min-content);
          }

          .type__expand--center {
            display: inline-grid;
            gap: 0.15em;
            justify-content: center;
            grid-template-columns: auto auto auto;
          }

          .type--open .type__expand--center {
            grid-template-columns: 1fr auto 1fr;
          }

          .type__expand--full {
            width: 100%;
            grid-template-columns: 100%;
          }

          .type__expand--full .type__expand-img {
            margin-left: auto;
          }

          .aright {
            text-align: right;
          }
        }
      `}</style>
    </div>
  );
}
