import React, { useEffect } from 'react';

const TouchSparkles = () => {
  useEffect(() => {
    const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4'];
    
    const head = document.head;
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      .touch-particle {
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: vanish 0.8s ease-out forwards;
      }
      @keyframes vanish {
        0% { transform: scale(1) translate(0, 0); opacity: 1; }
        100% { transform: scale(0) translate(var(--tx), var(--ty)); opacity: 0; }
      }
    `;
    head.appendChild(styleTag);

    const handleTouch = (e: MouseEvent | TouchEvent) => {
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      for (let i = 0; i < 6; i++) {
        const p = document.createElement('div');
        p.className = 'touch-particle';
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.background = color;
        p.style.boxShadow = `0 0 10px ${color}`;
        p.style.left = `${x - 4}px`;
        p.style.top = `${y - 4}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 30 + Math.random() * 50;
        p.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
        p.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }
    };

    window.addEventListener('mousedown', handleTouch);
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
      if (styleTag.parentNode) head.removeChild(styleTag);
    };
  }, []);

  return null;
};

export default TouchSparkles;
