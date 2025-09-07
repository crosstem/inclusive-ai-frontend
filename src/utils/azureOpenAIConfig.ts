import type { AzureTextToSpeechConfig } from '../types/azureTextToSpeech';

export const getAzureOpenAIConfig = (): AzureTextToSpeechConfig | null => {
  const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
  const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
  const deploymentName = import.meta.env.VITE_AZURE_OPENAI_TTS_DEPLOYMENT_NAME || 'tts-1';

  if (!apiKey || !endpoint) {
    console.warn('Azure OpenAI configuration missing. Please set VITE_AZURE_OPENAI_API_KEY and VITE_AZURE_OPENAI_ENDPOINT environment variables.');
    return null;
  }

  return {
    apiKey,
    endpoint,
    deploymentName,
  };
};