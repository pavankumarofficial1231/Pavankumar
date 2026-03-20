
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CourseworkSectionProps {
  coursework: string[];
  isLightMode: boolean;
}

const CourseworkSection: React.FC<CourseworkSectionProps> = ({ coursework, isLightMode }) => (
  <Card className={`transition-all duration-300 ${isLightMode ? 'glass-light' : ''}`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <Star className="w-6 h-6 text-primary" />
        Key Coursework
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {coursework.map((course, index) => (
          <Badge key={index} variant="secondary" className={`text-xs ${isLightMode ? 'bg-blue-200/80 text-blue-900' : ''}`}>
            {course}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default CourseworkSection;
