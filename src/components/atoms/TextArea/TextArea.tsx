import React from 'react';
import './TextArea.css';

export interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
  rows = 4,
  className = '',
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const baseClass = 'textarea';
  const disabledClass = disabled ? 'textarea--disabled' : '';
  
  const classes = [baseClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      id={id}
      className={classes}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    />
  );
};