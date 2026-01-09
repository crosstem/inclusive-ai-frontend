import React from 'react';
import { Text } from '../../atoms/Text';
import './TextToSpeechTemplate.css';

export interface TextToSpeechTemplateProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const TextToSpeechTemplate: React.FC<TextToSpeechTemplateProps> = ({
  children,
  title = 'Text-to-Speech',
  subtitle = 'Text-to-speech demo using Web Speech API',
  className = '',
}) => {
  const baseClass = 'text-to-speech-template';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <header className="text-to-speech-template__header">
        <div className="text-to-speech-template__title-section">
          <Text variant="subtitle" size="large" as="h1">
            {title}
          </Text>
          <Text variant="caption" color="muted" as="p">
            {subtitle}
          </Text>
        </div>
      </header>
      
      <main className="text-to-speech-template__main">
        {children}
      </main>
      
      <footer className="text-to-speech-template__footer">
        <Text variant="caption" color="muted" size="small">
          Note: This feature uses the browser's speech synthesis capability
        </Text>
      </footer>
    </div>
  );
};