import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackText?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  fallbackText = "Image not available",
  loading = "eager",
  onLoad,
  onError
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  return (
    <div className={cn(
      "relative group overflow-hidden bg-gradient-to-br from-blue-100/80 to-blue-200/30 dark:from-gray-900 dark:to-gray-700 flex items-center justify-center rounded-lg border border-white/5",
      containerClassName
    )}>
      {/* Glossy Overlay & Shine */}
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-20 group-hover:animate-shine z-20 pointer-events-none" />

      {!imageError && src ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-contain object-center transition-all duration-700 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          loading={loading}
          decoding="async"
          style={{
            borderRadius: 8,
            background: "transparent",
            maxWidth: "100%",
            maxHeight: "100%",
            imageRendering: 'auto'
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        <div className="text-muted-foreground text-sm flex items-center justify-center w-full h-full">
          {fallbackText}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;