import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import TransitionLink from './TransitionLink';

const exploreLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Clients', to: '/clients' },
];

const capabilityLinks = [
  { label: 'Websites & UI/UX', to: '/web-design' },
  { label: 'Apps & Product', to: '/web-development' },
  { label: 'Brand & Logos', to: '/branding' },
  { label: 'Motion & 3D', to: '/motion-design' },
];

export default function Footer({ onOpenInquiry }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('hello@madebychanan.com');
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer id="contact" className="footer-landscape-root">
      <img
        className="footer-landscape-art"
        src="/footer-coastal-studio.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <div className="footer-landscape-shade" aria-hidden="true" />

      <div className="footer-landscape-shell">
        <header className="footer-landscape-header">
          <div className="footer-landscape-intro">
            <TransitionLink to="/" className="footer-landscape-brand">
              <span className="footer-landscape-mark">
                <img src="/logo.svg" alt="" aria-hidden="true" />
              </span>
              <span>Made by Chanan</span>
            </TransitionLink>
            <p>
              An independent creative studio making bold brands,
              digital products and experiences that move.
            </p>
          </div>

          <div className="footer-landscape-link-grid">
            <nav className="footer-landscape-column" aria-label="Explore">
              <span>Explore</span>
              {exploreLinks.map((item) => (
                <TransitionLink key={item.label} to={item.to}>{item.label}</TransitionLink>
              ))}
            </nav>

            <nav className="footer-landscape-column" aria-label="Capabilities">
              <span>Capabilities</span>
              {capabilityLinks.map((item) => (
                <TransitionLink key={item.label} to={item.to}>{item.label}</TransitionLink>
              ))}
            </nav>

            <div className="footer-landscape-column footer-landscape-connect">
              <span>Connect</span>
              <a href="mailto:hello@madebychanan.com">Email us</a>
              <button type="button" onClick={onOpenInquiry}>Start a project</button>
              <small>Lisbon · Working worldwide</small>
            </div>
          </div>
        </header>

        <div className="footer-landscape-cta">
          <span className="footer-landscape-eyebrow">Have a good one in mind?</span>
          <h2>
            Let’s make something
            <em>worth remembering.</em>
          </h2>
          <div className="footer-landscape-actions">
            <button type="button" className="footer-landscape-project" onClick={onOpenInquiry}>
              Start a project <ArrowUpRight size={17} />
            </button>
            <button type="button" className="footer-landscape-copy" onClick={handleCopyEmail}>
              {isCopied ? <Check size={15} /> : <Copy size={15} />}
              {isCopied ? 'Email copied' : 'Copy email'}
            </button>
          </div>
        </div>

        <div className="footer-landscape-meta">
          <span>© 2026 Made by Chanan</span>
          <a href="mailto:hello@madebychanan.com">hello@madebychanan.com</a>
          <span>Built with care in Lisbon</span>
        </div>
      </div>
    </footer>
  );
}
