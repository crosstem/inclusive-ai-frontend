import React from 'react';
import { RealtimeChatTemplate } from '../components/templates/RealtimeChatTemplate';
import { RealtimeChatPanel } from '../components/organisms/RealtimeChatPanel';

export const RealtimeChatPage: React.FC = () => {
  return (
    <RealtimeChatTemplate>
      <RealtimeChatPanel />
    </RealtimeChatTemplate>
  );
};