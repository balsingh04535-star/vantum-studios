import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import StudioOverview from '../components/StudioOverview';
import Footer from '../components/Footer';

export default function HomePage({ onOpenInquiry }) {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const id = entry.target.id;
            if (id && window.location.pathname === '/') {
              const newHash = id === 'hero' ? '' : `#${id}`;
              const targetUrl = window.location.pathname + newHash;
              if (window.location.hash !== newHash) {
                window.history.replaceState(null, '', targetUrl);
              }
            }
          }
        });
      },
      { threshold: [0.25] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero onOpenInquiry={onOpenInquiry} />
      <StudioOverview onOpenInquiry={onOpenInquiry} />
    </main>
  );
}
