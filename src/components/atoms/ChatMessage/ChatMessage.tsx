import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../../types/chat';
import './ChatMessage.css';

export interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`chat-message ${message.isOwn ? 'chat-message--own' : 'chat-message--other'}`}>
      <div className="chat-message__bubble">
        {message.content}
      </div>
      <div className="chat-message__time">
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
};