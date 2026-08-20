import React, { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { getMaxDPR, getGlobeMapSamples } from "../utils/perf";

// Static Single Client Marker & Arc matching target mockup 1:1
const GLOBE_MARKERS = [
  { id: "primary-pin", location: [-24.0, 132.0], label: "Primary Target" },
];

const GLOBE_ARCS = [
  { id: "primary-arc", from: [48.0, -20.0], to: [-24.0, 132.0] },
];

function ClientGlobeComponent({
  className = "",
  markerColor = [0.78, 0.88, 0.0], // Vibrant lime volt green accent
  baseColor = [0.45, 0.48, 0.52], // Brighter crisp silver-gray landmass shading
  arcColor = [0.78, 0.88, 0.0], // Single bright volt arc line
  glowColor = [0.15, 0.18, 0.22], // Brighter atmospheric glow
  dark = 1,
  mapBrightness = 6.0,
  markerSize = 0.05,
  markerElevation = 0.02,
  arcWidth = 0.65,
  arcHeight = 0.38,
  speed = 0.003,
  theta = 0.15,
  diffuse = 1.8,
  mapSamples = 65000,
}) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const lastPointer = useRef(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x;
      const deltaY = e.clientY - pointerInteracting.current.y;
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };
      const now = Date.now();
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1);
        const maxVelocity = 0.15;
        velocity.current = {
          phi: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((e.clientX - lastPointer.current.x) / dt) * 0.3)
          ),
          theta: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((e.clientY - lastPointer.current.y) / dt) * 0.08)
          ),
        };
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe = null;
    let animationId;
    let phi = 0;

    function init() {
      if (window.innerWidth < 768) return;
      const width = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 600;
      if (globe) return;

      const dpr = Math.min(window.devicePixelRatio || 1, getMaxDPR());
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples: getGlobeMapSamples(),
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: GLOBE_MARKERS.map((m) => ({
          location: m.location,
          size: markerSize,
          id: m.id,
        })),
        arcs: GLOBE_ARCS.map((a) => ({
          from: a.from,
          to: a.to,
          id: a.id,
        })),
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) {
          phi += speed;
          if (
            Math.abs(velocity.current.phi) > 0.0001 ||
            Math.abs(velocity.current.theta) > 0.0001
          ) {
            phiOffsetRef.current += velocity.current.phi;
            thetaOffsetRef.current += velocity.current.theta;
            velocity.current.phi *= 0.95;
            velocity.current.theta *= 0.95;
          }
          const thetaMin = -0.4,
            thetaMax = 0.4;
          if (thetaOffsetRef.current < thetaMin) {
            thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1;
          } else if (thetaOffsetRef.current > thetaMax) {
            thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1;
          }
        }
        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
          dark,
          mapBrightness,
          markerColor,
          baseColor,
          arcColor,
          markerElevation,
          markers: GLOBE_MARKERS.map((m) => ({
            location: m.location,
            size: markerSize,
            id: m.id,
          })),
          arcs: GLOBE_ARCS.map((a) => ({
            from: a.from,
            to: a.to,
            id: a.id,
          })),
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      if (canvas) canvas.style.opacity = "1";
    }

    init();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markerColor, baseColor, arcColor, glowColor, dark, mapBrightness, markerSize, markerElevation, arcWidth, arcHeight, speed, theta, diffuse, mapSamples]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", userSelect: "none" }}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
    </div>
  );
}

const ClientGlobe = React.memo(ClientGlobeComponent);
export default ClientGlobe;
