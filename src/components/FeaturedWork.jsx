import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedWork({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'voltlites',
      title: 'Voltlites — Spatial Audio Platform',
      category: '3D Web',
      image: '/img1.jpg',
      year: '2026',
      client: 'Voltlites Audio Inc.',
      summary: 'Interactive WebGL spatial audio interface with real-time waveform visualization.',
      deliverables: ['Creative Direction', 'WebGL Architecture', 'Generative Shaders'],
    },
    {
      id: 'chronos',
      title: 'Chronos — Cybernetic Horology',
      category: 'Brand Systems',
      image: '/img4.jpg',
      year: '2026',
      client: 'Chronos Luxury',
      summary: 'High-fashion digital flagship store for next-generation timepiece collectors.',
      deliverables: ['E-Commerce Architecture', '3D Asset Pipeline', 'Global Headless CMS'],
    },
    {
      id: 'aether',
      title: 'Aether — Neural Compute Studio',
      category: 'Kinetic Apps',
      image: '/img5.jpg',
      year: '2025',
      client: 'Aether Labs',
      summary: 'High-speed AI model training dashboard featuring GPU-accelerated canvas charts.',
      deliverables: ['Design System', 'React Performance Optimization', 'Dark Mode UI'],
    },
    {
      id: 'hyperion',
      title: 'Hyperion — Autonomous Racing',
      category: '3D Web',
      image: '/img8.jpg',
      year: '2025',
      client: 'Hyperion Dynamic',
      summary: 'Immersive 3D telemetry experience for electric hypercar telemetry stream.',
      deliverables: ['Custom Canvas Engine', 'Sound Design', 'Realtime Telemetry Websockets'],
    },
  ];

  const categories = ['All', '3D Web', 'Brand Systems', 'Kinetic Apps'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="section-padding dark-section" id="work">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.5rem' }}>
          <div>
            <div className="badge" style={{ marginBottom: '1rem' }}>Selected Works</div>
            <h2>Curated Case Studies</h2>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn-glass ${activeCategory === cat ? 'active' : ''}`}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  borderColor: activeCategory === cat ? 'var(--accent-volt)' : 'var(--border-subtle)',
                  color: activeCategory === cat ? 'var(--accent-volt)' : 'var(--text-secondary)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              onClick={() => setSelectedProject(project)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-img-wrapper">
                <img src={project.image} alt={project.title} />
                <span className="card-tag">{project.category} — {project.year}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{project.summary}</p>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '50%', border: '1px solid var(--border-subtle)' }}>
                  <ArrowUpRight size={20} color="var(--accent-volt)" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/work" className="btn-glass">
            <span>Explore All Projects (14+)</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge">{selectedProject.category}</span>
                <h2 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>{selectedProject.title}</h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.75rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              {selectedProject.summary}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--accent-volt)', marginBottom: '0.75rem' }}>Deliverables & Scope</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedProject.deliverables.map((item, idx) => (
                  <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-volt" onClick={() => { setSelectedProject(null); onOpenInquiry(); }}>
                <span>Build Similar Experience</span>
                <ArrowUpRight size={18} />
              </button>
              <button className="btn-glass" onClick={() => setSelectedProject(null)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
