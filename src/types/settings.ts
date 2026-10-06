export type ThemeMode = 'light' | 'dark' | 'system';

export type AlertNotificationType = 'visual_flash' | 'vibration' | 'banner' | 'sound_playback';

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  vibrationAlerts: boolean;
  browserNotifications: boolean;
  visualFlashAlerts: boolean;
  soundAlertSensitivity: 'low' | 'medium' | 'high'; // 30, 60, 90 dB thresholds
  preferredSignLanguage: 'ISL' | 'ASL' | 'BSL'; // Indian Sign Language, American Sign Language, British Sign Language
  language: 'en' | 'hi' | 'te' | 'ta' | 'kn'; // English, Hindi, Telugu, Tamil, Kannada
  theme: ThemeMode;
}

export interface UserPreferences {
  userName: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  autoStartMonitoring: boolean;
}
