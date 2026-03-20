
import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const FloatingSparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== 'dark') {
      setSparkles([]);
      return;
    }

    const createSparkle = (): Sparkle => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    });

    const initialSparkles = Array.from({ length: 15 }, createSparkle);
    setSparkles(initialSparkles);

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkles = [...prev];
        if (Math.random() < 0.3) {
          newSparkles.push(createSparkle());
        }
        return newSparkles.slice(-20); // Keep max 20 sparkles
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [theme]);

  if (theme !== 'dark') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: '3s',
          }}
        >
          <div
            className="text-yellow-300 opacity-70"
            style={{ fontSize: sparkle.size }}
          >
            ✨
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingSparkles;
