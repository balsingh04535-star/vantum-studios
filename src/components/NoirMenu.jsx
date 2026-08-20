import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import gsap from 'gsap';
import TransitionLink from './TransitionLink';

export default function NoirMenu({ isOpen, onClose, onOpenInquiry }) {
  const menuRef = useRef(null);
  const bgsRef = useRef([]);
  const itemsRef = useRef(null);
  const lineInnersRef = useRef([]);
  const tlRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    const menuEl = menuRef.current;
    const navBgs = bgsRef.current.filter(Boolean);
    const navItemsEl = itemsRef.current;
    const lineInners = lineInnersRef.current.filter(Boolean);

    if (!menuEl || !navItemsEl) return;

    // Set initial GSAP states
    gsap.set(navBgs, { scaleY: 0, transformOrigin: 'top' });
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

  const primaryNav = [
    { label: 'Home', path: '/' },
    { label: 'Global Network', path: '/clients' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="overlay-nav-menu" ref={menuRef} aria-hidden={!isOpen}>
      {/* 4 Staggered Animated Background Layers */}
      <div className="nav-bg-layer" ref={(el) => (bgsRef.current[0] = el)} />
      <div className="nav-bg-layer" ref={(el) => (bgsRef.current[1] = el)} />
      <div className="nav-bg-layer" ref={(el) => (bgsRef.current[2] = el)} />
      <div className="nav-bg-layer" ref={(el) => (bgsRef.current[3] = el)} />

      <div className="overlay-nav-content">
        {/* Explicit Close Button inside Menu Overlay */}
        <button
          className="overlay-close-btn"
          onClick={onClose}
          type="button"
          aria-label="Close Navigation Menu"
        >
          <span>CLOSE</span>
          <X size={18} />
        </button>

        <div
          className="overlay-nav-items"
          ref={itemsRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '4rem 2rem'
          }}
        >
          <div className="overlay-nav-primary" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', textAlign: 'center' }}>
            {primaryNav.map((item, idx) => (
              <TransitionLink
                key={idx}
                to={item.path}
                onClick={onClose}
                className="nav-line-mask"
              >
                <span
                  className="nav-line-inner"
                  ref={(el) => (lineInnersRef.current[idx] = el)}
                >
                  {item.label}
                </span>
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
