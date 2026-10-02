import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import TopBar from '../components/TopBar';
import InquiryModal from '../components/InquiryModal';
import LuxuryScrollIndicator from '../components/LuxuryScrollIndicator';
import { TransitionProvider } from '../components/TransitionProvider';
import ProgressiveBlur from '../components/ProgressiveBlur';
import 'lenis/dist/lenis.css';
import '../index.css';
import '../codevantum-case-study.css';
import '../noorakar-case-study.css';

// Client-only components — touch window/canvas at module scope
const SmoothScroll = dynamic(() => import('../components/SmoothScroll'), { ssr: false });

export default function App({ Component, pageProps }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <TransitionProvider>
      <TopBar onOpenInquiry={() => setIsInquiryOpen(true)} />

      <SmoothScroll isLoading={false}>
        <LuxuryScrollIndicator />
      </SmoothScroll>

      {/* The stable wrapper lets page content fade without animating fixed site chrome. */}
      <div className="page-transition-root" data-page-transition-root>
        <Component {...pageProps} onOpenInquiry={() => setIsInquiryOpen(true)} />
      </div>

      {/* Gradient blur ramp along the bottom edge of the viewport */}
      <ProgressiveBlur />

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </TransitionProvider>
  );
}
