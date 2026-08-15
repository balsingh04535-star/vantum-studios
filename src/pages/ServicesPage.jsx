import React, { useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Code2, Palette, Box, Film, Compass } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';

export default function ServicesPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    {
      slug: 'web-design',
      title: 'Web Design & UX/UI Flagships',
      path: '/web-design',
      icon: Compass,
      description: 'Bespoke interface design, narrative visual pacing, spatial compositions, and luxury digital flagship stores built to convert.',
      features: ['Editorial UX/UI Architecture', 'Luxury E-Commerce Flagships', 'Micro-Interaction Choreography', 'Responsive Design Systems']
    },
    {
      slug: 'web-development',
      title: 'Creative Web Development & WebGL',
      path: '/web-development',
      icon: Code2,
      description: 'Custom GLSL shader pipelines, Three.js 3D spatial viewports, GSAP ScrollTrigger timelines, and sub-100ms global latency.',
      features: ['Custom GLSL Shaders', 'Three.js & Canvas Systems', '120 FPS Frame Budget Guarantee', 'Modern React & Vite Architectures']
    },
    {
      slug: 'branding',
      title: 'Brand Identity & Strategy',
      path: '/branding',
      icon: Palette,
      description: 'Distinctive visual identities, generative typography systems, art direction, and digital brand execution for ambitious global brands.',
      features: ['Generative Vector Guidelines', 'Bespoke Typographic Systems', 'Digital Brand Hubs', 'Packaging & Spatial Identity']
    },
    {
      slug: '3d-product-animation',
      title: '3D Product Animation & CGI Studio',
      path: '/3d-product-animation',
      icon: Box,
      description: 'Photorealistic 3D product films, real-time WebGL configurators, PBR material simulation, and monumental launch campaign renders.',
      features: ['PBR Physically-Based Materials', 'Real-Time 3D Configurators', 'Draco Mesh Geometry Compression', 'Cinematic Camera Choreography']
    },
    {
      slug: 'motion-design',
      title: 'Motion Design & Kinetic Systems',
      path: '/motion-design',
      icon: Film,
      description: 'Kinetic typography, signature logo reveals, variable font choreographies, and hardware-accelerated UI motion systems.',
      features: ['Kinetic Typography Systems', 'UI Motion Choreography', 'Brand Launch & Teaser Films', 'Hardware Accelerated CSS/JS']
    }
  ];

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.madebychanan.com/services#service',
        'name': 'Creative Agency Capabilities — Chanan',
        'description': 'Full creative capabilities across web design, creative development, branding, 3D product animation, and motion design.',
        'provider': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/',
          'logo': 'https://www.madebychanan.com/logo.png'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.madebychanan.com/services#breadcrumb',
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
            'name': 'Services',
            'item': 'https://www.madebychanan.com/services'
          }
        ]
      }
    ]
  };

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#070709', color: '#f8fafc', minHeight: '100vh' }}>
      <SEO
        title="Agency Capabilities — Web Design, 3D Graphics & Motion | Chanan"
        description="Discover Chanan's core capabilities: bespoke web design, WebGL 3D spatial environments, kinetic brand identities, and ultra-high-speed web systems."
        canonicalUrl="https://www.madebychanan.com/services"
        ogImage="https://www.madebychanan.com/hero-bg.webp"
        schemaData={servicesSchema}
      />
      <div className="section-padding" style={{ backgroundColor: '#070709' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: '1px solid rgba(251, 191, 36, 0.35)',
            backgroundColor: 'rgba(251, 191, 36, 0.08)',
            color: '#fbbf24',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            Full Technical Capabilities
          </div>

          <h1 style={{
            marginBottom: '1.5rem',
            maxWidth: '900px',
            color: '#f8fafc',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.05
          }}>
            Capabilities Built for Digital Visionaries
          </h1>

          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '800px', marginBottom: '4rem', lineHeight: '1.6' }}>
            We combine high-concept creative direction with uncompromising software engineering. Every line of code and pixel is hand-crafted for extreme speed and visual impact.
          </p>

          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '5rem' }}>
            {capabilities.map((cap, idx) => {
              const IconComponent = cap.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(180deg, #111218 0%, #070709 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '3rem',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ background: 'rgba(251, 191, 36, 0.12)', padding: '0.6rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComponent size={24} color="#fbbf24" />
                      </div>
                      <h2 style={{ fontSize: '1.45rem', color: '#f8fafc', margin: 0, fontFamily: 'var(--font-heading)' }}>
                        {cap.title}
                      </h2>
                    </div>

                    <p style={{ color: '#94a3b8', fontSize: '1.02rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                      {cap.description}
                    </p>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.85rem' }}>
                        Specialized Deliverables
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                        {cap.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                            <CheckCircle2 size={15} color="#fbbf24" /> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <TransitionLink
                    to={cap.path}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#fbbf24',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      padding: '0.6rem 0',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>Explore {cap.title.split('&')[0].trim()}</span>
                    <ArrowUpRight size={16} />
                  </TransitionLink>
                </div>
              );
            })}
          </div>

          <div
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.08) 0%, rgba(17, 18, 24, 0.9) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '24px'
            }}
          >
            <h2 style={{ marginBottom: '1rem', color: '#f8fafc', fontSize: '2.2rem', fontFamily: 'var(--font-heading)' }}>
              Ready to Build Something Remarkable?
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Our executive team responds to qualified inquiries within 24 hours. Reserve a production window for your next initiative.
            </p>
            <button
              onClick={onOpenInquiry}
              style={{
                margin: '0 auto',
                fontSize: '1.05rem',
                padding: '1.1rem 2.5rem',
                background: '#fbbf24',
                color: '#0a120e',
                border: 'none',
                borderRadius: '28px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <span>Book Capabilities Session</span>
              <ArrowUpRight size={20} />
            </button>
          </div>

        </div>
      </div>
      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
