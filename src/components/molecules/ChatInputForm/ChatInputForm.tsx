import React, { useState } from 'react';
import { ChatInput } from '../../atoms/ChatInput';
import { Button } from '../../atoms/Button';
import './ChatInputForm.css';

export interface ChatInputFormProps {
  onSendMessage: (message: string) => boolean;
  disabled?: boolean;
}

export const ChatInputForm: React.FC<ChatInputFormProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!message.trim() || disabled || isSending) {
      return;
    }

    setIsSending(true);
    
    try {
      const success = onSendMessage(message.trim());
      if (success) {
        setMessage('');
      }
    } finally {
      // Add a small delay for visual feedback
      setTimeout(() => {
        setIsSending(false);
      }, 300);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSubmit={handleSubmit}
        disabled={disabled || isSending}
        placeholder="Type a message..."
      />
      <Button
        className={`chat-input-form__send-button ${isSending ? 'chat-input-form__send-button--sending' : ''}`}
        onClick={handleSubmit}
        disabled={disabled || isSending || !message.trim()}
        variant="primary"
      >
        <span>➤</span>
      </Button>
    </form>
  );
};