import React from 'react';
import { TextToSpeechControl } from '../../molecules/TextToSpeechControl';
import { VoiceSettings } from '../../molecules/VoiceSettings';
import { useSpeechSynthesis } from '../../../hooks/useSpeechSynthesis';
import './TextToSpeechPanel.css';

export interface TextToSpeechPanelProps {
  className?: string;
}

export const TextToSpeechPanel: React.FC<TextToSpeechPanelProps> = ({
  className = '',
}) => {
  const {
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    selectedVoice,
    text,
    rate,
    pitch,
    volume,
    error,
    speak,
    pause,
    resume,
    stop,
    updateSettings,
    setText,
  } = useSpeechSynthesis();

  const baseClass = 'text-to-speech-panel';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleSpeak = () => {
    speak(text);
  };

  const handleVoiceChange = (voice: SpeechSynthesisVoice | null) => {
    updateSettings({ voice });
  };

  const handleRateChange = (newRate: number) => {
    updateSettings({ rate: newRate });
  };

  const handlePitchChange = (newPitch: number) => {
    updateSettings({ pitch: newPitch });
  };

  const handleVolumeChange = (newVolume: number) => {
    updateSettings({ volume: newVolume });
  };

  return (
    <div className={classes}>
      <div className="text-to-speech-panel__main">
        <TextToSpeechControl
          text={text}
          onTextChange={setText}
          onSpeak={handleSpeak}
          onPause={pause}
          onResume={resume}
          onStop={stop}
          isSpeaking={isSpeaking}
          isPaused={isPaused}
          isSupported={isSupported}
          error={error}
        />
      </div>
      
      <div className="text-to-speech-panel__settings">
        <VoiceSettings
          voices={voices}
          selectedVoice={selectedVoice}
          rate={rate}
          pitch={pitch}
          volume={volume}
          onVoiceChange={handleVoiceChange}
          onRateChange={handleRateChange}
          onPitchChange={handlePitchChange}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};