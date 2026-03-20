import React from 'react';
import { useTheme } from './ThemeProvider';

const FloatingElements = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating geometric shapes */}
      <div 
        className={`absolute top-1/4 left-1/4 w-20 h-20 rounded-full animate-float opacity-20 ${
          isLightMode ? 'bg-blue-300' : 'bg-blue-500'
        }`}
        style={{ animationDelay: '0s', animationDuration: '8s' }}
      />
      
      <div 
        className={`absolute top-1/3 right-1/4 w-16 h-16 rotate-45 animate-float opacity-15 ${
          isLightMode ? 'bg-purple-300' : 'bg-purple-500'
        }`}
        style={{ animationDelay: '2s', animationDuration: '10s' }}
      />
      
      <div 
        className={`absolute bottom-1/4 left-1/3 w-12 h-12 rounded-full animate-float opacity-25 ${
          isLightMode ? 'bg-cyan-300' : 'bg-cyan-500'
        }`}
        style={{ animationDelay: '4s', animationDuration: '6s' }}
      />
      
      <div 
        className={`absolute bottom-1/3 right-1/3 w-24 h-24 rotate-12 animate-float opacity-10 ${
          isLightMode ? 'bg-indigo-300' : 'bg-indigo-500'
        }`}
        style={{ 
          animationDelay: '1s', 
          animationDuration: '12s',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      />

      {/* Floating dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full animate-float ${
            isLightMode ? 'bg-blue-400/30' : 'bg-blue-300/40'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div 
        className="absolute top-1/5 right-1/5 w-32 h-32 rounded-full animate-float-delayed opacity-10"
        style={{
          background: isLightMode 
            ? 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(147,197,253,0.1) 50%, transparent 100%)'
            : 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(147,197,253,0.2) 50%, transparent 100%)',
          filter: 'blur(20px)',
          animationDuration: '15s'
        }}
      />
      
      <div 
        className="absolute bottom-1/5 left-1/5 w-40 h-40 rounded-full animate-float opacity-8"
        style={{
          background: isLightMode
            ? 'radial-gradient(circle, rgba(139,69,244,0.2) 0%, rgba(196,181,253,0.1) 50%, transparent 100%)'
            : 'radial-gradient(circle, rgba(139,69,244,0.3) 0%, rgba(196,181,253,0.15) 50%, transparent 100%)',
          filter: 'blur(25px)',
          animationDelay: '3s',
          animationDuration: '18s'
        }}
      />
    </div>
  );
};

export default FloatingElements;