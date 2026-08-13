import React, { useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

export default function ServicesPage({ onOpenInquiry }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    {
      title: 'Real-Time 3D & WebGL Environments',
      description: 'Custom shader pipelines, three.js canvas animations, 3D model optimizers, procedural particle systems.',
      features: ['GPU Acceleration', 'GLSL Custom Shaders', 'Dynamic Camera Math', '60-120 FPS Guarantee']
    },
    {
      title: 'Generative Brand & Visual Identity',
      description: 'Generative typography systems, motion design guidelines, high-res CGI renders, luxury digital design languages.',
      features: ['Design System Tokens', 'Figma Component Libraries', 'CGI Art Direction', 'Brand Guidelines']
    },
    {
      title: 'Kinetic Web Systems & Architecture',
      description: 'Modern Vite + React applications, headless CMS integrations, micro-frontend modules, sub-100ms global latency.',
      features: ['Jamstack Architecture', 'Clean URL Routing', 'Edge CDN Deployment', 'Strict TypeScript/JS']
    },
    {
      title: 'Performance & Kinetic Motion Engineering',
      description: 'GSAP ScrollTrigger integrations, Lenis smooth inertia scroll, word-by-word typography reveals, liquid morphing.',
      features: ['Smooth Inertia Scrolling', 'Word/Line Split Animations', 'Hardware Accelerated CSS', 'Touch Support']
    }
  ];

  return (
    <div style={{ paddingTop: '8rem', backgroundColor: '#0a120e', color: '#f8fafc', minHeight: '100vh' }}>
      <div className="section-padding" style={{ backgroundColor: '#0a120e' }}>
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

          <h1 style={{ marginBottom: '1.5rem', maxWidth: '900px', color: '#f8fafc', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-heading)' }}>
            Capabilities Built for Digital Visionaries
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '800px', marginBottom: '4rem', lineHeight: '1.6' }}>
            We combine high-concept creative direction with uncompromising software engineering. Every line of code is hand-crafted for extreme speed and visual impact.
          </p>

          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '5rem' }}>
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(180deg, #111e17 0%, #0a120e 100%)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  borderRadius: '20px',
                  padding: '3rem',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Sparkles size={28} color="#fbbf24" />
                  <h3 style={{ fontSize: '1.5rem', color: '#f8fafc' }}>{cap.title}</h3>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {cap.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Technical Specifications
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                    {cap.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                        <CheckCircle2 size={16} color="#fbbf24" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '4rem',
              textAlign: 'center',
              background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.08) 0%, rgba(17, 30, 23, 0.9) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '24px'
            }}
          >
            <h2 style={{ marginBottom: '1rem', color: '#f8fafc', fontSize: '2.2rem' }}>Ready to Elevate Your Digital Architecture?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', color: '#94a3b8', fontSize: '1.05rem' }}>
              Our engineering team responds to project inquiries within 24 hours. Reserve your production slot.
            </p>
            <button
              onClick={onOpenInquiry}
              style={{
                margin: '0 auto',
                fontSize: '1.1rem',
                padding: '1.1rem 2.5rem',
                background: '#fbbf24',
                color: '#0a120e',
                border: 'none',
                borderRadius: '28px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
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
