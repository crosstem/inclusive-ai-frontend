import React from 'react';
import './VideoPreview.css';

export interface VideoPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  mirrored?: boolean;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ videoRef, mirrored = false }) => {
  return (
    <div className={`video-preview ${mirrored ? 'video-preview--mirrored' : ''}`}>
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default VideoPreview;
