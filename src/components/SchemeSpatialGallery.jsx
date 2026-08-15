import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Crosshair, Eye, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ClientGlobe from './ClientGlobe';
import MasonryShowcaseGrid from './MasonryShowcaseGrid';
import SpotlightSVGPath from './SpotlightSVGPath';
import Footer from './Footer';
import TransitionLink from './TransitionLink';

export const selectedWorks = [
  {
    id: 'voltlites',
    num: '01',
    client: 'VOLTLITES AUDIO',
    title: 'Spatial Waveform Platform',
    category: '3D Web & Generative Shaders',
    location: 'Tokyo, Japan',
    year: '2026',
    image: '/img1.jpg',
    rotation: -12,
    summary: 'Interactive WebGL spatial audio interface with real-time parametric waveform visualization and spatial acoustics.',
    deliverables: ['Creative Direction', 'WebGL Architecture', 'Generative Shaders', 'Audio Engine'],
  },
  {
    id: 'chronos',
    num: '02',
    client: 'CHRONOS LUXURY',
    title: 'Cybernetic Horology Flagship',
    category: 'Brand Systems & E-Commerce',
    location: 'Geneva, Switzerland',
    year: '2026',
    image: '/img4.jpg',
    rotation: 6,
    summary: 'High-fashion digital flagship store for next-generation timepiece collectors featuring real-time 3D watch customization.',
    deliverables: ['E-Commerce Architecture', '3D Asset Pipeline', 'Global Headless CMS', 'Motion Graphics'],
  },
  {
    id: 'aether',
    num: '03',
    client: 'AETHER LABS',
    title: 'Neural Compute Studio',
    category: 'Kinetic UI & AI Dashboards',
    location: 'San Francisco, USA',
    year: '2025',
    image: '/img5.jpg',
    rotation: -4,
    summary: 'High-speed AI model training dashboard featuring GPU-accelerated canvas charts and real-time telemetry.',
    deliverables: ['Design System', 'React Performance Optimization', 'Dark Mode UI', 'WebGL Canvas'],
  },
  {
    id: 'hyperion',
    num: '04',
    client: 'HYPERION DYNAMIC',
    title: 'Autonomous Racing Telemetry',
    category: 'Custom Canvas Engine',
    location: 'Monaco · Europe',
    year: '2025',
    image: '/img8.jpg',
    rotation: 10,
    summary: 'Immersive 3D telemetry experience for electric hypercar telemetry stream and real-time aerodynamic simulation.',
    deliverables: ['Custom Canvas Engine', 'Sound Design', 'Realtime Websockets', '3D Graphics'],
  },
  {
    id: 'luxeforma',
    num: '05',
    client: 'LUXEFORMA IDENTITY',
    title: 'Spatial Brand System',
    category: 'Spatial Design & Identity',
    location: 'Milan, Italy',
    year: '2025',
    image: '/work/work1.jpg',
    rotation: -2,
    summary: 'Architectural brand direction and digital flagship experience for high-luxury Italian design house.',
    deliverables: ['Spatial Identity', 'Creative Direction', '3D Motion', 'Brand Architecture'],
  },
];

export const clientPartners = selectedWorks;

