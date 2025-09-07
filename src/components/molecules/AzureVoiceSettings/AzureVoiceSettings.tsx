import React from 'react';
import { Text } from '../../atoms/Text';
import { AZURE_TTS_VOICES } from '../../../types/azureTextToSpeech';
import './AzureVoiceSettings.css';

export interface AzureVoiceSettingsProps {
  selectedVoice: string;
  speed: number;
  onVoiceChange: (voice: string) => void;
  onSpeedChange: (speed: number) => void;
  className?: string;
}

export const AzureVoiceSettings: React.FC<AzureVoiceSettingsProps> = ({
  selectedVoice,
  speed,
  onVoiceChange,
  onSpeedChange,
  className = '',
}) => {
  const baseClass = 'azure-voice-settings';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onVoiceChange(e.target.value);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSpeedChange(parseFloat(e.target.value));
  };

  return (
    <div className={classes}>
      <Text variant="subtitle" size="medium" as="h3">
        音声設定
      </Text>
      
      <div className="azure-voice-settings__controls">
        <div className="azure-voice-settings__control">
          <Text variant="caption" color="muted">
            音声
          </Text>
          <select
            value={selectedVoice}
            onChange={handleVoiceChange}
            className="azure-voice-settings__select"
            aria-label="音声"
          >
            {AZURE_TTS_VOICES.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>

        <div className="azure-voice-settings__control">
          <Text variant="caption" color="muted">
            速度: {speed.toFixed(1)}x
          </Text>
          <input
            type="range"
            min="0.25"
            max="4.0"
            step="0.25"
            value={speed}
            onChange={handleSpeedChange}
            className="azure-voice-settings__slider"
            aria-label={`速度: ${speed.toFixed(1)}x`}
          />
        </div>
      </div>
    </div>
  );
};