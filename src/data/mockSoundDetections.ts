import { SoundDetection } from '../types/sound.ts';

export const mockSoundDetections: SoundDetection[] = [
  {
    id: 'snd-001',
    label: 'Doorbell Chime',
    category: 'household',
    confidence: 0.94,
    decibels: 68,
    detectedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    relativeTime: '2 mins ago',
    isUrgent: false,
    iconName: 'Bell'
  },
  {
    id: 'snd-002',
    label: 'Vehicle Horn',
    category: 'traffic',
    confidence: 0.91,
    decibels: 86,
    detectedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    relativeTime: '15 mins ago',
    isUrgent: true,
    iconName: 'AlertTriangle'
  },
  {
    id: 'snd-003',
    label: 'Fire Alarm Siren',
    category: 'safety',
    confidence: 0.98,
    decibels: 92,
    detectedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    relativeTime: '1 hour ago',
    isUrgent: true,
    iconName: 'Flame'
  },
  {
    id: 'snd-004',
    label: 'Kettle Whistling',
    category: 'household',
    confidence: 0.89,
    decibels: 72,
    detectedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    relativeTime: '2 hours ago',
    isUrgent: false,
    iconName: 'Coffee'
  },
  {
    id: 'snd-005',
    label: 'Infant Crying',
    category: 'human',
    confidence: 0.87,
    decibels: 76,
    detectedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    relativeTime: '4 hours ago',
    isUrgent: true,
    iconName: 'HeartPulse'
  }
];
