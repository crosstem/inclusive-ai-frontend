// Application-specific types for SpeechSynthesis
// Note: We use the built-in browser types for SpeechSynthesis API

// Application-specific types
export interface SpeechSynthesisState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  text: string;
  rate: number;
  pitch: number;
  volume: number;
  error: string | null;
}

export interface SpeechSynthesisSettings {
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
}