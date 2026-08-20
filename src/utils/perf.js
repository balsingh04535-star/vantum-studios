/**
 * perf.js — Device tier detection utility
 * Detects low/mid/high performance tier based on hardware concurrency,
 * device memory, and pixel ratio. All animation components import from here
 * to self-tune without removing any visual effects.
 */

/**
 * Returns 'low', 'mid', or 'high' device tier.
 * Cached after first call.
 */
let _cachedTier = null;

export function getDeviceTier() {
  if (_cachedTier) return _cachedTier;

  // Server-side rendering guard
  if (typeof window === 'undefined') return 'high';

  const cores = navigator.hardwareConcurrency || 4;
  // deviceMemory is in GB, not available in all browsers (Safari lacks it)
  const mem = navigator.deviceMemory || 4;
  const dpr = window.devicePixelRatio || 1;

  // Heuristic: low = 1-2 cores OR <2 GB RAM, mid = 3-4 cores, high = 5+
  if (cores <= 2 || mem < 2) {
    _cachedTier = 'low';
  } else if (cores <= 4 && mem <= 4) {
    _cachedTier = 'mid';
  } else {
    _cachedTier = 'high';
  }

  // Bonus bump down for very high DPR on weak hardware (e.g. old Retina)
  if (_cachedTier === 'mid' && dpr >= 3) {
    _cachedTier = 'low';
  }

  return _cachedTier;
}

/**
 * Returns the maximum device pixel ratio to use for WebGL/canvas renderers.
 * - low:  1.0  (halves fragment shader work on Retina screens)
 * - mid:  1.5
 * - high: 2.0
 */
export function getMaxDPR() {
  const tier = getDeviceTier();
  if (tier === 'low') return 1.0;
  if (tier === 'mid') return 1.5;
  return 2.0;
}

/**
 * Returns the recommended number of FBM octaves for noise shaders.
 * - low:  3
 * - mid:  4
 * - high: 5
 */
export function getFBMOctaves() {
  const tier = getDeviceTier();
  if (tier === 'low') return 3;
  if (tier === 'mid') return 4;
  return 5;
}

/**
 * Returns the recommended globe map sample count.
 * - low:  12000
 * - mid:  32000
 * - high: 65000
 */
export function getGlobeMapSamples() {
  const tier = getDeviceTier();
  if (tier === 'low') return 12000;
  if (tier === 'mid') return 32000;
  return 65000;
}

/**
 * Returns the recommended Lenis scroll duration multiplier.
 * - low:  0.7  (shorter easing = less interpolation per frame)
 * - mid:  0.85
 * - high: 1.0
 */
export function getLenisDurationMultiplier() {
  const tier = getDeviceTier();
  if (tier === 'low') return 0.7;
  if (tier === 'mid') return 0.85;
  return 1.0;
}

/**
 * Returns whether the user prefers reduced motion.
 */
export function reducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
