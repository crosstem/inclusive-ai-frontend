import React from 'react';
import VideoPreview from '../../atoms/VideoPreview/VideoPreview';
import './CameraCapture.css';

export interface CameraCaptureProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ videoRef, canvasRef }) => {
  return (
    <div className="camera-capture">
      <VideoPreview videoRef={videoRef} mirrored />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraCapture;
