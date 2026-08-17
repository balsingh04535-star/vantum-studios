import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 201;

export default function IntroVideoScroll() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const badgeRef = useRef(null);
  const progressLineRef = useRef(null);
  const timecodeRef = useRef(null);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);
  const isMobileRef = useRef(false);

  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to format frame source path
  const getFrameSrc = (index, isMobile) => {
    const padded = String(index + 1).padStart(4, '0');
    const folder = isMobile ? 'intro-sequence-mobile' : 'intro-sequence';
    return `/${folder}/frame_${padded}.webp`;
  };

  // Draw frame to canvas with responsive 'cover' fitting
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // If requested frame isn't loaded yet, fallback to the closest available frame
      for (let offset = 1; offset < 20; offset++) {
        const prev = imagesRef.current[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          drawCover(ctx, canvas, prev);
          return;
        }
        const next = imagesRef.current[index + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          drawCover(ctx, canvas, next);
          return;
        }
      }
      return;
    }

    drawCover(ctx, canvas, img);
  };

  const drawCover = (ctx, canvas, img) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasAspect = cw / ch;
    const imageAspect = iw / ih;

    let sx = 0, sy = 0, sw = iw, sh = ih;

    if (canvasAspect > imageAspect) {
      // Canvas is wider than image: crop top/bottom
      sh = iw / canvasAspect;
      sy = (ih - sh) / 2;
    } else {
      // Canvas is taller than image: crop left/right
      sw = ih * canvasAspect;
      sx = (iw - sw) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const isMobile = window.innerWidth <= 768;
    isMobileRef.current = isMobile;

    // Resize canvas with devicePixelRatio
    const handleResize = () => {
      if (!canvas || !section) return;
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Progressive image preloading
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    let loadedCount = 0;

    const onLoadFrame = (idx) => {
      loadedCount++;
      const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      setLoadingPercent(pct);

      if (idx === 0) {
        setIsLoaded(true);
        renderFrame(0);
      }
    };

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0, isMobile);
    firstImg.onload = () => onLoadFrame(0);
    images[0] = firstImg;

    // Load remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i, isMobile);
      img.onload = () => onLoadFrame(i);
      images[i] = img;
    }

    // GSAP ScrollTrigger Sequence Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * 2.8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );

          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
            if (!rafIdRef.current) {
              rafIdRef.current = requestAnimationFrame(() => {
                renderFrame(currentFrameRef.current);
                rafIdRef.current = null;
              });
            }
          }

          // Update timecode display
          if (timecodeRef.current) {
            const currentSec = (progress * 10.0).toFixed(1);
            timecodeRef.current.textContent = `00:${currentSec.padStart(4, '0')} / 00:10.0`;
          }

          // Update progress line
          if (progressLineRef.current) {
            progressLineRef.current.style.transform = `scaleX(${progress})`;
          }
        }
      }
    });

    // Stage 1: Fade out initial badge and overlay prompt
    if (badgeRef.current) {
      tl.to(badgeRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.15,
        ease: 'power2.out'
      }, 0);
    }

    // Stage 2: Smooth transition out into Hero
    if (overlayRef.current) {
      tl.to(overlayRef.current, {
        opacity: 0.85,
        duration: 0.12,
        ease: 'power1.inOut'
      }, 0.88);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro-sequence"
      className="intro-sequence-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#020b4d',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#020b4d'
        }}
      >
        {/* Main Scrubbing Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover'
          }}
        />

        {/* Cinematic Vignette & Edge Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(2, 11, 77, 0.45) 85%, rgba(2, 11, 77, 0.8) 100%)',
            zIndex: 2
          }}
        />

        {/* Transition Overlay to Hero Section */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--bg-dark, #020b4d)',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Floating Top Header Badges */}
        <div
          ref={badgeRef}
          style={{
            position: 'absolute',
            top: '2rem',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 4,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease'
          }}
        >
          <div
            style={{
              padding: '6px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(2, 11, 77, 0.75)',
              border: '1px solid rgba(191, 215, 255, 0.3)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#bfd7ff',
                boxShadow: '0 0 10px #bfd7ff'
              }}
            />
            <span
              style={{
                fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#bfd7ff'
              }}
            >
              Archive Sequence
            </span>
          </div>
        </div>

        {/* Bottom HUD: Scroll Prompter, Timecode & Scrub Progress */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.2rem',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 4,
            pointerEvents: 'none'
          }}
        >
          {/* Shimmer Scroll Prompt */}
          <div
            style={{
              fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(0.65rem, 1vw, 0.82rem)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.85)'
            }}
          >
            <span className="shine-sweep-text">
              SCROLL TO PLAY ↓
            </span>
          </div>

          {/* Discreet Timecode & Progress Rail */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '4px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <span
              ref={timecodeRef}
              style={{
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                color: 'rgba(191, 215, 255, 0.8)',
                letterSpacing: '0.06em'
              }}
            >
              00:00.0 / 00:10.0
            </span>
            <div
              style={{
                width: '60px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <div
                ref={progressLineRef}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#bfd7ff',
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.05s linear'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
