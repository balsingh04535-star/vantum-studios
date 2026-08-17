import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float iTime;
  uniform vec2  iResolution;
  uniform vec2  rayPos;
  uniform vec2  rayDir;
  uniform vec3  raysColor;
  uniform float raysSpeed;
  uniform float lightSpread;
  uniform float rayLength;
  uniform float pulsating;
  uniform float fadeDistance;
  uniform float saturation;
  uniform vec2  mousePos;
  uniform float mouseInfluence;
  uniform float noiseAmount;
  uniform float distortion;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
    vec2 sourceToCoord = coord - raySource;
    vec2 dirNorm = normalize(sourceToCoord);
    float cosAngle = dot(dirNorm, rayRefDirection);

    float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
    float spreadFactor = pow(clamp(distortedAngle, 0.0001, 1.0), 1.0 / max(lightSpread, 0.001));

    float distance = length(sourceToCoord);
    float maxDistance = max(iResolution.x, 1.0) * rayLength;
    float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

    float fadeFalloff = clamp((max(iResolution.x, 1.0) * fadeDistance - distance) / (max(iResolution.x, 1.0) * fadeDistance), 0.3, 1.0);
    float pulse = pulsating > 0.5 ? (0.85 + 0.15 * sin(iTime * speed * 3.0)) : 1.0;

    float baseStrength = clamp(
      (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
      (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
      0.0, 1.0
    );

    return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

    vec2 finalRayDir = rayDir;
    if (mouseInfluence > 0.0) {
      vec2 mouseScreenPos = mousePos * iResolution.xy;
      vec2 diff = mouseScreenPos - rayPos;
      if (length(diff) > 0.001) {
        vec2 mouseDirection = normalize(diff);
        finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
      }
    }

    vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
    vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

    vec4 fragColor = rays1 * 0.5 + rays2 * 0.4;

    if (noiseAmount > 0.0) {
      float n = hash(coord * 0.01 + iTime * 0.1);
      fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
    }

    float brightness = 1.0 - (coord.y / max(iResolution.y, 1.0));
    fragColor.x *= 0.2 + brightness * 0.8;
    fragColor.y *= 0.4 + brightness * 0.6;
    fragColor.z *= 0.6 + brightness * 0.5;

    if (saturation != 1.0) {
      float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
      fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
    }

    fragColor.rgb *= raysColor;
    gl_FragColor = fragColor;
  }
`;

export default function LightRaysBackground({
  color = '#001db8',
  speed = 1.0,
  spread = 0.65,
  length = 3.0,
  pulsating = true,
  fadeDistance = 1.2,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.15,
  noiseAmount = 0.04,
  distortion = 0.06,
  style = {}
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL init fallback:', e);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const outside = 0.2;
    const anchor = [0.5 * (width * dpr), -outside * (height * dpr)];
    const dir = [0, 1];

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
      rayPos: { value: new THREE.Vector2(anchor[0], anchor[1]) },
      rayDir: { value: new THREE.Vector2(dir[0], dir[1]) },
      raysColor: { value: new THREE.Color(color) },
      raysSpeed: { value: speed },
      lightSpread: { value: spread },
      rayLength: { value: length },
      pulsating: { value: pulsating ? 1.0 : 0.0 },
      fadeDistance: { value: fadeDistance },
      saturation: { value: saturation },
      mousePos: { value: new THREE.Vector2(0.5, 0.5) },
      mouseInfluence: { value: mouseInfluence },
      noiseAmount: { value: noiseAmount },
      distortion: { value: distortion }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const mouse = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };

    const setMouse = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      mouse.x = (clientX - rect.left) / Math.max(1, rect.width);
      mouse.y = (clientY - rect.top) / Math.max(1, rect.height);
    };

    const onMouse = (e) => setMouse(e.clientX, e.clientY);
    const onTouch = (e) => {
      if (e.touches && e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(currentDpr);
      uniforms.iResolution.value.set(w * currentDpr, h * currentDpr);
      uniforms.rayPos.value.set(0.5 * (w * currentDpr), -outside * (h * currentDpr));
    };

    window.addEventListener('resize', handleResize);
    if (followMouse) {
      window.addEventListener('mousemove', onMouse);
      window.addEventListener('touchmove', onTouch, { passive: true });
    }

    const clock = new THREE.Clock();
    let reqId = null;

    const tick = () => {
      const elapsed = clock.getElapsedTime();
      uniforms.iTime.value = elapsed;

      if (followMouse && uniforms.mouseInfluence.value > 0) {
        const s = 0.92;
        smooth.x = smooth.x * s + mouse.x * (1 - s);
        smooth.y = smooth.y * s + mouse.y * (1 - s);
        uniforms.mousePos.value.set(smooth.x, smooth.y);
      }

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (followMouse) {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('touchmove', onTouch);
      }
      if (reqId) cancelAnimationFrame(reqId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    color,
    speed,
    spread,
    length,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
