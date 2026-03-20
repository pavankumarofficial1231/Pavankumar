import React from "react";
import { Users } from "lucide-react";
import ExtracurricularMarquee from "./ExtracurricularMarquee";

interface Extracurricular {
  title: string;
  place: string;
  image: string;
  date: string;
  description: string;
}

interface ExtracurricularSectionProps {
  extracurriculars: Extracurricular[];
  isLightMode: boolean;
  isVisible: boolean;
}

const ExtracurricularSection: React.FC<ExtracurricularSectionProps> = ({
  extracurriculars,
  isVisible,
}) => (
  <div className={`mb-12 transition-all duration-700 delay-800 ${isVisible ? 'animate-slide-up' : 'opacity-0 transform translate-y-10'}`}>
    <h3 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
      <Users className="w-7 h-7 text-primary" />
      Extracurricular Activities
    </h3>
    <ExtracurricularMarquee extracurriculars={extracurriculars} />
  </div>
);

export default ExtracurricularSection;
