import { SpeechRecognitionPage } from "./pages/SpeechRecognitionPage";
import { TextToSpeechPage } from "./pages/TextToSpeechPage";
import { AzureTextToSpeechPage } from "./pages/AzureTextToSpeechPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <SpeechRecognitionPage />
      <hr />
      <div className="text-to-speech-comparison">
        <div className="text-to-speech-section">
          <h2>Web Speech API</h2>
          <TextToSpeechPage />
        </div>
        <div className="text-to-speech-section">
          <h2>Azure OpenAI</h2>
          <AzureTextToSpeechPage />
        </div>
      </div>
    </div>
  );
}

export default App;
