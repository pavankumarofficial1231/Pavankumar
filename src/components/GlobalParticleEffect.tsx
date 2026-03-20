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
      if (now - lastTime < 40) return; 
      lastTime = now;

      // Create slightly more particles per tick if moving fast, but cap it so we don't crash
      for(let i=0; i < 2; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Use fixed positioning so it accurately follows the cursor anywhere on screen
        particle.style.position = 'fixed';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.zIndex = '9999';
        
        // Style the color balls with premium glowing box shadow
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 8px ${color}, 0 0 15px ${color}`;
        
        // Randomize sizes slightly for a more dynamic "ball" feel
        const size = 3 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Calculate random trajectory for this specific color ball
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 50;
        particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);

        document.body.appendChild(particle);

        // Cleanup: remove from DOM after the 2s animation finishes
        setTimeout(() => particle.remove(), 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme]);

  return null;
};

export default GlobalParticleEffect;
