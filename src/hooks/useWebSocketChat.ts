import { useState, useEffect, useCallback, useRef } from 'react';
import type { ChatMessage, ChatState, WebSocketConfig } from '../types/chat';

const getWebSocketConfig = (): WebSocketConfig | null => {
  const wsUrl = import.meta.env.VITE_WEBSOCKET_URL;
  
  if (!wsUrl) {
    console.warn(
      'WebSocket configuration missing. Please set VITE_WEBSOCKET_URL environment variable.'
    );
    return null;
  }

  const clientId = Date.now().toString();
  
  return {
    url: wsUrl,
    clientId,
  };
};

export const useWebSocketChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isConnected: false,
    isConnecting: false,
    error: null,
    clientId: '',
  });

  const wsRef = useRef<WebSocket | null>(null);
  const configRef = useRef<WebSocketConfig | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const config = getWebSocketConfig();
    
    if (!config) {
      setState(prev => ({
        ...prev,
        error: 'WebSocket configuration missing',
      }));
      return;
    }

    configRef.current = config;
    setState(prev => ({
      ...prev,
      clientId: config.clientId,
      isConnecting: true,
      error: null,
    }));

    try {
      const ws = new WebSocket(`${config.url}/ws/${config.clientId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setState(prev => ({
          ...prev,
          isConnected: true,
          isConnecting: false,
          error: null,
        }));
        
        // Add welcome message
        setTimeout(() => {
          const welcomeMessage: ChatMessage = {
            id: `${Date.now()}-${Math.random()}`,
            content: 'チャットに接続しました！ 🎉',
            timestamp: new Date(),
            isOwn: false,
          };
          
          setState(prev => ({
            ...prev,
            messages: [...prev.messages, welcomeMessage],
          }));
        }, 500);
      };

      ws.onmessage = (event) => {
        const receivedMessage: ChatMessage = {
          id: `${Date.now()}-${Math.random()}`,
          content: event.data,
          timestamp: new Date(),
          isOwn: false,
        };
        
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, receivedMessage],
        }));
      };

      ws.onclose = () => {
        setState(prev => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
        }));
      };

      ws.onerror = () => {
        setState(prev => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
          error: 'WebSocket connection error',
        }));
      };

    } catch (error) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to initialize WebSocket',
      }));
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const addMessage = useCallback((content: string, isOwn: boolean, senderId?: string) => {
    const message: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      content,
      timestamp: new Date(),
      isOwn,
      senderId,
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setState(prev => ({
        ...prev,
        error: 'WebSocket not connected',
      }));
      return false;
    }

    if (!content.trim()) {
      return false;
    }

    try {
      // Add own message immediately
      addMessage(content, true, configRef.current?.clientId);
      
      // Send to WebSocket
      wsRef.current.send(content);
      return true;
    } catch {
      setState(prev => ({
        ...prev,
        error: 'Failed to send message',
      }));
      return false;
    }
  }, [addMessage]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    sendMessage,
    clearError,
  };
};