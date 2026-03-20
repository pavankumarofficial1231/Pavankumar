
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Download, Instagram } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { generateResumePDF } from '@/utils/pdfGenerator';
import RippleButton from './RippleButton';

const Hero = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  const handleDownloadResume = () => {
    generateResumePDF();
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center px-4 pt-12 border-b-2 relative ${isLightMode
        ? 'border-blue-200/60 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200'
        : 'border-gray-700/50 bg-gradient-to-br from-primary/5 via-background to-accent/5'
        }`}
    >
      {/* Add name in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className={`text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold opacity-5 select-none whitespace-nowrap ${isLightMode ? 'text-blue-600' : 'text-primary'
          }`}>
          Pavan Kumar.S
        </h1>
      </div>

      <div className="max-w-7xl mx-auto animate-fade-in w-full relative z-10">
        <div
          className={`rounded-3xl p-8 md:p-12 backdrop-blur-xl border-2 shadow-2xl transition-all duration-500 ${isLightMode
            ? 'bg-white/40 border-blue-300/60'
            : 'bg-black/10 border-primary/20'
            }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* TEXT LEFT SIDE */}
            <div className="w-full space-y-6 order-2 sm:order-1">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className={`inline-block animate-bounce font-semibold ${isLightMode ? 'bg-blue-200/80 text-blue-900 border-blue-400' : 'bg-primary/20 border border-primary/40 text-primary'}`}>
                    BCA Student & AI Enthusiast
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-in-up drop-shadow-lg text-reveal text-center sm:text-left">
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Pavan Kumar.S</span>
                </h1>
                <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed animate-fade-in-up font-medium text-center sm:text-left ${isLightMode ? 'text-blue-800' : 'text-foreground'}`} style={{ animationDelay: '0.2s' }}>
                  Passionate 2nd-year BCA student exploring AI tools, Aspiring AI Business Strategist, and innovative technology solutions
                </p>
              </div>

              <div className={`flex flex-wrap gap-3 text-sm animate-fade-in-up pt-4 border-t ${isLightMode ? 'border-blue-300/50 text-blue-600' : 'border-primary/20 text-foreground'}`} style={{ animationDelay: '0.4s' }}>
                <div className={`group relative flex items-center gap-2 rounded-full px-3 py-2 border transition-all duration-300 overflow-visible ${isLightMode ? 'bg-white/60 border-blue-300 text-blue-700 hover:border-blue-400' : 'bg-primary/10 border-primary/30 text-foreground hover:border-primary/50'}`}
                  style={{ boxShadow: '0 4px 15px -3px #3b82f630, 0 0 20px -5px #3b82f620' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
                    style={{ background: 'radial-gradient(circle at 50% 50%, #3b82f625 0%, transparent 70%)', filter: 'blur(10px)' }}
                  />
                  <Mail className="w-4 h-4 text-primary relative z-10" />
                  <span className="font-medium relative z-10">pavankumarofficialcareers@gmail.com</span>
                </div>
                <div className={`group relative flex items-center gap-2 rounded-full px-3 py-2 border transition-all duration-300 overflow-visible ${isLightMode ? 'bg-white/60 border-blue-300 text-blue-700 hover:border-blue-400' : 'bg-primary/10 border-primary/30 text-foreground hover:border-primary/50'}`}
                  style={{ boxShadow: '0 4px 15px -3px #10b98130, 0 0 20px -5px #10b98120' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
                    style={{ background: 'radial-gradient(circle at 50% 50%, #10b98125 0%, transparent 70%)', filter: 'blur(10px)' }}
                  />
                  <Phone className="w-4 h-4 text-primary relative z-10" />
                  <span className="font-medium relative z-10">+91-9353448356</span>
                </div>
                <div className={`group relative flex items-center gap-2 rounded-full px-3 py-2 border transition-all duration-300 overflow-visible ${isLightMode ? 'bg-white/60 border-blue-300 text-blue-700 hover:border-blue-400' : 'bg-primary/10 border-primary/30 text-foreground hover:border-primary/50'}`}
                  style={{ boxShadow: '0 4px 15px -3px #f9731630, 0 0 20px -5px #f9731620' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
                    style={{ background: 'radial-gradient(circle at 50% 50%, #f9731625 0%, transparent 70%)', filter: 'blur(10px)' }}
                  />
                  <MapPin className="w-4 h-4 text-primary relative z-10" />
                  <span className="font-medium relative z-10">Bangalore, Karnataka</span>
                </div>
              </div>

              <div className={`flex flex-wrap gap-4 animate-fade-in-up pt-4 border-t ${isLightMode ? 'border-blue-300/50' : 'border-primary/20'}`} style={{ animationDelay: '0.6s' }}>
                <Button variant="outline" size="sm" asChild className={`group relative magnetic-button ripple-effect transition-all duration-300 overflow-visible ${isLightMode ? 'bg-white/60 border-blue-300 text-blue-800 hover:border-blue-400' : 'bg-primary/10 border-primary/40 text-foreground hover:border-primary/60'}`}
                  style={{ boxShadow: '0 4px 15px -3px #0077b530, 0 0 20px -5px #0077b520' }}
                >
                  <a href="https://linkedin.com/in/pavan-kumar-s-3918372a5" target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"
                      style={{ background: 'radial-gradient(circle at 50% 50%, #0077b525 0%, transparent 70%)', filter: 'blur(10px)' }}
                    />
                    <Linkedin className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className={`group relative magnetic-button ripple-effect transition-all duration-300 overflow-visible ${isLightMode ? 'bg-white/60 border-blue-300 text-blue-800 hover:border-blue-400' : 'bg-primary/10 border-primary/40 text-foreground hover:border-primary/60'}`}
                  style={{ boxShadow: '0 4px 15px -3px #33333330, 0 0 20px -5px #33333320' }}
                >
                  <a href="https://github.com/pavankumarofficial1231" target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"
                      style={{ background: 'radial-gradient(circle at 50% 50%, #33333325 0%, transparent 70%)', filter: 'blur(10px)' }}
                    />
                    <Github className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className={`group relative magnetic-button ripple-effect transition-all duration-300 overflow-visible ${isLightMode ? 'bg-white/60 border-blue-300 text-blue-800 hover:border-blue-400' : 'bg-primary/10 border-primary/40 text-foreground hover:border-primary/60'}`}
                  style={{ boxShadow: '0 4px 15px -3px #1DA1F230, 0 0 20px -5px #1DA1F220' }}
                >
                  <a href="https://x.com/1231PavanKumar" target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"
                      style={{ background: 'radial-gradient(circle at 50% 50%, #1DA1F225 0%, transparent 70%)', filter: 'blur(10px)' }}
                    />
                    <Twitter className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Twitter</span>
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className={`group relative magnetic-button ripple-effect transition-all duration-300 overflow-visible ${isLightMode ? 'bg-white/60 border-blue-300 text-blue-800 hover:border-blue-400' : 'bg-primary/10 border-primary/40 text-foreground hover:border-primary/60'}`}
                  style={{ boxShadow: '0 4px 15px -3px #E4405F30, 0 0 20px -5px #E4405F20' }}
                >
                  <a href="https://www.instagram.com/pavankumarworld1231/" target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"
                      style={{ background: 'radial-gradient(circle at 50% 50%, #E4405F25 0%, transparent 70%)', filter: 'blur(10px)' }}
                    />
                    <Instagram className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Instagram</span>
                  </a>
                </Button>
              </div>

              <div className={`pt-4 animate-fade-in-up border-t ${isLightMode ? 'border-blue-300/50' : 'border-primary/20'}`} style={{ animationDelay: '0.8s' }}>
                <RippleButton
                  size="lg"
                  onClick={handleDownloadResume}
                  className={`magnetic-button font-semibold shadow-lg transition-all duration-300 transform ${isLightMode ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white border-2 border-blue-400' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-2 border-primary/50'}`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </RippleButton>
              </div>
            </div>

            {/* IMAGE RIGHT SIDE */}
            <div className="w-full flex justify-center order-1 sm:order-2">
              <div
                className={`relative rounded-2xl overflow-hidden border-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out transform-gpu group hover:scale-[1.03] hover:-translate-y-2 ${isLightMode ? 'border-blue-400/70' : 'border-primary/50'}`}
                style={{ boxShadow: '0 4px 20px -3px #3b82f640, 0 0 30px -5px #3b82f630, 0 20px 50px rgba(0,0,0,0.5)' }}
              >
                {/* Backlit Glow Effect */}
                <div
                  className="absolute -inset-2 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl -z-10 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #a855f7, #06b6d4)' }}
                />

                {/* Glossy Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                <img
                  src="/lovable-uploads/8def82d4-ef16-4791-ac97-0d7e95989c53.png"
                  alt="Pavan Kumar.S"
                  className="w-80 h-96 md:w-[400px] md:h-[450px] lg:w-[450px] lg:h-[500px] object-contain bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 ${isLightMode ? 'bg-blue-400/10' : 'bg-primary/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
