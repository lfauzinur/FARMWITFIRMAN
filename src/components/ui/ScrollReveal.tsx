'use client';

import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale';
  stagger?: boolean;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  stagger = false,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes fully into view
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  let revealClass = 'reveal';
  if (direction === 'left') revealClass = 'reveal--left';
  if (direction === 'right') revealClass = 'reveal--right';
  if (direction === 'scale') revealClass = 'reveal--scale';

  const staggerClass = stagger ? 'stagger' : '';

  return (
    <div ref={elementRef} className={`${revealClass} ${staggerClass} ${className}`}>
      {children}
    </div>
  );
};
