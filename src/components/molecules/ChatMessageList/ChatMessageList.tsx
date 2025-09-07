import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../atoms/ChatMessage';
import type { ChatMessage as ChatMessageType } from '../../../types/chat';
import './ChatMessageList.css';

export interface ChatMessageListProps {
  messages: ChatMessageType[];
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-message-list" ref={containerRef}>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};