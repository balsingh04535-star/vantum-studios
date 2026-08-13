import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import NoirMenu from './NoirMenu';
import TransitionLink from './TransitionLink';

export default function Navigation({ onOpenInquiry }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Scroll Physics:
      // 0 - 20px: Initial full pill state (progress = 0)
      // 20px - 180px: Continuous morphing contraction (progress = 0 -> 1)
      // > 180px: Fully compressed compact floating capsule (progress = 1)
      const p = Math.min(1, Math.max(0, (y - 20) / 160));
      targetProgress.current = p;
    };

    const updateLoop = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgress.current += diff * 0.14; // Smooth 60fps inertia lerp
        setScrollProgress(currentProgress.current);
      } else if (currentProgress.current !== targetProgress.current) {
        currentProgress.current = targetProgress.current;
        setScrollProgress(targetProgress.current);
      }
      rafId.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'Network', path: '/clients' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const p = scrollProgress;

  // Interpolated visual tokens
  const topOffset = 24 - p * 8; // 24px -> 16px
  const paddingLeft = 20 - p * 12; // 20px -> 8px
  const paddingRight = 10 - p * 2; // 10px -> 8px
  const paddingTop = 8 - p * 3; // 8px -> 5px
  const paddingBottom = 8 - p * 3; // 8px -> 5px
  const gap = 20 - p * 14; // 20px -> 6px

  const linksOpacity = Math.max(0, 1 - p * 1.5);
  const linksMaxWidth = Math.max(0, 440 * (1 - p * 1.1));

  const ctaOpacity = Math.max(0, 1 - p * 1.6);
  const ctaMaxWidth = Math.max(0, 160 * (1 - p * 1.2));

  const dividerOpacity = Math.max(0, 1 - p * 1.8);

  const statusOpacity = Math.max(0, 1 - p * 1.6);
  const statusMaxWidth = Math.max(0, 85 * (1 - p * 1.2));

  const menuMinWidth = 125 - p * 35; // 125px -> 90px

  const isClientsRoute = location.pathname === '/clients';

  return (
    <>
      <header
        className="nav-dock"
        style={{
          opacity: isClientsRoute ? 0 : 1,
          pointerEvents: isClientsRoute ? 'none' : 'auto',
          transition: 'opacity 0.3s ease',
          top: `${topOffset}px`,
          paddingLeft: `${paddingLeft}px`,
          paddingRight: `${paddingRight}px`,
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          gap: `${gap}px`,
          boxShadow: `0 ${20 + p * 10}px ${50 + p * 15}px -10px rgba(0, 0, 0, ${0.8 + p * 0.15}), inset 0 1.5px 1px 0 rgba(255, 255, 255, ${0.35 + p * 0.15}), 0 0 ${30 + p * 15}px rgba(196, 214, 0, ${0.06 + p * 0.18})`,
          borderColor: `rgba(255, 255, 255, ${0.18 + p * 0.22})`,
          background: p > 0.5 
            ? `linear-gradient(135deg, rgba(255, 255, 255, ${0.14 + p * 0.04}) 0%, rgba(12, 12, 18, 0.94) 100%)`
            : `linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 40%, rgba(10, 10, 15, 0.75) 100%)`
        }}
      >
        {/* Left: Brand Logo Mark */}
        <TransitionLink to="/" className="nav-dock-brand" aria-label="Chanana Studios Home">
          <img src="/logo-mark.svg" alt="Chanana Studios Logo" className="nav-dock-logo-mark" />
        </TransitionLink>

        {/* Left Divider */}
        <div
          className="nav-dock-divider desktop-only"
          style={{
            opacity: dividerOpacity,
            maxWidth: dividerOpacity > 0.05 ? '1px' : '0px',
            margin: `0 ${6 * (1 - p)}px`,
            transition: 'none'
          }}
        />

        {/* Center: Desktop Navigation Links */}
        <nav
          className="nav-dock-links desktop-only"
          style={{
            opacity: linksOpacity,
            maxWidth: `${linksMaxWidth}px`,
            transform: `scale(${1 - p * 0.12}) translateY(${p * -3}px)`,
            pointerEvents: p > 0.4 ? 'none' : 'auto',
            whiteSpace: 'nowrap',
            transition: 'none'
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <TransitionLink
                key={item.path}
                to={item.path}
                className={`nav-dock-item ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </TransitionLink>
            );
          })}
        </nav>

        {/* Right Divider */}
        <div
          className="nav-dock-divider desktop-only"
          style={{
            opacity: dividerOpacity,
            maxWidth: dividerOpacity > 0.05 ? '1px' : '0px',
            margin: `0 ${6 * (1 - p)}px`,
            transition: 'none'
          }}
        />

        {/* Right: Actions */}
        <div className="nav-dock-actions">
          <button
            className="nav-dock-cta"
            onClick={onOpenInquiry}
            style={{
              opacity: ctaOpacity,
              maxWidth: `${ctaMaxWidth}px`,
              paddingLeft: `${18 * Math.max(0, 1 - p)}px`,
              paddingRight: `${18 * Math.max(0, 1 - p)}px`,
              marginRight: `${6 * Math.max(0, 1 - p)}px`,
              pointerEvents: p > 0.4 ? 'none' : 'auto',
              transition: 'none'
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            className={`nav-dock-menu ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            aria-label="Toggle Navigation Menu"
            style={{
              minWidth: `${menuMinWidth}px`,
              transition: 'background 0.3s ease, border-color 0.3s ease'
            }}
          >
            <span className="menu-text">{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
            <span className="menu-burger">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* Overlay Menu from code (26)\files */}
      <NoirMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onOpenInquiry={onOpenInquiry} />
    </>
  );
}
