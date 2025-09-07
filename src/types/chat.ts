export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  senderId?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  clientId: string;
}

export interface WebSocketConfig {
  url: string;
  clientId: string;
}