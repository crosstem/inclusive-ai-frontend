import React from 'react';
import { useAzureOpenAIRealtime } from '../../../hooks/useAzureOpenAIRealtime';
import { RealtimeSessionControls } from '../../molecules/RealtimeSessionControls';
import { RealtimeMessageList } from '../../molecules/RealtimeMessageList';
import { ChatInputForm } from '../../molecules/ChatInputForm';
import './RealtimeChatPanel.css';

export interface RealtimeChatPanelProps {
  className?: string;
}

export const RealtimeChatPanel: React.FC<RealtimeChatPanelProps> = ({
  className = '',
}) => {
  const {
    sessionId,
    isConnected,
    isConnecting,
    isRecording,
    isSpeaking,
    messages,
    error,
    startSession,
    stopSession,
    sendMessage,
  } = useAzureOpenAIRealtime();

  const handleSendMessage = (text: string): boolean => {
    if (text.trim() && isConnected) {
      sendMessage(text.trim());
      return true; // Message sent successfully
    }
    return false; // Message not sent
  };

  const classes = ['realtime-chat-panel', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="realtime-chat-panel__header">
        <h3 className="realtime-chat-panel__title">
          Azure OpenAI Realtime Chat
        </h3>
        <div className="realtime-chat-panel__subtitle">
          Real-time voice and text conversation with AI
        </div>
      </div>

      <div className="realtime-chat-panel__controls">
        <RealtimeSessionControls
          isConnected={isConnected}
          isConnecting={isConnecting}
          isRecording={isRecording}
          isSpeaking={isSpeaking}
          onStartSession={startSession}
          onStopSession={stopSession}
          error={error}
        />
      </div>

      <div className="realtime-chat-panel__messages">
        <RealtimeMessageList messages={messages} />
      </div>

      <div className="realtime-chat-panel__input">
        <ChatInputForm
          onSendMessage={handleSendMessage}
          disabled={!isConnected}
        />
      </div>

      {sessionId && (
        <div className="realtime-chat-panel__session-info">
          <small>Session ID: {sessionId}</small>
        </div>
      )}
    </div>
  );
};