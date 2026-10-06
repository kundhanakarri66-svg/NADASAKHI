/**
 * SpeechService
 * Architecture wrapper for Speech Recognition & Text-to-Speech synthesis
 */

import { SpeechTranscript } from '../../types/communication.ts';

export interface ISpeechService {
  isSupported(): boolean;
  startRecognition(
    onResult: (transcript: SpeechTranscript) => void,
    onError?: (error: string) => void
  ): Promise<boolean>;
  stopRecognition(): void;
  speakText(text: string, lang?: string): void;
  isListening(): boolean;
}

class SpeechServiceImpl implements ISpeechService {
  private listening: boolean = false;

  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  async startRecognition(
    onResult: (transcript: SpeechTranscript) => void,
    onError?: (error: string) => void
  ): Promise<boolean> {
    console.info('[SpeechService] Recognition requested (Step 1 placeholder wrapper).');
    this.listening = true;
    return true;
  }

  stopRecognition(): void {
    this.listening = false;
    console.info('[SpeechService] Recognition stopped.');
  }

  speakText(text: string, lang: string = 'en-US'): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  }

  isListening(): boolean {
    return this.listening;
  }
}

export const speechService = new SpeechServiceImpl();
