import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2, MousePointer2, Pause, Play, Plus, X } from 'lucide-react';
import { gsap } from 'gsap';
import SEO from '../components/SEO';
import TransitionLink from '../components/TransitionLink';
import { projects } from '../data/projects';
import identity from '../data/noorakarIdentity.json';

const ASSETS = '/work/noorakar-current';
const FILMS = `${ASSETS}/films`;
const LIVE_SITE = 'https://noorakaar.vercel.app/';

const CHAPTERS = [
  ['overview', 'The idea'],
  ['voice', 'The campaign'],
  ['identity', 'Identity'],
  ['aangan', 'Aangan'],
  ['roop', 'Roop'],
  ['cowork', 'Zoorav Cowork'],
  ['models', 'The models'],
  ['website', 'The website'],
];

const MODELS = [
  { name: 'Savitra', role: 'For the work that needs care.', image: 'savitra.png', glow: '#7d7cff' },
  { name: 'Arka', role: 'A little quicker on your feet.', image: 'arka.png', glow: '#ff8a4c' },
  { name: 'Shruti', role: 'Every word, understood.', image: 'shruti.png', glow: '#8fe0bd' },
  { name: 'Vyom', role: 'A wider world of possibility.', image: 'vyom.png', glow: '#3d8bff' },
];

// Stills pulled from the four films, in the order they run on the strip.
const STILLS = [
  ['Aangan', '01:11'], ['Cowork', '00:02'], ['Aangan', '00:06'], ['Roop', '00:04'],
  ['Aangan', '00:13'], ['Voice', '00:09'], ['Aangan', '00:25'], ['Cowork', '00:08'],
  ['Roop', '00:27'], ['Aangan', '00:44'], ['Aangan', '00:56'], ['Roop', '00:35'],
  ['Aangan', '01:02'], ['Cowork', '00:12'], ['Roop', '00:03'], ['Aangan', '00:19'],
].map(([film, tc], i) => ({ film, tc, src: `${FILMS}/stills/frame-${String(i + 1).padStart(2, '0')}.jpg` }));

const PLAN = [
  ['9:30 – 10:00', 'Standup', 'Team ke saath updates lo.'],
  ['10:00 – 12:30', 'Deep work', 'Client deck finish karo.'],
  ['2:00 – 2:30', 'Client call', 'Budget final karo.'],
  ['4:00 – 5:30', 'Follow-ups', 'Mails aur WhatsApp replies.'],
];

// Unfolding geometry from Noorakar's current public identity. The resolved
// silhouette is the exact live SVG, recorded in noorakarIdentity.json.
const PETAL = [[255.75, 37.63], [192.74, 80.13], [195.11, 164.47], [206.24, 194.47], [216.88, 223.17], [203.46, 243.78], [191.38, 254], [162.55, 278.37], [108.67, 327.95], [113.87, 395.88]];
const rotate = ([x, y], degrees) => {
  const angle = degrees * Math.PI / 180;
  return [255.75 + (x - 255.75) * Math.cos(angle) - (y - 254) * Math.sin(angle), 254 + (x - 255.75) * Math.sin(angle) + (y - 254) * Math.cos(angle)];
};
const CURVES = [0, 1, 2, 3].flatMap((n) => [PETAL.map((p) => rotate(p, n * 90)), PETAL.map(([x, y]) => [255.75 - (y - 254), 254 - (x - 255.75)]).reverse().map((p) => rotate(p, n * 90))]);
const SECTORS = CURVES.map((curve) => Math.round(((Math.atan2(curve[0][1] - 254, curve[0][0] - 255.75) * 180 / Math.PI + 450) % 360) / 45) % 8);
const WEIGHTS = [0, .03, .12, .3, .42, .58, .7, .88, .97, 1];
const LIGHT_INK = ['#d89882', '#ffede3', '#eab6a1'];
const DARK_INK = ['#3b2a20', '#a8634a', '#2a1f19'];

function weavePath(openings, spin = 0) {
  let path = '';
  CURVES.forEach((curve, index) => {
    const start = openings[SECTORS[index]];
    const end = openings[SECTORS[(index + 1) % 8]];
    const point = (i) => {
      const opening = start + (end - start) * WEIGHTS[i];
      const scale = .2 + .8 * opening;
      return rotate([255.75 + (curve[i][0] - 255.75) * scale, 254 + (curve[i][1] - 254) * scale], -50 * (1 - opening) + spin).map((v) => v.toFixed(2)).join(' ');
    };
    if (!index) path += `M${point(0)}`;
    path += `C${point(1)} ${point(2)} ${point(3)}C${point(4)} ${point(5)} ${point(6)}C${point(7)} ${point(8)} ${point(9)}`;
  });
  return `${path}Z`;
}

