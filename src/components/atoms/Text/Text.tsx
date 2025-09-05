import React from 'react';
import './Text.css';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'subtitle' | 'caption' | 'code';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'muted' | 'error';
  className?: string;
  as?: 'p' | 'span' | 'div' | 'code' | 'h1' | 'h2' | 'h3';
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  size = 'medium',
  color = 'primary',
  className = '',
  as: Component = 'p',
}) => {
  const baseClass = 'text';
  const variantClass = `text--${variant}`;
  const sizeClass = `text--${size}`;
  const colorClass = `text--${color}`;
  
  const classes = [baseClass, variantClass, sizeClass, colorClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};