import { SpeechRecognitionPage } from "./pages/SpeechRecognitionPage";
import { TextToSpeechPage } from "./pages/TextToSpeechPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <SpeechRecognitionPage />
      <hr />
      <TextToSpeechPage />
    </div>
  );
}

export default App;
