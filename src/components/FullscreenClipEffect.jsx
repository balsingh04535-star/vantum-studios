import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FullscreenClipEffect() {
  const rootRef = useRef(null);

  const images = [
    '/img/demo1/2.jpg',
    '/img/demo1/3.jpg',
    '/img/demo1/1.jpg',
    '/img/demo1/4.jpg',
    '/img/demo1/5.jpg'
  ];

  useEffect(() => {
    if (!rootRef.current) return;
    const root = rootRef.current;

    const ctx = gsap.context(() => {
      const clipElement = root.querySelector('.fullscreen-clip-box');
      const clipImage = root.querySelector('.fullscreen-clip-img');
      const slides = root.querySelectorAll('.fullscreen-slide:not(.fullscreen-slide-current)');
      const slider = root.querySelector('.fullscreen-slides');
      const titleChars = root.querySelectorAll('.fullscreen-char');
      const badgeText = root.querySelector('.fullscreen-cover-badge');

      // Set initial states
      gsap.set(slider, { perspective: 1000 });
      gsap.set(clipElement, { willChange: 'clip-path', clipPath: 'inset(0% 0% round 0vw)' });
      gsap.set(clipImage, { scale: 1 });
      gsap.set(slides, { opacity: 0, z: 600 });
      gsap.set(titleChars, { transformOrigin: '50% 100%', opacity: 1, scaleY: 1 });

      // Create scroll-driven scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=1400',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        }
      });

      tl.addLabel('start', 0)
        // 1. Morph full screen hero image into center grid card
        .to(clipElement, { clipPath: 'inset(22% 39% round 23vw)', ease: 'power2.inOut' }, 'start')
        .to(clipImage, { scale: 0.8, ease: 'power2.inOut' }, 'start')
        
        // 2. Reveal surrounding 4 gallery cards floating in 3D
        .fromTo(
          slides,
          { opacity: 0, z: 600 },
          {
            ease: 'power2.out',
            stagger: { amount: 0.2, from: 'center' },
            opacity: 1,
            z: 0
          },
          'start'
        )

        // 3. Compress title typography
        .to(
          titleChars,
          {
            scaleY: 0.2,
            opacity: 0.3,
            stagger: { amount: 0.2, from: 'center' },
            ease: 'power2.inOut'
          },
          'start'
        )

        // 4. Reveal subtle scroll instruction badge
        .to(badgeText, { opacity: 1, y: 0, ease: 'power1.out' }, 'start+=0.3');

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fullscreen-clip-root" ref={rootRef}>
      <main className="fullscreen-main">

        {/* 5-Slide Row Grid */}
        <div className="fullscreen-slides">
          <div className="fullscreen-slide"><div className="fullscreen-slide-img" style={{ backgroundImage: `url(${images[0]})` }} /></div>
          <div className="fullscreen-slide"><div className="fullscreen-slide-img" style={{ backgroundImage: `url(${images[1]})` }} /></div>
          <div className="fullscreen-slide fullscreen-slide-current"><div className="fullscreen-slide-img" style={{ backgroundImage: `url(${images[2]})` }} /></div>
          <div className="fullscreen-slide"><div className="fullscreen-slide-img" style={{ backgroundImage: `url(${images[3]})` }} /></div>
          <div className="fullscreen-slide"><div className="fullscreen-slide-img" style={{ backgroundImage: `url(${images[4]})` }} /></div>
        </div>

        {/* Morphing Clip-Path Layer */}
        <div className="fullscreen-clip-box">
          <div className="fullscreen-clip-img" style={{ backgroundImage: `url(${images[2]})` }} />
        </div>

        {/* Overlay Cover Content */}
        <div className="fullscreen-cover">
          <h2 className="fullscreen-cover-title">
            {'MODULUXE'.split('').map((char, index) => (
              <span key={index} className="fullscreen-char" style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
          </h2>
          <div className="fullscreen-cover-badge" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            ( Scroll to morph spatial view )
          </div>
        </div>

      </main>

      <style>{`
        .fullscreen-clip-root {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: #0d0d11;
          color: #ffffff;
          font-family: 'Instrument Serif', 'Cormorant Garamond', serif;
          z-index: 6;
        }

        .fullscreen-main {
          display: grid;
          width: 100%;
          height: 100vh;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          overflow: hidden;
          position: relative;
        }

        .fullscreen-slides {
          grid-area: 1 / 1 / -1 / -1;
          display: grid;
          grid-template-columns: repeat(5, 18%);
          grid-gap: 2vw;
          height: 100vh;
          align-items: center;
          justify-content: center;
          justify-items: center;
          align-content: center;
          pointer-events: none;
          z-index: 2;
        }

        .fullscreen-slide {
          overflow: hidden;
          border-radius: 23vw;
          height: 56vh;
          width: 100%;
          display: grid;
          opacity: 0;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }

        .fullscreen-slide-current {
          visibility: hidden;
        }

        .fullscreen-slide-img {
          background-size: cover;
          background-position: 50% 50%;
          width: 100%;
          height: 100%;
        }

        .fullscreen-clip-box {
          grid-area: 1 / 1 / -1 / -1;
          display: grid;
          z-index: 3;
          clip-path: inset(0% 0% round 0vw);
          will-change: clip-path;
        }

        .fullscreen-clip-img {
          background-size: cover;
          background-position: 50% 50%;
          width: 100%;
          height: 100%;
        }

        .fullscreen-cover {
          grid-area: 1 / 1 / -1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 6vh 2rem 5vh 2rem;
          z-index: 10;
          pointer-events: none;
        }

        .fullscreen-cover-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(3rem, 10vw, 9rem);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 300;
          line-height: 1;
          pointer-events: none;
          text-shadow: 0 10px 40px rgba(0,0,0,0.7);
        }

        .fullscreen-cover-badge {
          padding: 0.8rem 2rem;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #c4d600;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 4rem;
          font-family: "DM Mono", monospace;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}
