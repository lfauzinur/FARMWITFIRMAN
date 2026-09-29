import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  hoverable = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = `
    bg-white rounded-xl border border-neutral-200 
    shadow-card overflow-hidden transition-all duration-250 ease
  `.replace(/\s+/g, ' ').trim();
  
  // Note: We're using inline styles here as a placeholder since we don't have tailwind. 
  // We should ideally convert this to CSS modules, but for now we'll use inline styles 
  // mapping to our custom properties.
  
  return (
    <div 
      className={`${hoverable ? 'hover-lift' : ''} ${className}`}
      style={{
        backgroundColor: 'var(--color-bg)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}
      {...props}
    >
      {children}
    </div>
  );
};
