import React, { useEffect, useMemo, useRef, useState } from 'react';
import { interpolate } from 'flubber';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import TransitionLink from '../components/TransitionLink';
import { projects } from '../data/projects';
import {
  NEW_WORDMARK_GLYPH_PATHS,
  OLD_WORDMARK_GLYPH_PATHS,
} from '../data/codevantumWordmarkPaths';

const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'before', label: 'Before' },
  { id: 'product-shift', label: 'Product shift' },
  { id: 'vantum-ai', label: 'Vantum AI' },
  { id: 'learning', label: 'Learning' },
  { id: 'mascot', label: 'Mascot' },
  { id: 'identity', label: 'Identity' },
  { id: 'website', label: 'Website' },
  { id: 'outcome', label: 'Outcome' },
];

const WORDMARK_START_X = 208.125;
const WORDMARK_BASELINE_Y = 330;
const OLD_WORDMARK_START_X = 198.525;

const splitPathContours = (path) => path.match(/M[^M]*/g) || [];

// The new Fredoka `d` and `t` contain independent overlapping contours while
// their Helvetica counterparts are single connected shapes. Supplying a small
// matching source contour keeps those strokes present throughout the morph
// instead of asking the interpolator to invent or remove an entire shape.
const OLD_SUPPLEMENTAL_CONTOURS = {
  2: [
    'M427.43 0L436.88 0L436.88 107.10L427.43 107.10Z',
  ],
  7: [
    'M752.63 69.45L791.33 69.45L791.33 77.40L752.63 77.40Z',
  ],
};

const createGlyphMorph = (oldPath, newPath, glyphIndex) => {
  const oldContours = splitPathContours(oldPath);
  const newContours = splitPathContours(newPath);
  const sharedContourCount = Math.min(oldContours.length, newContours.length);
  const mainInterpolators = Array.from({ length: sharedContourCount }, (_, index) => (
    interpolate(oldContours[index], newContours[index], { maxSegmentLength: 4 })
  ));
  const supplementalSources = OLD_SUPPLEMENTAL_CONTOURS[glyphIndex] || [];
  const supplementalInterpolators = newContours
    .slice(sharedContourCount)
    .map((newContour, index) => interpolate(
      supplementalSources[index],
      newContour,
      { maxSegmentLength: 4 }
    ));

  return {
    initialMainPath: oldContours.slice(0, sharedContourCount).join(''),
    initialSupplementalPaths: supplementalSources,
    interpolateMain: (progress) => mainInterpolators
      .map((interpolateContour) => interpolateContour(progress))
      .join(''),
    interpolateSupplemental: (progress) => supplementalInterpolators
      .map((interpolateContour) => interpolateContour(progress)),
  };
};

// Sampled directly from the installed Fredoka SemiBold glyph contours.
const WORDMARK_ON_CURVE_POINTS = [
  [43.2, -1.95], [69.3, 62.85], [29.625, 28.35], [64.95, 5.1],
  [110.85, 75.15], [124.95, 44.85], [152.775, 21.975], [197.325, 1.875],
  [174.6, 28.5], [224.7, 96.45], [267.45, 74.85], [279.3, 18.525],
  [275.1, 41.7], [302.85, 57.45], [346.5, -0.6], [379.2, 36.45],
  [453.825, 67.65], [416.7, 51.45], [460.2, 68.175], [514.875, 71.025],
  [508.05, 44.85], [553.65, 5.4], [570.6, 21.45], [584.55, 72.525],
  [624.45, -1.2], [614.1, 35.25], [663.675, 67.875], [637.875, 3.375],
  [691.35, 64.35], [765.675, 69.375], [751.125, 49.575], [712.35, 36.9],
];

const WORDMARK_CONTROL_POINTS = [
  [36.6, -1.95], [49.35, 49.95], [63.75, 4.05], [114.45, 20.1],
  [165.3, 67.5], [172.65, 40.5], [227.55, 29.25], [290.55, 21.75],
  [302.4, 69.9], [379.2, 43.8], [431.1, 40.65], [481.65, 64.35],
  [491.85, 51.45], [571.35, 20.7], [617.55, -1.2], [647.4, 73.8],
  [669.3, 65.55], [778.05, 7.05], [712.35, 41.55],
];

