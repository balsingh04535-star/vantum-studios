import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import TransitionLink from './TransitionLink';

const capabilities = [
  { label: 'Websites & UI/UX', to: '/web-design' },
  { label: 'Apps & Product', to: '/web-development' },
  { label: 'Brand & Logos', to: '/branding' },
  { label: 'Motion & 3D', to: '/motion-design' },
  { label: 'Automations', to: '/services' },
];

const studioLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer({ onOpenInquiry }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('hello@madebychanan.com');
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer id="contact" className="breedlove-footer-root footer-editorial-root">
      <div className="footer-editorial-stage">
        <header className="footer-editorial-header">
          <TransitionLink to="/" className="footer-editorial-brand">
            <img src="/logo.svg" alt="" aria-hidden="true" />
            <span>Made by Chanan</span>
          </TransitionLink>

          <nav className="footer-editorial-nav" aria-label="Footer navigation">
            {studioLinks.map((item) => (
              <TransitionLink key={item.label} to={item.to}>{item.label}</TransitionLink>
            ))}
          </nav>

          <button type="button" className="footer-round-cta" onClick={onOpenInquiry} aria-label="Start a project">
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </button>
        </header>

        <div className="footer-editorial-copy">
          <span className="footer-editorial-kicker">Independent creative studio</span>
          <h2 className="footer-editorial-title">
            <strong>Welcome to the</strong>
            <em>new generation of</em>
            <strong className="footer-editorial-title-last">digital craft.</strong>
          </h2>
          <p>
            We design <strong>distinctive digital experiences</strong>—websites, apps,
            identities and automations—for ambitious teams that care about how
            their ideas feel in the world.
          </p>
          <div className="footer-editorial-actions">
            <button type="button" className="footer-project-button" onClick={onOpenInquiry}>
              Start a project <ArrowUpRight size={16} />
            </button>
            <button type="button" className="footer-email-button" onClick={handleCopyEmail}>
              {isCopied ? <Check size={15} /> : <Copy size={15} />}
              {isCopied ? 'Email copied' : 'Copy our email'}
            </button>
          </div>
        </div>

        <nav className="footer-editorial-services" aria-label="Creative services">
          <span className="footer-services-rule" />
          <span className="footer-services-label">What we do</span>
          {capabilities.map((item) => (
            <TransitionLink key={item.label} to={item.to}>{item.label}</TransitionLink>
          ))}
        </nav>

        <div className="footer-sun-doodle" aria-hidden="true">
          <span />
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>

        <img
          className="footer-editorial-plant"
          src="/footer-plant-yellow.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="footer-editorial-skater"
          src="/footer-skater-blue-v2.png"
          alt="A playful creative carrying a laptop while skateboarding"
        />
        <span className="footer-skate-trail" aria-hidden="true">⌁</span>

        <div className="footer-editorial-ground" aria-hidden="true" />
        <div className="footer-editorial-meta">
          <span>© 2026 Made by Chanan</span>
          <a href="mailto:hello@madebychanan.com">hello@madebychanan.com</a>
        </div>
      </div>
    </footer>
  );
}
