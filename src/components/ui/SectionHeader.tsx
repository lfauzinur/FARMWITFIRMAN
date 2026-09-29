import React from 'react';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  label, 
  title, 
  subtitle, 
  alignment = 'center' 
}) => {
  const isCenter = alignment === 'center';
  
  return (
    <div style={{
      textAlign: alignment,
      maxWidth: isCenter ? '800px' : '100%',
      marginInline: isCenter ? 'auto' : '0',
      marginBottom: 'var(--space-12)'
    }}>
      <span style={{
        display: 'inline-block',
        color: 'var(--color-primary)',
        fontWeight: 'var(--font-weight-bold)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--letter-spacing-wide)',
        fontSize: 'var(--font-size-sm)',
        marginBottom: 'var(--space-3)'
      }}>
        {label}
      </span>
      <h2 style={{
        marginBottom: 'var(--space-4)',
        color: 'var(--color-neutral-900)'
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-text-secondary)'
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
