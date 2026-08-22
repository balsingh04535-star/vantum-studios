import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '../components/Navigation';
import InquiryModal from '../components/InquiryModal';
import LuxuryScrollIndicator from '../components/LuxuryScrollIndicator';
import { TransitionProvider } from '../components/TransitionProvider';
import '../index.css';

// Client-only components — use window/canvas/Lenis
const SmoothScroll = dynamic(() => import('../components/SmoothScroll'), { ssr: false });
const GlitchPreloader = dynamic(() => import('../components/GlitchPreloader'), { ssr: false });

export default function App({ Component, pageProps }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <TransitionProvider>
      {/* Glitch preloader — only on first load */}
      {!preloaderDone && (
        <GlitchPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      <SmoothScroll isLoading={false}>
        <Navigation onOpenInquiry={() => setIsInquiryOpen(true)} />
        <LuxuryScrollIndicator />
      </SmoothScroll>

      {/* Page content renders on server — outside the client-only SmoothScroll wrapper */}
      <Component {...pageProps} onOpenInquiry={() => setIsInquiryOpen(true)} />

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </TransitionProvider>
  );
}


