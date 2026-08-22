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

      // 1. Letters appear in initial center-shifted positions
      tl.from('.awwwards-letter', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.12,
      })
        // 2. Letters move to corners, starting 1.5s into timeline
        .to(
          '.awwwards-top-left, .awwwards-top-right',
          {
            top: '2.5rem',
            duration: 1.8,
            ease: 'power3.inOut',
          },
          1.5
        )
        .to(
          '.awwwards-bottom-right',
          {
            bottom: '2.5rem',
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        .to(
          '.awwwards-top-left',
          {
            left: '3rem',
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        .to(
          '.awwwards-top-right',
          {
            right: '3rem',
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '<'
        )
        .to(
          '.awwwards-bottom-right',
          {
            right: '3rem',
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
        // 4. Hero copy & interactive cues fade in
        .from(
          '.awwwards-copy',
          {
            opacity: 0,
            y: 20,
            duration: 1.2,
            ease: 'power2.out',
          },
          3.5
        )
        .from(
          '.awwwards-center-brand, .hero-corner-3d-enclosure, .awwwards-scroll-hint',
          {
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
          },
          3.8
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
        className="awwwards-hero-video"
      >
        <source
          src="https://videos.pexels.com/video-files/3403228/3403228-uhd_2732_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Hero Ambient Video Overlay Tint */}
      <div className="awwwards-video-tint" />

      <div className="awwwards-wrapper">
        {/* Ambient Top Copy Metadata */}
        <div className="awwwards-copy">
          <p>
            LDN 51.5°, <br /> NYC 40.7°
          </p>
          <p>
            ENTER <br /> UNIVERSE®
          </p>
        </div>

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
            alt="Chanan"
            className="awwwards-brand-logo-svg"
          />
          <p className="awwwards-brand-subtitle">An archive of the unreal</p>
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
          background: #0002b5;
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
            rgba(0, 2, 181, 0.25) 0%,
            rgba(2, 11, 77, 0.65) 100%
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

        .awwwards-copy {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #dbe7ff;
          text-transform: uppercase;
          font-size: clamp(0.75rem, 1.2vw, 1.1rem);
          letter-spacing: 0.12em;
          font-weight: 600;
          z-index: 4;
          padding: 0 5vw;
          box-sizing: border-box;
          pointer-events: none;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8);
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
          background: #0002b5;
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
          text-shadow: 0 4px 25px rgba(0, 2, 181, 0.5);
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
        }

        .awwwards-brand-logo-svg {
          max-width: min(85vw, 680px);
          max-height: 32vh;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 4px 30px rgba(0, 0, 0, 0.7));
          user-select: none;
        }

        .awwwards-brand-subtitle {
          font-family: "Cormorant Garamond", "Garamond", serif;
          font-size: clamp(1.2rem, 2.4vw, 2.4rem);
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.04em;
          color: #fff8ed;
          margin: 0.75rem 0 0 0;
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
            font-size: clamp(3rem, 12vw, 4.5rem);
          }

          .awwwards-top-left {
            top: 1.5rem !important;
            left: 1.5rem !important;
          }

          .awwwards-top-right {
            top: 1.5rem !important;
            right: 1.5rem !important;
          }

          .awwwards-bottom-right {
            bottom: 1.5rem !important;
            right: 1.5rem !important;
          }

          .awwwards-copy {
            font-size: 0.75rem;
            flex-direction: column;
            gap: 1rem;
            top: 40%;
          }

          .awwwards-brand-logo-svg {
            max-width: 82vw;
            max-height: 22vh;
          }
        }
      `}</style>
    </section>
  );
}
