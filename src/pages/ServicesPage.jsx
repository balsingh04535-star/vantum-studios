import React from 'react';
import { ArrowUpRight, CheckCircle2, Cpu, Globe, Layers, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Footer from '../components/Footer';

export default function ServicesPage({ onOpenInquiry }) {
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
    <div style={{ paddingTop: '8rem' }}>
      <div className="section-padding dark-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Full Technical Capabilities</div>
          <h1 style={{ marginBottom: '1.5rem', maxWidth: '900px' }}>
            Capabilities Built for Digital Visionaries
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '4rem' }}>
            We combine high-concept creative direction with uncompromising software engineering. Every line of code is hand-crafted for extreme speed and visual impact.
          </p>

          <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '5rem' }}>
            {capabilities.map((cap, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Sparkles size={28} color="var(--accent-volt)" />
                  <h3 style={{ fontSize: '1.5rem' }}>{cap.title}</h3>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {cap.description}
                </p>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-volt)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Technical Specifications
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                    {cap.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#e4e4e7' }}>
                        <CheckCircle2 size={16} color="var(--accent-volt)" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', background: 'linear-gradient(180deg, rgba(196, 214, 0, 0.05) 0%, rgba(15, 15, 15, 0.8) 100%)', borderColor: 'var(--border-highlight)' }}>
            <h2 style={{ marginBottom: '1rem' }}>Ready to Elevate Your Digital Architecture?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', color: 'var(--text-secondary)' }}>
              Our engineering team responds to project inquiries within 24 hours. Reserve your production slot.
            </p>
            <button className="btn-volt" onClick={onOpenInquiry} style={{ margin: '0 auto', fontSize: '1.1rem', padding: '1.1rem 2.5rem' }}>
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
