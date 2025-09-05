import { useState, useEffect, useCallback, useRef } from 'react';
import type { SpeechRecognitionState, SpeechRecognitionEvent, SpeechRecognitionErrorEvent, SpeechRecognition } from '../types/speechRecognition';

export const useSpeechRecognition = () => {
  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    transcript: '',
    interimTranscript: '',
    error: null,
    isSupported: false,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check browser support on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setState(prev => ({ ...prev, isSupported: true }));
      
      // Initialize recognition
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      
      // Configure recognition
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'ja-JP'; // Japanese as default, can be made configurable
      
      // Event handlers
      recognition.onstart = () => {
        setState(prev => ({ ...prev, isListening: true, error: null }));
      };
      
      recognition.onend = () => {
        setState(prev => ({ ...prev, isListening: false }));
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        setState(prev => ({
          ...prev,
          transcript: prev.transcript + finalTranscript,
          interimTranscript,
        }));
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setState(prev => ({
          ...prev,
          error: event.error,
          isListening: false,
        }));
      };
    } else {
      setState(prev => ({ ...prev, isSupported: false }));
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !state.isListening) {
      recognitionRef.current.start();
    }
  }, [state.isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop();
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