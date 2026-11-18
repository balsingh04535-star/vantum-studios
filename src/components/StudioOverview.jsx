import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SchemeSpatialGallery from './SchemeSpatialGallery';
import styles from './StudioOverview.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function StudioOverview({ onOpenInquiry }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add({
        reduced: '(prefers-reduced-motion: reduce)',
        compact: '(max-width: 700px)',
        desktop: '(min-width: 701px)',
      }, ({ conditions }) => {
        if (conditions.reduced) return;

        const select = gsap.utils.selector(section);
        const words = select('[data-word]');
        const feeling = select('[data-feel]');
        const marker = select('[data-manifesto-marker]');
        const rule = select('[data-manifesto-rule]');

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            end: conditions.compact ? 'top -20%' : 'top -30%',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        // Words rise in reading order; "feel." lands last and brightens.
        timeline
          .from(marker, { autoAlpha: 0, y: 10, duration: 0.35 }, 0)
          .from(rule, { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, 0.1)
          .from(words, { yPercent: 110, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 0.1)
          .from(feeling, { yPercent: 110, duration: 0.9, ease: 'power3.out' }, '-=0.45')
          .from(feeling, { color: '#5d6066', duration: 0.6, ease: 'none' }, '-=0.3')
          .to({}, { duration: 0.6 });

        return () => timeline.scrollTrigger?.kill();
      });
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.overview}>
      <section ref={sectionRef} id="manifesto" className={styles.section} aria-labelledby="manifesto-heading">
        <div className={styles.stage}>
          <div className={styles.composition}>
            <div className={styles.marker} data-manifesto-marker aria-hidden="true">
              <span>Our point of view</span>
              <span className={styles.rule} data-manifesto-rule />
              <span className={styles.index}>01</span>
            </div>

            <h2 id="manifesto-heading" className={styles.quote}>
              <span className={styles.srOnly}>Make people pause. Then make them feel.</span>
              <span aria-hidden="true" className={styles.line}>
                {['Make', 'people', 'pause.'].map((word) => (
                  <span key={word} className={styles.mask}><span data-word>{word}</span></span>
                ))}
              </span>
              <span aria-hidden="true" className={`${styles.line} ${styles.quiet}`}>
                {['Then', 'make', 'them'].map((word) => (
                  <span key={word} className={styles.mask}><span data-word>{word}</span></span>
                ))}
                <span className={styles.mask}><span className={styles.feel} data-feel>feel.</span></span>
              </span>
            </h2>
          </div>
        </div>
      </section>

      <div className={styles.work}>
        <SchemeSpatialGallery onOpenInquiry={onOpenInquiry} />
      </div>
    </div>
  );
}
