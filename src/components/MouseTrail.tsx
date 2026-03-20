import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const MouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number; opacity: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Add new trail point
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1
      });

      // Limit trail length
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trail
      trailRef.current.forEach((point, index) => {
        point.opacity *= 0.95;
        
        if (point.opacity > 0.01) {
          const size = (index / trailRef.current.length) * 8;
          const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size);
          
          if (theme === 'dark') {
            gradient.addColorStop(0, `rgba(59, 130, 246, ${point.opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
          } else {
            gradient.addColorStop(0, `rgba(30, 144, 255, ${point.opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(30, 144, 255, 0)`);
          }

          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Remove faded points
      trailRef.current = trailRef.current.filter(point => point.opacity > 0.01);

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MouseTrail;