const OLD_WORDMARK_ON_CURVE_POINTS = [
  [63.6, 53.1], [26.025, 1.125], [29.85, 8.55], [119.55, 71.7],
  [107.7, 8.55], [92.4, 67.5], [156.15, 38.7], [228.6, 62.7],
  [175.5, 9.975], [177.825, 50.625], [222.825, 16.2], [269.4, 63.225],
  [319.95, 52.125], [271.575, 1.125], [261.9, 36.15], [402.75, 53.7],
  [446.25, 46.05], [425.4, -2.1], [468.225, 0.15], [421.8, 78.15],
  [426.15, 5.7], [452.85, 42.3], [524.625, 69.9], [515.85, 79.65],
  [554.1, 69.45], [578.325, 9.975], [654.15, 15.3], [620.925, -0.075],
  [696.45, 43.2], [745.2, 0], [793.95, 0], [695.7, 77.4],
];

const OLD_WORDMARK_CONTROL_POINTS = [
  [71.4, 66.45], [63.75, 22.95], [61.65, 61.8], [92.4, 32.55],
  [128.4, -2.1], [192.9, 79.65], [176.4, 44.7], [185.4, 11.55],
  [318.15, 60], [309.45, 16.5], [453.15, 52.65], [431.1, -2.1],
  [457.5, 72.3], [416.55, 7.8], [509.4, 71.7], [586.5, -0.75],
  [609.3, 9.45], [745.2, 49.2], [699.9, 71.55],
];

const positionWordmarkPoint = (
  [x, y],
  { startX = WORDMARK_START_X, baselineY = WORDMARK_BASELINE_Y, scale = 1 } = {}
) => [
  startX + (x * scale),
  baselineY - (y * scale),
];

