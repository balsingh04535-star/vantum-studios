import React, { useEffect, useRef, useState } from 'react';

export default function LuxuryScrollIndicator() {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const progress = Math.min(1, Math.max(0, currentScroll / totalHeight));
      setScrollProgress(progress);

      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToRatio = (ratio) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.max(0, Math.min(totalHeight, ratio * totalHeight));

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    scrollToRatio(ratio);
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const onPointerMove = (moveEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const currentY = moveEvent.clientY - rect.top;
      const ratio = Math.max(0, Math.min(1, currentY / rect.height));
      scrollToRatio(ratio);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const isVisible = isScrolling || isDragging || isHovered;

  return (
    <aside
      className="luxury-scroller-root"
      aria-label="Scroll position indicator"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        right: '18px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 6px',
        opacity: isVisible ? 1 : 0.3,
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        pointerEvents: 'auto',
      }}
    >
      {/* Floating Glass Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        onPointerDown={handlePointerDown}
        className="luxury-scroller-track"
        style={{
          position: 'relative',
          width: isHovered || isDragging ? '5px' : '3px',
          height: 'clamp(170px, 26vh, 250px)',
          background: 'rgba(0, 29, 184, 0.12)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 29, 184, 0.18)',
          borderRadius: '9999px',
          cursor: 'pointer',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          touchAction: 'none',
        }}
      >
        {/* Glowing Cobalt Thumb / Bead */}
        <div
          className="luxury-scroller-thumb"
          style={{
            position: 'absolute',
            left: '50%',
            top: `${scrollProgress * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: isHovered || isDragging ? '11px' : '7px',
            height: isHovered || isDragging ? '32px' : '26px',
            borderRadius: '9999px',
            background: 'linear-gradient(180deg, #001db8 0%, #00127a 50%, #020b4d 100%)',
            border: '1.5px solid rgba(191, 215, 255, 0.85)',
            boxShadow: '0 0 14px rgba(0, 29, 184, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)',
            transition: 'width 0.25s ease, height 0.25s ease, transform 0.08s linear',
            pointerEvents: 'none',
          }}
        />
      </div>
    </aside>
  );
}

