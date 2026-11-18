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
      // In-page anchors are handled below so the URL never gains a #fragment.
      anchors: false,
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

  // Keep URLs clean: same-page "#section" links scroll without writing the
  // fragment, and any fragment arriving from an old link is scrolled to, then dropped.
  useEffect(() => {
    const scrollToId = (id, immediate = false) => {
      const target = id && document.getElementById(decodeURIComponent(id));
      if (!target) return false;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { duration: 0.9, immediate });
      } else {
        target.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth', block: 'start' });
      }
      return true;
    };

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href*="#"]');
      if (!link || link.target === '_blank') return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      event.preventDefault();
      if (!scrollToId(url.hash.slice(1))) {
        lenisRef.current ? lenisRef.current.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const { hash, pathname, search } = window.location;
    if (!hash) return undefined;
    window.history.replaceState(window.history.state, '', pathname + search);
    const timer = window.setTimeout(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [router.asPath]);

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
