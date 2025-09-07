import React, { useRef, useState, useEffect } from 'react';
import { CameraControls } from '../components/molecules/CameraControls';
import { CameraCapture } from '../components/organisms/CameraCapture';

export const CameraPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // mirror for user-facing camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (facingMode === 'user') {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    // open in new tab
    const dataUrl = canvas.toDataURL('image/png');
    const w = window.open('about:blank');
    if (w) w.document.write(`<img src="${dataUrl}" alt="snapshot" />`);
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
      <CameraCapture videoRef={videoRef} canvasRef={canvasRef} />
      <CameraControls onStart={start} onStop={stop} onCapture={capture} onSwitch={switchCamera} isRunning={isRunning} />
    </div>
  );
};

export default CameraPage;
