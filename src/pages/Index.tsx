import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

import MusicPlayer from '../components/MusicPlayer';
import AnimatedElements from '../components/AnimatedElements';
import ScrollProgress from '../components/ScrollProgress';
import ScrollToTop from '../components/ScrollToTop';
import FloatingElements from '../components/FloatingElements';
import ScrollReveal from '../components/ScrollReveal';
import LiquidBackground from '../components/LiquidBackground';
import MeteorEffect from '../components/MeteorEffect';
import GlobalParticleEffect from '../components/GlobalParticleEffect';
import { useTheme } from '../components/ThemeProvider';

const Index = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <div className={`min-h-screen relative w-full overflow-x-hidden ${isLightMode ? 'bg-[#f0f4f8]' : 'bg-[#050511]'}`}>
      <MeteorEffect />
      <LiquidBackground />
      <ScrollProgress />
      <Navigation />

      <MusicPlayer />
      <Hero />
      <About />
      <Education />

      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <ScrollToTop />
    </div>
  );
};

export default Index;
