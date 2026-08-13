import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSystemInteractive() {
  const spotlightRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    const container = containerRef.current;
    if (!spotlight || !container) return;

    const features = container.querySelectorAll('.feature');
    const featureBgs = container.querySelectorAll('.feature-bg');

    const featureStartPositions = [
      { top: 25, left: 15 },
      { top: 12.5, left: 50 },
      { top: 22.5, left: 75 },
      { top: 30, left: 82.5 },
      { top: 50, left: 20 },
      { top: 80, left: 20 },
      { top: 75, left: 75 },
    ];

    features.forEach((feature, index) => {
      const pos = featureStartPositions[index];
      if (pos) {
        gsap.set(feature, {
          top: `${pos.top}%`,
          left: `${pos.left}%`,
        });
      }
    });

    const featureStartDimensions = [];
    featureBgs.forEach((bg) => {
      const rect = bg.getBoundingClientRect();
      featureStartDimensions.push({
        width: rect.width || 120,
        height: rect.height || 40,
      });
    });

    const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const targetWidth = 3 * remInPixels;
    const targetHeight = 3 * remInPixels;

    const getSearchBarFinalWidth = () => (window.innerWidth < 1000 ? 20 : 25);
    let searchBarFinalWidth = getSearchBarFinalWidth();

    const handleResize = () => {
      searchBarFinalWidth = getSearchBarFinalWidth();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    const st = ScrollTrigger.create({
      trigger: spotlight,
      start: 'top top',
      end: () => `+=${window.innerHeight * 3.2}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // 1. Spotlight content slide up
        if (progress <= 0.3333) {
          gsap.set(container.querySelector('.spotlight-content'), {
            y: `${-100 * (progress / 0.3333)}%`,
          });
        } else {
          gsap.set(container.querySelector('.spotlight-content'), { y: '-100%' });
        }

        // 2. Feature tags converge to center & morph into search bar
        if (progress <= 0.5) {
          const featureProgress = progress / 0.5;

          features.forEach((feature, index) => {
            const original = featureStartPositions[index];
            if (original) {
              gsap.set(feature, {
                top: `${original.top + (50 - original.top) * featureProgress}%`,
                left: `${original.left + (50 - original.left) * featureProgress}%`,
              });
            }
          });

          featureBgs.forEach((bg, index) => {
            const start = featureStartDimensions[index] || { width: 120, height: 40 };
            gsap.set(bg, {
              width: `${start.width + (targetWidth - start.width) * featureProgress}px`,
              height: `${start.height + (targetHeight - start.height) * featureProgress}px`,
              borderRadius: `${0.5 + (25 - 0.5) * featureProgress}rem`,
              borderWidth: `${0.125 + (0.35 - 0.125) * featureProgress}rem`,
            });
          });

          if (progress <= 0.1) {
            gsap.set(container.querySelectorAll('.feature-content'), {
              opacity: 1 - progress / 0.1,
            });
          } else {
            gsap.set(container.querySelectorAll('.feature-content'), { opacity: 0 });
          }
        }

        gsap.set(container.querySelector('.features'), {
          opacity: progress >= 0.5 ? 0 : 1,
        });

        gsap.set(container.querySelector('.search-bar'), {
          opacity: progress >= 0.5 ? 1 : 0,
        });

        // 3. Search bar expands into full search input pill
        if (progress >= 0.5 && progress <= 0.75) {
          const p = (progress - 0.5) / 0.25;

          gsap.set(container.querySelector('.search-bar'), {
            width: `${3 + (searchBarFinalWidth - 3) * p}rem`,
            height: `${3 + (5 - 3) * p}rem`,
            transform: `translate(-50%, ${-50 + 250 * p}%)`,
          });

          gsap.set(container.querySelector('.search-bar p'), { opacity: 0 });
        } else if (progress > 0.75) {
          gsap.set(container.querySelector('.search-bar'), {
            width: `${searchBarFinalWidth}rem`,
            height: '5rem',
            transform: 'translate(-50%, 200%)',
          });
        }

        // 4. Header content & search text reveal
        if (progress >= 0.75) {
          const p = (progress - 0.75) / 0.25;

          gsap.set(container.querySelector('.search-bar p'), { opacity: p });

          gsap.set(container.querySelector('.header-content'), {
            y: -50 + 50 * p,
            opacity: p,
          });
        } else {
          gsap.set(container.querySelector('.search-bar p'), { opacity: 0 });
          gsap.set(container.querySelector('.header-content'), {
            y: -50,
            opacity: 0,
          });
        }
      },
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      st.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="footer-system-interactive-root">
      {/* Intro Header Section */}
      <section className="intro">
        <h1>Where systems move with intention</h1>
      </section>

      {/* Spotlight Pinned Section */}
      <section ref={spotlightRef} className="spotlight">
        <div className="spotlight-content">
          <div className="spotlight-bg">
            <img src="/img/mesh.png" alt="Mesh background gradient" />
          </div>

          <h1>Information flows best through intentional design</h1>
        </div>

        <div className="header">
          <div className="header-content">
            <h1>Find what matters through intelligent design</h1>
            <p>
              Discover a system that adapts to the way you think, not the other way around.
            </p>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-bg"></div>
            <div className="feature-content">
              <p>Flow</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-bg"></div>
            <div className="feature-content">
              <p>Knowledge Grid</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-bg"></div>
            <div className="feature-content">
              <p>Relay</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-bg"></div>
            <div className="feature-content">
              <p>Adaptive Layer</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-bg"></div>
            <div className="feature-content">
              <p>Signal</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-bg"></div>
            <div className="feature-content">
              <p>System Design</p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-bg"></div>
            <div className="feature-content">
              <p>Archive</p>
            </div>
          </div>
        </div>

        <div className="search-bar">
          <p>Find the unseen link</p>
        </div>
      </section>

      {/* Outro Section */}
      <section className="outro">
        <h1>( System complete )</h1>
      </section>

      {/* ── 1:1 CSS Styles from style.css ── */}
      <style>{`
        .footer-system-interactive-root {
          --base-100: #ffffff;
          --base-200: #333333;
          --base-300: #262626;
          --base-400: #141414;
          --base-500: #0f0f0f;
          background-color: var(--base-500);
          color: var(--base-100);
          font-family: "Instrument Serif", "Cormorant Garamond", serif;
          width: 100%;
          position: relative;
          z-index: 5;
          overflow: hidden;
        }

        .footer-system-interactive-root img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .footer-system-interactive-root h1 {
          text-align: center;
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 500;
          line-height: 0.9;
          font-family: "Instrument Serif", "Cormorant Garamond", serif;
          color: #ffffff;
        }

        .footer-system-interactive-root p {
          font-family: "Manrope", "Plus Jakarta Sans", sans-serif;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.5;
        }

        .footer-system-interactive-root section {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .footer-system-interactive-root .intro,
        .footer-system-interactive-root .outro {
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #0f0f0f;
        }

        .footer-system-interactive-root .intro h1,
        .footer-system-interactive-root .outro h1 {
          width: 50%;
        }

        .footer-system-interactive-root .spotlight-content,
        .footer-system-interactive-root .header {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          will-change: transform;
        }

        .footer-system-interactive-root .spotlight-bg {
          position: absolute;
          transform: scale(0.8);
          opacity: 0.25;
        }

        .footer-system-interactive-root .spotlight-content h1 {
          width: 45%;
        }

        .footer-system-interactive-root .header-content {
          width: 60%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2rem;
          will-change: transform, opacity;
          transform: translateY(-100px);
          opacity: 0;
        }

        .footer-system-interactive-root .feature {
          position: absolute;
          width: max-content;
          height: max-content;
          padding: 1rem 1.5rem;
          transform: translate(-50%, -50%);
          will-change: top, left;
          z-index: 3;
        }

        .footer-system-interactive-root .feature-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background-color: var(--base-400);
          border: 0.125rem solid var(--base-300);
          border-radius: 0.5rem;
          will-change: width, height, border-radius, border-width;
        }

        .footer-system-interactive-root .feature-content {
          position: relative;
          will-change: opacity;
        }

        .footer-system-interactive-root .feature-content p {
          text-transform: uppercase;
          font-family: "DM Mono", monospace;
          font-weight: 400;
          font-size: 0.85rem;
          line-height: 1;
          color: #c4d600;
        }

        .footer-system-interactive-root .search-bar {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 3rem;
          height: 3rem;
          border-radius: 25rem;
          border: 0.35rem solid var(--base-300);
          background-color: var(--base-400);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1.5rem;
          will-change: opacity, width, height, transform;
          z-index: 4;
        }

        .footer-system-interactive-root .search-bar p {
          position: relative;
          opacity: 0;
          transform: translateX(0rem);
          will-change: opacity;
          color: #c4d600;
          font-family: "DM Mono", monospace;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        @media (max-width: 1000px) {
          .footer-system-interactive-root h1 {
            font-size: 2.5rem;
          }

          .footer-system-interactive-root .intro h1,
          .footer-system-interactive-root .outro h1,
          .footer-system-interactive-root .spotlight-content h1,
          .footer-system-interactive-root .header-content {
            width: 100%;
            padding: 2rem;
          }

          .footer-system-interactive-root .spotlight-bg {
            transform: scale(2);
          }

          .footer-system-interactive-root .feature {
            padding: 0.75rem 1rem;
          }

          .footer-system-interactive-root .feature-content p {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}
