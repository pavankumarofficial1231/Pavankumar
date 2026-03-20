import React, { useState } from "react";
import { Calendar } from "lucide-react";
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

interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

interface CertificationsCarouselProps {
  certifications: Certification[];
}

const CertificationsCarousel: React.FC<CertificationsCarouselProps> = ({ certifications }) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
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
            {certifications.map((cert, index) => {
              // Generate dynamic backlit color based on index
              const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];
              const backlitColor = colors[index % colors.length];

              return (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="group relative p-4 border rounded-lg bg-card backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col ring-1 ring-primary/20 hover:ring-primary/40 overflow-visible"
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
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      containerClassName="mb-4 w-full h-48 rounded-lg relative overflow-hidden"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      fallbackText="Certificate image not available"
                    />
                    <div className="flex-1 flex flex-col justify-between text-center px-2 relative z-10">
                      <h4 className="font-semibold text-base mb-2 leading-tight line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-primary font-medium mb-2">{cert.issuer}</p>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-auto">
                        <Calendar className="w-4 h-4" />
                        <span>{cert.date}</span>
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

      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-5xl max-h-[95vh] w-[95vw] p-0 overflow-hidden">
          {selectedCert && (
            <div className="flex flex-col h-full">
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-2xl font-bold text-center">
                  {selectedCert.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-center mt-2">
                  Issued by <span className="font-semibold text-primary">{selectedCert.issuer}</span> on <span className="font-semibold">{selectedCert.date}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 p-6 pt-4">
                <OptimizedImage
                  src={selectedCert.image}
                  alt={`${selectedCert.title} Certificate`}
                  containerClassName="w-full h-[70vh] min-h-[500px] rounded-lg shadow-lg"
                  className="object-contain"
                  fallbackText="Certificate image unavailable"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificationsCarousel;
