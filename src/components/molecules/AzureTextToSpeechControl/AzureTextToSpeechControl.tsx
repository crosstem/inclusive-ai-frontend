import React from 'react';
import { Button } from '../../atoms/Button';
import { TextArea } from '../../atoms/TextArea';
import { Text } from '../../atoms/Text';
import './AzureTextToSpeechControl.css';

export interface AzureTextToSpeechControlProps {
  text: string;
  onTextChange: (text: string) => void;
  onSpeak: () => void;
  onStop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  isConnected: boolean;
  error: string | null;
  className?: string;
}

export const AzureTextToSpeechControl: React.FC<AzureTextToSpeechControlProps> = ({
  text,
  onTextChange,
  onSpeak,
  onStop,
  isSpeaking,
  isSupported,
  isConnected,
  error,
  className = '',
}) => {
  const baseClass = 'azure-text-to-speech-control';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  const handleSpeak = () => {
    if (!text.trim()) return;
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
          disabled={!isSupported || !isConnected}
          rows={6}
          aria-label="読み上げるテキストを入力"
          aria-describedby={error ? "azure-speech-error" : undefined}
        />
      </div>

      <div className="azure-text-to-speech-control__controls">
        {!isSupported ? (
          <Text variant="caption" color="error">
            Azure Speech SDK が利用できません。設定を確認してください。
          </Text>
        ) : !isConnected ? (
          <Text variant="caption" color="error">
            Azure Speech Service に接続できません。
          </Text>
        ) : (
          <div className="azure-text-to-speech-control__buttons">
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