import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Footer from '../components/Footer';

export default function WorkPage({ onOpenInquiry }) {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProjects = [
    {
      id: 'voltlites',
      title: 'Voltlites — Spatial Audio Platform',
      category: '3D Web',
      image: '/img1.jpg',
      year: '2026',
      client: 'Voltlites Audio Inc.',
      summary: 'Interactive WebGL spatial audio interface with real-time waveform visualization.',
      metric: '+340% User Engagement'
    },
    {
      id: 'chronos',
      title: 'Chronos — Cybernetic Horology',
      category: 'Brand Systems',
      image: '/img4.jpg',
      year: '2026',
      client: 'Chronos Luxury',
      summary: 'High-fashion digital flagship store for next-generation timepiece collectors.',
      metric: '$18.4M Launch Volume'
    },
    {
      id: 'aether',
      title: 'Aether — Neural Compute Studio',
      category: 'Kinetic Apps',
      image: '/img5.jpg',
      year: '2025',
      client: 'Aether Labs',
      summary: 'High-speed AI model training dashboard featuring GPU-accelerated canvas charts.',
      metric: 'Sub-16ms Rendering'
    },
    {
      id: 'hyperion',
      title: 'Hyperion — Autonomous Racing',
      category: '3D Web',
      image: '/img8.jpg',
      year: '2025',
      client: 'Hyperion Dynamic',
      summary: 'Immersive 3D telemetry experience for electric hypercar telemetry stream.',
      metric: 'FWA Site of the Day'
    },
    {
      id: 'nebulus',
      title: 'Nebulus — Orbital Satellite System',
      category: 'Kinetic Apps',
      image: '/img3.jpg',
      year: '2025',
      client: 'Nebulus Aerospace',
      summary: 'Interactive 3D constellation planner with live trajectory computation.',
      metric: 'Awwwards Studio Winner'
    },
    {
      id: 'solaris',
      title: 'Solaris — High Optics Lab',
      category: 'Brand Systems',
      image: '/img7.jpg',
      year: '2024',
      client: 'Solaris Design',
      summary: 'Generative brand identity system and spatial web showcase.',
      metric: '+180% Organic Inquiries'
    }
  ];

  const filtered = filter === 'All' ? allProjects : allProjects.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#070709', color: '#ffffff', minHeight: '100vh' }}>
      <div className="section-padding" style={{ minHeight: '60vh', backgroundColor: '#070709' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <h1 style={{
            marginBottom: '0.85rem',
            maxWidth: '900px',
            color: '#ffffff',
            fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 1.05
          }}>
            Archive of <span style={{
              fontStyle: 'italic',
              fontFamily: 'var(--font-luxury-slim)',
              fontWeight: 400,
              color: '#ffffff'
            }}>Creative Realities</span>
          </h1>
          <p style={{
            fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
            color: '#8e8e93',
            maxWidth: '750px',
            marginBottom: '3.5rem',
            lineHeight: '1.5',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}>
            Selected Realities & Interactive Works
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {['All', '3D Web', 'Brand Systems', 'Kinetic Apps'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '24px',
                  border: filter === cat ? '1px solid #00f0ff' : '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: filter === cat ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255,255,255,0.03)',
                  color: filter === cat ? '#00f0ff' : '#a1a1aa',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className="grid-2" style={{ gap: '2.5rem' }}>
            {filtered.map((project) => (
              <div
                key={project.id}
                style={{
                  background: 'linear-gradient(180deg, #0e0f14 0%, #070709 100%)',
                  border: '1px solid rgba(0, 240, 255, 0.18)',
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ height: '320px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.5rem', position: 'relative' }}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(7, 7, 9, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0,240,255,0.3)',
                    color: '#00f0ff',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {project.category}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem', color: '#ffffff' }}>{project.title}</h3>
                    <span style={{ fontSize: '0.85rem', color: '#00f0ff', fontWeight: 600 }}>{project.metric}</span>
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#71717a' }}>{project.year}</span>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#a1a1aa', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  {project.summary}
                </p>

                <button
                  onClick={onOpenInquiry}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: '#00f0ff',
                    color: '#070709',
                    border: 'none',
                    padding: '0.85rem 1.5rem',
                    borderRadius: '24px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>Discuss Case Scope</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
