import React from "react";
import { Star, BookOpen } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface CourseworkCarouselProps {
  coursework: string[];
}

const CourseworkCarousel: React.FC<CourseworkCarouselProps> = ({ coursework }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <div className="mb-12">
      <h3 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
        <BookOpen className="w-7 h-7 text-primary" />
        Key Coursework
      </h3>
      <div className="relative w-full px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {coursework.map((course, index) => {
              // Generate dynamic backlit color based on index
              const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];
              const backlitColor = colors[index % colors.length];

              return (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div
                    className="group relative px-6 py-4 border rounded-lg bg-card backdrop-blur-md shadow-lg hover:shadow-xl h-full flex items-center gap-3 ring-1 ring-primary/10 transition-all duration-300 overflow-visible"
                    style={{
                      boxShadow: `0 4px 15px -3px ${backlitColor}30, 0 0 20px -5px ${backlitColor}20`,
                    }}
                  >
                    {/* Backlit Glow Effect on Hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${backlitColor}25 0%, transparent 70%)`,
                        filter: 'blur(15px)',
                      }}
                    />

                    {/* Edge Backlit Glow */}
                    <div
                      className="absolute -inset-1 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg -z-10 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${backlitColor}60, transparent)`,
                      }}
                    />

                    <Star className="w-5 h-5 text-primary flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-medium text-foreground relative z-10">{course}</span>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default CourseworkCarousel;
