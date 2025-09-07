import { SpeechRecognitionPage } from "./pages/SpeechRecognitionPage";
import { TextToSpeechPage } from "./pages/TextToSpeechPage";
import { AzureSpeechRecognitionPage } from "./pages/AzureSpeechRecognitionPage";
import { AzureTextToSpeechPage } from "./pages/AzureTextToSpeechPage";
import { ChatPage } from "./pages/ChatPage";
import { CameraPage } from "./pages/CameraPage";
import { RealtimeChatPage } from "./pages/RealtimeChatPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="comparison-container">
        <div className="speech-recognition-left">
          <h2>Web Speech API</h2>
          <SpeechRecognitionPage />
        </div>
        <div className="speech-recognition-right">
          <h2>Azure AI Speech</h2>
          <AzureSpeechRecognitionPage />
        </div>
      </div>
      <hr />
      <div className="text-to-speech-comparison">
        <div className="text-to-speech-left">
          <h2>Web Speech API</h2>
          <TextToSpeechPage />
        </div>
        <div className="text-to-speech-right">
          <h2>Azure AI Speech</h2>
          <AzureTextToSpeechPage />
        </div>
      </div>
      <hr />
      <div className="chat-section">
        <h2>WebSocket Chat</h2>
        <ChatPage />
      </div>
      <hr />
      <div className="camera-section">
        <h2>Camera</h2>
        <CameraPage />
      </div>
      <hr />
      <div className="realtime-chat-section">
        <h2>Azure OpenAI Realtime Chat</h2>
        <RealtimeChatPage />
      </div>
    </div>
  );
}

export default App;
