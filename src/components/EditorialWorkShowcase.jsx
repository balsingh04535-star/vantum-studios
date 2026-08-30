import React, { useEffect, useRef, useState } from 'react';
import TransitionLink from './TransitionLink';
import { projects } from '../data/projects';

/* Cards that aren't the focused one rest at this opacity, so attention
   stays on the one the pinned column is describing. */
const DIMMED_OPACITY = 0.32;

/* How long a video card's wordmark holds after the card enters view,
   before fading out so it stops covering the footage. */
const WORDMARK_HOLD = 3000;

/* Scroll-momentum warp. Modelled on the reference slider's physics: scroll
   input accumulates into a target, friction bleeds that target off every
   frame, and a separately lerped value is what the transform actually reads.
   The mismatch between the two is what gives the cards a sense of mass —
   they keep squashing for a moment after the scroll stops. */
const WARP_INPUT = 0.0016;     // scroll pixels -> intensity
const WARP_FRICTION = 0.92;    // per-frame decay on the target
const WARP_SMOOTHNESS = 0.2;   // how fast the rendered value chases the target
const WARP_MAX = 1;            // intensity clamp, so fast flings saturate
const WARP_SQUASH = 0.05;      // vertical compression at full intensity
const WARP_STRETCH = 0.02;     // matching horizontal spread
const WARP_SKEW = 1;           // degrees of lag-shear, signed by direction
const WARP_EPSILON = 0.001;    // below this the cards are treated as at rest

/* Split "Lumina — Spatial WebGL Operating System" into
   short brand mark ("Lumina") and descriptive title. */
function splitTitle(title) {
  const parts = title.split('—');
  if (parts.length < 2) return { mark: title.trim(), descriptor: title.trim() };
  return { mark: parts[0].trim(), descriptor: parts.slice(1).join('—').trim() };
}

