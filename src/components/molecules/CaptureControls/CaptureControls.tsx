import React from 'react';
import { Button } from '../../atoms/Button';
import './CaptureControls.css';

export interface CaptureControlsProps {
  onCapture: () => void;
  onAnalyze: () => void;
  hasImage: boolean;
  isAnalyzing: boolean;
}

export const CaptureControls: React.FC<CaptureControlsProps> = ({ 
  onCapture, 
  onAnalyze, 
  hasImage, 
  isAnalyzing 
}) => {
  return (
    <div className="capture-controls">
      <Button onClick={onCapture}>
        Capture
      </Button>
      <Button 
        onClick={onAnalyze} 
        variant="secondary"
        disabled={!hasImage || isAnalyzing}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
      </Button>
    </div>
  );
};

export default CaptureControls;