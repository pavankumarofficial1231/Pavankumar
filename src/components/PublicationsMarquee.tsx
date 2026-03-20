import React, { useState } from "react";
import { BookOpen, ExternalLink, Calendar } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MarqueeContainer from "./shared/MarqueeContainer";
import MarqueeCard from "./shared/MarqueeCard";

interface Publication {
  title: string;
  journal: string;
  date: string;
  doi?: string;
  abstract: string;
  url?: string;
}

interface PublicationsMarqueeProps {
  publications: Publication[];
}

const PublicationsMarquee: React.FC<PublicationsMarqueeProps> = ({ publications }) => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

  // Remove duplicates based on title and DOI
  const uniquePublications = publications.filter((pub, index, self) =>
    index === self.findIndex(p => p.title === pub.title && p.doi === pub.doi)
  );

  // Create marquee array by doubling the unique publications
  const marqueeList = [...uniquePublications, ...uniquePublications];

  const handlePubClick = (originalIndex: number) => {
    const pub = uniquePublications[originalIndex];
    setSelectedPub(pub);
  };

  const handleExternalLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div
        className={`relative w-full p-4 rounded-lg ${isLightMode
            ? "bg-gradient-to-r from-emerald-50/80 via-emerald-100/60 to-emerald-50/80"
            : "bg-gradient-to-r from-background via-accent/10 to-background"
          }`}
      >
        <MarqueeContainer
          animationName="marquee-pubs"
          duration={Math.max(40, uniquePublications.length * 12)}
          pauseOnHover={true}
        >
          {marqueeList.map((pub, index) => {
            const originalIndex = index % uniquePublications.length;
            const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4'];
            const backlitColor = colors[index % colors.length];

            return (
              <MarqueeCard
                key={`pub-${originalIndex}-${Math.floor(index / uniquePublications.length)}`}
                onClick={() => handlePubClick(originalIndex)}
                isLightMode={isLightMode}
                variant="publications"
                width="w-96"
                minHeight="min-h-[380px]"
                className="p-6"
                backlitColor={backlitColor}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-4 rounded-full ${isLightMode ? 'bg-emerald-100' : 'bg-emerald-900/30'}`}>
                    <BookOpen className={`w-8 h-8 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
                  </div>
                </div>

                <div className="flex-1 flex flex-col text-center">
                  <h4 className="font-bold text-lg mb-3 leading-tight line-clamp-3" style={{ minHeight: '3.5rem' }}>
                    {pub.title}
                  </h4>
                  <p className="text-sm text-primary font-semibold mb-2">{pub.journal}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{pub.date}</span>
                  </div>
                  {pub.doi && (
                    <p className="text-xs text-muted-foreground mb-3 font-mono bg-muted/30 px-2 py-1 rounded">
                      DOI: {pub.doi}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                    {pub.abstract}
                  </p>

                  {pub.url && (
                    <div className="mt-auto flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleExternalLink(pub.url!, e)}
                        className="gap-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Publication
                      </Button>
                    </div>
                  )}
                </div>
              </MarqueeCard>
            );
          })}
        </MarqueeContainer>
      </div>

      <Dialog open={!!selectedPub} onOpenChange={() => setSelectedPub(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] overflow-y-auto">
          {selectedPub && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold leading-tight">
                  {selectedPub.title}
                </DialogTitle>
                <DialogDescription className="text-lg mt-2">
                  Published in <span className="font-semibold text-primary">{selectedPub.journal}</span> on <span className="font-semibold">{selectedPub.date}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {selectedPub.doi && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Digital Object Identifier (DOI)</h4>
                    <p className="font-mono text-sm">{selectedPub.doi}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-lg mb-3">Abstract</h4>
                  <p className="text-base leading-relaxed whitespace-pre-line">{selectedPub.abstract}</p>
                </div>

                {selectedPub.url && (
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={(e) => handleExternalLink(selectedPub.url!, e)}
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Full Publication
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PublicationsMarquee;