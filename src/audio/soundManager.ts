// Web Audio API procedural sound synthesizer
// Does not rely on any external audio files to prevent missing assets or 404s.

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private volume: number = 0.6;
  private masterGain: GainNode | null = null;
  
  // Oscillators and nodes for continuous ambient layers
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;

  private isStarted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public enableAudio(): boolean {
    try {
      this.initContext();
      this.isMuted = false;
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.3);
      }
      if (!this.isStarted) {
        this.startCosmicAmbience();
        this.isStarted = true;
      }
      return true;
    } catch (e) {
      console.warn('Web Audio could not start:', e);
      return false;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.ctx) {
      if (!this.isMuted) {
        this.enableAudio();
      }
      return !this.isMuted;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.volume, now + 0.15);
    }

    if (!this.isMuted && !this.isStarted) {
      this.startCosmicAmbience();
      this.isStarted = true;
    }

    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  private startCosmicAmbience() {
    if (!this.ctx || !this.masterGain) return;

    try {
      // 1. Deep Sub-bass Cosmic Drone (40Hz - 55Hz subtle binaural beating)
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(48, this.ctx.currentTime);

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sawtooth';
      this.droneOsc2.frequency.setValueAtTime(49.2, this.ctx.currentTime);

      this.droneOsc1.connect(this.droneFilter);
      this.droneOsc2.connect(this.droneFilter);
      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();

      // 2. Cosmic Wind / Deep Space Static (Brownian/Pink Noise)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 2.5; // Gain compensation
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.noiseFilter = this.ctx.createBiquadFilter();
      this.noiseFilter.type = 'bandpass';
      this.noiseFilter.frequency.setValueAtTime(220, this.ctx.currentTime);
      this.noiseFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.noiseNode.connect(this.noiseFilter);
      this.noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.masterGain);

      this.noiseNode.start();
    } catch (e) {
      console.warn('Could not start ambient layers:', e);
    }
  }

  // Play radio static burst / interference
  public triggerRadioInterference() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800 + Math.random() * 600, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignore audio glitches safely
    }
  }

  // Play supernatural whisper / presence cue
  public triggerEntityPresence() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(75, now + 0.8);
      osc.frequency.linearRampToValueAtTime(120, now + 1.4);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch {
      // audio error handling
    }
  }

  // Play terminal awakening charge
  public triggerTerminalAwakening() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 2.5);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 2.6);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 2.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.7);
    } catch {
      // safely ignore
    }
  }

  // Climax transformation shockwave & luminous chime
  public triggerTransformation() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;

      // Deep sonic boom
      const boom = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boom.type = 'sine';
      boom.frequency.setValueAtTime(180, now);
      boom.frequency.exponentialRampToValueAtTime(32, now + 1.8);
      boomGain.gain.setValueAtTime(0.35, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      boom.connect(boomGain);
      boomGain.connect(this.masterGain);
      boom.start(now);
      boom.stop(now + 2.0);

      // Shimmering harmonic chords
      const freqs = [440, 554.37, 659.25, 880, 1108.73];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const chime = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(freq, now + idx * 0.1);
        chimeGain.gain.setValueAtTime(0.001, now + idx * 0.1);
        chimeGain.gain.linearRampToValueAtTime(0.08, now + idx * 0.1 + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 3.0);
        chime.connect(chimeGain);
        chimeGain.connect(this.masterGain);
        chime.start(now + idx * 0.1);
        chime.stop(now + idx * 0.1 + 3.2);
      });

      // Shift base drone into a soothing futuristic major chord
      if (this.droneOsc1 && this.droneOsc2 && this.droneFilter) {
        this.droneOsc1.frequency.exponentialRampToValueAtTime(110, now + 3);
        this.droneOsc2.frequency.exponentialRampToValueAtTime(164.81, now + 3);
        this.droneFilter.frequency.exponentialRampToValueAtTime(450, now + 3);
      }
    } catch {
      // safely ignore
    }
  }

  // Futuristic UI click/hover feedback
  public triggerUiBlip() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore
    }
  }

  public resetToIntro() {
    if (!this.ctx || !this.droneOsc1 || !this.droneOsc2 || !this.droneFilter) return;
    try {
      const now = this.ctx.currentTime;
      this.droneOsc1.frequency.exponentialRampToValueAtTime(48, now + 0.5);
      this.droneOsc2.frequency.exponentialRampToValueAtTime(49.2, now + 0.5);
      this.droneFilter.frequency.exponentialRampToValueAtTime(140, now + 0.5);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
