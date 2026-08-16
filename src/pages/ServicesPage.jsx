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
    <div style={{ paddingTop: '8rem', backgroundColor: '#bfd7ff', color: '#020b4d', minHeight: '100vh' }}>
      <div className="section-padding" style={{ backgroundColor: '#bfd7ff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: '1px solid #020b4d',
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

          <h1 style={{ marginBottom: '1.5rem', maxWidth: '900px', color: '#020b4d', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'var(--font-heading)' }}>
            Capabilities Built for Digital Visionaries
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#001db8', maxWidth: '800px', marginBottom: '4rem', lineHeight: '1.6', fontWeight: 500 }}>
            We combine high-concept creative direction with uncompromising software engineering. Every line of code is hand-crafted for extreme speed and visual impact.
          </p>

          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '5rem' }}>
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(0, 29, 184, 0.15)',
                  borderRadius: '20px',
                  padding: '3rem',
                  boxShadow: '0 12px 40px rgba(0, 29, 184, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Sparkles size={28} color="#001db8" />
                  <h3 style={{ fontSize: '1.5rem', color: '#020b4d' }}>{cap.title}</h3>
                </div>

                <p style={{ color: '#001db8', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {cap.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(0, 29, 184, 0.15)', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#001db8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Technical Specifications
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                    {cap.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#020b4d', fontWeight: 600 }}>
                        <CheckCircle2 size={16} color="#001db8" /> {f}
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
              background: '#020b4d',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(0, 29, 184, 0.2)'
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
    </div>
  );
}
