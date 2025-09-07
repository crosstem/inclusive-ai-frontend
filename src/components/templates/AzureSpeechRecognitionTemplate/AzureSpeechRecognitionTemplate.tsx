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
  title = 'Azure AI Speech 音声認識',
  subtitle = 'Azure Cognitive Services Speech を使用したリアルタイム音声認識デモ',
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
          ※ この機能を使用するには Azure Speech Service の設定とマイクへのアクセス許可が必要です
        </Text>
      </footer>
    </div>
  );
};