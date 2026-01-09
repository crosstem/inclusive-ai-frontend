import React from 'react';
import { Text } from '../../atoms/Text';
import './TranscriptDisplay.css';

export interface TranscriptDisplayProps {
  transcript: string;
  interimTranscript: string;
  className?: string;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  interimTranscript,
  className = '',
}) => {
  const baseClass = 'transcript-display';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const hasContent = transcript || interimTranscript;

  return (
    <div className={classes}>
      <div className="transcript-display__header">
        <Text variant="subtitle" size="medium">
          📝 Speech Recognition Results
        </Text>
      </div>
      
      <div className="transcript-display__content">
        {hasContent ? (
          <div className="transcript-display__text">
            {transcript && (
              <Text 
                variant="body" 
                color="primary"
                as="span"
                className="transcript-display__final"
              >
                {transcript}
              </Text>
            )}
            {interimTranscript && (
              <Text 
                variant="body" 
                color="muted"
                as="span"
                className="transcript-display__interim"
              >
                {interimTranscript}
              </Text>
            )}
          </div>
        ) : (
          <Text 
            variant="caption" 
            color="muted"
            className="transcript-display__placeholder"
          >
            Start speech recognition to see results here...
          </Text>
        )}
      </div>
    </div>
  );
};