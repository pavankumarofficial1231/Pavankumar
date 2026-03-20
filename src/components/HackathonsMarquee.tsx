
import React, { useState } from "react";
import { Calendar, Trophy } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import MarqueeContainer from "./shared/MarqueeContainer";
import MarqueeCard from "./shared/MarqueeCard";
import OptimizedImage from "./shared/OptimizedImage";

export interface Hackathon {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
}

interface HackathonsMarqueeProps {
  hackathons: Hackathon[];
}

const HackathonsMarquee: React.FC<HackathonsMarqueeProps> = ({ hackathons }) => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);

  // Remove duplicates and create marquee list
  const uniqueHackathons = hackathons.filter((hackathon, index, self) =>
    index === self.findIndex(h => h.title === hackathon.title && h.issuer === hackathon.issuer)
  );

  const marqueeList = [...uniqueHackathons, ...uniqueHackathons];

  const handleHackathonClick = (originalIndex: number) => {
    const hackathon = uniqueHackathons[originalIndex];
    setSelectedHackathon(hackathon);
  };

  return (
    <>
      <div
        className={`relative w-full p-4 rounded-lg ${isLightMode
            ? "bg-gradient-to-r from-purple-50/80 via-purple-100/60 to-purple-50/80"
            : "bg-gradient-to-r from-background via-accent/10 to-background"
          }`}
      >
        <MarqueeContainer
          animationName="marquee-hackathons"
          duration={Math.max(35, uniqueHackathons.length * 10)}
          pauseOnHover={true}
        >
          {marqueeList.map((hackathon, index) => {
            const originalIndex = index % uniqueHackathons.length;
            const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4'];
            const backlitColor = colors[index % colors.length];

            return (
              <MarqueeCard
                key={`hackathon-${originalIndex}-${Math.floor(index / uniqueHackathons.length)}`}
                onClick={() => handleHackathonClick(originalIndex)}
                isLightMode={isLightMode}
                variant="certificates"
                width="w-80"
                minHeight="min-h-[450px]"
                className="p-4"
                backlitColor={backlitColor}
              >
                <OptimizedImage
                  src={hackathon.image}
                  alt={`${hackathon.title} Image`}
                  containerClassName="mb-4 w-full h-64 rounded-lg bg-gray-100 dark:bg-gray-800 relative overflow-hidden"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  fallbackText="Hackathon image not available"
                />
                <div className="flex-1 flex flex-col justify-between text-center px-2">
                  <h4 className="font-semibold text-lg mb-2 leading-tight line-clamp-2" style={{ minHeight: '3rem' }}>
                    {hackathon.title}
                  </h4>
                  <p className="text-sm text-primary font-medium mb-2">{hackathon.issuer}</p>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-3 leading-4">
                    {hackathon.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-auto">
                    <Calendar className="w-4 h-4" />
                    <span>{hackathon.date}</span>
                  </div>
                </div>
              </MarqueeCard>
            );
          })}
        </MarqueeContainer>
      </div>

      <Dialog open={!!selectedHackathon} onOpenChange={() => setSelectedHackathon(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] p-0 overflow-hidden">
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
                  className="object-contain hover:scale-105 transition-transform duration-300"
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

export default HackathonsMarquee;
