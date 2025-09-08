import React, { useState, useCallback } from 'react';
import { ImageDisplay } from '../../atoms/ImageDisplay/ImageDisplay';
import { CaptureControls } from '../../molecules/CaptureControls/CaptureControls';
import { AnalysisResult } from '../../molecules/AnalysisResult/AnalysisResult';
import './ImageAnalysisPanel.css';

export interface ImageAnalysisPanelProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const ImageAnalysisPanel: React.FC<ImageAnalysisPanelProps> = ({ videoRef }) => {
  const [capturedImage, setCapturedImage] = useState<string | undefined>(undefined);
  const [analysisResult, setAnalysisResult] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const captureImage = useCallback(() => {
    if (!videoRef.current) {
      console.error('Video element not available');
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Canvas context not available');
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(dataUrl);

    // Clear previous results
    setAnalysisResult(null);
    setError(null);
  }, [videoRef]);

  const analyzeImage = useCallback(async () => {
    if (!capturedImage) {
      setError('No image to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Convert data URL to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      // Create FormData and append the image
      const formData = new FormData();
      formData.append('image', blob, 'captured_image.jpg');

      // Send POST request to the analysis endpoint
      const analysisResponse = await fetch('/computer_vision/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!analysisResponse.ok) {
        throw new Error(`Analysis failed: ${analysisResponse.status} ${analysisResponse.statusText}`);
      }

      const result = await analysisResponse.json();
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [capturedImage]);

  return (
    <div className="image-analysis-panel">
      <h4>Image Analysis</h4>
      <ImageDisplay 
        imageDataUrl={capturedImage} 
        placeholder="Capture an image to analyze"
      />
      <CaptureControls
        onCapture={captureImage}
        onAnalyze={analyzeImage}
        hasImage={!!capturedImage}
        isAnalyzing={isAnalyzing}
      />
      <AnalysisResult
        result={analysisResult}
        error={error}
        isLoading={isAnalyzing}
      />
    </div>
  );
};

export default ImageAnalysisPanel;