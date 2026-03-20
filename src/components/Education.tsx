
import React from 'react';
import InteractiveTimeline from './InteractiveTimeline';
import { useTheme } from './ThemeProvider';

const Education = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <section id="education" className={`py-20 px-4 border-b-2 relative overflow-hidden ${isLightMode ? 'border-blue-200/60 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200' : 'border-gray-700/50 bg-accent/5'}`}>
      {/* Background blobs removed for visual clarity and performance */}

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
