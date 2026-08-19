import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import ManifestoBackgroundCanvas from './ManifestoBackgroundCanvas';
import PortalTransitionShader from './PortalTransitionShader';
import LightRaysBackground from './LightRaysBackground';
import SchemeSpatialGallery from './SchemeSpatialGallery';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function StudioOverview({ onOpenInquiry }) {
  const containerRef = useRef(null);
  const pinnedStageRef = useRef(null);
  const manifestoLayerRef = useRef(null);
  const showcasePreviewRef = useRef(null);
  const globeRef = useRef(null);
  const headingRef = useRef(null);

  const [videoProgress, setVideoProgress] = useState(0);
  const [shaderTransition, setShaderTransition] = useState(0);
  const [shaderOpacity, setShaderOpacity] = useState(0);

  const headlineWords = [
    { text: 'WE', isItalic: false },
    { text: 'BUILD', isItalic: false },
    { text: 'DIGITAL', isItalic: true },
    { text: 'EXPERIENCES', isItalic: true },
    { text: 'PEOPLE', isItalic: false },
    { text: 'REMEMBER.', isItalic: false },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const pinnedStage = pinnedStageRef.current;
    const manifestoLayer = manifestoLayerRef.current;
    const showcasePreview = showcasePreviewRef.current;
    const globe = globeRef.current;
    if (!container || !pinnedStage || !manifestoLayer || !globe) return;

    const ctx = gsap.context(() => {
      // ── Pinned Stage: Video Playback -> Portal Opens to Showcase -> Flow Downstream ──
      ScrollTrigger.create({
        trigger: pinnedStage,
        start: 'top top',
        end: `+=${window.innerHeight * 3.8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        refreshPriority: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // ── PHASE 1: Video Frame Scrubbing (0.0 to 0.55) ──
          const vProg = Math.min(1, progress / 0.55);
          setVideoProgress(vProg);

          // Word-by-word headline illumination
          const wordElements = headingRef.current?.querySelectorAll('.manifesto-word');
          if (wordElements && wordElements.length > 0) {
            const totalWords = wordElements.length;
            wordElements.forEach((word, index) => {
              const wordStart = (index / totalWords) * 0.45;
              const wordEnd = ((index + 1) / totalWords) * 0.45;
              let opacity = 0.3;
              if (vProg >= wordEnd) {
                opacity = 1;
              } else if (vProg >= wordStart) {
                opacity = 0.3 + 0.7 * ((vProg - wordStart) / (wordEnd - wordStart));
              }
              gsap.to(word, { opacity, duration: 0.05, overwrite: true });
            });
          }

          // ── PHASE 2: Video Ends -> Completely Hide Video & Open Shader to Reveal Showcase (0.55 to 1.0) ──
          if (progress < 0.55) {
            // Video active, shader off, showcase hidden
            manifestoLayer.style.display = 'flex';
            manifestoLayer.style.opacity = 1;
            setShaderOpacity(0);
            setShaderTransition(0);
            if (showcasePreview) showcasePreview.style.opacity = 1;
          } else if (progress >= 0.55 && progress < 0.65) {
            // Smooth transition veil from video into the dark shader
            const crossRatio = (progress - 0.55) / 0.10;
            manifestoLayer.style.display = 'flex';
            manifestoLayer.style.opacity = Math.max(0, 1 - crossRatio);
            setShaderOpacity(1);
            setShaderTransition(0);
            if (showcasePreview) showcasePreview.style.opacity = 1;
          } else {
            // Video is COMPLETELY GONE / HIDDEN (0% visible)
            manifestoLayer.style.display = 'none';
            manifestoLayer.style.opacity = 0;

            // Shader portal opens up from center: 0.0 -> 1.0 (reveals Showcase underneath)
            const sProg = Math.min(1, Math.max(0, (progress - 0.65) / 0.30));
            setShaderTransition(sProg);

            // Shader opacity
            if (progress >= 0.95) {
              setShaderOpacity(Math.max(0, 1 - (progress - 0.95) / 0.05));
            } else {
              setShaderOpacity(1);
            }

            // Showcase preview scale & sharpness
            if (showcasePreview) {
              const scale = 0.96 + sProg * 0.04;
              showcasePreview.style.transform = `scale(${scale})`;
              showcasePreview.style.opacity = 1;
            }
          }
        },
      });

      // ── Globe sheet natural flow downstream ──
      gsap.set(globe, {
        clipPath: 'none',
        position: 'relative',
        width: '100%',
        height: 'auto',
        marginTop: 0,
        zIndex: 1,
        pointerEvents: 'all',
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* ── PINNED TRANSITION STAGE (100vh Viewport) ── */}
      <div
        ref={pinnedStageRef}
        id="manifesto"
        style={{
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#bfd7ff',
          boxSizing: 'border-box'
        }}
      >
        {/* ── UNDERNEATH LAYER: The Showcase Page ("Archive of Creative Realities") ── */}
        {/* This is what gets revealed inside the shader hole! */}
        <div
          ref={showcasePreviewRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#bfd7ff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '3rem 2rem',
            boxSizing: 'border-box',
            zIndex: 1,
            transform: 'scale(0.96)',
            willChange: 'transform',
            pointerEvents: 'none'
          }}
        >
          {/* Live Volumetric Light Rays Background (from files-5) */}
          <LightRaysBackground
            origin="top-center"
            color="#001db8"
            speed={1.0}
            spread={0.65}
            length={3.0}
            followMouse={true}
            mouseInfluence={0.15}
            pulsating={true}
            fadeDistance={1.2}
          />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '960px' }}>
            <h2
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 5.8rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#020b4d',
                marginBottom: '1rem',
                textTransform: 'uppercase'
              }}
            >
              The Work{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-luxury-slim, "Cormorant Garamond", serif)',
                  fontWeight: 400,
                  color: '#001db8'
                }}
              >
                Speaks
              </span>
            </h2>
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.3vw, 1.15rem)',
                color: '#001db8',
                lineHeight: 1.5,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                margin: 0
              }}
            >
              No Templates. No Excuses. Pure Execution.
            </p>
          </div>
        </div>

        {/* ── PORTAL SHADER TRANSITION (On top of Showcase Layer, dissolves open to reveal Showcase) ── */}
        <PortalTransitionShader
          transitionProgress={shaderTransition}
          borderColor="#001db8"
          opacity={shaderOpacity}
        />

        {/* ── TOP LAYER: Manifesto Section (Video Frame Canvas + Anchored Typography) ── */}
        {/* Active only during Phase 1 (0.0 to 0.55), completely hidden in Phase 2 */}
        <div
          ref={manifestoLayerRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(2.5rem, 4vw, 4.5rem) clamp(2rem, 5vw, 5rem)',
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            color: '#ffffff',
            zIndex: 10,
            willChange: 'opacity'
          }}
        >
          {/* Full-Bleed Video Frame Canvas */}
          <ManifestoBackgroundCanvas scrollProgress={videoProgress} opacity={1} />

          {/* Bottom Gradient Scrim for High Contrast */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.35) 65%, rgba(0, 0, 0, 0.8) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Anchored Manifesto Typography */}
          <div
            style={{
              width: '100%',
              maxWidth: '1280px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              position: 'relative',
              zIndex: 2
            }}
          >
            <h1
              ref={headingRef}
              style={{
                margin: 0,
                fontSize: 'clamp(2.2rem, 4.6vw, 4.8rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
            >
              {headlineWords.map((item, idx) => (
                <span
                  key={idx}
                  className="manifesto-word"
                  style={{
                    opacity: 0.3,
                    fontFamily: item.isItalic
                      ? '"Cormorant Garamond", "Garamond", Georgia, serif'
                      : '"Outfit", "Plus Jakarta Sans", sans-serif',
                    fontWeight: item.isItalic ? 300 : 700,
                    fontStyle: item.isItalic ? 'italic' : 'normal',
                    color: item.isItalic ? '#bfd7ff' : '#ffffff',
                    marginRight: '0.24em',
                    display: 'inline-block'
                  }}
                >
                  {item.text}
                </span>
              ))}
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)',
                color: 'rgba(255, 255, 255, 0.92)',
                lineHeight: 1.65,
                maxWidth: '680px',
                margin: 0,
                fontWeight: 400,
                letterSpacing: '0.01em'
              }}
            >
              Chanan is an independent creative agency specialising in web design and development, brand identity, 3D product visuals and motion design for ambitious brands worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* ── DOWNSTREAM: SchemeSpatialGallery (Masonry Columns & Globe) ── */}
      <div ref={globeRef}>
        <SchemeSpatialGallery onOpenInquiry={onOpenInquiry} />
      </div>
    </div>
  );
}
