import React from 'react';
import { Text } from '../../atoms/Text';
import './AzureSpeechRecognitionTemplate.css';

export interface AzureSpeechRecognitionTemplateProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const AzureSpeechRecognitionTemplate: React.FC<AzureSpeechRecognitionTemplateProps> = ({
  children,
  title = 'Azure AI Speech Recognition',
  subtitle = 'Real-time speech recognition demo using Azure Cognitive Services Speech',
  className = '',
}) => {
  const baseClass = 'azure-speech-recognition-template';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <header className="azure-speech-recognition-template__header">
        <div className="azure-speech-recognition-template__title-section">
          <Text variant="subtitle" size="large" as="h1">
            {title}
          </Text>
          <Text variant="caption" color="muted" as="p">
            {subtitle}
          </Text>
        </div>
      </header>
      
      <main className="azure-speech-recognition-template__main">
        {children}
      </main>
      
      <footer className="azure-speech-recognition-template__footer">
        <Text variant="caption" color="muted" size="small">
          Note: Azure Speech Service configuration and microphone access permission are required
        </Text>
      </footer>
    </div>
  );
};