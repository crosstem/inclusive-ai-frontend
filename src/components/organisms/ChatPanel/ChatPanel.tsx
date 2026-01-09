import React from 'react';
import { ChatMessageList } from '../../molecules/ChatMessageList';
import { ChatInputForm } from '../../molecules/ChatInputForm';
import { Text } from '../../atoms/Text';
import { useWebSocketChat } from '../../../hooks/useWebSocketChat';
import './ChatPanel.css';

export const ChatPanel: React.FC = () => {
  const {
    messages,
    isConnected,
    isConnecting,
    error,
    clientId,
    sendMessage,
    clearError,
  } = useWebSocketChat();

  return (
    <div className="chat-panel">
      <div className="chat-panel__header">
        <h1 className="chat-panel__title">💬 WebSocket Chat</h1>
        <div className="chat-panel__user-info">
          <Text size="small" color="secondary">
            Your ID: <span className="chat-panel__client-id">{clientId}</span>
          </Text>
        </div>
        <div className="chat-panel__status">
          {isConnecting && (
            <Text size="small" color="secondary">Connecting...</Text>
          )}
          {isConnected && (
            <Text size="small" color="primary">✅ Connected</Text>
          )}
          {error && (
            <div className="chat-panel__error">
              <Text size="small" color="error">{error}</Text>
              <button 
                className="chat-panel__error-close"
                onClick={clearError}
                type="button"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      <ChatMessageList messages={messages} />

      <ChatInputForm
        onSendMessage={sendMessage}
        disabled={!isConnected}
      />
    </div>
  );
};