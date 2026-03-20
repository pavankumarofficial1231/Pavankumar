import React, { useState } from "react";
import { Calendar, FileText, ExternalLink } from "lucide-react";
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
import { Button } from "@/components/ui/button";

interface Publication {
  title: string;
  journal: string;
  date: string;
  doi: string;
  abstract: string;
  url?: string;
}

interface PublicationsCarouselProps {
  publications: Publication[];
}

const PublicationsCarousel: React.FC<PublicationsCarouselProps> = ({ publications }) => {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="relative w-full px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {publications.map((pub, index) => {
              // Generate dynamic backlit color based on index
              const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];
              const backlitColor = colors[index % colors.length];

              return (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2">
                  <div
                    onClick={() => setSelectedPub(pub)}
                    className={`group relative p-6 border rounded-2xl bg-white/5 backdrop-blur-xl transition-all duration-500 ease-out cursor-pointer h-full flex flex-col ring-1 ring-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.03] hover:-translate-y-2 overflow-visible`}
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

                    <div className="flex items-start gap-4 mb-4 relative z-10">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2 leading-tight line-clamp-2">
                          {pub.title}
                        </h4>
                        <p className="text-sm text-primary font-medium">{pub.journal}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 relative z-10">
                      {pub.abstract}
                    </p>
                    <div className="mt-auto flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{pub.date}</span>
                      </div>
                      {pub.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleExternalLink(e, pub.url!)}
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      )}
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

      <Dialog open={!!selectedPub} onOpenChange={() => setSelectedPub(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] w-[95vw] p-0 overflow-hidden">
          {selectedPub && (
            <div className="flex flex-col h-full">
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-xl font-bold flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  {selectedPub.title}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  <span className="font-semibold text-primary">{selectedPub.journal}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedPub.date}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 p-6 pt-4 space-y-4 overflow-y-auto">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">DOI</h4>
                  <p className="text-sm font-mono">{selectedPub.doi}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Abstract</h4>
                  <p className="text-sm leading-relaxed">{selectedPub.abstract}</p>
                </div>
                {selectedPub.url && (
                  <Button
                    onClick={(e) => handleExternalLink(e, selectedPub.url!)}
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Publication
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PublicationsCarousel;
