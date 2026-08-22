import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Helper to create a 2D rounded rectangle shape with exact circular corner arcs
function createRoundedRectShape(width, height, radius) {
  const shape = new THREE.Shape();
  const w = width;
  const h = height;
  const r = Math.min(radius, w / 2 - 0.01, h / 2 - 0.01);
  const x = -w / 2;
  const y = -h / 2;

  shape.moveTo(x + r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.absarc(x + r, y + r, r, Math.PI, (Math.PI * 3) / 2, false);
  shape.closePath();

  return shape;
}

// Helper to create HDMI trapezoidal 2D shape
function createHDMIShape() {
  const shape = new THREE.Shape();
  const topW = 0.42;
  const botW = 0.30;
  const h = 0.18;
  const topX = topW / 2;
  const botX = botW / 2;
  const topY = h / 2;
  const botY = -h / 2;

  shape.moveTo(-topX, topY);
  shape.lineTo(topX, topY);
  shape.lineTo(topX, 0.01);
  shape.lineTo(botX, botY);
  shape.lineTo(-botX, botY);
  shape.lineTo(-topX, 0.01);
  shape.closePath();

  return shape;
}

function createMaterials() {
  return {
    // Ice-blue anodized aluminum (matching reference image)
    aluminumBody: new THREE.MeshStandardMaterial({
      color: '#a2b9de',
      metalness: 0.88,
      roughness: 0.28,
    }),
    aluminumTop: new THREE.MeshStandardMaterial({
      color: '#b0c6e8',
      metalness: 0.84,
      roughness: 0.22,
    }),
    aluminumBevel: new THREE.MeshStandardMaterial({
      color: '#c2d4f2',
      metalness: 0.92,
      roughness: 0.18,
    }),
    darkCavity: new THREE.MeshStandardMaterial({
      color: '#0a0a0d',
      metalness: 0.50,
      roughness: 0.60,
    }),
    darkMetalFrame: new THREE.MeshStandardMaterial({
      color: '#181b22',
      metalness: 0.85,
      roughness: 0.35,
    }),
    goldPin: new THREE.MeshStandardMaterial({
      color: '#d4af37',
      metalness: 0.95,
      roughness: 0.15,
    }),
    silverMetal: new THREE.MeshStandardMaterial({
      color: '#9aa0ac',
      metalness: 0.90,
      roughness: 0.24,
    }),
    buttonFace: new THREE.MeshStandardMaterial({
      color: '#8da6ce',
      metalness: 0.86,
      roughness: 0.28,
    }),
    rubberMatte: new THREE.MeshStandardMaterial({
      color: '#121316',
      metalness: 0.10,
      roughness: 0.92,
    }),
    bottomBaseMetal: new THREE.MeshStandardMaterial({
      color: '#1e2128',
      metalness: 0.80,
      roughness: 0.40,
    }),
  };
}

function buildMainChassis(materials) {
  const group = new THREE.Group();
  const bodyShape = createRoundedRectShape(4.0, 4.0, 0.68);

  const extrudeSettings = {
    depth: 0.92,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: 0.14,
    bevelThickness: 0.14,
    curveSegments: 32,
  };

  const geometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materials.aluminumBody);
  mesh.rotation.x = -Math.PI / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  group.add(mesh);
  return group;
}

function buildTopPanel(materials) {
  const group = new THREE.Group();
  group.position.set(0, 0.54, 0);

  const topShape = createRoundedRectShape(3.92, 3.92, 0.64);
  const extrudeSettings = {
    depth: 0.03,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
    curveSegments: 24,
  };

  const geometry = new THREE.ExtrudeGeometry(topShape, extrudeSettings);
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materials.aluminumTop);
  mesh.rotation.x = -Math.PI / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  // Chanan Logo on top of machine
  const logoAnchor = new THREE.Group();
  logoAnchor.name = 'chanan-logo-anchor';

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/chanan_logo_black.png', (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    const logoSize = 2.8;
    const logoGeo = new THREE.PlaneGeometry(logoSize, logoSize);
    const logoMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
    });

    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.rotation.x = -Math.PI / 2;
    logoMesh.position.y = 0.048;
    logoAnchor.add(logoMesh);
  });

  group.add(logoAnchor);

  return group;
}

