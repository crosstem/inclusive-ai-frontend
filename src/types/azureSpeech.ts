// Azure Speech Service types
export interface AzureSpeechConfig {
  subscriptionKey: string;
  region: string;
  language?: string;
}

export interface AzureSpeechRecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
  isConnected: boolean;
}

export interface AzureSpeechRecognitionResult {
  text: string;
  reason: string;
  errorDetails?: string;
}

// Azure Text-to-Speech types
export interface AzureSpeechSynthesisState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  voices: AzureVoiceInfo[];
  selectedVoice: AzureVoiceInfo | null;
  text: string;
  rate: number;
  pitch: number;
  volume: number;
  error: string | null;
  isConnected: boolean;
}

export interface AzureVoiceInfo {
  name: string;
  displayName: string;
  localName: string;
  locale: string;
  gender: string;
  voiceType: string;
}

export interface AzureSpeechSynthesisSettings {
  voice: AzureVoiceInfo | null;
  rate: number;
  pitch: number;
  volume: number;
}