export default function SchemeSpatialGallery({ onOpenInquiry }) {
  const sectionRef = useRef(null);
  const globeWrapperRef = useRef(null);
  const parallaxTrackRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = cardsRef.current.filter(Boolean);
    const track = parallaxTrackRef.current;
    if (!track || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // ── 3D Parallax Card Scroller Animation (Reference code (32)/files) ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      // Spread outer cards out with 3D rotation and parallax translation
      cards.forEach((card, index) => {
        const factor = index - Math.floor(cards.length / 2);
        const xOffset = factor * 60; // Spread horizontally
        const rotOffset = selectedWorks[index].rotation;

        tl.fromTo(
          card,
          {
            x: factor * -120,
            rotation: rotOffset * 1.5,
            scale: 0.85,
            opacity: 0.6,
          },
          {
            x: xOffset,
            rotation: rotOffset,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-cream, #f4f3ef)',
        color: '#0f0f0f',
        padding: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Ultra-crisp 4K Studio Lighting Gradient ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 75% 50% at 50% 12%, rgba(255, 255, 255, 0.04) 0%, transparent 75%),
            radial-gradient(ellipse 60% 40% at 50% 88%, rgba(196, 214, 0, 0.025) 0%, transparent 70%),
            #08080a
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Top Header Navigation Bar ── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '2.5rem 3.5rem 0 3.5rem',
          boxSizing: 'border-box',
          marginBottom: '2rem',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <CrosshairStarIcon size={18} color="#52525b" />
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#52525b',
              fontFamily: 'var(--font-main)',
            }}
          >
            Chanan Global Network
          </span>
        </div>

        <div
          style={{
            fontSize: '0.85rem',
            letterSpacing: '0.35em',
            fontWeight: 600,
            color: '#0f0f0f',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
          }}
        >
          CHANAN
        </div>

        <TransitionLink
          to="/work"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.45rem 1.15rem',
            borderRadius: '20px',
            border: '1px solid rgba(0, 0, 0, 0.18)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            fontWeight: 600,
            color: '#0f0f0f',
            fontFamily: 'var(--font-main)',
            cursor: 'pointer',
            background: 'rgba(0, 0, 0, 0.04)',
            backdropFilter: 'blur(8px)',
            textDecoration: 'none'
          }}
        >
          <span>EXPLORE WORK</span>
          <ArrowUpRight size={14} />
        </TransitionLink>
      </header>

      {/* ── MASONRY SHOWCASE GRID (Replaces old SVG/Astronaut section) ── */}
      <MasonryShowcaseGrid onOpenInquiry={onOpenInquiry} />

      {/* ── SPOTLIGHT SVG PATH COMPONENT ── */}
      <SpotlightSVGPath />

      {/* ── HIGH-FASHION EDITORIAL FOOTER (Breedlove Style) ── */}
      <Footer onOpenInquiry={onOpenInquiry} />

      <style>{`
        .parallax-scroller-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          width: 100%;
          padding: 2rem 0;
        }
        .parallax-work-card {
          flex: 0 0 clamp(220px, 22vw, 320px);
          aspect-ratio: 16/10;
          border-radius: 1.25rem;
          overflow: hidden;
          background: #121215;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .parallax-work-card:hover {
          transform: translateY(-12px) scale(1.05) !important;
          border-color: #c4d600;
          box-shadow: 0 25px 50px rgba(196, 214, 0, 0.25);
          z-index: 10;
        }
        .card-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.85) contrast(1.05);
          transition: filter 0.4s ease;
        }
        .parallax-work-card:hover .card-img {
          filter: brightness(1) contrast(1.05);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 20%, rgba(8, 8, 10, 0.85) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.2rem;
        }
        .card-badge {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c4d600;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .card-title-text {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 500;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        .card-view-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: #a1a1aa;
          transition: color 0.3s ease;
        }
        .parallax-work-card:hover .card-view-link {
          color: #ffffff;
        }

        .editorial-work-showcase {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .work-meta-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .work-index {
          font-family: var(--font-main);
          font-size: 0.8rem;
          color: #52525b;
          font-weight: 500;
        }
        .work-client {
          font-family: var(--font-main);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8e8e93;
          font-weight: 600;
        }
        .work-category {
          font-family: var(--font-main);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: #71717a;
        }
        .work-year {
          font-family: var(--font-main);
          font-size: 0.75rem;
          color: #52525b;
        }
        .work-media-container {
          position: relative;
          width: 100%;
          height: clamp(320px, 32vw, 480px);
          border-radius: 12px;
          overflow: hidden;
          background: #18181b;
        }
        .work-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
          filter: brightness(0.9) contrast(1.05);
        }
        .editorial-work-showcase:hover .work-media-img {
          transform: scale(1.03);
          filter: brightness(1.0) contrast(1.05);
        }
        .work-media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(8,8,10,0.7) 100%);
          display: flex;
          align-items: flex-end;
          padding: 2rem;
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }
        .view-case-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.25rem;
          border-radius: 24px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: all 0.35s ease;
        }
        .editorial-work-showcase:hover .view-case-btn {
          background: #c4d600;
          color: #08080a;
          border-color: #c4d600;
        }
        .work-details-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
        }
        .work-title {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2vw, 1.9rem);
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .work-summary {
          font-family: var(--font-main);
          font-size: 0.92rem;
          color: #8e8e93;
          max-width: 650px;
          line-height: 1.55;
        }
        .work-deliverables {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: flex-end;
          max-width: 380px;
        }
        .deliverable-tag {
          font-size: 0.72rem;
          color: #71717a;
          background: rgba(255,255,255,0.04);
          padding: 0.3rem 0.7rem;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(8,8,10,0.85);
          backdrop-filter: blur(12px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .modal-content {
          background: #121215;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          max-width: 680px;
          width: 100%;
          padding: 2.2rem;
          color: #fff;
        }
        @media (max-width: 768px) {
          .globe-hero-wrapper {
            display: none !important;
          }
          .parallax-scroller-row {
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 1rem;
          }
          .parallax-work-card {
            flex: 0 0 240px;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function CrosshairStarIcon({ size = 18, color = "#ffffff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2v20M2 12h20" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  );
}
