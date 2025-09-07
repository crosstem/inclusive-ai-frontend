import React from 'react';
import { Button } from '../../atoms/Button';
import './CameraControls.css';

export interface CameraControlsProps {
  onStart: () => void;
  onStop: () => void;
  onSwitch: () => void;
  isRunning: boolean;
}

export const CameraControls: React.FC<CameraControlsProps> = ({ onStart, onStop, onSwitch, isRunning }) => {
  return (
    <div className="camera-controls">
      {!isRunning ? (
        <Button onClick={onStart}>Start</Button>
      ) : (
        <Button onClick={onStop} variant="secondary">Stop</Button>
      )}
      <Button onClick={onSwitch} variant="secondary">Switch Camera</Button>
    </div>
  );
};

export default CameraControls;
