import React, { useState } from "react";
import { Calendar, Users } from "lucide-react";
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

interface Extracurricular {
  title: string;
  place: string;
  image: string;
  date: string;
  description: string;
}

interface ExtracurricularMarqueeProps {
  extracurriculars: Extracurricular[];
}

const ExtracurricularMarquee: React.FC<ExtracurricularMarqueeProps> = ({ extracurriculars }) => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const [selectedActivity, setSelectedActivity] = useState<Extracurricular | null>(null);

  // Remove duplicates and create marquee list
  const uniqueExtracurriculars = extracurriculars.filter((activity, index, self) =>
    index === self.findIndex(a => a.title === activity.title && a.place === activity.place)
  );

  // Create marquee list by repeating unique items until we have enough for a seamless loop
  const minItems = 12;
  let repeatCount = Math.ceil(minItems / uniqueExtracurriculars.length);
  if (repeatCount % 2 !== 0) repeatCount++; // Ensure it's even for -50% translateX to work perfectly
  const marqueeList = Array.from({ length: repeatCount }, () => uniqueExtracurriculars).flat();

  const handleActivityClick = (originalIndex: number) => {
    const activity = uniqueExtracurriculars[originalIndex];
    setSelectedActivity(activity);
  };

  return (
    <>
      <div
        className={`relative w-full p-4 rounded-lg ${isLightMode
          ? "bg-gradient-to-r from-indigo-50/80 via-indigo-100/60 to-indigo-50/80"
          : "bg-gradient-to-r from-background via-accent/10 to-background"
          }`}
      >
        <MarqueeContainer
          animationName="marquee-extracurricular"
          duration={Math.max(45, uniqueExtracurriculars.length * 12)}
          pauseOnHover={true}
        >
          {marqueeList.map((activity, index) => {
            const originalIndex = index % uniqueExtracurriculars.length;
            // Generate dynamic color based on index
            const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6'];
            const backlitColor = colors[index % colors.length];

            return (
              <MarqueeCard
                key={`activity-${originalIndex}-${Math.floor(index / uniqueExtracurriculars.length)}`}
                onClick={() => handleActivityClick(originalIndex)}
                isLightMode={isLightMode}
                variant="extracurricular"
                width="w-80"
                minHeight="min-h-[450px]"
                className="p-4"
                backlitColor={backlitColor}
              >
                <OptimizedImage
                  src={activity.image}
                  alt={activity.title}
                  containerClassName="mb-4 w-full h-64 rounded-lg bg-gray-100 dark:bg-gray-800 relative overflow-hidden"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  fallbackText="Activity image not available"
                />
                <div className="flex-1 flex flex-col justify-between text-center px-2">
                  <h4 className="font-bold text-lg mb-2 leading-tight line-clamp-2" style={{ minHeight: '3rem' }}>
                    {activity.title}
                  </h4>
                  <p className="text-sm text-primary font-semibold mb-2">{activity.place}</p>
                  {activity.date && (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{activity.date}</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground leading-4 line-clamp-3 mt-auto">{activity.description}</p>
                </div>
              </MarqueeCard>
            );
          })}
        </MarqueeContainer>
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
                  className="object-contain hover:scale-105 transition-transform duration-300"
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

export default ExtracurricularMarquee;