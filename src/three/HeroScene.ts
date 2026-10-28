import * as THREE from 'three';

// Professional creative 3D background canvas inspired by genzwebdeveloper.com
// Smooth, elegant holographic digital geometry with gentle floating particles and mouse parallax.

export class HeroSceneEngine {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private reqId: number | null = null;
  private isDestroyed = false;
  private clock = new THREE.Clock();

  // Mouse & Scroll Tracking
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;
  private scrollY = 0;
  private targetScrollY = 0;

  // 3D Objects
  private digitalSculpture!: THREE.Mesh;
  private outerRing!: THREE.Mesh;
  private particleField!: THREE.Points;
  private lightKey!: THREE.DirectionalLight;
  private lightRim!: THREE.DirectionalLight;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.init();
    this.setupListeners();
    this.animate();
  }

  private init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x05060a, 0.002);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 32);

    // Ambient fill light
    const ambientLight = new THREE.AmbientLight(0x0e1322, 2.2);
    this.scene.add(ambientLight);

    // Directional Cyan Key Light
    this.lightKey = new THREE.DirectionalLight(0x38bdf8, 3.5);
    this.lightKey.position.set(20, 25, 20);
    this.scene.add(this.lightKey);

    // Directional Violet Rim Light
    this.lightRim = new THREE.DirectionalLight(0x818cf8, 4.0);
    this.lightRim.position.set(-25, -15, -15);
    this.scene.add(this.lightRim);

    this.buildSculpture();
    this.buildParticleField();
  }

  private buildSculpture() {
    // Holographic digital sculpture: TorusKnot with iridescent metallic finish
    const geo = new THREE.TorusKnotGeometry(6.2, 1.8, 160, 32, 2, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.9,
      wireframe: false
    });

    this.digitalSculpture = new THREE.Mesh(geo, mat);
    this.digitalSculpture.position.set(10, 0, 0); // Positioned nicely on the right half of the hero
    this.scene.add(this.digitalSculpture);

    // Concentric orbital holographic ring
    const ringGeo = new THREE.TorusGeometry(12.5, 0.12, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35
    });
    this.outerRing = new THREE.Mesh(ringGeo, ringMat);
    this.outerRing.position.set(10, 0, 0);
    this.outerRing.rotation.x = Math.PI / 3;
    this.scene.add(this.outerRing);
  }

  private buildParticleField() {
    // 1,800 delicate, glowing ambient particles
    const count = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const p = Math.random();
      if (p > 0.6) {
        colors[i * 3] = 0.22;
        colors[i * 3 + 1] = 0.74;
        colors[i * 3 + 2] = 0.97; // Cyan (#38bdf8)
      } else if (p > 0.3) {
        colors[i * 3] = 0.51;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 0.97; // Violet (#818cf8)
      } else {
        colors[i * 3] = 0.95;
        colors[i * 3 + 1] = 0.98;
        colors[i * 3 + 2] = 1.0; // White
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create soft circular point texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(200, 240, 255, 0.7)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleField = new THREE.Points(geometry, material);
    this.scene.add(this.particleField);
  }

  private setupListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private onResize = () => {
    if (!this.renderer || !this.camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private onMouseMove = (e: MouseEvent) => {
    this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  private onScroll = () => {
    this.targetScrollY = window.scrollY;
  };

  private animate = () => {
    if (this.isDestroyed) return;
    this.reqId = requestAnimationFrame(this.animate);

    const elapsedTime = this.clock.getElapsedTime();

    // Smooth easing interpolation
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.05;

    // Responsive 3D positioning: center on mobile, offset on desktop
    const isDesktop = window.innerWidth >= 1024;
    const targetX = isDesktop ? 8 : 0;
    const targetY = isDesktop ? 0 : -2;

    if (this.digitalSculpture) {
      this.digitalSculpture.position.x = targetX;
      this.digitalSculpture.position.y = targetY + Math.sin(elapsedTime * 0.8) * 0.4;
      this.digitalSculpture.rotation.x = elapsedTime * 0.35 + this.mouseY * 0.3;
      this.digitalSculpture.rotation.y = elapsedTime * 0.45 + this.mouseX * 0.4;
      this.digitalSculpture.rotation.z = Math.sin(elapsedTime * 0.2) * 0.2;
    }

    if (this.outerRing) {
      this.outerRing.position.x = targetX;
      this.outerRing.position.y = targetY;
      this.outerRing.rotation.z = -elapsedTime * 0.2;
      this.outerRing.rotation.y = Math.sin(elapsedTime * 0.3) * 0.3;
    }

    if (this.particleField) {
      this.particleField.rotation.y = elapsedTime * 0.02 + this.mouseX * 0.08;
      this.particleField.rotation.x = this.mouseY * 0.05;
    }

    // Scroll-driven camera parallax
    this.camera.position.y = -(this.scrollY * 0.015);

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    this.isDestroyed = true;
    if (this.reqId !== null) {
      cancelAnimationFrame(this.reqId);
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('scroll', this.onScroll);

    this.scene.clear();
    this.renderer.dispose();
  }
}
