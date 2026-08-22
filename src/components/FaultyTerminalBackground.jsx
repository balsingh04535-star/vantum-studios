import React, { useEffect, useRef } from 'react';

const vertexShaderSource = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec3  uBgColor;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;
  
  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);
  
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);
  
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
    
    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;
        
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }
    
    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
        
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }
    
    p = fract(p);
    p *= uDigitSize;
    
    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);
    
    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;
    
    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
    
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){
    
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;
    
    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);
    
    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
    
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }
    
    vec2 p = uv * uScale;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }

    float intensity = clamp((col.r * 0.3 + col.g * 0.59 + col.b * 0.11) * uBrightness, 0.0, 1.0);

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      intensity += (rnd - 0.5) * (uDither * 0.003922);
    }

    vec3 finalColor = mix(uBgColor, uTint, clamp(intensity, 0.0, 1.0));
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const hexToRgb = (hex) => {
  let h = String(hex).replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const compileShader = (gl, type, src) => {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
};

const linkProgram = (gl, vs, fs) => {
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(p));
    return null;
  }
  return p;
};

export default function FaultyTerminalBackground({
  scale = 1.5,
  gridMul = [2, 1],
  digitSize = 1.2,
  timeScale = 0.5,
  pause = false,
  scanlineIntensity = 0.5,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  chromaticAberration = 0,
  dither = 0,
  curvature = 0.1,
  tint = '#0066ff',
  bgColor = '#ffffff',
  mouseReact = true,
  mouseStrength = 0.5,
  pageLoadAnimation = true,
  brightness = 0.6,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(canvas);

    const gl =
      canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      }) ||
      canvas.getContext('experimental-webgl', {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });

    if (!gl) return;

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 1);

    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = linkProgram(gl, vs, fs);
    if (!program) return;

    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, 'position');
    const uvLoc = gl.getAttribLocation(program, 'uv');
    const uTimeLoc = gl.getUniformLocation(program, 'iTime');
    const uResLoc = gl.getUniformLocation(program, 'iResolution');
    const uScaleLoc = gl.getUniformLocation(program, 'uScale');
    const uGridMulLoc = gl.getUniformLocation(program, 'uGridMul');
    const uDigitSizeLoc = gl.getUniformLocation(program, 'uDigitSize');
    const uScanlineIntensityLoc = gl.getUniformLocation(program, 'uScanlineIntensity');
    const uGlitchAmountLoc = gl.getUniformLocation(program, 'uGlitchAmount');
    const uFlickerAmountLoc = gl.getUniformLocation(program, 'uFlickerAmount');
    const uNoiseAmpLoc = gl.getUniformLocation(program, 'uNoiseAmp');
    const uChromaticAberrationLoc = gl.getUniformLocation(program, 'uChromaticAberration');
    const uDitherLoc = gl.getUniformLocation(program, 'uDither');
    const uCurvatureLoc = gl.getUniformLocation(program, 'uCurvature');
    const uTintLoc = gl.getUniformLocation(program, 'uTint');
    const uBgColorLoc = gl.getUniformLocation(program, 'uBgColor');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uMouseStrengthLoc = gl.getUniformLocation(program, 'uMouseStrength');
    const uUseMouseLoc = gl.getUniformLocation(program, 'uUseMouse');
    const uPageLoadProgressLoc = gl.getUniformLocation(program, 'uPageLoadProgress');
    const uUsePageLoadAnimationLoc = gl.getUniformLocation(program, 'uUsePageLoadAnimation');
    const uBrightnessLoc = gl.getUniformLocation(program, 'uBrightness');

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 2, 0, 0, 2]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const tintVec = hexToRgb(tint);
    const bgVec = hexToRgb(bgColor);
    gl.uniform1f(uScaleLoc, scale);
    gl.uniform2fv(uGridMulLoc, new Float32Array(gridMul));
    gl.uniform1f(uDigitSizeLoc, digitSize);
    gl.uniform1f(uScanlineIntensityLoc, scanlineIntensity);
    gl.uniform1f(uGlitchAmountLoc, glitchAmount);
    gl.uniform1f(uFlickerAmountLoc, flickerAmount);
    gl.uniform1f(uNoiseAmpLoc, noiseAmp);
    gl.uniform1f(uChromaticAberrationLoc, chromaticAberration);
    gl.uniform1f(uDitherLoc, dither);
    gl.uniform1f(uCurvatureLoc, curvature);
    gl.uniform3fv(uTintLoc, new Float32Array(tintVec));
    gl.uniform3fv(uBgColorLoc, new Float32Array(bgVec));
    gl.uniform1f(uMouseStrengthLoc, mouseStrength);
    gl.uniform1f(uUseMouseLoc, mouseReact ? 1 : 0);
    gl.uniform1f(uUsePageLoadAnimationLoc, pageLoadAnimation ? 1 : 0);
    gl.uniform1f(uPageLoadProgressLoc, pageLoadAnimation ? 0 : 1);
    gl.uniform1f(uBrightnessLoc, brightness);

    const mouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const onMouse = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouse.x = x;
      mouse.y = y;
    };

    let loadStart = 0;
    const timeOffset = Math.random() * 100;
    let frozenTime = 0;
    let raf = 0;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform3fv(uResLoc, new Float32Array([w, h, w / h]));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener('resize', resize, false);
    resize();

    if (mouseReact) {
      window.addEventListener('mousemove', onMouse);
    }

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (pageLoadAnimation && loadStart === 0) loadStart = t;

      if (!pause) {
        const elapsed = (t * 1e-3 + timeOffset) * timeScale;
        gl.uniform1f(uTimeLoc, elapsed);
        frozenTime = elapsed;
      } else {
        gl.uniform1f(uTimeLoc, frozenTime);
      }

      if (pageLoadAnimation && loadStart > 0) {
        const duration = 2000;
        const p = Math.min((t - loadStart) / duration, 1);
        gl.uniform1f(uPageLoadProgressLoc, p);
      }

      if (mouseReact) {
        const damping = 0.08;
        smoothMouse.x += (mouse.x - smoothMouse.x) * damping;
        smoothMouse.y += (mouse.y - smoothMouse.y) * damping;
        gl.uniform2fv(uMouseLoc, new Float32Array([smoothMouse.x, smoothMouse.y]));
      } else {
        gl.uniform2fv(uMouseLoc, new Float32Array([smoothMouse.x, smoothMouse.y]));
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      if (mouseReact) window.removeEventListener('mousemove', onMouse);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      try {
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      } catch (err) {}
      container.innerHTML = '';
    };
  }, [
    scale,
    gridMul,
    digitSize,
    timeScale,
    pause,
    scanlineIntensity,
    glitchAmount,
    flickerAmount,
    noiseAmp,
    chromaticAberration,
    dither,
    curvature,
    tint,
    bgColor,
    mouseReact,
    mouseStrength,
    pageLoadAnimation,
    brightness,
  ]);

  return (
    <div
      ref={containerRef}
      className={`faulty-terminal-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}
