export interface ActivityItem {
  id: string;
  type: 'sound' | 'sign' | 'speech' | 'alert' | 'system';
  title: string;
  description: string;
  timestamp: string;
  relativeTime: string;
  status: 'normal' | 'attention' | 'critical';
}

export const mockRecentActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'sound',
    title: 'Doorbell detected',
    description: 'Front door acoustic chime identified with 94% confidence.',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    relativeTime: '2m ago',
    status: 'normal'
  },
  {
    id: 'act-2',
    type: 'sign',
    title: 'Sign recognized: "THANK YOU"',
    description: 'Right hand gesture converted to text.',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    relativeTime: '8m ago',
    status: 'normal'
  },
  {
    id: 'act-3',
    type: 'sound',
    title: 'Vehicle horn detected',
    description: 'High intensity acoustic signal (86 dB) outside.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    relativeTime: '15m ago',
    status: 'attention'
  },
  {
    id: 'act-4',
    type: 'speech',
    title: 'Voice transcribed: "Conference room ready"',
    description: 'Speech from conversation converted into text transcript.',
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    relativeTime: '35m ago',
    status: 'normal'
  }
];
