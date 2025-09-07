import { useState, useEffect, useCallback, useRef } from "react";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import type {
  AzureSpeechSynthesisState,
  AzureSpeechConfig,
  AzureVoiceInfo,
  AzureSpeechSynthesisSettings,
} from "../types/azureSpeech";

const getAzureConfig = (): AzureSpeechConfig | null => {
  const subscriptionKey = import.meta.env.VITE_AZURE_SPEECH_KEY;
  const region = import.meta.env.VITE_AZURE_SPEECH_REGION;

  if (!subscriptionKey || !region) {
    console.warn(
      "Azure Speech configuration missing. Please set VITE_AZURE_SPEECH_KEY and VITE_AZURE_SPEECH_REGION environment variables."
    );
    return null;
  }

  return {
    subscriptionKey,
    region,
    language: "ja-JP", // Japanese as default, matching Web Speech API
  };
};

export const useAzureSpeechSynthesis = () => {
  const [state, setState] = useState<AzureSpeechSynthesisState>({
    isSupported: false,
    isSpeaking: false,
    isPaused: false,
    voices: [],
    selectedVoice: null,
    text: "",
    rate: 1,
    pitch: 1,
    volume: 1,
    error: null,
    isConnected: false,
  });

  const synthesizerRef = useRef<speechsdk.SpeechSynthesizer | null>(null);
  const speechConfigRef = useRef<speechsdk.SpeechConfig | null>(null);

  // Initialize Azure Speech SDK
  useEffect(() => {
    const config = getAzureConfig();

    if (!config) {
      setState((prev) => ({
        ...prev,
        isSupported: false,
        error: "Azure Speech configuration missing",
      }));
      return;
    }

    try {
      // Create speech config
      const speechConfig = speechsdk.SpeechConfig.fromSubscription(
        config.subscriptionKey,
        config.region
      );
      speechConfig.speechSynthesisLanguage = config.language || "ja-JP";
      speechConfigRef.current = speechConfig;

      // Create synthesizer
      const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput();
      synthesizerRef.current = new speechsdk.SpeechSynthesizer(
        speechConfig,
        audioConfig
      );

      setState((prev) => ({
        ...prev,
        isSupported: true,
        isConnected: true,
      }));

      // Load available voices
      loadVoices();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isSupported: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to initialize Azure Speech SDK",
      }));
    }

    return () => {
      if (synthesizerRef.current) {
        synthesizerRef.current.close();
      }
    };
  }, []);

  const loadVoices = useCallback(() => {
    if (!speechConfigRef.current) return;

    // Use supported Neural voices only - Standard voices like Ayumi and Ichiro have been deprecated
    const defaultVoices: AzureVoiceInfo[] = [
      {
        name: "ja-JP-NanamiNeural",
        displayName: "Nanami (Neural)",
        localName: "ななみ",
        locale: "ja-JP",
        gender: "Female",
        voiceType: "Neural",
      },
      {
        name: "ja-JP-KeitaNeural",
        displayName: "Keita (Neural)",
        localName: "けいた",
        locale: "ja-JP",
        gender: "Male",
        voiceType: "Neural",
      },
    ];

    setState((prev) => ({
      ...prev,
      voices: defaultVoices,
      selectedVoice: prev.selectedVoice || defaultVoices[0] || null,
    }));
  }, []);

  const speak = useCallback(
    (text: string, settings?: Partial<AzureSpeechSynthesisSettings>) => {
      if (!synthesizerRef.current || !text.trim()) return;

      // Stop any ongoing speech
      stop();

      const voice = settings?.voice ?? state.selectedVoice;
      const rate = settings?.rate ?? state.rate;
      const pitch = settings?.pitch ?? state.pitch;
      const volume = settings?.volume ?? state.volume;

      if (!voice) {
        setState((prev) => ({ ...prev, error: "No voice selected" }));
        return;
      }

      // Create SSML with voice and prosody settings
      const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${
        voice.locale
      }">
        <voice name="${voice.name}">
          <prosody rate="${rate}" pitch="${pitch > 1 ? "+" : ""}${(
        (pitch - 1) *
        50
      ).toFixed(0)}%" volume="${(volume * 100).toFixed(0)}%">
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

      setState((prev) => ({
        ...prev,
        isSpeaking: true,
        isPaused: false,
        error: null,
        text,
      }));

      synthesizerRef.current.speakSsmlAsync(
        ssml,
        (result: speechsdk.SpeechSynthesisResult) => {
          if (
            result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted
          ) {
            setState((prev) => ({
              ...prev,
              isSpeaking: false,
              isPaused: false,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              isSpeaking: false,
              isPaused: false,
              error: result.errorDetails || "Speech synthesis failed",
            }));
          }
        }
      );
    },
    [state.selectedVoice, state.rate, state.pitch, state.volume]
  );

  const stop = useCallback(() => {
    if (synthesizerRef.current) {
      synthesizerRef.current.close();

      // Recreate synthesizer for next use
      if (speechConfigRef.current) {
        const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput();
        synthesizerRef.current = new speechsdk.SpeechSynthesizer(
          speechConfigRef.current,
          audioConfig
        );
      }
    }
    setState((prev) => ({ ...prev, isSpeaking: false, isPaused: false }));
  }, []);

  const updateSettings = useCallback(
    (settings: Partial<AzureSpeechSynthesisSettings>) => {
      setState((prev) => ({
        ...prev,
        selectedVoice:
          settings.voice !== undefined ? settings.voice : prev.selectedVoice,
        rate: settings.rate !== undefined ? settings.rate : prev.rate,
        pitch: settings.pitch !== undefined ? settings.pitch : prev.pitch,
        volume: settings.volume !== undefined ? settings.volume : prev.volume,
      }));
    },
    []
  );

  const setText = useCallback((text: string) => {
    setState((prev) => ({ ...prev, text }));
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    speak,
    stop,
    updateSettings,
    setText,
    clearError,
  };
};
