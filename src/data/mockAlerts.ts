import { Alert } from '../types/alerts.ts';

export const mockAlerts: Alert[] = [
  {
    id: 'alt-001',
    title: 'Doorbell detected',
    description: 'High frequency chime detected at front entrance area.',
    category: 'environmental_sound',
    severity: 'medium',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    relativeTime: '2 minutes ago',
    source: 'Sound Guardian · Microphone A',
    read: false,
    soundType: 'Doorbell / Chime',
    confidenceScore: 0.94,
    actionRecommended: 'Someone may be waiting at your door.'
  },
  {
    id: 'alt-002',
    title: 'Vehicle horn detected',
    description: 'Loud acoustic burst detected outside (approx. 85 dB).',
    category: 'environmental_sound',
    severity: 'high',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    relativeTime: '15 minutes ago',
    source: 'Sound Guardian · Outdoor Array',
    read: false,
    soundType: 'Automobile Horn',
    confidenceScore: 0.91,
    actionRecommended: 'Look around for vehicular traffic if walking.'
  },
  {
    id: 'alt-003',
    title: 'Fire alarm sound detected',
    description: 'Continuous temporal siren oscillation detected in hallway.',
    category: 'emergency',
    severity: 'critical',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    relativeTime: '1 hour ago',
    source: 'Emergency Acoustic Sensor',
    read: true,
    soundType: 'Smoke / Fire Alarm',
    confidenceScore: 0.98,
    actionRecommended: 'Check surroundings and verify exit pathway safety.'
  },
  {
    id: 'alt-004',
    title: 'Microwave timer beep',
    description: 'Triple intermittent beep detected in kitchen.',
    category: 'environmental_sound',
    severity: 'low',
    timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    relativeTime: '3 hours ago',
    source: 'Sound Guardian · Kitchen Sensor',
    read: true,
    soundType: 'Appliance Notification',
    confidenceScore: 0.88,
    actionRecommended: 'Appliance cycle has completed.'
  },
  {
    id: 'alt-005',
    title: 'Dog barking detected',
    description: 'Repetitive vocalization detected near patio door.',
    category: 'environmental_sound',
    severity: 'medium',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    relativeTime: '5 hours ago',
    source: 'Sound Guardian · Living Room Sensor',
    read: true,
    soundType: 'Dog Bark',
    confidenceScore: 0.92,
    actionRecommended: 'Check perimeter or pet.'
  }
];
