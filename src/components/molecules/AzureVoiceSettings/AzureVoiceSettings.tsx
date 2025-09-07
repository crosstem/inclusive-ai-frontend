import React from 'react';
import { Text } from '../../atoms/Text';
import type { AzureVoiceInfo } from '../../../types/azureSpeech';
import './AzureVoiceSettings.css';

export interface AzureVoiceSettingsProps {
  voices: AzureVoiceInfo[];
  selectedVoice: AzureVoiceInfo | null;
  rate: number;
  pitch: number;
  volume: number;
  onVoiceChange: (voice: AzureVoiceInfo | null) => void;
  onRateChange: (rate: number) => void;
  onPitchChange: (pitch: number) => void;
  onVolumeChange: (volume: number) => void;
  className?: string;
}

export const AzureVoiceSettings: React.FC<AzureVoiceSettingsProps> = ({
  voices,
  selectedVoice,
  rate,
  pitch,
  volume,
  onVoiceChange,
  onRateChange,
  onPitchChange,
  onVolumeChange,
  className = '',
}) => {
  const baseClass = 'azure-voice-settings';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceName = e.target.value;
    const voice = voices.find(v => v.name === voiceName) || null;
    onVoiceChange(voice);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRateChange(parseFloat(e.target.value));
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPitchChange(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  return (
    <div className={classes}>
      <Text variant="subtitle" size="medium" as="h3">
        Azure音声設定
      </Text>
      
      <div className="azure-voice-settings__controls">
        <div className="azure-voice-settings__control">
          <label htmlFor="azure-voice-select">
            <Text variant="body" size="small">
              音声
            </Text>
          </label>
          <select
            id="azure-voice-select"
            className="azure-voice-settings__select"
            value={selectedVoice?.name || ''}
            onChange={handleVoiceChange}
          >
            {voices.length === 0 ? (
              <option value="">音声を読み込み中...</option>
            ) : (
              voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.displayName} ({voice.locale}) - {voice.gender}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="azure-voice-settings__control">
          <label htmlFor="azure-rate-slider">
            <Text variant="body" size="small">
              速度: {rate.toFixed(1)}x
            </Text>
          </label>
          <input
            id="azure-rate-slider"
            type="range"
            className="azure-voice-settings__slider"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={handleRateChange}
          />
        </div>

        <div className="azure-voice-settings__control">
          <label htmlFor="azure-pitch-slider">
            <Text variant="body" size="small">
              ピッチ: {pitch.toFixed(1)}
            </Text>
          </label>
          <input
            id="azure-pitch-slider"
            type="range"
            className="azure-voice-settings__slider"
            min="0.5"
            max="1.5"
            step="0.1"
            value={pitch}
            onChange={handlePitchChange}
          />
        </div>

        <div className="azure-voice-settings__control">
          <label htmlFor="azure-volume-slider">
            <Text variant="body" size="small">
              音量: {Math.round(volume * 100)}%
            </Text>
          </label>
          <input
            id="azure-volume-slider"
            type="range"
            className="azure-voice-settings__slider"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};