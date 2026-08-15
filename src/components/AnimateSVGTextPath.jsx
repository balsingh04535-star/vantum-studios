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

export default function AnimateSVGTextPath({
  text = "PARTNERS WHO DEMANDED THE EXTRAORDINARY",
  pathD = "M -400 150 Q 400 280 1200 150 Q 2000 20 2800 150 Q 3600 280 4400 150",
  viewBox = "0 0 3200 300",
  fontSize = "3.2rem",
  textColor = "#ffffff",
  glowColor = "#c4d600",
  idPrefix = "path1",
  repeatCount = 4,
}) {
  const svgRef = useRef(null);
  const textPathRef = useRef(null);
  const blurFilterRef = useRef(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const textPath = textPathRef.current;
    const path = svgEl?.querySelector('path');
    if (!svgEl || !textPath || !path) return;

    let animFrameId;
    let isVisible = false;
    let pathLength = path.getTotalLength();
    let positionY = svgEl.getBoundingClientRect().top + window.pageYOffset;
    let startOffsetVal = 0;
    let scrollVal = window.pageYOffset;
    let entered = false;

    const handleResize = () => {
      if (!svgEl) return;
      pathLength = path.getTotalLength();
      positionY = svgEl.getBoundingClientRect().top + window.pageYOffset;
    };
    window.addEventListener('resize', handleResize);

    const computeOffset = () => {
      const winHeight = window.innerHeight || 800;
      const currentScroll = window.pageYOffset;
      // Maps scroll position along wide path so text never cuts off
      return mapVal(positionY - currentScroll, winHeight, -winHeight * 0.5, pathLength * 0.45, -pathLength * 0.65);
    };

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
      startOffsetVal = !entered ? currentOffset : lerp(startOffsetVal, currentOffset, 0.16);
      textPath.setAttribute('startOffset', `${startOffsetVal}px`);

      // Calculate scroll speed distance for cinematic motion blur
      const currentScroll = window.pageYOffset;
      scrollVal = !entered ? currentScroll : lerp(scrollVal, currentScroll, 0.15);
      const distance = Math.abs(scrollVal - currentScroll);

      if (blurFilterRef.current) {
        const blurAmount = clamp(mapVal(distance, 0, 300, 0, 8), 0, 8);
        blurFilterRef.current.setAttribute('stdDeviation', blurAmount.toFixed(1));
      }

      if (!entered) entered = true;
    };

    const render = () => {
      if (isVisible) {
        update();
      }
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pathId = `svg-curve-${idPrefix}`;
  const filterId = `svg-filter-${idPrefix}`;

  // Repeat text string so text flows continuously without clipping
  const repeatedTextString = Array.from({ length: repeatCount })
    .map(() => `${text} · `)
    .join('');

  return (
    <div style={{ width: '100%', overflow: 'hidden', margin: '3rem 0', position: 'relative', zIndex: 3 }}>
      <svg
        ref={svgRef}
        width="100%"
        height="220px"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur ref={blurFilterRef} stdDeviation="0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path id={pathId} d={pathD} fill="none" stroke="none" />

        <text
          filter={`url(#${filterId})`}
          style={{
            fill: textColor,
            fontSize,
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            opacity: 0.9,
          }}
        >
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0px">
            {repeatedTextString} <tspan fill={glowColor}>CHANAN CREATIVE PRACTICE</tspan>
          </textPath>
        </text>
      </svg>
    </div>
  );
}
