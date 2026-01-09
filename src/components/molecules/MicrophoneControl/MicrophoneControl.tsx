import React from 'react';
import { Button } from '../../atoms/Button';
import { StatusIndicator } from '../../atoms/StatusIndicator';
import './MicrophoneControl.css';

export interface MicrophoneControlProps {
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  className?: string;
}

export const MicrophoneControl: React.FC<MicrophoneControlProps> = ({
  isListening,
  isSupported,
  error,
  onStart,
  onStop,
  onClear,
  className = '',
}) => {
  const baseClass = 'microphone-control';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const getStatus = () => {
    if (error) return 'error';
    if (isListening) return 'listening';
    return 'idle';
  };

  const getStatusMessage = () => {
    if (!isSupported) return 'Your browser does not support speech recognition';
    if (error) return `Error: ${error}`;
    return undefined;
  };

  return (
    <div className={classes}>
      <div className="microphone-control__status">
        <StatusIndicator 
          status={getStatus()} 
          message={getStatusMessage()}
        />
      </div>
      
      <div className="microphone-control__actions">
        {isListening ? (
          <Button 
            onClick={onStop}
            variant="danger"
            disabled={!isSupported}
          >
            🛑 Stop
          </Button>
        ) : (
          <Button 
            onClick={onStart}
            variant="primary"
            disabled={!isSupported || !!error}
          >
            🎤 Start
          </Button>
        )}
        
        <Button 
          onClick={onClear}
          variant="secondary"
          size="small"
        >
          🗑️ Clear
        </Button>
      </div>
    </div>
  );
};