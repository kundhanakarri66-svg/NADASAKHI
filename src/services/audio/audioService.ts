/**
 * AudioService
 * Architecture wrapper for Web Audio API and audio stream acquisition
 */

export interface AudioMeterData {
  decibels: number; // 0-100 normalized
  frequencyData: Uint8Array | null;
}

export interface IAudioService {
  requestMicrophone(): Promise<MediaStream | null>;
  stopMicrophone(): void;
  getDecibelLevel(): number;
  isCapturing(): boolean;
}

class AudioServiceImpl implements IAudioService {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private capturing: boolean = false;

  async requestMicrophone(): Promise<MediaStream | null> {
    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        console.warn('[AudioService] MediaDevices getUserMedia is not supported in this environment.');
        return null;
      }
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.capturing = true;
      return this.mediaStream;
    } catch (err) {
      console.warn('[AudioService] Microphone permission or device access deferred/denied:', err);
      return null;
    }
  }

  stopMicrophone(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    this.analyser = null;
    this.capturing = false;
  }

  getDecibelLevel(): number {
    return 0;
  }

  isCapturing(): boolean {
    return this.capturing;
  }
}

export const audioService = new AudioServiceImpl();
