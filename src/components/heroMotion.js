export const INTRO_DURATION = 3.25;
export const GALLERY_START = 0.65;
export const CYCLE_DURATION = 1.95;
export const CARDS_PER_SIDE = 12;
export const CARD_INTERVAL = 0.9;
export const CARD_DURATION = 9.6;

export const HERO_SCENES = [
  { word: 'brands', prompt: 'Build a brand with a world of its own.' },
  { word: 'websites', prompt: 'Turn your website into an experience.' },
  { word: 'products', prompt: 'Bring your next product to life in 3D.' },
  { word: 'campaigns', prompt: 'Make your next launch impossible to miss.' },
  { word: 'ideas', prompt: 'Let’s make the thing you can’t stop imagining.' },
];

// 24 images for 24 cards, so no card repeats. Each side of the tunnel takes
// every other image (left: even, right: odd), so new product screens and
// studio work alternate in pairs to keep both sides mixed.
export const HERO_IMAGES = [
  '/hero-gallery/noorakar-aangan-tiles.jpg', '/hero-gallery/chanan-study-001.png',
  '/hero-gallery/chanan-study-002.png', '/hero-gallery/noorakar-roop-qubit.jpg',
  '/hero-gallery/noorakar-aangan-safar.jpg', '/work/codevantum.jpg',
  '/hero-gallery/08.jpg', '/hero-gallery/noorakar-aangan-bolo.jpg',
  '/hero-gallery/noorakar-cowork-thinking.jpg', '/hero-gallery/chanan-study-003.png',
  '/work/tee-bloc.jpg', '/hero-gallery/noorakar-aangan-board.jpg',
  '/hero-gallery/noorakar-voice.jpg', '/work/codevantum-2.jpg',
  '/hero-gallery/chanan-study-004.png', '/hero-gallery/noorakar-aangan-wallet.jpg',
  '/hero-gallery/noorakar-cowork-tiles.jpg', '/hero-gallery/10.jpg',
  '/hero-gallery/12.jpg', '/hero-gallery/noorakar-aangan-4x.jpg',
  '/hero-gallery/noorakar-aangan-health.jpg', '/work/codevantum-3.jpg',
  '/hero-gallery/14.jpg', '/hero-gallery/noorakar-roop-models.jpg',
];

export const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const easeOut = (n) => 1 - Math.pow(1 - clamp(n), 4);
export const smooth = (n) => { const t = clamp(n); return t * t * (3 - 2 * t); };
export const wrap = (n, length) => ((n % length) + length) % length;
export const easeInOut = (n) => {
  const t = clamp(n);
  return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
};
const easeOutExpo = (n) => n >= 1 ? 1 : n <= 0 ? 0 : 1 - 2 ** (-10 * n);

// The ribbon starts immediately; asset readiness determines when the images
// bloom. Their outward flow has its own clock, independent of word changes.
export function getHeroFrame(elapsed, galleryStart = GALLERY_START) {
  const galleryTime = Math.max(0, elapsed - galleryStart);
  const textTime = Math.max(0, galleryTime - 1.7);
  const cycle = Math.floor(textTime / CYCLE_DURATION);
  const phase = textTime % CYCLE_DURATION;
  const transition = clamp((phase - 1.3) / 0.65);
  const fromScene = cycle % HERO_SCENES.length;
  const toScene = (cycle + 1) % HERO_SCENES.length;
  return {
    scene: transition < 0.5 ? fromScene : toScene,
    fromScene,
    toScene,
    transition,
    distortion: Math.sin(transition * Math.PI),
    progress: phase / CYCLE_DURATION,
    galleryTime,
    reveal: easeInOut(galleryTime / 1.75),
    galleryScale: 1.2 - 0.7 * easeInOut(galleryTime / 1.5),
    cylinder: 1 - 0.3 * (1 - (1 - clamp(galleryTime / 2)) ** 5),
    ribbonScale: 0.45 * easeOut((elapsed - 0.3) / 3),
    headingReveal: easeOutExpo((galleryTime - 1) / 1.5),
    contentReveal: easeOutExpo((galleryTime - 1.2) / 1.5),
  };
}

export function getGalleryGeometry(width, height = 800) {
  const desktop = width >= 1024;
  return {
    width,
    height,
    cardSize: width * (desktop ? 0.75 : 1.2),
    target: width * 1.65,
    scaleStart: desktop ? 0.2 : 0.3,
  };
}

// Pairs start 900ms apart, grow for 9.6 seconds and recycle only offscreen.
// Pre-seeding the pool makes the first reveal a complete ribbon of images.
export function createCardPool() {
  let births;
  let nextIndex;
  let nextFire;
  let previousTime;
  const reset = () => {
    births = Array.from({ length: CARDS_PER_SIDE }, (_, i) =>
      i * CARD_INTERVAL < CARD_DURATION ? -i * CARD_INTERVAL : -Infinity
    );
    nextIndex = 0;
    nextFire = CARD_INTERVAL;
    previousTime = 0;
  };
  reset();
  return (time) => {
    if (time < previousTime) reset();
    while (nextFire <= time) {
      for (let offset = 0; offset < CARDS_PER_SIDE; offset++) {
        const index = (nextIndex + offset) % CARDS_PER_SIDE;
        if (nextFire - births[index] >= CARD_DURATION) {
          births[index] = nextFire;
          nextIndex = (index + 1) % CARDS_PER_SIDE;
          break;
        }
      }
      nextFire += CARD_INTERVAL;
    }
    previousTime = time;
    return births.map((birth) => (time - birth) / CARD_DURATION);
  };
}

export function getCardFrame(index, side, age, geometry, frame) {
  const visible = age >= 0 && age < 1;
  const p = visible ? age * frame.reveal : 0;
  const smoothed = smooth(p);
  const travel = (smoothed * smoothed + smoothed) / 2;
  const growth = 0.125 * smooth(p / 0.15)
    + 0.875 * smooth((p - geometry.scaleStart) / (1 - geometry.scaleStart));
  return {
    x: side * geometry.target * travel * frame.galleryScale,
    size: geometry.cardSize * growth * frame.galleryScale,
    visible: visible && growth > 0,
    order: travel + growth,
    imageIndex: wrap(index * 2 + (side === 1 ? 1 : 0), HERO_IMAGES.length),
  };
}