function WordmarkConstruction() {
  const boardRef = useRef(null);
  const geometryRef = useRef(null);
  const glyphPathRefs = useRef([]);
  const supplementalPathRefs = useRef([]);
  const anchorRefs = useRef([]);
  const controlRefs = useRef([]);
  const handleRefs = useRef([]);
  const glyphMorphs = useMemo(() => OLD_WORDMARK_GLYPH_PATHS.map((oldPath, index) => (
    createGlyphMorph(oldPath, NEW_WORDMARK_GLYPH_PATHS[index], index)
  )), []);
  const oldPosition = { startX: OLD_WORDMARK_START_X, baselineY: WORDMARK_BASELINE_Y };
  const newPosition = { startX: WORDMARK_START_X, baselineY: WORDMARK_BASELINE_Y };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      glyphMorphs.forEach((glyphMorph, glyphIndex) => {
        glyphPathRefs.current[glyphIndex]?.setAttribute('d', glyphMorph.interpolateMain(1));
        glyphMorph.interpolateSupplemental(1).forEach((path, pathIndex) => {
          supplementalPathRefs.current[glyphIndex]?.[pathIndex]?.setAttribute('d', path);
        });
      });
      return undefined;
    }

    let animationFrame;
    let startTime;
    const duration = 8000;
    const easeInOut = (value) => (
      value * value * value * ((value * ((value * 6) - 15)) + 10)
    );
    const tweenPoint = (oldPoint, newPoint, progress) => [
      oldPoint[0] + ((newPoint[0] - oldPoint[0]) * progress),
      oldPoint[1] + ((newPoint[1] - oldPoint[1]) * progress),
    ];
    const mixChannel = (from, to, progress) => Math.round(from + ((to - from) * progress));

    const renderFrame = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const phase = ((timestamp - startTime) % duration) / duration;
      let progress = 0;

      if (phase >= 0.15 && phase < 0.45) {
        progress = easeInOut((phase - 0.15) / 0.3);
      } else if (phase >= 0.45 && phase < 0.65) {
        progress = 1;
      } else if (phase >= 0.65 && phase < 0.95) {
        progress = easeInOut(1 - ((phase - 0.65) / 0.3));
      }

      if (boardRef.current) {
        const red = mixChannel(233, 220, progress);
        const green = mixChannel(228, 186, progress);
        const blue = mixChannel(223, 255, progress);
        boardRef.current.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      }
      if (geometryRef.current) {
        geometryRef.current.style.opacity = Math.min(
          1,
          Math.max(0, Math.sin(Math.PI * progress) * 2.4)
        );
      }

      glyphMorphs.forEach((glyphMorph, glyphIndex) => {
        glyphPathRefs.current[glyphIndex]?.setAttribute(
          'd',
          glyphMorph.interpolateMain(progress)
        );
        glyphMorph.interpolateSupplemental(progress).forEach((path, pathIndex) => {
          supplementalPathRefs.current[glyphIndex]?.[pathIndex]?.setAttribute('d', path);
        });
      });

      OLD_WORDMARK_ON_CURVE_POINTS.forEach((oldPoint, index) => {
        if (index % 2 !== 0) return;
        const oldAnchor = positionWordmarkPoint(oldPoint, oldPosition);
        const newAnchor = positionWordmarkPoint(WORDMARK_ON_CURVE_POINTS[index], newPosition);
        const [cx, cy] = tweenPoint(oldAnchor, newAnchor, progress);
        anchorRefs.current[index]?.setAttribute('cx', cx);
        anchorRefs.current[index]?.setAttribute('cy', cy);
      });

      OLD_WORDMARK_CONTROL_POINTS.forEach((oldPoint, index) => {
        if (index % 2 !== 0) return;
        const anchorIndex = Math.round(
          index * (OLD_WORDMARK_ON_CURVE_POINTS.length - 1)
          / (OLD_WORDMARK_CONTROL_POINTS.length - 1)
        );
        const oldAnchor = positionWordmarkPoint(
          OLD_WORDMARK_ON_CURVE_POINTS[anchorIndex],
          oldPosition
        );
        const newAnchor = positionWordmarkPoint(
          WORDMARK_ON_CURVE_POINTS[anchorIndex],
          newPosition
        );
        const oldControl = positionWordmarkPoint(oldPoint, oldPosition);
        const newControl = positionWordmarkPoint(WORDMARK_CONTROL_POINTS[index], newPosition);
        const [anchorX, anchorY] = tweenPoint(oldAnchor, newAnchor, progress);
        const [controlX, controlY] = tweenPoint(oldControl, newControl, progress);

        handleRefs.current[index]?.setAttribute('x1', anchorX);
        handleRefs.current[index]?.setAttribute('y1', anchorY);
        handleRefs.current[index]?.setAttribute('x2', controlX);
        handleRefs.current[index]?.setAttribute('y2', controlY);
        controlRefs.current[index]?.setAttribute('cx', controlX);
        controlRefs.current[index]?.setAttribute('cy', controlY);
      });
      animationFrame = window.requestAnimationFrame(renderFrame);
    };

    animationFrame = window.requestAnimationFrame(renderFrame);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [glyphMorphs]);

  return (
    <figure ref={boardRef} className="cvcs-wordmark-board">
      <svg
        className="cvcs-wordmark-svg"
        viewBox="0 0 1200 460"
        role="img"
        aria-label="An animated CodeVantum logo transformation from the old generic wordmark to the new Fredoka wordmark through moving Bézier nodes"
      >
        <g className="cvcs-morph-wordmark" transform={`translate(0 ${WORDMARK_BASELINE_Y}) scale(1 -1)`}>
          {glyphMorphs.map((glyphMorph, glyphIndex) => (
            <g key={`morph-glyph-${glyphIndex}`}>
              <path
                ref={(element) => { glyphPathRefs.current[glyphIndex] = element; }}
                className="cvcs-morph-glyph"
                d={glyphMorph.initialMainPath}
                fillRule="evenodd"
                clipRule="evenodd"
              />
              {glyphMorph.initialSupplementalPaths.map((path, pathIndex) => (
                <path
                  key={`morph-glyph-${glyphIndex}-supplement-${pathIndex}`}
                  ref={(element) => {
                    if (!supplementalPathRefs.current[glyphIndex]) {
                      supplementalPathRefs.current[glyphIndex] = [];
                    }
                    supplementalPathRefs.current[glyphIndex][pathIndex] = element;
                  }}
                  className="cvcs-morph-glyph cvcs-morph-glyph-supplement"
                  d={path}
                />
              ))}
            </g>
          ))}
        </g>

        <g ref={geometryRef} className="cvcs-morph-geometry" aria-hidden="true">
          <line className="cvcs-type-guide" x1="170" y1="335" x2="1030" y2="335" />
          <line className="cvcs-type-guide cvcs-type-guide-soft" x1="170" y1="255" x2="1030" y2="255" />

          {OLD_WORDMARK_CONTROL_POINTS.map((oldPoint, index) => {
            if (index % 2 !== 0) return null;
            const anchorIndex = Math.round(
              index * (OLD_WORDMARK_ON_CURVE_POINTS.length - 1)
              / (OLD_WORDMARK_CONTROL_POINTS.length - 1)
            );
            const oldAnchor = positionWordmarkPoint(
              OLD_WORDMARK_ON_CURVE_POINTS[anchorIndex],
              oldPosition
            );
            const oldControl = positionWordmarkPoint(oldPoint, oldPosition);

            return (
              <line
                key={`morph-handle-${index}`}
                ref={(element) => { handleRefs.current[index] = element; }}
                className="cvcs-bezier-handle-line"
                x1={oldAnchor[0]}
                y1={oldAnchor[1]}
                x2={oldControl[0]}
                y2={oldControl[1]}
              />
            );
          })}

          {OLD_WORDMARK_CONTROL_POINTS.map((oldPoint, index) => {
            if (index % 2 !== 0) return null;
            const oldControl = positionWordmarkPoint(oldPoint, oldPosition);
            return (
              <circle
                key={`morph-control-${index}`}
                ref={(element) => { controlRefs.current[index] = element; }}
                className="cvcs-bezier-control"
                cx={oldControl[0]}
                cy={oldControl[1]}
                r="5"
              />
            );
          })}

          {OLD_WORDMARK_ON_CURVE_POINTS.map((oldPoint, index) => {
            if (index % 2 !== 0) return null;
            const oldAnchor = positionWordmarkPoint(oldPoint, oldPosition);
            return (
              <circle
                key={`morph-anchor-${index}`}
                ref={(element) => { anchorRefs.current[index] = element; }}
                className="cvcs-bezier-node"
                cx={oldAnchor[0]}
                cy={oldAnchor[1]}
                r="5.5"
                style={{ '--i': index }}
              />
            );
          })}
        </g>
      </svg>
      <figcaption>
        The same name changes character in motion: Bézier anchors pull the old neutral wordmark into
        softer, rounder forms before resolving as the new Fredoka identity.
      </figcaption>
    </figure>
  );
}

