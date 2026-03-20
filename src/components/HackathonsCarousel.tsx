import React, { useState } from "react";
import { Calendar, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import OptimizedImage from "./shared/OptimizedImage";
import Autoplay from "embla-carousel-autoplay";

export interface Hackathon {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
}

interface HackathonsCarouselProps {
  hackathons: Hackathon[];
}

const HackathonsCarousel: React.FC<HackathonsCarouselProps> = ({ hackathons }) => {
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <>
      <div className="relative w-full px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current as any]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {hackathons.map((hackathon, index) => {
              // Generate dynamic backlit color based on index
              const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];
              const backlitColor = colors[index % colors.length];

              return (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div
                    onClick={() => setSelectedHackathon(hackathon)}
                    className={`group relative p-4 border rounded-2xl bg-white/5 backdrop-blur-xl transition-all duration-500 ease-out cursor-pointer h-full flex flex-col ring-1 ring-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.03] hover:-translate-y-2 overflow-visible`}
                    style={{
                      boxShadow: `0 4px 15px -3px ${backlitColor}30, 0 0 20px -5px ${backlitColor}20`,
                    }}
                  >
                    {/* Backlit Glow Effect on Hover (Filled) */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{
                        background: `${backlitColor}15`,
                      }}
                    />

                    {/* Image Backlit Glow */}
                    <div
                      className="absolute -inset-1 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg -z-10 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${backlitColor}60, transparent)`,
                      }}
                    />

                    <OptimizedImage
                      src={hackathon.image}
                      alt={`${hackathon.title} Image`}
                      containerClassName="mb-4 w-full h-48 rounded-lg relative overflow-hidden"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      fallbackText="Hackathon image not available"
                    />
                    <div className="flex-1 flex flex-col justify-between text-center px-2 relative z-10">
                      <h4 className="font-semibold text-base mb-2 leading-tight line-clamp-2">
                        {hackathon.title}
                      </h4>
                      <p className="text-sm text-primary font-medium mb-2">{hackathon.issuer}</p>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {hackathon.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-auto">
                        <Calendar className="w-4 h-4" />
                        <span>{hackathon.date}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>

      <Dialog open={!!selectedHackathon} onOpenChange={() => setSelectedHackathon(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] p-0 overflow-y-auto">
          {selectedHackathon && (
            <div className="flex flex-col h-full">
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  {selectedHackathon.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-center mt-2">
                  {selectedHackathon.issuer} • <span className="font-semibold">{selectedHackathon.date}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 p-6 pt-4 space-y-4">
                <OptimizedImage
                  src={selectedHackathon.image}
                  alt={`${selectedHackathon.title} Image`}
                  containerClassName="w-full h-96 rounded-lg shadow-lg"
                  className="object-contain"
                  fallbackText="Hackathon image unavailable"
                />
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Project Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedHackathon.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HackathonsCarousel;
