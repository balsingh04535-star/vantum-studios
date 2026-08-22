import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// Exact custom ease curves from demo-main
const pageEase = CustomEase.create(
  'pageTransition',
  'M0,0 C0.38,0.05 0.48,0.58 0.65,0.82 0.82,1 1,1 1,1'
);

/* ─────────────────────────────────────────────────────────
   PAGE META — labels & numbers shown during transition
───────────────────────────────────────────────────────── */
export const PAGE_LABELS = {
  '/':                      'Home',
  '/work':                  'Selected Work',
  '/clients':               'Global Network',
  '/services':              'Capabilities',
  '/web-design':            'Web Design',
  '/web-development':       'Creative Dev',
  '/branding':              'Brand Identity',
  '/3d-product-animation':  '3D & CGI',
  '/motion-design':         'Motion Design',
  '/chanan-one':            'Chanan One',
  '/about':                 'About Chanan',
  '/contact':               'Direct Line',
};

const TransitionContext = createContext(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransitionNavigate must be used inside TransitionProvider');
  return ctx.transitionTo;
}

export function TransitionProvider({ children }) {
  const router    = useRouter();
  const overlayRef = useRef(null);
  const [label, setLabel] = useState('');

  const transitionTo = useCallback((path) => {
    if (!overlayRef.current) { router.push(path); return; }

    const dest = PAGE_LABELS[path] ?? 'Chanan';
    setLabel(dest);

    const el = overlayRef.current;
    const layer1 = el.querySelector('.tc-layer-1');
    const labelEl = el.querySelector('.tc-label');
    const counterEl = el.querySelector('.tc-counter');
    const currentContainer = document.querySelector('main') || document.querySelector('#__next');

    const tl = gsap.timeline({
      onComplete() {
        window.scrollTo(0, 0);
        if (currentContainer) {
          gsap.set(currentContainer, { clearProps: 'transform,opacity,scale' });
        }
      }
    });

    // 1. Current Page shrinks, fades, and moves up (-30vh)
    if (currentContainer) {
      tl.to(currentContainer, {
        y: '-30vh',
        scale: 0.82,
        opacity: 0.35,
        duration: 0.75,
        ease: pageEase,
        force3D: true,
      }, 0);
    }

    // 2. Incoming curtain unclips upwards from bottom
    tl.set(el, { pointerEvents: 'all', visibility: 'visible', clipPath: 'inset(100% 0% 0% 0%)' }, 0)
      .set(labelEl, { opacity: 0, y: 35 })
      .set(counterEl, { opacity: 0 })
      .to(el, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.75,
        ease: pageEase,
        force3D: true,
      }, 0)
      .to(labelEl, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.35)
      .to(counterEl, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.42)

      // 3. Switch route at peak of curtain coverage
      .call(() => router.push(path), [], 0.78)

      // 4. Reveal new page: Curtain unclips off to top
      .to(labelEl, { opacity: 0, y: -25, duration: 0.25, ease: 'power2.in' }, 0.85)
      .to(counterEl, { opacity: 0, duration: 0.2 }, 0.85)
      .to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.72,
        ease: pageEase,
        force3D: true,
      }, 0.95)
      .set(el, { pointerEvents: 'none', visibility: 'hidden' });

  }, [router]);

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}

      {/* ── Transition Overlay DOM (GSAP curtain animation) ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          visibility: 'hidden',
          overflow: 'hidden',
          backgroundColor: '#bfd7ff',
          clipPath: 'inset(100% 0% 0% 0%)',
        }}
      >
        <div className="tc-layer-1" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #bfd7ff 0%, #a2c6ff 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: 'clamp(2.5rem, 5vw, 5rem)',
          overflow: 'hidden',
        }}>
          {/* Giant ghost index number */}
          <div className="tc-counter" style={{
            position: 'absolute',
            top: '-0.15em', right: '-0.05em',
            fontSize: 'clamp(28vw, 38vw, 52vw)',
            fontWeight: 900,
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0, 29, 184, 0.15)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.05em',
            userSelect: 'none',
            pointerEvents: 'none',
          }}>
            {String(Object.keys(PAGE_LABELS).indexOf(
              Object.keys(PAGE_LABELS).find(k => PAGE_LABELS[k] === label) ?? '/'
            ) + 1).padStart(2, '0')}
          </div>

          <div style={{
            width: '3rem', height: '1.5px',
            background: '#001db8',
            marginBottom: '1.2rem',
          }} />

          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#001db8',
            fontFamily: 'var(--font-main)',
            fontWeight: 700,
            marginBottom: '0.6rem',
          }}>
            Chanan Transition Engine
          </p>

          <h2 className="tc-label" style={{
            fontSize: 'clamp(3.5rem, 9vw, 10rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#020b4d',
            fontFamily: 'var(--font-heading)',
          }}>
            {label}
          </h2>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
