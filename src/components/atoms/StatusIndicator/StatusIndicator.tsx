import React from 'react';
import './StatusIndicator.css';

export interface StatusIndicatorProps {
  status: 'idle' | 'listening' | 'processing' | 'error';
  message?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  message,
  className = '',
}) => {
  const baseClass = 'status-indicator';
  const statusClass = `status-indicator--${status}`;
  
  const classes = [baseClass, statusClass, className]
    .filter(Boolean)
    .join(' ');

  const getStatusIcon = () => {
    switch (status) {
      case 'idle':
        return '⏸️';
      case 'listening':
        return '🎤';
      case 'processing':
        return '⚡';
      case 'error':
        return '❌';
      default:
        return '⏸️';
    }
  };

  const getStatusText = () => {
    if (message) return message;
    
    switch (status) {
      case 'idle':
        return '待機中';
      case 'listening':
        return '音声認識中...';
      case 'processing':
        return '処理中...';
      case 'error':
        return 'エラーが発生しました';
      default:
        return '待機中';
    }
  };

  return (
    <div className={classes}>
      <span className="status-indicator__icon">{getStatusIcon()}</span>
      <span className="status-indicator__text">{getStatusText()}</span>
    </div>
  );
};