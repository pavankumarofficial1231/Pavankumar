import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Rocket, Layers } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import RippleButton from './RippleButton';
import TiltWrapper from './shared/TiltWrapper';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoLink?: string;
  repoLink?: string;
  gradient: string;
  featured?: boolean;
}

const Projects = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  const projects: Project[] = [
    {
      id: 1,
      title: "Geniusphere",
      description: "My best project to date. An advanced, highly-interactive web application featuring a stunning UI, dynamic animations, and seamless user experiences.",
      tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
      image: "/geniusphere-preview.png",
      demoLink: "https://geniusphere.vercel.app/",
      repoLink: "https://github.com/pavankumarofficial1231/Geniusphere",
      gradient: "from-pink-500 via-purple-500 to-indigo-500",
      featured: true
    }
  ];

  return (
    <section id="projects" className="relative w-full py-32 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20 animate-blob ${isLightMode ? 'bg-blue-300' : 'bg-blue-900/40'}`}></div>
        <div className={`absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-20 animate-blob ${isLightMode ? 'bg-purple-300' : 'bg-indigo-900/40'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className={`mb-6 px-4 py-1.5 text-sm font-medium rounded-full backdrop-blur-md border ${isLightMode ? 'bg-white/50 border-blue-200 text-blue-700' : 'bg-white/10 border-white/20 text-blue-300'}`}>
            <Layers className="w-3.5 h-3.5 mr-2 inline-block" />
            Featured Projects
          </Badge>
          <h2 className={`text-5xl md:text-6xl font-bold mb-8 tracking-tight ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Impact</span>
          </h2>
          <p className={`text-xl leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
            Explore {projects.length} innovative projects that solve real-world problems.
          </p>
        </div>

        {/* Centered Project Display */}
        <div className="relative mb-16 flex justify-center w-full">
          <div className="w-full flex justify-center px-4 md:px-12">
            <div className="flex justify-center gap-6">
              {projects.map((project, index) => (
                <TiltWrapper key={`${project.id}-${index}`} maxTilt={8} scale={1.05}>
                  <div
                    className={`
                    flex-shrink-0 w-[350px]
                    relative rounded-lg overflow-hidden border
                    shadow-xl transition-all duration-500
                    hover:shadow-2xl hover:-translate-y-2 hover:scale-105
                    ${project.featured 
                      ? isLightMode ? 'bg-white border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)]' : 'bg-[#0f172a] border-pink-500/50 shadow-[0_0_40px_rgba(236,72,153,0.3)]'
                      : isLightMode ? 'bg-white border-gray-200' : 'bg-[#0f172a] border-white/10'
                    }
                  `}
                  style={{
                    boxShadow: project.featured 
                      ? `0 10px 40px -10px rgba(236, 72, 153, 0.5), 0 0 50px -10px #ec489980`
                      : `0 10px 30px -10px rgba(0, 0, 0, 0.3), 0 0 40px -10px ${project.gradient.includes('blue') ? '#3b82f6' : project.gradient.includes('purple') ? '#a855f7' : project.gradient.includes('emerald') ? '#10b981' : '#f97316'}40`,
                  }}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 z-30">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-pink-500 blur-md opacity-50 rounded-full animate-pulse"></div>
                        <Badge className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 font-black shadow-lg shadow-pink-500/30 px-3 py-1 text-[10px] uppercase tracking-widest">
                          🏆 Best Try
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Gradient Border */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`}></div>

                  {/* Backlit Glow Effect (Filled) */}
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `${project.gradient.includes('pink') ? '#ec489915' : project.gradient.includes('blue') ? '#3b82f615' : project.gradient.includes('purple') ? '#a855f715' : project.gradient.includes('emerald') ? '#10b98115' : '#f9731615'}`,
                    }}
                  ></div>

                  {/* Content */}
                  <div className="p-4 relative">

                    {/* Number Watermark */}
                    <div
                      className={`
                        absolute -top-1 -right-1 text-[60px] font-black leading-none select-none
                        transition-all duration-500 group-hover:scale-110
                        ${isLightMode ? 'text-gray-100' : 'text-white/5'}
                      `}
                    >
                      {String(project.id).padStart(2, '0')}
                    </div>

                    {/* Image with Backlit Glow */}
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3 group bg-gray-100 dark:bg-gray-800">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                      ></div>
                      {/* Image Backlit Glow */}
                      <div
                        className="absolute -inset-2 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl -z-10"
                        style={{
                          background: `linear-gradient(to right, ${project.gradient.includes('blue') ? '#3b82f6' : project.gradient.includes('purple') ? '#a855f7' : project.gradient.includes('emerald') ? '#10b981' : '#f97316'}, transparent)`,
                        }}
                      ></div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2 relative z-10">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className={`
                            px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider
                            transition-all duration-300 hover:scale-110
                            ${isLightMode
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }
                          `}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-black leading-tight mb-2 relative z-10 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-[11px] leading-relaxed line-clamp-2 mb-3 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                      {project.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-2 relative z-10">
                      <RippleButton
                        className={`
                          flex-1 px-3 py-1.5 rounded-md font-bold text-[10px] flex items-center justify-center gap-1
                          transition-all duration-300 hover:scale-105 hover:shadow-lg
                          ${isLightMode
                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-white text-gray-900 hover:bg-gray-100'
                          }
                        `}
                        onClick={() => project.demoLink && window.open(project.demoLink, '_blank')}
                      >
                        <Rocket className="w-3 h-3" />
                        Demo
                      </RippleButton>

                      <Button
                        variant="outline"
                        className={`
                          flex-1 px-3 py-1.5 rounded-md font-bold text-[10px] flex items-center justify-center gap-1
                          transition-all duration-300 hover:scale-105
                          ${isLightMode
                            ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'border border-white/20 text-gray-300 hover:bg-white/5'
                          }
                        `}
                        onClick={() => project.repoLink && window.open(project.repoLink, '_blank')}
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
                </TiltWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className={`
              group rounded-full px-8 py-6 text-lg font-medium
              transition-all duration-300 hover:scale-105
              ${isLightMode
                ? 'border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                : 'border-white/20 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-900/20'
              }
            `}
            onClick={() => window.open("https://github.com/pavankumarofficial1231", "_blank")}
          >
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Projects;