export default function EditorialWorkShowcase({ limit = 5 }) {
  const featured = projects.slice(0, limit);
  const [active, setActive] = useState(0);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const wordmarkRefs = useRef([]);

  /* The card whose body crosses the middle of the viewport drives both the
     pinned column and which card is lit. rootMargin collapses the root to a
     1px band at 50% height so exactly one card can be intersecting. In the
     gaps between cards nothing intersects, so `active` simply holds its last
     value rather than flickering back to a default. */
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [limit]);

  /* Scroll-momentum warp on the card frames. Reads window.scrollY per frame
     rather than binding to Lenis, so it works the same if the smooth-scroll
     layer is ever swapped out. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || !cards.length) return;

    let raf = null;
    let inView = false;
    let lastY = window.scrollY;
    let target = 0;
    let value = 0;
    let applied = null;

    const tick = () => {
      const y = window.scrollY;
      target += (y - lastY) * WARP_INPUT;
      lastY = y;

      target *= WARP_FRICTION;
      if (target > WARP_MAX) target = WARP_MAX;
      else if (target < -WARP_MAX) target = -WARP_MAX;

      value += (target - value) * WARP_SMOOTHNESS;

      // Only touch the DOM when the value actually moved
      const rounded = Math.round(value * 1000) / 1000;
      if (rounded !== applied) {
        applied = rounded;
        const magnitude = Math.abs(rounded);
        const transform = magnitude <= WARP_EPSILON
          ? ''
          : `scaleX(${(1 + magnitude * WARP_STRETCH).toFixed(4)})`
            + ` scaleY(${(1 - magnitude * WARP_SQUASH).toFixed(4)})`
            + ` skewY(${(rounded * WARP_SKEW).toFixed(3)}deg)`;
        for (let i = 0; i < cards.length; i += 1) {
          cards[i].style.transform = transform;
        }
      }

      // Keep running while on screen, or while still settling back to rest
      if (inView || Math.abs(value) > WARP_EPSILON) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && raf === null) {
          lastY = window.scrollY;   // avoid a jump from time spent offscreen
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: '20% 0px 20% 0px' }
    );
    visibility.observe(section);

    return () => {
      visibility.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
      cards.forEach((card) => { card.style.transform = ''; });
    };
  }, [limit]);

  /* Video cards announce themselves and then get out of the way: the wordmark
     holds for WORDMARK_HOLD once the card scrolls into view, then fades so it
     stops sitting on top of the footage. Playback is tied to the same
     observer, so the hold always coincides with someone actually watching —
     and it resets on re-entry rather than flashing back on every loop. */
  useEffect(() => {
    const videoCards = featured
      .map((project, i) => ({
        index: i,
        hasVideo: Boolean(project.video),
        video: videoRefs.current[i],
        wordmark: wordmarkRefs.current[i],
      }))
      .filter((entry) => entry.hasVideo && entry.video);

    if (!videoCards.length) return;

    const timers = new Map();
    const observers = [];

    videoCards.forEach(({ index, video, wordmark }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const played = video.play();
            // A refused autoplay is fine here — the poster is already showing
            if (played && typeof played.catch === 'function') played.catch(() => {});

            if (wordmark) wordmark.style.opacity = '1';
            clearTimeout(timers.get(index));
            timers.set(index, setTimeout(() => {
              if (wordmark) wordmark.style.opacity = '0';
            }, WORDMARK_HOLD));
          } else {
            video.pause();
            clearTimeout(timers.get(index));
            if (wordmark) wordmark.style.opacity = '1';   // armed for next entry
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [limit]);


  return (
    <section id="work" className="ews-section" ref={sectionRef}>
      <div className="ews-grid">

        {/* ── Pinned editorial column ── */}
        <div className="ews-col-left">
          <div className="ews-sticky">

            <div className="ews-headings">
              <p className="ews-label">Our work</p>
              <div className="ews-name-window">
                {featured.map((project, i) => (
                  <span
                    key={project.id}
                    className="ews-name"
                    style={{ transform: `translateY(${(i - active) * 100}%)` }}
                    aria-hidden={i !== active}
                  >
                    {splitTitle(project.title).mark}
                  </span>
                ))}
              </div>
            </div>

            <div className="ews-detail">
              <div className="ews-stack ews-body-stack">
                {featured.map((project, i) => (
                  <p
                    key={project.id}
                    className="ews-body"
                    style={{ opacity: i === active ? 1 : 0 }}
                    aria-hidden={i !== active}
                  >
                    {project.intro}
                  </p>
                ))}
              </div>

              <div className="ews-stack ews-meta-stack">
                {featured.map((project, i) => (
                  <div
                    key={project.id}
                    className="ews-meta"
                    style={{ opacity: i === active ? 1 : 0 }}
                    aria-hidden={i !== active}
                  >
                    <span className="ews-thumb">
                      <img src={project.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="ews-meta-text">
                      <span className="ews-descriptor">{splitTitle(project.title).descriptor}</span>
                      <span className="ews-tags">
                        {project.year}, {project.category.toUpperCase()}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Scrolling card stack ── */}
        <div className="ews-cards">
          {featured.map((project, i) => (
            <TransitionLink
              key={project.id}
              to={`/work/${project.slug}`}
              className="ews-card"
              style={{ opacity: i === active ? 1 : DIMMED_OPACITY }}
            >
              <span
                className="ews-card-inner"
                data-index={i}
                ref={(el) => { cardRefs.current[i] = el; }}
              >
                {project.video ? (
                  /* No autoPlay: playback starts when the card scrolls into
                     view, so the wordmark's 3s window lands when someone is
                     actually looking. poster covers the load and the case
                     where a browser refuses to play. */
                  <video
                    className="ews-card-img"
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={project.video}
                    poster={project.image}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={project.title}
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="ews-card-img"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span className="ews-card-scrim" aria-hidden="true" />
                <span
                  className="ews-card-wordmark"
                  ref={(el) => { wordmarkRefs.current[i] = el; }}
                >
                  {splitTitle(project.title).mark}
                </span>
              </span>
            </TransitionLink>
          ))}

          <TransitionLink
            to="/work"
            className="ews-card ews-card-all"
            style={{ opacity: active === featured.length ? 1 : DIMMED_OPACITY }}
          >
            <span
              className="ews-card-all-inner"
              data-index={featured.length}
              ref={(el) => { cardRefs.current[featured.length] = el; }}
            >
              View all work
              <span aria-hidden="true">&#8594;</span>
            </span>
          </TransitionLink>
        </div>

      </div>
    </section>
  );
}