function buildUSBCPort(materials, position) {
  const group = new THREE.Group();
  group.position.copy(position);

  const frameGeo = new THREE.BoxGeometry(0.12, 0.28, 0.03);
  const frameMesh = new THREE.Mesh(frameGeo, materials.silverMetal);
  frameMesh.position.z = 0.01;
  group.add(frameMesh);

  const cavityGeo = new THREE.BoxGeometry(0.09, 0.24, 0.05);
  const cavityMesh = new THREE.Mesh(cavityGeo, materials.darkCavity);
  cavityMesh.position.z = 0.02;
  group.add(cavityMesh);

  const tongueGeo = new THREE.BoxGeometry(0.045, 0.02, 0.04);
  const tongueMesh = new THREE.Mesh(tongueGeo, materials.rubberMatte);
  tongueMesh.position.z = 0.025;
  group.add(tongueMesh);

  const pinGeo = new THREE.BoxGeometry(0.035, 0.015, 0.01);
  const pinMesh = new THREE.Mesh(pinGeo, materials.goldPin);
  pinMesh.position.z = 0.03;
  group.add(pinMesh);

  return group;
}

function buildHDMIPort(materials, position) {
  const group = new THREE.Group();
  group.position.copy(position);

  const frameGeo = new THREE.BoxGeometry(0.48, 0.24, 0.03);
  const frameMesh = new THREE.Mesh(frameGeo, materials.silverMetal);
  frameMesh.position.z = 0.01;
  group.add(frameMesh);

  const hdmiShape = createHDMIShape();
  const extrudeSettings = { depth: 0.04, bevelEnabled: false };
  const cavityGeo = new THREE.ExtrudeGeometry(hdmiShape, extrudeSettings);
  cavityGeo.center();
  const cavityMesh = new THREE.Mesh(cavityGeo, materials.darkCavity);
  cavityMesh.position.z = 0.02;
  group.add(cavityMesh);

  const pinGeo = new THREE.BoxGeometry(0.22, 0.012, 0.025);
  const pinMesh = new THREE.Mesh(pinGeo, materials.goldPin);
  pinMesh.position.set(0, -0.015, 0.028);
  group.add(pinMesh);

  return group;
}

function buildEthernetPort(materials, position) {
  const group = new THREE.Group();
  group.position.copy(position);

  const frameGeo = new THREE.BoxGeometry(0.38, 0.30, 0.03);
  const frameMesh = new THREE.Mesh(frameGeo, materials.silverMetal);
  frameMesh.position.z = 0.01;
  group.add(frameMesh);

  const cavityGeo = new THREE.BoxGeometry(0.32, 0.24, 0.05);
  const cavityMesh = new THREE.Mesh(cavityGeo, materials.darkCavity);
  cavityMesh.position.z = 0.02;
  group.add(cavityMesh);

  const notchGeo = new THREE.BoxGeometry(0.14, 0.05, 0.05);
  const notchMesh = new THREE.Mesh(notchGeo, materials.darkCavity);
  notchMesh.position.set(0, 0.09, 0.022);
  group.add(notchMesh);

  const pinsGroup = new THREE.Group();
  pinsGroup.position.set(0, 0.05, 0.022);
  pinsGroup.rotation.x = 0.35;
  for (let i = 0; i < 8; i++) {
    const pinGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.035, 8);
    const pinMesh = new THREE.Mesh(pinGeo, materials.goldPin);
    pinMesh.position.x = (i - 3.5) * 0.030;
    pinsGroup.add(pinMesh);
  }
  group.add(pinsGroup);

  return group;
}

function buildPowerInlet(materials, position) {
  const group = new THREE.Group();
  group.position.copy(position);

  const housingGeo = new THREE.BoxGeometry(0.42, 0.22, 0.03);
  const housingMesh = new THREE.Mesh(housingGeo, materials.rubberMatte);
  housingMesh.position.z = 0.01;
  group.add(housingMesh);

  const socket1Geo = new THREE.CylinderGeometry(0.065, 0.065, 0.05, 24);
  const socket1Mesh = new THREE.Mesh(socket1Geo, materials.darkCavity);
  socket1Mesh.rotation.x = Math.PI / 2;
  socket1Mesh.position.set(-0.085, 0, 0.018);
  group.add(socket1Mesh);

  const socket2Mesh = socket1Mesh.clone();
  socket2Mesh.position.set(0.085, 0, 0.018);
  group.add(socket2Mesh);

  const pinGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.04, 16);
  const pin1Mesh = new THREE.Mesh(pinGeo, materials.silverMetal);
  pin1Mesh.rotation.x = Math.PI / 2;
  pin1Mesh.position.set(-0.085, 0, 0.025);
  group.add(pin1Mesh);

  const pin2Mesh = pin1Mesh.clone();
  pin2Mesh.position.set(0.085, 0, 0.025);
  group.add(pin2Mesh);

  return group;
}

