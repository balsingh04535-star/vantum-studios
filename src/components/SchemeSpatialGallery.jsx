import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Crosshair, Eye, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ClientGlobe from './ClientGlobe';
import AnimateSVGTextPath from './AnimateSVGTextPath';
import ImageExpansionTypography from './ImageExpansionTypography';

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
        backgroundColor: '#ebf5df', // Unified light cream background
        color: '#0f0f0f',
        padding: '3rem 3.5rem 6rem 3.5rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Light Studio Lighting Gradient ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 75% 50% at 50% 12%, rgba(130, 145, 0, 0.08) 0%, transparent 75%),
            radial-gradient(ellipse 60% 40% at 50% 88%, rgba(15, 118, 110, 0.04) 0%, transparent 70%),
            #ebf5df
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
          maxWidth: '1300px',
          marginBottom: '2rem',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <CrosshairStarIcon size={18} color="#3f3f46" />
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#3f3f46',
              fontFamily: 'var(--font-main)',
            }}
          >
            Vantum Global Network
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
          VANTUM
        </div>

        <div
          onClick={onOpenInquiry}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.45rem 1.15rem',
            borderRadius: '20px',
            border: '1px solid rgba(15, 15, 15, 0.25)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            fontWeight: 600,
            color: '#0f0f0f',
            fontFamily: 'var(--font-main)',
            cursor: 'pointer',
            background: 'rgba(15, 15, 15, 0.03)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span>MENU</span>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="0" y1="2" x2="12" y2="2" />
            <line x1="0" y1="8" x2="12" y2="8" />
          </svg>
        </div>
      </header>

      {/* ── TOP CENTER HERO GLOBE ── */}
      <div
        ref={globeWrapperRef}
        className="globe-hero-wrapper"
        style={{
          position: 'relative',
          width: 'clamp(320px, 35vw, 520px)',
          aspectRatio: '1/1',
          margin: '1rem auto 1rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {/* Concentric Background Orbital Rings Centered Behind Sphere */}
        <svg
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '135%',
            height: '135%',
            pointerEvents: 'none',
            zIndex: 0,
            shapeRendering: 'geometricPrecision',
          }}
          viewBox="0 0 800 800"
        >
          <circle cx="400" cy="400" r="370" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle cx="400" cy="400" r="290" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
          <circle cx="400" cy="400" r="210" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* 3D Earth Sphere */}
        <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
          <ClientGlobe
            dark={1}
            baseColor={[0.45, 0.48, 0.52]}
            glowColor={[0.15, 0.18, 0.22]}
            markerColor={[0.78, 0.88, 0.0]}
            arcColor={[0.78, 0.88, 0.0]}
            mapBrightness={6.0}
            diffuse={1.8}
            mapSamples={65000}
            markerSize={0.05}
            arcWidth={0.65}
            arcHeight={0.38}
          />
        </div>
      </div>

      {/* ── 3D PARALLAX PREMIUM WORK SCROLLER (Replacing Static Text Block) ── */}
      <div
        ref={parallaxTrackRef}
        style={{
          width: '100%',
          maxWidth: '1300px',
          margin: '2rem auto 4rem auto',
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1200px',
        }}
      >
        <div className="parallax-scroller-row">
          {selectedWorks.map((work, idx) => (
            <div
              key={work.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="parallax-work-card"
              onClick={() => setSelectedProject(work)}
            >
              <div className="card-image-wrap">
                <img src={work.image} alt={work.title} className="card-img" />
                <div className="card-overlay">
                  <div className="card-badge">{work.num} · {work.client}</div>
                  <div className="card-title-text">{work.title}</div>
                  <span className="card-view-link">
                    <span>Explore Case Study</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FLOWING SVG TEXT ON PATH (From reference AnimateSVGTextPath-master) ── */}
      <AnimateSVGTextPath
        text="PARTNERS WHO DEMANDED THE EXTRAORDINARY"
        pathD="M -400 150 Q 400 280 1200 150 Q 2000 20 2800 150 Q 3600 280 4400 150"
        viewBox="0 0 3200 300"
        idPrefix="curve1"
        textColor="#0f0f0f"
        glowColor="#829100"
        repeatCount={4}
      />

      {/* ── IMAGE EXPANSION TYPOGRAPHY SHOWCASE (From reference ImageExpansionTypography-main) ── */}
      <ImageExpansionTypography onOpenInquiry={onOpenInquiry} />

      {/* ── Case Study Detail Modal ── */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge" style={{ color: '#c4d600', borderColor: 'rgba(196,214,0,0.3)' }}>
                  {selectedProject.category}
                </span>
                <h2 style={{ marginTop: '0.75rem', fontSize: '2rem', color: '#fff' }}>{selectedProject.title}</h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ height: '320px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: '#a1a1aa', lineHeight: 1.6 }}>
              {selectedProject.summary}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#c4d600', marginBottom: '0.75rem' }}>
                Deliverables & Scope
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedProject.deliverables.map((item, idx) => (
                  <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', color: '#f4f4f5' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => { setSelectedProject(null); onOpenInquiry(); }}
                style={{
                  background: '#c4d600',
                  color: '#08080a',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '24px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Commission Similar Work</span>
                <ArrowUpRight size={18} />
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '24px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Second Flowing SVG Text Wave above footer ── */}
      <AnimateSVGTextPath
        text="DRIVEN BY PURPOSE · DEFINED BY IMPACT · CREATIVE PRACTICE"
        pathD="M 0 100 Q 250 0 500 100 Q 750 200 1000 100"
        idPrefix="curve2"
        textColor="#71717a"
        glowColor="#c4d600"
      />

      {/* ── Footer Tagline ── */}
      <footer
        style={{
          width: '100%',
          maxWidth: '1200px',
          marginTop: '6rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.18em', color: '#52525b', textTransform: 'uppercase' }}>
          Vantum Studios © 2026 · Global Creative Practice
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: '#8e8e93', textTransform: 'uppercase', textAlign: 'right' }}>
            DRIVEN BY PURPOSE.<br />DEFINED BY IMPACT.
          </div>
          <CrosshairStarIcon size={20} color="#c4d600" />
        </div>
      </footer>

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
          section {
            padding: 5.5rem 1.25rem 4rem 1.25rem !important;
          }
          header {
            flex-direction: row !important;
            flex-wrap: wrap;
            justify-content: space-between !important;
            gap: 0.75rem !important;
            margin-bottom: 2.5rem !important;
          }
          .globe-hero-wrapper {
            display: none !important;
          }
          .parallax-scroller-row {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            justify-content: flex-start;
            padding: 0.75rem 0.25rem;
            gap: 1rem;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }
          .parallax-scroller-row::-webkit-scrollbar {
            display: none;
          }
          .parallax-work-card {
            flex: 0 0 82vw !important;
            max-width: 320px !important;
            aspect-ratio: 16/10 !important;
            scroll-snap-align: center;
            transform: none !important;
          }
          footer {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
            text-align: center;
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
