
import React, { useState } from "react";
import { Calendar } from "lucide-react";
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

interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

interface CertificationsMarqueeProps {
  certifications: Certification[];
}

const CertificationsMarquee: React.FC<CertificationsMarqueeProps> = ({ certifications }) => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Remove duplicates based on title and issuer
  const uniqueCertifications = certifications.filter((cert, index, self) =>
    index === self.findIndex(c => c.title === cert.title && c.issuer === cert.issuer)
  );

  // Create marquee array by doubling the unique certifications
  const marqueeList = [...uniqueCertifications, ...uniqueCertifications];

  const handleCertClick = (originalIndex: number) => {
    const cert = uniqueCertifications[originalIndex];
    setSelectedCert(cert);
  };

  return (
    <>
      <div
        className={`relative w-full p-4 rounded-lg ${isLightMode
            ? "bg-gradient-to-r from-blue-50/80 via-blue-100/60 to-blue-50/80"
            : "bg-gradient-to-r from-background via-accent/10 to-background"
          }`}
      >
        <MarqueeContainer
          animationName="marquee-certs"
          duration={Math.max(30, uniqueCertifications.length * 8)}
          pauseOnHover={true}
        >
          {marqueeList.map((cert, index) => {
            const originalIndex = index % uniqueCertifications.length;
            const colors = ['#3b82f6', '#a855f7', '#10b981', '#f97316', '#ec4899', '#06b6d4', '#f59e0b'];
            const backlitColor = colors[index % colors.length];

            return (
              <MarqueeCard
                key={`cert-${originalIndex}-${Math.floor(index / uniqueCertifications.length)}`}
                onClick={() => handleCertClick(originalIndex)}
                isLightMode={isLightMode}
                variant="certificates"
                width="w-80"
                minHeight="min-h-[420px]"
                className="p-4"
                backlitColor={backlitColor}
              >
                <OptimizedImage
                  src={cert.image}
                  alt={`${cert.title} Certificate`}
                  containerClassName="mb-4 w-full h-64 rounded-lg bg-gray-100 dark:bg-gray-800 relative overflow-hidden"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  fallbackText="Certificate image not available"
                />
                <div className="flex-1 flex flex-col justify-between text-center px-2">
                  <h4 className="font-semibold text-lg mb-3 leading-tight line-clamp-2" style={{ minHeight: '3rem' }}>
                    {cert.title}
                  </h4>
                  <p className="text-sm text-primary font-medium mb-3">{cert.issuer}</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-auto">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </MarqueeCard>
            );
          })}
        </MarqueeContainer>
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
                  className="hover:scale-105 transition-transform duration-300 object-contain"
                  fallbackText="Certificate image unavailable"
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Click outside to close • Scroll to zoom if needed
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

export default CertificationsMarquee;
