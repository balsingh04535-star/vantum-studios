import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowDownRight } from 'lucide-react';

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
  const heroFooterRef = useRef(null);
  const logoRef = useRef(null);
  const headerWordsRef = useRef([]);
  const buttonRef = useRef(null);

  const headlineText = "A living catalogue of digital realities, collected frame by frame from the edge of the real.";
  const words = headlineText.split(" ");

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const lerp = (from, to, t) => from + (to - from) * t;
    const mapRange = (value, rangeStart, rangeEnd) =>
      gsap.utils.clamp(0, 1, (value - rangeStart) / (rangeEnd - rangeStart));

    const spotlightImages = galleryRef.current?.querySelectorAll('.hero-spotlight-item img');
    const logoEl = logoRef.current;
    const headerTargets = [...headerWordsRef.current.filter(Boolean), buttonRef.current].filter(Boolean);

    // Initial state setup
    gsap.set(headerTargets, { opacity: 0 });

    const fadeStep = (0.5 - 0.05) / Math.max(headerTargets.length, 1);
    const fadeDuration = fadeStep * 3;
    let logoStartScale = window.innerWidth <= 1000 ? 2.5 : 6;

    // 2. Initialize Three.js WebGL Dissolve Canvas
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
          : { r: 0.92, g: 0.96, b: 0.87 }; // Default #ebf5df
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

    // 3. ScrollTrigger Timeline & Animation Progress
    const mainTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 4.5}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const scrollProgress = self.progress;

        // Phase A: Gallery scale & logo move (0.0 -> 0.70)
        const galleryProgress = mapRange(scrollProgress, 0, 0.70);
        const galleryScale = lerp(1, 0.5, galleryProgress);
        if (galleryRef.current) {
          gsap.set(galleryRef.current, { scale: galleryScale });
        }

        if (spotlightImages) {
          const imageScale = lerp(1.25, 1, galleryProgress);
          gsap.set(spotlightImages, { scale: imageScale });
        }

        if (logoEl) {
          const logoScale = lerp(logoStartScale, 1, galleryProgress);
          const oneRem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
          const logoHeight = logoEl.offsetHeight || 50;
          const logoScaledHeight = logoHeight * logoScale;
          const logoTravelDistance = window.innerHeight - logoScaledHeight - oneRem * 4;

          gsap.set(logoEl, {
            scale: logoScale,
            y: -logoTravelDistance * galleryProgress,
          });
        }

        // Hero footer fade & blur
        const footerProgress = mapRange(scrollProgress, 0.05, 0.25);
        if (heroFooterRef.current) {
          gsap.set(heroFooterRef.current, {
            scale: lerp(1, 0.75, footerProgress),
            filter: `blur(${lerp(0, 20, footerProgress)}px)`,
            opacity: lerp(1, 0, footerProgress),
          });
        }

        // Headline words staggered reveal & clean dissolve fadeout
        headerTargets.forEach((target, index) => {
          const targetStart = 0.05 + index * fadeStep;
          let opacity = mapRange(
            scrollProgress,
            targetStart,
            targetStart + fadeDuration
          );

          if (scrollProgress > 0.65) {
            const fadeOutProgress = mapRange(scrollProgress, 0.65, 0.78);
            opacity = lerp(opacity, 0, fadeOutProgress);
          }

          gsap.set(target, { opacity });
        });

        // Phase B: WebGL Dissolve Noise Shader (0.78 -> 0.98)
        const dissolveProgress = mapRange(scrollProgress, 0.78, 0.98);
        if (material) {
          material.uniforms.uProgress.value = dissolveProgress * 1.25;
        }
      },
    });

    return () => {
      mainTrigger.kill();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Floating Logo component scaling into nav */}
      <div className="logo-fixed" ref={logoRef}>
        <img src="/logo.svg" alt="Vantum Studios Logo" />
      </div>

      <section className="hero-section" ref={heroRef}>
        <div className="hero-inner" ref={heroInnerRef}>
          {/* 3x3 Spotlight Gallery Grid */}
          <div className="hero-spotlight-gallery" ref={galleryRef}>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/grid-new-1.png" alt="Vantum Work 1" /></div>
              <div className="hero-spotlight-item"><img src="/img2.jpg" alt="Vantum Work 2" /></div>
              <div className="hero-spotlight-item"><img src="/img3.jpg" alt="Vantum Work 3" /></div>
            </div>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/img4.jpg" alt="Vantum Work 4" /></div>
              <div className="hero-spotlight-item">
                <picture>
                  <source media="(max-width: 1000px)" srcSet="/mobile-hero.png" />
                  <img src="/2.png" alt="Vantum Main Middle" />
                </picture>
              </div>
              <div className="hero-spotlight-item"><img src="/img6.jpg" alt="Vantum Work 6" /></div>
            </div>
            <div className="hero-spotlight-col">
              <div className="hero-spotlight-item"><img src="/img7.jpg" alt="Vantum Work 7" /></div>
              <div className="hero-spotlight-item"><img src="/img8.jpg" alt="Vantum Work 8" /></div>
              <div className="hero-spotlight-item"><img src="/grid-new-2.png" alt="Vantum Work 9" /></div>
            </div>
          </div>

          {/* Hero Headline & CTA */}
          <div className="hero-header">
            <h3>
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className="hero-word"
                  ref={(el) => (headerWordsRef.current[idx] = el)}
                >
                  {word}
                </span>
              ))}
            </h3>

            <div ref={buttonRef} style={{ marginTop: '1rem' }}>
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