function buildStatusLED(materials, position) {
  const group = new THREE.Group();
  group.position.copy(position);

  const bezelGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.02, 24);
  const bezelMesh = new THREE.Mesh(bezelGeo, materials.darkMetalFrame);
  bezelMesh.rotation.x = Math.PI / 2;
  bezelMesh.position.z = 0.01;
  group.add(bezelMesh);

  const lensGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.015, 24);
  const lensMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ffffff',
    emissiveIntensity: 2.2,
    roughness: 0.1,
  });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.rotation.x = Math.PI / 2;
  lensMesh.position.z = 0.018;
  group.add(lensMesh);

  const ledLight = new THREE.PointLight('#ffffff', 0.45, 0.6);
  ledLight.position.set(0, 0, 0.04);
  group.add(ledLight);

  return group;
}

function buildPowerButton(materials, position) {
  const group = new THREE.Group();
  group.position.copy(position);

  const seamGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.03, 32);
  const seamMesh = new THREE.Mesh(seamGeo, materials.darkCavity);
  seamMesh.rotation.x = Math.PI / 2;
  seamMesh.position.z = 0.005;
  group.add(seamMesh);

  const rimGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.04, 32);
  const rimMesh = new THREE.Mesh(rimGeo, materials.silverMetal);
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.position.z = 0.01;
  group.add(rimMesh);

  const buttonGeo = new THREE.CylinderGeometry(0.115, 0.115, 0.05, 32);
  const buttonMesh = new THREE.Mesh(buttonGeo, materials.buttonFace);
  buttonMesh.rotation.x = Math.PI / 2;
  buttonMesh.position.z = 0.015;
  group.add(buttonMesh);

  return group;
}

function buildFrontPanelPorts(materials) {
  const group = new THREE.Group();

  const housingGeo = new THREE.BoxGeometry(2.80, 0.42, 0.05);
  const housingMesh = new THREE.Mesh(housingGeo, materials.darkMetalFrame);
  housingMesh.position.set(0, 0, 2.14);
  group.add(housingMesh);

  const borderGeo = new THREE.BoxGeometry(2.84, 0.46, 0.02);
  const borderMesh = new THREE.Mesh(borderGeo, materials.aluminumBevel);
  borderMesh.position.set(0, 0, 2.12);
  group.add(borderMesh);

  const portZ = 2.16;
  const posY = 0;

  group.add(buildUSBCPort(materials, new THREE.Vector3(-1.10, posY, portZ)));
  group.add(buildUSBCPort(materials, new THREE.Vector3(-0.80, posY, portZ)));
  group.add(buildHDMIPort(materials, new THREE.Vector3(-0.30, posY, portZ)));
  group.add(buildEthernetPort(materials, new THREE.Vector3(0.22, posY, portZ)));
  group.add(buildPowerInlet(materials, new THREE.Vector3(0.68, posY, portZ)));
  group.add(buildStatusLED(materials, new THREE.Vector3(0.98, posY, portZ)));
  group.add(buildPowerButton(materials, new THREE.Vector3(1.20, posY, portZ)));

  return group;
}

// Circular ribbed ventilation pedestal base underneath chassis (matching reference image)
function buildBottomDetails(materials) {
  const group = new THREE.Group();
  group.position.set(0, -0.54, 0);

  // Circular ventilation base
  const baseCylinderGeo = new THREE.CylinderGeometry(1.65, 1.75, 0.22, 48);
  const baseCylinderMesh = new THREE.Mesh(baseCylinderGeo, materials.darkCavity);
  baseCylinderMesh.position.y = -0.11;
  baseCylinderMesh.castShadow = true;
  baseCylinderMesh.receiveShadow = true;
  group.add(baseCylinderMesh);

  // Radial ventilation fins / slats
  const finCount = 36;
  const finGeo = new THREE.BoxGeometry(0.04, 0.18, 0.16);
  for (let i = 0; i < finCount; i++) {
    const angle = (i / finCount) * Math.PI * 2;
    const finMesh = new THREE.Mesh(finGeo, materials.bottomBaseMetal);
    const radius = 1.70;
    finMesh.position.set(Math.cos(angle) * radius, -0.11, Math.sin(angle) * radius);
    finMesh.rotation.y = -angle;
    group.add(finMesh);
  }

  // Soft rubber foot disc ring
  const footRingGeo = new THREE.CylinderGeometry(1.50, 1.50, 0.04, 36);
  const footRingMesh = new THREE.Mesh(footRingGeo, materials.rubberMatte);
  footRingMesh.position.y = -0.23;
  group.add(footRingMesh);

  return group;
}

