import React from 'react';
import './AudioIndicator.css';

export interface AudioIndicatorProps {
  isRecording?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

export const AudioIndicator: React.FC<AudioIndicatorProps> = ({
  isRecording = false,
  isSpeaking = false,
  className = '',
}) => {
  const baseClass = 'audio-indicator';
  const recordingClass = isRecording ? 'audio-indicator--recording' : '';
  const speakingClass = isSpeaking ? 'audio-indicator--speaking' : '';
  
  const classes = [baseClass, recordingClass, speakingClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="audio-indicator__icon">
        {isRecording && (
          <div className="audio-indicator__recording">
            <span>🎤</span>
            <div className="audio-indicator__pulse" />
          </div>
        )}
        {isSpeaking && (
          <div className="audio-indicator__speaking">
            <span>🔊</span>
            <div className="audio-indicator__wave" />
          </div>
        )}
        {!isRecording && !isSpeaking && (
          <div className="audio-indicator__idle">
            <span>🔇</span>
          </div>
        )}
      </div>
    </div>
  );
};