import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

export default function AboutPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const principles = [
    { title: 'Zero Template Policy', desc: 'Every layout, shader, and interaction is engineered bespoke from first principles.' },
    { title: 'Obsessive Frame Rate', desc: '120fps fluid motion physics on modern hardware; sub-60fps drops are unacceptable.' },
    { title: 'Synthetic Perfection', desc: 'Combining organic visual aesthetics with generative algorithm precision.' },
    { title: 'Direct Partner Access', desc: 'Clients collaborate directly with senior creative directors and lead web engineers.' }
  ];

  const leadership = [
    { name: 'Kaelen Vance', role: 'Executive Creative Director', image: '/img2.jpg' },
    { name: 'Sora Tanaka', role: 'Head of 3D & Kinetic Shader Web', image: '/img6.jpg' },
    { name: 'Elena Rostova', role: 'Director of Brand Engineering', image: '/img9.jpg' },
  ];

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.madebychanan.com/about#about',
        'name': 'About Chanan — Independent Creative Digital Agency',
        'description': 'Learn about Chanan, an independent creative digital agency founded in London, engineering bespoke WebGL experiences, 3D brand systems, and high-performance websites.',
        'url': 'https://www.madebychanan.com/about',
        'mainEntity': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/',
          'logo': 'https://www.madebychanan.com/logo.png',
          'foundingLocation': {
            '@type': 'Place',
            'name': 'London, United Kingdom'
          },
          'knowsAbout': [
            'Bespoke Web Design',
            'Three.js / WebGL Development',
            'Brand Identity Systems',
            '3D Product Visualization',
            'GSAP Kinetic Motion Engineering'
          ]
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.madebychanan.com/about#breadcrumb',
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
            'name': 'About',
            'item': 'https://www.madebychanan.com/about'
          }
        ]
      }
    ]
  };

  return (
    <main style={{ paddingTop: '8rem', backgroundColor: '#0002b5', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title="About Us | Chanan — Independent Creative Digital Agency"
        description="Chanan is an independent creative agency based in London, building standout digital experiences, 3D WebGL websites, and brand identities for ambitious worldwide brands."
        canonicalUrl="https://www.madebychanan.com/about"
        ogType="website"
        schemaData={aboutSchema}
      />

      <div className="section-padding" style={{ backgroundColor: '#0002b5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.25)',
            backgroundColor: '#020b4d',
            color: '#bfd7ff',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>
            Studio Philosophy
          </div>

          <h1 style={{ marginBottom: '1.5rem', maxWidth: '950px', color: '#ffffff', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-heading)' }}>
            We Are Chanan. Architects of the Unreal.
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#dbe7ff', maxWidth: '850px', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>
            Operating globally, Chanan was founded to dismantle cookie-cutter web development. We operate as an elite creative laboratory for ambitious brands demanding extraordinary digital presence and technical mastery.
          </p>

          {/* Image Showcase Banner */}
          <div style={{ borderRadius: '24px', overflow: 'hidden', height: '420px', marginBottom: '5rem', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)' }}>
            <img src="/img5.jpg" alt="Chanan Creative Studio Laboratory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Core Principles Grid */}
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ marginBottom: '3rem', color: '#ffffff', fontSize: '2.4rem' }}>Our Core Directives</h2>
            <div className="grid-2" style={{ gap: '2rem' }}>
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#020b4d',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', color: '#bfd7ff', fontWeight: 800, marginBottom: '0.75rem' }}>
                    0{idx + 1}.
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#ffffff' }}>{p.title}</h3>
                  <p style={{ color: '#dbe7ff', fontSize: '1rem', lineHeight: '1.6' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ marginBottom: '3rem', color: '#ffffff', fontSize: '2.4rem' }}>Creative Leadership</h2>
            <div className="grid-3" style={{ gap: '2rem' }}>
              {leadership.map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#020b4d',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)'
                  }}
                >
                  <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                    <img src={member.image} alt={`${member.name} — ${member.role} at Chanan`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#ffffff' }}>{member.name}</h3>
                  <p style={{ color: '#bfd7ff', fontSize: '0.9rem', fontWeight: 700 }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={onOpenInquiry}
              className="btn-volt"
              style={{
                padding: '0.9rem 2.5rem',
                fontSize: '1rem',
                height: 'auto',
              }}
            >
              <span>Initiate Collaboration</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}

