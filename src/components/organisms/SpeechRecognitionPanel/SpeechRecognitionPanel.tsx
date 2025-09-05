import React from 'react';
import { MicrophoneControl } from '../../molecules/MicrophoneControl';
import { TranscriptDisplay } from '../../molecules/TranscriptDisplay';
import { useSpeechRecognition } from '../../../hooks/useSpeechRecognition';
import './SpeechRecognitionPanel.css';

export interface SpeechRecognitionPanelProps {
  className?: string;
}

export const SpeechRecognitionPanel: React.FC<SpeechRecognitionPanelProps> = ({
  className = '',
}) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();

  const baseClass = 'speech-recognition-panel';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="speech-recognition-panel__controls">
        <MicrophoneControl
          isListening={isListening}
          isSupported={isSupported}
          error={error}
          onStart={startListening}
          onStop={stopListening}
          onClear={clearTranscript}
        />
      </div>
      
      <div className="speech-recognition-panel__display">
        <TranscriptDisplay
          transcript={transcript}
          interimTranscript={interimTranscript}
        />
      </div>
    </div>
  );
};