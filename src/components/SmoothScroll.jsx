import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Scroll lifecycle manager.
 *
 * Previously wrapped Lenis. The page now uses native scrolling, so this only
 * does the things that still need doing around it: registering ScrollTrigger,
 * resetting position across route changes, refreshing measurements once the
 * page has settled, and locking scroll while the preloader is up.
 *
 * ScrollTrigger reads native scroll by default, so it needs no wiring here —
 * the old lenis.on('scroll', ScrollTrigger.update) bridge is what's gone.
 */
export default function SmoothScroll({ children, isLoading }) {
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(500, 33);
    ScrollTrigger.refresh();
  }, []);

  // Reset scroll position on route change and refresh ScrollTrigger
  useEffect(() => {
    /* Explicitly instant. `html` carries scroll-behavior: smooth so in-page
       anchors ease, but a route change must snap — otherwise the outgoing
       page visibly glides upward while the new one mounts. This is the
       native equivalent of Lenis's scrollTo(0, { immediate: true }). */
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [router.pathname]);

  // Pause / resume scroll during preloader
  useEffect(() => {
    /* Lenis had stop()/start(); the native equivalent is locking the
       document itself. Guarded so it can't strand the page unscrollable. */
    const root = document.documentElement;
    if (isLoading) {
      root.style.overflow = 'hidden';
      return () => { root.style.overflow = ''; };
    }

    root.style.overflow = '';
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 80);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isLoading]);

  return <>{children}</>;
}
