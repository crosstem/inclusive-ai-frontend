import React from 'react';
import { SpeechRecognitionTemplate } from '../components/templates/SpeechRecognitionTemplate';
import { SpeechRecognitionPanel } from '../components/organisms/SpeechRecognitionPanel';

export const SpeechRecognitionPage: React.FC = () => {
  return (
    <SpeechRecognitionTemplate>
      <SpeechRecognitionPanel />
    </SpeechRecognitionTemplate>
  );
};