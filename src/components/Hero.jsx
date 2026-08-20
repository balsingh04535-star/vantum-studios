import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import HeroVideoCanvas from './HeroVideoCanvas';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uSpread;
  varying vec2 vUv;

  float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);
    
    float dissolveEdge = uv.y - uProgress * 1.2;
    float noiseValue = fbm(centeredUv * 15.0);
    float d = dissolveEdge + noiseValue * uSpread;
    
    float pixelSize = 1.0 / uResolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function Hero({ onOpenInquiry }) {
  const heroRef = useRef(null);
  const heroInnerRef = useRef(null);
  const galleryRef = useRef(null);
  const canvasRef = useRef(null);
  const creamOverlayRef = useRef(null);
  const heroFooterRef = useRef(null);
  const titleLogoRef = useRef(null);
  const subTitleRef = useRef(null);
  const buttonRef = useRef(null);
  const rendererRef = useRef(null); // holds { renderer, scene, camera } for on-demand render
  const [seqProgress, setSeqProgress] = useState(0);

  useEffect(() => {
    const spotlightImages = galleryRef.current?.querySelectorAll('.hero-spotlight-item img') || [];
    const titleLogo = titleLogoRef.current;
    const subTitle = subTitleRef.current;

    // Initial state setup: Logo & Subtitle 100% visible on load
    if (titleLogo) gsap.set(titleLogo, { opacity: 1, y: 0 });
    if (subTitle) gsap.set(subTitle, { opacity: 1, y: 0 });
    if (buttonRef.current) gsap.set(buttonRef.current, { opacity: 0, y: 60 });
    if (creamOverlayRef.current) gsap.set(creamOverlayRef.current, { opacity: 0 });
    if (galleryRef.current) gsap.set(galleryRef.current, { scale: 0.78 });
    if (spotlightImages.length > 0) gsap.set(spotlightImages, { scale: 1.25 });

    // Initialize Three.js WebGL Dissolve Canvas
    const canvas = canvasRef.current;
    const heroEl = heroRef.current;

    let renderer, material, scene, camera, animationFrameId;

    if (canvas && heroEl) {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
      });

      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16) / 255,
              g: parseInt(result[2], 16) / 255,
              b: parseInt(result[3], 16) / 255,
            }
          : { r: 0.749, g: 0.843, b: 1.0 };
      };

      const rgb = hexToRgb('#0002b5');
      const geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uProgress: { value: 0 },
          uResolution: {
            value: new THREE.Vector2(heroEl.offsetWidth, heroEl.offsetHeight),
          },
          uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
          uSpread: { value: 0.5 },
        },
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const resizeWebGL = () => {
        if (!heroEl || !renderer) return;
        const width = heroEl.offsetWidth;
        const height = heroEl.offsetHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        material.uniforms.uResolution.value.set(width, height);
        // Re-render after resize since we no longer have a continuous loop
        renderer.render(scene, camera);
      };

      resizeWebGL();
      window.addEventListener('resize', resizeWebGL);

      // Render once on mount — no continuous loop needed since uTime isn't used
      // GSAP will update uProgress and trigger a re-render via the onUpdate callback below
      renderer.render(scene, camera);

      // Store a render function so GSAP's onUpdate can trigger re-renders on demand
      rendererRef.current = { renderer, scene, camera };
    }

    // Extended 4.5x Viewport Scroll Runway
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 4.5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        refreshPriority: 2,
        onUpdate: (self) => {
          setSeqProgress(self.progress);
          // Render the WebGL canvas on-demand instead of via a continuous RAF loop
          if (rendererRef.current) {
            const { renderer, scene, camera } = rendererRef.current;
            renderer.render(scene, camera);
          }
        },
        onLeave: () => {
          if (renderer) renderer.setClearColor(new THREE.Color('#0002b5'), 1);
          if (heroRef.current) heroRef.current.style.backgroundColor = 'var(--bg-cream, #0002b5)';
          if (heroInnerRef.current) heroInnerRef.current.style.backgroundColor = 'var(--bg-cream, #0002b5)';
          if (creamOverlayRef.current) creamOverlayRef.current.style.opacity = '1';
        },
        onEnterBack: () => {
          if (heroRef.current) heroRef.current.style.backgroundColor = 'var(--bg-cream, #0002b5)';
          if (heroInnerRef.current) heroInnerRef.current.style.backgroundColor = 'var(--bg-cream, #0002b5)';
        }
      }
    });

    // --- STAGE 1: As user scrolls, Hero Logo & Subtitle move up and out (0.0 -> 0.25) ---
    if (titleLogoRef.current) {
      tl.to(titleLogoRef.current, {
        y: -140,
        opacity: 0,
        scale: 0.9,
        ease: 'power2.inOut',
        duration: 0.25
      }, 0);
    }

    if (subTitleRef.current) {
      tl.to(subTitleRef.current, {
        y: -90,
        opacity: 0,
        scale: 0.9,
        ease: 'power2.inOut',
        duration: 0.25
      }, 0);
    }

    // Hide the scroll indicator as soon as user begins scrolling
    if (heroFooterRef.current) {
      tl.to(heroFooterRef.current, {
        opacity: 0,
        y: 20,
        ease: 'power1.out',
        duration: 0.1
      }, 0);
    }

    // --- STAGE 2: 3x3 Grid Zoom-Out Reveal (0.25 -> 0.75) ---
    if (galleryRef.current) {
      tl.to(galleryRef.current, {
        scale: 1.0,
        opacity: 1,
        ease: 'power2.inOut',
        duration: 0.5
      }, 0.25);
    }

    // Fade out outer columns slightly before the cream dissolve hits
    const cols = galleryRef.current ? galleryRef.current.querySelectorAll('.hero-spotlight-col') : [];
    if (cols.length >= 3) {
      tl.to([cols[0], cols[2]], {
        opacity: 0.4,
        ease: 'power1.inOut',
        duration: 0.25
      }, 0);
    }

    // --- STAGE 3: WebGL Liquid Noise Dissolve (0.75 -> 1.0) ---
    if (material) {
      tl.to(material.uniforms.uProgress, {
        value: 3.0,
        ease: 'power1.inOut',
        duration: 0.25
      }, 0.75);
    }

    const clearObj = { r: 0.0, g: 0.05, b: 0.35, a: 0 };
    tl.to(clearObj, {
      r: 0.0,
      g: 0.008,
      b: 0.71,
      a: 1,
      ease: 'power1.inOut',
      duration: 0.25,
      onUpdate: () => {
        if (renderer) {
          renderer.setClearColor(
            new THREE.Color(clearObj.r, clearObj.g, clearObj.b),
            clearObj.a
          );
        }
      }
    }, 0.75);

    if (creamOverlayRef.current) {
      tl.to(creamOverlayRef.current, {
        opacity: 1,
        ease: 'power1.inOut',
        duration: 0.25
      }, 0.75);
    }

    if (heroInnerRef.current) {
      tl.to(heroInnerRef.current, {
        backgroundColor: '#0002b5',
        ease: 'power1.inOut',
        duration: 0.25
      }, 0.75);
    }

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <>
      <section className="hero-section" ref={heroRef}>
        <div className="hero-inner" ref={heroInnerRef}>
          {/* Solid Light Blue Overlay for seamless transition */}
          <div
            ref={creamOverlayRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'var(--bg-cream, #bfd7ff)',
              opacity: 0,
              zIndex: 24,
              pointerEvents: 'none'
            }}
          />

          {/* 3x3 Spotlight Gallery Grid */}
          <div className="hero-spotlight-gallery" ref={galleryRef}>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/grid-new-1.png" alt="Chanan interactive product experience" /></div>
              <div className="hero-spotlight-item"><img src="/img2.jpg" alt="Chanan 3D spatial visual" /></div>
              <div className="hero-spotlight-item"><img src="/img3.jpg" alt="Chanan orbital interface design" /></div>
            </div>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/img4.jpg" alt="Chanan luxury digital flagship" /></div>
              <div className="hero-spotlight-item" style={{ position: 'relative' }}>
                <div className="hero-canvas-seq">
                  <HeroVideoCanvas
                    scrollProgress={seqProgress}
                    folder="hero-sequence"
                    mobileFolder="hero-sequence-mobile"
                    frameCount={201}
                    width={1280}
                    height={720}
                  />
                </div>

                {/* Centered Shimmer Shine SCROLL TO EXPLORE Text at Bottom of Main Center Grid Card */}
                <div
                  ref={heroFooterRef}
                  style={{
                    position: 'absolute',
                    bottom: '1.2rem',
                    left: 0,
                    right: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    zIndex: 10,
                    pointerEvents: 'none',
                    fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
                    fontSize: 'clamp(0.6rem, 0.95vw, 0.8rem)',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                  }}
                >
                  <span className="shine-sweep-text">
                    SCROLL TO EXPLORE ↓
                  </span>
                </div>
              </div>
              <div className="hero-spotlight-item"><img src="/img6.jpg" alt="Chanan kinetic UI dashboard" /></div>
            </div>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/img7.jpg" alt="Chanan brand identity showcase" /></div>
              <div className="hero-spotlight-item"><img src="/img8.jpg" alt="Chanan 3D telemetry simulation" /></div>
              <div className="hero-spotlight-item"><img src="/grid-new-2.png" alt="Chanan digital design system" /></div>
            </div>
          </div>

          {/* Center Hero Title & Subtitle Stack */}
          <div className="hero-title-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Chanan SVG Logo */}
            <div
              ref={titleLogoRef}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'auto'
              }}
            >
              <img
                src="/hero-logo.svg"
                alt="Chanan"
                style={{
                  maxWidth: 'min(85vw, 750px)',
                  maxHeight: '38vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.7))'
                }}
              />
            </div>

            {/* Subtitle directly beneath Chanan logo in warm ivory cream */}
            <h2
              ref={subTitleRef}
              style={{
                fontFamily: '"Cormorant Garamond", "Garamond", "Georgia", serif',
                fontSize: 'clamp(1.1rem, 2.2vw, 2.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.04em',
                color: '#fff8ed',
                margin: '0.6rem 0 0 0',
                textAlign: 'center',
                lineHeight: 1.2,
                pointerEvents: 'auto',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)'
              }}
            >
              An archive of the unreal
            </h2>
          </div>

          {/* WebGL Dissolve Shader Canvas Overlay */}
          <canvas className="hero-canvas" ref={canvasRef}></canvas>
        </div>
      </section>
    </>
  );
}

