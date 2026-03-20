import React from "react";
import { Trophy } from "lucide-react";
import HackathonsCarousel, { Hackathon } from "./HackathonsCarousel";

interface HackathonsSectionProps {
  hackathons: Hackathon[];
  isLightMode: boolean;
  isVisible: boolean;
}

const HackathonsSection: React.FC<HackathonsSectionProps> = ({
  hackathons,
  isVisible,
}) => (
  <div className={`mb-12 transition-all duration-700 delay-400 ${isVisible ? 'animate-slide-up' : 'opacity-0 transform translate-y-10'}`}>
    <h3 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
      <Trophy className="w-7 h-7 text-primary" />
      Hackathons & Competitions
    </h3>
    <HackathonsCarousel hackathons={hackathons} />
  </div>
);

export default HackathonsSection;
