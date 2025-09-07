import React from 'react';
import { AzureTextToSpeechControl } from '../../molecules/AzureTextToSpeechControl';
import { AzureVoiceSettings } from '../../molecules/AzureVoiceSettings';
import { useAzureTextToSpeech } from '../../../hooks/useAzureTextToSpeech';
import './AzureTextToSpeechPanel.css';

export interface AzureTextToSpeechPanelProps {
  className?: string;
}

export const AzureTextToSpeechPanel: React.FC<AzureTextToSpeechPanelProps> = ({
  className = '',
}) => {
  const {
    isSupported,
    isSpeaking,
    isPaused,
    isLoading,
    text,
    voice,
    speed,
    error,
    speak,
    pause,
    resume,
    stop,
    updateSettings,
    setText,
  } = useAzureTextToSpeech();

  const baseClass = 'azure-text-to-speech-panel';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleSpeak = () => {
    speak(text);
  };

  const handleVoiceChange = (newVoice: string) => {
    updateSettings({ voice: newVoice });
  };

  const handleSpeedChange = (newSpeed: number) => {
    updateSettings({ speed: newSpeed });
  };

  return (
    <div className={classes}>
      <div className="azure-text-to-speech-panel__main">
        <AzureTextToSpeechControl
          text={text}
          onTextChange={setText}
          onSpeak={handleSpeak}
          onPause={pause}
          onResume={resume}
          onStop={stop}
          isSpeaking={isSpeaking}
          isPaused={isPaused}
          isLoading={isLoading}
          isSupported={isSupported}
          error={error}
        />
      </div>
      
      <div className="azure-text-to-speech-panel__settings">
        <AzureVoiceSettings
          selectedVoice={voice}
          speed={speed}
          onVoiceChange={handleVoiceChange}
          onSpeedChange={handleSpeedChange}
        />
      </div>
    </div>
  );
};