const timecode = (seconds) => {
  const s = Math.max(0, Math.floor(seconds || 0));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

function Mark({ className = '' }) {
  return <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d={identity.mark} /></svg>;
}

function AnimatedMark({ motion, replay, ink = LIGHT_INK, className = '' }) {
  const root = useRef(null);
  const uid = useId().replace(/:/g, '');
  useEffect(() => {
    const element = root.current;
    const weave = element.querySelector('[data-weave]');
    const finalMark = element.querySelector('[data-final]');
    const paths = element.querySelectorAll('[data-weave] path');
    if (!motion) { weave.style.opacity = '0'; finalMark.style.opacity = '1'; return undefined; }
    const petals = Array.from({ length: 8 }, () => ({ open: 0 }));
    const state = { spin: -14, width: 4 };
    const timeline = gsap.timeline({ repeat: -1, paused: true, onUpdate: () => {
      const d = weavePath(petals.map((petal) => petal.open), state.spin);
      paths.forEach((path) => path.setAttribute('d', d));
      weave.setAttribute('stroke-width', state.width.toFixed(2));
    } });
    timeline.set(finalMark, { opacity: 0 }, 0)
      .fromTo(weave, { opacity: 0 }, { opacity: 1, duration: .35 }, 0)
      .fromTo(petals, { open: 0 }, { open: 1, duration: 1.4, stagger: .085, ease: 'power4.out' }, .1)
      .fromTo(state, { spin: -14, width: 4 }, { spin: 0, width: 12.2, duration: 2.1, ease: 'power3.out' }, 0)
      .to(finalMark, { opacity: 1, duration: .45 }, 1.95)
      .to(weave, { opacity: 0, duration: .3 }, 2.4)
      .to(finalMark, { opacity: 0, duration: .45 }, 5.2);
    let visible = false;
    const update = () => (visible && !document.hidden ? timeline.resume() : timeline.pause());
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .05 });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); timeline.kill(); };
  }, [motion, replay]);
  return (
    <svg ref={root} className={`nk-animated-mark ${className}`} viewBox="0 0 512 512" role="img" aria-label="Noorakar’s woven symbol unfolds into its brand mark">
      <defs><linearGradient id={`${uid}-ink`} x1="0" y1="1" x2="1" y2="0"><stop stopColor={ink[0]} /><stop offset=".5" stopColor={ink[1]} /><stop offset="1" stopColor={ink[2]} /></linearGradient></defs>
      <g transform="matrix(1.0052 0.0002 0 0.9931 -1.0767 1.6398)"><g data-weave="" fill="none" stroke={`url(#${uid}-ink)`} strokeWidth="12.2" style={{ opacity: 0 }}><path d={weavePath(Array(8).fill(1))} /></g></g>
      <g data-final="" fill="currentColor"><path fillRule="evenodd" d={identity.mark} /></g>
    </svg>
  );
}

