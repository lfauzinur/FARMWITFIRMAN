import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
  let bgColor = 'var(--color-primary-light)';
  let color = 'var(--color-primary-text)';
  let border = 'none';

  if (variant === 'secondary') {
    bgColor = 'var(--color-accent-light)';
    color = 'var(--color-accent)';
  } else if (variant === 'outline') {
    bgColor = 'transparent';
    color = 'var(--color-text-secondary)';
    border = '1px solid var(--color-border)';
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: 'var(--space-1) var(--space-3)',
      backgroundColor: bgColor,
      color: color,
      border: border,
      borderRadius: 'var(--radius-full)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-semibold)',
      lineHeight: '1',
      whiteSpace: 'nowrap'
    }}>
      {children}
    </span>
  );
};
