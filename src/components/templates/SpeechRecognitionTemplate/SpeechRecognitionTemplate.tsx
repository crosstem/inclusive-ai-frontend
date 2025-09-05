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
  title = 'リアルタイム音声認識',
  subtitle = 'Web Speech APIを使用したリアルタイム音声認識デモ',
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
          ※ この機能を使用するにはマイクへのアクセス許可が必要です
        </Text>
      </footer>
    </div>
  );
};