function setupStudioLighting(scene) {
  // Key warm white overhead light (creating the highlight on top of the machine)
  const keyLight = new THREE.DirectionalLight('#ffffff', 2.2);
  keyLight.position.set(-3, 6, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.bias = -0.0001;
  scene.add(keyLight);

  // Soft ambient environmental light
  const ambientLight = new THREE.AmbientLight('#edf3ff', 1.2);
  scene.add(ambientLight);

  // Hemisphere lighting for top vs bottom subtle gradients
  const hemisphereLight = new THREE.HemisphereLight('#f5f8ff', '#30394a', 0.85);
  scene.add(hemisphereLight);

  // Fill light on the right/front
  const fillLight = new THREE.DirectionalLight('#e8f0fe', 1.2);
  fillLight.position.set(5, 3, 4);
  scene.add(fillLight);

  // Rim light on the back left
  const rimLight = new THREE.DirectionalLight('#d0e2ff', 1.6);
  rimLight.position.set(-4, 4, -5);
  scene.add(rimLight);
}

export default function ChananOneStudio3D({
  className = '',
  interactive = true,
}) {
  const mountRef = useRef(null);

  // Helper to dynamically calculate camera distance so model is never cropped on any aspect ratio
  const computeOrbitRadius = (w, h) => {
    const aspect = (w && h) ? (w / h) : 1.35;
    const baseRadius = 9.6;
    if (aspect < 1.4) {
      return baseRadius * (1.4 / Math.max(0.45, aspect));
    }
    return baseRadius;
  };

  // Camera orbit matching the exact bold isometric front-top perspective with safe padding
  const targetOrbit = useRef({ radius: 9.6, phi: Math.PI / 3.15, theta: 0.52 });
  const currentOrbit = useRef({ radius: 9.6, phi: Math.PI / 3.15, theta: 0.52 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const idleTimer = useRef(null);
  const autoRotate = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 650;

    const initialRadius = computeOrbitRadius(width, height);
    targetOrbit.current.radius = initialRadius;
    currentOrbit.current.radius = initialRadius;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene);

    const materials = createMaterials();
    const computerCase = new THREE.Group();
    computerCase.add(buildMainChassis(materials));
    computerCase.add(buildTopPanel(materials));
    computerCase.add(buildFrontPanelPorts(materials));
    computerCase.add(buildBottomDetails(materials));
    scene.add(computerCase);

    const handleMouseDown = (e) => {
      if (!interactive) return;
      isDragging.current = true;
      autoRotate.current = false;
      previousMouse.current = { x: e.clientX, y: e.clientY };
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current || !interactive) return;
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      previousMouse.current = { x: e.clientX, y: e.clientY };

      targetOrbit.current.theta -= deltaX * 0.007;
      targetOrbit.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2 - 0.02, targetOrbit.current.phi - deltaY * 0.007)
      );
    };

    const handleMouseUp = () => {
      if (!interactive) return;
      isDragging.current = false;
      idleTimer.current = setTimeout(() => {
        autoRotate.current = false;
      }, 4000);
    };

    const handleTouchStart = (e) => {
      if (!interactive || e.touches.length !== 1) return;
      isDragging.current = true;
      autoRotate.current = false;
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current || !interactive || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouse.current.x;
      const deltaY = e.touches[0].clientY - previousMouse.current.y;
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      targetOrbit.current.theta -= deltaX * 0.007;
      targetOrbit.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2 - 0.02, targetOrbit.current.phi - deltaY * 0.007)
      );
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 650;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const newRadius = computeOrbitRadius(w, h);
      targetOrbit.current.radius = newRadius;
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate.current) {
        targetOrbit.current.theta += 0.002;
      }

      currentOrbit.current.radius += (targetOrbit.current.radius - currentOrbit.current.radius) * 0.08;
      currentOrbit.current.phi += (targetOrbit.current.phi - currentOrbit.current.phi) * 0.08;
      currentOrbit.current.theta += (targetOrbit.current.theta - currentOrbit.current.theta) * 0.08;

      const r = currentOrbit.current.radius;
      const p = currentOrbit.current.phi;
      const t = currentOrbit.current.theta;

      camera.position.x = r * Math.sin(p) * Math.sin(t);
      camera.position.y = r * Math.cos(p);
      camera.position.z = r * Math.sin(p) * Math.cos(t);
      camera.lookAt(0, 0, 0);

      try {
        renderer.render(scene, camera);
      } catch (err) {
        console.error('Render frame error:', err);
      }
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      className={`w-full h-full relative overflow-visible select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ minHeight: '100%' }}
    >
      <div ref={mountRef} className="w-full h-full" style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
