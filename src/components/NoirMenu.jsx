import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import TransitionLink from './TransitionLink';

const PRIMARY_NAV = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Clients', path: '/clients' },
  { label: 'Contact', path: '/contact' },
];

const CHANNELS = [
  { label: 'Instagram', href: 'https://instagram.com/madebychanan' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/madebychanan' },
  { label: 'Twitter', href: 'https://twitter.com/madebychanan' },
];

export default function NoirMenu({ isOpen, onClose, onOpenInquiry }) {
  const menuRef = useRef(null);
  const bgsRef = useRef([]);
  const itemsRef = useRef(null);
  const lineInnersRef = useRef([]);
  const tlRef = useRef(null);
  const router = useRouter();

  /* Studio clock. Rendered empty on the server and filled in on the client,
     so the markup can't mismatch during hydration. */
  const [londonTime, setLondonTime] = useState('');

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
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const menuEl = menuRef.current;
    const navBgs = bgsRef.current.filter(Boolean);
    const navItemsEl = itemsRef.current;
    const lineInners = lineInnersRef.current.filter(Boolean);

    if (!menuEl || !navItemsEl) return;

    // Set initial GSAP states
    gsap.set(navBgs, { scaleY: 0, opacity: 1, transformOrigin: 'top' });
    gsap.set(navItemsEl, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' });
    gsap.set(lineInners, { y: '100%' });

    // Build timeline
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        menuEl.style.pointerEvents = 'auto';
        menuEl.classList.add('is-open');
        menuEl.setAttribute('aria-hidden', 'false');
      },
      onReverseComplete: () => {
        menuEl.style.pointerEvents = 'none';
        menuEl.classList.remove('is-open');
        menuEl.setAttribute('aria-hidden', 'true');
        gsap.set(lineInners, { y: '100%' });
      }
    });

    // 1. Layered Background Panels scale down (matching script.js)
    tl.to(navBgs, {
      scaleY: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.inOut'
    }, 0);

    // 1b. The three colour panels are the wipe, not the destination: once
    //     they've swept down they fade off, leaving only the translucent
    //     fourth panel — so the menu settles into a blurred view of the page
    //     you were already on rather than an opaque slab.
    tl.to(navBgs.slice(0, 3), {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.9);

    // 2. Nav Items container unclips
    tl.to(navItemsEl, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 0.75,
      ease: 'power3.inOut'
    }, 0.2);

    // 3. Link lines slide up
    tl.to(lineInners, {
      y: '0%',
      duration: 0.75,
      stagger: 0.03,
      ease: 'power3.out'
    }, 0.55);

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [router.pathname]);

  // Escape closes, matching the top bar's toggle
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <div className="overlay-nav-menu" ref={menuRef} aria-hidden={!isOpen}>
      {/* 4 Staggered Animated Background Layers */}
      <div className="nav-bg-layer" ref={(el) => (bgsRef.current[0] = el)} />
      <div className="nav-bg-layer" ref={(el) => (bgsRef.current[1] = el)} />
      <div className="nav-bg-layer" ref={(el) => (bgsRef.current[2] = el)} />
      <div className="nav-bg-layer" ref={(el) => (bgsRef.current[3] = el)} />

      <div className="overlay-nav-content">
        <div className="overlay-nav-items" ref={itemsRef}>

          <div className="menu-index">

            {/* ── The index itself ── */}
            <nav className="menu-nav" aria-label="Primary">
              <p className="menu-eyebrow">Explore</p>

              {PRIMARY_NAV.map((item, idx) => (
                <TransitionLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`menu-link${router.pathname === item.path ? ' is-current' : ''}`}
                >
                  <span className="nav-line-mask">
                    <span
                      className="nav-line-inner"
                      ref={(el) => (lineInnersRef.current[idx] = el)}
                    >
                      <span className="menu-num">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="menu-label">{item.label}</span>
                    </span>
                  </span>
                </TransitionLink>
              ))}
            </nav>

            {/* ── Everything a site index should also carry ── */}
            <aside className="menu-aside">
              <div className="menu-group">
                <p className="menu-eyebrow">Contact</p>
                <a className="menu-meta-link" href="mailto:hello@madebychanan.com">
                  hello@madebychanan.com
                </a>
                <a className="menu-meta-link" href="mailto:press@madebychanan.com">
                  press@madebychanan.com
                </a>
                <button type="button" className="menu-inquiry" onClick={onOpenInquiry}>
                  Start a project
                </button>
              </div>

              <div className="menu-group">
                <p className="menu-eyebrow">Channels</p>
                {CHANNELS.map((channel) => (
                  <a
                    key={channel.href}
                    className="menu-meta-link"
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {channel.label}
                  </a>
                ))}
              </div>

              <div className="menu-group">
                <p className="menu-eyebrow">Studio</p>
                <p className="menu-meta">140 Soho Square, Soho</p>
                <p className="menu-meta">London W1D 3QN</p>
                <p className="menu-clock">
                  London
                  <span className="menu-clock-time">{londonTime || '——:——'}</span>
                </p>
              </div>
            </aside>
          </div>

          <div className="menu-footrail">
            <span>&copy; {new Date().getFullYear()} Made by Chanan</span>
            <span>An archive of the unreal</span>
          </div>

        </div>
      </div>
    </div>
  );
}
