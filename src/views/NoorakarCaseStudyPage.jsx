import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { projects } from '../data/projects';
import {
  NOORAKAR_MARK_CORE,
  NOORAKAR_MARK_DOT,
  NOORAKAR_MARK_LOBES,
  NOORAKAR_MARK_PETALS,
  NOORAKAR_MARK_VIEWBOX,
} from '../data/noorakarMarkPaths';

const ASSETS = '/work/noorakar-assets';

// Latin runs in Instrument Serif and Manrope; every Indic script gets its own
// serif so Hindi, Punjabi and Kannada never fall back to system boxes.
// Google Fonts serves these per unicode-range, so only the scripts actually
// rendered on the page are downloaded.
const NOORAKAR_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&family=Tiro+Gurmukhi&family=Tiro+Kannada&family=Tiro+Bangla&family=Tiro+Telugu&family=Tiro+Tamil&family=Noto+Serif+Malayalam:wght@500&family=Noto+Serif+Gujarati:wght@500&family=Noto+Serif+Oriya:wght@500&display=swap';

const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The problem' },
  { id: 'identity', label: 'Name & mark' },
  { id: 'language', label: 'Language' },
  { id: 'models', label: 'Models' },
  { id: 'agents', label: 'Agents' },
  { id: 'bol', label: 'Bol' },
  { id: 'films', label: 'Launch films' },
  { id: 'website', label: 'Website' },
  { id: 'outcome', label: 'Outcome' },
];

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setInView(true);
      observer.disconnect();
    }, { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function NoorakarMark({ className = '' }) {
  return (
    <svg className={className} viewBox={NOORAKAR_MARK_VIEWBOX} fill="currentColor" aria-hidden="true" focusable="false">
      {NOORAKAR_MARK_PETALS.map((d) => <path key={d.slice(0, 16)} d={d} />)}
      {NOORAKAR_MARK_LOBES.map((d) => <path key={d.slice(0, 16)} d={d} />)}
      <path d={NOORAKAR_MARK_CORE} />
      <path d={NOORAKAR_MARK_DOT} />
    </svg>
  );
}

const MARK_LAYERS = [
  ...NOORAKAR_MARK_PETALS.map((d, index) => ({ d, start: 0.04 + (index * 0.05), end: 0.2 + (index * 0.05) })),
  ...NOORAKAR_MARK_LOBES.map((d, index) => ({ d, start: 0.3 + (index * 0.035), end: 0.42 + (index * 0.035) })),
  { d: NOORAKAR_MARK_CORE, start: 0.44, end: 0.64 },
  { d: NOORAKAR_MARK_DOT, start: 0.64, end: 0.7 },
];

const CONSTRUCTION_STEPS = [
  { label: 'Four petals', copy: 'The outer frame: a jaali lattice drawn as four continuous petals.', until: 0.3 },
  { label: 'Four lobes', copy: 'Rounded arches tuck between the petals, like a carved window.', until: 0.44 },
  { label: 'The interlace', copy: 'One woven core ties every petal back to the centre.', until: 0.64 },
  { label: 'Noor', copy: 'A single point of light. The form exists to hold it.', until: 1 },
];

const CONSTRUCTION_DURATION = 11000;

function MarkConstruction() {
  const boardRef = useRef(null);
  const layerRefs = useRef([]);
  const guidesRef = useRef(null);
  const glowRef = useRef(null);
  const markRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const clamp = (value) => Math.min(1, Math.max(0, value));
    const ease = (value) => value * value * (3 - (2 * value));
    let lastStep = -1;

    const render = (phase) => {
      MARK_LAYERS.forEach((layer, index) => {
        const draw = ease(clamp((phase - layer.start) / (layer.end - layer.start)));
        const path = layerRefs.current[index];
        if (!path) return;
        path.style.strokeDashoffset = String(1 - draw);
        path.style.fillOpacity = String(ease(clamp((phase - 0.7) / 0.08)));
      });

      const fadeOut = 1 - ease(clamp((phase - 0.9) / 0.08));
      if (markRef.current) markRef.current.style.opacity = String(fadeOut);
      if (guidesRef.current) {
        guidesRef.current.style.opacity = String(Math.min(1, Math.sin(Math.PI * clamp(phase / 0.78)) * 1.6) * fadeOut);
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = String(ease(clamp((phase - 0.68) / 0.1)) * fadeOut);
      }

      const step = CONSTRUCTION_STEPS.findIndex((item) => phase < item.until);
      if (step !== lastStep) {
        lastStep = step;
        setActiveStep(step === -1 ? CONSTRUCTION_STEPS.length - 1 : step);
      }
    };

    if (prefersReducedMotion()) {
      render(0.8);
      return undefined;
    }

    let frame = null;
    let startTime;
    let elapsedBeforePause = 0;

    const tick = (timestamp) => {
      if (startTime === undefined) startTime = timestamp - elapsedBeforePause;
      const elapsed = timestamp - startTime;
      elapsedBeforePause = elapsed;
      render((elapsed % CONSTRUCTION_DURATION) / CONSTRUCTION_DURATION);
      frame = window.requestAnimationFrame(tick);
    };

    render(0);
    // Only animate while the board is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && frame === null) {
        startTime = undefined;
        frame = window.requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }, { threshold: 0.1 });
    if (boardRef.current) observer.observe(boardRef.current);

    return () => {
      observer.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure ref={boardRef} className="nkcs-construction">
      <div className="nkcs-construction-stage">
        <svg
          className="nkcs-construction-svg"
          viewBox={NOORAKAR_MARK_VIEWBOX}
          role="img"
          aria-label="The Noorakar mark being drawn: four petals, four lobes, an interlaced core and a central point of light"
        >
          <defs>
            <radialGradient id="nkcs-noor-glow">
              <stop offset="0%" stopColor="#ffd28a" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#f3a64f" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#f3a64f" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g ref={guidesRef} className="nkcs-construction-guides" aria-hidden="true">
            <circle cx="256" cy="256" r="210" />
            <circle cx="256" cy="256" r="145" />
            <circle cx="256" cy="256" r="78" />
            <line x1="20" y1="256" x2="492" y2="256" />
            <line x1="256" y1="20" x2="256" y2="492" />
            <line x1="90" y1="90" x2="422" y2="422" className="is-soft" />
            <line x1="422" y1="90" x2="90" y2="422" className="is-soft" />
          </g>
          <circle ref={glowRef} className="nkcs-construction-glow" cx="256" cy="263" r="120" fill="url(#nkcs-noor-glow)" />
          <g ref={markRef}>
            {MARK_LAYERS.map((layer, index) => (
              <path
                key={layer.d.slice(0, 16)}
                ref={(element) => { layerRefs.current[index] = element; }}
                className="nkcs-construction-path"
                d={layer.d}
                pathLength="1"
              />
            ))}
          </g>
        </svg>
      </div>
      <ol className="nkcs-construction-steps">
        {CONSTRUCTION_STEPS.map((step, index) => (
          <li key={step.label} className={activeStep === index ? 'is-active' : ''}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <b>{step.label}</b>
              <p>{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const GREETINGS = [
  { lang: 'Hindi', code: 'hi', text: 'क्या हाल है?', roman: 'Kya haal hai?', tone: 'plum' },
  { lang: 'Punjabi', code: 'pa', text: 'ਕੀ ਹਾਲ ਆ?', roman: 'Ki haal aa?', tone: 'mint' },
  { lang: 'Kannada', code: 'kn', text: 'ಹೇಗಿದ್ದೀರಾ?', roman: 'Hegiddira?', tone: 'sky' },
  { lang: 'Hinglish', code: 'en-IN', text: 'Namaste, aaj kya karna hai?', roman: 'The default register', tone: 'peach' },
];

function GreetingSwitcher() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView || paused || prefersReducedMotion()) return undefined;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % GREETINGS.length), 2600);
    return () => window.clearTimeout(timer);
  }, [index, inView, paused]);

  const greeting = GREETINGS[index];

  return (
    <div ref={ref} className={`nkcs-greeting nkcs-tone-${greeting.tone}`}>
      <div className="nkcs-greeting-tabs" role="tablist" aria-label="Choose a language">
        {GREETINGS.map((item, itemIndex) => (
          <button
            key={item.lang}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            className={itemIndex === index ? 'is-active' : ''}
            onClick={() => { setIndex(itemIndex); setPaused(true); }}
          >
            {item.lang}
          </button>
        ))}
      </div>
      <p key={greeting.lang} className="nkcs-greeting-text" lang={greeting.code}>
        {greeting.text}
      </p>
      <span className="nkcs-greeting-roman">{greeting.roman}</span>
    </div>
  );
}

