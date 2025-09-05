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
  title = 'テキスト音声読み上げ',
  subtitle = 'Web Speech APIを使用したテキスト読み上げ機能のデモ',
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
          ※ 音声の読み上げにはブラウザの音声合成機能を使用しています
        </Text>
      </footer>
    </div>
  );
};