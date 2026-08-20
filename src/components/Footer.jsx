import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send, PhoneCall } from 'lucide-react';
import TransitionLink from './TransitionLink';

export default function Footer({ onOpenInquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('DESIGN/WORK');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const categories = ['SENIOR ROLE', 'CONTRACT', 'DESIGN/WORK', 'OTHER'];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@madebychanan.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '981806c7-87b7-42d7-894b-2bf20a957760';
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          category: selectedCategory,
          message: note,
          subject: `⚡ New Agency Inquiry from ${name} [${selectedCategory}]`
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setNote('');
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        setSubmitError(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="breedlove-footer-root">
      
      {/* ── Top Ticker Status Bar ── */}
      <div className="breedlove-ticker-bar">
        <span>CURRENTLY REMOTE-FIRST</span>
        <span className="dot">·</span>
        <span>51.5074° N, 0.1278° W</span>
        <span className="dot">·</span>
        <span>2026 ACCEPTING INQUIRIES</span>
        <span className="dot">·</span>
        <span>OPEN: HIGH-END WEBGL & BRAND SYSTEMS</span>
        <span className="dot">·</span>
        <span>TECH-LEAD DESIGN PRACTICE</span>
      </div>

      {/* ── Main Centered Floating Container Card ── */}
      <div className="breedlove-container-card">
        
        {/* Header Tags */}
        <div className="card-top-meta">
          <span className="meta-left">05 / CONTACT & AVAILABILITY</span>
          <span className="meta-right">VOL. 06 / '26</span>
        </div>

        {/* Main Headline */}
        <h2 className="breedlove-headline">
          Let's build <br />
          <span className="headline-serif-italic">something good.</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p className="breedlove-subtext">
          Open to high-impact web design, WebGL, & tech-lead projects where craft and ownership matter. Available for global or remote-first engagements in 2026. Reply within 24h.
        </p>

        {/* ── Single Interactive Inquiry Card ── */}
        <div className="breedlove-grid">
          
          {/* § SEND A NOTE */}
          <div className="breedlove-inner-card">
            <div className="inner-card-header">
              <span className="inner-title">§ SEND A NOTE</span>
              <span className="inner-sub">DIRECT SUBMISSION</span>
            </div>

            {/* Category Pills */}
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`pill-btn ${selectedCategory === cat ? 'is-selected' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="breedlove-form">
              <div className="form-row-2">
                <div className="input-group">
                  <label>NAME</label>
                  <input
                    type="text"
                    placeholder="Your name or company..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    placeholder="your@email.com..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>NOTE</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the role, team, and what vision you want us leading..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
              </div>

              {submitError && (
                <div style={{ fontSize: '0.8rem', color: '#ff4d4d', fontFamily: 'monospace', margin: '0.2rem 0' }}>
                  {submitError}
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="form-actions">
                <button type="submit" disabled={isSubmitting} className="action-btn btn-dark" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                  <span>{isSubmitting ? 'SENDING...' : isSubmitted ? 'SENT TO INBOX!' : 'SEND MESSAGE'}</span>
                  {isSubmitted ? <Check size={14} /> : <Send size={14} />}
                </button>

                <button type="button" onClick={onOpenInquiry} className="action-btn btn-light">
                  <span>BOOK A CALL</span>
                  <ArrowUpRight size={14} />
                </button>

                <button type="button" onClick={handleCopyEmail} className="action-btn btn-light">
                  <span>{isCopied ? 'COPIED!' : 'COPY EMAIL'}</span>
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* ── High-Authority SEO Directory & Internal Link Silo ── */}
        <nav className="footer-seo-directory" aria-label="Footer Directory Navigation">
          <div className="seo-col">
            <h4 className="seo-col-title">Core Disciplines</h4>
            <ul className="seo-link-list">
              <li><TransitionLink to="/web-design">Bespoke Web Design &amp; UI/UX</TransitionLink></li>
              <li><TransitionLink to="/web-development">WebGL &amp; Three.js Development</TransitionLink></li>
              <li><TransitionLink to="/branding">Generative Brand Identity Systems</TransitionLink></li>
              <li><TransitionLink to="/3d-product-animation">3D Product Animation &amp; CGI</TransitionLink></li>
              <li><TransitionLink to="/motion-design">Kinetic Motion &amp; GSAP Physics</TransitionLink></li>
            </ul>
          </div>

          <div className="seo-col">
            <h4 className="seo-col-title">Selected Case Studies</h4>
            <ul className="seo-link-list">
              <li><TransitionLink to="/work/lumina">Lumina — Spatial WebGL OS</TransitionLink></li>
              <li><TransitionLink to="/work/moodtalk">MoodTalk — AI Command Center</TransitionLink></li>
              <li><TransitionLink to="/work/amplo">Amplo — Brand Architecture</TransitionLink></li>
              <li><TransitionLink to="/work/aurelis">Aurelis — 3D Skincare Platform</TransitionLink></li>
              <li><TransitionLink to="/work/data-jungle">Data Jungle — Telemetry Engine</TransitionLink></li>
              <li><TransitionLink to="/work/voltaria">Voltaria — Magnetic Hardware</TransitionLink></li>
            </ul>
          </div>

          <div className="seo-col">
            <h4 className="seo-col-title">Studio Hubs</h4>
            <ul className="seo-link-list">
              <li><TransitionLink to="/">Studio Overview &amp; Manifesto</TransitionLink></li>
              <li><TransitionLink to="/work">Archive of Selected Work</TransitionLink></li>
              <li><TransitionLink to="/services">Technical Capabilities Matrix</TransitionLink></li>
              <li><TransitionLink to="/about">Studio Philosophy &amp; Leadership</TransitionLink></li>
              <li><TransitionLink to="/clients">Global Client Spatial Network</TransitionLink></li>
              <li><TransitionLink to="/contact">Direct Inquiry &amp; Availability</TransitionLink></li>
            </ul>
          </div>

          <div className="seo-col">
            <h4 className="seo-col-title">Agency Coordinates</h4>
            <p className="seo-coord-text">
              <strong>HQ:</strong> 140 Soho Square, London W1D 3QN, United Kingdom<br />
              <strong>Global:</strong> Remote-first partner network across New York, San Francisco, Tokyo, Zurich.<br />
              <strong>Direct:</strong> hello@madebychanan.com
            </p>
            <div className="seo-copyright">
              © 2026 Chanan Creative Digital Agency.<br />All rights reserved. Zero template guarantee.
            </div>
          </div>
        </nav>

      </div>

      {/* ── Giant Full-Bleed Brand Signature Hero SVG Logo at Very Bottom (4X Scale) ── */}
      <div className="breedlove-giant-brand">
        <img
          src="/hero-logo.svg"
          alt="Chanan — Creative Digital Agency"
          style={{
            width: '100vw',
            maxWidth: 'none',
            height: 'auto',
            maxHeight: '85vh',
            objectFit: 'contain',
            transform: 'scale(1.35)',
            transformOrigin: 'center center',
            filter: 'brightness(0) invert(1) drop-shadow(0 10px 40px rgba(255,255,255,0.12))'
          }}
        />
      </div>
    </footer>
  );
}

