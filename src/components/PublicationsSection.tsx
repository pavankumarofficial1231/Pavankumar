import React from "react";
import { BookOpen } from "lucide-react";
import PublicationsCarousel from "./PublicationsCarousel";

interface Publication {
  title: string;
  journal: string;
  date: string;
  doi: string;
  abstract: string;
  url?: string;
}

interface PublicationsSectionProps {
  publications: Publication[];
  isLightMode: boolean;
  isVisible: boolean;
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  publications,
  isVisible,
}) => (
  <div className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-up' : 'opacity-0 transform translate-y-10'}`}>
    <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-3">
      <BookOpen className="w-6 h-6 text-primary" />
      Publications
    </h3>
    <PublicationsCarousel publications={publications} />
  </div>
);

export default PublicationsSection;