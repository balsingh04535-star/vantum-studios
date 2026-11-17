import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import TransitionLink from './TransitionLink';
import {
  CARDS_PER_SIDE, GALLERY_START, HERO_IMAGES, HERO_SCENES, INTRO_DURATION,
  createCardPool, getCardFrame, getGalleryGeometry, getHeroFrame,
} from './heroMotion';
import { createHeroGallery } from './heroGallery';
import styles from './Hero.module.css';

const CARDS = [-1, 1].flatMap((side) =>
  Array.from({ length: CARDS_PER_SIDE }, (_, index) => ({ side, index }))
);

export default function Hero({ onOpenInquiry }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const galleryCanvasRef = useRef(null);
  const wordRef = useRef(null);
  const motionRef = useRef({ paused: false });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const word = wordRef.current;
    const ctx = canvas.getContext('2d');
    const smallCanvas = document.createElement('canvas');
    const smallCtx = smallCanvas.getContext('2d');
    const sourceCanvas = document.createElement('canvas');
    const sourceCtx = sourceCanvas.getContext('2d');
    const cards = Array.from(root.querySelectorAll('[data-tunnel-card]'));
    const heading = root.querySelector('[data-hero-heading]');
    const content = root.querySelector('[data-hero-content]');
    const ribbon = root.querySelector('[data-hero-ribbon]');
    const prompt = root.querySelector('[data-hero-prompt]');
    const cycleNumber = root.querySelector('[data-cycle-number]');
    const progress = root.querySelector('[data-cycle-progress]');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    let reduced = media.matches;
    let disposed = false;
    let inView = true;
    let frameId = null;
    let previousTime = null;
    let elapsed = 0;
    let currentScene = -1;
    let lastDrawKey = '';
    let geometry = getGalleryGeometry(root.clientWidth, root.clientHeight);
    let galleryStart = Infinity;
    let fontSize = 64;
    let dpr = 1;
    let wordWidth = 0;
    let wordHeight = 0;
    const getAges = createCardPool();
    const gallery = createHeroGallery(galleryCanvasRef.current, HERO_IMAGES, CARDS);
    if (gallery) root.dataset.gallery = 'webgl';

    const paintSourceWord = () => {
      if (!sourceCtx || !ctx || !smallCtx) return;
      sourceCanvas.width = Math.ceil(wordWidth * dpr);
      sourceCanvas.height = Math.ceil(wordHeight * dpr);
      sourceCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sourceCtx.clearRect(0, 0, wordWidth, wordHeight);
      sourceCtx.fillStyle = '#fbf6e6';
      sourceCtx.font = `${fontSize}px "Chanan Hero Serif", Georgia, serif`;
      sourceCtx.textAlign = 'center';
      sourceCtx.textBaseline = 'middle';
      sourceCtx.fillText(HERO_SCENES[Math.max(0, currentScene)].word, wordWidth / 2, wordHeight * 0.49);
      lastDrawKey = '';
    };

    const resize = () => {
      geometry = getGalleryGeometry(root.clientWidth, root.clientHeight);
      gallery?.resize(geometry.width, geometry.height);
      fontSize = parseFloat(getComputedStyle(word).fontSize);
      wordWidth = word.clientWidth;
      wordHeight = word.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(wordWidth * dpr);
      canvas.height = Math.ceil(wordHeight * dpr);
      paintSourceWord();
      if (reduced || motionRef.current.paused) render();
    };

    const drawWord = (distortion) => {
      if (!ctx || !smallCtx || !sourceCtx || !wordWidth) return;
      const block = 1 + Math.round(Math.max(1, fontSize / 8 - 1) * distortion);
      const key = `${currentScene}:${block}`;
      if (key === lastDrawKey) return;
      lastDrawKey = key;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (block === 1) {
        ctx.drawImage(sourceCanvas, 0, 0);
      } else {
        // Downsample the actual letterforms, then reconstruct them with hard
        // square pixels. The effect remains confined to the changing word.
        smallCanvas.width = Math.max(1, Math.round(wordWidth / block));
        smallCanvas.height = Math.max(1, Math.round(wordHeight / block));
        smallCtx.imageSmoothingEnabled = true;
        smallCtx.drawImage(sourceCanvas, 0, 0, smallCanvas.width, smallCanvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(smallCanvas, 0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
      }
    };

    function render() {
      const time = reduced ? INTRO_DURATION : elapsed;
      const frame = getHeroFrame(time, reduced ? GALLERY_START : galleryStart);
      // Let the surrounding words move as the changing word's width morphs.
      if (sourceCtx) {
        sourceCtx.font = `${fontSize}px "Chanan Hero Serif", Georgia, serif`;
        const t = frame.transition;
        const blend = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
        const fromWidth = sourceCtx.measureText(HERO_SCENES[frame.fromScene].word).width;
        const toWidth = sourceCtx.measureText(HERO_SCENES[frame.toScene].word).width;
        const nextWidth = Math.ceil(fromWidth + (toWidth - fromWidth) * blend + fontSize * 0.08);
        if (nextWidth !== wordWidth) {
          wordWidth = nextWidth;
          word.style.width = `${wordWidth}px`;
          canvas.width = Math.ceil(wordWidth * dpr);
          paintSourceWord();
        }
      }
      if (frame.scene !== currentScene) {
        currentScene = frame.scene;
        word.querySelector('[data-word-fallback]').textContent = HERO_SCENES[currentScene].word;
        prompt.textContent = HERO_SCENES[currentScene].prompt;
        cycleNumber.textContent = String(currentScene + 1).padStart(2, '0');
        paintSourceWord();
      }
      drawWord(reduced ? 0 : frame.distortion);

      heading.style.opacity = frame.headingReveal;
      heading.style.transform = `scale(${1.2 - frame.headingReveal * 0.2})`;
      content.style.opacity = frame.contentReveal;
      content.style.transform = `scale(${1.2 - frame.contentReveal * 0.2})`;
      ribbon.style.transform = `translate(-50%, -50%) scale(${frame.ribbonScale})`;
      progress.style.transform = `scaleX(${frame.progress})`;
      prompt.style.opacity = 1 - frame.distortion * 0.8;
      prompt.style.transform = `translateY(${frame.distortion * (frame.transition < 0.5 ? -4 : 4)}px)`;

      const ages = getAges(frame.galleryTime);
      const positions = CARDS.map(({ index, side }) => getCardFrame(index, side, ages[index], geometry, frame));
      if (gallery && root.dataset.gallery === 'webgl') {
        gallery.render(positions, frame.cylinder);
      } else {
        cards.forEach((card, i) => {
          const position = positions[i];
          card.style.transform = `translate(-50%, -50%) translateX(${position.x}px) scale(${position.size / 100})`;
          card.style.opacity = position.visible ? 1 : 0;
          card.style.zIndex = Math.round(position.order * 1000);
        });
      }
    }

    const stop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      previousTime = null;
    };

    const tick = (now) => {
      frameId = null;
      if (disposed) return;
      if (previousTime !== null) elapsed += Math.min((now - previousTime) / 1000, 0.06);
      previousTime = now;
      render();
      frameId = requestAnimationFrame(tick);
    };

    const sync = () => {
      stop();
      if (disposed) return;
      if (reduced) {
        render();
      } else if (inView && !document.hidden && !motionRef.current.paused) {
        frameId = requestAnimationFrame(tick);
      }
    };

    motionRef.current.sync = sync;
    const onMediaChange = (event) => {
      reduced = event.matches;
      if (reduced) elapsed = Math.max(elapsed, INTRO_DURATION);
      sync();
    };
    const onContextLost = (event) => {
      event.preventDefault();
      root.dataset.gallery = 'fallback';
      render();
    };
    const onContextRestored = () => {
      root.dataset.gallery = 'webgl';
      resize();
      render();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0 });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(root);
    resizeObserver.observe(root);
    document.addEventListener('visibilitychange', sync);
    media.addEventListener('change', onMediaChange);
    const galleryCanvas = galleryCanvasRef.current;
    galleryCanvas.addEventListener('webglcontextlost', onContextLost);
    galleryCanvas.addEventListener('webglcontextrestored', onContextRestored);

    // Grow the ribbon while assets load. Reveal the gallery as soon as it is
    // ready, with a deadline so text and the project action always appear.
    const assets = HERO_IMAGES.map((src) => new Promise((resolve) => {
      const image = new window.Image();
      image.onload = resolve;
      image.onerror = resolve;
      image.src = src;
    }));
    const font = document.fonts.load('64px "Chanan Hero Serif"');
    let timeout;
    const deadline = new Promise((resolve) => { timeout = setTimeout(resolve, 2000); });
    Promise.race([Promise.allSettled([...assets, font, gallery?.ready]), deadline]).then(() => {
      clearTimeout(timeout);
      if (disposed) return;
      galleryStart = Math.max(GALLERY_START, elapsed);
      if (reduced || motionRef.current.paused) render();
    });
    root.dataset.enhanced = ctx && sourceCtx && smallCtx ? 'true' : 'fallback';
    resize();
    render();
    sync();
    font.then(() => { if (!disposed) { resize(); render(); } }).catch(() => {});

    return () => {
      disposed = true;
      stop();
      clearTimeout(timeout);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      media.removeEventListener('change', onMediaChange);
      galleryCanvas.removeEventListener('webglcontextlost', onContextLost);
      galleryCanvas.removeEventListener('webglcontextrestored', onContextRestored);
      gallery?.dispose();
      delete root.dataset.gallery;
      delete motionRef.current.sync;
    };
  }, []);

  const toggleMotion = () => {
    const next = !motionRef.current.paused;
    motionRef.current.paused = next;
    setPaused(next);
    motionRef.current.sync?.();
  };

  return (
    <section id="hero" ref={rootRef} className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.ribbon} data-hero-ribbon aria-hidden="true">
        <svg viewBox="0 0 1000 190" fill="currentColor">
          <path d="M24 2C148 31 252 42 365 42H635C748 42 852 31 976 2Q1000 -4 1000 18V172Q1000 194 976 188C852 159 748 148 635 148H365C252 148 148 159 24 188Q0 194 0 172V18Q0 -4 24 2Z" />
        </svg>
      </div>

      <div className={styles.heading} data-hero-heading>
        <p className={styles.eyebrow}>Independent minds. Extraordinary things.</p>
        <h1 id="hero-heading" className={styles.title}>
          <span className={styles.srOnly}>We make brands, websites, products, campaigns and ideas impossible to ignore.</span>
          <span aria-hidden="true" className={styles.headlineVisual}>
            <span>We make </span>
            <span ref={wordRef} className={styles.word}>
              <span className={styles.wordFallback} data-word-fallback>brands</span>
              <canvas ref={canvasRef} className={styles.wordCanvas} />
            </span>
            <span className={styles.headlineEnd}> impossible to ignore.</span>
          </span>
        </h1>
      </div>

      <div className={styles.gallery} aria-hidden="true">
        <canvas ref={galleryCanvasRef} className={styles.galleryCanvas} />
        <div className={styles.tunnel}>
          {CARDS.map(({ side, index }) => (
            <div className={styles.card} data-tunnel-card key={`${side}-${index}`}>
              <img src={HERO_IMAGES[(index * 2 + (side === 1 ? 1 : 0)) % HERO_IMAGES.length]}
                alt="" width="800" height="800" loading="eager" decoding="async" draggable="false" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.content} data-hero-content>
        <p className={styles.description}>
          A creative studio for ambitious brands.<br />
          Identity, digital experiences and motion. Made by Chanan.
        </p>
        <button type="button" className={styles.brief} onClick={onOpenInquiry}
          aria-label="Start a project with Made by Chanan">
          <span className={styles.briefMark} aria-hidden="true">↳</span>
          <span className={styles.briefText}>
            <span className={styles.briefLabel}>Let’s make something</span>
            <span className={styles.prompt} data-hero-prompt>{HERO_SCENES[0].prompt}</span>
          </span>
          <span className={styles.briefArrow} aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.5} /></span>
        </button>
      </div>

      <div className={styles.footnote}>
        <TransitionLink to="/chanan-one" className={styles.archiveLink}>Chanan One <ArrowUpRight size={13} /></TransitionLink>
        <a href="#manifesto" className={styles.explore}>Scroll to explore <span aria-hidden="true">↓</span></a>
        <div className={styles.playback}>
          <span data-cycle-number>01</span><span className={styles.track}><i data-cycle-progress /></span><span>05</span>
          <button type="button" className={styles.pause} onClick={toggleMotion}
            aria-label={paused ? 'Play hero animation' : 'Pause hero animation'} aria-pressed={paused}>
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>
    </section>
  );
}
