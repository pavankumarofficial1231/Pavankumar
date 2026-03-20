
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GeniusphereSectionProps {
  images: string[];
  isLightMode: boolean;
}

const GeniusphereSection: React.FC<GeniusphereSectionProps> = ({
  images,
  isLightMode,
}) => (
  <Card className={`transition-all duration-300 ${isLightMode ? 'glass-light' : ''}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        Geniusphere Initiative
      </CardTitle>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>07/2024 – Present</span>
        <Badge variant="outline" className={isLightMode ? 'border-blue-400 text-blue-800' : ''}>Founder & Contributor</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <p className="text-muted-foreground">
          Founded and managed an initiative to empower students with technology, finance, and professional skills knowledge.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
            Created educational content and organized workshops on AI awareness, cybersecurity, and soft skills development
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
            Led community-building efforts to support peer learning and student growth
          </li>
        </ul>
        <div className="mt-4">
          <h5 className="text-sm font-medium mb-3">Workshop & Mentoring Activities</h5>
          <div className={`relative overflow-hidden rounded-lg p-2 ${isLightMode
              ? 'bg-gradient-to-r from-blue-50/60 via-blue-100/40 to-blue-50/60'
              : 'bg-gradient-to-r from-card via-accent/5 to-card'
            }`}>
            <div className="flex animate-marquee gap-4">
              {[...images, ...images].map((image, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    src={image}
                    alt={`Geniusphere Initiative Activity ${index + 1}`}
                    className="w-44 h-32 object-contain rounded-md shadow-sm bg-gray-100 dark:bg-gray-800"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default GeniusphereSection;
