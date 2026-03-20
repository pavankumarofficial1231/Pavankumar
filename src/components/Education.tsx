
import React from 'react';
import InteractiveTimeline from './InteractiveTimeline';
import { useTheme } from './ThemeProvider';

const Education = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <section id="education" className={`py-20 px-4 border-b-2 relative overflow-hidden ${isLightMode ? 'border-blue-200/60 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200' : 'border-gray-700/50 bg-accent/5'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 animate-float-gentle ${isLightMode ? 'bg-indigo-400' : 'bg-indigo-600'}`}></div>
        <div className={`absolute bottom-10 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 animate-float-gentle ${isLightMode ? 'bg-cyan-400' : 'bg-cyan-600'}`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 card-entrance">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isLightMode ? 'text-blue-900' : 'text-white'}`}>Education Journey</h2>
          <div className="w-20 h-1 bg-primary mx-auto animate-breathe"></div>
          <p className={`mt-4 text-lg card-entrance card-delay-2 ${isLightMode ? 'text-blue-700' : 'text-foreground/70'}`}>
            Click on any item to explore more details
          </p>
        </div>

        <div className="card-entrance card-delay-3">
          <InteractiveTimeline />
        </div>
      </div>
    </section>
  );
};

export default Education;
