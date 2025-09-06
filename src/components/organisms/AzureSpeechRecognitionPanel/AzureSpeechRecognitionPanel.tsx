import React from 'react';
import { MicrophoneControl } from '../../molecules/MicrophoneControl';
import { TranscriptDisplay } from '../../molecules/TranscriptDisplay';
import { useAzureSpeechRecognition } from '../../../hooks/useAzureSpeechRecognition';
import './AzureSpeechRecognitionPanel.css';

export interface AzureSpeechRecognitionPanelProps {
  className?: string;
}

export const AzureSpeechRecognitionPanel: React.FC<AzureSpeechRecognitionPanelProps> = ({
  className = '',
}) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    isConnected,
    startListening,
    stopListening,
    clearTranscript,
  } = useAzureSpeechRecognition();

  const baseClass = 'azure-speech-recognition-panel';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // Show connection status in error if not connected but supported
  const displayError = !isSupported 
    ? error || 'Azure Speech SDK not available' 
    : (!isConnected && isSupported && !error)
    ? 'Azure Speech Service not connected'
    : error;

  return (
    <div className={classes}>
      <div className="azure-speech-recognition-panel__controls">
        <MicrophoneControl
          isListening={isListening}
          isSupported={isSupported && isConnected}
          error={displayError}
          onStart={startListening}
          onStop={stopListening}
          onClear={clearTranscript}
        />
      </div>
      
      <div className="azure-speech-recognition-panel__display">
        <TranscriptDisplay
          transcript={transcript}
          interimTranscript={interimTranscript}
        />
      </div>
    </div>
  );
};