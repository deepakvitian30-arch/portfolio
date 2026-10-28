import * as THREE from 'three';
import { TextureGenerator } from './TextureGenerator';

export interface DestinationData {
  index: number;
  id: string;
  name: string;
  tagline: string;
  category: string;
  colorHex: string;
  colorInt: number;
  atmosphereInt: number;
  planetPos: THREE.Vector3;
  orbitCamOffset: THREE.Vector3;
  orbitShipOffset: THREE.Vector3;
  radius: number;
  hasRing?: boolean;
  ringColor?: string;
  ringTexture?: string;
  hasClouds?: boolean;
  cloudsTexture?: string;
  speed: number;
  texturePath: string;
  roughness?: number;
  metalness?: number;
  isEmissive?: boolean;
  emissiveColor?: number;
  emissiveIntensity?: number;
}

// Radial concentric ring geometry mapping realistic horizontal strip texture across 360 degrees
function createRadialRingGeometry(innerRadius: number, outerRadius: number, thetaSegments = 96) {
  const geo = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments, 8);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const d = Math.sqrt(x * x + y * y);
    const u = Math.max(0, Math.min(1, (d - innerRadius) / (outerRadius - innerRadius)));
    uv.setXY(i, u, 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}

export const DESTINATIONS_LIST: DestinationData[] = [
  // 1. EARTH — About Deepak (Authentic Earth with NASA satellite oceans, continents & atmosphere)
  {
    index: 1,
    id: 'obsidian',
    name: 'EARTH',
    tagline: 'Deepak Subramaniam • IT \'30 Profile',
    category: 'Student Profile & Ethos',
    colorHex: '#38bdf8',
    colorInt: 0x38bdf8,
    atmosphereInt: 0x38bdf8,
    planetPos: new THREE.Vector3(-34, 3, -45),
    orbitShipOffset: new THREE.Vector3(7.5, 1.2, 11),
    orbitCamOffset: new THREE.Vector3(14, 3.8, 22),
    radius: 5.0,
    hasRing: false,
    speed: 0.16,
    texturePath: '/textures/planets/earth.jpg',
    roughness: 0.65,
    metalness: 0.1
  },
  // 2. NEPTUNE — DoseSense Healthcare (Authentic Deep Azure Ice Giant)
  {
    index: 2,
    id: 'medora',
    name: 'NEPTUNE',
    tagline: 'DoseSense Healthcare Lab • HackGrid Finalist',
    category: 'Decision-Support Engineering',
    colorHex: '#22d3ee',
    colorInt: 0x22d3ee,
    atmosphereInt: 0x06b6d4,
    planetPos: new THREE.Vector3(40, -4, -85),
    orbitShipOffset: new THREE.Vector3(-7.5, 1.2, 11),
    orbitCamOffset: new THREE.Vector3(-14, 3.8, 22),
    radius: 5.2,
    hasRing: false,
    speed: 0.22,
    texturePath: '/textures/planets/neptune.jpg',
    roughness: 0.7,
    metalness: 0.15
  },
  // 3. VENUS — VITidy Campus Operations (Authentic Swirling Atmospheric World)
  {
    index: 3,
    id: 'vitania',
    name: 'VENUS',
    tagline: 'VITidy Campus Operations & Service Hub',
    category: 'Student Logistics Hub',
    colorHex: '#fbbf24',
    colorInt: 0xfbbf24,
    atmosphereInt: 0xd97706,
    planetPos: new THREE.Vector3(-44, 6, -130),
    orbitShipOffset: new THREE.Vector3(7.5, 1.2, 11),
    orbitCamOffset: new THREE.Vector3(14, 3.8, 22),
    radius: 4.9,
    hasRing: false,
    speed: 0.18,
    texturePath: '/textures/planets/venus.jpg',
    roughness: 0.75,
    metalness: 0.15
  },
  // 4. SATURN — Luxury Atelier (Authentic Saturn with Concentric Cassini Rings)
  {
    index: 4,
    id: 'ennaval',
    name: 'SATURN',
    tagline: '3D Luxury Digital Atelier',
    category: 'Digital Atelier & E-Commerce',
    colorHex: '#ec4899',
    colorInt: 0xd4af37,
    atmosphereInt: 0xa855f7,
    planetPos: new THREE.Vector3(46, 2, -175),
    orbitShipOffset: new THREE.Vector3(-7.5, 1.2, 12),
    orbitCamOffset: new THREE.Vector3(-14, 3.8, 23),
    radius: 5.2,
    hasRing: true,
    ringTexture: '/textures/planets/saturnring.jpg',
    ringColor: '#d4af37',
    speed: 0.2,
    texturePath: '/textures/planets/saturn.jpg',
    roughness: 0.75,
    metalness: 0.2
  },
  // 5. MARS — Parking Systems Prototype (Authentic Red Planet with Craters & Canyons)
  {
    index: 5,
    id: 'transit-09',
    name: 'MARS',
    tagline: 'Red Planet • Autonomous Parking System',
    category: 'Autonomous Slot Allocation',
    colorHex: '#ef4444',
    colorInt: 0xff3300,
    atmosphereInt: 0xff2200,
    planetPos: new THREE.Vector3(-42, -5, -220),
    orbitShipOffset: new THREE.Vector3(7.5, 1.2, 11),
    orbitCamOffset: new THREE.Vector3(14, 3.8, 22),
    radius: 4.8,
    hasRing: false,
    speed: 0.17,
    texturePath: '/textures/planets/mars.jpg',
    roughness: 0.8,
    metalness: 0.15
  },
  // 6. JUPITER — Website Change Detector (Authentic Jupiter with Great Red Spot & Storm Bands)
  {
    index: 6,
    id: 'sentinel',
    name: 'JUPITER',
    tagline: 'Website Change Detector • DOM Surveillance',
    category: 'DOM Surveillance & Visual Diffing',
    colorHex: '#10b981',
    colorInt: 0x00ffcc,
    atmosphereInt: 0x059669,
    planetPos: new THREE.Vector3(45, 5, -265),
    orbitShipOffset: new THREE.Vector3(-7.5, 1.2, 11),
    orbitCamOffset: new THREE.Vector3(-14, 3.8, 22),
    radius: 5.5,
    hasRing: false,
    speed: 0.22,
    texturePath: '/textures/planets/jupiter.jpg',
    roughness: 0.65,
    metalness: 0.15
  },
  // 7. URANUS — Technical Skills Arsenal (Authentic Aquamarine Ice Atmosphere)
  {
    index: 7,
    id: 'technora',
    name: 'URANUS',
    tagline: 'Technical Skills Arsenal & Matrix',
    category: 'Stack Matrix & Tooling',
    colorHex: '#38bdf8',
    colorInt: 0x00e5ff,
    atmosphereInt: 0x0284c7,
    planetPos: new THREE.Vector3(-40, 4, -310),
    orbitShipOffset: new THREE.Vector3(7.5, 1.2, 11),
    orbitCamOffset: new THREE.Vector3(14, 3.8, 22),
    radius: 5.0,
    hasRing: false,
    speed: 0.24,
    texturePath: '/textures/planets/uranus.jpg',
    roughness: 0.7,
    metalness: 0.1
  },
  // 8. MERCURY — Honors & Milestones (Authentic Geological Cratered Rocky World)
  {
    index: 8,
    id: 'achievements',
    name: 'MERCURY',
    tagline: 'Honors, Workshop Milestones & Certifications',
    category: 'HackGrid & Academic Distinctions',
    colorHex: '#fbbf24',
    colorInt: 0xfbbf24,
    atmosphereInt: 0xf59e0b,
    planetPos: new THREE.Vector3(42, 2, -355),
    orbitShipOffset: new THREE.Vector3(-7.5, 1.2, 11),
    orbitCamOffset: new THREE.Vector3(-14, 3.8, 22),
    radius: 4.8,
    hasRing: false,
    speed: 0.19,
    texturePath: '/textures/planets/mercury.jpg',
    roughness: 0.85,
    metalness: 0.2
  },
  // 9. THE SUN — Transmission Gateway (Authentic Solar Photosphere with Glowing Convection)
  {
    index: 9,
    id: 'contact',
    name: 'THE SUN',
    tagline: 'Direct Transmission Gateway • Core Relays',
    category: 'Inquiries & Collaboration',
    colorHex: '#ffaa00',
    colorInt: 0xffaa00,
    atmosphereInt: 0xff4400,
    planetPos: new THREE.Vector3(0, 3, -400),
    orbitShipOffset: new THREE.Vector3(-7.5, 1.2, 12),
    orbitCamOffset: new THREE.Vector3(-14, 3.8, 23),
    radius: 5.4,
    hasRing: false,
    speed: 0.14,
    texturePath: '/textures/planets/sun.jpg',
    isEmissive: true,
    emissiveColor: 0xff4400,
    emissiveIntensity: 0.85,
    roughness: 0.9,
    metalness: 0.1
  }
];

