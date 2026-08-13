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
            height: `${3 + (4.5 - 3) * p}rem`,
            top: `${50 + 18 * p}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          });

          gsap.set(container.querySelector('.search-bar p'), { opacity: 0 });
        } else if (progress > 0.75) {
          gsap.set(container.querySelector('.search-bar'), {
            width: `${searchBarFinalWidth}rem`,
            height: '4.5rem',
            top: '68%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          });
        }

        // 4. Header content & search text reveal
        if (progress >= 0.75) {
          const p = (progress - 0.75) / 0.25;

          gsap.set(container.querySelector('.search-bar p'), { opacity: p });

          gsap.set(container.querySelector('.header-content'), {
            y: -60 + 10 * p,
            x: -35 * p,
            opacity: p,
          });
        } else {
          gsap.set(container.querySelector('.search-bar p'), { opacity: 0 });
          gsap.set(container.querySelector('.header-content'), {
            y: -60,
            x: 0,
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
          --base-100: #0f0f0f;
          --base-200: #e8e6df;
          --base-300: rgba(0, 0, 0, 0.15);
          --base-400: rgba(0, 0, 0, 0.05);
          --base-500: var(--bg-cream, #f4f3ef);
          background-color: var(--bg-cream, #f4f3ef);
          color: #0f0f0f;
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
          color: #0f0f0f;
        }

        .footer-system-interactive-root p {
          font-family: "Manrope", "Plus Jakarta Sans", sans-serif;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.5;
          color: #52525b;
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
          background-color: var(--bg-cream, #f4f3ef);
        }

        .footer-system-interactive-root .intro h1,
        .footer-system-interactive-root .outro h1 {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
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
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-system-interactive-root .header-content {
          width: 100%;
          max-width: 850px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1.25rem;
          will-change: transform, opacity;
          opacity: 0;
        }

        .footer-system-interactive-root .header-content h1 {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          font-size: clamp(2.2rem, 4.5vw, 4.2rem);
          line-height: 1.05;
        }

        .footer-system-interactive-root .header-content p {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          font-size: clamp(0.95rem, 1.2vw, 1.15rem);
          line-height: 1.5;
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
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.85) 0%,
            rgba(244, 243, 239, 0.75) 50%,
            rgba(255, 255, 255, 0.9) 100%
          );
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(0, 0, 0, 0.12);
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.9),
            0 8px 24px rgba(0, 0, 0, 0.06);
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
          font-weight: 500;
          font-size: 0.85rem;
          line-height: 1;
          color: #0f0f0f;
        }

        .footer-system-interactive-root .search-bar {
          position: absolute;
          top: 68%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 0 auto;
          width: 3rem;
          height: 3rem;
          border-radius: 25rem;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(244, 243, 239, 0.82) 45%,
            rgba(255, 255, 255, 0.95) 100%
          );
          backdrop-filter: blur(28px) saturate(200%);
          -webkit-backdrop-filter: blur(28px) saturate(200%);
          border: 1.5px solid rgba(0, 0, 0, 0.18);
          box-shadow:
            inset 0 1.5px 3px rgba(255, 255, 255, 0.95),
            0 16px 40px rgba(0, 0, 0, 0.08);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1.5rem;
          will-change: opacity, width, height, transform;
          z-index: 4;
          overflow: hidden;
        }

        .footer-system-interactive-root .search-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 45%,
            rgba(255, 255, 255, 0.65) 50%,
            rgba(255, 255, 255, 0.35) 55%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: liquidGlassSheen 4.5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes liquidGlassSheen {
          0% { transform: translateX(-120%); }
          30%, 100% { transform: translateX(120%); }
        }

        .footer-system-interactive-root .search-bar p {
          position: relative;
          opacity: 0;
          transform: translateX(0rem);
          will-change: opacity;
          color: #0f0f0f;
          font-family: "DM Mono", monospace;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          z-index: 2;
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
