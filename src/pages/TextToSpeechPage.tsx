import React from 'react';
import { TextToSpeechTemplate } from '../components/templates/TextToSpeechTemplate';
import { TextToSpeechPanel } from '../components/organisms/TextToSpeechPanel';

export const TextToSpeechPage: React.FC = () => {
  return (
    <TextToSpeechTemplate>
      <TextToSpeechPanel />
    </TextToSpeechTemplate>
  );
};