import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import NoirMenu from './NoirMenu';

export default function Navigation({ onOpenInquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className={`navbar-fixed ${scrolled ? 'navbar-scrolled' : ''}`}>
        {/* Placeholder space for floating hero logo target */}
        <div className="nav-logo-space" />

        {/* Desktop Links */}
        <nav className="nav-links desktop-only">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn-volt" onClick={onOpenInquiry}>
            <span>Start a Project</span>
            <ArrowUpRight size={18} />
          </button>

          {/* Noir Mode Menu Toggle Pill */}
          <button
            className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            aria-label="Toggle Menu"
          >
            <span className="menu-toggle-text">
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <span className="menu-toggle-icon">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </header>

      {/* Noir Mode Menu Overlay */}
      <NoirMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