function LoopVideo({ src, poster, label, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}

function FilmPlayer({ src, poster, title, meta, orientation = 'landscape' }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
  };

  return (
    <figure className={`nkcs-film nkcs-film-${orientation}${started ? ' is-started' : ''}`}>
      <div className="nkcs-film-frame">
        <video ref={videoRef} src={src} poster={poster} preload="none" playsInline controls={started} />
        {!started && (
          <button type="button" className="nkcs-film-play" onClick={start} aria-label={`Play ${title} with sound`}>
            <span className="nkcs-film-play-icon" aria-hidden="true" />
            <span>Play film · sound on</span>
          </button>
        )}
      </div>
      <figcaption>
        <span>{title}</span>
        <span>{meta}</span>
      </figcaption>
    </figure>
  );
}

const ENQUIRY_READS = {
  generic: [
    { tag: 'Reads', text: 'A greeting, then a pricing question' },
    { tag: 'Misses', text: '“pcs” means pieces, not PCs' },
    { tag: 'Misses', text: 'The real question is GST inclusive or exclusive' },
    { tag: 'Misses', text: '“kal tak” is the deadline, not small talk' },
    { tag: 'Replies', text: 'In English, asking which product they mean' },
  ],
  noorakar: [
    { tag: 'Reads', text: 'A quotation request for 200 pieces' },
    { tag: 'Catches', text: 'The GST question: inclusive or exclusive' },
    { tag: 'Catches', text: 'Delivery is needed by tomorrow' },
    { tag: 'Catches', text: 'Repeat buyer, so the rate card applies' },
    { tag: 'Replies', text: 'In the customer’s language, with the ₹ split they asked for' },
  ],
};

