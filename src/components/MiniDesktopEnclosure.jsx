import React, { useEffect, useRef, useState } from 'react';
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
    aluminumSide: new THREE.MeshStandardMaterial({
      color: '#8ba4d0',
      metalness: 0.85,
      roughness: 0.35,
    }),
    aluminumTop: new THREE.MeshStandardMaterial({
      color: '#9bb3df',
      metalness: 0.82,
      roughness: 0.28,
    }),
    aluminumBevel: new THREE.MeshStandardMaterial({
      color: '#b0c5eb',
      metalness: 0.88,
      roughness: 0.20,
    }),
    darkCavity: new THREE.MeshStandardMaterial({
      color: '#08090c',
      metalness: 0.60,
      roughness: 0.50,
    }),
    darkMetalFrame: new THREE.MeshStandardMaterial({
      color: '#151820',
      metalness: 0.85,
      roughness: 0.30,
    }),
    goldPin: new THREE.MeshStandardMaterial({
      color: '#d4af37',
      metalness: 0.95,
      roughness: 0.15,
    }),
    silverMetal: new THREE.MeshStandardMaterial({
      color: '#a0a5b0',
      metalness: 0.92,
      roughness: 0.22,
    }),
    buttonFace: new THREE.MeshStandardMaterial({
      color: '#7690bc',
      metalness: 0.85,
      roughness: 0.30,
    }),
    rubberMatte: new THREE.MeshStandardMaterial({
      color: '#141416',
      metalness: 0.10,
      roughness: 0.90,
    }),
    bottomPlate: new THREE.MeshStandardMaterial({
      color: '#1d1f24',
      metalness: 0.75,
      roughness: 0.45,
    }),
  };
}

function buildMainChassis(materials) {
  const group = new THREE.Group();
  const bodyShape = createRoundedRectShape(4.0, 4.0, 0.68);

  const extrudeSettings = {
    depth: 0.88,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: 0.12,
    bevelThickness: 0.12,
    curveSegments: 32,
  };

  const geometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materials.aluminumSide);
  mesh.rotation.x = -Math.PI / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  group.add(mesh);
  return group;
}

function buildTopPanel(materials) {
  const group = new THREE.Group();
  group.position.set(0, 0.52, 0);

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
    emissiveIntensity: 1.8,
    roughness: 0.1,
  });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.rotation.x = Math.PI / 2;
  lensMesh.position.z = 0.018;
  group.add(lensMesh);

  const ledLight = new THREE.PointLight('#ffffff', 0.35, 0.5);
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

function buildBottomDetails(materials) {
  const group = new THREE.Group();
  group.position.set(0, -0.52, 0);

  const plateGeo = new THREE.PlaneGeometry(3.7, 3.7);
  const plateMesh = new THREE.Mesh(plateGeo, materials.bottomPlate);
  plateMesh.rotation.x = Math.PI / 2;
  group.add(plateMesh);

  const slatsGroup = new THREE.Group();
  slatsGroup.position.set(0, -0.01, -0.5);
  for (let i = 0; i < 8; i++) {
    const slatGeo = new THREE.BoxGeometry(2.0, 0.02, 0.04);
    const slatMesh = new THREE.Mesh(slatGeo, materials.darkCavity);
    slatMesh.position.z = (i - 3.5) * 0.12;
    slatsGroup.add(slatMesh);
  }
  group.add(slatsGroup);

  const feetPositions = [
    [-1.35, -0.02, -1.35],
    [1.35, -0.02, -1.35],
    [-1.35, -0.02, 1.35],
    [1.35, -0.02, 1.35],
  ];

  feetPositions.forEach((pos) => {
    const footGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 24);
    const footMesh = new THREE.Mesh(footGeo, materials.rubberMatte);
    footMesh.position.set(pos[0], pos[1], pos[2]);
    group.add(footMesh);
  });

  return group;
}

