import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FullscreenClipEffect() {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const images = [
    '/img/demo1/2.jpg',
    '/img/demo1/3.jpg',
    '/img/demo1/1.jpg',
    '/img/demo1/4.jpg',
    '/img/demo1/5.jpg'
  ];

  const handleToggle = () => {
    if (isAnimating || !rootRef.current) return;
    setIsAnimating(true);

    const root = rootRef.current;
    const clipElement = root.querySelector('.fullscreen-clip-box');
    const clipImage = root.querySelector('.fullscreen-clip-img');
    const slides = root.querySelectorAll('.fullscreen-slide:not(.fullscreen-slide-current)');
    const slider = root.querySelector('.fullscreen-slides');
    const titleChars = root.querySelectorAll('.fullscreen-char');

    if (isOpen) {
      // Transition to horizontal gallery layout
      const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: 'power4.inOut' },
        onComplete: () => {
          setIsAnimating(false);
          setIsOpen(false);
        }
      });

      tl.addLabel('start', 0)
        .set(slider, { perspective: 1000 })
        .set(clipElement, { willChange: 'clip-path' })
        .set(titleChars, { transformOrigin: '50% 100%' })
        .to(clipElement, { clipPath: 'inset(22% 39% round 23vw)' }, 'start')
        .to(clipImage, { scale: 0.8 }, 'start')
        .fromTo(
          slides,
          { opacity: 0, z: 600 },
          {
            duration: 1.4,
            ease: 'power3.inOut',
            stagger: { amount: 0.15, from: 'center' },
            opacity: 1,
            z: 0
          },
          'start'
        )
        .to(
          titleChars,
          {
            duration: 1,
            scaleY: 0.2,
            opacity: 0.3,
            stagger: { amount: 0.2, from: 'center' }
          },
          'start'
        );
    } else {
      // Transition back to full screen preview
      const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: 'expo.inOut' },
        onComplete: () => {
          setIsAnimating(false);
          setIsOpen(true);
        }
      });

      tl.addLabel('start', 0)
        .set(clipElement, { willChange: 'clip-path' })
        .to(
          slides,
          {
            stagger: { amount: 0.1, from: 'edges' },
            opacity: 0,
            z: 600
          },
          'start'
        )
        .addLabel('clip', 'start+=0.15')
        .to(clipImage, { scale: 1 }, 'clip')
        .fromTo(
          clipElement,
          { clipPath: 'inset(22% 39% round 23vw)' },
          { clipPath: 'inset(0% 0% round 0vw)' },
          'clip+=0.1'
        )
        .fromTo(
          clipImage,
          { filter: 'brightness(100%) saturate(100%)' },
          { duration: 0.4, ease: 'power1.in', filter: 'brightness(180%) saturate(180%)' },
          'clip+=0.1'
        )
        .to(
          clipImage,
          { duration: 0.8, ease: 'power1', filter: 'brightness(100%) saturate(100%)' },
          'clip+=0.4'
        )
        .to(
          titleChars,
          {
            duration: 1,
            scaleY: 1,
            opacity: 1,
            stagger: { amount: 0.2, from: 'center' }
          },
          'clip'
        );
    }
  };

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
          <button className="fullscreen-cover-button" onClick={handleToggle}>
            {isOpen ? 'Minimize Gallery' : 'Expand Fullscreen'}
          </button>
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

        .fullscreen-cover-button {
          pointer-events: auto;
          padding: 1.1rem 2.5rem;
          background: rgba(255, 255, 255, 0.95);
          color: #0d0d11;
          border: none;
          border-radius: 4rem;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .fullscreen-cover-button:hover {
          background: #c4d600;
          color: #0d0d11;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
