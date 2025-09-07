import { useState, useEffect, useCallback, useRef } from 'react';
import type { 
  AzureOpenAIRealtimeConfig,
  RealtimeSessionResponse,
  RealtimeSessionState,
  RealtimeMessage,
  RealtimeSessionEvent
} from '../types/azureOpenAIRealtime';

const getAzureOpenAIConfig = (): AzureOpenAIRealtimeConfig | null => {
  const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
  const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
  const deployment = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT;
  const voice = import.meta.env.VITE_AZURE_OPENAI_VOICE;

  if (!endpoint || !apiKey || !deployment || !voice) {
    console.warn(
      'Azure OpenAI Realtime API configuration missing. Please set VITE_AZURE_OPENAI_ENDPOINT, VITE_AZURE_OPENAI_API_KEY, VITE_AZURE_OPENAI_DEPLOYMENT, and VITE_AZURE_OPENAI_VOICE environment variables.'
    );
    return null;
  }

  return {
    endpoint: endpoint.replace(/\/$/, ''), // Remove trailing slash
    apiKey,
    deployment,
    voice,
    instructions: "You are a helpful assistant. Be concise and friendly.",
  };
};

export const useAzureOpenAIRealtime = () => {
  const [state, setState] = useState<RealtimeSessionState>({
    sessionId: null,
    isConnected: false,
    isConnecting: false,
    isRecording: false,
    isSpeaking: false,
    messages: [],
    error: null,
    peerConnection: null,
    dataChannel: null,
    audioElement: null,
  });

  const configRef = useRef<AzureOpenAIRealtimeConfig | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Initialize configuration
  useEffect(() => {
    const config = getAzureOpenAIConfig();
    configRef.current = config;

    if (!config) {
      setState(prev => ({
        ...prev,
        error: 'Azure OpenAI Realtime API configuration missing'
      }));
    }
  }, []);

  // Add message to the chat
  const addMessage = useCallback((content: string, type: 'user' | 'assistant' | 'system', isAudio = false) => {
    const message: RealtimeMessage = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      content,
      timestamp: new Date(),
      isAudio,
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }, []);

  // Start a new realtime session
  const startSession = useCallback(async () => {
    const config = configRef.current;
    if (!config) {
      setState(prev => ({ ...prev, error: 'Configuration not available' }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Create session using Azure OpenAI Sessions API
      const sessionsUrl = `${config.endpoint}/openai/realtime/sessions?api-version=2024-10-01-preview`;
      
      const response = await fetch(sessionsUrl, {
        method: 'POST',
        headers: {
          'api-key': config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: config.deployment,
          voice: config.voice,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.status} ${response.statusText}`);
      }

      const sessionData: RealtimeSessionResponse = await response.json();
      const ephemeralKey = sessionData.client_secret?.value;

      if (!ephemeralKey) {
        throw new Error('No ephemeral key received from session API');
      }

      // Initialize WebRTC connection
      await initializeWebRTC(ephemeralKey, sessionData.id, config);

      addMessage('Session started successfully', 'system');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start session';
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }));
      addMessage(`Error: ${errorMessage}`, 'system');
    }
  }, [addMessage]);

  // Initialize WebRTC connection
  const initializeWebRTC = useCallback(async (ephemeralKey: string, sessionId: string, config: AzureOpenAIRealtimeConfig) => {
    try {
      // Create peer connection
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      // Set up audio element for playback
      const audioElement = document.createElement('audio');
      audioElement.autoplay = true;
      audioElement.controls = false;

      // Handle remote audio stream
      peerConnection.ontrack = (event) => {
        audioElement.srcObject = event.streams[0];
        setState(prev => ({ ...prev, isSpeaking: true }));
      };

      // Get user media for microphone
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = mediaStream;
      
      const audioTrack = mediaStream.getAudioTracks()[0];
      peerConnection.addTrack(audioTrack, mediaStream);

      // Create data channel for events
      const dataChannel = peerConnection.createDataChannel('realtime-channel');

      dataChannel.addEventListener('open', () => {
        console.log('Data channel opened');
        // Send session update with instructions
        const updateEvent: RealtimeSessionEvent = {
          type: 'session.update',
          session: {
            instructions: config.instructions,
          },
        };
        dataChannel.send(JSON.stringify(updateEvent));
        addMessage('Connected to Azure OpenAI Realtime API', 'system');
      });

      dataChannel.addEventListener('message', (event) => {
        try {
          const realtimeEvent: RealtimeSessionEvent = JSON.parse(event.data);
          handleRealtimeEvent(realtimeEvent);
        } catch (error) {
          console.error('Error parsing realtime event:', error);
        }
      });

      dataChannel.addEventListener('close', () => {
        console.log('Data channel closed');
        setState(prev => ({
          ...prev,
          isConnected: false,
          isSpeaking: false,
        }));
      });

      // Create and set offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Send SDP to WebRTC endpoint
      const webrtcUrl = `${config.endpoint}/openai/realtime/webrtc?api-version=2024-10-01-preview&model=${config.deployment}`;
      
      const sdpResponse = await fetch(webrtcUrl, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          'Authorization': `Bearer ${ephemeralKey}`,
          'Content-Type': 'application/sdp',
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(`WebRTC connection failed: ${sdpResponse.status}`);
      }

      const answerSdp = await sdpResponse.text();
      const answer: RTCSessionDescriptionInit = { type: 'answer', sdp: answerSdp };
      await peerConnection.setRemoteDescription(answer);

      setState(prev => ({
        ...prev,
        sessionId,
        isConnected: true,
        isConnecting: false,
        peerConnection,
        dataChannel,
        audioElement,
      }));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'WebRTC initialization failed';
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, [addMessage]);

  // Handle realtime events from the server
  const handleRealtimeEvent = useCallback((event: RealtimeSessionEvent) => {
    console.log('Received realtime event:', event);

    switch (event.type) {
      case 'session.update':
        // Session updated successfully
        break;
      case 'session.error':
        const errorMessage = event.error?.message || 'Session error occurred';
        setState(prev => ({ ...prev, error: errorMessage }));
        addMessage(`Session error: ${errorMessage}`, 'system');
        break;
      case 'session.end':
        addMessage('Session ended by server', 'system');
        stopSession();
        break;
      default:
        // Handle other event types as needed
        if (event.text) {
          addMessage(event.text, 'assistant');
        }
        break;
    }
  }, [addMessage]);

  // Stop the current session
  const stopSession = useCallback(() => {
    if (state.dataChannel) {
      state.dataChannel.close();
    }
    if (state.peerConnection) {
      state.peerConnection.close();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (state.audioElement) {
      state.audioElement.srcObject = null;
    }

    setState(prev => ({
      ...prev,
      sessionId: null,
      isConnected: false,
      isConnecting: false,
      isRecording: false,
      isSpeaking: false,
      peerConnection: null,
      dataChannel: null,
      audioElement: null,
    }));

    addMessage('Session stopped', 'system');
  }, [state.dataChannel, state.peerConnection, state.audioElement, addMessage]);

  // Send a text message (for manual text input)
  const sendMessage = useCallback((text: string) => {
    if (!state.dataChannel || !state.isConnected) {
      addMessage('Not connected to session', 'system');
      return;
    }

    try {
      const event: RealtimeSessionEvent = {
        type: 'conversation.item.create',
        text: text,
      };
      
      state.dataChannel.send(JSON.stringify(event));
      addMessage(text, 'user');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      addMessage(`Error sending message: ${errorMessage}`, 'system');
    }
  }, [state.dataChannel, state.isConnected, addMessage]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.peerConnection) {
        state.peerConnection.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [state.peerConnection]);

  return {
    ...state,
    startSession,
    stopSession,
    sendMessage,
    clearError,
  };
};