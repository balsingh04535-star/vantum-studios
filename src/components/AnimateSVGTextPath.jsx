import React, { useEffect, useRef, useState } from 'react';

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
  textColor = "#0f0f0f",
  glowColor = "#829100",
  idPrefix = "path1",
  repeatCount = 4,
}) {
  const svgRef = useRef(null);
  const textPathRef = useRef(null);
  const blurFilterRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      return mapVal(positionY - currentScroll, winHeight, -winHeight * 0.5, pathLength * 0.4, -pathLength * 0.5);
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

      const currentScroll = window.pageYOffset;
      scrollVal = !entered ? currentScroll : lerp(scrollVal, currentScroll, 0.15);
      const distance = Math.abs(scrollVal - currentScroll);

      if (blurFilterRef.current) {
        const blurAmount = clamp(mapVal(distance, 0, 300, 0, 6), 0, 6);
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
  }, [isMobile]);

  const pathId = `svg-curve-${idPrefix}`;
  const filterId = `svg-filter-${idPrefix}`;

  // Mobile specific path and viewBox so text is 100% sharp and readable
  const activeViewBox = isMobile ? "0 0 800 140" : viewBox;
  const activePathD = isMobile ? "M -100 70 Q 200 130 500 70 Q 800 10 1100 70" : pathD;
  const activeFontSize = isMobile ? "1.6rem" : fontSize;

  const repeatedTextString = Array.from({ length: isMobile ? 3 : repeatCount })
    .map(() => `${text} · `)
    .join('');

  return (
    <div style={{ width: '100%', overflow: 'hidden', margin: isMobile ? '1.5rem 0' : '3rem 0', position: 'relative', zIndex: 3 }}>
      <svg
        ref={svgRef}
        width="100%"
        height={isMobile ? "100px" : "220px"}
        viewBox={activeViewBox}
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

        <path id={pathId} d={activePathD} fill="none" stroke="none" />

        <text
          filter={`url(#${filterId})`}
          style={{
            fill: textColor,
            fontSize: activeFontSize,
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            opacity: 0.95,
          }}
        >
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0px">
            {repeatedTextString} <tspan fill={glowColor}>VANTUM</tspan>
          </textPath>
        </text>
      </svg>
    </div>
  );
}
