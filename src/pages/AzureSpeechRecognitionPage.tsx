import React from 'react';
import { AzureSpeechRecognitionTemplate } from '../components/templates/AzureSpeechRecognitionTemplate';
import { AzureSpeechRecognitionPanel } from '../components/organisms/AzureSpeechRecognitionPanel';

export const AzureSpeechRecognitionPage: React.FC = () => {
  return (
    <AzureSpeechRecognitionTemplate>
      <AzureSpeechRecognitionPanel />
    </AzureSpeechRecognitionTemplate>
  );
};