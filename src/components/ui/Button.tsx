import React from 'react';
import styles from './Button.module.css';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, href, children, className = '', ...props }, ref) => {
    
    const baseClass = `${styles.btn} ${styles[`btn--${variant}`]} ${styles[`btn--${size}`]} ${fullWidth ? styles['btn--full'] : ''} ${className}`;

    if (href) {
      return (
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
