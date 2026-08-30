import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniDesktopEnclosure from './MiniDesktopEnclosure';
import { useTransitionNavigate } from './TransitionProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenInquiry }) {
  const router = useRouter();
  const transitionTo = useTransitionNavigate();
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const handleEnclosureClick = () => {
    try {
      transitionTo('/chanan-one');
    } catch {
      router.push('/chanan-one');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
      const cornerOffset = isMobile ? '1.25rem' : '2.5rem';
      const cornerSideOffset = isMobile ? '1.25rem' : '3rem';

      // 1. Letters appear in initial center-shifted positions
      tl.from('.awwwards-letter', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.12,
      })
        // 2. Letters move from center to corners, starting 1.5s into timeline
        .to(
          '.awwwards-top-left, .awwwards-top-right',
          {
            top: cornerOffset,
            duration: 1.8,
            ease: 'power3.inOut',
          },
          1.5
        )
        .to(
          '.awwwards-bottom-right',
          {
            bottom: cornerOffset,
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        .to(
          '.awwwards-top-left',
          {
            left: cornerSideOffset,
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        .to(
          '.awwwards-top-right',
          {
            right: cornerSideOffset,
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        .to(
          '.awwwards-bottom-right',
          {
            right: cornerSideOffset,
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        // 3. Blue split curtain blocks slide away, revealing video underneath
        .to(
          '.awwwards-block-left',
          {
            left: '-50%',
            duration: 1.8,
            ease: 'power3.inOut',
          },
          3.2
        )
        .to(
          '.awwwards-block-right',
          {
            right: '-50%',
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        // 4. Hero brand & interactive cues fade in
        .from(
          '.awwwards-center-brand, .hero-corner-3d-enclosure, .awwwards-scroll-hint',
          {
            opacity: 0,
            scale: 0.95,
            duration: 1.3,
            stagger: 0.15,
            ease: 'power3.out',
          },
          3.4
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="awwwards-hero-container">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        loop
        poster="/og-chanan.webp"
        preload="metadata"
        className="awwwards-hero-video"
      >
        <source
          src="/hero-bg.mp4"
          type="video/mp4"
        />
      </video>

      {/* Hero Ambient Video Overlay Tint */}
      <div className="awwwards-video-tint" />

      <div className="awwwards-wrapper">
        {/* Split Opening Curtain Blocks (Rich Blue) */}
        <div className="awwwards-blocks">
          <div className="awwwards-block awwwards-block-left" />
          <div className="awwwards-block awwwards-block-right" />
        </div>

        {/* Kinetic Corner Letters (Light Blue) */}
        <div className="awwwards-letters">
          <div className="awwwards-row">
            <div className="awwwards-letter awwwards-top-left">C</div>
            <div className="awwwards-letter awwwards-top-right">H</div>
          </div>
          <div className="awwwards-row">
            <div className="awwwards-letter awwwards-bottom-right">01</div>
          </div>
        </div>

        {/* Center Hero Brand Reveal with SVG Logo */}
        <div className="awwwards-center-brand">
          <img
            src="/hero-logo.svg"
            alt="Made by Chanan"
            className="awwwards-brand-logo-svg"
          />
          <p className="awwwards-brand-subtitle">Made by Chanan · An archive of the unreal</p>
        </div>

        {/* Bottom Left Corner 3D Enclosure Portal */}
        <div
          className="hero-corner-3d-enclosure"
          onClick={handleEnclosureClick}
          role="button"
          tabIndex={0}
          aria-label="Explore Chanan One"
        >
          <MiniDesktopEnclosure onClick={handleEnclosureClick} />
          <div className="hero-3d-hint-pill">
            <span>CHANAN ONE</span>
            <span className="hero-3d-hint-arrow">↗</span>
          </div>
        </div>

        {/* Bottom Scroll Explore Cue */}
        <div className="awwwards-scroll-hint">
          <span className="awwwards-scroll-text">SCROLL TO EXPLORE ↓</span>
        </div>
      </div>

      <style jsx>{`
        .awwwards-hero-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #000000;
          font-family: var(--font-heading, "Outfit", sans-serif);
        }

        .awwwards-hero-video {
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .awwwards-video-tint {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(0, 0, 0, 0.25) 0%,
            rgba(10, 10, 10, 0.65) 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        .awwwards-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          z-index: 5;
        }

        .awwwards-blocks {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100vh;
          z-index: 10;
          pointer-events: none;
        }

        .awwwards-block {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100vh;
          background: #000000;
        }

        .awwwards-block-left {
          left: 0;
        }

        .awwwards-block-right {
          right: 0;
        }

        .awwwards-letters {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100vh;
          z-index: 20;
          pointer-events: none;
        }

        .awwwards-letter {
          position: absolute;
          font-family: var(--font-heading, "Outfit", sans-serif);
          font-size: clamp(4rem, 10vw, 10rem);
          font-weight: 900;
          color: #bfd7ff;
          line-height: 1;
          user-select: none;
          z-index: 30;
          letter-spacing: -0.04em;
          text-shadow: 0 4px 25px rgba(0, 0, 0, 0.5);
        }

        .awwwards-row {
          width: 100%;
          height: 50vh;
          position: relative;
        }

        .awwwards-top-left {
          top: 32%;
          left: 42%;
        }

        .awwwards-top-right {
          top: 32%;
          right: 42%;
        }

        .awwwards-bottom-right {
          bottom: 32%;
          right: 42%;
        }

        .awwwards-center-brand {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 6;
          pointer-events: none;
          width: 100%;
          max-width: 1200px;
          padding: 0 1.5rem;
          box-sizing: border-box;
        }

        .awwwards-brand-logo-svg {
          width: clamp(480px, 64vw, 1000px);
          max-height: 52vh;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 40px rgba(0, 0, 0, 0.85));
          user-select: none;
        }

        .awwwards-brand-subtitle {
          font-family: "Cormorant Garamond", "Garamond", serif;
          font-size: clamp(1.3rem, 2.6vw, 2.6rem);
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.04em;
          color: #fff8ed;
          margin: 0.5rem 0 0 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
        }

        .awwwards-scroll-hint {
          position: absolute;
          bottom: 2.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          pointer-events: none;
        }

        .awwwards-scroll-text {
          font-family: var(--font-heading, "Outfit", sans-serif);
          font-size: clamp(0.7rem, 0.9vw, 0.85rem);
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffffff;
          opacity: 0.9;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        @media (max-width: 900px) {
          .awwwards-letter {
            font-size: clamp(3.2rem, 13vw, 4.8rem);
          }

          .awwwards-top-left {
            top: 36%;
            left: 36%;
          }

          .awwwards-top-right {
            top: 36%;
            right: 36%;
          }

          .awwwards-bottom-right {
            bottom: 36%;
            right: 36%;
          }

          .awwwards-brand-logo-svg {
            width: clamp(320px, 88vw, 560px);
            max-height: 42vh;
          }

          .awwwards-brand-subtitle {
            font-size: clamp(1.1rem, 4.2vw, 1.4rem);
          }
        }
      `}</style>
    </section>
  );
}
