import React, { useEffect, useState } from 'react';

interface Meteor {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

const MeteorEffect = () => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  /* Stars */
  interface Star {
    id: number;
    top: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
  }
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate static set of meteors
    const meteorCount = 8;
    const newMeteors = Array.from({ length: meteorCount }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 100), // 0-100%
      delay: Math.random() * 10, // 0-10s delay
      duration: Math.floor(Math.random() * 3000) + 2000, // 2-5s duration
    }));
    setMeteors(newMeteors);

    // Generate static set of stars
    const starCount = 40;
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 100),
      left: Math.floor(Math.random() * 100),
      size: Math.random() * 1.5 + 0.5, // slightly smaller
      delay: Math.random() * 5,
      duration: Math.random() * 3000 + 2000, // 2-5s
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-full w-full bg-black">
      {/* Subtle Star Field Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black"></div>

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white/80 shadow-[0_0_2px_rgba(255,255,255,0.8)]"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}ms ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: 0,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <span
          key={`meteor-${meteor.id}`}
          className="absolute top-1/2 left-1/2 h-[2px] w-[60px] bg-gradient-to-r from-cyan-500 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)] transform -rotate-[35deg]"
          style={{
            top: 0,
            left: `${meteor.left}%`,
            animation: `meteor ${meteor.duration}ms linear infinite`,
            animationDelay: `${meteor.delay}s`,
            opacity: 0,
          }}
        />
      ))}
      <style>
        {`
          @keyframes meteor {
            0% {
              transform: translateX(0) translateY(0) rotate(-35deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateX(-400px) translateY(400px) rotate(-35deg);
              opacity: 0;
            }
          }
          @keyframes twinkle {
            0%, 100% {
              opacity: 0.2;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MeteorEffect;
