'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  // Extract number and suffix from string like "1,200+" or "15+"
  const numberStr = value.replace(/[^0-9]/g, '');
  const targetNumber = parseInt(numberStr, 10);
  const suffix = value.replace(/[0-9,\.]/g, '');

  useEffect(() => {
    if (!targetNumber) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          const updateCounter = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Ease out quad
            const easeOutProgress = 1 - (1 - progress) * (1 - progress);
            
            setCount(Math.floor(easeOutProgress * targetNumber));
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };
          
          requestAnimationFrame(updateCounter);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber]);

  return (
    <span ref={elementRef} style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}>
      {targetNumber > 0 ? (
        <>
          {count.toLocaleString('id-ID')}
          {suffix}
        </>
      ) : (
        value
      )}
    </span>
  );
};
