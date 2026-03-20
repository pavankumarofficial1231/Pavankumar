import React from "react";
import { Star, BookOpen } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import MarqueeContainer from "./shared/MarqueeContainer";

interface CourseworkMarqueeProps {
  coursework: string[];
}

const CourseworkMarquee: React.FC<CourseworkMarqueeProps> = ({ coursework }) => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  // Double the coursework for seamless loop
  const marqueeList = [...coursework, ...coursework];

  return (
    <div className="mb-12">
      <h3 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
        <BookOpen className="w-7 h-7 text-primary" />
        Key Coursework
      </h3>

      <div
        className={`relative w-full p-4 rounded-lg ${isLightMode
            ? "bg-gradient-to-r from-blue-50/80 via-blue-100/60 to-blue-50/80"
            : "bg-gradient-to-r from-background via-accent/10 to-background"
          }`}
      >
        <MarqueeContainer
          animationName="marquee-coursework"
          duration={Math.max(25, coursework.length * 5)}
          pauseOnHover={true}
        >
          {marqueeList.map((course, index) => {
            // Generate dynamic color based on index
            const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];
            const backlitColor = colors[index % colors.length];

            return (
              <div
                key={`course-${index}`}
                className="marquee-item flex-shrink-0 px-6 py-4 border rounded-lg bg-card backdrop-blur-md shadow-md h-full flex items-center gap-3 ring-1 ring-primary/10 min-w-[280px] relative group transition-all duration-300 hover:shadow-xl"
                style={{
                  boxShadow: `0 4px 15px -3px ${backlitColor}30, 0 0 20px -5px ${backlitColor}20`,
                }}
              >
                {/* Backlit Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${backlitColor}25 0%, transparent 70%)`,
                    filter: 'blur(15px)',
                  }}
                ></div>

                {/* Outer Backlit Glow */}
                <div
                  className="absolute -inset-1 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg -z-10 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${backlitColor}60, transparent)`,
                  }}
                ></div>

                <Star
                  className="w-5 h-5 flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: backlitColor }}
                />
                <span className="font-medium text-foreground relative z-10">{course}</span>
              </div>
            );
          })}
        </MarqueeContainer>
      </div>
    </div>
  );
};

export default CourseworkMarquee;
