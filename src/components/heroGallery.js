import {
  DoubleSide, Mesh, OrthographicCamera, PlaneGeometry, Scene,
  ShaderMaterial, SRGBColorSpace, TextureLoader, Vector2, WebGLRenderer,
} from 'three';

// Square images move across one plane. Curving their screen-space Y gives
// the expanding ribbon its shape without a perspective wall or camera flight.
const vertexShader = `
  uniform vec2 viewport;
  uniform float cylinder;
  varying vec2 imageUv;
  void main() {
    imageUv = uv;
    vec4 point = modelViewMatrix * vec4(position, 1.0);
    float horizontal = point.x / (viewport.x * 0.5);
    point.y /= max(0.25, 1.0 - (1.0 - cylinder) * horizontal * horizontal);
    gl_Position = projectionMatrix * point;
  }
`;

const fragmentShader = `
  uniform sampler2D imageMap;
  uniform vec2 imageSize;
  varying vec2 imageUv;
  void main() {
    vec2 cover = vec2(min(1.0, imageSize.y / imageSize.x), min(1.0, imageSize.x / imageSize.y));
    vec2 sampleUv = (imageUv - 0.5) * cover + 0.5;
    vec2 edge = abs(imageUv * 2.0 - 1.0) - 0.96;
    float corner = length(max(edge, 0.0)) + min(max(edge.x, edge.y), 0.0) - 0.04;
    if (corner > 0.0) discard;
    gl_FragColor = texture2D(imageMap, sampleUv);
    #include <colorspace_fragment>
  }
`;

export function createHeroGallery(canvas, sources, cards) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 2;
  const geometry = new PlaneGeometry(1, 1, 32, 1);
  const viewport = new Vector2(1, 1);
  let disposed = false;
  const loader = new TextureLoader();
  const textures = [];
  const ready = Promise.allSettled(sources.map((src, index) => new Promise((resolve, reject) => {
    const texture = loader.load(src, (loaded) => {
      if (disposed) loaded.dispose();
      resolve(loaded);
    }, undefined, reject);
    texture.colorSpace = SRGBColorSpace;
    textures[index] = texture;
  })));
  const meshes = cards.map(({ index, side }) => {
    const texture = textures[(index * 2 + (side === 1 ? 1 : 0)) % sources.length];
    const material = new ShaderMaterial({
      vertexShader, fragmentShader,
      uniforms: {
        viewport: { value: viewport },
        cylinder: { value: 1 },
        imageMap: { value: texture },
        imageSize: { value: new Vector2(1, 1) },
      },
      side: DoubleSide, transparent: true, depthTest: false, depthWrite: false,
    });
    const mesh = new Mesh(geometry, material);
    mesh.frustumCulled = false;
    mesh.visible = false;
    scene.add(mesh);
    return mesh;
  });

  return {
    ready,
    resize(width, height) {
      viewport.set(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
    },
    render(positions, cylinder) {
      if (disposed) return;
      positions.forEach((position, i) => {
        const mesh = meshes[i];
        mesh.visible = position.visible;
        if (!position.visible) return;
        mesh.position.x = position.x;
        mesh.scale.set(position.size, position.size, 1);
        mesh.renderOrder = position.order;
        mesh.material.uniforms.cylinder.value = cylinder;
        const image = mesh.material.uniforms.imageMap.value.image;
        if (image) mesh.material.uniforms.imageSize.value.set(image.width, image.height);
      });
      renderer.render(scene, camera);
    },
    dispose() {
      disposed = true;
      meshes.forEach((mesh) => mesh.material.dispose());
      textures.forEach((texture) => texture.dispose());
      geometry.dispose();
      renderer.dispose();
    },
  };
}
