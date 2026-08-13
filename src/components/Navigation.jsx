import React, { useState } from 'react';
import NoirMenu from './NoirMenu';
import TransitionLink from './TransitionLink';

export default function Navigation({ onOpenInquiry }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Global Fixed Chanan Brand Logo (Always visible on every page at top left) */}
      <TransitionLink
        to="/"
        aria-label="Chanana Studios Home"
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '2rem',
          zIndex: 100,
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          pointerEvents: 'auto',
          transition: 'transform 0.3s ease',
        }}
      >
        <img
          src="/hero-logo.svg"
          alt="Chanana Studios"
          style={{
            height: '36px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 14px rgba(0,0,0,0.7))'
          }}
        />
      </TransitionLink>
      {/* Floating Monochromatic Menu Pill Button */}
      <button
        className={`floating-menu-trigger ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type="button"
        aria-label="Toggle Navigation Menu"
        style={{
          position: 'fixed',
          top: '1.75rem',
          right: '2rem',
          zIndex: 100,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 6px 6px 16px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(8, 8, 12, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#ffffff'
        }}>
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </span>
        <span className="menu-burger" style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          background: 'rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span style={{
            width: '13px',
            height: '2px',
            background: '#ffffff',
            borderRadius: '999px',
            transition: 'all 0.25s ease',
            transform: isMenuOpen ? 'translateY(3px) rotate(45deg)' : 'none'
          }} />
          <span style={{
            width: '13px',
            height: '2px',
            background: '#ffffff',
            borderRadius: '999px',
            transition: 'all 0.25s ease',
            transform: isMenuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none'
          }} />
        </span>
      </button>

      {/* Full Overlay Menu Drawer */}
      <NoirMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onOpenInquiry={onOpenInquiry} />
    </>
  );
}