function EnquiryBoard() {
  return (
    <div className="nkcs-enquiry">
      <div className="nkcs-enquiry-message">
        <p className="nkcs-eyebrow">Incoming · WhatsApp · 9:04 pm</p>
        <blockquote>bhaiya 200 pcs ka rate kya hai? gst alag se ya include? kal tak chahiye</blockquote>
      </div>
      <div className="nkcs-enquiry-reads">
        <div className="nkcs-enquiry-col is-generic">
          <p className="nkcs-enquiry-head">A general-purpose model</p>
          <ul>
            {ENQUIRY_READS.generic.map((row) => (
              <li key={row.text} data-tag={row.tag.toLowerCase()}><span>{row.tag}</span><p>{row.text}</p></li>
            ))}
          </ul>
        </div>
        <div className="nkcs-enquiry-col is-noorakar">
          <p className="nkcs-enquiry-head"><NoorakarMark className="nkcs-inline-mark" /> Noorakar</p>
          <ul>
            {ENQUIRY_READS.noorakar.map((row) => (
              <li key={row.text} data-tag={row.tag.toLowerCase()}><span>{row.tag}</span><p>{row.text}</p></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const MODELS = [
  {
    name: 'Savitra',
    meaning: 'the sun that wakes the mind',
    job: 'Careful work',
    copy: 'Quotations, the hisaab and multi-step reconciliation, where a mistake costs money.',
    prompt: 'Is mahine ka hisaab milao',
    image: `${ASSETS}/model-savitra.jpg`,
    tone: 'indigo',
  },
  {
    name: 'Arka',
    meaning: 'a ray of the sun',
    job: 'Fast replies',
    copy: 'Everyday chat for Indian business: sorted enquiries and replies short enough for a weak connection.',
    prompt: 'bhaiya 200 pcs ka rate kya hai? gst alag se ya include?',
    image: `${ASSETS}/model-arka.jpg`,
    tone: 'saffron',
  },
  {
    name: 'Shruti',
    meaning: 'that which is heard',
    job: 'Listening',
    copy: 'Voice notes, calls and meetings in Hindi, Punjabi and Kannada, written out clean.',
    prompt: 'haan bhaiya woh do sau piece aur chahiye, Monday tak bhej doge?',
    image: `${ASSETS}/model-shruti.jpg`,
    tone: 'mint',
  },
];

const TOOL_TRAIL = [
  { app: 'Gmail', action: 'Reading today’s orders', tone: 'red' },
  { app: 'Notion', action: 'Checking the price list', tone: 'ink' },
  { app: 'Drive', action: 'Checking the khata', tone: 'green' },
  { app: 'Slack', action: 'Updating the team', tone: 'violet' },
];

function AgentRun() {
  const [ref, inView] = useInView(0.35);

  return (
    <div ref={ref} className={`nkcs-agent-run${inView ? ' is-running' : ''}`}>
      <div className="nkcs-agent-brief">
        <span className="nkcs-agent-avatar">M</span>
        <p>Aaj ke saare orders ka invoice bana do, aur jinka payment pending hai unko reminder bhej do.</p>
      </div>
      <ol className="nkcs-agent-trail">
        {TOOL_TRAIL.map((step, index) => (
          <li key={step.app} style={{ '--i': index }}>
            <i className={`nkcs-app-dot is-${step.tone}`} aria-hidden="true" />
            <b>{step.app}</b>
            <span>{step.action}</span>
          </li>
        ))}
      </ol>
      <div className="nkcs-approval" style={{ '--i': TOOL_TRAIL.length }}>
        <p className="nkcs-approval-head"><b>Munshi</b> wants to send 3 reminders</p>
        <div className="nkcs-approval-item">
          <span>Re: Kaur &amp; Sons</span>
          <p>Namaste ji, ₹18,400 ka invoice abhi pending hai. Aaj tak clear ho jaye toh badhiya.</p>
        </div>
        <div className="nkcs-approval-actions">
          <span className="is-primary">Approve &amp; send</span>
          <span>Edit</span>
        </div>
        <p className="nkcs-approval-note">Aapke OK ke bina, kuch bahar nahi jaata.</p>
      </div>
    </div>
  );
}

const RAW_DICTATION = [
  ['yaar'], ['umm', true], ['kal'], ['ka', true], ['client'], ['wala'], ['deck'], ['bhej'], ['dena'],
  ['actually wait', true], ['ppt'], ['aur'], ['pdf'], ['dono'], ['and uh', true], ['thoda'], ['clean'],
  ['karna'], ['please'], ['make'], ['it'], ['less'], ['mid'], ['haan', true], ['aur'], ['meeting'],
  ['friday'], ['nahi'], ['monday'], ['ko'], ['rakhna'],
];

const CLEAN_DICTATION = 'Yaar, kal wala client deck bhej dena—PPT aur PDF, dono. Thoda clean karna; please make it less mid. Aur meeting Friday nahi, Monday ko rakhna.';

function DictationDemo() {
  const [ref, inView] = useInView(0.35);
  const [run, setRun] = useState(0);
  let fillerIndex = 0;

  return (
    <div ref={ref} key={run} className={`nkcs-dictation${inView ? ' is-playing' : ''}`}>
      <div className="nkcs-dictation-panel is-raw">
        <div className="nkcs-dictation-head">
          <span className="nkcs-dictation-wave" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--i': index }} />)}
          </span>
          <span>Voice note · 0:14</span>
        </div>
        <p>
          {RAW_DICTATION.map(([word, isFiller], index) => {
            const delay = isFiller ? fillerIndex++ : 0;
            return (
              <React.Fragment key={`${word}-${index}`}>
                <span className={isFiller ? 'is-filler' : ''} style={isFiller ? { '--i': delay } : undefined}>{word}</span>{' '}
              </React.Fragment>
            );
          })}
        </p>
      </div>
      <div className="nkcs-dictation-arrow" aria-hidden="true">→</div>
      <div className="nkcs-dictation-panel is-clean">
        <div className="nkcs-dictation-head">
          <span>Edited by Bol</span>
          <span className="nkcs-dictation-ready">Ready to send</span>
        </div>
        <p>
          {CLEAN_DICTATION.split(' ').map((word, index) => (
            <React.Fragment key={`${word}-${index}`}>
              <span style={{ '--i': index }}>{word}</span>{' '}
            </React.Fragment>
          ))}
        </p>
        <div className="nkcs-dictation-tags">
          <span>Filler removed</span><span>Grammar fixed</span><span>Hinglish kept</span><span>Slang understood</span>
        </div>
      </div>
      <button type="button" className="nkcs-dictation-replay" onClick={() => setRun((value) => value + 1)}>
        Replay
      </button>
    </div>
  );
}

function SectionIntro({ eyebrow, title, children }) {
  return (
    <header className="nkcs-section-intro">
      <p className="nkcs-eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </header>
  );
}

export default function NoorakarCaseStudyPage({ project, onOpenInquiry }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sections = chapterRefs.current.filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.chapter);
          if (!Number.isNaN(index)) setActiveChapter(index);
        });
      },
      { rootMargin: '-28% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const registerChapter = (index) => (element) => {
    chapterRefs.current[index] = element;
  };

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'CreativeWork'],
    headline: project.title,
    name: project.title,
    description: project.summary,
    image: project.seo.ogImage,
    author: { '@type': 'Organization', name: 'Made by Chanan' },
    publisher: { '@type': 'Organization', name: 'Made by Chanan' },
    datePublished: `${project.year}-01-01`,
    dateModified: '2026-10-02',
    url: project.seo.canonicalUrl,
    inLanguage: 'en-GB',
  };

  return (
    <div className="nkcs-root">
      <SEO
        title={project.seo.title}
        description={project.seo.description}
        canonicalUrl={project.seo.canonicalUrl}
        ogImage={project.seo.ogImage}
        ogImageAlt="Noorakar AI agents case study by Made by Chanan"
        ogType="article"
        schemaData={schemaData}
        articlePublishedTime={`${project.year}-01-01T00:00:00+00:00`}
        articleModifiedTime="2026-10-02T00:00:00+00:00"
      />
      <Head>
        <link rel="stylesheet" href={NOORAKAR_FONTS_URL} />
      </Head>

      <div className="nkcs-layout">
        <aside className="nkcs-sidebar">
          <div className="nkcs-sidebar-inner">
            <div>
              <p className="nkcs-sidebar-wordmark"><NoorakarMark className="nkcs-sidebar-mark" />noorakar</p>
              <p className="nkcs-sidebar-descriptor">AI agents that speak Bharat</p>
              <p className="nkcs-sidebar-meta">BRAND · PRODUCT · FILM · WEB · 2026</p>
            </div>

            <nav className="nkcs-chapters" aria-label="Noorakar case study sections">
              {CHAPTERS.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className={`nkcs-chapter-link${activeChapter === index ? ' is-active' : ''}`}
                >
                  {chapter.label}
                </a>
              ))}
            </nav>

            <TransitionLink to="/work" className="nkcs-back">
              All work <ArrowUpRight size={14} />
            </TransitionLink>
          </div>
        </aside>

        <main className="nkcs-content">
          <figure className="nkcs-hero case-study-transition-target">
            <video src={project.video} poster={`${ASSETS}/hero-poster.jpg`} autoPlay muted loop playsInline />
            <figcaption>
              <span>Noorakar launch film</span>
              <span>Identity · motion · product world</span>
            </figcaption>
          </figure>

          <section
            id="overview"
            className="nkcs-section nkcs-overview"
            data-chapter="0"
            ref={registerChapter(0)}
          >
            <p className="nkcs-eyebrow">Overview</p>
            <div className="nkcs-overview-copy">
              <h1>Intelligence that<br />speaks <em>Bharat.</em></h1>
              <p>
                Noorakar is an AI assistant and a team of AI agents for the way India actually works: in
                Hinglish, over WhatsApp and voice notes, with GST on every line. We shaped the identity, the
                product story, the launch films and the website around one promise. Not translated.
                Understood.
              </p>
              <dl className="nkcs-facts">
                <div><dt>Client</dt><dd>Noorakar</dd></div>
                <div><dt>Sector</dt><dd>AI agents for Indian business</dd></div>
                <div><dt>Scope</dt><dd>Identity, product story, films, website</dd></div>
                <div><dt>Status</dt><dd>Launching Fall 2026</dd></div>
              </dl>
            </div>
          </section>

          <section
            id="problem"
            className="nkcs-section nkcs-section-ivory"
            data-chapter="1"
            ref={registerChapter(1)}
          >
            <SectionIntro
              eyebrow="The problem"
              title="General AI reads the words. It misses the business."
            >
              <p>
                Indian business runs on messages like this one: three languages of shorthand, a tax question
                and a deadline in a single line. A model trained to understand the whole world still answers
                it like a stranger. Everything in Noorakar, including the brand, starts from understanding it.
              </p>
            </SectionIntro>

            <EnquiryBoard />

            <p className="nkcs-pullquote">It isn’t a harder problem. It’s a <em>different</em> one.</p>
          </section>

          <section
            id="identity"
            className="nkcs-section nkcs-section-night"
            data-chapter="2"
            ref={registerChapter(2)}
          >
            <SectionIntro eyebrow="Name & mark" title={<>Noor, light. Ākār, form.</>}>
              <p>
                Noorakar means a form of light, made for Bharat. The mark takes the name literally: four
                petals of a jaali lattice interlace around a single point of light. It is architectural enough
                to sit carved into a sandstone arch and simple enough to work at sixteen pixels in a chat header.
              </p>
            </SectionIntro>

            <MarkConstruction />

            <figure className="nkcs-wide-art">
              <img
                src={`${ASSETS}/arch.jpg`}
                width="1672"
                height="941"
                alt="The Noorakar mark floating inside a carved sandstone arch at sunset with the line Apni zubaan se shuru karo"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>Campaign key art</span>
                <span>Apni zubaan se shuru karo.</span>
              </figcaption>
            </figure>

            <div className="nkcs-identity-pair">
              <figure className="nkcs-identity-sky">
                <img
                  src={`${ASSETS}/mark-clouds.jpg`}
                  width="1080"
                  height="1350"
                  alt="The Noorakar mark in silver against a night sky and clouds"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="nkcs-palette">
                <p className="nkcs-eyebrow">Colour</p>
                <h3>From dusk indigo to saffron morning.</h3>
                <p>
                  The palette comes from Indian light rather than tech blue: carved sandstone, sunset
                  saffron, sindoor maroon and the indigo of the hour before a shop opens.
                </p>
                <ul>
                  <li style={{ '--swatch': '#2d4ed8' }}><span />Dusk indigo</li>
                  <li style={{ '--swatch': '#f08a3c' }}><span />Saffron</li>
                  <li style={{ '--swatch': '#d9a35b' }}><span />Sandstone</li>
                  <li style={{ '--swatch': '#5a1512' }}><span />Sindoor</li>
                  <li style={{ '--swatch': '#f4f0e8' }}><span />Ivory</li>
                </ul>
              </div>
            </div>
          </section>

          <section
            id="language"
            className="nkcs-section nkcs-section-maroon"
            data-chapter="3"
            ref={registerChapter(3)}
          >
            <SectionIntro eyebrow="Language" title={<>Yahin ki zubaan. Yahin ka <em>tareeka.</em></>}>
              <p>
                Hinglish is the default register of Indian business, not an edge case. The type system
                treats every script as a first-class citizen: Instrument Serif carries the Latin voice, and
                Devanagari, Gurmukhi and Kannada each get a serif of their own instead of fallback boxes.
              </p>
            </SectionIntro>

            <div className="nkcs-language-board">
              <GreetingSwitcher />
              <figure className="nkcs-social-loop">
                <LoopVideo
                  src={`${ASSETS}/brand-grid.mp4`}
                  poster={`${ASSETS}/brand-grid-poster.jpg`}
                  label="Noorakar social loop cycling through greetings in Hindi, Punjabi and Kannada"
                />
                <figcaption><span>Social system</span><span>4:5 loop</span></figcaption>
              </figure>
            </div>

            <div className="nkcs-scripts" aria-label="The letter A in nine Indian scripts">
              {['अ', 'অ', 'అ', 'അ', 'અ', 'ಅ', 'ਅ', 'அ', 'ଅ', 'Aa'].map((glyph) => <span key={glyph}>{glyph}</span>)}
            </div>

            <figure className="nkcs-wide-art nkcs-wide-art-maroon">
              <img
                src={`${ASSETS}/yahin-ki-zubaan.jpg`}
                width="1536"
                height="1024"
                alt="A woman in a printed saree walking past a red city bus beside the line Yahin ki zubaan. Yahin ka tareeka"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>Campaign</span>
                <span>Yahin ki zubaan. Yahin ka tareeka.</span>
              </figcaption>
            </figure>
          </section>

          <section
            id="models"
            className="nkcs-section nkcs-section-mist"
            data-chapter="4"
            ref={registerChapter(4)}
          >
            <SectionIntro eyebrow="Models" title="One model can’t do it all. So there are three.">
              <p>
                Noorakar runs on three models: one careful, one fast, one that listens. Each has a Sanskrit
                name, a lotus glyph and a colour world of its own, so a technical architecture reads like a
                cast of characters people can remember.
              </p>
            </SectionIntro>

            <div className="nkcs-models">
              {MODELS.map((model) => (
                <article key={model.name} className={`nkcs-model is-${model.tone}`}>
                  <img src={model.image} alt={`${model.name} model glyph`} width="720" height="720" loading="lazy" decoding="async" />
                  <div className="nkcs-model-copy">
                    <h3>{model.name}</h3>
                    <p className="nkcs-model-meaning">{model.meaning}</p>
                    <span className="nkcs-model-job">{model.job}</span>
                    <p>{model.copy}</p>
                    <p className="nkcs-model-prompt">“{model.prompt}”</p>
                  </div>
                </article>
              ))}
            </div>

            <FilmPlayer
              src={`${ASSETS}/models-film.mp4`}
              poster={`${ASSETS}/models-film-poster.jpg`}
              title="Models film"
              meta="Savitra · Arka · Shruti · 1:05"
            />
          </section>

          <section
            id="agents"
            className="nkcs-section nkcs-section-indigo"
            data-chapter="5"
            ref={registerChapter(5)}
          >
            <SectionIntro eyebrow="Agents" title="Chatbots answer. Noorakar finishes the work.">
              <p>
                The product story moves past chat. Noorakar’s agents read the orders in Gmail, check the khata
                in Drive and update the team on Slack, then bring the finished work back for one tap of
                approval. We designed the interface around that hand-off: you see every step, and nothing
                leaves without your OK.
              </p>
            </SectionIntro>

            <div className="nkcs-agents-board">
              <AgentRun />
              <figure className="nkcs-social-loop">
                <LoopVideo
                  src={`${ASSETS}/savitra-build.mp4`}
                  poster={`${ASSETS}/savitra-build-poster.jpg`}
                  label="Savitra turning one Hinglish prompt into a presentation, a PDF and a website about the solar system"
                />
                <figcaption><span>One prompt, three outputs</span><span>Deck · PDF · site</span></figcaption>
              </figure>
            </div>
          </section>

          <section
            id="bol"
            className="nkcs-section nkcs-section-green"
            data-chapter="6"
            ref={registerChapter(6)}
          >
            <SectionIntro eyebrow="Bol · Voice dictation" title={<>Don’t type. <em>Bas bolo.</em></>}>
              <p>
                Bol is Noorakar’s Hinglish-first dictation, powered by Shruti. People speak the messy
                version; Bol writes the one they would have typed if typing didn’t slow them down, without
                sanding away how they actually talk.
              </p>
            </SectionIntro>

            <DictationDemo />

            <div className="nkcs-surfaces">
              <p className="nkcs-eyebrow">One shortcut. Every text box.</p>
              <div>
                {['WhatsApp', 'Gmail', 'Notion', 'Slack', 'ChatGPT', 'Sheets'].map((app) => <span key={app}>{app}</span>)}
              </div>
            </div>
          </section>

          <section
            id="films"
            className="nkcs-section nkcs-films-section"
            data-chapter="7"
            ref={registerChapter(7)}
          >
            <SectionIntro eyebrow="Launch films" title="One launch, three aspect ratios.">
              <p>
                The launch kit was cut for where people actually watch: a 16:9 film for the site and YouTube,
                a 9:16 explainer for Reels and Shorts, and 4:5 loops for the feed. The same serif, the same
                dusk-to-saffron gradients and the same Hinglish voice run through all of them.
              </p>
            </SectionIntro>

            <FilmPlayer
              src={`${ASSETS}/launch-film.mp4`}
              poster={`${ASSETS}/launch-film-poster.jpg`}
              title="Introducing Noorakar"
              meta="Launch film · 1:27"
            />

            <div className="nkcs-explainer">
              <FilmPlayer
                src={`${ASSETS}/explainer-film.mp4`}
                poster={`${ASSETS}/explainer-film-poster.jpg`}
                title="Noorakar kya hai?"
                meta="9:16 · 1:23"
                orientation="portrait"
              />
              <div className="nkcs-explainer-beats">
                <p className="nkcs-eyebrow">Explainer beats</p>
                <ol>
                  <li><span>01</span><p>Ek aur to-do app? <em>Nahi.</em></p></li>
                  <li><span>02</span><p>Noorakar ek AI hai, jo aapka kaam karta hai. <em>Aapki zubaan mein.</em></p></li>
                  <li><span>03</span><p>Hindi mein bolo, Punjabi mein, ya ಕನ್ನಡ mein.</p></li>
                  <li><span>04</span><p>Student ho, teacher ho, dukaan chalate ho, ya ghar chalate ho…</p></li>
                  <li><span>05</span><p>Fine-tuned models par. <em>Bharat ke liye.</em></p></li>
                </ol>
              </div>
            </div>
          </section>

          <section
            id="website"
            className="nkcs-section nkcs-website-section"
            data-chapter="8"
            ref={registerChapter(8)}
          >
            <SectionIntro eyebrow="Website" title="A site that proves it before it sells.">
              <p>
                The website opens with the promise and then lets visitors test it: a business day of
                enquiries handled, a Hindi-English meeting transcribed, a voice note cleaned up and a bill
                turned into hisaab, all before anyone signs up.
              </p>
            </SectionIntro>

            <div className="nkcs-site-browser">
              <div className="nkcs-site-browser-bar">
                <span className="nkcs-site-wordmark"><NoorakarMark className="nkcs-site-mark" />noorakar</span>
                <div className="nkcs-site-nav"><span>Product</span><span>Bol</span><span>Agents</span><span>Models</span><span>Why Noorakar</span></div>
                <span className="nkcs-site-status">Launching Fall 2026</span>
              </div>
              <div className="nkcs-site-hero">
                <NoorakarMark className="nkcs-site-mandala" />
                <span className="nkcs-site-pill">Built for the way Bharat works</span>
                <h3>Intelligence that<br />speaks <span lang="hi">भारतवर्ष।</span></h3>
                <p>Not translated. <em>Understood.</em></p>
                <div className="nkcs-site-ctas">
                  <span className="is-primary">Coming soon, chai ready rakho</span>
                  <span>See how it works →</span>
                </div>
              </div>
              <div className="nkcs-site-stats">
                <div><b>63</b><span>Enquiries reviewed</span></div>
                <div><b>18</b><span>Qualified leads</span></div>
                <div><b>11</b><span>Quotations ready</span></div>
                <div><b>₹4.8L</b><span>Pipeline</span></div>
              </div>
              <div className="nkcs-site-tries">
                <div className="nkcs-site-try">
                  <p className="nkcs-site-try-label">Meeting notes</p>
                  <p className="nkcs-site-quote"><b>Priya · 3:30</b> Next review Monday ko rakhte hain, 6 baje… nahi nahi, 7 baje.</p>
                  <span className="nkcs-site-chip">Correction samjha: 6 → 7</span>
                </div>
                <div className="nkcs-site-try">
                  <p className="nkcs-site-try-label">Voice note → saaf message</p>
                  <p className="nkcs-site-quote">Haan bhaiya, woh 200 piece wala order hai na, uska rate bhej do, GST include karke. Aur kal tak delivery ho jayegi kya?</p>
                  <span className="nkcs-site-chip">Punctuation · spelling · Hinglish</span>
                </div>
                <div className="nkcs-site-try">
                  <p className="nkcs-site-try-label">Bill → hisaab</p>
                  <dl className="nkcs-site-bill">
                    <div><dt>Cotton fabric, 200 m × ₹180</dt><dd>₹36,000</dd></div>
                    <div><dt>Packing</dt><dd>₹500</dd></div>
                    <div><dt>GST @ 5%</dt><dd>₹1,825</dd></div>
                    <div className="is-total"><dt>Total</dt><dd>₹38,325</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          </section>

          <section
            id="outcome"
            className="nkcs-section nkcs-outcome-section"
            data-chapter="9"
            ref={registerChapter(9)}
          >
            <SectionIntro eyebrow="Outcome" title="Launch-ready, in every language it speaks.">
              <p>
                Noorakar heads into its Fall 2026 launch with a brand, a product story and a launch kit that
                speak the same language, literally. The system is built to stretch: new agents, new models
                and new scripts slot in without redrawing anything.
              </p>
            </SectionIntro>

            <div className="nkcs-outcome-grid">
              <div><NoorakarMark className="nkcs-outcome-mark" /><b>A name with a meaning</b><p>Noor and ākār carried through the mark, the imagery and every line of copy.</p></div>
              <div><span lang="hi">अ</span><b>Every script first-class</b><p>Hindi, Punjabi and Kannada set in their own type, never in fallback boxes.</p></div>
              <div><span>✺</span><b>A cast, not a stack</b><p>Savitra, Arka and Shruti read as characters with clear jobs, not model numbers.</p></div>
              <div><span>▶</span><b>A kit for every feed</b><p>16:9 film, 9:16 explainer and 4:5 loops, all from one motion system.</p></div>
            </div>

            <div className="nkcs-deliverables">
              <p className="nkcs-eyebrow">Scope delivered</p>
              <ul>
                <li>Naming narrative and brand identity</li>
                <li>Mark and construction system</li>
                <li>Multiscript typography and colour</li>
                <li>Model identities for Savitra, Arka and Shruti</li>
                <li>Agent and Bol interface design</li>
                <li>Launch films in 16:9, 9:16 and 4:5</li>
                <li>Campaign art direction</li>
                <li>Website design and development</li>
              </ul>
            </div>
          </section>

          <TransitionLink to={`/work/${nextProject.slug}`} className="nkcs-next">
            <p className="nkcs-eyebrow">Next case study</p>
            <div className="nkcs-next-copy">
              <span>{(nextProject.title.split('—')[0] || nextProject.title).trim()}</span>
              <small>{(nextProject.title.split('—')[1] || '').trim()}</small>
            </div>
            <img src={nextProject.image} alt="" loading="lazy" decoding="async" />
          </TransitionLink>
        </main>
      </div>

      <Footer onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
