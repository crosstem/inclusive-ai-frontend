import { useState, useEffect, useCallback, useRef } from 'react';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';
import type { AzureSpeechRecognitionState, AzureSpeechConfig } from '../types/azureSpeech';

const getAzureConfig = (): AzureSpeechConfig | null => {
  const subscriptionKey = import.meta.env.VITE_AZURE_SPEECH_KEY;
  const region = import.meta.env.VITE_AZURE_SPEECH_REGION;
  
  if (!subscriptionKey || !region) {
    console.warn('Azure Speech configuration missing. Please set VITE_AZURE_SPEECH_KEY and VITE_AZURE_SPEECH_REGION environment variables.');
    return null;
  }
  
  return {
    subscriptionKey,
    region,
    language: 'ja-JP', // Japanese as default, matching Web Speech API
  };
};

export const useAzureSpeechRecognition = () => {
  const [state, setState] = useState<AzureSpeechRecognitionState>({
    isListening: false,
    transcript: '',
    interimTranscript: '',
    error: null,
    isSupported: false,
    isConnected: false,
  });

  const recognizerRef = useRef<speechsdk.SpeechRecognizer | null>(null);
  const audioConfigRef = useRef<speechsdk.AudioConfig | null>(null);

  // Initialize Azure Speech SDK
  useEffect(() => {
    const config = getAzureConfig();
    
    if (!config) {
      setState(prev => ({ 
        ...prev, 
        isSupported: false, 
        error: 'Azure Speech configuration missing' 
      }));
      return;
    }

    try {
      // Create speech config
      const speechConfig = speechsdk.SpeechConfig.fromSubscription(
        config.subscriptionKey,
        config.region
      );
      speechConfig.speechRecognitionLanguage = config.language || 'ja-JP';
      speechConfig.enableDictation();

      // Create audio config
      audioConfigRef.current = speechsdk.AudioConfig.fromDefaultMicrophoneInput();

      // Create recognizer
      recognizerRef.current = new speechsdk.SpeechRecognizer(
        speechConfig,
        audioConfigRef.current
      );

      const recognizer = recognizerRef.current;

      // Event handlers
      recognizer.recognizing = (_, e) => {
        setState(prev => ({
          ...prev,
          interimTranscript: e.result.text,
        }));
      };

      recognizer.recognized = (_, e) => {
        if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          setState(prev => ({
            ...prev,
            transcript: prev.transcript + e.result.text,
            interimTranscript: '',
          }));
        }
      };

      recognizer.canceled = (_, e) => {
        setState(prev => ({
          ...prev,
          error: e.errorDetails || 'Recognition canceled',
          isListening: false,
        }));
      };

      recognizer.sessionStarted = () => {
        setState(prev => ({ 
          ...prev, 
          isListening: true, 
          isConnected: true, 
          error: null 
        }));
      };

      recognizer.sessionStopped = () => {
        setState(prev => ({ 
          ...prev, 
          isListening: false, 
          isConnected: false 
        }));
      };

      setState(prev => ({ ...prev, isSupported: true }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        isSupported: false,
        error: error instanceof Error ? error.message : 'Failed to initialize Azure Speech SDK',
      }));
    }

    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.close();
      }
      if (audioConfigRef.current) {
        audioConfigRef.current.close();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognizerRef.current && !state.isListening) {
      recognizerRef.current.startContinuousRecognitionAsync(
        () => {
          // Success callback handled by event handlers
        },
        (error) => {
          setState(prev => ({
            ...prev,
            error: error.toString(),
            isListening: false,
          }));
        }
      );
    }
  }, [state.isListening]);

  const stopListening = useCallback(() => {
    if (recognizerRef.current && state.isListening) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          setState(prev => ({ ...prev, isListening: false }));
        },
        (error) => {
          setState(prev => ({
            ...prev,
            error: error.toString(),
            isListening: false,
          }));
        }
      );
    }
  }, [state.isListening]);

  const clearTranscript = useCallback(() => {
    setState(prev => ({
      ...prev,
      transcript: '',
      interimTranscript: '',
      error: null,
    }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    clearTranscript,
  };
};