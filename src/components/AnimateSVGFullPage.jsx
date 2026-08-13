import React, { useEffect, useRef } from 'react';

function mapVal(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export default function AnimateSVGFullPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const firefoxAgent = navigator.userAgent.indexOf('Firefox') > -1;
    const svgElements = container.querySelectorAll('.svgtext');
    const instances = [];

    svgElements.forEach((svgEl) => {
      const text = svgEl.querySelector('text');
      const textPath = svgEl.querySelector('textPath');
      const path = svgEl.querySelector('path');
      if (!text || !textPath || !path) return;

      if (firefoxAgent) {
        text.removeAttribute('filter');
      }

      const filterType = svgEl.dataset.filterType;
      const filterAttr = text.getAttribute('filter');
      const filterIdMatch = filterAttr && filterAttr.match(/url\(["']?([^"']*)["']?\)/);
      const rawFilterId = filterIdMatch ? filterIdMatch[1].replace(/^#/, '') : null;

      let filterPrimitiveEl = null;
      if (filterType && rawFilterId) {
        const primType = filterType === 'blur' ? 'feGaussianBlur' : 'feDisplacementMap';
        filterPrimitiveEl = container.querySelector(`#${rawFilterId} ${primType}`) || document.querySelector(`#${rawFilterId} ${primType}`);
      }

      let pathLength = path.getTotalLength();
      let svgRect = svgEl.getBoundingClientRect();
      let positionY = svgRect.top + window.pageYOffset;

      const handleResize = () => {
        svgRect = svgEl.getBoundingClientRect();
        positionY = svgRect.top + window.pageYOffset;
        pathLength = path.getTotalLength();
      };
      window.addEventListener('resize', handleResize);

      let startOffsetVal = 0;
      let scrollVal = window.pageYOffset;
      let isVisible = false;
      let entered = false;

      const computeOffset = () => {
        const winH = window.innerHeight || 800;
        return mapVal(positionY - window.pageYOffset, winH, 0, pathLength, -pathLength / 2);
      };

      startOffsetVal = computeOffset();
      textPath.setAttribute('startOffset', `${startOffsetVal}px`);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.intersectionRatio > 0;
          if (!isVisible) {
            entered = false;
          }
        });
      });
      observer.observe(svgEl);

      const update = () => {
        const currentOffset = computeOffset();
        startOffsetVal = !entered ? currentOffset : lerp(startOffsetVal, currentOffset, 0.22);
        textPath.setAttribute('startOffset', `${startOffsetVal}px`);

        const currentScroll = window.pageYOffset;
        scrollVal = !entered ? currentScroll : lerp(scrollVal, currentScroll, 0.17);
        const distance = Math.abs(scrollVal - currentScroll);

        if (filterPrimitiveEl) {
          if (filterType === 'blur') {
            const minDev = parseFloat(filterPrimitiveEl.dataset.minDeviation || 0);
            const maxDev = parseFloat(filterPrimitiveEl.dataset.maxDeviation || 10);
            const dev = clamp(mapVal(distance, 0, 400, minDev, maxDev), minDev, maxDev);
            filterPrimitiveEl.setAttribute('stdDeviation', dev.toFixed(1));
          } else if (filterType === 'distortion') {
            const minScale = parseFloat(filterPrimitiveEl.dataset.minScale || 0);
            const maxScale = parseFloat(filterPrimitiveEl.dataset.maxScale || 100);
            const sc = clamp(mapVal(distance, 0, 200, minScale, maxScale), minScale, maxScale);
            if (filterPrimitiveEl.scale) {
              filterPrimitiveEl.scale.baseVal = sc;
            } else {
              filterPrimitiveEl.setAttribute('scale', sc);
            }
          }
        }

        if (!entered) entered = true;
      };

      instances.push({
        svgEl,
        update,
        getVisible: () => isVisible,
        cleanup: () => {
          window.removeEventListener('resize', handleResize);
          observer.disconnect();
        },
      });
    });

    let animId;
    const render = () => {
      instances.forEach((inst) => {
        if (inst.getVisible()) {
          inst.update();
        }
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      instances.forEach((inst) => inst.cleanup());
    };
  }, []);

  return (
    <div ref={containerRef} className="animate-svg-fullpage-root">
      {/* ── Global SVG Filter Defs ── */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <defs>
          <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0" result="blur" data-min-deviation="0" data-max-deviation="10" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          <filter id="blur2" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0" result="glow" data-min-deviation="0" data-max-deviation="30" />
            <feColorMatrix result="bluralpha" type="matrix" values="0 -1 0 0 0 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1.8 0 " />
            <feOffset in="bluralpha" dx="0.000000" dy="0.000000" result="offsetBlur" />
            <feMerge>
              <feMergeNode in="offsetBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="distortionFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" data-min-scale="0" data-max-scale="100" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
          </filter>
          <filter id="distortionFilter2">
            <feGaussianBlur stdDeviation="10" result="glow" />
            <feTurbulence type="fractalNoise" baseFrequency="0 0.1" numOctaves="2" seed="2" stitchTiles="noStitch" x="-30%" y="-30%" width="160%" height="160%" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" data-min-scale="0" data-max-scale="50" xChannelSelector="R" yChannelSelector="B" x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse" result="displacement" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="displacement" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ── Main Layout from code (35) ── */}
      <main className="svgpage-main">
        {/* Screen Frame */}
        <div className="frame frame--screen">
          <div className="frame__title-wrap">
            <h1 className="frame__title">Vantum Global Practice</h1>
          </div>
          <h2 className="frame__heading">A NOVA Space Project</h2>
          <div className="frame__counter">
            <span className="frame__counter-number">06</span>
            <span className="frame__counter-text">months</span>
            <span className="frame__counter-number">04</span>
            <span className="frame__counter-text">days left</span>
          </div>
          <nav className="frame__links frame__links--header">
            <a href="#work">Works</a>
            <a href="#about">Practice</a>
            <a href="#contact">Inquiries</a>
          </nav>
        </div>

        {/* Intro Header */}
        <header className="intro">
          <h1 className="intro__title">TERRAFORMING</h1>
          <p className="intro__hint">Discover our mission</p>
        </header>

        {/* Grid Section 1 (01 & 02) */}
        <div className="grid">
          <div className="grid__item">
            <span className="grid__item-number">01</span>
            <img className="grid__item-img" src="/img/1.jpg" alt="One man, one mission" />
            <h3 className="grid__item-title">One man, one mission</h3>
            <p className="grid__item-description">
              Daedalus in the meantime, hating Crete and his long exile and having been touched by the love of his birthplace, had been closed in by the sea. He says, "Although Minos obstructs the land and waves, the sky at least lies open; we will fly there. Minos may possess everything, but he does not possess the air."
            </p>
          </div>
          <div className="grid__item">
            <span className="grid__item-number">02</span>
            <img className="grid__item-img" src="/img/2.jpg" alt="Geode planning" />
            <h3 className="grid__item-title">Geode planning</h3>
            <p className="grid__item-description">
              He spoke and sends down his mind into unknown arts and changes his nature. For he puts feathers in a row beginning with the small ones, and the shorter ones following the long ones, so that you should think it has grown on an incline; in the same way that a countryman's pipe gradually builds up with reeds of different lengths.
            </p>
          </div>
        </div>

        {/* SVG Text Curves 1 & 11 */}
        <svg className="svgtext svgtext--1" data-filter-type="blur" width="120%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 200">
          <path id="text-curve1" d="M 0 100 Q 250 200 500 100 Q 750 0 1000 100" fill="none" />
          <text filter="url(#blur)">
            <textPath href="#text-curve1">
              You may think I’m small, but I have a universe inside my mind.
            </textPath>
          </text>
        </svg>

        <svg className="svgtext" data-filter-type="blur" width="120%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 200">
          <path id="text-curve11" d="M 0 100 Q 250 0 500 100 Q 750 200 1000 100" fill="none" />
          <text filter="url(#blur2)">
            <textPath href="#text-curve11">
              Don't forget about the stardust. Don't forget about the quartz rocks in the woods.
            </textPath>
          </text>
        </svg>

        {/* Grid Section 2 (03 & 04) */}
        <div className="grid">
          <div className="grid__item">
            <span className="grid__item-number">03</span>
            <img className="grid__item-img" src="/img/3.jpg" alt="Disaster management" />
            <h3 className="grid__item-title">Disaster management</h3>
            <p className="grid__item-description">
              Then he binds the middle ones with thread and the last feathers with wax and then bends what he has created by a small curvature as to mimic real birds. Together with his father, the boy Icarus was standing nearby, unaware that he was facing danger, now with a beaming face was capturing the feathers which the wandering air has moved.
            </p>
          </div>
          <div className="grid__item">
            <span className="grid__item-number">04</span>
            <img className="grid__item-img" src="/img/4.jpg" alt="Impact theory" />
            <h3 className="grid__item-title">Impact theory</h3>
            <p className="grid__item-description">
              After the finishing touch had been placed on the work, the craftsman balanced his body on the twin wings and suspended his body in the open air; "I warn you to travel in the middle course, Icarus, so that the waves may not weigh down your wings if you go too low, and so that the sun will not scorch your wings if you go too high."
            </p>
          </div>
        </div>

        {/* Big Image 1 */}
        <img className="bigimg" src="/img/big1.jpg" alt="Big feature visual" />

        {/* SVG Text Curves 2 & 22 */}
        <svg className="svgtext svgtext--2" data-filter-type="distortion" width="120%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 200">
          <path id="text-curve2" d="M 0 50 Q 100 0 200 100 Q 300 200 650 50 C 750 0 750 150 1000 50" fill="none" />
          <text filter="url(#distortionFilter)">
            <textPath href="#text-curve2">
              Dwell on the beauty of life. Watch the stars.
            </textPath>
          </text>
        </svg>

        <svg className="svgtext" data-filter-type="distortion" width="120%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 300">
          <path id="text-curve22" d="M 0 200 Q 150 300 300 200 Q 700 0 1000 150" fill="none" />
          <text filter="url(#distortionFilter2)">
            <textPath href="#text-curve22">
              The cosmos is within us. We are made of star-stuff.
            </textPath>
          </text>
        </svg>

        {/* Grid Section 3 (05 & 06) */}
        <div className="grid">
          <div className="grid__item">
            <span className="grid__item-number">05</span>
            <img className="grid__item-img" src="/img/5.jpg" alt="Incubation assertion" />
            <h3 className="grid__item-title">Incubation assertion</h3>
            <p className="grid__item-description">
              With me leading, seize the way! He hands over at the same time the rules of flying and fits the unknown wings on his shoulders. Between the work and warnings the old cheeks grew wet, and his fatherly hands trembled; He gave to his son kisses not to be repeated.
            </p>
          </div>
          <div className="grid__item">
            <span className="grid__item-number">06</span>
            <img className="grid__item-img" src="/img/6.jpg" alt="Hyperdrive vessel" />
            <h3 className="grid__item-title">Hyperdrive vessel</h3>
            <p className="grid__item-description">
              Just as a bird who has led forth a tender offspring from a high nest into the air, and encourages him to follow and instructs him in the destructive arts and he moves himself and looks back at the wings of his son. Someone while catching fish with a trembling rod saw these men and was stunned.
            </p>
          </div>
        </div>

        {/* SVG Text Curves 3, 4, 5 */}
        <svg className="svgtext svgtext--3" data-filter-type="blur" width="120%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 200">
          <path id="text-curve3" d="M 0 150 Q 200 50 500 50 Q 800 50 1000 150 " fill="none" />
          <text filter="url(#blur)">
            <textPath href="#text-curve3">
              When it is dark enough, you can see the stars.
            </textPath>
          </text>
        </svg>

        <svg className="svgtext svgtext--3" data-filter-type="blur" width="120%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 200">
          <path id="text-curve4" d="M 0 150 Q 200 50 500 50 Q 800 50 1000 150 " fill="none" />
          <text filter="url(#blur)">
            <textPath href="#text-curve4">
              It is not the man who has too little, but the man who craves more, that is poor.
            </textPath>
          </text>
        </svg>

        <svg className="svgtext svgtext--3" data-filter-type="blur" width="120%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 200">
          <path id="text-curve5" d="M 0 150 Q 200 50 500 50 Q 800 50 1000 150 " fill="none" />
          <text filter="url(#blur)">
            <textPath href="#text-curve5">
              Live by love though the stars walk backward.
            </textPath>
          </text>
        </svg>

        {/* Big Image 2 */}
        <img className="bigimg" src="/img/big2.jpg" alt="Big feature visual 2" />

        {/* Grid Wrap Section 4 (07 & 08 + TextCircle) */}
        <div className="grid-wrap">
          <svg className="svgtext svgtext--4" data-filter-type="blur" width="120%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 200">
            <path id="textcircle" d="M 0 0 Q 200 150 500 150 Q 850 150 1000 0 " fill="none" />
            <text filter="url(#blur)">
              <textPath href="#textcircle">
                Yours is the light by which my spirit's born: you are my sun, my moon, and all my stars.
              </textPath>
            </text>
          </svg>
          <div className="grid">
            <div className="grid__item">
              <span className="grid__item-number">07</span>
              <img className="grid__item-img" src="/img/7.jpg" alt="Icarian Engine" />
              <h3 className="grid__item-title">Icarian Engine</h3>
              <p className="grid__item-description">
                And now Juno's Samos was on the left side for Delos and Paros had been left behind and on the right was Lebynthos and Kalymnos rich in honey, when the boy began to rejoice in his bold flight and deserted his leader, and attracted by a desire for the sky he took his path went higher.
              </p>
            </div>
            <div className="grid__item">
              <span className="grid__item-number">08</span>
              <img className="grid__item-img" src="/img/8.jpg" alt="Neutrospace Accelerator" />
              <h3 className="grid__item-title">Neutrospace Accelerator</h3>
              <p className="grid__item-description">
                The vicinity of the sun softens the fragrant wax, the chains of the feathers; the wax melted: he shook his bare arms and lacking oarage he takes up no air, and his mouth shouting his father's name is swept up in the blue sea, which takes its name from him.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── CSS Styles 1:1 from base.css ── */}
      <style>{`
        .animate-svg-fullpage-root {
          width: 100%;
          min-height: 100vh;
          background-color: #0a0104;
          color: #ffffff;
          font-family: poynter-oldstyle-display-con, 'Cormorant Garamond', 'Syne', serif;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        .svgpage-main {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .svgpage-main a {
          text-decoration: none;
          color: #5c5c5c;
          outline: none;
        }

        .svgpage-main a:hover,
        .svgpage-main a:focus {
          color: #ffffff;
          outline: none;
        }

        .svgpage-main .frame {
          padding: 3rem 5vw;
          text-align: center;
          position: relative;
          z-index: 100;
          text-transform: uppercase;
        }

        .svgpage-main .frame__title {
          font-size: 1rem;
          margin: 0 0 1rem;
          font-weight: normal;
        }

        .svgpage-main .frame__links {
          display: inline;
        }

        .svgpage-main .frame__links a:not(:last-child) {
          margin-right: 1rem;
        }

        .svgpage-main .frame__heading {
          margin: 1rem 0;
          font-size: 1rem;
          font-weight: 400;
        }

        .svgpage-main .frame__counter {
          margin: 2rem 0;
          align-items: baseline;
          line-height: 0.8rem;
          text-align: center;
        }

        .svgpage-main .frame__counter span {
          margin: 0 0.25rem;
        }

        .svgpage-main .frame__counter-text:nth-child(2) {
          margin: 0 1.5rem 0 0;
        }

        .svgpage-main .frame__counter-number {
          font-size: 200%;
        }

        .svgpage-main .intro {
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          min-height: 60vh;
        }

        .svgpage-main .intro__title {
          font-size: 19vw;
          margin: 0;
          font-weight: 400;
          line-height: 1;
          color: #ffffff;
        }

        .svgpage-main .intro__hint {
          position: relative;
          text-transform: uppercase;
          margin: 8vh 0 0 0;
          color: #ffffff;
        }

        .svgpage-main .intro__hint::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 2rem;
          top: calc(100% + 2rem);
          left: 50%;
          background-color: currentColor;
        }

        .svgpage-main .grid-wrap {
          position: relative;
        }

        .svgpage-main .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, calc(390px + 3rem)));
          justify-content: center;
          grid-gap: 10vw;
          margin: 15rem auto;
        }

        .svgpage-main .grid__item {
          padding: 1.5rem;
        }

        .svgpage-main .grid__item-number {
          display: block;
          text-align: right;
          font-size: 3rem;
          line-height: 1;
          color: #ffffff;
        }

        .svgpage-main .grid__item-img {
          margin: 1rem 0 1.75rem;
          max-width: 100%;
          display: block;
        }

        .svgpage-main .grid__item-title {
          font-size: 1.25rem;
          text-transform: uppercase;
          font-weight: 400;
          margin: 0 0 2.75rem 0;
          color: #ffffff;
        }

        .svgpage-main .grid__item-description {
          color: #504f4f;
          font-family: news-gothic-std, sans-serif;
          line-height: 1.5;
          padding-right: 1rem;
        }

        .svgpage-main .bigimg {
          display: block;
          width: 100%;
          max-width: calc(1025px - 3rem);
          margin: 25vh auto;
        }

        .svgpage-main .svgtext {
          flex: none;
          position: relative;
          left: -10%;
        }

        .svgpage-main .svgtext text {
          fill: #fff;
          font-size: 42px;
        }

        .svgpage-main .svgtext--1 text {
          fill: #fff;
        }

        .svgpage-main .svgtext--2 text {
          fill: #8569c2;
        }

        .svgpage-main .svgtext--3 text {
          font-size: 32px;
        }

        .svgpage-main .svgtext--4 {
          position: absolute;
        }

        .svgpage-main .svgtext--4 text {
          font-size: 48px;
          fill: #f9e9a4;
        }

        @media screen and (min-width: 53em) {
          .svgpage-main .frame--screen {
            position: absolute;
            text-align: left;
            z-index: 100;
            top: 0;
            left: 0;
            display: grid;
            align-content: space-between;
            width: 100%;
            max-width: none;
            height: 100vh;
            padding: 2.25rem 2.5rem;
            pointer-events: none;
            grid-template-columns: 30% 40% 30%;
            grid-template-rows: auto auto auto;
            grid-template-areas: 'heading counter links'
                              '... ... ...'
                              'title title ...';
          }
          .svgpage-main .frame__title-wrap {
            grid-area: title;
            display: flex;
          }
          .svgpage-main .frame__title {
            margin: 0 4rem 0 0;
          }
          .svgpage-main .frame__counter {
            grid-area: counter;
            justify-self: center;
            display: flex;
            margin: 0;
          }
          .svgpage-main .frame__heading {
            margin: 0;
            grid-area: heading;
          }
          .svgpage-main .frame__links {
            padding: 0;
            justify-self: end;
          }
          .svgpage-main .frame__links--header {
            grid-area: links;
          }
          .svgpage-main .frame a {
            pointer-events: auto;
          }
          .svgpage-main .intro {
            min-height: 100vh;
          }
          .svgpage-main .grid__item:nth-child(even) {
            margin-top: 35vh;
            text-align: right;
          }
          .svgpage-main .grid__item:nth-child(even) .grid__item-description {
            padding: 0 0 0 1rem;
          }
          .svgpage-main .grid__item-number {
            font-size: 4.75rem;
          }
        }
      `}</style>
    </div>
  );
}
