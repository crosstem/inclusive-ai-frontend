import React from 'react';
import { Button } from '../../atoms/Button';
import { TextArea } from '../../atoms/TextArea';
import { Text } from '../../atoms/Text';
import './TextToSpeechControl.css';

export interface TextToSpeechControlProps {
  text: string;
  onTextChange: (text: string) => void;
  onSpeak: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  error: string | null;
  className?: string;
}

export const TextToSpeechControl: React.FC<TextToSpeechControlProps> = ({
  text,
  onTextChange,
  onSpeak,
  onPause,
  onResume,
  onStop,
  isSpeaking,
  isPaused,
  isSupported,
  error,
  className = '',
}) => {
  const baseClass = 'text-to-speech-control';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleSpeak = () => {
    if (!text.trim()) return;
    onSpeak();
  };

  return (
    <div className={classes}>
      <div className="text-to-speech-control__input-section">
        <label htmlFor="speech-text">
          <Text variant="subtitle" size="medium">
            読み上げるテキスト
          </Text>
        </label>
        <TextArea
          id="speech-text"
          value={text}
          onChange={onTextChange}
          placeholder="ここに読み上げるテキストを入力してください..."
          disabled={!isSupported}
          rows={6}
          aria-label="読み上げるテキストを入力"
          aria-describedby={error ? "speech-error" : undefined}
        />
      </div>

      <div className="text-to-speech-control__controls">
        {!isSupported ? (
          <Text variant="caption" color="error">
            お使いのブラウザは音声合成機能に対応していません。
          </Text>
        ) : (
          <div className="text-to-speech-control__buttons">
            {!isSpeaking ? (
              <Button
                onClick={handleSpeak}
                disabled={!text.trim()}
                variant="primary"
                size="medium"
              >
                再生
              </Button>
            ) : (
              <>
                {isPaused ? (
                  <Button
                    onClick={onResume}
                    variant="primary"
                    size="medium"
                  >
                    再開
                  </Button>
                ) : (
                  <Button
                    onClick={onPause}
                    variant="secondary"
                    size="medium"
                  >
                    一時停止
                  </Button>
                )}
                <Button
                  onClick={onStop}
                  variant="danger"
                  size="medium"
                >
                  停止
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="text-to-speech-control__error">
          <Text variant="caption" color="error">
            エラー: {error}
          </Text>
        </div>
      )}
    </div>
  );
};