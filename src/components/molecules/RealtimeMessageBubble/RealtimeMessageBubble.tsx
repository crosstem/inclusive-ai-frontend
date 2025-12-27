import React from 'react';
import type { RealtimeMessage } from '../../../types/azureOpenAIRealtime';
import './RealtimeMessageBubble.css';

export interface RealtimeMessageBubbleProps {
  message: RealtimeMessage;
}

export const RealtimeMessageBubble: React.FC<RealtimeMessageBubbleProps> = ({ message }) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageIcon = (type: RealtimeMessage['type'], isAudio?: boolean) => {
    if (isAudio) return '🎵';
    switch (type) {
      case 'user': return '👤';
      case 'assistant': return '🤖';
      case 'system': return '⚙️';
      default: return '';
    }
  };

  const getMessageTypeClass = (type: RealtimeMessage['type']) => {
    switch (type) {
      case 'user': return 'realtime-message--user';
      case 'assistant': return 'realtime-message--assistant';
      case 'system': return 'realtime-message--system';
      default: return '';
    }
  };

  const messageClass = `realtime-message ${getMessageTypeClass(message.type)}`;

  return (
    <div className={messageClass}>
      <div className="realtime-message__header">
        <div className="realtime-message__icon">
          {getMessageIcon(message.type, message.isAudio)}
        </div>
        <div className="realtime-message__type">
          {message.type === 'user' && 'You'}
          {message.type === 'assistant' && 'Assistant'}
          {message.type === 'system' && 'System'}
        </div>
        <div className="realtime-message__time">
          {formatTime(message.timestamp)}
        </div>
      </div>
      <div className="realtime-message__bubble">
        <div className="realtime-message__content">
          {message.content}
        </div>
        {message.isAudio && (
          <div className="realtime-message__audio-indicator">
            Audio message
          </div>
        )}
      </div>
    </div>
  );
};