
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`
      fixed top-0 w-full z-40 transition-all duration-300 border-b
      ${scrolled 
        ? isLightMode 
          ? 'bg-blue-100/90 backdrop-blur-lg shadow-lg border-blue-300/50' 
          : 'bg-background/95 backdrop-blur-sm shadow-lg border-primary/20'
        : isLightMode
          ? 'bg-blue-50/70 backdrop-blur-md border-blue-200/50'
          : 'bg-transparent border-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pavan Kumar S
            </div>
            <Badge variant="secondary" className={`animate-pulse border-2 ${isLightMode ? 'bg-blue-200/80 text-blue-900 border-blue-400' : 'border-primary/40'}`}>
              BCA Student
            </Badge>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`
                  text-sm font-medium transition-all duration-300 hover:text-primary relative group
                  ${isLightMode ? 'text-blue-800' : 'text-foreground/80 hover:text-white'}
                `}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button (visible only on mobile) */}
          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-primary/80 ${
                isLightMode ? 'hover:bg-blue-200/80 text-blue-800' : ''
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              style={{ border: '1.5px solid', borderColor: isLightMode ? '#93c5fd99' : '#444' }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className={`
            md:hidden absolute left-0 right-0 top-16 mx-4 rounded-lg p-4 shadow-xl animate-scale-in border-2
            ${isLightMode 
              ? 'bg-blue-100/95 backdrop-blur-lg border-blue-300/50' 
              : 'bg-background/95 backdrop-blur-sm border-primary/30'
            }
          `}>
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    block w-full text-left px-3 py-2 rounded-md text-sm font-medium 
                    transition-all duration-300 hover:text-primary animate-slide-up
                    ${isLightMode 
                      ? 'text-blue-800 hover:bg-blue-200/80' 
                      : 'hover:bg-accent text-foreground'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
