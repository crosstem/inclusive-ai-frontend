[![test](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/test.yaml/badge.svg?branch=main)](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/test.yaml?query=branch%3Amain)
[![gh-pages](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/gh-pages.yaml/badge.svg?branch=main)](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/gh-pages.yaml?query=branch%3Amain)

# inclusive-ai-frontend

A React TypeScript application demonstrating various speech recognition and text-to-speech technologies, including Web Speech API and Azure OpenAI.

## Features

- **Web Speech API Speech Recognition**: Real-time speech recognition using browser's built-in capabilities
- **Text-to-Speech Comparison**: 
  - **Web Speech API**: Browser-based speech synthesis with voice customization
  - **Azure OpenAI**: Cloud-based text-to-speech using Azure OpenAI TTS models

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Azure OpenAI Configuration

To use the Azure OpenAI text-to-speech feature, you need to configure your Azure OpenAI credentials:

1. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Azure OpenAI credentials:
   ```
   VITE_AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
   VITE_AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com
   VITE_AZURE_OPENAI_TTS_DEPLOYMENT_NAME=tts-1
   ```

3. Get your credentials from [Azure Portal](https://portal.azure.com/):
   - Create an Azure OpenAI resource
   - Deploy a TTS model (tts-1 or tts-1-hd)
   - Copy the API key and endpoint from the resource's Keys and Endpoint page

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Architecture

This project follows atomic design principles:

- **Atoms**: Basic UI components (Button, Text, etc.)
- **Molecules**: Component combinations (TextToSpeechControl, VoiceSettings, etc.)
- **Organisms**: Feature-specific components (TextToSpeechPanel, AzureTextToSpeechPanel, etc.)
- **Templates**: Layout templates
- **Pages**: Top-level page components
