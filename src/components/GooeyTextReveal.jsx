import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GooeyFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: -1
      }}
    >
      <defs>
        <filter id="blur-matrix" x="-50%" y="-50%" width="200%" height="200%">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function AnimatedGooeyText({ children, mode = 'scroll', delay = 0, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Wrap words/lines into gooey spans if not already wrapped
    const textNodes = Array.from(el.querySelectorAll('.gooey-target'));
    const targets = textNodes.length > 0 ? textNodes : [el];

    const innerElements = [];

    targets.forEach((target) => {
      if (target.dataset.gooeyProcessed) return;
      target.dataset.gooeyProcessed = 'true';

      const originalText = target.innerText;
      const lines = originalText.split('\n').filter(Boolean);

      target.innerHTML = '';
      lines.forEach((lineText) => {
        const lineSpan = document.createElement('span');
        lineSpan.className = 'gooey-line';
        lineSpan.style.display = 'block';
        lineSpan.style.filter = 'url(#blur-matrix) blur(0.4px)';
        lineSpan.style.webkitFilter = 'url(#blur-matrix) blur(0.4px)';
        lineSpan.style.willChange = 'filter';

        const innerSpan = document.createElement('span');
        innerSpan.className = 'gooey-line-inner';
        innerSpan.style.display = 'inline-block';
        innerSpan.style.willChange = 'filter';
        innerSpan.textContent = lineText;

        lineSpan.appendChild(innerSpan);
        target.appendChild(lineSpan);
        innerElements.push(innerSpan);
      });
    });

    if (innerElements.length === 0) return;

    gsap.set(innerElements, { filter: 'blur(0.35em)', webkitFilter: 'blur(0.35em)' });

    let st;
    if (mode === 'scrub') {
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const blurVal = (0.35 * (1 - progress)).toFixed(3);
          gsap.set(innerElements, {
            filter: `blur(${blurVal}em)`,
            webkitFilter: `blur(${blurVal}em)`
          });
        }
      });
    } else {
      gsap.to(innerElements, {
        filter: 'blur(0em)',
        webkitFilter: 'blur(0em)',
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.12,
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true
        }
      });
    }

    return () => {
      if (st) st.kill();
    };
  }, [mode, delay]);

  return (
    <div ref={containerRef} className={`gooey-text-wrapper ${className}`}>
      {children}
    </div>
  );
}
