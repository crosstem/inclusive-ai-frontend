import React from 'react';
import { TextToSpeechTemplate } from '../components/templates/TextToSpeechTemplate';
import { AzureTextToSpeechPanel } from '../components/organisms/AzureTextToSpeechPanel';

export const AzureTextToSpeechPage: React.FC = () => {
  return (
    <TextToSpeechTemplate 
      title="テキスト音声読み上げ (Azure OpenAI)"
      subtitle="Azure OpenAI を使用したテキスト読み上げ機能のデモ"
      footerText="※ 音声の読み上げにはAzure OpenAI のText-to-Speechモデルを使用しています"
    >
      <AzureTextToSpeechPanel />
    </TextToSpeechTemplate>
  );
};