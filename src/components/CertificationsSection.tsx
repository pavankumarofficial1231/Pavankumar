import React from "react";
import { Award } from "lucide-react";
import CertificationsCarousel from "./CertificationsCarousel";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  isLightMode: boolean;
  isVisible: boolean;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  isVisible,
}) => (
  <div className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-up' : 'opacity-0 transform translate-y-10'}`}>
    <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-3">
      <Award className="w-6 h-6 text-primary" />
      Certifications
    </h3>
    <CertificationsCarousel certifications={certifications} />
  </div>
);

export default CertificationsSection;
