import { SpeechRecognitionPage } from "./pages/SpeechRecognitionPage";
import { TextToSpeechPage } from "./pages/TextToSpeechPage";
import { AzureSpeechRecognitionPage } from "./pages/AzureSpeechRecognitionPage";
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
      <div className="text-to-speech-section">
        <h2>Text to Speech</h2>
        <TextToSpeechPage />
      </div>
    </div>
  );
}

export default App;
