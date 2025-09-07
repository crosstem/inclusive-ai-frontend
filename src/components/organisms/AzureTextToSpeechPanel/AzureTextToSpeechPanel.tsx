import React from 'react';
import { AzureTextToSpeechControl } from '../../molecules/AzureTextToSpeechControl';
import { AzureVoiceSettings } from '../../molecules/AzureVoiceSettings';
import { useAzureSpeechSynthesis } from '../../../hooks/useAzureSpeechSynthesis';
import type { AzureVoiceInfo } from '../../../types/azureSpeech';
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
    voices,
    selectedVoice,
    text,
    rate,
    pitch,
    volume,
    error,
    isConnected,
    speak,
    stop,
    updateSettings,
    setText,
  } = useAzureSpeechSynthesis();

  const baseClass = 'azure-text-to-speech-panel';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleSpeak = () => {
    speak(text);
  };

  const handleVoiceChange = (voice: AzureVoiceInfo | null) => {
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
      <div className="azure-text-to-speech-panel__main">
        <AzureTextToSpeechControl
          text={text}
          onTextChange={setText}
          onSpeak={handleSpeak}
          onStop={stop}
          isSpeaking={isSpeaking}
          isSupported={isSupported}
          isConnected={isConnected}
          error={error}
        />
      </div>
      
      <div className="azure-text-to-speech-panel__settings">
        <AzureVoiceSettings
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