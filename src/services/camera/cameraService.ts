/**
 * CameraService
 * Architecture wrapper for camera video streams for Sign Language Computer Vision
 */

export interface CameraOptions {
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
}

export interface ICameraService {
  startCamera(videoElement: HTMLVideoElement, options?: CameraOptions): Promise<boolean>;
  stopCamera(): void;
  isActive(): boolean;
}

class CameraServiceImpl implements ICameraService {
  private stream: MediaStream | null = null;
  private videoEl: HTMLVideoElement | null = null;

  async startCamera(videoElement: HTMLVideoElement, options?: CameraOptions): Promise<boolean> {
    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        console.warn('[CameraService] MediaDevices getUserMedia is not supported in this environment.');
        return false;
      }

      this.videoEl = videoElement;
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: options?.width || 640 },
          height: { ideal: options?.height || 480 },
          facingMode: options?.facingMode || 'user'
        },
        audio: false
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (this.videoEl) {
        this.videoEl.srcObject = this.stream;
        await this.videoEl.play();
      }
      return true;
    } catch (err) {
      console.warn('[CameraService] Camera access deferred/denied:', err);
      return false;
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.videoEl) {
      this.videoEl.srcObject = null;
      this.videoEl = null;
    }
  }

  isActive(): boolean {
    return this.stream !== null && this.stream.active;
  }
}

export const cameraService = new CameraServiceImpl();
