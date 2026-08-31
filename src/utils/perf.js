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
 * Total backing-store pixels a full-bleed background effect may use.
 *
 * getMaxDPR alone isn't enough: it scales a canvas relative to its CSS size,
 * so an element sized to a tall section rather than the viewport still ends
 * up enormous. The light-ray background sits in a 7000px-tall section, which
 * at DPR 2 is a 23 megapixel buffer — roughly 88MB of GPU memory for one soft
 * gradient. This caps the buffer regardless of how tall the element is.
 */
export function getPixelBudget() {
  const tier = getDeviceTier();
  if (tier === 'low') return 1.2e6;
  if (tier === 'mid') return 2.2e6;
  return 4.0e6;
}

/**
 * Pixel ratio to render a w x h CSS-pixel surface at: the device ratio,
 * clamped by tier, then reduced further if the surface would blow the
 * budget. Low-frequency effects (gradients, rays, glows) survive being
 * rendered below 1x and scaled back up — the GPU's own filtering hides it.
 */
export function getBudgetedDPR(cssWidth, cssHeight) {
  const cap = Math.min(
    (typeof window !== 'undefined' && window.devicePixelRatio) || 1,
    getMaxDPR()
  );
  const area = cssWidth * cssHeight;
  if (!area || area <= 0) return cap;
  const fit = Math.sqrt(getPixelBudget() / area);
  // Never go below 0.4x — past that even a soft gradient starts to band.
  return Math.max(0.4, Math.min(cap, fit));
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
 * Returns whether the user prefers reduced motion.
 */
export function reducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
