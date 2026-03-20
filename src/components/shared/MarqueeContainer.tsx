import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeContainerProps {
  children: React.ReactNode;
  className?: string;
  animationName: string;
  duration?: number;
  pauseOnHover?: boolean;
}

const MarqueeContainer: React.FC<MarqueeContainerProps> = ({
  children,
  className,
  animationName,
  duration = 40,
  pauseOnHover = true,
}) => {
  return (
    <>
      <style>{`
        @keyframes ${animationName} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Track that moves for the marquee effect */
        .animate-${animationName} {
          animation: ${animationName} ${duration}s linear infinite;
          width: max-content;
          will-change: transform;
          display: flex;
          gap: 1.5rem;
        }

        /* Scrollable container - no mask to prevent image disappearing */
        .marquee-container-${animationName} {
          position: relative;
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x proximity;
          scrollbar-width: none;           /* Firefox */
          -ms-overflow-style: none;        /* IE/Edge */
        }
        .marquee-container-${animationName}::-webkit-scrollbar { display: none; } /* Chrome/Safari */

        ${pauseOnHover ? `.marquee-item:hover ~ .animate-${animationName}, .marquee-item:hover { animation-play-state: paused; }` : ''}

        .marquee-item {
          flex-shrink: 0;
          transform: translateZ(0);
          backface-visibility: hidden;
          scroll-snap-align: start;
        }
      `}</style>

      <div className={cn("marquee-container-" + animationName, className)}>
        <div
          className={`animate-${animationName} pb-4`}
          style={{ animationDuration: `${duration}s` }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default MarqueeContainer;