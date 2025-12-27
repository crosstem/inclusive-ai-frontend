import React from 'react';
import { Button } from '../../atoms/Button';
import { AudioIndicator } from '../../atoms/AudioIndicator';
import './RealtimeSessionControls.css';

export interface RealtimeSessionControlsProps {
  isConnected: boolean;
  isConnecting: boolean;
  isRecording: boolean;
  isSpeaking: boolean;
  onStartSession: () => void;
  onStopSession: () => void;
  error?: string | null;
  className?: string;
}

export const RealtimeSessionControls: React.FC<RealtimeSessionControlsProps> = ({
  isConnected,
  isConnecting,
  isRecording,
  isSpeaking,
  onStartSession,
  onStopSession,
  error,
  className = '',
}) => {
  const classes = ['realtime-session-controls', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="realtime-session-controls__status">
        <AudioIndicator 
          isRecording={isRecording} 
          isSpeaking={isSpeaking}
        />
        <div className="realtime-session-controls__info">
          <div className="realtime-session-controls__connection-status">
            {isConnecting && 'Connecting...'}
            {isConnected && !isConnecting && 'Connected'}
            {!isConnected && !isConnecting && 'Disconnected'}
          </div>
          {error && (
            <div className="realtime-session-controls__error">
              {error}
            </div>
          )}
        </div>
      </div>
      
      <div className="realtime-session-controls__actions">
        {!isConnected && !isConnecting && (
          <Button 
            onClick={onStartSession}
            variant="primary"
            size="medium"
          >
            Start Session
          </Button>
        )}
        
        {isConnecting && (
          <Button 
            disabled
            variant="secondary"
            size="medium"
          >
            Connecting...
          </Button>
        )}
        
        {isConnected && (
          <Button 
            onClick={onStopSession}
            variant="danger"
            size="medium"
          >
            Stop Session
          </Button>
        )}
      </div>
    </div>
  );
};