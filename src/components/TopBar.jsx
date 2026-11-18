import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NoirMenu from './NoirMenu';
import TransitionLink from './TransitionLink';

/**
 * Global header — the logo on the left, and on every screen size a single
 * Menu button on the right that opens the full-screen index.
 */
export default function TopBar({ onOpenInquiry }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [londonTime, setLondonTime] = useState('');
  const router = useRouter();

  useEffect(() => {
    const tick = () => {
      setLondonTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Europe/London',
        }).format(new Date())
      );
    };

    tick();
    const timer = window.setInterval(tick, 30000);
    return () => window.clearInterval(timer);
  }, []);

  // These showcases carry their own navigation and visual treatment.
  if (router && (router.pathname === '/chanan-one' || (router.pathname === '/work/[slug]' && router.query.slug === 'noorakar'))) {
    return null;
  }

  return (
    <>
      <TransitionLink to="/" className="topbar-mark" aria-label="Made by Chanan home">
        <img src="/hero-logo.svg" alt="Made by Chanan" />
      </TransitionLink>

      <div className="topbar-actions">
        <span className="topbar-clock" aria-label={`London time ${londonTime || 'unavailable'}`}>
          <span>{londonTime || '--:--'}</span>
          <span>London</span>
        </span>

        <button
          type="button"
          className="topbar-btn topbar-btn-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <NoirMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenInquiry={onOpenInquiry}
      />
    </>
  );
}
