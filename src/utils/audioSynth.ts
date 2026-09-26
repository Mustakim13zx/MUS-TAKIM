// Web Audio API helper for simulated Dolby Atmos & 3D Spatial Audio preview

class AudioSpatialEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private activeNodes: { oscs: OscillatorNode[]; gain: GainNode } | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playCinematicSwell(presetId: string = 'atmos-7-1'): Promise<void> {
    this.stop();
    this.initContext();
    if (!this.ctx) return Promise.resolve();

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.8);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);
    masterGain.connect(this.ctx.destination);

    // Stereo Panner
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (panner) {
      panner.pan.setValueAtTime(-0.8, now);
      panner.pan.linearRampToValueAtTime(0.8, now + 2.5);
      panner.pan.linearRampToValueAtTime(0, now + 4.5);
      panner.connect(masterGain);
    }

    const targetNode: AudioNode = panner || masterGain;

    // Frequencies based on preset
    let freqs = [55, 110, 164.81, 220]; // A1, A2, E3, A3 deep cinematic chord
    if (presetId === 'imax-bass') {
      freqs = [38, 76, 114, 152]; // Deep sub rumble
    } else if (presetId === 'studio-master') {
      freqs = [65.41, 130.81, 196, 261.63]; // C2, C3, G3, C4
    } else if (presetId === 'night-intimate') {
      freqs = [82.41, 123.47, 164.81, 246.94]; // E2, B2, E3, B3
    }

    const oscs: OscillatorNode[] = [];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Pitch sweep up slightly for cinematic tension
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 3.0);

      const amp = idx === 0 ? 0.4 : 0.2 / idx;
      oscGain.gain.setValueAtTime(amp, now);

      osc.connect(oscGain);
      oscGain.connect(targetNode);
      osc.start(now);
      osc.stop(now + 4.6);
      oscs.push(osc);
    });

    this.isPlaying = true;
    this.activeNodes = { oscs, gain: masterGain };

    return new Promise((resolve) => {
      setTimeout(() => {
        this.isPlaying = false;
        resolve();
      }, 4600);
    });
  }

  public stop() {
    if (this.activeNodes) {
      try {
        this.activeNodes.oscs.forEach((osc) => {
          try {
            osc.stop();
          } catch {
            // already stopped
          }
        });
      } catch {
        // ignore
      }
      this.activeNodes = null;
    }
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioSpatial = new AudioSpatialEngine();
