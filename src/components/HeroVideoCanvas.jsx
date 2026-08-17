import React, { useEffect, useRef } from 'react';

const DEFAULT_FRAME_COUNT = 201;

export default function HeroVideoCanvas({
  scrollProgress = 0,
  folder = 'hero-sequence',
  mobileFolder = 'hero-sequence-mobile',
  frameCount = DEFAULT_FRAME_COUNT,
  width = 1280,
  height = 720
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);
  const isMobileRef = useRef(false);

  const getFrameSrc = (index, isMobile) => {
    const padded = String(index + 1).padStart(4, '0');
    const targetFolder = isMobile ? mobileFolder : folder;
    return `/${targetFolder}/frame_${padded}.webp`;
  };

  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Nearest loaded frame fallback
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
      sx = (iw - sw) / 2;
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
      const w = parent ? parent.offsetWidth : width;
      const h = parent ? parent.offsetHeight : height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // In-memory cache preloading
    const images = new Array(frameCount);
    imagesRef.current = images;

    // Draw first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0, isMobile);
    firstImg.onload = () => {
      renderFrame(0);
    };
    images[0] = firstImg;

    // Preload remaining frames
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrameSrc(i, isMobile);
      images[i] = img;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [folder, mobileFolder, frameCount, width, height]);

  // Sync frame to scrollProgress
  useEffect(() => {
    const progress = Math.max(0, Math.min(1, scrollProgress));
    const targetFrame = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(progress * (frameCount - 1)))
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
  }, [scrollProgress, frameCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover'
      }}
    />
  );
}
