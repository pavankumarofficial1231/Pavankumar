import React, { useState } from "react";
import { Users, Calendar, Instagram, Play, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MarqueeContainer from "./shared/MarqueeContainer";
import OptimizedImage from "./shared/OptimizedImage";
import InstagramEmbed from "./shared/InstagramEmbed";
import YouTubeEmbed from "./shared/YouTubeEmbed";

export interface GeniusphereActivity {
  type: 'image' | 'video';
  src: string;
  caption: string;
  link?: string;
}

interface GeniusphereMarqueeProps {
  items: GeniusphereActivity[];
}

const GeniusphereMarquee: React.FC<GeniusphereMarqueeProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<GeniusphereActivity | null>(null);

  // Create marquee list by doubling for seamless 50% loop
  // Create marquee list by repeating unique items until we have enough for a seamless loop
  const minItems = 12;
  let repeatCount = Math.ceil(items.length > 0 ? minItems / items.length : 1);
  if (repeatCount % 2 !== 0) repeatCount++; // Ensure it's even for -50% translateX to work perfectly
  const marqueeList = Array.from({ length: repeatCount }, () => items).flat();

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

        <div className="relative w-full p-4 rounded-lg bg-gradient-to-r from-background via-accent/10 to-background">
          <MarqueeContainer
            animationName="marquee-geniusphere"
            duration={35}
            pauseOnHover={true}
          >
            {marqueeList.map((item, index) => {
              // Generate dynamic color based on index
              const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4'];
              const color = colors[index % colors.length];

              return (
                <div
                  key={`geniusphere-${index}`}
                  onClick={() => setSelectedItem(item)}
                  className="marquee-item flex-shrink-0 p-3 border rounded-xl bg-card backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer snap-start group flex flex-col items-center justify-center gap-3 w-64"
                  style={{
                    boxShadow: `0 4px 15px -3px ${color}30, 0 0 20px -5px ${color}20`,
                  }}
                >
                  {/* Backlit Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${color}25 0%, transparent 70%)`,
                      filter: 'blur(15px)',
                    }}
                  ></div>

                  {item.type === 'video' ? (
                    <div className="w-56 h-40 rounded-lg flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20 border border-pink-500/30 group-hover:border-pink-500/60 transition-colors">
                       {item.src && (
                         <div className="absolute inset-0 z-0">
                           <OptimizedImage
                             src={item.src}
                             alt={item.caption}
                             containerClassName="w-full h-full"
                             className="object-cover w-full h-full opacity-60 mix-blend-overlay group-hover:opacity-80 transition-opacity duration-500"
                             fallbackText=""
                           />
                         </div>
                       )}
                       {item.link?.includes('youtube') || item.link?.includes('youtu.be') ? (
                         <Youtube className="w-10 h-10 text-red-500 mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] z-10" />
                       ) : (
                         <Instagram className="w-10 h-10 text-pink-500 mb-2 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10" />
                       )}
                       <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                         <Play className="w-12 h-12 text-white ml-2 drop-shadow-lg" fill="currentColor" />
                       </div>
                    </div>
                  ) : (
                    <OptimizedImage
                      src={item.src}
                      alt={item.caption}
                      containerClassName="w-56 h-40 rounded-lg bg-gray-100 dark:bg-gray-800 relative overflow-hidden"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackText="Image not available"
                    />
                  )}

                  <p className="text-sm font-semibold text-center leading-tight min-h-[40px] flex items-center justify-center px-1 text-foreground/90 group-hover:text-foreground transition-colors">
                    {item.caption}
                  </p>

                  {/* Image Backlit Glow */}
                  <div
                    className="absolute -inset-1 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg -z-10 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${color}60, transparent)`,
                    }}
                  ></div>
                </div>
              );
            })}
          </MarqueeContainer>
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl max-h-[95vh] w-[95vw] p-0 overflow-y-auto">
          {selectedItem && (
            <div className="flex flex-col">
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  {selectedItem.caption}
                </DialogTitle>
              </DialogHeader>
              <div className="p-4 flex justify-center">
                 {selectedItem.type === 'video' && selectedItem.link ? (
                   selectedItem.link.includes('youtube') || selectedItem.link.includes('youtu.be') ? (
                     <YouTubeEmbed url={selectedItem.link} />
                   ) : (
                     <InstagramEmbed url={selectedItem.link} />
                   )
                 ) : (
                  <OptimizedImage
                    src={selectedItem.src}
                    alt={selectedItem.caption}
                    containerClassName="w-full h-[70vh] rounded-lg shadow-lg bg-black/5"
                    className="object-contain"
                    fallbackText="Image unavailable"
                  />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GeniusphereMarquee;
