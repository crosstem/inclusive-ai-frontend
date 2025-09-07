import { useState, useCallback, useRef } from 'react';
import type { 
  AzureTextToSpeechState, 
  AzureTextToSpeechSettings,
  AzureTTSVoiceId,
} from '../types/azureTextToSpeech';
import { getAzureOpenAIConfig } from '../utils/azureOpenAIConfig';

export const useAzureTextToSpeech = () => {
  const [state, setState] = useState<AzureTextToSpeechState>({
    isSupported: false,
    isSpeaking: false,
    isPaused: false,
    isLoading: false,
    error: null,
    text: '',
    voice: 'alloy',
    speed: 1.0,
    audioUrl: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize configuration check
  const checkConfiguration = useCallback(() => {
    const config = getAzureOpenAIConfig();
    
    if (!config) {
      setState(prev => ({ 
        ...prev, 
        isSupported: false, 
        error: 'Azure OpenAI configuration missing. Please check your environment variables.' 
      }));
      return false;
    }

    setState(prev => ({ ...prev, isSupported: true, error: null }));
    return true;
  }, []);

  const speak = useCallback(async (text: string, settings?: Partial<AzureTextToSpeechSettings>) => {
    if (!text.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const config = getAzureOpenAIConfig();
      if (!config) {
        throw new Error('Azure OpenAI configuration missing');
      }

      const voice = (settings?.voice || state.voice) as AzureTTSVoiceId;
      const speed = settings?.speed || state.speed;

      // Call Azure OpenAI TTS API directly using fetch
      const response = await fetch(`${config.endpoint}/openai/deployments/${config.deploymentName}/audio/speech?api-version=2024-02-15-preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': config.apiKey,
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: text,
          voice: voice,
          speed: speed,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Azure OpenAI API error: ${response.status} ${response.statusText}. ${errorData}`);
      }

      // Convert the response to blob and create audio URL
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Clean up previous audio URL
      if (state.audioUrl) {
        URL.revokeObjectURL(state.audioUrl);
      }

      setState(prev => ({ 
        ...prev, 
        audioUrl,
        text,
        voice,
        speed,
        isLoading: false,
      }));

      // Create and play audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        setState(prev => ({ ...prev, isSpeaking: true, isPaused: false }));
      };

      audio.onpause = () => {
        setState(prev => ({ ...prev, isPaused: true }));
      };

      audio.onended = () => {
        setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }));
      };

      audio.onerror = () => {
        setState(prev => ({ 
          ...prev, 
          isSpeaking: false, 
          isPaused: false,
          error: 'Audio playback error'
        }));
      };

      await audio.play();
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to generate speech',
      }));
    }
  }, [state.voice, state.speed, state.audioUrl]);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }));
  }, []);

  const updateSettings = useCallback((settings: Partial<AzureTextToSpeechSettings>) => {
    setState(prev => ({
      ...prev,
      voice: settings.voice !== undefined ? settings.voice : prev.voice,
      speed: settings.speed !== undefined ? settings.speed : prev.speed,
    }));
  }, []);

  const setText = useCallback((text: string) => {
    setState(prev => ({ ...prev, text }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Check configuration when hook is first used
  useState(() => {
    checkConfiguration();
  });

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
    updateSettings,
    setText,
    clearError,
  };
};