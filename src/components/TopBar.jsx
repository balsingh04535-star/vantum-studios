import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NoirMenu from './NoirMenu';
import TransitionLink from './TransitionLink';

const DESKTOP_NAV = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Clients', path: '/clients' },
  { label: 'Contact', path: '/contact' },
];

const SERVICE_ROUTES = new Set([
  '/branding',
  '/web-design',
  '/web-development',
  '/motion-design',
  '/3d-product-animation',
]);

function isActiveRoute(pathname, path) {
  if (path === '/work') {
    return pathname === path || pathname.startsWith('/work/');
  }

  if (path === '/services') {
    return pathname === path || SERVICE_ROUTES.has(pathname);
  }

  return pathname === path;
}

/**
 * Global header — an exposed desktop index, with the full-screen menu kept
 * for smaller viewports where the same links cannot fit comfortably.
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

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeMobileMenu = (event) => {
      if (event.matches) setIsMenuOpen(false);
    };

    desktop.addEventListener('change', closeMobileMenu);
    return () => desktop.removeEventListener('change', closeMobileMenu);
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

      <nav className="topbar-desktop-nav" aria-label="Primary navigation">
        {DESKTOP_NAV.map((item) => {
          const isActive = isActiveRoute(router.pathname, item.path);

          return (
            <TransitionLink
              key={item.path}
              to={item.path}
              className={`topbar-nav-link${isActive ? ' is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </TransitionLink>
          );
        })}
      </nav>

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

        <button
          type="button"
          className="topbar-btn topbar-btn-icon"
          onClick={onOpenInquiry}
          aria-label="Start a project"
        >
          <span className="topbar-dots" aria-hidden="true">
            <i /><i /><i /><i />
          </span>
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
