import React, { useEffect, useRef } from 'react';
import { getMaxDPR } from '../utils/perf';

const TOTAL_FRAMES = 201;
const EAGER_FRAMES = 15;
const BATCH_SIZE = 20;

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
      const w = parent ? parent.offsetWidth : window.innerWidth;
      const h = parent ? parent.offsetHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, getMaxDPR());
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const idleCallbackIds = [];

    const scheduleNextBatch = (startIdx) => {
      if (startIdx >= TOTAL_FRAMES) return;
      const id = (typeof requestIdleCallback === 'function')
        ? requestIdleCallback(() => loadBatch(startIdx), { timeout: 2000 })
        : setTimeout(() => loadBatch(startIdx), 200);
      idleCallbackIds.push({ id, isIdle: typeof requestIdleCallback === 'function' });
    };

    const loadBatch = (startIdx) => {
      const end = Math.min(startIdx + BATCH_SIZE, TOTAL_FRAMES);
      for (let i = startIdx; i < end; i++) {
        if (!images[i]) {
          const img = new Image();
          img.src = getFrameSrc(i, isMobile);
          images[i] = img;
        }
      }
      scheduleNextBatch(end);
    };

    // Only start loading frames when the canvas enters the viewport
    // to avoid hammering the network for a section the user hasn't reached
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        // Eager: first EAGER_FRAMES for immediate playback when entering view
        for (let i = 0; i < Math.min(EAGER_FRAMES, TOTAL_FRAMES); i++) {
          if (!images[i]) {
            const img = new Image();
            img.src = getFrameSrc(i, isMobile);
            if (i === 0) img.onload = () => renderFrame(0);
            images[i] = img;
          }
        }
        // Deferred: rest in idle batches
        scheduleNextBatch(EAGER_FRAMES);
      },
      { threshold: 0.05 }
    );
    io.observe(canvas.parentElement || canvas);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      io.disconnect();
      idleCallbackIds.forEach(({ id, isIdle }) => {
        if (isIdle && typeof cancelIdleCallback === 'function') cancelIdleCallback(id);
        else clearTimeout(id);
      });
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
