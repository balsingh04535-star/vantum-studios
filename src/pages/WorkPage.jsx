import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { projects } from '../data/projects';

export default function WorkPage({ onOpenInquiry }) {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', '3D Web', 'Brand Systems', 'Kinetic Apps'];
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const workSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.madebychanan.com/work#collection',
        'name': 'Selected Work — Websites, Branding & Motion | Chanan',
        'description': 'Archive of bespoke WebGL experiences, 3D interactive applications, and kinetic brand identity systems built by Chanan.',
        'url': 'https://www.madebychanan.com/work',
        'publisher': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.madebychanan.com/work#breadcrumb',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://www.madebychanan.com/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Selected Work',
            'item': 'https://www.madebychanan.com/work'
          }
        ]
      }
    ]
  };

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#070709', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title="Selected Work — Websites, Branding & Motion | Chanan"
        description="Explore our archive of bespoke WebGL experiences, 3D interactive applications, and kinetic brand identity systems built for category leaders."
        canonicalUrl="https://www.madebychanan.com/work"
        ogImage="https://www.madebychanan.com/hero-bg.webp"
        schemaData={workSchema}
      />
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
            }}>Selected Works</span>
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
            Selected Realities &amp; Interactive Case Studies
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {categories.map((cat) => (
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
              <article
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
                  <img
                    src={project.image}
                    alt={`${project.title} by Chanan`}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
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
                    <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                      {project.title}
                    </h2>
                    <span style={{ fontSize: '0.85rem', color: '#00f0ff', fontWeight: 600 }}>{project.metric}</span>
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#71717a' }}>{project.year}</span>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#a1a1aa', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  {project.summary}
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <TransitionLink
                    to={`/work/${project.slug}`}
                    style={{
                      flex: '1',
                      justifyContent: 'center',
                      background: '#00f0ff',
                      color: '#070709',
                      padding: '0.85rem 1.5rem',
                      borderRadius: '24px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={18} />
                  </TransitionLink>

                  <button
                    onClick={onOpenInquiry}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '0.85rem 1.2rem',
                      borderRadius: '24px',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>Inquire</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
