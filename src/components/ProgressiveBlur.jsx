import React from 'react';

/**
 * ProgressiveBlur — a gradient blur ramp pinned to the bottom of the viewport.
 *
 * A single blurred overlay reads as a hard band. Instead this stacks ten
 * panels, each doubling the blur radius of the one below it and each masked
 * to an overlapping slice of the band. Where the slices overlap the eye reads
 * a continuous ramp: content is sharp entering the band and fully soft at the
 * bottom edge.
 *
 * Purely decorative — pointer-events are off so it never eats clicks, and it
 * sits under the navigation (z-index 100) so fixed chrome stays crisp.
 */
export default function ProgressiveBlur({ height, zIndex }) {
  const style = {};
  if (height) style.height = height;
  if (zIndex !== undefined) style.zIndex = zIndex;

  return (
    <div className="pblur" style={style} aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="pblur-panel" />
      ))}
    </div>
  );
}
