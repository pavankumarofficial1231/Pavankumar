import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLightMode: boolean;
  width?: string;
  minHeight?: string;
  variant?: "default" | "certificates" | "publications" | "extracurricular";
  backlitColor?: string; // Optional color for backlit effect
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({
  children,
  onClick,
  className,
  isLightMode, // kept for API compatibility
  width = "w-80",
  minHeight = "min-h-[420px]",
  variant = "default",
  backlitColor,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "certificates":
        return "ring-1 ring-primary/20 hover:ring-primary/30";
      case "publications":
        return "ring-1 ring-accent/20 hover:ring-accent/30";
      case "extracurricular":
        return "bg-accent/10 border-border/30";
      default:
        return "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      aria-label={onClick ? "Open item" : undefined}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      className={cn(
        "marquee-item flex-shrink-0 p-4 border rounded-lg bg-card backdrop-blur-md relative group",
        "shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "snap-start overflow-visible",
        width,
        minHeight,
        getVariantClasses(),
        className
      )}
      style={backlitColor ? {
        boxShadow: `0 4px 15px -3px ${backlitColor}30, 0 0 20px -5px ${backlitColor}20`,
      } : undefined}
    >
      {/* Backlit Glow Effect */}
      {backlitColor && (
        <>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
            style={{
              background: `${backlitColor}15`,
            }}
          ></div>


        </>
      )}

      {children}
    </div>
  );
};

export default MarqueeCard;