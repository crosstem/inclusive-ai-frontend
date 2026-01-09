import React from 'react';
import { Text } from '../../atoms/Text';
import './SpeechRecognitionTemplate.css';

export interface SpeechRecognitionTemplateProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const SpeechRecognitionTemplate: React.FC<SpeechRecognitionTemplateProps> = ({
  children,
  title = 'Real-time Speech Recognition',
  subtitle = 'Real-time speech recognition demo using Web Speech API',
  className = '',
}) => {
  const baseClass = 'speech-recognition-template';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <header className="speech-recognition-template__header">
        <div className="speech-recognition-template__title-section">
          <Text variant="subtitle" size="large" as="h1">
            {title}
          </Text>
          <Text variant="caption" color="muted" as="p">
            {subtitle}
          </Text>
        </div>
      </header>
      
      <main className="speech-recognition-template__main">
        {children}
      </main>
      
      <footer className="speech-recognition-template__footer">
        <Text variant="caption" color="muted" size="small">
          Note: Microphone access permission is required to use this feature
        </Text>
      </footer>
    </div>
  );
};