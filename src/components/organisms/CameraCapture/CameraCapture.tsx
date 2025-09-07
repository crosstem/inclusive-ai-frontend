import React from 'react';
import VideoPreview from '../../atoms/VideoPreview/VideoPreview';
import './CameraCapture.css';

export interface CameraCaptureProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ videoRef }) => {
  return (
    <div className="camera-capture">
      <VideoPreview videoRef={videoRef} mirrored />
    </div>
  );
};

export default CameraCapture;
