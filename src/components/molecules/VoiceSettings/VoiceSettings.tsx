import React from 'react';
import { Text } from '../../atoms/Text';
import './VoiceSettings.css';

export interface VoiceSettingsProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
  onVoiceChange: (voice: SpeechSynthesisVoice | null) => void;
  onRateChange: (rate: number) => void;
  onPitchChange: (pitch: number) => void;
  onVolumeChange: (volume: number) => void;
  className?: string;
}

export const VoiceSettings: React.FC<VoiceSettingsProps> = ({
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
  const baseClass = 'voice-settings';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceURI = e.target.value;
    const voice = voices.find(v => v.voiceURI === voiceURI) || null;
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
        Voice Settings
      </Text>
      
      <div className="voice-settings__controls">
        <div className="voice-settings__control">
          <label htmlFor="voice-select">
            <Text variant="body" size="small">
              Voice
            </Text>
          </label>
          <select
            id="voice-select"
            className="voice-settings__select"
            value={selectedVoice?.voiceURI || ''}
            onChange={handleVoiceChange}
            aria-label="Select voice"
          >
            {voices.length === 0 ? (
              <option value="">Loading voices...</option>
            ) : (
              voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="voice-settings__control">
          <label htmlFor="rate-slider">
            <Text variant="body" size="small">
              Speed: {rate.toFixed(1)}x
            </Text>
          </label>
          <input
            id="rate-slider"
            type="range"
            className="voice-settings__slider"
            min="0.1"
            max="2"
            step="0.1"
            value={rate}
            onChange={handleRateChange}
            aria-label={`Speed: ${rate.toFixed(1)}x`}
          />
          <div className="voice-settings__slider-labels">
            <span>0.1x</span>
            <span>2x</span>
          </div>
        </div>

        <div className="voice-settings__control">
          <label htmlFor="pitch-slider">
            <Text variant="body" size="small">
              Pitch: {pitch.toFixed(1)}
            </Text>
          </label>
          <input
            id="pitch-slider"
            type="range"
            className="voice-settings__slider"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={handlePitchChange}
            aria-label={`Pitch: ${pitch.toFixed(1)}`}
          />
          <div className="voice-settings__slider-labels">
            <span>0</span>
            <span>2</span>
          </div>
        </div>

        <div className="voice-settings__control">
          <label htmlFor="volume-slider">
            <Text variant="body" size="small">
              Volume: {Math.round(volume * 100)}%
            </Text>
          </label>
          <input
            id="volume-slider"
            type="range"
            className="voice-settings__slider"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            aria-label={`Volume: ${Math.round(volume * 100)}%`}
          />
          <div className="voice-settings__slider-labels">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};