import React from 'react';
import { Text } from '../../atoms/Text';
import './AnalysisResult.css';

export interface AnalysisResultProps {
  result?: object | null;
  error?: string | null;
  isLoading?: boolean;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  error, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="analysis-result">
        <Text>Analyzing image...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analysis-result analysis-result--error">
        <Text>Error: {error}</Text>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="analysis-result">
        <Text>No analysis result yet</Text>
      </div>
    );
  }

  return (
    <div className="analysis-result">
      <Text>Analysis Result:</Text>
      <pre className="analysis-result__json">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
};

export default AnalysisResult;