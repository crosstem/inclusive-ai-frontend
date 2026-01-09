import React from 'react';
import { Text } from '../../atoms/Text';
import './AzureTextToSpeechTemplate.css';

export interface AzureTextToSpeechTemplateProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const AzureTextToSpeechTemplate: React.FC<AzureTextToSpeechTemplateProps> = ({
  children,
  title = 'Azure AI Text-to-Speech',
  subtitle = 'Text-to-speech demo using Azure AI Speech',
  className = '',
}) => {
  const baseClass = 'azure-text-to-speech-template';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <header className="azure-text-to-speech-template__header">
        <div className="azure-text-to-speech-template__title-section">
          <Text variant="subtitle" size="large" as="h1">
            {title}
          </Text>
          <Text variant="caption" color="muted" as="p">
            {subtitle}
          </Text>
        </div>
      </header>
      
      <main className="azure-text-to-speech-template__main">
        {children}
      </main>
      
      <footer className="azure-text-to-speech-template__footer">
        <Text variant="caption" color="muted" size="small">
          Note: This feature uses Azure AI Speech service
        </Text>
      </footer>
    </div>
  );
};