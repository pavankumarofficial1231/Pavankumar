
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface LiquidFlowProps {
  isActive: boolean;
  index: number;
}

const LiquidFlow = ({ isActive, index }: LiquidFlowProps) => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className="relative w-16 h-16 flex items-center justify-center">
      {/* Outer Container */}
      <div className={`relative w-12 h-12 rounded-full border-4 transition-all duration-700 ${
        isLightMode 
          ? 'border-blue-400/60 bg-blue-50/30' 
          : 'border-primary/60 bg-primary/10'
      } ${inView ? 'scale-110 shadow-lg' : 'scale-100'}`}>
        
        {/* Liquid Flow Animation */}
        <div className={`absolute inset-1 rounded-full overflow-hidden ${
          isLightMode ? 'bg-blue-100/50' : 'bg-primary/20'
        }`}>
          <div 
            className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out ${
              isLightMode 
                ? 'bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300' 
                : 'bg-gradient-to-t from-primary via-blue-400 to-blue-300'
            } ${inView ? 'animate-liquid-rise' : ''}`}
            style={{
              height: inView ? '100%' : '0%',
              borderRadius: '50%',
              animation: inView ? `liquid-rise 1.5s ease-out ${index * 0.3}s forwards, liquid-wave 3s ease-in-out infinite ${index * 0.3 + 1.5}s` : 'none'
            }}
          />
          
          {/* Bubbles */}
          {inView && (
            <>
              <div className={`absolute w-1 h-1 rounded-full animate-bubble-1 ${
                isLightMode ? 'bg-blue-200' : 'bg-white/60'
              }`} style={{ animationDelay: `${index * 0.3 + 2}s` }} />
              <div className={`absolute w-0.5 h-0.5 rounded-full animate-bubble-2 ${
                isLightMode ? 'bg-blue-300' : 'bg-white/40'
              }`} style={{ animationDelay: `${index * 0.3 + 2.5}s` }} />
              <div className={`absolute w-1.5 h-1.5 rounded-full animate-bubble-3 ${
                isLightMode ? 'bg-blue-100' : 'bg-white/30'
              }`} style={{ animationDelay: `${index * 0.3 + 3}s` }} />
            </>
          )}
        </div>

        {/* Glow Effect */}
        {inView && (
          <div className={`absolute inset-0 rounded-full animate-pulse ${
            isLightMode 
              ? 'shadow-[0_0_20px_rgba(59,130,246,0.4)]' 
              : 'shadow-[0_0_20px_rgba(59,130,246,0.6)]'
          }`} />
        )}
      </div>

      {/* Ripple Effect */}
      {inView && (
        <div className={`absolute inset-0 rounded-full border-2 animate-ping ${
          isLightMode ? 'border-blue-400/30' : 'border-primary/30'
        }`} style={{ animationDelay: `${index * 0.3}s` }} />
      )}
    </div>
  );
};

export default LiquidFlow;
