import React, { useState } from "react";
import { Calendar, Users } from "lucide-react";
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

interface Extracurricular {
  title: string;
  place: string;
  image: string;
  date: string;
  description: string;
}

interface ExtracurricularCarouselProps {
  extracurriculars: Extracurricular[];
}

const ExtracurricularCarousel: React.FC<ExtracurricularCarouselProps> = ({ extracurriculars }) => {
  const [selectedActivity, setSelectedActivity] = useState<Extracurricular | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <>
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
            {extracurriculars.map((activity, index) => {
              // Generate dynamic backlit color based on index
              const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];
              const backlitColor = colors[index % colors.length];

              return (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div
                    onClick={() => setSelectedActivity(activity)}
                    className="group relative p-4 border rounded-2xl bg-white/5 backdrop-blur-xl transition-all duration-500 ease-out cursor-pointer h-full flex flex-col ring-1 ring-white/10 hover:ring-blue-400/30 transform-gpu hover:scale-[1.03] hover:-translate-y-2 overflow-visible"
                    style={{
                      boxShadow: `0 4px 15px -3px ${backlitColor}30, 0 0 20px -5px ${backlitColor}20, 0 20px 50px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {/* Backlit Glow Effect on Hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${backlitColor}25 0%, transparent 70%)`,
                        filter: 'blur(15px)',
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
                      src={activity.image}
                      alt={activity.title}
                      containerClassName="mb-4 w-full h-48 rounded-lg bg-gray-100 dark:bg-gray-800 relative overflow-hidden"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      fallbackText="Activity image not available"
                    />
                    <div className="flex-1 flex flex-col justify-between text-center px-2 relative z-10">
                      <h4 className="font-bold text-base mb-2 leading-tight line-clamp-2">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-primary font-semibold mb-2">{activity.place}</p>
                      {activity.date && (
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3 h-3" />
                          <span>{activity.date}</span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground leading-4 line-clamp-2 mt-auto">{activity.description}</p>
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

      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] p-0 overflow-hidden">
          {selectedActivity && (
            <div className="flex flex-col h-full">
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  {selectedActivity.title}
                </DialogTitle>
                <DialogDescription className="text-lg">
                  {selectedActivity.place} {selectedActivity.date && `• ${selectedActivity.date}`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 p-6 pt-4 space-y-4">
                <OptimizedImage
                  src={selectedActivity.image}
                  alt={selectedActivity.title}
                  containerClassName="w-full h-96 rounded-lg shadow-lg"
                  className="object-contain"
                  fallbackText="Activity image unavailable"
                />
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Activity Details</h4>
                  <p className="text-base leading-relaxed text-muted-foreground">{selectedActivity.description}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExtracurricularCarousel;
