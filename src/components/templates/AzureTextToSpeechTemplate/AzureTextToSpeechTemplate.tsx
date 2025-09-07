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
  title = 'Azure AIテキスト音声読み上げ',
  subtitle = 'Azure AI Speechを使用したテキスト読み上げ機能のデモ',
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
          ※ 音声の読み上げにはAzure AI Speechサービスを使用しています
        </Text>
      </footer>
    </div>
  );
};