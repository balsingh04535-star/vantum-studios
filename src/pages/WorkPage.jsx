import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Filter, ExternalLink } from 'lucide-react';
import Footer from '../components/Footer';

export default function WorkPage({ onOpenInquiry }) {
  const [filter, setFilter] = useState('All');

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
      title: 'Solaris — High Optics Optics Lab',
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
    <div style={{ paddingTop: '8rem' }}>
      <div className="section-padding dark-section" style={{ minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Portfolio Archive</div>
          <h1 style={{ marginBottom: '1.5rem', maxWidth: '900px' }}>
            Selected Works & Interactive Experiments
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '750px', marginBottom: '3.5rem' }}>
            Every project is engineered from scratch. No off-the-shelf templates, no performance compromises.
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {['All', '3D Web', 'Brand Systems', 'Kinetic Apps'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="btn-glass"
                style={{
                  borderColor: filter === cat ? 'var(--accent-volt)' : 'var(--border-subtle)',
                  color: filter === cat ? 'var(--accent-volt)' : 'var(--text-secondary)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className="grid-2">
            {filtered.map((project) => (
              <div key={project.id} className="glass-card">
                <div className="card-img-wrapper" style={{ height: '320px' }}>
                  <img src={project.image} alt={project.title} />
                  <span className="card-tag">{project.category}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{project.title}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-volt)', fontWeight: 600 }}>{project.metric}</span>
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{project.year}</span>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  {project.summary}
                </p>

                <button className="btn-volt" onClick={onOpenInquiry} style={{ width: '100%', justifyContent: 'center' }}>
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
