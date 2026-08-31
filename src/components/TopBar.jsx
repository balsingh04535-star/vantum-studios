import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NoirMenu from './NoirMenu';
import TransitionLink from './TransitionLink';

/**
 * Top bar — two floating corner groups rather than a full-width band, so
 * the page art runs edge to edge underneath and the controls read as quiet
 * glass panels sitting on top of it.
 */
export default function TopBar({ onOpenInquiry }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // The Chanan One showcase carries its own chrome
  if (router && router.pathname === '/chanan-one') {
    return null;
  }

  return (
    <>
      <TransitionLink to="/" className="topbar-mark" aria-label="Made by Chanan home">
        <img src="/hero-logo.svg" alt="Made by Chanan" />
      </TransitionLink>

      <div className="topbar-actions">
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
