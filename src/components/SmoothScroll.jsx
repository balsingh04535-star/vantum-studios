import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisContext = createContext(null);

export default function SmoothScroll({ children, isLoading }) {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Only disable smooth wheel interpolation on narrow mobile screens (<768px) where native touch momentum is preferred
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.35, // Extended deceleration curve for buttery cinematic inertia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95, // Calibrated so each scroll wheel step glides softly
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP Ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Initial refresh
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll position on route change and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Pause / resume scroll during preloader or full overlay states and refresh on unlock
  useEffect(() => {
    if (lenisRef.current) {
      if (isLoading) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }

    if (!isLoading) {
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 80);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);
      const t3 = setTimeout(() => ScrollTrigger.refresh(), 1200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isLoading]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