function PhoneFrame({ src, alt, label, className = '' }) {
  return (
    <figure className={`cvcs-phone ${className}`}>
      <div className="cvcs-phone-screen">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}

function SectionIntro({ eyebrow, title, children }) {
  return (
    <header className="cvcs-section-intro">
      <p className="cvcs-eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </header>
  );
}

export default function CodeVantumCaseStudyPage({ project, onOpenInquiry }) {
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
    dateModified: '2026-09-02',
    url: project.seo.canonicalUrl,
    inLanguage: 'en-GB',
  };

  return (
    <div className="cvcs-root">
      <SEO
        title={project.seo.title}
        description={project.seo.description}
        canonicalUrl={project.seo.canonicalUrl}
        ogImage={project.seo.ogImage}
        ogImageAlt="CodeVantum AI-guided learning platform case study by Made by Chanan"
        ogType="article"
        schemaData={schemaData}
        articlePublishedTime={`${project.year}-01-01T00:00:00+00:00`}
        articleModifiedTime="2026-09-02T00:00:00+00:00"
      />

      <div className="cvcs-layout">
        <aside className="cvcs-sidebar">
          <div className="cvcs-sidebar-inner">
            <div>
              <p className="cvcs-sidebar-wordmark">codevantum</p>
              <p className="cvcs-sidebar-descriptor">AI-guided learning platform</p>
              <p className="cvcs-sidebar-meta">PRODUCT · BRAND · WEB · 2026</p>
            </div>

            <nav className="cvcs-chapters" aria-label="CodeVantum case study sections">
              {CHAPTERS.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className={`cvcs-chapter-link${activeChapter === index ? ' is-active' : ''}`}
                >
                  {chapter.label}
                </a>
              ))}
            </nav>

            <TransitionLink to="/work" className="cvcs-back">
              All work <ArrowUpRight size={14} />
            </TransitionLink>
          </div>
        </aside>

        <main className="cvcs-content">
          <figure className="cvcs-hero case-study-transition-target">
            <video src={project.video} poster={project.image} autoPlay muted loop playsInline />
            <figcaption>
              <span>CodeVantum brand film</span>
              <span>Illustration · motion · product world</span>
            </figcaption>
          </figure>

          <section
            id="overview"
            className="cvcs-section cvcs-overview"
            data-chapter="0"
            ref={registerChapter(0)}
          >
            <p className="cvcs-eyebrow">Overview</p>
            <div className="cvcs-overview-copy">
              <h1>From teaching AI<br />to learning <em>with</em> AI.</h1>
              <p>
                CodeVantum already helped people understand artificial intelligence through short,
                gamified lessons. But the product itself had no intelligence of its own. We transformed
                it into an AI-guided learning platform—rebuilding the product entry point, identity,
                mascot system and website around one simple question: what do you want to learn?
              </p>
            </div>
          </section>

          <section
            id="before"
            className="cvcs-section"
            data-chapter="1"
            ref={registerChapter(1)}
          >
            <SectionIntro
              eyebrow="The starting point"
              title="A learning app about AI, without AI at its centre."
            >
              <p>
                The original experience had lessons, challenges and a gamified roadmap, but every learner
                entered through the same fixed structure. A generic wordmark and visually fragmented UI
                made the product feel more like a collection of features than a coherent learning guide.
              </p>
            </SectionIntro>

            <div className="cvcs-before-grid">
              <figure className="cvcs-before-logo">
                <span className="cvcs-media-label">01 · Generic identity</span>
                <img
                  src="/work/codevantum-assets/before-logo.png"
                  alt="Original CodeVantum wordmark on a purple background"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure className="cvcs-before-phone">
                <span className="cvcs-media-label">02 · Fixed roadmap</span>
                <img
                  src="/work/codevantum-assets/before-roadmap.png"
                  alt="Original CodeVantum fixed lesson roadmap"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure className="cvcs-before-phone">
                <span className="cvcs-media-label">03 · Course-first UI</span>
                <img
                  src="/work/codevantum-assets/before-lesson.png"
                  alt="Original CodeVantum pattern completion lesson"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </section>

          <section
            id="product-shift"
            className="cvcs-section cvcs-section-cream"
            data-chapter="2"
            ref={registerChapter(2)}
          >
            <SectionIntro
              eyebrow="Product shift"
              title="No course maze. Just your next move."
            >
              <p>
                We reorganised the experience around learner intent. Instead of asking people to browse a
                catalogue, Vantum starts with their goal, understands their experience and connects them to
                the most useful lesson, challenge or project already inside the CodeVantum library.
              </p>
            </SectionIntro>

            <div className="cvcs-flow-board" aria-label="Vantum AI learning recommendation flow">
              <div className="cvcs-flow-step">
                <span>01</span>
                <b>Tell us the goal</b>
                <p>Type it, say it, or choose a starting point.</p>
              </div>
              <div className="cvcs-flow-arrow">↝</div>
              <div className="cvcs-flow-step">
                <span>02</span>
                <b>Check your level</b>
                <p>Vantum asks only what it needs to understand.</p>
              </div>
              <div className="cvcs-flow-arrow">↝</div>
              <div className="cvcs-flow-step">
                <span>03</span>
                <b>Match the library</b>
                <p>Existing content becomes responsive to the learner.</p>
              </div>
              <div className="cvcs-flow-arrow">↝</div>
              <div className="cvcs-flow-step cvcs-flow-step-accent">
                <span>04</span>
                <b>Start building</b>
                <p>The right lesson, challenge or project—without the search.</p>
              </div>
            </div>

            <div className="cvcs-shift-compare">
              <div>
                <span>Before</span>
                <strong>The roadmap chose the journey.</strong>
              </div>
              <div>
                <span>After</span>
                <strong>The learner chooses the goal. Vantum maps the path.</strong>
              </div>
            </div>
          </section>

          <section
            id="vantum-ai"
            className="cvcs-section cvcs-section-indigo"
            data-chapter="3"
            ref={registerChapter(3)}
          >
            <SectionIntro eyebrow="Vantum AI" title="Start with what you want to learn.">
              <p>
                Vantum Guide became the new front door to CodeVantum. The conversation is deliberately
                lightweight: an open prompt, optional voice input and a few adaptive questions that turn a
                messy ambition into a clear first move.
              </p>
            </SectionIntro>

            <div className="cvcs-phone-stage">
              <PhoneFrame
                src="/work/codevantum-assets/vantum-guide.png"
                alt="Vantum Guide asking what the learner wants to work on"
                label="01 · Goal-led entry point"
                className="cvcs-phone-raised"
              />
              <div className="cvcs-phone-stage-copy">
                <span className="cvcs-spark">✦</span>
                <h3>A guide that listens before it teaches.</h3>
                <p>
                  Text and voice sit inside the same interaction model, giving learners a natural way to
                  describe what they want to build instead of forcing them to translate it into course names.
                </p>
                <div className="cvcs-mode-row">
                  <span>Text</span><span>Voice</span><span>Suggested goals</span>
                </div>
              </div>
              <PhoneFrame
                src="/work/codevantum-assets/vantum-conversation.png"
                alt="Vantum Guide adapting a prompting lesson to the learner's existing experience"
                label="02 · Adaptive follow-up"
              />
            </div>
          </section>

          <section
            id="learning"
            className="cvcs-section cvcs-learning-section"
            data-chapter="4"
            ref={registerChapter(4)}
          >
            <SectionIntro eyebrow="Learning experience" title="A library that responds.">
              <p>
                AI discovery leads into a learning system designed for momentum. Short lessons, pattern
                challenges, progress signals and practical projects keep the experience playful, while the
                recommendation layer makes sure the play is always moving toward something useful.
              </p>
            </SectionIntro>

            <div className="cvcs-learning-board">
              <PhoneFrame
                src="/work/codevantum-assets/vantum-lesson.png"
                alt="CodeVantum pattern completion lesson with the Vantum mascot"
                label="Adaptive lesson · pattern completion"
              />
              <div className="cvcs-learning-notes">
                <div><span>01</span><strong>Learn by doing</strong><p>Every lesson resolves into a decision, challenge or build.</p></div>
                <div><span>02</span><strong>Progress you can feel</strong><p>XP, streaks and short sessions keep momentum visible.</p></div>
                <div><span>03</span><strong>One guide throughout</strong><p>The same Vantum personality moves from discovery into the lesson.</p></div>
              </div>
            </div>
          </section>

          <section
            id="mascot"
            className="cvcs-section cvcs-section-indigo"
            data-chapter="5"
            ref={registerChapter(5)}
          >
            <SectionIntro eyebrow="Character system" title="A guide, not a decoration.">
              <p>
                The mascot became the emotional layer of the product: a reassuring presence during setup,
                an encouraging voice inside lessons and a flexible storyteller across launch content. Lottie
                brought the character into the interface without turning the experience into a heavy film.
              </p>
            </SectionIntro>

            <div className="cvcs-mascot-grid">
              <figure>
                <img src="/work/codevantum-2.jpg" alt="Developer learning with the Vantum mascot" loading="lazy" decoding="async" />
                <figcaption><span>Companion</span><span>Shows up when guidance matters</span></figcaption>
              </figure>
              <figure>
                <img src="/work/codevantum-3.jpg" alt="Vantum mascot flying through a motion scene" loading="lazy" decoding="async" />
                <figcaption><span>Momentum</span><span>Turns progress into personality</span></figcaption>
              </figure>
            </div>

            <div className="cvcs-motion-strip">
              <img src="/work/codevantum-1.jpg" alt="CodeVantum illustrated brand film frame" loading="lazy" decoding="async" />
              <div>
                <p className="cvcs-eyebrow">Motion language</p>
                <h3>From launch film to reusable product motion.</h3>
                <p>Character beats, interface timing and the violet night-world gave brand and product one shared vocabulary.</p>
                <div className="cvcs-tech-tags"><span>Lottie</span><span>2D character rig</span><span>UI motion</span><span>Brand film</span></div>
              </div>
            </div>
          </section>

          <section
            id="identity"
            className="cvcs-section cvcs-identity-section"
            data-chapter="6"
            ref={registerChapter(6)}
          >
            <SectionIntro eyebrow="Identity" title="A friendlier face for learning AI.">
              <p>
                The identity moved away from anonymous tech minimalism. A rounded lowercase wordmark,
                expressive editorial typography and a warmer cream–lilac palette made CodeVantum feel less
                like software documentation and more like a place people would want to return to.
              </p>
            </SectionIntro>

            <WordmarkConstruction />

            <figure className="cvcs-manifesto-art">
              <img
                src="/work/codevantum-assets/learn-build-ship-grow.png"
                alt="CodeVantum Learn, Build, Ship, Grow campaign artwork"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>Brand application</span>
                <span>Learn. Build. Ship. Grow.</span>
              </figcaption>
            </figure>
          </section>

          <section
            id="website"
            className="cvcs-section cvcs-website-section"
            data-chapter="7"
            ref={registerChapter(7)}
          >
            <SectionIntro eyebrow="Website overhaul" title="Turning the product story into a destination.">
              <p>
                The new website leads with the product’s strongest behaviour instead of a feature list.
                Visitors can begin with a goal, understand how Vantum adapts and see what they will build—all
                inside the same visual system used by the app.
              </p>
            </SectionIntro>

            <div className="cvcs-site-browser">
              <div className="cvcs-site-browser-bar">
                <span className="cvcs-site-wordmark">codevantum</span>
                <div className="cvcs-site-nav"><span>Learn</span><span>How it works</span><span>About</span></div>
                <a href="https://codevantum.com/" target="_blank" rel="noreferrer">View live site <ArrowUpRight size={14} /></a>
              </div>
              <div className="cvcs-site-hero">
                <p>VANTUM GUIDE</p>
                <h3>Tell us what you want to learn.<br /><em>We’ll find the easiest way in.</em></h3>
                <span>Type it, say it, or choose a goal. Vantum turns it into the right next move.</span>
                <div className="cvcs-site-prompt">
                  <span>What do you want to learn or build?</span>
                  <div><i>＋</i><i>✦</i><b>Vantum Guide⌄</b><button type="button" aria-label="Voice input preview"><span /><span /><span /><span /><span /></button></div>
                </div>
                <div className="cvcs-site-chips"><span>↗ Build automations</span><span>✦ Improve my prompts</span><span>○ Understand AI</span></div>
              </div>
              <div className="cvcs-site-journey">
                <div><span>01</span><b>Tell us the goal</b><small>Speak or type what you want.</small></div>
                <div><span>02</span><b>We check your level</b><small>We adapt to you.</small></div>
                <div><span>03</span><b>Start the right lesson</b><small>The fastest useful win.</small></div>
              </div>
            </div>
          </section>

          <section
            id="outcome"
            className="cvcs-section cvcs-outcome-section"
            data-chapter="8"
            ref={registerChapter(8)}
          >
            <SectionIntro eyebrow="Outcome" title="CodeVantum became the product it was teaching.">
              <p>
                What began as a gamified content library became a coherent AI-guided learning platform. The
                new system connects intent to content, gives the product a recognisable personality and lets
                one idea travel consistently across conversation, lessons, motion and the web.
              </p>
            </SectionIntro>

            <div className="cvcs-outcome-grid">
              <div><span>✦</span><b>AI at the centre</b><p>Vantum Guide is now the primary way into the learning experience.</p></div>
              <div><span>↝</span><b>Adaptive paths</b><p>The existing library responds to each learner’s goal and level.</p></div>
              <div><span>☺</span><b>Character-led brand</b><p>A reusable mascot and motion system makes guidance feel human.</p></div>
              <div><span>⌁</span><b>One ecosystem</b><p>Product, identity, website and launch film speak the same language.</p></div>
            </div>

            <div className="cvcs-deliverables">
              <p className="cvcs-eyebrow">Scope delivered</p>
              <ul>
                <li>AI product strategy and guided-learning flow</li>
                <li>Mobile product and interaction design</li>
                <li>Wordmark and visual identity refresh</li>
                <li>Mascot and Lottie motion system</li>
                <li>Website strategy, design and development</li>
                <li>Illustrated launch film and campaign language</li>
              </ul>
            </div>
          </section>

          <TransitionLink to={`/work/${nextProject.slug}`} className="cvcs-next">
            <p className="cvcs-eyebrow">Next case study</p>
            <div className="cvcs-next-copy">
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
