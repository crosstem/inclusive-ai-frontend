// Azure OpenAI Text-to-Speech types
export interface AzureTextToSpeechConfig {
  apiKey: string;
  endpoint: string;
  deploymentName?: string;
}

export interface AzureTextToSpeechState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  isLoading: boolean;
  error: string | null;
  text: string;
  voice: string;
  speed: number;
  audioUrl: string | null;
}

export interface AzureTextToSpeechSettings {
  voice: string;
  speed: number;
}

export interface AzureTextToSpeechResponse {
  audioContent: ArrayBuffer;
  contentType: string;
}

// Available Azure OpenAI TTS voices
export const AZURE_TTS_VOICES = [
  { id: 'alloy', name: 'Alloy' },
  { id: 'echo', name: 'Echo' },
  { id: 'fable', name: 'Fable' },
  { id: 'onyx', name: 'Onyx' },
  { id: 'nova', name: 'Nova' },
  { id: 'shimmer', name: 'Shimmer' },
] as const;

export type AzureTTSVoiceId = typeof AZURE_TTS_VOICES[number]['id'];