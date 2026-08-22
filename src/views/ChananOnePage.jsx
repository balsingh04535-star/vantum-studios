import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Lenis from 'lenis';
import { ArrowUpRight } from 'lucide-react';
import ChananOneStudio3D from '../components/ChananOneStudio3D';
import FaultyTerminalBackground from '../components/FaultyTerminalBackground';

export default function ChananOnePage({ onOpenInquiry }) {
  const parallaxImgRef = useRef(null);
  const sectionRef = useRef(null);
  const footerRef = useRef(null);
  const scrollBodyRef = useRef(null);

  useEffect(() => {
    let lenis;
    let rafId;

    try {
      lenis = new Lenis({
        duration: 1.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
        infinite: false,
        syncTouch: true,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      const handleAnchorClick = (e) => {
        const targetAttr = e.currentTarget.getAttribute('data-target') || e.currentTarget.getAttribute('href');
        if (targetAttr && targetAttr.startsWith('#')) {
          const targetEl = document.querySelector(targetAttr);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: 0, duration: 1.8 });
          }
        }
      };

      const anchors = document.querySelectorAll('.chanan-nav-item, .chanan-bottom-left, a[href^="#"]');
      anchors.forEach((el) => el.addEventListener('click', handleAnchorClick));

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        anchors.forEach((el) => el.removeEventListener('click', handleAnchorClick));
        if (lenis) lenis.destroy();
      };
    } catch (err) {
      console.warn('Lenis init error:', err);
    }
  }, []);

  // Parallax scroll effect for Section 03 image
  useEffect(() => {
    const section = sectionRef.current;
    const img = parallaxImgRef.current;
    if (!section || !img) return;

    let currentY = 0;
    let targetY = 0;
    let rafId;

    const TRAVEL = 280;
    const LERP = 0.055;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);
      targetY = (clamped - 0.5) * -TRAVEL;
    }

    function tick() {
      currentY = lerp(currentY, targetY, LERP);
      img.style.transform = `scale(1.22) translateY(${currentY}px)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Footer rising sheet effect — slides up from 100% as scroll body ends
  useEffect(() => {
    const footer = footerRef.current;
    const scrollBody = scrollBodyRef.current;
    if (!footer || !scrollBody) return;

    let currentY = 100;
    let targetY = 100;
    let rafId;
    const LERP = 0.07;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function onScroll() {
      const bodyRect = scrollBody.getBoundingClientRect();
      const viewH = window.innerHeight;
      // How far the bottom of the scroll body has travelled above the bottom of the viewport
      // When bodyRect.bottom === viewH → bottom of content just hit viewport bottom → start rising
      // When bodyRect.bottom === 0 → content fully scrolled away → footer fully up
      const raw = 1 - (bodyRect.bottom / viewH);
      const progress = Math.min(Math.max(raw, 0), 1);
      targetY = (1 - progress) * 100; // 100% → 0% translateY
    }

    function tick() {
      currentY = lerp(currentY, targetY, LERP);
      footer.style.transform = `translateY(${currentY}%)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Chanan One — Light, Engineered.</title>
        <meta
          name="description"
          content="A compact creative computer. Anodized aluminum desktop enclosure, silent acoustic design, high-performance WebGL engineering."
        />
      </Head>
      <div className="chanan-one-root">
        {/* Top Navigation Bar */}
        <header className="chanan-one-nav">
          <Link href="/" className="chanan-one-logo" aria-label="Chanan Home">
            <span className="chanan-wordmark">Chanan</span>
          </Link>

          <nav className="chanan-one-links">
            <a href="#overview" className="chanan-nav-item active">OVERVIEW</a>
            <a href="#design" className="chanan-nav-item">DESIGN</a>
            <a href="#performance" className="chanan-nav-item">PERFORMANCE</a>
            <a href="#specs" className="chanan-nav-item">SPECS</a>
          </nav>

          <div className="chanan-one-actions">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="chanan-reserve-btn"
            >
              RESERVE
            </button>
          </div>
        </header>

        {/* Scrollable body — sits above the footer sheet */}
        <div className="chanan-scroll-body" ref={scrollBodyRef}>

        {/* Hero Section */}
        <section className="chanan-one-hero-wrapper">
          <main className="chanan-one-hero">
            {/* Left Text Block */}
            <div className="chanan-hero-left">
              <p className="chanan-eyebrow">A COMPACT CREATIVE COMPUTER</p>
              
              <h1 className="chanan-headline">
                <span className="block">LIGHT,</span>
                <span className="headline-bottom-row">
                  ENGINEERED.
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="chanan-arrow-circle"
                    aria-label="Reserve Chanan One"
                  >
                    <ArrowUpRight size={20} strokeWidth={2.6} />
                  </button>
                </span>
              </h1>
            </div>

            {/* Center-Right 3D Interactive Showcase */}
            <div className="chanan-hero-3d-wrapper">
              <div className="chanan-3d-container">
                <ChananOneStudio3D interactive={true} />
              </div>
            </div>

            {/* Bottom Left Discover Link */}
            <a href="#design" className="chanan-bottom-left" aria-label="Scroll to discover">
              <span className="discover-label">SCROLL TO DISCOVER</span>
              <span className="discover-line" />
            </a>

            {/* Bottom Right Metadata Card 1:1 from Reference */}
            <div className="chanan-bottom-right">
              <div className="chanan-meta-box">
                <span className="meta-title">CHANAN ONE</span>
                <span className="meta-number">01 / 04</span>
                <span className="meta-tagline">SILENT. FAST. YOURS.</span>
              </div>
            </div>
          </main>
        </section>

        {/* Section 02: Engineered From The Inside (Split Video Left & Content Right) */}
        <section id="design" className="chanan-story-section">
          <div className="chanan-story-grid">
            {/* Left: Exploded 3D Looping Video */}
            <div className="chanan-story-left">
              <div className="chanan-story-video-box">
                <iframe
                  src="https://customer-kmnd5g96l0xhc4t0.cloudflarestream.com/1816cfcda83302a131b2ed41e964c2bc/iframe?autoplay=true&muted=true&loop=true&controls=false&preload=true&poster=https%3A%2F%2Fcustomer-kmnd5g96l0xhc4t0.cloudflarestream.com%2F1816cfcda83302a131b2ed41e964c2bc%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                  loading="lazy"
                  style={{
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    borderRadius: '32px',
                    pointerEvents: 'none',
                    objectFit: 'cover',
                  }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen={true}
                />
                <div className="chanan-story-video-vignette" />
              </div>
            </div>

            {/* Right: Editorial Typography & Actions */}
            <div className="chanan-story-right">
              <span className="chanan-story-eyebrow">02 / ENGINEERED FROM THE INSIDE</span>
              
              <h2 className="chanan-story-title">
                <span>LESS</span>
                <span>MACHINE.</span>
                <span>MORE</span>
                <span>MOMENTUM.</span>
              </h2>

              <p className="chanan-story-desc">
                A whole creative studio, condensed into one quiet piece of hardware.
              </p>

              <div className="chanan-story-actions">
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="chanan-story-btn"
                >
                  SEE HOW IT WORKS
                </button>
                
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="chanan-story-arrow"
                  aria-label="See how it works"
                >
                  <ArrowUpRight size={18} strokeWidth={2.6} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom 3-Column Feature Tabs Bar */}
          <div className="chanan-story-bottom-bar">
            <div className="story-feature-item">
              <span className="feature-num">01</span>
              <span className="feature-title">CREATIVE ENGINE</span>
            </div>
            <div className="story-feature-item">
              <span className="feature-num">02</span>
              <span className="feature-title">SILENT BY DESIGN</span>
            </div>
            <div className="story-feature-item">
              <span className="feature-num">03</span>
              <span className="feature-title">EVERY PORT, READY</span>
            </div>
          </div>
        </section>

        {/* Section 03: One Machine. Every Medium. (ct.png Showcase with Faulty Terminal Background) */}
        <section id="performance" className="chanan-mediums-section" ref={sectionRef}>
          {/* WebGL Faulty Terminal Background Layer behind the image */}
          <div className="chanan-mediums-bg-layer">
            <FaultyTerminalBackground
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.5}
              pause={false}
              scanlineIntensity={0.35}
              glitchAmount={1}
              flickerAmount={0.8}
              noiseAmp={1}
              curvature={0.08}
              tint="#0055ff"
              bgColor="#f1eeea"
              mouseReact={true}
              mouseStrength={0.6}
              pageLoadAnimation={true}
              brightness={1.0}
            />
          </div>

          {/* Top-Left Headline & Subtitle matching reference */}
          <div className="chanan-mediums-header">
            <h2 className="chanan-mediums-title">
              <span>ONE MACHINE.</span>
              <span>EVERY MEDIUM.</span>
            </h2>
            <p className="chanan-mediums-subtitle">
              From first idea to final frame.
            </p>
          </div>

          <div className="chanan-mediums-container">
            <div className="chanan-mediums-card">
              <img
                ref={parallaxImgRef}
                src="/mediums_design.svg"
                alt="One Machine. Every Medium. - From first idea to final frame."
                className="chanan-mediums-img"
              />

              {/* Interactive Floating CTA */}
              <button
                type="button"
                onClick={onOpenInquiry}
                className="chanan-mediums-cta"
                aria-label="Explore Mediums"
              >
                <span className="mediums-cta-text">EXPLORE</span>
                <span className="mediums-cta-arrow">
                  <ArrowUpRight size={22} strokeWidth={2.8} />
                </span>
              </button>
            </div>
          </div>
        </section>
        </div>{/* end chanan-scroll-body */}

        {/* ── Footer: Rising Sheet ── */}
        <footer className="chanan-footer" ref={footerRef}>
          {/* Top content row */}
          <div className="chanan-footer-top">
            {/* Left: headline + subtitle + CTA */}
            <div className="chanan-footer-left">
              <h2 className="chanan-footer-headline">
                <span>YOUR NEXT IDEA</span>
                <span>STARTS HERE.</span>
              </h2>
              <p className="chanan-footer-sub">Small machine. Big possibilities.</p>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="chanan-footer-cta"
              >
                <span>MEET CHANAN</span>
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Right: 3D interactive product with glow */}
            <div className="chanan-footer-img-wrap">
              <div className="chanan-footer-glow" />
              <div className="chanan-footer-3d">
                <ChananOneStudio3D interactive={true} />
              </div>
            </div>
          </div>

          {/* Bottom nav bar */}
          <div className="chanan-footer-bottom">
            <nav className="chanan-footer-nav">
              <a href="#design" className="chanan-footer-link">DESIGN</a>
              <a href="#performance" className="chanan-footer-link">PERFORMANCE</a>
              <a href="#" className="chanan-footer-link">STORY</a>
              <a href="/contact" className="chanan-footer-link">CONTACT</a>
            </nav>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="chanan-footer-reserve-badge"
              aria-label="Reserve"
            >
              <ArrowUpRight size={20} strokeWidth={2.8} />
            </button>
          </div>

          {/* Oversized wordmark */}
          <div className="chanan-footer-wordmark" aria-hidden="true">
            Chanan
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .chanan-one-root {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          background-color: #08090e;
          position: relative;
          color: #111111;
          font-family: var(--font-main, 'Plus Jakarta Sans', -apple-system, sans-serif);
          box-sizing: border-box;
          padding-bottom: 100vh;
        }

        /* Scroll body — stacks above the sticky footer */
        .chanan-scroll-body {
          position: relative;
          z-index: 2;
        }

        .chanan-one-hero-wrapper {
          width: 100vw;
          min-height: 100vh;
          height: 100vh;
          overflow: hidden;
          background-color: #f1eeea;
          background-image: url('/bg.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        /* ── Top Header Navigation ── */
        .chanan-one-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.2rem 4vw 1rem 4vw;
          box-sizing: border-box;
        }

        .chanan-one-logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          color: #111111;
          transition: transform 0.2s ease;
        }

        .chanan-one-logo:hover {
          transform: scale(1.03);
        }

        .chanan-wordmark {
          font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
          font-size: 1.85rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #111111;
          line-height: 1;
        }

        .chanan-one-links {
          display: flex;
          align-items: center;
          gap: 2.75rem;
        }

        .chanan-nav-item {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #2b2b2b;
          text-decoration: none;
          transition: color 0.2s ease, opacity 0.2s ease;
          opacity: 0.85;
        }

        .chanan-nav-item:hover,
        .chanan-nav-item.active {
          opacity: 1;
          color: #000000;
        }

        .chanan-reserve-btn {
          background-color: #111111;
          color: #ffffff;
          border: none;
          padding: 0.65rem 1.6rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .chanan-reserve-btn:hover {
          background-color: #000000;
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }

        /* ── Hero Main Content ── */
        .chanan-one-hero {
          position: relative;
          width: 100%;
          flex: 1;
          display: flex;
          align-items: flex-end;
          padding: 0 4vw 6.5rem 4vw;
          box-sizing: border-box;
        }

        /* Left Hero Typography */
        .chanan-hero-left {
          position: relative;
          z-index: 20;
          max-width: 620px;
          margin-bottom: 1rem;
          pointer-events: auto;
        }

        .chanan-eyebrow {
          font-size: clamp(0.72rem, 0.95vw, 0.84rem);
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #222222;
          margin-bottom: 0.85rem;
        }

        .chanan-headline {
          font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(3.8rem, 7.2vw, 7.4rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.045em;
          color: #111111;
          margin: 0;
        }

        .headline-bottom-row {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .chanan-arrow-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(34px, 3.4vw, 44px);
          height: clamp(34px, 3.4vw, 44px);
          border-radius: 50%;
          background: linear-gradient(135deg, #f04e28 0%, #e03612 100%);
          color: #ffffff;
          border: none;
          cursor: pointer;
          margin-left: 0.25rem;
          vertical-align: middle;
          box-shadow: 0 6px 18px rgba(224, 54, 18, 0.45);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }

        .chanan-arrow-circle:hover {
          transform: translateY(-2px) scale(1.1);
          box-shadow: 0 10px 24px rgba(224, 54, 18, 0.6);
        }

        /* ── Right-Side 3D Showcase (Anchored to Right Side) ── */
        .chanan-hero-3d-wrapper {
          position: absolute;
          top: 42%;
          right: 2vw;
          transform: translateY(-50%);
          width: 58vw;
          height: 80vh;
          min-width: 550px;
          z-index: 15;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .chanan-3d-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* ── Bottom Left Discover Rule ── */
        .chanan-bottom-left {
          position: absolute;
          bottom: 2.5rem;
          left: 4vw;
          z-index: 30;
          display: inline-flex;
          align-items: center;
          gap: 1.25rem;
        }

        .discover-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2b2b2b;
        }

        .discover-line {
          width: 110px;
          height: 1px;
          background: rgba(0, 0, 0, 0.3);
          display: inline-block;
        }

        /* ── Bottom Right Meta Box ── */
        .chanan-bottom-right {
          position: absolute;
          bottom: 2.5rem;
          right: 4vw;
          z-index: 30;
        }

        .chanan-meta-box {
          border-left: 1.5px solid rgba(0, 0, 0, 0.25);
          padding-left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .meta-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #111111;
        }

        .meta-number {
          font-size: 0.70rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #666666;
        }

        .meta-tagline {
          font-size: 0.70rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1a1a1a;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .chanan-one-links {
            display: none;
          }

          .chanan-headline {
            font-size: clamp(2.8rem, 6.5vw, 4.5rem);
          }

          .chanan-hero-3d-wrapper {
            width: min(600px, 52vw);
            height: min(500px, 55vh);
          }
        }

        @media (max-width: 768px) {
          .chanan-one-hero {
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-top: 6rem;
          }

          .chanan-hero-left {
            margin-top: 0;
            max-width: 100%;
          }

          .chanan-headline {
            font-size: clamp(2.5rem, 9vw, 3.8rem);
          }

          .chanan-hero-3d-wrapper {
            position: relative;
            top: auto;
            right: auto;
            transform: none;
            width: 100%;
            height: 340px;
            margin-top: 1rem;
          }

          .chanan-bottom-left {
            bottom: 1.25rem;
          }

          .chanan-bottom-right {
            bottom: 1.25rem;
          }
        }

        /* ── Section 02: Split Video Left & Content Right ── */
        .chanan-story-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #000000;
          padding: 6rem 5vw 3rem 5vw;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #ffffff;
        }

        .chanan-story-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          align-items: center;
          gap: 5vw;
          width: 100%;
          max-width: 1440px;
          margin: auto auto;
          flex: 1;
        }

        .chanan-story-left {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chanan-story-video-box {
          position: relative;
          width: 100%;
          padding-top: 68%;
          overflow: hidden;
          border-radius: 32px;
          background: #000000;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
          -webkit-mask-image: radial-gradient(
            ellipse 88% 85% at 50% 50%,
            #000000 50%,
            rgba(0, 0, 0, 0.85) 75%,
            rgba(0, 0, 0, 0.3) 90%,
            transparent 100%
          );
          mask-image: radial-gradient(
            ellipse 88% 85% at 50% 50%,
            #000000 50%,
            rgba(0, 0, 0, 0.85) 75%,
            rgba(0, 0, 0, 0.3) 90%,
            transparent 100%
          );
        }

        .chanan-story-video-vignette {
          position: absolute;
          inset: 0;
          border-radius: 32px;
          pointer-events: none;
          z-index: 2;
          background: radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 75%,
            #000000 100%
          );
          box-shadow: inset 0 0 50px 25px #000000;
        }

        .chanan-story-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 540px;
        }

        .chanan-story-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #848a96;
          margin-bottom: 1.6rem;
          display: block;
        }

        .chanan-story-title {
          font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(3rem, 5.2vw, 5.5rem);
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: -0.04em;
          color: #f4eee6;
          display: flex;
          flex-direction: column;
          gap: 0;
          margin: 0 0 2rem 0;
        }

        .chanan-story-desc {
          font-size: clamp(1rem, 1.3vw, 1.25rem);
          font-weight: 400;
          line-height: 1.5;
          color: #8e94a0;
          max-width: 480px;
          margin: 0 0 2.5rem 0;
        }

        .chanan-story-actions {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chanan-story-btn {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chanan-story-btn:hover {
          border-color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .chanan-story-arrow {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f04e28 0%, #e03612 100%);
          color: #ffffff;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(224, 54, 18, 0.5);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }

        .chanan-story-arrow:hover {
          transform: translateY(-2px) scale(1.08);
          box-shadow: 0 8px 24px rgba(224, 54, 18, 0.7);
        }

        /* ── Bottom Feature Bar ── */
        .chanan-story-bottom-bar {
          width: 100%;
          max-width: 1440px;
          margin: 4rem auto 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding-top: 1.5rem;
        }

        .story-feature-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.5rem 1rem;
        }

        .story-feature-item:last-child {
          border-right: none;
        }

        .feature-num {
          font-size: 0.78rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.1em;
        }

        .feature-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a4abb8;
        }

        @media (max-width: 1024px) {
          .chanan-story-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .chanan-story-right {
            max-width: 100%;
          }

          .chanan-story-bottom-bar {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .story-feature-item {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 1rem;
          }
        }

        /* ── Section 03: One Machine. Every Medium. ── */
        .chanan-mediums-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-color: #f1eeea;
          padding: 0;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .chanan-mediums-bg-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          opacity: 1;
        }

        .chanan-mediums-header {
          position: absolute;
          top: 8vh;
          left: 5.5vw;
          z-index: 10;
          pointer-events: none;
          max-width: 680px;
        }

        .chanan-mediums-title {
          font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(2.4rem, 4.8vw, 5.2rem);
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: -0.04em;
          color: #111111;
          display: flex;
          flex-direction: column;
          margin: 0;
        }

        .chanan-mediums-subtitle {
          font-size: clamp(0.95rem, 1.3vw, 1.35rem);
          font-weight: 500;
          color: #2b2b2b;
          margin: 1.25rem 0 0 0;
          letter-spacing: -0.01em;
        }

        .chanan-mediums-container {
          position: relative;
          z-index: 2;
          width: 100vw;
          max-width: 100vw;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .chanan-mediums-card {
          position: relative;
          width: 100vw;
          max-width: 100vw;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .chanan-mediums-img {
          width: 100vw;
          max-width: 100vw;
          height: auto;
          min-height: 100vh;
          display: block;
          object-fit: contain;
          background: transparent;
          transform: scale(1.22) translateY(0px);
          transform-origin: center center;
          will-change: transform;
        }

        .chanan-mediums-cta {
          position: absolute;
          bottom: 3.5%;
          right: 4.5%;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 10;
          padding: 8px 12px;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chanan-mediums-cta:hover {
          transform: scale(1.06);
        }

        .mediums-cta-text {
          font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(0.9rem, 1.4vw, 1.35rem);
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #111111;
        }

        .mediums-cta-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(34px, 3.2vw, 46px);
          height: clamp(34px, 3.2vw, 46px);
          border-radius: 50%;
          background: linear-gradient(135deg, #f04e28 0%, #e03612 100%);
          color: #ffffff;
          box-shadow: 0 4px 18px rgba(224, 54, 18, 0.45);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .chanan-mediums-cta:hover .mediums-cta-arrow {
          transform: translateY(-2px) scale(1.08);
          box-shadow: 0 8px 24px rgba(224, 54, 18, 0.65);
        }

        @media (max-width: 768px) {
          .chanan-mediums-section {
            padding: 3rem 1.5rem 4.5rem 1.5rem;
          }

          .chanan-mediums-card {
            border-radius: 16px;
          }
        }


        /* ── Footer ── */
        .chanan-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: #08090e;
          overflow: hidden;
          padding: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 28px 28px 0 0;
          transform: translateY(100%);
          will-change: transform;
          box-sizing: border-box;
        }

        .chanan-footer-top {
          display: grid;
          grid-template-columns: minmax(320px, 480px) 1fr;
          align-items: center;
          padding: 4rem 6vw 0 6vw;
          position: relative;
          z-index: 2;
          flex: 1;
          gap: 3rem;
          width: 100%;
          box-sizing: border-box;
          min-height: 0;
        }

        .chanan-footer-left {
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 2;
        }

        .chanan-footer-headline {
          font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(2.8rem, 5.5vw, 6rem);
          font-weight: 900;
          line-height: 0.93;
          letter-spacing: -0.04em;
          color: #f1eeea;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .chanan-footer-sub {
          font-size: clamp(1rem, 1.4vw, 1.3rem);
          color: rgba(241,238,234,0.65);
          margin: 0;
          font-weight: 400;
          letter-spacing: -0.01em;
        }

        .chanan-footer-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: #f1eeea;
          color: #08090e;
          border: none;
          border-radius: 8px;
          padding: 1rem 1.6rem;
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: clamp(0.85rem, 1.1vw, 1.05rem);
          font-weight: 800;
          letter-spacing: 0.1em;
          cursor: pointer;
          width: fit-content;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .chanan-footer-cta:hover {
          background: #ffffff;
          transform: scale(1.04);
        }

        .chanan-footer-img-wrap {
          width: 100%;
          height: 100%;
          min-height: 440px;
          max-height: 65vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .chanan-footer-glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(ellipse 70% 65% at 50% 50%, rgba(20, 60, 220, 0.55) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .chanan-footer-3d {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          min-height: 440px;
        }

        /* Bottom nav strip */
        .chanan-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 6vw;
          border-top: 1px solid rgba(241,238,234,0.1);
          position: relative;
          z-index: 2;
          box-sizing: border-box;
        }

        .chanan-footer-nav {
          display: flex;
          align-items: center;
          gap: clamp(2rem, 4vw, 5rem);
        }

        .chanan-footer-link {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: clamp(0.8rem, 1vw, 1rem);
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #f1eeea;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }

        .chanan-footer-link:hover {
          opacity: 1;
        }

        .chanan-footer-reserve-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f04e28 0%, #e03612 100%);
          color: #ffffff;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(224, 54, 18, 0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .chanan-footer-reserve-badge:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 24px rgba(224, 54, 18, 0.65);
        }

        /* Oversized wordmark */
        .chanan-footer-wordmark {
          position: relative;
          z-index: 1;
          font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(10rem, 22vw, 22rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.85;
          color: rgba(130, 135, 175, 0.18);
          -webkit-text-stroke: 1px rgba(180, 180, 210, 0.15);
          text-align: center;
          width: 100%;
          margin-top: -1rem;
          pointer-events: none;
          user-select: none;
          overflow: hidden;
          display: block;
        }

        @media (max-width: 900px) {
          .chanan-footer {
            height: 100vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            justify-content: flex-start;
          }

          .chanan-footer-top {
            grid-template-columns: 1fr;
            padding: 3.5rem 6vw 1rem 6vw;
            gap: 1.75rem;
            flex: none;
          }

          .chanan-footer-left {
            max-width: 100%;
          }

          .chanan-footer-headline {
            font-size: clamp(2.2rem, 8vw, 3.8rem);
          }

          .chanan-footer-img-wrap {
            width: 100%;
            height: 380px;
            min-height: 320px;
          }

          .chanan-footer-3d {
            width: 100%;
            height: 380px;
            min-height: 320px;
          }

          .chanan-footer-bottom {
            padding: 1.25rem 6vw;
            flex-wrap: wrap;
            gap: 1.25rem;
          }

          .chanan-footer-nav {
            flex-wrap: wrap;
            gap: 1.25rem 2rem;
          }

          .chanan-footer-wordmark {
            font-size: clamp(5rem, 20vw, 12rem);
            margin-top: 0.5rem;
          }
        }
      ` }} />
    </>
  );
}
