import React, { useState } from "react";
import { Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

interface GeniusphereCarouselProps {
  images: string[];
}

const GeniusphereCarousel: React.FC<GeniusphereCarouselProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <>
      <div className="mb-12">
        <h3 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Users className="w-7 h-7 text-primary" />
          Geniusphere Initiative
        </h3>
        <div className="flex items-center justify-center gap-3 mb-4 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>07/2024 – Present</span>
          <Badge variant="outline">Founder & Contributor</Badge>
        </div>
        <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
          Founded and managed an initiative to empower students with technology, finance, and professional skills knowledge.
        </p>

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
              {images.map((image, index) => {
                // Generate dynamic backlit color based on index
                const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];
                const backlitColor = colors[index % colors.length];

                return (
                  <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div
                      onClick={() => setSelectedImage(image)}
                      className="group relative p-2 border rounded-lg bg-card backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-visible"
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

                      {/* Image Backlit Glow */}
                      <div
                        className="absolute -inset-1 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg -z-10 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${backlitColor}60, transparent)`,
                        }}
                      />

                      <OptimizedImage
                        src={image}
                        alt={`Geniusphere Activity ${index + 1}`}
                        containerClassName="w-full h-40 rounded-lg bg-gray-100 dark:bg-gray-800 relative overflow-hidden"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        fallbackText="Image not available"
                      />
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

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] p-0 overflow-hidden">
          {selectedImage && (
            <div className="flex flex-col h-full">
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Geniusphere Initiative
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 p-6 pt-4">
                <OptimizedImage
                  src={selectedImage}
                  alt="Geniusphere Activity"
                  containerClassName="w-full h-[60vh] rounded-lg shadow-lg"
                  className="object-contain"
                  fallbackText="Image unavailable"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GeniusphereCarousel;
