import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TransitionLink from './TransitionLink';
import { projects } from '../data/projects';

export default function FeaturedWork({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', '3D Web', 'Brand Systems', 'Kinetic Apps'];

  const filteredProjects = activeCategory === 'All'
    ? projects.slice(0, 4)
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
            <TransitionLink
              key={project.id}
              to={`/work/${project.slug}`}
              className="glass-card"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="card-img-wrapper">
                <img
                  src={project.image}
                  alt={`${project.title} by Chanan`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="card-tag">{project.category} — {project.year}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#ffffff' }}>{project.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{project.summary}</p>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '50%', border: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                  <ArrowUpRight size={20} color="var(--accent-volt)" />
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <TransitionLink to="/work" className="btn-glass">
            <span>Explore All Projects ({projects.length})</span>
            <ArrowUpRight size={18} />
          </TransitionLink>
        </div>

      </div>
    </section>
  );
}
