import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const ThemeCursorGlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      sx: number;
      sy: number;
      size: number;
      life: number;
      color: string;
    }> = [];

    const colors = isLightMode 
      ? ['rgba(59, 130, 246, 0.4)', 'rgba(168, 85, 247, 0.4)', 'rgba(6, 182, 212, 0.4)'] 
      : ['rgba(59, 130, 246, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(6, 182, 212, 0.6)'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouseRef.current.active) {
        // Create new particles at mouse position
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            sx: (Math.random() - 0.5) * 2,
            sy: (Math.random() - 0.5) * 2,
            size: Math.random() * 4 + 2,
            life: 1,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }

      // Update and draw particles
      ctx.globalCompositeOperation = isLightMode ? 'multiply' : 'screen';
      particles = particles.filter(p => {
        p.x += p.sx;
        p.y += p.sy;
        p.life -= 0.015;
        p.size *= 0.98;

        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `, ${p.life})`);
        ctx.fill();
        return true;
      });

      // Simple mouse glow ball
      if (mouseRef.current.active) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 100
        );
        gradient.addColorStop(0, isLightMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.25)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLightMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100] w-full h-full"
    />
  );
};

export default ThemeCursorGlow;
