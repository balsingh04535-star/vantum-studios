import React from 'react';
import { ArrowUpRight, Award, Compass, Eye, Shield, Users, Zap } from 'lucide-react';
import Footer from '../components/Footer';

export default function AboutPage({ onOpenInquiry }) {
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

  return (
    <div style={{ paddingTop: '8rem' }}>
      <div className="section-padding dark-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Studio Philosophy</div>
          <h1 style={{ marginBottom: '1.5rem', maxWidth: '950px' }}>
            We Are Vantum Studios. Architects of the Unreal.
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#e4e4e7', maxWidth: '850px', marginBottom: '4rem', lineHeight: '1.7' }}>
            Founded in London and operating globally, Vantum Studios was created to dismantle cookie-cutter web development. We operate as an elite creative laboratory for brands demanding extraordinary digital dominance.
          </p>

          {/* Image Showcase Banner */}
          <div style={{ borderRadius: '24px', overflow: 'hidden', height: '420px', marginBottom: '5rem', border: '1px solid var(--border-subtle)' }}>
            <img src="/img5.jpg" alt="Vantum Studio Lab" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Core Principles Grid */}
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ marginBottom: '3rem' }}>Our Core Directives</h2>
            <div className="grid-2" style={{ gap: '2rem' }}>
              {principles.map((p, idx) => (
                <div key={idx} className="glass-card">
                  <div style={{ fontSize: '1.5rem', color: 'var(--accent-volt)', fontWeight: 800, marginBottom: '0.75rem' }}>
                    0{idx + 1}.
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ marginBottom: '3rem' }}>Creative Leadership</h2>
            <div className="grid-3">
              {leadership.map((member, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                    <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                  <p style={{ color: 'var(--accent-volt)', fontSize: '0.9rem', fontWeight: 500 }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn-volt" onClick={onOpenInquiry} style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem' }}>
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
