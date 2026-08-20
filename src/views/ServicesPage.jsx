import React, { useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Layers, Cpu, Palette, Film } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';

export default function ServicesPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    {
      title: 'Real-Time 3D & WebGL Environments',
      link: '/3d-product-animation',
      icon: <Sparkles size={28} color="#bfd7ff" />,
      description: 'Custom shader pipelines, Three.js canvas animations, 3D model optimizers, procedural particle systems.',
      features: ['GPU Acceleration', 'GLSL Custom Shaders', 'Dynamic Camera Math', '60-120 FPS Guarantee']
    },
    {
      title: 'Generative Brand & Visual Identity',
      link: '/branding',
      icon: <Palette size={28} color="#bfd7ff" />,
      description: 'Generative typography systems, motion design guidelines, high-res CGI renders, luxury digital design languages.',
      features: ['Design System Tokens', 'Figma Component Libraries', 'CGI Art Direction', 'Brand Guidelines']
    },
    {
      title: 'Kinetic Web Systems & Development',
      link: '/web-development',
      icon: <Cpu size={28} color="#bfd7ff" />,
      description: 'Modern Vite + React applications, headless CMS integrations, micro-frontend modules, sub-100ms global latency.',
      features: ['Jamstack Architecture', 'Clean URL Routing', 'Edge CDN Deployment', 'Strict TypeScript/JS']
    },
    {
      title: 'Motion Design & Kinetic Physics',
      link: '/motion-design',
      icon: <Film size={28} color="#bfd7ff" />,
      description: 'GSAP ScrollTrigger integrations, Lenis smooth inertia scroll, word-by-word typography reveals, liquid morphing.',
      features: ['Smooth Inertia Scrolling', 'Word/Line Split Animations', 'Hardware Accelerated CSS', 'Touch Support']
    }
  ];

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.madebychanan.com/services#service',
        'name': 'Creative Digital Services & Technical Capabilities | Chanan',
        'description': 'Full-service technical capabilities from Chanan: Bespoke Web Design, WebGL Development, Brand Identity, 3D Product Visuals and Motion Design.',
        'url': 'https://www.madebychanan.com/services',
        'provider': {
          '@type': 'Organization',
          'name': 'Chanan',
          'url': 'https://www.madebychanan.com/'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Agency Capabilities',
          'itemListElement': capabilities.map((cap, idx) => ({
            '@type': 'Offer',
            'position': idx + 1,
            'itemOffered': {
              '@type': 'Service',
              'name': cap.title,
              'description': cap.description,
              'url': `https://www.madebychanan.com${cap.link}`
            }
          }))
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
    <main style={{ paddingTop: '8rem', backgroundColor: '#0002b5', color: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title="Agency Capabilities &amp; Services | Chanan — Web Design, 3D &amp; Motion"
        description="Discover Chanan's full range of creative services: Bespoke Web Design, WebGL 3D Environments, Brand Systems, and Kinetic Motion Development."
        canonicalUrl="https://www.madebychanan.com/services"
        ogType="website"
        schemaData={servicesSchema}
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
            Full Technical Capabilities
          </div>

          <h1 style={{ marginBottom: '1.5rem', maxWidth: '900px', color: '#ffffff', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-heading)' }}>
            Capabilities Built for Digital Visionaries
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#dbe7ff', maxWidth: '800px', marginBottom: '4rem', lineHeight: '1.6', fontWeight: 400 }}>
            We combine high-concept creative direction with uncompromising software engineering. Every line of code is hand-crafted for extreme speed and visual impact.
          </p>

          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '5rem' }}>
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  background: '#020b4d',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '3rem',
                  boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    {cap.icon}
                    <h3 style={{ fontSize: '1.5rem', color: '#ffffff' }}>{cap.title}</h3>
                  </div>

                  <p style={{ color: '#dbe7ff', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                    {cap.description}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#bfd7ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Technical Specifications
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                      {cap.features.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#ffffff', fontWeight: 500 }}>
                          <CheckCircle2 size={16} color="#bfd7ff" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <TransitionLink
                  to={cap.link}
                  className="btn-volt"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    height: 'auto',
                    padding: '0.85rem 1.5rem'
                  }}
                >
                  <span>Explore Discipline</span>
                  <ArrowUpRight size={18} />
                </TransitionLink>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '4rem',
              textAlign: 'center',
              background: '#020b4d',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
            }}
          >
            <h2 style={{ marginBottom: '1rem', color: '#ffffff', fontSize: '2.2rem' }}>Ready to Elevate Your Digital Architecture?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', color: '#dbe7ff', fontSize: '1.05rem' }}>
              Our engineering team responds to project inquiries within 24 hours. Reserve your production slot.
            </p>
            <button
              onClick={onOpenInquiry}
              className="btn-volt"
              style={{
                margin: '0 auto',
                fontSize: '1rem',
                padding: '0.9rem 2.5rem',
                height: 'auto',
              }}
            >
              <span>Book Capabilities Session</span>
              <ArrowUpRight size={18} />
            </button>
          </div>

        </div>
      </div>
      <Footer onOpenInquiry={onOpenInquiry} />
    </main>
  );
}

