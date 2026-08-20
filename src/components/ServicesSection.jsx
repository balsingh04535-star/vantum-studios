import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight, Cpu, Layers, Sparkles, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection({ onOpenInquiry }) {
  const [openIndex, setOpenIndex] = useState(0);

  const services = [
    {
      title: '01. Interactive 3D & Kinetic Web',
      icon: <Sparkles size={24} color="var(--accent-volt)" />,
      shortDesc: 'WebGL, Three.js, and GSAP scroll experiences that transform flat sites into living 3D environments.',
      fullDesc: 'We construct custom shader pipelines, hardware-accelerated 3D models, and scroll-driven camera trajectories. Every interaction feels instantaneous and fluid at 120fps.',
      tech: ['Three.js', 'WebGL / WebGPU', 'GSAP ScrollTrigger', 'GLSL Shaders', 'Lenis Smooth Scroll']
    },
    {
      title: '02. Brand Direction & Generative Visual Systems',
      icon: <Layers size={24} color="var(--accent-volt)" />,
      shortDesc: 'Generative typography, synthetic brand assets, and spatial design languages for ambitious visionaries.',
      fullDesc: 'We craft complete visual identities built for the digital age. From dynamic vector logos to AI-assisted promotional motion clips, we define how your brand communicates authority.',
      tech: ['Design Tokens', 'Generative Motion', 'Figma Design Systems', 'CGI Asset Pipelines']
    },
    {
      title: '03. Headless Web Systems & Architecture',
      icon: <Code2 size={24} color="var(--accent-volt)" />,
      shortDesc: 'High-speed React, Vite, and Next.js applications with sub-100ms global response times.',
      fullDesc: 'Our engineering stack leverages modern Jamstack architecture, clean routing without messy file extensions, global CDN edge caching, and bulletproof security infrastructure.',
      tech: ['React / Vite', 'Next.js', 'Tailwind / Vanilla CSS', 'Node.js Edge', 'Vercel / Cloudflare']
    },
    {
      title: '04. Product Strategy & Conversion Optimization',
      icon: <Cpu size={24} color="var(--accent-volt)" />,
      shortDesc: 'Data-driven UI/UX design structured to maximize user engagement and high-ticket sales.',
      fullDesc: 'Aesthetic excellence backed by behavioral psychology. We structure user journeys that minimize drop-off, amplify conversion metrics, and retain user attention.',
      tech: ['UX Architecture', 'Funnel Analytics', 'A/B Test Design', 'Micro-Interactions']
    }
  ];

  return (
    <section className="section-padding alt-section" id="services">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ marginBottom: '4rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>Capabilities</div>
          <h2>Engineering Digital Supremacy</h2>
        </div>

        {/* Services Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card"
                style={{
                  borderColor: isOpen ? 'var(--accent-volt)' : 'var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div
                  className="accordion-header"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {service.icon}
                    <h3 style={{ fontSize: '1.6rem' }}>{service.title}</h3>
                  </div>

                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--accent-volt)' : 'rgba(255,255,255,0.06)',
                    color: isOpen ? '#000' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    {service.shortDesc}
                  </p>
                </div>

                {isOpen && (
                  <div className="accordion-body" style={{ animation: 'fadeIn 0.3s ease' }}>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: '#e4e4e7' }}>
                      {service.fullDesc}
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-volt)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Technologies & Standards
                      </span>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                        {service.tech.map((t, idx) => (
                          <span key={idx} style={{
                            background: 'rgba(196, 214, 0, 0.1)',
                            border: '1px solid var(--border-highlight)',
                            color: '#fff',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem'
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="btn-volt" onClick={onOpenInquiry} style={{ marginTop: '0.5rem' }}>
                      <span>Book Service Consultation</span>
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link to="/services" className="btn-glass">
            <span>View Full Engineering Spectrum</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
