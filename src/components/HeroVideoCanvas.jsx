import React, { useEffect, useRef } from 'react';

const FRAME_COUNT = 121;

export default function HeroVideoCanvas({
  scrollProgress,
  folder = 'sequence',
  width = 1280,
  height = 720
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  const getFrameSrc = (i) =>
    `/${folder}/frame_${String(i + 1).padStart(4, '0')}.webp`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const images = [];
    imagesRef.current = images;

    const drawFrame = (index) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Draw first frame as soon as it loads
    const first = new Image();
    first.src = getFrameSrc(0);
    first.onload = () => drawFrame(0);
    images[0] = first;

    // Preload the rest
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      images[i] = img;
    }
  }, [folder, width, height]);

  // Sync frame to scrollProgress (0-1) from parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(scrollProgress * (FRAME_COUNT - 1)))
    );
    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  );
}
