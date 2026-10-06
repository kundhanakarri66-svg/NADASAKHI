export type SoundCategory =
  | 'safety'
  | 'household'
  | 'traffic'
  | 'human'
  | 'weather';

export interface SoundDetection {
  id: string;
  label: string;
  category: SoundCategory;
  confidence: number; // 0 to 1
  decibels?: number;
  detectedAt: string; // ISO 8601 string
  relativeTime: string;
  isUrgent: boolean;
  iconName: string;
}

export type MicrophoneStatus = 'inactive' | 'requesting' | 'active' | 'denied' | 'error';

export interface SoundGuardianState {
  isMonitoring: boolean;
  micStatus: MicrophoneStatus;
  currentSound: SoundDetection | null;
  recentDetections: SoundDetection[];
  ambientNoiseLevel: number; // dB approx 0-100
  sensitivityThreshold: number; // 0-100
}
