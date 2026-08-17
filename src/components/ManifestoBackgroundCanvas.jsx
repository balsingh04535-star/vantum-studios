import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 201;

export default function ManifestoBackgroundCanvas({ scrollProgress = 0, opacity = 1 }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);
  const isMobileRef = useRef(false);

  const getFrameSrc = (index, isMobile) => {
    const padded = String(index + 1).padStart(4, '0');
    const folder = isMobile ? 'intro-sequence-mobile' : 'intro-sequence';
    return `/${folder}/frame_${padded}.webp`;
  };

  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
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
      sh = iw / canvasAspect;
      sy = (ih - sh) / 2;
    } else {
      sw = ih * canvasAspect;
      // On mobile / portrait screens, shift camera angle slightly rightward (focalX = 0.73)
      // to keep both the creator and the tablet/pen-flipping hand perfectly balanced in view
      const isPortrait = canvasAspect < 1.0;
      const focalX = isPortrait ? 0.73 : 0.50;
      sx = (iw - sw) * focalX;
      sx = Math.max(0, Math.min(iw - sw, sx));
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth <= 768;
    isMobileRef.current = isMobile;

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const w = parent ? parent.offsetWidth : window.innerWidth;
      const h = parent ? parent.offsetHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // In-memory frame preloading
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const firstImg = new Image();
    firstImg.src = getFrameSrc(0, isMobile);
    firstImg.onload = () => {
      renderFrame(0);
    };
    images[0] = firstImg;

    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i, isMobile);
      images[i] = img;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Update frame when scrollProgress changes
  useEffect(() => {
    const progress = Math.max(0, Math.min(1, scrollProgress));
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
  }, [scrollProgress]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: opacity,
        transition: 'opacity 0.3s ease'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover'
        }}
      />
    </div>
  );
}
