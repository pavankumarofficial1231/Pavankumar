
import React from 'react';
import { useTheme } from './ThemeProvider';

const AnimatedElements = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {isLightMode && (
        <>
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-8 h-8 bg-blue-400/20 rounded-full animate-float blur-sm"></div>
          <div className="absolute top-40 right-16 w-6 h-6 bg-purple-400/20 rounded-full animate-float-delayed blur-sm"></div>
          <div className="absolute top-32 left-1/3 w-4 h-4 bg-pink-400/20 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-60 right-1/3 w-5 h-5 bg-indigo-400/20 rounded-full animate-float-delayed blur-sm" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Larger gradient orbs */}
          <div className="absolute top-1/4 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-float blur-2xl"></div>
          <div className="absolute bottom-1/4 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full animate-float-delayed blur-2xl"></div>
          
          {/* Animated lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/10 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        </>
      )}
    </div>
  );
};

export default AnimatedElements;
