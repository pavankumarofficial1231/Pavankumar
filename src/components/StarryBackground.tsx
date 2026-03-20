
import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

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

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkle: number;
      speed: number;
      moveX: number;
      moveY: number;
      sparkleTimer: number;
    }> = [];

    // Create stars with movement properties
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        moveX: (Math.random() - 0.5) * 0.3,
        moveY: (Math.random() - 0.5) * 0.3,
        sparkleTimer: Math.random() * 100,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (theme === 'dark') {
        stars.forEach((star) => {
          // Update twinkle
          star.twinkle += star.speed;
          const alpha = (Math.sin(star.twinkle) + 1) * 0.5 * star.opacity;
          
          // Update position for drift
          star.x += star.moveX;
          star.y += star.moveY;
          
          // Wrap around screen
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;
          
          // Update sparkle timer
          star.sparkleTimer += 1;
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          // Add sparkle effect with movement
          if (star.sparkleTimer % 200 < 50) {
            const sparkleSize = star.size * 2;
            ctx.beginPath();
            ctx.moveTo(star.x - sparkleSize, star.y);
            ctx.lineTo(star.x + sparkleSize, star.y);
            ctx.moveTo(star.x, star.y - sparkleSize);
            ctx.lineTo(star.x, star.y + sparkleSize);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 1.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Additional diagonal sparkle lines
            ctx.beginPath();
            ctx.moveTo(star.x - sparkleSize * 0.7, star.y - sparkleSize * 0.7);
            ctx.lineTo(star.x + sparkleSize * 0.7, star.y + sparkleSize * 0.7);
            ctx.moveTo(star.x + sparkleSize * 0.7, star.y - sparkleSize * 0.7);
            ctx.lineTo(star.x - sparkleSize * 0.7, star.y + sparkleSize * 0.7);
            ctx.stroke();
          }
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  if (theme !== 'dark') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarryBackground;
