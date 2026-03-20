import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const About = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const [isHovered, setIsHovered] = useState(false);



  return (
    <section id="about" className={`py-20 px-4 border-b-2 relative overflow-hidden ${isLightMode ? 'border-blue-200/60 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200' : 'border-gray-700/50 bg-accent/5'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float-gentle ${isLightMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
        <div className={`absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-20 animate-float-gentle ${isLightMode ? 'bg-purple-400' : 'bg-purple-600'}`} style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 card-entrance">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isLightMode ? 'text-blue-900' : 'text-foreground'}`}>About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto animate-breathe"></div>
        </div>

        <Card
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            group relative shadow-lg transition-all duration-500 ease-out transform-gpu 
            hover:scale-[1.02] hover:-translate-y-1 overflow-visible card-entrance card-delay-2
            ${isLightMode 
              ? 'bg-white/80 border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-xl' 
              : 'bg-[#0f172a]/80 backdrop-blur-xl border-2 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-blue-400/60 hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)]'
            }
          `}
          style={{
            boxShadow: '0 4px 15px -3px #3b82f630, 0 0 20px -5px #3b82f620',
          }}
        >
          {/* Shimmer effect on hover */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg overflow-hidden ${isHovered ? 'animate-shimmer' : ''}`}></div>

          {/* Backlit Glow Effect (Filled Background on Hover) */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
            style={{
              background: '#3b82f615',
            }}
          />



          <CardContent className="p-8 relative z-10">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg border transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${isLightMode ? 'bg-blue-200/60 border-blue-300' : 'bg-primary/10 border-primary/30'}`}>
                <Target className="w-6 h-6 text-primary animate-icon-pulse" />
              </div>
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${isLightMode ? 'text-blue-900' : 'text-foreground'}`}>Objective</h3>
                <p className={`leading-relaxed font-medium ${isLightMode ? 'text-blue-800' : 'text-foreground/80'}`}>
                  Passionate and self-driven 2nd-year BCA student with foundational knowledge in Artificial Intelligence tools
                  and Microsoft Office applications. Actively seeking internships or collaborative project opportunities to apply
                  academic concepts in real-world settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
