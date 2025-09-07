[![test](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/test.yaml/badge.svg?branch=main)](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/test.yaml?query=branch%3Amain)
[![gh-pages](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/gh-pages.yaml/badge.svg?branch=main)](https://github.com/crosstem/inclusive-ai-frontend/actions/workflows/gh-pages.yaml?query=branch%3Amain)

# inclusive-ai-frontend

A React TypeScript application demonstrating various speech recognition and text-to-speech technologies, including Web Speech API and Azure Cognitive Services Speech.

## Features

- **Web Speech API Speech Recognition**: Real-time speech recognition using browser's built-in capabilities
- **Text-to-Speech**: Browser-based speech synthesis with voice customization
- **Azure AI Speech Recognition**: Cloud-based speech recognition using Azure Cognitive Services

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