function PointField({ motion, className = '' }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return undefined;
    let width = 0; let height = 0; let frame = null; let visible = false; let time = 0; let previous = 0;
    // Offset rows and columns so no points pile up on the poles or the seam.
    const points = Array.from({ length: 2304 }, (_, i) => ({ u: (i % 64) / 64, v: (Math.floor(i / 64) + .5) / 36 }));
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const phase = time * .00022;
      const turn = phase * .35;
      const rendered = points.map(({ u, v }) => {
        const longitude = u * Math.PI * 2;
        const latitude = v * Math.PI;
        const ripple = 1 + .12 * Math.sin(longitude * 6 + phase * 2) * Math.sin(latitude * 4 + phase);
        let x = Math.cos(longitude) * Math.sin(latitude) * ripple;
        const y = Math.cos(latitude) * ripple;
        let z = Math.sin(longitude) * Math.sin(latitude) * ripple;
        const rotatedX = x * Math.cos(turn) - z * Math.sin(turn);
        z = x * Math.sin(turn) + z * Math.cos(turn); x = rotatedX;
        const scale = Math.min(width * .31, height * .36) * 2.7 / (3 - z * .5);
        return { x: width / 2 + x * scale, y: height / 2 + y * scale, z, size: 1.2 + (z + 1) * .65 };
      }).sort((a, b) => a.z - b.z);
      rendered.forEach((point, index) => {
        context.fillStyle = index % 29 === 0 ? `rgba(239,174,139,${.4 + (point.z + 1) * .25})` : `rgba(244,239,229,${.15 + (point.z + 1) * .35})`;
        context.fillRect(point.x, point.y, point.size, point.size);
      });
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr; canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    };
    const tick = (timestamp) => { if (previous) time += Math.min(timestamp - previous, 50); previous = timestamp; draw(); frame = requestAnimationFrame(tick); };
    const update = () => {
      if (motion && visible && !document.hidden && frame === null) { previous = 0; frame = requestAnimationFrame(tick); }
      else if ((!motion || !visible || document.hidden) && frame !== null) { cancelAnimationFrame(frame); frame = null; }
    };
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }); observer.observe(canvas);
    document.addEventListener('visibilitychange', update); resize();
    return () => { resizeObserver.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', update); if (frame !== null) cancelAnimationFrame(frame); };
  }, [motion]);
  return <canvas ref={canvasRef} className={`nk-points ${className}`} role="img" aria-label="A rotating form of light built from a field of animated points" />;
}

/* A film that plays itself, muted, while it is on screen. Visitors can pause
   it, and the page-wide motion toggle (or a reduced-motion preference) stops
   it from starting on its own. */
function Film({ name, label, duration, motion, poster }) {
  const wrap = useRef(null);
  const video = useRef(null);
  const bar = useRef(null);
  const visible = useRef(false);
  const manual = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const sync = () => {
    const element = video.current;
    if (!element) return;
    const wanted = visible.current && !document.hidden && (manual.current === 'play' || (manual.current !== 'pause' && motion));
    if (wanted && element.paused) element.play().catch(() => {});
    else if (!wanted && !element.paused) element.pause();
  };

  useEffect(() => {
    manual.current = null;
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; sync(); }, { threshold: .3 });
    observer.observe(wrap.current);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [motion]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    const element = video.current;
    manual.current = element.paused ? 'play' : 'pause';
    if (element.paused) element.play().catch(() => {}); else element.pause();
  };
  const fullscreen = () => {
    const element = video.current;
    if (element.requestFullscreen) element.requestFullscreen().catch(() => {});
    else if (element.webkitEnterFullscreen) element.webkitEnterFullscreen();
  };
  const onTime = () => {
    const element = video.current;
    setTime(element.currentTime);
    if (bar.current && element.duration) bar.current.style.transform = `scaleX(${element.currentTime / element.duration})`;
  };

  return (
    <div ref={wrap} className="nk-film" data-playing={playing ? 'true' : 'false'}>
      <video
        ref={video}
        src={`${FILMS}/${name}.mp4`}
        poster={poster || `${FILMS}/${name}-poster.jpg`}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={onTime}
      />
      <span className="nk-film-texture" aria-hidden="true" />
      <button type="button" className="nk-film-play" onClick={toggle} tabIndex={-1} aria-hidden="true"><Play size={18} fill="currentColor" /><span>Play film</span></button>
      <div className="nk-film-ui">
        <button type="button" onClick={toggle} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>{playing ? <Pause size={12} /> : <Play size={12} />}</button>
        <span className="nk-film-tc">{timecode(time)} <i>/</i> {duration}</span>
        <span className="nk-film-bar" aria-hidden="true"><i ref={bar} /></span>
        <button type="button" onClick={fullscreen} aria-label={`Watch ${label} full screen`}><Maximize2 size={12} /></button>
      </div>
    </div>
  );
}

/* The real Noorakar website, running live inside a browser frame. It renders
   at desktop width and is scaled to fit. A cover keeps page scrolling smooth
   until the visitor chooses to explore the site. */
