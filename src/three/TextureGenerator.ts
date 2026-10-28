import * as THREE from 'three';

// Procedural texture generator for high-fidelity planets, stars, and nebulae
export class TextureGenerator {
  // 1. Natural Soft Astronomical Star Pinpoint
  public static createStarTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 15);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.6, 'rgba(240, 245, 255, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 2. Underwater Bubble Sprite for Abyssal Ocean
  public static createBubbleTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    ctx.strokeStyle = 'rgba(125, 211, 252, 0.85)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    ctx.stroke();

    const grad = ctx.createRadialGradient(24, 24, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.35)');
    grad.addColorStop(0.8, 'rgba(14, 165, 233, 0.1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 3. RED HOT MAGMA VOLCANIC PLANET TEXTURE (Planet Transit-09)
  public static createRedHotMagmaTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Fiery volcanic dark basalt crust
    ctx.fillStyle = '#140303';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scorched tectonic plates
    for (let x = 0; x < canvas.width; x += 16) {
      for (let y = 0; y < canvas.height; y += 16) {
        const val = Math.floor(20 + Math.random() * 25);
        ctx.fillStyle = `rgb(${val + 15}, ${Math.floor(val * 0.4)}, ${Math.floor(val * 0.2)})`;
        ctx.fillRect(x, y, 16, 16);
      }
    }

    // Glowing red-hot lava rivers and magma fractures
    for (let i = 0; i < 48; i++) {
      let curX = Math.random() * canvas.width;
      let curY = Math.random() * canvas.height;

      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#ff3300';
      ctx.shadowColor = '#ff1100';
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.moveTo(curX, curY);
      for (let step = 0; step < 8; step++) {
        curX += (Math.random() - 0.5) * 80;
        curY += (Math.random() - 0.5) * 60;
        ctx.lineTo(curX, curY);
      }
      ctx.stroke();

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = '#fff066';
      ctx.shadowColor = '#ffaa00';
      ctx.shadowBlur = 6;
      ctx.stroke();
    }

    // Magma calderas and glowing hotspot eruptions
    for (let j = 0; j < 30; j++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const rad = 6 + Math.random() * 20;

      const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      radial.addColorStop(0, '#ffffff');
      radial.addColorStop(0.2, '#ffcc00');
      radial.addColorStop(0.6, '#ff2200');
      radial.addColorStop(1, 'rgba(30, 5, 5, 0)');

      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 4. SENTINEL — Website Change Detector Planet Texture: Radar scanning sweep & diffing grid
  public static createSentinelTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Deep surveillance dark slate base
    ctx.fillStyle = '#061614';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Monitoring scanner grid lines
    ctx.strokeStyle = '#053e36';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Active change-detection radar sweeps & diff pulses (neon emerald & cyan)
    ctx.strokeStyle = '#10b981';
    ctx.shadowColor = '#00ffcc';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2.5;

    for (let i = 0; i < 35; i++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const rad = 10 + Math.random() * 30;

      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Scanning sweep gradient band
    const sweep = ctx.createLinearGradient(0, 0, canvas.width, 0);
    sweep.addColorStop(0, 'rgba(16, 185, 129, 0)');
    sweep.addColorStop(0.5, 'rgba(0, 255, 204, 0.25)');
    sweep.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 5. OBSIDIAN — About Me: Dark charcoal planet with detailed rocky terrain and blue fissures
  public static createObsidianTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#111318';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < canvas.width; x += 8) {
      for (let y = 0; y < canvas.height; y += 8) {
        const val = Math.floor(18 + Math.random() * 20);
        ctx.fillStyle = `rgb(${val}, ${val + 1}, ${val + 4})`;
        ctx.fillRect(x, y, 8, 8);
      }
    }

    for (let i = 0; i < 45; i++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const rad = 6 + Math.random() * 24;
      ctx.strokeStyle = '#090a0d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.lineWidth = 2.0;
    for (let i = 0; i < 30; i++) {
      let curX = Math.random() * canvas.width;
      let curY = Math.random() * canvas.height;
      ctx.strokeStyle = i % 2 === 0 ? '#38bdf8' : '#60a5fa';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      for (let step = 0; step < 7; step++) {
        curX += (Math.random() - 0.5) * 70;
        curY += (Math.random() - 0.5) * 50;
        ctx.lineTo(curX, curY);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 6. MEDORA — DoseSense: Deep blue ocean planet with glowing cyan clinical/data patterns
  public static createMedoraTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#031b2e');
    grad.addColorStop(0.5, '#073352');
    grad.addColorStop(1, '#031b2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 4) {
      const wave = Math.sin(y * 0.04) * 40 + Math.sin(y * 0.1) * 20;
      ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.fillRect(wave, y, canvas.width, 3);
    }

    ctx.fillStyle = '#22d3ee';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 12;
    for (let i = 0; i < 50; i++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const rad = 8 + Math.random() * 22;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 7. VITANIA — VITidy: Emerald and teal planet with organic continents & city grid lights
  public static createVitaniaTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#06241e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f513d';
    for (let i = 0; i < 35; i++) {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const rw = 50 + Math.random() * 110;
      const rh = 35 + Math.random() * 70;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rw, rh, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 8;
    for (let i = 0; i < 260; i++) {
      const px = Math.random() * canvas.width;
      const py = Math.random() * canvas.height;
      ctx.fillRect(px, py, 2.5, 2.5);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 8. ENNAVAL — Boutique Website: Elegant violet planet with luminous surface patterns
  public static createEnnavalTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#2e0854');
    grad.addColorStop(0.5, '#4c1d95');
    grad.addColorStop(1, '#2e0854');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 2) {
      const p = y / canvas.height;
      const wave = Math.sin(p * Math.PI * 14) * 60;
      const alpha = 0.25 + Math.sin(p * Math.PI * 28) * 0.2;
      ctx.fillStyle = `rgba(236, 72, 153, ${Math.max(0, alpha)})`;
      ctx.fillRect(wave, y, canvas.width, 2);
    }

    ctx.strokeStyle = '#facc15';
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;
    for (let k = 0; k < 6; k++) {
      ctx.beginPath();
      const baseY = 80 + k * 65;
      ctx.moveTo(0, baseY);
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.lineTo(x, baseY + Math.sin(x * 0.02 + k) * 35);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 9. TECHNORA — Skills: Electric blue planet with subtle circuit-like surface patterns
  public static createTechnoraTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#050c1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#0ea5e9';
    ctx.shadowBlur = 12;

    for (let i = 0; i < 50; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.moveTo(x, y);

      for (let step = 0; step < 6; step++) {
        const dir = Math.floor(Math.random() * 4);
        const dist = 25 + Math.random() * 45;
        if (dir === 0) x += dist;
        else if (dir === 1) x -= dist;
        else if (dir === 2) y += dist;
        else y -= dist;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 10. ACHIEVEMENTS — Golden planet with distinctive luminous atmosphere
  public static createAchievementsTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#78350f');
    grad.addColorStop(0.5, '#b45309');
    grad.addColorStop(1, '#78350f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 3) {
      const p = y / canvas.height;
      const wave = Math.sin(p * Math.PI * 10) * 50;
      const alpha = 0.3 + Math.sin(p * Math.PI * 20) * 0.25;
      ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0, alpha)})`;
      ctx.fillRect(wave, y, canvas.width, 3);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 11. Planetary Ring Texture
  public static createRingTexture(colorHex: string = '#d4af37'): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 1;
    const ctx = canvas.getContext('2d')!;

    for (let x = 0; x < 256; x++) {
      const p = x / 256;
      const gap = Math.sin(p * Math.PI * 20);
      const alpha = gap > 0 ? (Math.sin(p * Math.PI) * 0.85) : 0.08;
      ctx.fillStyle = colorHex;
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillRect(x, 0, 1, 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}
