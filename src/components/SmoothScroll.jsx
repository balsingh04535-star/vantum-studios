import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const refreshDelays = [80, 400, 1200];

/**
 * One global, desktop-only Lenis instance.
 *
 * It shares GSAP's ticker instead of starting a second animation loop, keeps
 * ScrollTrigger synchronized, and leaves touch/reduced-motion users on the
 * browser's native scroll path. Nested overlays opt out with
 * `data-lenis-prevent`.
 */
export default function SmoothScroll({ children, isLoading }) {
  const router = useRouter();
  const lenisRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const usesCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || usesCoarsePointer) {
      ScrollTrigger.refresh();
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: {
        duration: 0.9,
        offset: 0,
      },
      overscroll: true,
      autoResize: true,
      autoRaf: false,
      stopInertiaOnNavigate: true,
      prevent: (node) => Boolean(node?.closest?.('[data-lenis-prevent]')),
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time) => lenis.raf(time * 1000);

    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;

      if (window.lenis === lenis) delete window.lenis;
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.resize();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => window.clearTimeout(timer);
  }, [router.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const lenis = lenisRef.current;

    if (isLoading) {
      lenis?.stop();
      root.style.overflow = 'hidden';

      return () => {
        root.style.overflow = '';
        lenis?.start();
      };
    }

    root.style.overflow = '';
    lenis?.start();

    const timers = refreshDelays.map((delay) => (
      window.setTimeout(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
      }, delay)
    ));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isLoading]);

  return <>{children}</>;
}
