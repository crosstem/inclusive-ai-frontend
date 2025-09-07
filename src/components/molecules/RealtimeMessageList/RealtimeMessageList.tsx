import React, { useEffect, useRef } from 'react';
import { RealtimeMessageBubble } from '../RealtimeMessageBubble';
import type { RealtimeMessage } from '../../../types/azureOpenAIRealtime';
import './RealtimeMessageList.css';

export interface RealtimeMessageListProps {
  messages: RealtimeMessage[];
  className?: string;
}

export const RealtimeMessageList: React.FC<RealtimeMessageListProps> = ({
  messages,
  className = '',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const classes = ['realtime-message-list', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="realtime-message-list__container">
        {messages.length === 0 ? (
          <div className="realtime-message-list__empty">
            <div className="realtime-message-list__empty-icon">💬</div>
            <div className="realtime-message-list__empty-text">
              Start a session to begin your conversation with Azure OpenAI
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <RealtimeMessageBubble 
                key={message.id} 
                message={message} 
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};