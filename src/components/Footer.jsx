import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Mail, MapPin, Sparkles } from 'lucide-react';

export default function Footer({ onOpenInquiry }) {
  const [times, setTimes] = useState({
    london: '',
    newYork: '',
    tokyo: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        london: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        newYork: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        tokyo: now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer-wrap">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* World Clocks Bar */}
        <div className="grid-3" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '3rem', marginBottom: '4rem' }}>
          <div className="clock-item">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>London — HQ</span>
            <span className="clock-time">{times.london || '12:00:00'}</span>
          </div>
          <div className="clock-item">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>New York — Studio</span>
            <span className="clock-time">{times.newYork || '07:00:00'}</span>
          </div>
          <div className="clock-item">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tokyo — Lab</span>
            <span className="clock-time">{times.tokyo || '20:00:00'}</span>
          </div>
        </div>

        {/* Big Call to Action */}
        <div style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span className="badge" style={{ marginBottom: '1rem' }}>Have a bold vision?</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', maxWidth: '700px' }}>
              Let’s create something unreal together.
            </h2>
          </div>

          <button className="btn-volt" onClick={onOpenInquiry} style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
            <span>Initiate Project Inquiry</span>
            <ArrowUpRight size={22} />
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid-3" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '3rem', marginBottom: '3rem' }}>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#fff' }}>Sitemap</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/" className="nav-link" style={{ fontSize: '0.95rem' }}>Home</Link>
              <Link to="/work" className="nav-link" style={{ fontSize: '0.95rem' }}>Work Showcase</Link>
              <Link to="/services" className="nav-link" style={{ fontSize: '0.95rem' }}>Capabilities & Specs</Link>
              <Link to="/about" className="nav-link" style={{ fontSize: '0.95rem' }}>Studio Philosophy</Link>
              <Link to="/contact" className="nav-link" style={{ fontSize: '0.95rem' }}>Direct Contact</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#fff' }}>Direct Channels</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--accent-volt)" /> hello@vantumstudios.com
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--accent-volt)" /> 140 Soho Square, London W1D 3QN
              </p>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#fff' }}>Stay Synchronized</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              Subscribe to our quarterly dispatch on kinetic web engineering and generative digital art.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="email" placeholder="enter your email..." className="form-input" style={{ flex: 1, padding: '0.6rem 1rem' }} />
              <button className="btn-volt" style={{ padding: '0.6rem 1rem' }}>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <div>
            &copy; {new Date().getFullYear()} Vantum Studios Ltd. All rights reserved. Clean URLs standard active.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Engagement</span>
            <span>Security Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
