import { useState, useEffect, useCallback, useRef } from 'react';
import type { 
  SpeechSynthesisState, 
  SpeechSynthesisSettings
} from '../types/speechSynthesis';

export const useSpeechSynthesis = () => {
  const isSupported = 'speechSynthesis' in window;
  
  const [state, setState] = useState<SpeechSynthesisState>({
    isSupported,
    isSpeaking: false,
    isPaused: false,
    voices: [],
    selectedVoice: null,
    text: '',
    rate: 1,
    pitch: 1,
    volume: 1,
    error: null,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load voices
  useEffect(() => {
    if (isSupported) {
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Filter to get Japanese voices first, then fallback to others
        const japaneseVoices = voices.filter(voice => voice.lang.startsWith('ja'));
        const otherVoices = voices.filter(voice => !voice.lang.startsWith('ja'));
        const sortedVoices = [...japaneseVoices, ...otherVoices];
        
        setState(prev => ({
          ...prev,
          voices: sortedVoices,
          selectedVoice: prev.selectedVoice || sortedVoices.find(voice => voice.default) || sortedVoices[0] || null,
        }));
      };

      // Load voices immediately
      loadVoices();
      
      // Also listen for voices changed event (needed in some browsers)
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
    // isSupported is a stable reference determined at module scope
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = useCallback((text: string, settings?: Partial<SpeechSynthesisSettings>) => {
    if (!state.isSupported || !text.trim()) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new window.SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Apply settings
    utterance.voice = settings?.voice ?? state.selectedVoice;
    utterance.rate = settings?.rate ?? state.rate;
    utterance.pitch = settings?.pitch ?? state.pitch;
    utterance.volume = settings?.volume ?? state.volume;

    // Event handlers
    utterance.onstart = () => {
      setState(prev => ({ ...prev, isSpeaking: true, isPaused: false, error: null }));
    };

    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }));
    };

    utterance.onpause = () => {
      setState(prev => ({ ...prev, isPaused: true }));
    };

    utterance.onresume = () => {
      setState(prev => ({ ...prev, isPaused: false }));
    };

    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      setState(prev => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        error: event.error,
      }));
    };

    // Start speaking
    window.speechSynthesis.speak(utterance);
    setState(prev => ({ ...prev, text }));
  }, [state.isSupported, state.selectedVoice, state.rate, state.pitch, state.volume]);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState(prev => ({ ...prev, isSpeaking: false, isPaused: false }));
  }, []);

  const updateSettings = useCallback((settings: Partial<SpeechSynthesisSettings>) => {
    setState(prev => ({
      ...prev,
      selectedVoice: settings.voice !== undefined ? settings.voice : prev.selectedVoice,
      rate: settings.rate !== undefined ? settings.rate : prev.rate,
      pitch: settings.pitch !== undefined ? settings.pitch : prev.pitch,
      volume: settings.volume !== undefined ? settings.volume : prev.volume,
    }));
  }, []);

  const setText = useCallback((text: string) => {
    setState(prev => ({ ...prev, text }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

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