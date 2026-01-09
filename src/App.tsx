import { SpeechRecognitionPage } from "./pages/SpeechRecognitionPage";
import { TextToSpeechPage } from "./pages/TextToSpeechPage";
import { AzureSpeechRecognitionPage } from "./pages/AzureSpeechRecognitionPage";
import { AzureTextToSpeechPage } from "./pages/AzureTextToSpeechPage";
import { ChatPage } from "./pages/ChatPage";
import { CameraPage } from "./pages/CameraPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-header__title">Inclusive AI Demo</h1>
        <p className="app-header__subtitle">Speech Recognition, Text-to-Speech, Chat, and Computer Vision</p>
      </header>

      <section className="comparison-container">
        <div className="speech-recognition-left">
          <h2>Web Speech API</h2>
          <SpeechRecognitionPage />
        </div>
        <div className="speech-recognition-right">
          <h2>Azure AI Speech</h2>
          <AzureSpeechRecognitionPage />
        </div>
      </section>

      <hr className="section-divider" />

      <section className="text-to-speech-comparison">
        <div className="text-to-speech-left">
          <h2>Web Speech API</h2>
          <TextToSpeechPage />
        </div>
        <div className="text-to-speech-right">
          <h2>Azure AI Speech</h2>
          <AzureTextToSpeechPage />
        </div>
      </section>

      <hr className="section-divider" />

      <section className="chat-section">
        <h2>WebSocket Chat</h2>
        <ChatPage />
      </section>

      <hr className="section-divider" />

      <section className="camera-section">
        <h2>Camera & Vision</h2>
        <CameraPage />
      </section>
    </div>
  );
}

export default App;
