import React from 'react';
import './ImageDisplay.css';

export interface ImageDisplayProps {
  imageDataUrl?: string;
  alt?: string;
  placeholder?: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
  imageDataUrl, 
  alt = "Captured image",
  placeholder = "No image captured yet"
}) => {
  return (
    <div className="image-display">
      {imageDataUrl ? (
        <img src={imageDataUrl} alt={alt} />
      ) : (
        <div className="image-placeholder">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;