export interface FlightWaypoint {
  shipPos: THREE.Vector3;
  camPos: THREE.Vector3;
  lookAt: THREE.Vector3;
}

export class SpaceTravelEngine {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  private reqId: number | null = null;
  private isDestroyed = false;
  private clock = new THREE.Clock();

  // Spacecraft elements
  public shipGroup!: THREE.Group;
  private engineLights: THREE.PointLight[] = [];
  private navLights: THREE.PointLight[] = [];
  private shipHeadlights: THREE.SpotLight[] = [];
  private engineThrustMaterial!: THREE.MeshBasicMaterial;
  private engineCoreMaterial!: THREE.MeshBasicMaterial;

  // Space environment
  private spaceStars!: THREE.Points;
  private planets: {
    group: THREE.Group;
    sphere: THREE.Mesh;
    ring?: THREE.Mesh;
    data: DestinationData;
  }[] = [];

  // Raycasting for planet clicks
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-1000, -1000);
  private raycastSpheres: THREE.Mesh[] = [];

  // Scroll Driven Flight Progress (0.0 to 1.0)
  private scrollProgress = 0;
  private targetScrollProgress = 0;
  private scrollVelocity = 0;

  // Flight waypoints (0 = System Overview, 1 to 9 = Destinations)
  public waypoints: FlightWaypoint[] = [];

  // Mouse Parallax
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  // Callbacks
  private onSelectCallback?: (index: number) => void;
  private onHoverCallback?: (data: DestinationData | null, screenX: number, screenY: number) => void;

  public destinations: DestinationData[] = DESTINATIONS_LIST;

  constructor(
    canvas: HTMLCanvasElement,
    onSelect?: (index: number) => void,
    onHover?: (data: DestinationData | null, screenX: number, screenY: number) => void
  ) {
    this.canvas = canvas;
    this.onSelectCallback = onSelect;
    this.onHoverCallback = onHover;
    this.buildWaypoints();
    this.init();
    this.setupListeners();
    this.animate();
  }

  private buildWaypoints() {
    // 0: System Overview Waypoint
    this.waypoints.push({
      shipPos: new THREE.Vector3(0, 1.5, 10),
      camPos: new THREE.Vector3(0, 14, 38),
      lookAt: new THREE.Vector3(0, 0, -30)
    });

    // 1 to 9: All Planetary Waypoints
    for (let i = 0; i < 9; i++) {
      const dest = this.destinations[i];
      this.waypoints.push({
        shipPos: new THREE.Vector3().copy(dest.planetPos).add(dest.orbitShipOffset),
        camPos: new THREE.Vector3().copy(dest.planetPos).add(dest.orbitCamOffset),
        lookAt: new THREE.Vector3().copy(dest.planetPos)
      });
    }
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
    this.scene.background = new THREE.Color(0x000000); // Pure deep dark black space
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0022);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1600
    );

    this.camera.position.copy(this.waypoints[0].camPos);
    this.camera.lookAt(this.waypoints[0].lookAt);

    // Natural Astronomical Space Lighting
    const ambient = new THREE.AmbientLight(0x182030, 1.4);
    this.scene.add(ambient);

    // Warm, crisp directional sunlight casting natural day/night shadows across planetary spheres
    const sunKey = new THREE.DirectionalLight(0xfffbf0, 3.2);
    sunKey.position.set(70, 80, 55);
    this.scene.add(sunKey);

    const rimLight = new THREE.DirectionalLight(0x94a3b8, 0.6);
    rimLight.position.set(-60, -20, -50);
    this.scene.add(rimLight);

    this.buildStars();
    this.buildPlanets();
    this.buildSpacecraft();
  }

  private buildStars() {
    const count = 2800;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Authentic astronomical stellar spectrum (no neon glitter)
    const cWhite = new THREE.Color(0xf8fafc); // Class A / F white
    const cWarm = new THREE.Color(0xfef3c7);  // Class G solar yellow/white
    const cSoftBlue = new THREE.Color(0xe0f2fe); // Class B pale celestial blue

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 650;
      pos[idx + 1] = (Math.random() - 0.5) * 450 + 50;
      pos[idx + 2] = (Math.random() - 0.5) * 650 - 160;

      const p = Math.random();
      const col = p < 0.65 ? cWhite : p < 0.88 ? cWarm : cSoftBlue;
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.65, // Natural crisp astronomical pinpoints
      map: TextureGenerator.createStarTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false
    });

    this.spaceStars = new THREE.Points(geo, mat);
    this.scene.add(this.spaceStars);
  }

  private buildSpacecraft() {
    this.shipGroup = new THREE.Group();

    // Dark brushed titanium metallic hull
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x141a24,
      roughness: 0.28,
      metalness: 0.9
    });

    // Dark aerospace armor paneling
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0c1018,
      roughness: 0.2,
      metalness: 0.95
    });

    // 1. Central Aerodynamic Fuselage
    const fuselageGeo = new THREE.ConeGeometry(0.85, 4.4, 6);
    fuselageGeo.rotateX(Math.PI / 2);
    const fuselage = new THREE.Mesh(fuselageGeo, hullMat);
    fuselage.scale.set(1.1, 0.55, 1.0);
    this.shipGroup.add(fuselage);

    // 2. Cockpit Visor / Command Bridge
    const canopyGeo = new THREE.SphereGeometry(0.55, 16, 16);
    canopyGeo.scale(0.8, 0.45, 1.4);
    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0
    });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0, 0.24, 0.4);
    this.shipGroup.add(canopy);

    // 3. Swept Aerodynamic Delta Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(2.8, -1.4);
    wingShape.lineTo(2.6, -2.2);
    wingShape.lineTo(0, -1.6);
    wingShape.closePath();

    const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04 };
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
    wingGeo.rotateX(Math.PI / 2);

    const rightWing = new THREE.Mesh(wingGeo, panelMat);
    rightWing.position.set(0.3, -0.05, 0.2);
    this.shipGroup.add(rightWing);

    const leftWing = new THREE.Mesh(wingGeo, panelMat);
    leftWing.position.set(-0.3, -0.05, 0.2);
    leftWing.scale.set(-1, 1, 1);
    this.shipGroup.add(leftWing);

    // 4. REAR-FIRING RED HOT JET THRUSTERS — Crimson flames blasting from twin rear engines
    this.engineThrustMaterial = new THREE.MeshBasicMaterial({
      color: 0xff2222, // Crimson red outer flame
      transparent: true,
      opacity: 0.95
    });

    this.engineCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8800, // Molten orange-white incandescent core
      transparent: true,
      opacity: 1.0
    });

    // Twin rear-mounted engine nacelles — flames blast backward
    [-0.65, 0.65].forEach((xPos) => {
      // Engine nacelle housing
      const nacelleGeo = new THREE.CylinderGeometry(0.28, 0.34, 2.2, 12);
      nacelleGeo.rotateX(Math.PI / 2);
      const nacelle = new THREE.Mesh(nacelleGeo, hullMat);
      nacelle.position.set(xPos, -0.05, -1.2);
      this.shipGroup.add(nacelle);

      // Exhaust nozzle ring (visible rim at the back of each engine)
      const nozzleGeo = new THREE.TorusGeometry(0.30, 0.05, 8, 16);
      const nozzleMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.3,
        metalness: 0.95,
        emissive: 0xff2200,
        emissiveIntensity: 0.3
      });
      const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
      nozzle.position.set(xPos, -0.05, -2.3);
      this.shipGroup.add(nozzle);

      // Outer Red Flame — large fire cone blasting rearward
      const exhaustGeo = new THREE.ConeGeometry(0.28, 1.6, 14);
      exhaustGeo.rotateX(-Math.PI / 2); // Points backward (-Z)
      const exhaust = new THREE.Mesh(exhaustGeo, this.engineThrustMaterial);
      exhaust.position.set(xPos, -0.05, -3.2);
      this.shipGroup.add(exhaust);

      // Inner Core Flame — bright orange-white hot center
      const coreGeo = new THREE.ConeGeometry(0.13, 0.9, 12);
      coreGeo.rotateX(-Math.PI / 2);
      const core = new THREE.Mesh(coreGeo, this.engineCoreMaterial);
      core.position.set(xPos, -0.05, -2.8);
      this.shipGroup.add(core);

      // Red Engine Lighting — casts fiery red glow behind the ship
      const engineLight = new THREE.PointLight(0xff3322, 6.0, 18);
      engineLight.position.set(xPos, -0.05, -3.5);
      this.shipGroup.add(engineLight);
      this.engineLights.push(engineLight);
    });

    // 5. Forward Exploratory Headlights (casting high-tech beams forward!)
    const leftHeadlight = new THREE.SpotLight(0xa5f3fc, 4.0, 45, Math.PI / 6, 0.4);
    leftHeadlight.position.set(-0.5, 0, 1.2);
    leftHeadlight.target.position.set(-0.5, 0, 15);
    this.shipGroup.add(leftHeadlight);
    this.shipGroup.add(leftHeadlight.target);
    this.shipHeadlights.push(leftHeadlight);

    const rightHeadlight = new THREE.SpotLight(0xa5f3fc, 4.0, 45, Math.PI / 6, 0.4);
    rightHeadlight.position.set(0.5, 0, 1.2);
    rightHeadlight.target.position.set(0.5, 0, 15);
    this.shipGroup.add(rightHeadlight);
    this.shipGroup.add(rightHeadlight.target);
    this.shipHeadlights.push(rightHeadlight);

    // 6. Navigation Wingtip Strobes
    const greenNav = new THREE.PointLight(0x10b981, 2.0, 6);
    greenNav.position.set(2.8, 0, -1.4);
    this.shipGroup.add(greenNav);
    this.navLights.push(greenNav);

    const redNav = new THREE.PointLight(0xef4444, 2.0, 6);
    redNav.position.set(-2.8, 0, -1.4);
    this.shipGroup.add(redNav);
    this.navLights.push(redNav);

    this.shipGroup.position.copy(this.waypoints[0].shipPos);
    this.shipGroup.visible = false;
    // Jet removed from scene for clean unobstructed cinematic space voyage
  }

  private buildPlanets() {
    const textureLoader = new THREE.TextureLoader();

    // All 9 Destinations are 100% Authentic Astronomical Planetary Spheres (NO outer covering, NO blue outline)
    for (let i = 0; i < 9; i++) {
      const dest = this.destinations[i];
      const group = new THREE.Group();
      group.position.copy(dest.planetPos);

      // 1. High-Resolution Photorealistic Planetary Sphere
      const sphereGeo = new THREE.SphereGeometry(dest.radius, 64, 64);
      const planetTex = textureLoader.load(dest.texturePath);
      planetTex.colorSpace = THREE.SRGBColorSpace;

      const sphereMat = new THREE.MeshStandardMaterial({
        map: planetTex,
        roughness: dest.roughness ?? 0.7,
        metalness: dest.metalness ?? 0.1,
        emissive: dest.isEmissive ? (dest.emissiveColor ?? 0xff2200) : 0x000000,
        emissiveIntensity: dest.isEmissive ? (dest.emissiveIntensity ?? 0.5) : 0.0
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.userData = { destinationIndex: dest.index, name: dest.name };
      group.add(sphere);
      this.raycastSpheres.push(sphere);

      // 2. Realistic Concentric Planetary Rings (ONLY on Saturn)
      let ring: THREE.Mesh | undefined;
      if (dest.hasRing) {
        const ringTexPath = dest.ringTexture || '/textures/planets/saturnring.jpg';
        const ringTex = textureLoader.load(ringTexPath);
        ringTex.colorSpace = THREE.SRGBColorSpace;

        const ringGeo = createRadialRingGeometry(dest.radius * 1.35, dest.radius * 2.35, 96);
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.92,
          roughness: 0.7
        });
        ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.35;
        ring.rotation.y = Math.PI / 9;
        group.add(ring);
      }

      this.planets.push({
        group,
        sphere,
        ring,
        data: dest
      });

      this.scene.add(group);
    }
  }

  public setScrollProgress(progress: number) {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  private setupListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('click', this.onClick);
  }

  private onResize = () => {
    if (!this.renderer || !this.camera) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private onMouseMove = (e: MouseEvent) => {
    this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.raycastSpheres);

    if (hits.length > 0) {
      const hitObj = hits[0].object as THREE.Mesh;
      const idx = hitObj.userData.destinationIndex;
      const found = this.destinations.find(d => d.index === idx);
      if (found && this.onHoverCallback) {
        this.onHoverCallback(found, e.clientX, e.clientY);
        document.body.style.cursor = 'pointer';
      }
    } else {
      if (this.onHoverCallback) {
        this.onHoverCallback(null, 0, 0);
        document.body.style.cursor = 'default';
      }
    }
  };

  private onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && target.closest('button, a, input, textarea, .glass-panel')) {
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.raycastSpheres);
    if (hits.length > 0) {
      const hitObj = hits[0].object as THREE.Mesh;
      const idx = hitObj.userData.destinationIndex;
      if (idx !== undefined && this.onSelectCallback) {
        this.onSelectCallback(idx);
      }
    }
  };

  private animate = () => {
    if (this.isDestroyed) return;
    this.reqId = requestAnimationFrame(this.animate);

    const elapsed = this.clock.getElapsedTime();

    // 1. Smooth Scroll Interpolation along Flight Waypoints
    const prevScroll = this.scrollProgress;
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.085;
    this.scrollVelocity = Math.abs(this.scrollProgress - prevScroll);

    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // 9 destination segments (0 to 9)
    const totalSegments = this.waypoints.length - 1;
    const scaled = this.scrollProgress * totalSegments;
    const currIndex = Math.min(totalSegments - 1, Math.floor(scaled));
    const nextIndex = Math.min(totalSegments, currIndex + 1);
    const segmentT = scaled - currIndex;

    const easeT = segmentT * segmentT * (3 - 2 * segmentT);

    const wA = this.waypoints[currIndex];
    const wB = this.waypoints[nextIndex];

    const currentShipPos = new THREE.Vector3().lerpVectors(wA.shipPos, wB.shipPos, easeT);
    this.shipGroup.position.copy(currentShipPos);

    // Dynamic Spacecraft Pitch Orientation
    if (currIndex !== nextIndex && segmentT > 0.01 && segmentT < 0.99) {
      const lookAhead = new THREE.Vector3().lerpVectors(wA.shipPos, wB.shipPos, Math.min(1.0, easeT + 0.08));
      this.shipGroup.lookAt(lookAhead);
    } else {
      this.shipGroup.lookAt(wA.lookAt);
    }

    // Camera follow path
    const currentCamPos = new THREE.Vector3().lerpVectors(wA.camPos, wB.camPos, easeT);
    currentCamPos.x += this.mouseX * 0.8;
    currentCamPos.y += this.mouseY * 0.5;
    this.camera.position.copy(currentCamPos);

    const currentLookAt = new THREE.Vector3().lerpVectors(wA.lookAt, wB.lookAt, easeT);
    this.camera.lookAt(currentLookAt);

    // Engine Thrust Power & Illumination
    const isMoving = this.scrollVelocity > 0.0004;
    const thrustPower = isMoving ? 8.5 + Math.sin(elapsed * 35) * 2.0 : 3.8 + Math.sin(elapsed * 12) * 0.5;
    this.engineThrustMaterial.opacity = isMoving ? 0.98 : 0.65;
    this.engineLights.forEach(l => l.intensity = thrustPower);

    // Forward Headlights intensity
    this.shipHeadlights.forEach(h => {
      h.intensity = 4.0;
    });

    // 2. Animate Planets Rotation
    this.planets.forEach((p) => {
      p.sphere.rotation.y = elapsed * p.data.speed;
      if (p.ring) {
        p.ring.rotation.z = elapsed * (p.data.speed * 0.4);
      }
    });

    // 3. Strobe Navigation Lights
    const strobe = (Math.sin(elapsed * 4) > 0.8) ? 2.5 : 0.2;
    this.navLights.forEach(n => n.intensity = strobe);

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
