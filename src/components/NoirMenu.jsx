import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function NoirMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const backdropRef = useRef(null);
  const frameRef = useRef(null);
  const stripsRef = useRef([]);
  const linksRef = useRef([]);
  const metaRef = useRef(null);
  const footerRef = useRef(null);
  const tlRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const menu = menuRef.current;
    const backdrop = backdropRef.current;
    const frame = frameRef.current;
    const strips = stripsRef.current.filter(Boolean);
    const navLinks = linksRef.current.filter(Boolean);
    const meta = metaRef.current;
    const footer = footerRef.current;

    if (!menu || !backdrop || !frame) return;

    // Set initial GSAP states
    gsap.set(menu, { autoAlpha: 0, pointerEvents: 'none' });
    gsap.set(backdrop, { autoAlpha: 0 });
    gsap.set(frame, { autoAlpha: 0, scale: 0.96 });
    gsap.set(strips, {
      scaleY: 0,
      transformOrigin: (i) => (i % 2 === 0 ? 'top center' : 'bottom center')
    });
    gsap.set(navLinks, { yPercent: 115, rotation: 4, autoAlpha: 0 });
    gsap.set([meta, footer], { y: 18, autoAlpha: 0 });

    // Build timeline
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power4.inOut' },
      onStart: () => {
        menu.classList.add('is-visible');
        menu.style.pointerEvents = 'auto';
        menu.setAttribute('aria-hidden', 'false');
      },
      onReverseComplete: () => {
        menu.classList.remove('is-visible');
        menu.style.pointerEvents = 'none';
        menu.setAttribute('aria-hidden', 'true');
        gsap.set(menu, { autoAlpha: 0 });
      }
    });

    tl.to(menu, { duration: 0.01, autoAlpha: 1 }, 0)
      .to(backdrop, { duration: 0.22, autoAlpha: 1, ease: 'linear' }, 0)
      .to(strips, { duration: 0.7, scaleY: 1, stagger: 0.06 }, 0)
      .to(frame, { duration: 0.48, autoAlpha: 1, scale: 1, ease: 'power2.out' }, 0.28)
      .to([meta, footer], { duration: 0.4, y: 0, autoAlpha: 1, stagger: 0.04, ease: 'power2.out' }, 0.42)
      .to(navLinks, { duration: 0.75, yPercent: 0, rotation: 0, autoAlpha: 1, stagger: 0.07, ease: 'power4.out' }, 0.36);

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
  }, [location.pathname]);

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'WORK', path: '/work' },
    { label: 'SERVICES', path: '/services' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <aside className="menu" ref={menuRef} aria-hidden={!isOpen}>
      <div className="menu-backdrop" ref={backdropRef} onClick={onClose} />

      <div className="menu-strips">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="menu-strip" ref={(el) => (stripsRef.current[i] = el)} />
        ))}
      </div>

      <div className="menu-frame" ref={frameRef} />

      <div className="menu-inner">
        <div className="menu-meta" ref={metaRef}>
          <p>VANTUM STUDIOS — SELECTED NAVIGATION</p>
        </div>

        <nav className="menu-nav">
          {navItems.map((item, idx) => (
            <Link key={item.path} to={item.path} onClick={onClose} className="menu-link">
              <span ref={(el) => (linksRef.current[idx] = el)}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="menu-footer" ref={footerRef}>
          <p>LONDON • NEW YORK • TOKYO</p>
          <p>© VANTUM STUDIOS {new Date().getFullYear()}</p>
        </div>
      </div>
    </aside>
  );
}
