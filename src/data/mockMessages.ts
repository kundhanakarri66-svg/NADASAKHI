import { CommunicationMessage } from '../types/communication.ts';

export const mockMessages: CommunicationMessage[] = [
  {
    id: 'msg-001',
    sender: 'hearing_companion',
    senderName: 'Dr. Anita (Colleague)',
    text: 'Good morning! Are we still reviewing the quarterly accessibility report at 11 AM?',
    modality: 'speech_transcription',
    timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    relativeTime: '40 mins ago',
    confidence: 0.96
  },
  {
    id: 'msg-002',
    sender: 'user',
    senderName: 'You',
    text: 'Yes Anita, I have prepared the summary slides. We can meet in conference room B.',
    modality: 'sign_recognition',
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    relativeTime: '35 mins ago',
    confidence: 0.92,
    signGloss: 'YES ANITA READY SLIDES MEET ROOM B'
  },
  {
    id: 'msg-003',
    sender: 'hearing_companion',
    senderName: 'Dr. Anita (Colleague)',
    text: 'Perfect. I will bring the printed feedback sheets as well.',
    modality: 'speech_transcription',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    relativeTime: '30 mins ago',
    confidence: 0.97
  },
  {
    id: 'msg-004',
    sender: 'user',
    senderName: 'You',
    text: 'Thank you! See you there.',
    modality: 'text',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    relativeTime: '25 mins ago'
  }
];
