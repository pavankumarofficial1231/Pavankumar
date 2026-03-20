import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], input, textarea, select')) {
        cursor.classList.add('custom-cursor-hover');
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], input, textarea, select')) {
        cursor.classList.remove('custom-cursor-hover');
      }
    };

    const animate = () => {
      // Smooth cursor following with easing
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;
      
      cursorPosition.current.x += dx * 0.1;
      cursorPosition.current.y += dy * 0.1;

      cursor.style.left = `${cursorPosition.current.x - 10}px`;
      cursor.style.top = `${cursorPosition.current.y - 10}px`;

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        borderColor: theme === 'dark' 
          ? 'rgba(59, 130, 246, 0.8)' 
          : 'rgba(30, 144, 255, 0.8)'
      }}
    />
  );
};

export default CustomCursor;