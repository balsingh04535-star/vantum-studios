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
  const subWordsRef = useRef([]);
  const buttonRef = useRef(null);
  const [seqProgress, setSeqProgress] = useState(0);

  const subtitleText = "A living catalogue of digital realities, collected frame by frame from the edge of the real.";
  const subWords = subtitleText.split(" ");

  useEffect(() => {
    const spotlightImages = galleryRef.current?.querySelectorAll('.hero-spotlight-item img') || [];
    const titleLogo = titleLogoRef.current;
    const validSubWords = subWordsRef.current.filter(Boolean);

    // Initial state setup: Logo is 100% visible IMMEDIATELY on load
    if (titleLogo) gsap.set(titleLogo, { opacity: 1, y: 0 });
    gsap.set(validSubWords, { opacity: 0, y: 60 });
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
          : { r: 0.92, g: 0.96, b: 0.87 };
      };

      const rgb = hexToRgb('#ebf5df');
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
      };

      resizeWebGL();
      window.addEventListener('resize', resizeWebGL);

      const renderLoop = () => {
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(renderLoop);
      };
      renderLoop();
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
        onUpdate: (self) => {
          setSeqProgress(self.progress);
        },
        onLeave: () => {
          if (renderer) renderer.setClearColor(new THREE.Color('#ebf5df'), 1);
          if (heroRef.current) heroRef.current.style.backgroundColor = 'var(--bg-cream, #f4f3ef)';
          if (heroInnerRef.current) heroInnerRef.current.style.backgroundColor = 'var(--bg-cream, #f4f3ef)';
          if (creamOverlayRef.current) creamOverlayRef.current.style.opacity = '1';
        },
        onEnterBack: () => {
          if (heroRef.current) heroRef.current.style.backgroundColor = 'var(--bg-cream, #f4f3ef)';
          if (heroInnerRef.current) heroInnerRef.current.style.backgroundColor = 'var(--bg-cream, #f4f3ef)';
        }
      }
    });

    // --- STAGE 1: As user scrolls, Hero SVG Logo moves STRAIGHT UP to top position without size change ---
    if (titleLogo) {
      const targetY = -(window.innerHeight * 0.42);

      tl.to(titleLogo, {
        y: targetY,
        x: 0, // Stay centered horizontally
        scale: 1, // Keep 100% exact size (no scaling)
        opacity: 1, // Keep 100% visible
        ease: 'power2.out',
        duration: 0.35
      }, 0);
    }

    tl.to(validSubWords, {
      opacity: 1,
      y: 0,
      stagger: 0.015,
      ease: 'power2.out',
      duration: 0.3
    }, 0.12);

    if (buttonRef.current) {
      tl.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.3
      }, 0.22);
    }

    // --- STAGE 2: Subtitle & Button clean fade out (0.45 -> 0.65) + Spotlight Grid scaling (0.0 -> 0.65) ---
    tl.to([...validSubWords, buttonRef.current].filter(Boolean), {
      opacity: 0,
      y: -25,
      stagger: 0.01,
      ease: 'power2.in',
      duration: 0.2
    }, 0.45);

    if (heroFooterRef.current) {
      tl.to(heroFooterRef.current, {
        opacity: 0,
        filter: 'blur(12px)',
        scale: 0.85,
        ease: 'power2.in',
        duration: 0.2
      }, 0.45);
    }

    tl.to(galleryRef.current, {
      scale: 0.50,
      ease: 'none',
      duration: 0.65
    }, 0);

    if (spotlightImages.length > 0) {
      tl.to(spotlightImages, {
        scale: 1.0,
        ease: 'none',
        duration: 0.65
      }, 0);
    }

    // --- STAGE 3: WebGL Liquid Noise Cream Dissolve (0.75 -> 1.0) ---
    if (material) {
      tl.to(material.uniforms.uProgress, {
        value: 3.0,
        ease: 'power1.inOut',
        duration: 0.25
      }, 0.75);
    }

    const clearObj = { r: 0.058, g: 0.058, b: 0.058, a: 0 };
    tl.to(clearObj, {
      r: 0.9215,
      g: 0.9607,
      b: 0.8745,
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
        backgroundColor: '#ebf5df',
        ease: 'power1.inOut',
        duration: 0.25
      }, 0.75);
    }

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <>
      <section className="hero-section" id="hero" ref={heroRef}>
        <div className="hero-inner" ref={heroInnerRef}>
          {/* Solid Cream Overlay for seamless transition */}
          <div
            ref={creamOverlayRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'var(--bg-cream, #f4f3ef)',
              opacity: 0,
              zIndex: 24,
              pointerEvents: 'none'
            }}
          />

          {/* 3x3 Spotlight Gallery Grid */}
          <div className="hero-spotlight-gallery" ref={galleryRef}>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/grid-new-1.png" alt="Showcase 1" /></div>
              <div className="hero-spotlight-item"><img src="/img2.jpg" alt="Showcase 2" /></div>
              <div className="hero-spotlight-item"><img src="/img3.jpg" alt="Showcase 3" /></div>
            </div>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/img4.jpg" alt="Showcase 4" /></div>
              <div className="hero-spotlight-item">
                <picture className="hero-mobile-picture">
                  <source media="(max-width: 1000px)" srcSet="/mobile-hero.png" />
                  <img src="/2.png" alt="Main Showcase Middle" style={{ opacity: 0 }} />
                </picture>
                <div className="hero-canvas-seq desktop-only-seq">
                  <HeroVideoCanvas scrollProgress={seqProgress} folder="sequence" width={1280} height={720} />
                </div>
                <div className="hero-canvas-seq mobile-only-seq">
                  <HeroVideoCanvas scrollProgress={seqProgress} folder="sequence-mobile" width={720} height={1280} />
                </div>
              </div>
              <div className="hero-spotlight-item"><img src="/img6.jpg" alt="Showcase 6" /></div>
            </div>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/img7.jpg" alt="Showcase 7" /></div>
              <div className="hero-spotlight-item"><img src="/img8.jpg" alt="Showcase 8" /></div>
              <div className="hero-spotlight-item"><img src="/grid-new-2.png" alt="Showcase 9" /></div>
            </div>
          </div>

          {/* Hero Title Container - Using Custom SVG Logo */}
          <div className="hero-title-container">
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
                alt="Chanana Studios"
                style={{
                  maxWidth: 'min(85vw, 850px)',
                  maxHeight: '45vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.6))'
                }}
              />
            </div>
          </div>

          {/* Subtitle & CTA Button */}
          <div className="hero-subtitle-container">
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", "Outfit", serif',
                fontSize: 'clamp(1.5rem, 3.2vw, 3.1rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.04em',
                color: '#ffffff',
                width: '100%',
                maxWidth: '920px',
                margin: '0 auto',
                textAlign: 'center',
                lineHeight: 1.3,
                pointerEvents: 'auto',
                textShadow: '0 4px 30px rgba(0,0,0,0.6)'
              }}
            >
              {subWords.map((word, idx) => (
                <span
                  key={idx}
                  className="hero-word"
                  ref={(el) => (subWordsRef.current[idx] = el)}
                  style={{ display: 'inline-block', margin: '0 0.18em' }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <div ref={buttonRef} style={{ pointerEvents: 'auto' }}>
              <button className="btn-volt" onClick={onOpenInquiry}>
                <span>Request Access</span>
                <ArrowDownRight size={18} />
              </button>
            </div>
          </div>

          {/* Hero Footer */}
          <div className="hero-footer" ref={heroFooterRef}>
            <h5>An archive of the unreal</h5>
          </div>

          {/* WebGL Dissolve Shader Canvas Overlay */}
          <canvas className="hero-canvas" ref={canvasRef}></canvas>
        </div>
      </section>
    </>
  );
}
