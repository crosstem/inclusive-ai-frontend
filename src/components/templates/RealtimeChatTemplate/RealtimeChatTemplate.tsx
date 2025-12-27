import React from 'react';
import './RealtimeChatTemplate.css';

export interface RealtimeChatTemplateProps {
  children: React.ReactNode;
  className?: string;
}

export const RealtimeChatTemplate: React.FC<RealtimeChatTemplateProps> = ({
  children,
  className = '',
}) => {
  const classes = ['realtime-chat-template', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="realtime-chat-template__container">
        {children}
      </div>
    </div>
  );
};