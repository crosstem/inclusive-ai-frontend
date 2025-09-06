import { SpeechRecognitionPage } from "./pages/SpeechRecognitionPage";
import { TextToSpeechPage } from "./pages/TextToSpeechPage";
import { AzureSpeechRecognitionPage } from "./pages/AzureSpeechRecognitionPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <SpeechRecognitionPage />
      <hr />
      <TextToSpeechPage />
      <hr />
      <AzureSpeechRecognitionPage />
    </div>
  );
}

export default App;
