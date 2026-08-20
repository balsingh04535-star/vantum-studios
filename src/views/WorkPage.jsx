import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { projects as allProjects } from '../data/projects';

export default function WorkPage({ onOpenInquiry }) {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = filter === 'All' ? allProjects : allProjects.filter(p => p.category === filter);

  const workSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.madebychanan.com/work#collection',
        'name': 'Portfolio & Selected Works | Chanan',
        'description': 'Explore curated case studies in bespoke WebGL websites, 3D interactive product experiences, and brand identity systems by Chanan.',
        'url': 'https://www.madebychanan.com/work',
        'isPartOf': {
          '@type': 'WebSite',
          '@id': 'https://www.madebychanan.com/#website'
        },
        'about': {
          '@type': 'Organization',
          'name': 'Chanan'
        },
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': allProjects.map((proj, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'url': `https://www.madebychanan.com/work/${proj.slug}`,
            'name': proj.title
          }))
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
            'name': 'Work',
            'item': 'https://www.madebychanan.com/work'
          }
        ]
      }
    ]
  };

  return (
    <main style={{ paddingTop: '8rem', backgroundColor: '#0002b5', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title="Portfolio &amp; Selected Works | Chanan — Creative Digital Agency"
        description="Explore award-winning case studies in 3D WebGL experiences, brand identity design, and kinetic web development created by Chanan for visionary global brands."
        canonicalUrl="https://www.madebychanan.com/work"
        ogType="website"
        schemaData={workSchema}
      />

      <div className="section-padding" style={{ minHeight: '60vh', backgroundColor: '#0002b5' }}>
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
              color: '#dbe7ff'
            }}>Creative Realities</span>
          </h1>
          <p style={{
            fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
            color: '#bfd7ff',
            maxWidth: '750px',
            marginBottom: '3.5rem',
            lineHeight: '1.5',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}>
            Selected Realities &amp; Interactive Works
          </p>

          {/* Filter Pills with Live Counts */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {['All', '3D Web', 'Brand Systems', 'Kinetic Apps'].map((cat) => {
              const count = cat === 'All' ? allProjects.length : allProjects.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: '24px',
                    border: filter === cat ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.25)',
                    backgroundColor: filter === cat ? '#ffffff' : 'rgba(255,255,255,0.08)',
                    color: filter === cat ? '#0002b5' : '#dbe7ff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: filter === cat ? '0 4px 20px rgba(255,255,255,0.3)' : 'none'
                  }}
                >
                  {cat} <span style={{ opacity: 0.75, fontSize: '0.75rem', marginLeft: '4px' }}>({count})</span>
                </button>
              );
            })}
          </div>

          {/* Project List */}
          <div className="grid-2" style={{ gap: '2.5rem' }}>
            {filtered.map((project) => (
              <div
                key={project.id}
                style={{
                  background: '#020b4d',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 16px 45px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ height: '320px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.5rem', position: 'relative', backgroundColor: '#00014a' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(0, 2, 181, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#ffffff',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      {project.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.45rem', marginBottom: '0.4rem', color: '#ffffff', fontWeight: 600, lineHeight: 1.2 }}>{project.title}</h3>
                      <span style={{ fontSize: '0.85rem', color: '#7dd3fc', fontWeight: 700 }}>{project.metric}</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#8faed9', fontWeight: 600, paddingLeft: '1rem' }}>{project.year}</span>
                  </div>

                  <p style={{ fontSize: '0.95rem', color: '#dbe7ff', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    {project.summary}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                  <TransitionLink
                    to={`/work/${project.slug}`}
                    className="btn-volt"
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      height: 'auto',
                      padding: '0.85rem 1.5rem',
                      backgroundColor: '#ffffff',
                      color: '#0002b5',
                      fontWeight: 700
                    }}
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={18} />
                  </TransitionLink>

                  <button
                    onClick={onOpenInquiry}
                    className="btn-glass"
                    style={{
                      height: 'auto',
                      padding: '0.85rem 1.25rem',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    <span>Discuss Scope</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}

