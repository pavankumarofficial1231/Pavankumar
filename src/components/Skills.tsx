import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Shield, Users, Zap, Globe, Wrench } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import MarqueeContainer from './shared/MarqueeContainer';
import { Card } from '@/components/ui/card';

const Skills = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  // NOTE: We are implementing a custom marquee card manually here to ensure
  // full compatibility with the existing animations and layout we designed,
  // while wrapping it in the marquee container structure.

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["C", "Java", "Python"],
      color: "#3b82f6", // Blue
    },
    {
      title: "Cybersecurity",
      icon: Shield,
      skills: ["Basic Threat Analysis"],
      color: "#ef4444", // Red
    },
    {
      title: "AI Tools",
      icon: Zap,
      skills: ["ChatGPT", "Gemini AI"],
      color: "#f59e0b", // Amber
    },
    {
      title: "Microsoft Applications",
      icon: Wrench,
      skills: ["Word", "Excel", "PowerPoint", "Access"],
      color: "#10b981", // Green
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: ["Teamwork", "Problem-solving", "Time Management", "Communication"],
      color: "#a855f7", // Purple
    },
    {
      title: "Languages",
      icon: Globe,
      skills: ["English (Fluent)", "Tamil (Bilingual)", "Kannada (Native)", "Telugu (Basic)"],
      color: "#ec4899", // Pink
    }
  ];

  // duplicate list for infinite scroll
  const marqueeList = [...skillCategories, ...skillCategories, ...skillCategories];



  return (
    <section id="skills" className={`py-20 px-4 border-b-2 relative overflow-hidden ${isLightMode ? 'border-blue-200/60 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200' : 'border-gray-700/50 bg-accent/5'}`}>

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-float-gentle ${isLightMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
        <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float-gentle ${isLightMode ? 'bg-purple-400' : 'bg-purple-600'}`} style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-12 card-entrance">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isLightMode ? 'text-blue-900' : 'text-foreground'}`}>
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto animate-breathe"></div>
          <p className={`mt-4 text-lg animate-fade-in ${isLightMode ? 'text-blue-700' : 'text-foreground/70'}`} style={{ animationDelay: '0.2s' }}>
            My technical arsenal and capabilities
          </p>
        </div>

        {/* Marquee Implementation */}
        <div className="w-full py-4 mask-fade-sides overflow-hidden relative">
          <MarqueeContainer
            animationName="marquee-left" // Standard left-scroll animation
            duration={40} // Adjust for speed
            pauseOnHover={true}
            className="flex gap-6 items-stretch"
          >
            {marqueeList.map((category, index) => (
              <div key={`${category.title}-${index}`} className="flex-shrink-0 w-[350px] h-full p-2">
                <Card
                  className={`
                      group h-full relative border shadow-lg transition-all duration-500 ease-out transform-gpu
                      hover:scale-[1.03] hover:-translate-y-1 overflow-visible cursor-pointer flex flex-col
                      ${isLightMode
                      ? 'bg-white/60 border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50'
                      : 'bg-card/40 border-primary/20 hover:border-primary/50 hover:shadow-primary/20'
                    }
                    `}
                  style={{
                    boxShadow: `0 4px 15px -3px ${category.color}30, 0 0 20px -5px ${category.color}20`,
                  }}
                >
                  {/* Backlit Glow Effect on Hover (Solid Fill) */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
                    style={{
                      background: `${category.color}15`,
                    }}
                  />

                  <CardHeader className="relative z-10 pb-2">
                    <CardTitle className={`flex items-center gap-3 text-lg ${isLightMode ? 'text-blue-900' : 'text-foreground'}`}>
                      <div
                        className={`
                            p-2 rounded-lg border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
                            ${isLightMode ? 'bg-blue-100 border-blue-200' : 'bg-primary/10 border-primary/30'}
                          `}
                        style={{ color: category.color }}
                      >
                        <category.icon className="w-5 h-5 animate-icon-pulse" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-2 flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className={`
                              border font-medium transition-all duration-300 hover:scale-105
                              ${isLightMode
                              ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              : 'bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary'
                            }
                            `}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </MarqueeContainer>
        </div>
      </div>
    </section>
  );
};

export default Skills;
