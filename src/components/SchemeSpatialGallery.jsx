import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Sparkles, Eye, X } from 'lucide-react';
import gsap from 'gsap';
import ClientGlobe from './ClientGlobe';

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
    summary: 'Immersive 3D telemetry experience for electric hypercar telemetry stream and real-time aerodynamic simulation.',
    deliverables: ['Custom Canvas Engine', 'Sound Design', 'Realtime Websockets', '3D Graphics'],
  },
];

export const clientPartners = selectedWorks;

export default function SchemeSpatialGallery({ onOpenInquiry }) {
  const sectionRef = useRef(null);
  const globeWrapperRef = useRef(null);
  const worksRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const works = worksRef.current.filter(Boolean);
    if (works.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        works,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      if (globeWrapperRef.current) {
        gsap.fromTo(
          globeWrapperRef.current,
          { opacity: 0, scale: 0.9, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'power3.out' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#08080a', // Ultra-luxury deep charcoal
        color: '#f4f4f5',
        padding: '3rem 3.5rem 6rem 3.5rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
          maxWidth: '1300px',
          marginBottom: '2rem',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <CrosshairStarIcon size={18} color="#8e8e93" />
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#8e8e93',
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
            color: '#ffffff',
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
            border: '1px solid rgba(255, 255, 255, 0.22)',
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            fontWeight: 600,
            color: '#ffffff',
            fontFamily: 'var(--font-main)',
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.02)',
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

      {/* ── TOP CENTER HERO GLOBE (Visible on PC, hidden on mobile) ── */}
      <div
        ref={globeWrapperRef}
        className="globe-hero-wrapper"
        style={{
          position: 'relative',
          width: 'clamp(320px, 35vw, 520px)',
          aspectRatio: '1/1',
          margin: '1rem auto 1.5rem auto',
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

      {/* ── CENTERED EDITORIAL HEADLINE & STATEMENT ── */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto 5rem auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.2vw, 6.2rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            marginBottom: '1.8rem',
          }}
        >
          PARTNERS <span style={{ color: '#484850' }}>WHO DEMANDED</span><br />
          THE EXTRAORDINARY.
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
            lineHeight: 1.65,
            color: '#8e8e93',
            maxWidth: '680px',
            margin: '0 auto',
            fontFamily: 'var(--font-main)',
            fontWeight: 400,
          }}
        >
          We collaborate with visionaries and ambitious market leaders — crafting living digital realities, high-fashion platforms, and kinetic applications that move culture forward.
        </p>
      </div>

      {/* ── EDITORIAL WORK SHOWCASE ("SHOW OUR WORK") ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            paddingBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#c4d600',
                fontFamily: 'var(--font-main)',
              }}
            >
              SELECTED AGENCY WORKS
            </span>
          </div>

          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#52525b',
              fontFamily: 'var(--font-main)',
            }}
          >
            4 Featured Case Studies
          </span>
        </div>

        {/* Case Study Work Rows */}
        {selectedWorks.map((work, idx) => (
          <article
            key={work.id}
            ref={(el) => (worksRef.current[idx] = el)}
            className="editorial-work-showcase"
            onClick={() => setSelectedProject(work)}
          >
            {/* Header info bar */}
            <div className="work-meta-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <span className="work-index">{work.num}</span>
                <span className="work-client">{work.client}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span className="work-category">{work.category}</span>
                <span className="work-year">{work.year}</span>
              </div>
            </div>

            {/* Widescreen Preview Media */}
            <div className="work-media-container">
              <img src={work.image} alt={work.title} className="work-media-img" />
              <div className="work-media-overlay">
                <span className="view-case-btn">
                  <span>Explore Case Study</span>
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="work-details-grid">
              <div>
                <h3 className="work-title">{work.title}</h3>
                <p className="work-summary">{work.summary}</p>
              </div>

              <div className="work-deliverables">
                {work.deliverables.map((item, i) => (
                  <span key={i} className="deliverable-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

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
