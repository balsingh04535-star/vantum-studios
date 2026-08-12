import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  '/':         'Home',
  '/work':     'Work Showcase',
  '/clients':  'Global Network',
  '/services': 'Services & Specs',
  '/about':    'Studio Philosophy',
  '/contact':  'Direct Contact',
};

const TransitionContext = createContext(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransitionNavigate must be used inside TransitionProvider');
  return ctx.transitionTo;
}

export function TransitionProvider({ children }) {
  const navigate   = useNavigate();
  const overlayRef = useRef(null);
  const [label, setLabel] = useState('');

  const transitionTo = useCallback((path) => {
    if (!overlayRef.current) { navigate(path); return; }

    const dest = PAGE_LABELS[path] ?? 'Vantum';
    setLabel(dest);

    const el = overlayRef.current;
    const layer1 = el.querySelector('.tc-layer-1');
    const labelEl = el.querySelector('.tc-label');
    const counterEl = el.querySelector('.tc-counter');
    const currentContainer = document.querySelector('main') || document.querySelector('#root');

    const tl = gsap.timeline({
      onComplete() {
        window.scrollTo(0, 0);
        if (currentContainer) {
          gsap.set(currentContainer, { clearProps: 'transform,opacity,scale' });
        }
      }
    });

    // 1. Current Page shrinks, fades, and moves up (-30vh) like demo-main
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

    // 2. Incoming curtain unclips upwards from bottom (clipPath: inset(100% 0 0 0) -> inset(0 0 0 0))
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
      .call(() => navigate(path), [], 0.78)

      // 4. Reveal new page: Curtain unclips off to top (clipPath: inset(0 0 100% 0))
      .to(labelEl, { opacity: 0, y: -25, duration: 0.25, ease: 'power2.in' }, 0.85)
      .to(counterEl, { opacity: 0, duration: 0.2 }, 0.85)
      .to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.72,
        ease: pageEase,
        force3D: true,
      }, 0.95)
      .set(el, { pointerEvents: 'none', visibility: 'hidden' });

  }, [navigate]);

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}

      {/* ── Transition Overlay DOM (Matching demo-main clipPath animation) ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          visibility: 'hidden',
          overflow: 'hidden',
          backgroundColor: '#ebf5df',
          clipPath: 'inset(100% 0% 0% 0%)',
        }}
      >
        <div className="tc-layer-1" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #ebf5df 0%, #e2ecd4 100%)',
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
            WebkitTextStroke: '1px rgba(0,0,0,0.06)',
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
            width: '3rem', height: '1px',
            background: 'var(--accent-volt)',
            marginBottom: '1.2rem',
          }} />

          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.4)',
            fontFamily: 'var(--font-main)',
            fontWeight: 700,
            marginBottom: '0.6rem',
          }}>
            Vantum Transition Engine
          </p>

          <h2 className="tc-label" style={{
            fontSize: 'clamp(3.5rem, 9vw, 10rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#0f0f0f',
            fontFamily: 'var(--font-heading)',
          }}>
            {label}
          </h2>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
