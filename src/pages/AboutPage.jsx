import React, { useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';

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
        'description': 'Learn about Chanan, an independent creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences.',
        'url': 'https://www.madebychanan.com/about',
        'mainEntity': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/',
          'logo': 'https://www.madebychanan.com/logo.png',
          'description': 'Independent creative digital agency specialising in web design, branding, 3D product visuals and motion design.'
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
            'name': 'About Chanan',
            'item': 'https://www.madebychanan.com/about'
          }
        ]
      }
    ]
  };

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#eceae4', color: '#111111', minHeight: '100vh' }}>
      <SEO
        title="About Chanan — Independent Creative Digital Agency"
        description="Learn about Chanan, an independent creative digital agency building standout websites, brand identities, 3D product visuals and motion experiences for ambitious brands worldwide."
        canonicalUrl="https://www.madebychanan.com/about"
        ogImage="https://www.madebychanan.com/hero-bg.webp"
        schemaData={aboutSchema}
      />
      <div className="section-padding" style={{ backgroundColor: '#eceae4' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: '1px solid rgba(234, 88, 12, 0.35)',
            backgroundColor: 'rgba(234, 88, 12, 0.08)',
            color: '#ea580c',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            Studio Philosophy
          </div>

          <h1 style={{
            marginBottom: '1.5rem',
            maxWidth: '950px',
            color: '#111111',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.05
          }}>
            We Are Chanan. Architects of the Unreal.
          </h1>

          <p style={{ fontSize: '1.3rem', color: '#52525b', maxWidth: '850px', marginBottom: '4rem', lineHeight: '1.7' }}>
            Operating globally, Chanan was created to dismantle cookie-cutter web development. We operate as an elite creative studio for ambitious brands demanding extraordinary digital presence.
          </p>

          {/* Image Showcase Banner */}
          <div style={{ borderRadius: '24px', overflow: 'hidden', height: '420px', marginBottom: '5rem', border: '1px solid rgba(0,0,0,0.15)', boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}>
            <img
              src="/img5.jpg"
              alt="Chanan Studio Practice"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Core Principles Grid */}
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ marginBottom: '3rem', color: '#111111', fontSize: '2.4rem', fontFamily: 'var(--font-heading)' }}>Our Core Directives</h2>
            <div className="grid-2" style={{ gap: '2rem' }}>
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#e3e0d8',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', color: '#ea580c', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'monospace' }}>
                    0{idx + 1}.
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#111111' }}>{p.title}</h3>
                  <p style={{ color: '#52525b', fontSize: '1rem', lineHeight: '1.6' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ marginBottom: '3rem', color: '#111111', fontSize: '2.4rem', fontFamily: 'var(--font-heading)' }}>Creative Leadership</h2>
            <div className="grid-3" style={{ gap: '2rem' }}>
              {leadership.map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#e3e0d8',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                    <img
                      src={member.image}
                      alt={`${member.name} — ${member.role} at Chanan`}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#111111' }}>{member.name}</h3>
                  <p style={{ color: '#ea580c', fontSize: '0.9rem', fontWeight: 600 }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={onOpenInquiry}
              style={{
                padding: '1.1rem 2.5rem',
                fontSize: '1.1rem',
                background: '#ea580c',
                color: '#ffffff',
                border: 'none',
                borderRadius: '28px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <span>Partner With Our Leadership</span>
              <ArrowUpRight size={20} />
            </button>
          </div>

        </div>
      </div>
      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
