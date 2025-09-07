import React from 'react';
import { Button } from '../../atoms/Button';
import { TextArea } from '../../atoms/TextArea';
import { Text } from '../../atoms/Text';
import './AzureTextToSpeechControl.css';

export interface AzureTextToSpeechControlProps {
  text: string;
  onTextChange: (text: string) => void;
  onSpeak: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isLoading: boolean;
  isSupported: boolean;
  error: string | null;
  className?: string;
}

export const AzureTextToSpeechControl: React.FC<AzureTextToSpeechControlProps> = ({
  text,
  onTextChange,
  onSpeak,
  onPause,
  onResume,
  onStop,
  isSpeaking,
  isPaused,
  isLoading,
  isSupported,
  error,
  className = '',
}) => {
  const baseClass = 'azure-text-to-speech-control';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleSpeak = () => {
    if (!text.trim() || isLoading) return;
    onSpeak();
  };

  return (
    <div className={classes}>
      <div className="azure-text-to-speech-control__input-section">
        <label htmlFor="azure-speech-text">
          <Text variant="subtitle" size="medium">
            読み上げるテキスト
          </Text>
        </label>
        <TextArea
          id="azure-speech-text"
          value={text}
          onChange={onTextChange}
          placeholder="ここに読み上げるテキストを入力してください..."
          disabled={!isSupported || isLoading}
          rows={6}
          aria-label="読み上げるテキストを入力（Azure OpenAI TTS使用）"
          aria-describedby={error ? "azure-speech-error" : undefined}
        />
      </div>

      <div className="azure-text-to-speech-control__controls">
        {!isSupported ? (
          <Text variant="caption" color="error">
            Azure OpenAI の設定が見つかりません。環境変数を確認してください。
          </Text>
        ) : (
          <div className="azure-text-to-speech-control__buttons">
            {!isSpeaking ? (
              <Button
                onClick={handleSpeak}
                disabled={!text.trim() || isLoading}
                variant="primary"
                size="medium"
              >
                {isLoading ? '生成中...' : '再生'}
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
        <div className="azure-text-to-speech-control__error" id="azure-speech-error">
          <Text variant="caption" color="error">
            エラー: {error}
          </Text>
        </div>
      )}
    </div>
  );
};