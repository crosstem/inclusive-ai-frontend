import React from 'react';
import { AzureTextToSpeechTemplate } from '../components/templates/AzureTextToSpeechTemplate';
import { AzureTextToSpeechPanel } from '../components/organisms/AzureTextToSpeechPanel';

export const AzureTextToSpeechPage: React.FC = () => {
  return (
    <AzureTextToSpeechTemplate>
      <AzureTextToSpeechPanel />
    </AzureTextToSpeechTemplate>
  );
};