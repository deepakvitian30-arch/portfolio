import * as THREE from 'three';
import { TextureGenerator } from './TextureGenerator';

export interface PlanetInfo {
  index: number;
  id: string;
  name: string;
  subtitle: string;
  description: string;
  colorHex: string;
}

export interface PlanetMeshEntry {
  group: THREE.Group;
  sphere: THREE.Mesh;
  atmosphere: THREE.Mesh;
  ring?: THREE.Mesh;
  light: THREE.PointLight;
  info: PlanetInfo;
  baseRadius: number;
  rotationSpeed: number;
  orbitAngle: number;
}

export class FilmDirectorEngine {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  private reqId: number | null = null;
  private isDestroyed = false;
  private clock = new THREE.Clock();

  // Raycasting for interactive planet hover & click
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-1000, -1000);
  private hoveredPlanetIndex: number | null = null;
  private onHoverCallback?: (info: PlanetInfo | null, clientX: number, clientY: number) => void;
  private onSelectCallback?: (index: number) => void;

  // Scroll & Mouse progress (0.0 to 1.0)
  private scrollProgress = 0;
  private targetScrollProgress = 0;
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  // 3D Scene Elements
  private planets: PlanetMeshEntry[] = [];
  private planetMeshesForRaycast: THREE.Mesh[] = [];
  private particleField!: THREE.Points;
  private followLight!: THREE.PointLight;
  private ambientLight!: THREE.AmbientLight;
  private keyLight!: THREE.DirectionalLight;
  private rimLight!: THREE.DirectionalLight;

  // Camera waypoints along the film track (9 chapters)
  public waypoints = [
    // 0: Hero / Prologue (wide overview of the planet system)
    { camPos: new THREE.Vector3(0, 6, 28), lookAt: new THREE.Vector3(0, 1, 0) },
    // 1: OBSIDIAN — About Me
    { camPos: new THREE.Vector3(3.5, 3.5, -16), lookAt: new THREE.Vector3(-8.5, 2.5, -28) },
    // 2: MEDORA — DoseSense
    { camPos: new THREE.Vector3(-3.5, 3.5, -56), lookAt: new THREE.Vector3(8.5, 2.5, -68) },
    // 3: VITANIA — VITidy
    { camPos: new THREE.Vector3(3.5, 3.5, -96), lookAt: new THREE.Vector3(-8.5, 2.5, -108) },
    // 4: ENNAVAL — Luxury Boutique
    { camPos: new THREE.Vector3(-3.5, 3.5, -136), lookAt: new THREE.Vector3(8.5, 2.5, -148) },
    // 5: TRANSIT-09 — Parking Management
    { camPos: new THREE.Vector3(3.5, 3.5, -176), lookAt: new THREE.Vector3(-8.5, 2.5, -188) },
    // 6: TECHNORA — Skills Arsenal
    { camPos: new THREE.Vector3(-3.5, 3.5, -216), lookAt: new THREE.Vector3(8.5, 2.5, -228) },
    // 7: ACHIEVEMENTS — Honors & Milestones
    { camPos: new THREE.Vector3(3.5, 3.5, -256), lookAt: new THREE.Vector3(-8.5, 2.5, -268) },
    // 8: CONTACT — Direct Transmission
    { camPos: new THREE.Vector3(0, 4, -296), lookAt: new THREE.Vector3(0, 2.5, -316) }
  ];

  constructor(
    canvas: HTMLCanvasElement,
    onHover?: (info: PlanetInfo | null, clientX: number, clientY: number) => void,
    onSelect?: (index: number) => void
  ) {
    this.canvas = canvas;
    this.onHoverCallback = onHover;
    this.onSelectCallback = onSelect;
    this.init();
    this.setupListeners();
    this.animate();
  }

  private init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.45;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04060a);
    this.scene.fog = new THREE.FogExp2(0x04060a, 0.0055);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    this.camera.position.copy(this.waypoints[0].camPos);
    this.camera.lookAt(this.waypoints[0].lookAt);

    // Studio Lighting for Planets
    this.ambientLight = new THREE.AmbientLight(0x162033, 2.4);
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    this.keyLight.position.set(40, 50, 40);
    this.scene.add(this.keyLight);

    this.rimLight = new THREE.DirectionalLight(0x38bdf8, 3.8);
    this.rimLight.position.set(-40, 30, -30);
    this.scene.add(this.rimLight);

    this.followLight = new THREE.PointLight(0x38bdf8, 4.5, 80, 1.2);
    this.scene.add(this.followLight);

    this.buildCyberGrid();
    this.buildDeepSpaceStars();
    this.build3DPlanets();
  }

  private buildCyberGrid() {
    // Ground spatial cyber grid
    const grid = new THREE.GridHelper(900, 180, 0x1e293b, 0x090e17);
    grid.position.y = -3;
    this.scene.add(grid);
  }

  private buildDeepSpaceStars() {
    const starCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colCyan = new THREE.Color(0x38bdf8);
    const colIndigo = new THREE.Color(0x818cf8);
    const colWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 160;
      positions[idx + 1] = (Math.random() - 0.5) * 80 + 10;
      positions[idx + 2] = (Math.random() - 0.5) * 450 - 150;

      const p = Math.random();
      const c = p < 0.4 ? colCyan : p < 0.7 ? colIndigo : colWhite;
      colors[idx] = c.r;
      colors[idx + 1] = c.g;
      colors[idx + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.1,
      map: TextureGenerator.createStarTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleField = new THREE.Points(geometry, material);
    this.scene.add(this.particleField);
  }

  private createAtmosphereMaterial(colorHex: number) {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(colorHex) },
        viewVector: { value: this.camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float intensity;
        void main() {
          vec3 glow = color * intensity;
          gl_FragColor = vec4(glow, intensity * 0.7);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
  }

  private build3DPlanets() {
    // 8 distinct destination planets (mapped to Chapters 1 to 8)
    const planetConfigs = [
      {
        index: 1,
        id: 'obsidian',
        name: 'OBSIDIAN',
        subtitle: 'About Me & Ethos',
        description: 'Dark charcoal basalt terrain with glowing blue fissures and atmospheric rim.',
        colorHex: '#38bdf8',
        colorInt: 0x38bdf8,
        atmosphereInt: 0x38bdf8,
        texture: TextureGenerator.createObsidianTexture(),
        radius: 3.2,
        pos: new THREE.Vector3(-8.5, 2.5, -28),
        hasRing: false,
        speed: 0.18
      },
      {
        index: 2,
        id: 'medora',
        name: 'MEDORA',
        subtitle: 'DoseSense Healthcare Lab',
        description: 'Deep oceanic blue sphere with illuminated cyan telemetry and clinical patterns.',
        colorHex: '#22d3ee',
        colorInt: 0x22d3ee,
        atmosphereInt: 0x06b6d4,
        texture: TextureGenerator.createMedoraTexture(),
        radius: 3.3,
        pos: new THREE.Vector3(8.5, 2.5, -68),
        hasRing: false,
        speed: 0.22
      },
      {
        index: 3,
        id: 'vitania',
        name: 'VITANIA',
        subtitle: 'VITidy Campus Operations',
        description: 'Emerald and teal terrestrial continents with nocturnal amber city light clusters.',
        colorHex: '#10b981',
        colorInt: 0x10b981,
        atmosphereInt: 0x059669,
        texture: TextureGenerator.createVitaniaTexture(),
        radius: 3.1,
        pos: new THREE.Vector3(-8.5, 2.5, -108),
        hasRing: false,
        speed: 0.16
      },
      {
        index: 4,
        id: 'ennaval',
        name: 'ENNAVAL',
        subtitle: '3D Luxury Digital Boutique',
        description: 'Elegant royal violet sphere with champagne gold silk patterns and planetary rings.',
        colorHex: '#ec4899',
        colorInt: 0xd4af37,
        atmosphereInt: 0xa855f7,
        texture: TextureGenerator.createEnnavalTexture(),
        radius: 3.0,
        pos: new THREE.Vector3(8.5, 2.5, -148),
        hasRing: true,
        ringColor: '#d4af37',
        speed: 0.2
      },
      {
        index: 5,
        id: 'transit-09',
        name: 'TRANSIT-09',
        subtitle: 'Parking Management System',
        description: 'Brushed metallic silver planet with titanium geometric plates and amber beacon lights.',
        colorHex: '#f59e0b',
        colorInt: 0xf59e0b,
        atmosphereInt: 0xd97706,
        texture: TextureGenerator.createRedHotMagmaTexture(),
        radius: 3.0,
        pos: new THREE.Vector3(-8.5, 2.5, -188),
        hasRing: false,
        speed: 0.14
      },
      {
        index: 6,
        id: 'technora',
        name: 'TECHNORA',
        subtitle: 'Technical Skill Arsenal',
        description: 'Electric blue cyber planet with illuminated microchip traces and processor nodes.',
        colorHex: '#38bdf8',
        colorInt: 0x00e5ff,
        atmosphereInt: 0x0284c7,
        texture: TextureGenerator.createTechnoraTexture(),
        radius: 3.2,
        pos: new THREE.Vector3(8.5, 2.5, -228),
        hasRing: true,
        ringColor: '#00e5ff',
        speed: 0.25
      },
      {
        index: 7,
        id: 'achievements',
        name: 'ACHIEVEMENTS',
        subtitle: 'Honors & Milestones Vault',
        description: 'Radiant golden sphere with swirling amber corona bands and solar aurora atmosphere.',
        colorHex: '#fbbf24',
        colorInt: 0xfbbf24,
        atmosphereInt: 0xf59e0b,
        texture: TextureGenerator.createAchievementsTexture(),
        radius: 3.3,
        pos: new THREE.Vector3(-8.5, 2.5, -268),
        hasRing: false,
        speed: 0.2
      },
      {
        index: 8,
        id: 'contact',
        name: 'CONTACT',
        subtitle: 'Transmission Gateway',
        description: 'Luminous cyan communication planet with pulsating data relays and orbital beacons.',
        colorHex: '#38bdf8',
        colorInt: 0x38bdf8,
        atmosphereInt: 0x0ea5e9,
        texture: TextureGenerator.createTechnoraTexture(),
        radius: 3.4,
        pos: new THREE.Vector3(0, 2.5, -316),
        hasRing: true,
        ringColor: '#38bdf8',
        speed: 0.22
      }
    ];

    planetConfigs.forEach((cfg) => {
      const group = new THREE.Group();
      group.position.copy(cfg.pos);

      // 1. Solid High-Resolution Planet Sphere
      const sphereGeo = new THREE.SphereGeometry(cfg.radius, 64, 64);
      const sphereMat = new THREE.MeshStandardMaterial({
        map: cfg.texture,
        roughness: 0.65,
        metalness: 0.35
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { planetIndex: cfg.index, name: cfg.name };
      sphereMesh.name = `planet_${cfg.id}`;
      group.add(sphereMesh);

      // 2. Atmospheric Luminous Glow Shell
      const atmoGeo = new THREE.SphereGeometry(cfg.radius * 1.12, 32, 32);
      const atmoMat = this.createAtmosphereMaterial(cfg.atmosphereInt);
      const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
      group.add(atmoMesh);

      // 3. Optional Planetary Rings (e.g. for ENNAVAL and TECHNORA)
      let ringMesh: THREE.Mesh | undefined;
      if (cfg.hasRing) {
        const ringGeo = new THREE.RingGeometry(cfg.radius * 1.35, cfg.radius * 2.2, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          map: TextureGenerator.createRingTexture(cfg.ringColor || '#ffffff'),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.rotation.y = Math.PI / 8;
        group.add(ringMesh);
      }

      // 4. Subtle Orbital Data Beacon
      const light = new THREE.PointLight(cfg.colorInt, 3.2, 25);
      light.position.set(0, 0, 0);
      group.add(light);

      // 5. Store Entry for Animation & Raycasting
      const entry: PlanetMeshEntry = {
        group,
        sphere: sphereMesh,
        atmosphere: atmoMesh,
        ring: ringMesh,
        light,
        info: {
          index: cfg.index,
          id: cfg.id,
          name: cfg.name,
          subtitle: cfg.subtitle,
          description: cfg.description,
          colorHex: cfg.colorHex
        },
        baseRadius: cfg.radius,
        rotationSpeed: cfg.speed,
        orbitAngle: 0
      };

      this.planets.push(entry);
      this.planetMeshesForRaycast.push(sphereMesh);
      this.scene.add(group);
    });
  }

  private setupListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('click', this.onClick);
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

    // Normalized coordinates for Raycasting (-1 to 1)
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Check Raycast hover
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.planetMeshesForRaycast);

    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh;
      const idx = hit.userData.planetIndex;
      this.hoveredPlanetIndex = idx;
      document.body.style.cursor = 'pointer';

      const found = this.planets.find(p => p.info.index === idx);
      if (found && this.onHoverCallback) {
        this.onHoverCallback(found.info, e.clientX, e.clientY);
      }
    } else {
      if (this.hoveredPlanetIndex !== null) {
        this.hoveredPlanetIndex = null;
        document.body.style.cursor = 'default';
        if (this.onHoverCallback) {
          this.onHoverCallback(null, 0, 0);
        }
      }
    }
  };

  private onClick = () => {
    if (this.hoveredPlanetIndex !== null && this.onSelectCallback) {
      this.onSelectCallback(this.hoveredPlanetIndex);
    }
  };

  public setScrollProgress(progress: number) {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  public getPlanetList(): PlanetInfo[] {
    return this.planets.map(p => p.info);
  }

  private animate = () => {
    if (this.isDestroyed) return;
    this.reqId = requestAnimationFrame(this.animate);

    const elapsedTime = this.clock.getElapsedTime();

    // Smooth lerp for scroll and mouse parallax
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.085;
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.06;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.06;

    // Calculate interpolated camera waypoint along 9 chapters
    const totalSegments = this.waypoints.length - 1;
    const scaled = this.scrollProgress * totalSegments;
    const currIndex = Math.min(totalSegments - 1, Math.floor(scaled));
    const nextIndex = Math.min(totalSegments, currIndex + 1);
    const segmentT = scaled - currIndex;

    const pA = this.waypoints[currIndex];
    const pB = this.waypoints[nextIndex];

    // Smooth camera path with mouse crane parallax tilt
    const currentCamPos = new THREE.Vector3().lerpVectors(pA.camPos, pB.camPos, segmentT);
    currentCamPos.x += this.mouseX * 1.5;
    currentCamPos.y += this.mouseY * 1.0;
    this.camera.position.copy(currentCamPos);

    // LookAt interpolation
    const currentLookAt = new THREE.Vector3().lerpVectors(pA.lookAt, pB.lookAt, segmentT);
    this.camera.lookAt(currentLookAt);

    // Follow light travels just ahead of camera
    this.followLight.position.set(currentCamPos.x, currentCamPos.y + 1.5, currentCamPos.z - 10);

    // Subtle drift of atmospheric stars
    if (this.particleField) {
      this.particleField.rotation.y = elapsedTime * 0.015;
    }

    // Animate Planets: Independent axial rotation & smooth hover scale enlargement
    this.planets.forEach((p) => {
      // Axial rotation
      p.sphere.rotation.y = elapsedTime * p.rotationSpeed;

      // Ring rotation
      if (p.ring) {
        p.ring.rotation.z = elapsedTime * (p.rotationSpeed * 0.6);
      }

      // Smooth hover scale enlargement (enlarge on hover, normal otherwise)
      const isHovered = this.hoveredPlanetIndex === p.info.index;
      const targetScale = isHovered ? 1.15 : 1.0;
      p.sphere.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      p.atmosphere.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      if (p.ring) {
        p.ring.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      }

      // Subtle orbital bobbing
      p.group.position.y = 2.5 + Math.sin(elapsedTime * 0.9 + p.info.index) * 0.25;
    });

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    this.isDestroyed = true;
    if (this.reqId !== null) {
      cancelAnimationFrame(this.reqId);
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('click', this.onClick);
    this.scene.clear();
    this.renderer.dispose();
  }
}
