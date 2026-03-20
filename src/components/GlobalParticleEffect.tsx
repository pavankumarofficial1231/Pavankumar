import React, { useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const GlobalParticleEffect = () => {
  const { theme } = useTheme();

  useEffect(() => {
    let lastTime = 0;
    
    // Array of vibrant, premium colors for the balls (adapting slightly for light/dark mode)
    const colors = theme === 'light' 
      ? ['#3b82f6', '#10b981', '#a855f7', '#ec4899', '#f59e0b']
      : ['#60a5fa', '#34d399', '#c084fc', '#f472b6', '#fbbf24'];

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle particle creation to maintain smooth performance (every 40ms)
      if (now - lastTime < 60) return; 
      lastTime = now;

      const particle = document.createElement('div');
      particle.className = 'particle';
      
      particle.style.position = 'fixed';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      particle.style.zIndex = '9999';
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      
      const size = 2 + Math.random() * 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';

      const angle = Math.random() * Math.PI * 2;
      const distance = 15 + Math.random() * 30;
      particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);

      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme]);

  return null;
};

export default GlobalParticleEffect;