function setupStudioLighting(scene) {
  const ambientLight = new THREE.AmbientLight('#e2ebff', 1.0);
  scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight('#ffffff', '#505a6b', 0.7);
  scene.add(hemisphereLight);

  const keyLight = new THREE.DirectionalLight('#ffffff', 2.0);
  keyLight.position.set(-2, 4, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.bias = -0.0001;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight('#fff5ea', 1.0);
  fillLight.position.set(4, 2, 3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight('#dbe8ff', 1.4);
  rimLight.position.set(-2, 4, -4);
  scene.add(rimLight);
}

function setupStudioFloor(scene, floorColor = '#0b0f24') {
  const floorGeo = new THREE.PlaneGeometry(40, 40);
  const floorMat = new THREE.MeshStandardMaterial({
    color: floorColor,
    roughness: 0.88,
    metalness: 0.02,
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -0.58;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);
}

export default function MiniDesktopEnclosure({
  className = '',
  bgColor = null,
  floorColor = null,
  interactive = true,
  onClick = null,
}) {
  const mountRef = useRef(null);
  const [currentView, setCurrentView] = useState('iso');

  const targetOrbit = useRef({ radius: 11.5, phi: Math.PI / 3.2, theta: Math.PI / 4 });
  const currentOrbit = useRef({ radius: 11.5, phi: Math.PI / 3.2, theta: Math.PI / 4 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const idleTimer = useRef(null);
  const autoRotate = useRef(true);

  const setCameraView = (view) => {
    setCurrentView(view);
    autoRotate.current = false;

    if (view === 'front') {
      targetOrbit.current = { radius: 9.0, phi: Math.PI / 2 - 0.02, theta: 0 };
    } else if (view === 'iso') {
      targetOrbit.current = { radius: 11.5, phi: Math.PI / 3.2, theta: Math.PI / 4 };
      autoRotate.current = true;
    } else if (view === 'top') {
      targetOrbit.current = { radius: 11.0, phi: 0.08, theta: 0 };
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const isTransparent = !bgColor || bgColor === 'transparent';
    const scene = new THREE.Scene();
    if (!isTransparent) {
      scene.background = new THREE.Color(bgColor);
    }

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: isTransparent });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    setupStudioLighting(scene);
    if (floorColor && floorColor !== 'transparent') {
      setupStudioFloor(scene, floorColor);
    }

    const materials = createMaterials();
    const computerCase = new THREE.Group();
    computerCase.add(buildMainChassis(materials));
    computerCase.add(buildTopPanel(materials));
    computerCase.add(buildFrontPanelPorts(materials));
    computerCase.add(buildBottomDetails(materials));
    scene.add(computerCase);

    let dragDistance = 0;
    let dragStartTime = 0;

    const handleMouseDown = (e) => {
      if (!interactive) return;
      isDragging.current = true;
      dragDistance = 0;
      dragStartTime = Date.now();
      autoRotate.current = false;
      previousMouse.current = { x: e.clientX, y: e.clientY };
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current || !interactive) return;
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
      previousMouse.current = { x: e.clientX, y: e.clientY };

      targetOrbit.current.theta -= deltaX * 0.008;
      targetOrbit.current.phi = Math.max(
        0.05,
        Math.min(Math.PI / 2 - 0.01, targetOrbit.current.phi - deltaY * 0.008)
      );
    };

    const handleMouseUp = (e) => {
      if (!interactive) return;
      const wasDragging = isDragging.current;
      isDragging.current = false;

      const elapsed = Date.now() - dragStartTime;
      if (wasDragging && dragDistance < 10 && elapsed < 500 && onClick) {
        onClick(e);
      }

      if (currentView === 'iso') {
        idleTimer.current = setTimeout(() => {
          autoRotate.current = true;
        }, 3000);
      }
    };

    const handleTouchStart = (e) => {
      if (!interactive || e.touches.length !== 1) return;
      isDragging.current = true;
      dragDistance = 0;
      dragStartTime = Date.now();
      autoRotate.current = false;
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current || !interactive || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouse.current.x;
      const deltaY = e.touches[0].clientY - previousMouse.current.y;
      dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      targetOrbit.current.theta -= deltaX * 0.008;
      targetOrbit.current.phi = Math.max(
        0.05,
        Math.min(Math.PI / 2 - 0.01, targetOrbit.current.phi - deltaY * 0.008)
      );
    };

    const handleTouchEnd = (e) => {
      if (!interactive) return;
      const wasDragging = isDragging.current;
      isDragging.current = false;

      const elapsed = Date.now() - dragStartTime;
      if (wasDragging && dragDistance < 10 && elapsed < 500 && onClick) {
        onClick(e);
      }

      if (currentView === 'iso') {
        idleTimer.current = setTimeout(() => {
          autoRotate.current = true;
        }, 3000);
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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
        targetOrbit.current.theta += 0.003;
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
      window.removeEventListener('touchend', handleTouchEnd);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [bgColor, floorColor, interactive, onClick]);

  return (
    <div
      className={`w-full h-full relative overflow-hidden select-none cursor-pointer ${className}`}
      style={{ minHeight: '100%' }}
    >
      <div ref={mountRef} className="w-full h-full" style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
