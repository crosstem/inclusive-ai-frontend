import React, { useRef, useState, useEffect } from 'react';
import { CameraControls } from '../components/molecules/CameraControls';
import { CameraCapture } from '../components/organisms/CameraCapture';
import { ImageAnalysisPanel } from '../components/organisms/ImageAnalysisPanel/ImageAnalysisPanel';

export const CameraPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [stream]);

  const start = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setIsRunning(true);
    } catch (e) {
      console.error('camera start failed', e);
    }
  };

  const stop = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsRunning(false);
  };

  const switchCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
    // restart stream with new facingMode
    if (isRunning) {
      stop();
      setTimeout(() => start(), 200);
    }
  };

  return (
    <div className="camera-page">
      <h3>Camera</h3>
      <CameraCapture videoRef={videoRef} />
      <CameraControls onStart={start} onStop={stop} onSwitch={switchCamera} isRunning={isRunning} />
      <ImageAnalysisPanel videoRef={videoRef} />
    </div>
  );
};

export default CameraPage;
