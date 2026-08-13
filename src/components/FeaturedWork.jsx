import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedWork({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'voltlites',
      num: '01',
      title: 'Voltlites — Spatial Audio Platform',
      category: '3D WebGL',
      image: '/img1.jpg',
      year: '2026',
      client: 'Voltlites Audio Inc.',
      summary: 'Interactive WebGL spatial audio interface with real-time waveform visualization, parametric soundscapes, and custom GLSL shaders.',
      deliverables: ['Creative Direction', 'WebGL Architecture', 'Generative Shaders', '3D Sound Design'],
    },
    {
      id: 'chronos',
      num: '02',
      title: 'Chronos — Cybernetic Horology',
      category: 'Brand Systems',
      image: '/img4.jpg',
      year: '2026',
      client: 'Chronos Luxury',
      summary: 'High-fashion digital flagship store for next-generation timepiece collectors featuring real-time 3D watch customization.',
      deliverables: ['E-Commerce Architecture', '3D Asset Pipeline', 'Global Headless CMS', 'Motion Graphics'],
    },
    {
      id: 'aether',
      num: '03',
      title: 'Aether — Neural Compute Studio',
      category: 'Kinetic Apps',
      image: '/img5.jpg',
      year: '2025',
      client: 'Aether Labs',
      summary: 'High-speed AI model training dashboard featuring GPU-accelerated canvas charts and real-time telemetry.',
      deliverables: ['Design System', 'React Performance Optimization', 'Dark Mode UI', 'WebGL Canvas'],
    },
    {
      id: 'hyperion',
      num: '04',
      title: 'Hyperion — Autonomous Racing',
      category: '3D WebGL',
      image: '/img8.jpg',
      year: '2025',
      client: 'Hyperion Dynamic',
      summary: 'Immersive 3D telemetry experience for electric hypercar telemetry stream and real-time aerodynamic simulation.',
      deliverables: ['Custom Canvas Engine', 'Sound Design', 'Realtime Websockets', '3D Graphics'],
    },
  ];

  const categories = ['All', '3D WebGL', 'Brand Systems', 'Kinetic Apps'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#08080a',
        color: '#f4f4f5',
        padding: '8rem 3.5rem',
        boxSizing: 'border-box',
      }}
      id="work"
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '4.5rem' }}>
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: '#c4d600',
                fontFamily: 'var(--font-main)',
                marginBottom: '1rem',
              }}
            >
              SELECTED AGENCY PORTFOLIO
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 5rem)',
                fontWeight: 400,
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              WORK THAT SHAPED<br />
              <span style={{ color: '#484850' }}>THE CULTURE.</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  borderRadius: '20px',
                  border: activeCategory === cat ? '1px solid #c4d600' : '1px solid rgba(255,255,255,0.12)',
                  background: activeCategory === cat ? 'rgba(196,214,0,0.1)' : 'rgba(255,255,255,0.02)',
                  color: activeCategory === cat ? '#c4d600' : '#8e8e93',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-main)',
                  transition: 'all 0.3s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(540px, 1fr))', gap: '3.5rem' }}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="featured-work-card"
            >
              {/* Image Container */}
              <div className="featured-card-img-wrapper">
                <img src={project.image} alt={project.title} className="featured-card-img" />
                <div className="featured-card-overlay">
                  <span className="featured-view-btn">
                    <span>Explore Case Study</span>
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="featured-card-badge">
                  {project.category} · {project.year}
                </div>
              </div>

              {/* Text Info */}
              <div style={{ padding: '1.5rem 0 0 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#71717a', fontFamily: 'var(--font-main)', marginBottom: '0.3rem' }}>
                      {project.client}
                    </div>
                    <h3 style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)', fontWeight: 500, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: 0, letterSpacing: '-0.02em' }}>
                      {project.title}
                    </h3>
                  </div>

                  <div className="featured-arrow-circle">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#8e8e93', lineHeight: 1.6, margin: '0.6rem 0 1.2rem 0', fontFamily: 'var(--font-main)' }}>
                  {project.summary}
                </p>

                {/* Deliverable Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {project.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.7rem',
                        color: '#71717a',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-main)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Explore Link */}
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Link
            to="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.9rem 2.2rem',
              borderRadius: '30px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.03)',
              color: '#ffffff',
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              textDecoration: 'none',
              fontFamily: 'var(--font-main)',
              transition: 'all 0.35s ease',
            }}
            className="explore-all-btn"
          >
            <span>Explore All 14+ Selected Works</span>
            <ArrowUpRight size={18} color="#c4d600" />
          </Link>
        </div>

      </div>

      {/* Case Study Modal */}
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

      <style>{`
        .featured-work-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .featured-card-img-wrapper {
          position: relative;
          width: 100%;
          height: clamp(300px, 30vw, 440px);
          border-radius: 12px;
          overflow: hidden;
          background: #141417;
        }
        .featured-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
          filter: brightness(0.9) contrast(1.05);
        }
        .featured-work-card:hover .featured-card-img {
          transform: scale(1.04);
          filter: brightness(1.0) contrast(1.05);
        }
        .featured-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(8,8,10,0.7) 100%);
          display: flex;
          align-items: flex-end;
          padding: 2rem;
          opacity: 0.9;
        }
        .featured-view-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1.3rem;
          border-radius: 24px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.35s ease;
        }
        .featured-work-card:hover .featured-view-btn {
          background: #c4d600;
          color: #08080a;
          border-color: #c4d600;
        }
        .featured-card-badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(8,8,10,0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 0.4rem 0.85rem;
          borderRadius: 20px;
          fontSize: 0.72rem;
          color: #a1a1aa;
          font-family: var(--font-main);
        }
        .featured-arrow-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a1a1aa;
          transition: all 0.35s ease;
        }
        .featured-work-card:hover .featured-arrow-circle {
          border-color: #c4d600;
          color: #c4d600;
          transform: rotate(45deg);
        }
        .explore-all-btn:hover {
          border-color: #c4d600;
          background: rgba(196,214,0,0.1);
        }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
