import React, { PropsWithChildren } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps {
  className?: string;
  variant?: 'up' | 'left' | 'right' | 'zoom';
}

const variantClass: Record<NonNullable<ScrollRevealProps['variant']>, string> = {
  up: 'animate-slide-up',
  left: 'animate-slide-in-left',
  right: 'animate-slide-in-right',
  zoom: 'animate-zoom-in',
};

const ScrollReveal: React.FC<PropsWithChildren<ScrollRevealProps>> = ({
  children,
  className,
  variant = 'up',
}) => {
  const [ref, isVisible] = useScrollAnimation(0.15);

  return (
    <div
      ref={ref}
      className={[
        isVisible ? '' : 'opacity-0',
        'will-change-transform',
        isVisible ? variantClass[variant] : '',
        className || '',
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