function LiveSite() {
  const view = useRef(null);
  const [frame, setFrame] = useState({ base: 1440, scale: 1 });
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = view.current;
    const resize = () => {
      const width = element.clientWidth;
      const base = width < 640 ? width : Math.max(1440, width);
      setFrame({ base, scale: width / base });
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNear(true);
      observer.disconnect();
    }, { rootMargin: '800px 0px' });
    observer.observe(element);
    resize();
    return () => { resizeObserver.disconnect(); observer.disconnect(); };
  }, []);

  return (
    <div className="nk-site" data-reveal="media" onMouseLeave={() => setActive(false)}>
      <div className="nk-browser-bar">
        <span><i /><i /><i /></span>
        <a href={LIVE_SITE} target="_blank" rel="noopener noreferrer">noorakaar.vercel.app <ArrowUpRight size={11} /></a>
        {active
          ? <button type="button" className="nk-live-exit" onClick={() => setActive(false)}>Done exploring <X size={12} /></button>
          : <span className="nk-live-status"><b />Live</span>}
      </div>
      <div ref={view} className="nk-live" data-active={active ? 'true' : 'false'}>
        {near && (
          <iframe
            src={LIVE_SITE}
            title="Noorakar’s live website"
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
            style={{ width: `${frame.base}px`, height: `${100 / frame.scale}%`, transform: `scale(${frame.scale})` }}
          />
        )}
        {!loaded && <div className="nk-live-loading" aria-hidden="true"><Mark /><span>Loading the live website</span></div>}
        {!active && <button type="button" className="nk-live-cover" onClick={() => setActive(true)}><span><MousePointer2 size={13} /> Click to explore the live site</span></button>}
      </div>
    </div>
  );
}

function Lines({ as: Tag = 'h2', className = '', lines }) {
  return (
    <Tag className={`nk-lines ${className}`} data-reveal="">
      {lines.map((line, i) => <span key={i} className="nk-line"><span style={{ '--i': i }}>{line}</span></span>)}
    </Tag>
  );
}

function Still({ still, className = '' }) {
  return (
    <figure className={`nk-still ${className}`} data-reveal="media">
      <div className="nk-media-inner"><img src={still.src} alt={`A frame from Noorakar’s ${still.film} film at ${still.tc}`} loading="lazy" width="760" height="428" /></div>
      <figcaption><span>{still.film}</span><span>{still.tc}</span></figcaption>
    </figure>
  );
}

