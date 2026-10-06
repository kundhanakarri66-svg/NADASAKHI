export type MessageSenderRole = 'user' | 'hearing_companion' | 'system';

export type MessageModality = 'text' | 'speech_transcription' | 'sign_recognition' | 'sound_alert';

export interface CommunicationMessage {
  id: string;
  sender: MessageSenderRole;
  senderName: string;
  text: string;
  modality: MessageModality;
  timestamp: string; // ISO 8601 string
  relativeTime: string;
  confidence?: number;
  signGloss?: string;
  isFlagged?: boolean;
}

export interface SpeechTranscript {
  id: string;
  text: string;
  isFinal: boolean;
  confidence: number;
  timestamp: string;
}
