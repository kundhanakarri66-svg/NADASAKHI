export type CameraStatus = 'inactive' | 'requesting' | 'active' | 'denied' | 'error';

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface SignRecognitionResult {
  id: string;
  signGloss: string; // e.g. "HELLO", "THANK YOU", "HELP"
  translatedText: string;
  confidence: number; // 0 to 1
  timestamp: string;
  detectedHand: 'left' | 'right' | 'both';
  landmarksDetected: boolean;
}

export interface SignLibraryItem {
  id: string;
  gloss: string;
  category: 'greetings' | 'emergency' | 'questions' | 'common' | 'numbers' | 'alphabet';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  handPositionDescription: string;
}

export interface TextToSignConversion {
  id: string;
  inputText: string;
  detectedGlosses: string[];
  animationSequenceId?: string;
  timestamp: string;
}