export default function NoorakarEditorialCaseStudy({ project, onOpenInquiry }) {
  const root = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [tone, setTone] = useState('light');
  const motion = !paused && !reducedMotion;
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(preference.matches);
    sync(); preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!indexOpen) return undefined;
    const close = (event) => { if (event.key === 'Escape') setIndexOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [indexOpen]);

  // Reveal on scroll: each element animates in once, the first time it is seen.
  useEffect(() => {
    const elements = root.current.querySelectorAll('[data-reveal]');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => { element.dataset.in = 'true'; });
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.in = 'true';
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    // Anything already on screen at load (like the hero's bottom line) reveals
    // straight away, even if it sits inside the observer's bottom margin.
    elements.forEach((element) => {
      if (element.dataset.in) return;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) element.dataset.in = 'true';
      else observer.observe(element);
    });
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Soft parallax for full-bleed photographs.
  useEffect(() => {
    if (reducedMotion) return undefined;
    const items = Array.from(root.current.querySelectorAll('[data-parallax]'));
    let frame = null;
    const update = () => {
      frame = null;
      const viewport = window.innerHeight;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > viewport + 200) return;
        const progress = (rect.top + rect.height / 2 - viewport / 2) / (viewport + rect.height);
        item.style.setProperty('--p', progress.toFixed(4));
      });
    };
    const request = () => { if (frame === null) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
    return () => { window.removeEventListener('scroll', request); window.removeEventListener('resize', request); if (frame !== null) cancelAnimationFrame(frame); };
  }, [reducedMotion]);

  // The fixed top line switches colour with the section underneath it.
  useEffect(() => {
    const sections = root.current.querySelectorAll('[data-tone]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setTone(entry.target.dataset.tone); });
    }, { rootMargin: '-32px 0px -94% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="nkcs-root" data-motion={motion ? 'playing' : 'paused'}>
      <SEO title={project.seo.title} description={project.seo.description} canonicalUrl={project.seo.canonicalUrl} ogImage={project.seo.ogImage} ogImageAlt="Noorakar’s identity, films and digital experience, by Made by Chanan" ogType="article" schemaData={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description: project.summary, image: project.seo.ogImage, author: { '@type': 'Organization', name: 'Made by Chanan' }, dateModified: '2026-11-17', url: project.seo.canonicalUrl }} />
      <noscript dangerouslySetInnerHTML={{ __html: '<style>.nkcs-root [data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.nkcs-root .nk-line>span{transform:none!important}.nkcs-root .nk-closing-weave path{stroke-dashoffset:0!important}</style>' }} />
      <div className="nk-grain" aria-hidden="true" />

      <header className="nk-top" data-tone={tone}>
        <TransitionLink to="/work" className="nk-top-back"><ArrowLeft size={15} /> All work</TransitionLink>
        <a href="#overview" className="nk-top-title">Noorakar <span>A form of light</span></a>
        <a href={LIVE_SITE} target="_blank" rel="noopener noreferrer" className="nk-top-live">Visit website <ArrowUpRight size={15} /></a>
      </header>

      <main>
        {/* ── Intro (opening screen) ───────────────────────── */}
        <section id="overview" className="nk-intro" data-tone="light">
          <div className="nk-intro-meta" data-reveal=""><span>Noorakar — case study</span><span>Brand · Motion · Films · Digital</span><span>Bharat, 2026</span></div>
          <Lines as="h1" className="nk-intro-statement" lines={['Familiar at heart.', <><em>Open</em> to possibility.</>, 'Made for the way Bharat works.']} />
          <div className="nk-intro-grid">
            <dl className="nk-facts" data-reveal="">
              <div><dt>Client</dt><dd>Noorakar</dd></div>
              <div><dt>Year</dt><dd>2026</dd></div>
              <div><dt>Sector</dt><dd>Artificial intelligence</dd></div>
              <div><dt>Scope</dt><dd>Brand identity<br />Motion system<br />Product films<br />Website design &amp; build</dd></div>
              <div><dt>Made for</dt><dd>Bharat. And what comes next.</dd></div>
            </dl>
            <p className="nk-intro-p" data-reveal="" style={{ '--d': '100ms' }}>Noorakar brings AI into the rhythm of everyday work in India. A question in Hinglish. A voice note between meetings. An idea that needs a place to take shape.</p>
            <p className="nk-intro-p" data-reveal="" style={{ '--d': '200ms' }}>The identity starts with the name: <em>noor</em>, light; <em>ākār</em>, form. A woven symbol opens into view, giving the brand one gesture that can travel from a tiny product detail to a campaign film, a model family and an entire digital world.</p>
          </div>
        </section>

        {/* ── 01 Voice campaign ────────────────────────────── */}
        <section id="voice" className="nk-voice" data-tone="dark">
          <div className="nk-film-head" data-reveal=""><span>01 / The campaign</span><span>Film 01 — Voice</span><span>00:10 · 16:9</span></div>
          <div className="nk-voice-film" data-reveal="media">
            <div className="nk-media-inner"><Film name="voice-film" label="Noorakar’s voice campaign film" duration="00:10" motion={motion} /></div>
          </div>
          <div className="nk-voice-body">
            <Lines className="nk-display" lines={['Say it out loud.', <><em>It’s already</em> moving.</>]} />
            <div className="nk-voice-copy">
              <p data-reveal="">The campaign starts in an ordinary moment: a bus stop, a quiet morning, a thought that arrives long before a keyboard is in reach.</p>
              <p data-reveal="" style={{ '--d': '100ms' }}>One line carries the idea. Speak in the language you think in, and Noorakar takes it from there.</p>
            </div>
          </div>
          <div className="nk-stat" data-reveal="">
            <div className="nk-stat-title"><span className="nk-label">Shabd har minute · words a minute</span><p>Bolo.<br /><em>Likha jaayega.</em></p></div>
            <div className="nk-stat-bars">
              <div style={{ '--h': 1 }}><b>150</b><i /><span>Bolke · spoken</span></div>
              <div style={{ '--h': .18 }}><b>27</b><i /><span>Likhke · typed</span></div>
            </div>
            <p className="nk-stat-note">Speaking is far quicker than typing. That gap is the reason Noorakar listens first. <span>Figures from the Aangan launch film.</span></p>
          </div>
        </section>

        {/* ── 02 Identity ──────────────────────────────────── */}
        <section id="identity" className="nk-identity" data-tone="light">
          <div className="nk-sticky-split">
            <aside className="nk-sticky">
              <p className="nk-label" data-reveal="">02 / Identity</p>
              <Lines className="nk-display" lines={['Noor, light.', <><em>Ākār,</em> form.</>]} />
              <p data-reveal="">A woven symbol opens into view, petal by petal, then settles into the mark. The same motion becomes the brand’s signature: the way screens load, films open and ideas take shape.</p>
              <p data-reveal="">Around it, a field of points turns slowly into a sphere of light. Quiet black canvases, clear sans-serif type and warm accents give the intelligence somewhere calm to live.</p>
              <ol className="nk-steps" data-reveal=""><li><span>01</span>Unfold</li><li><span>02</span>Resolve</li><li><span>03</span>Repeat</li></ol>
            </aside>
            <div className="nk-stack">
              <figure className="nk-weave" data-reveal="media">
                <div className="nk-weave-grid" aria-hidden="true" />
                <AnimatedMark motion={motion} ink={DARK_INK} />
                <figcaption><span>The mark, in motion</span><span>Unfold / resolve / repeat</span></figcaption>
              </figure>
              <div className="nk-pair">
                <figure className="nk-orb" data-reveal="media"><PointField motion={motion} /><figcaption><span>Light becomes form</span><span>Generative study</span></figcaption></figure>
                <figure className="nk-lockup" data-reveal="media"><div><Mark /><span>noorakar</span></div><figcaption><span>Primary lockup</span><span>Bone on ink</span></figcaption></figure>
              </div>
              <figure className="nk-scale" data-reveal="">
                {[160, 96, 56, 32, 16].map((size) => <div key={size}><Mark /><span>{size}px</span></div>)}
                <figcaption><span>One mark, every size</span><span>From a campaign film to a favicon</span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── Marquee ──────────────────────────────────────── */}
        <section className="nk-marquee" data-tone="dark" aria-label="Noor means light. Ākār means form.">
          <div className="nk-marquee-track" aria-hidden="true">
            {[0, 1].map((group) => (
              <div key={group} className="nk-marquee-group">
                <span>noor</span><Mark /><em>light</em><Mark /><span>ākār</span><Mark /><em>form</em><Mark />
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 Aangan ────────────────────────────────────── */}
        <section id="aangan" className="nk-aangan" data-tone="light">
          <figure className="nk-photo" data-reveal="media" data-parallax="">
            <div className="nk-media-inner"><img src={`${ASSETS}/garden-work-natural.webp`} alt="A woman working on her laptop in the warm light of a garden veranda, from Noorakar’s Aangan campaign" width="1536" height="1024" loading="lazy" /></div>
            <div className="nk-photo-lockup"><Mark /><span>Apni jagah.<br />Apna flow.</span></div>
            <figcaption><span>03 — Aangan</span><span>A home for your work.</span></figcaption>
          </figure>
          <div className="nk-chapter-head">
            <p className="nk-label" data-reveal="">03 / Aangan</p>
            <Lines className="nk-display" lines={['A courtyard', <>for <em>every</em> project.</>]} />
            <div className="nk-chapter-copy">
              <p data-reveal="">Aangan is a shared space for the work itself. Launch decks, whiteboards, budgets and side projects sit side by side, and teammates drop in the way they would across a courtyard.</p>
              <p data-reveal="" style={{ '--d': '100ms' }}>The launch film moves at the pace of a good idea: bright colour worlds, playful pixel icons, cursors that belong to real people and a single instruction that ties it together. <em>Design out loud.</em></p>
            </div>
          </div>
          <div className="nk-board nk-board--aangan" data-reveal="media">
            <div className="nk-board-meta"><span>Film 02</span><span>Aangan — launch film</span><span>01:14</span></div>
            <div className="nk-board-screen"><Film name="aangan-film" label="Noorakar’s Aangan launch film" duration="01:14" motion={motion} /></div>
            <div className="nk-board-meta"><span>Design out loud.</span><span>Hinglish first</span><span>16:9</span></div>
          </div>
          <div className="nk-stills">
            {[STILLS[2], STILLS[4], STILLS[10]].map((still) => <Still key={still.src} still={still} />)}
          </div>
        </section>

        {/* ── 04 Roop ──────────────────────────────────────── */}
        <section id="roop" className="nk-roop" data-tone="light">
          <figure className="nk-photo nk-photo--roop" data-reveal="media" data-parallax="">
            <div className="nk-media-inner"><img src={`${ASSETS}/studio-work.webp`} alt="A designer exploring a visual workspace at a desk full of material samples, from Noorakar’s Roop campaign" width="1536" height="1024" loading="lazy" /></div>
            <div className="nk-photo-split"><span>From a thought.</span><span>To a whole <em>new world.</em></span></div>
            <figcaption><span>04 — Roop</span><span>Answers that take shape.</span></figcaption>
          </figure>
          <div className="nk-sticky-split nk-sticky-split--roop">
            <aside className="nk-sticky">
              <p className="nk-label" data-reveal="">04 / Roop</p>
              <Lines className="nk-display" lines={['Ask for a lesson.', <><em>Get a lab.</em></>]} />
              <p data-reveal="">Roop turns answers into things you can see and touch. The film follows one request, typed in everyday Hinglish:</p>
              <blockquote className="nk-prompt-quote" data-reveal="">“Mujhe quantum computing samjhao, bilkul basics se, visual lesson ke saath.”</blockquote>
              <p data-reveal="">What comes back is a working quantum lab: a qubit to rotate, waves that interfere and two particles that always agree. Soft pink, crisp interface and one blue spark carry the product’s own personality.</p>
            </aside>
            <div className="nk-stack">
              <div className="nk-board nk-board--roop" data-reveal="media">
                <div className="nk-board-meta"><span>Film 03</span><span>Introducing Roop</span><span>00:52</span></div>
                <div className="nk-board-screen"><Film name="roop-film" label="Noorakar’s Introducing Roop film" duration="00:52" motion={motion} /></div>
              </div>
              <div className="nk-stills nk-stills--two">
                {[STILLS[8], STILLS[3]].map((still) => <Still key={still.src} still={still} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 Zoorav Cowork ─────────────────────────────── */}
        <section id="cowork" className="nk-cowork" data-tone="dark">
          <div className="nk-cowork-head">
            <p className="nk-label" data-reveal="">05 / Zoorav Cowork</p>
            <Lines className="nk-display" lines={['One line in Hinglish.', <><em>A whole day,</em> planned.</>]} />
          </div>
          <div className="nk-cowork-prompt" data-reveal=""><span className="nk-type">Aaj ke kaam ka plan bana do</span><i aria-hidden="true" /></div>
          <div className="nk-cowork-film" data-reveal="media">
            <div className="nk-media-inner"><Film name="zoorav-film" label="Noorakar’s Zoorav Cowork introduction film" duration="00:16" motion={motion} /></div>
          </div>
          <div className="nk-cowork-foot">
            <p data-reveal="">Zoorav is the coworker inside Noorakar. Ask for today’s plan the way you would ask a colleague, and it comes back in order, on desktop and phone.</p>
            <ol className="nk-plan">
              {PLAN.map(([time, title, note], i) => <li key={time} data-reveal="" style={{ '--d': `${i * 90}ms` }}><span>{time}</span><b>{title}</b><em>{note}</em></li>)}
            </ol>
          </div>
        </section>

        {/* ── 06 Models ────────────────────────────────────── */}
        <section id="models" className="nk-models" data-tone="dark">
          <div className="nk-models-head">
            <p className="nk-label" data-reveal="">06 / From the Noorakar lab</p>
            <Lines className="nk-display" lines={['Different minds.', <><em>A shared</em> language.</>]} />
            <p data-reveal="">Savitra, Arka, Shruti and Vyom sit inside the same visual system: luminous petal forms, each with its own colour world. Against a quiet black canvas, every model gets room to breathe.</p>
          </div>
          <div className="nk-model-grid">
            {MODELS.map((model, index) => (
              <figure key={model.name} className="nk-model" style={{ '--glow': model.glow, '--d': `${index * 110}ms` }} data-reveal="">
                <span className="nk-model-no">0{index + 1}</span>
                <div className="nk-model-art"><img src={`${ASSETS}/${model.image}`} alt={`${model.name}, a luminous form from Noorakar’s model identity`} width="768" height="768" loading="lazy" /></div>
                <figcaption><h3>{model.name}</h3><p>{model.role}</p></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── 07 Frames ────────────────────────────────────── */}
        <section className="nk-frames" data-tone="dark" aria-label="Frame by frame: stills from four Noorakar films">
          <div className="nk-frames-head">
            <p className="nk-label" data-reveal="">07 / Frame by frame</p>
            <p data-reveal="">Sixteen frames from four films. Every product keeps its own colour world. The light runs through all of them.</p>
          </div>
          <div className="nk-strip" data-reveal="">
            <div className="nk-strip-track">
              {[...STILLS, ...STILLS].map((still, i) => (
                <figure key={`${still.src}-${i}`} aria-hidden={i >= STILLS.length ? 'true' : undefined}>
                  <img src={still.src} alt={i < STILLS.length ? `A frame from Noorakar’s ${still.film} film` : ''} loading="lazy" width="760" height="428" />
                  <figcaption><span>NK—{String((i % STILLS.length) + 1).padStart(3, '0')}</span><span>{still.film} {still.tc}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 08 Website ───────────────────────────────────── */}
        <section id="website" className="nk-website" data-tone="light">
          <div className="nk-chapter-head">
            <p className="nk-label" data-reveal="">08 / The website</p>
            <Lines className="nk-display" lines={['A brand you can', <><em>step inside.</em></>]} />
            <div className="nk-chapter-copy">
              <p data-reveal="">The website brings the whole system together. A moving field of points invites the first question. Product stories open into generous visual spaces, and the models, agents and tools share one clear navigation.</p>
              <p data-reveal="" style={{ '--d': '100ms' }}>English and Hinglish sit naturally beside each other, from a meeting transcript to the next big idea.</p>
            </div>
          </div>
          <LiveSite />
          <div className="nk-site-caption" data-reveal=""><span>The live website, running in the page</span><a href={LIVE_SITE} target="_blank" rel="noopener noreferrer">Open it in a new tab <ArrowUpRight size={14} /></a></div>
        </section>

        {/* ── Closing ──────────────────────────────────────── */}
        <section className="nk-closing" data-tone="dark">
          <svg className="nk-closing-weave" viewBox="0 0 512 512" aria-hidden="true" data-reveal="draw"><path d={weavePath(Array(8).fill(1))} pathLength="1" /></svg>
          <div className="nk-closing-top" data-reveal=""><span className="nk-label">Noorakar / Brand, motion, films &amp; digital</span><span className="nk-label">Fin — 2026</span></div>
          <Lines className="nk-closing-title" lines={['Rooted in Bharat.', <><em>Made to unfold.</em></>]} />
          <div className="nk-closing-foot" data-reveal="">
            <span>A connected identity for<br />everything Noorakar is becoming.</span>
            <button type="button" onClick={onOpenInquiry}>Have something in mind? <ArrowUpRight size={20} /></button>
          </div>
        </section>

        <TransitionLink to={`/work/${nextProject.slug}`} className="nk-next" data-tone="dark">
          <div><span className="nk-label">Next project</span><h2>{nextProject.title.split('—')[0].trim()}</h2><span>{nextProject.title.split('—')[1]?.trim()} <ArrowUpRight size={18} /></span></div>
          <div className="nk-next-media"><img src={nextProject.image} alt={nextProject.title} loading="lazy" /></div>
        </TransitionLink>
      </main>

      <footer className="nk-footer"><TransitionLink to="/">Made by Chanan</TransitionLink><span>Independent design. Shared ambition.</span><span>© 2026</span></footer>

      <nav className="nk-dock" aria-label="Case study controls">
        {indexOpen && (
          <div id="nk-project-index" className="nk-index" data-lenis-prevent="">
            <p>Inside the project</p>
            {CHAPTERS.map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => setIndexOpen(false)}><span>0{i}</span>{label}<ArrowUpRight size={14} /></a>)}
          </div>
        )}
        <TransitionLink to="/" className="nk-dock-brand"><img src="/logo.svg" alt="" />Chanan</TransitionLink>
        <button type="button" className="nk-dock-motion" onClick={() => setPaused((value) => !value)} disabled={reducedMotion} aria-label={reducedMotion ? 'Motion disabled by your device preference' : paused ? 'Play motion' : 'Pause motion'}>{motion ? <Pause size={13} /> : <Play size={13} />}<span>{reducedMotion ? 'Reduced motion' : paused ? 'Play motion' : 'Pause motion'}</span></button>
        <button type="button" className="nk-dock-index" aria-expanded={indexOpen} aria-controls="nk-project-index" aria-label={indexOpen ? 'Close project index' : 'Open project index'} onClick={() => setIndexOpen((value) => !value)}><span>Noorakar</span>{indexOpen ? <X size={18} /> : <Plus size={18} />}</button>
      </nav>
    </div>
  );
}
