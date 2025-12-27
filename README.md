[![test](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/test.yaml/badge.svg?branch=main)](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/test.yaml?query=branch%3Amain)
[![gh-pages](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/gh-pages.yaml/badge.svg?branch=main)](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/gh-pages.yaml?query=branch%3Amain)

# inclusive-ai-frontend

A React TypeScript application demonstrating various speech recognition and text-to-speech technologies, including Web Speech API and Azure Cognitive Services Speech.

## Features

- **Web Speech API Speech Recognition**: Real-time speech recognition using browser's built-in capabilities
- **Text-to-Speech**: Browser-based speech synthesis with voice customization
- **Azure AI Speech Recognition**: Cloud-based speech recognition using Azure Cognitive Services
- **Azure OpenAI Realtime Chat**: Real-time voice and text conversation using Azure OpenAI Realtime API with WebRTC

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

### Azure Speech Service Configuration

To use the Azure AI Speech feature, you need to configure your Azure Speech Service credentials:

1. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Azure Speech Service credentials:
   ```
   VITE_AZURE_SPEECH_KEY=your_azure_speech_subscription_key
   VITE_AZURE_SPEECH_REGION=your_azure_region (e.g., eastus, westus2)
   ```

3. Get your credentials from [Azure Portal](https://portal.azure.com/):
   - Create a Speech Service resource
   - Copy the subscription key and region from the resource's Keys and Endpoint page

### Azure OpenAI Realtime API Configuration

To use the Azure OpenAI Realtime Chat feature, you need to configure your Azure OpenAI credentials:

1. Add your Azure OpenAI credentials to the `.env` file:
   ```
   VITE_AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   VITE_AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
   VITE_AZURE_OPENAI_DEPLOYMENT=gpt-4o-realtime-preview
   VITE_AZURE_OPENAI_VOICE=alloy
   VITE_AZURE_OPENAI_LOCATION=eastus2
   ```

2. Get your credentials from [Azure Portal](https://portal.azure.com/):
   - Create an Azure OpenAI resource
   - Deploy a `gpt-4o-realtime-preview` model
   - Copy the endpoint and API key from the resource's Keys and Endpoint page
   - Note: The Realtime API requires a specific model deployment that supports real-time audio processing

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
- **Molecules**: Component combinations (MicrophoneControl, TranscriptDisplay, etc.)
- **Organisms**: Feature-specific components (SpeechRecognitionPanel, etc.)
- **Templates**: Layout templates
- **Pages**: Top-level page components
