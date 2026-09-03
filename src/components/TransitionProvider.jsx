import React, { createContext, useCallback, useContext, useRef } from 'react';
import { useRouter } from 'next/router';

const TransitionContext = createContext(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransitionNavigate must be used inside TransitionProvider');
  return ctx.transitionTo;
}

const FADE_OUT_MS = 120;
const FADE_IN_MS = 180;

function nextPaint() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });
}

export function TransitionProvider({ children }) {
  const router = useRouter();
  const isTransitioning = useRef(false);

  const transitionTo = useCallback(async (path, options = {}) => {
    if (isTransitioning.current || path === router.asPath) return;

    const page = document.querySelector('[data-page-transition-root]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (
      options.type === 'case-study' &&
      options.source instanceof HTMLElement &&
      typeof document.startViewTransition === 'function' &&
      !prefersReducedMotion
    ) {
      isTransitioning.current = true;
      page?.style.setProperty('pointer-events', 'none');
      options.source.style.setProperty('view-transition-name', 'case-study-media');
      document.documentElement.classList.add('case-study-transition-active');

      try {
        const transition = document.startViewTransition(async () => {
          const didNavigate = await router.push(path);
          if (didNavigate) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        });

        await transition.finished;
      } finally {
        options.source.style.removeProperty('view-transition-name');
        document.documentElement.classList.remove('case-study-transition-active');
        page?.style.removeProperty('pointer-events');
        isTransitioning.current = false;
      }

      return;
    }

    if (!page || prefersReducedMotion) {
      await router.push(path);
      return;
    }

    isTransitioning.current = true;
    page.style.pointerEvents = 'none';
    page.style.willChange = 'opacity';

    try {
      const fadeOut = page.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: FADE_OUT_MS,
          easing: 'cubic-bezier(0.4, 0, 1, 1)',
          fill: 'forwards',
        }
      );

      await fadeOut.finished;
      page.style.opacity = '0';
      fadeOut.cancel();

      const didNavigate = await router.push(path);
      if (!didNavigate) return;

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      await nextPaint();

      const fadeIn = page.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: FADE_IN_MS,
          easing: 'cubic-bezier(0, 0, 0.2, 1)',
          fill: 'forwards',
        }
      );

      await fadeIn.finished;
      fadeIn.cancel();
    } finally {
      page.style.removeProperty('opacity');
      page.style.removeProperty('pointer-events');
      page.style.removeProperty('will-change');
      isTransitioning.current = false;
    }
  }, [router]);

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}
    </TransitionContext.Provider>
  );
}
