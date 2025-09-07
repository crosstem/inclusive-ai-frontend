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