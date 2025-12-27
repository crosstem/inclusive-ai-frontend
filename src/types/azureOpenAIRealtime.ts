// Azure OpenAI Realtime API TypeScript definitions

export interface AzureOpenAIRealtimeConfig {
  endpoint: string;
  apiKey: string;
  deployment: string;
  voice: string;
  instructions?: string;
  location: string;
}

export interface RealtimeSessionResponse {
  id: string;
  model: string;
  voice: string;
  client_secret?: {
    value: string;
  };
  webrtc_url?: string;
}

export interface RealtimeMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
}

export interface RealtimeSessionEvent {
  type: string;
  session?: {
    instructions?: string;
    voice?: string;
    input_audio_format?: string;
    output_audio_format?: string;
  };
  error?: {
    message: string;
    code?: string;
  };
  audio?: {
    data?: string;
  };
  text?: string;
}

export interface RealtimeSessionState {
  sessionId: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  isRecording: boolean;
  isSpeaking: boolean;
  messages: RealtimeMessage[];
  error: string | null;
  peerConnection: RTCPeerConnection | null;
  dataChannel: RTCDataChannel | null;
  audioElement: HTMLAudioElement | null;
}

export interface WebRTCConnectionConfig {
  iceServers: RTCIceServer[];
  iceCandidatePoolSize?: number;
}

// Event types for the realtime session
export type RealtimeEventType = 
  | 'session.create'
  | 'session.update' 
  | 'session.end'
  | 'session.error'
  | 'input_audio_buffer.append'
  | 'input_audio_buffer.commit'
  | 'input_audio_buffer.clear'
  | 'conversation.item.create'
  | 'conversation.item.delete'
  | 'response.create'
  | 'response.cancel';