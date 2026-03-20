import React, { useRef, useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, ChevronDown, GraduationCap, BookOpen, School } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TimelineItem {
  degree: string;
  institution: string;
  grade: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  color: string;
}

const InteractiveTimeline = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const [expandedItem, setExpandedItem] = useState<number | null>(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const educationData: TimelineItem[] = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "KLE Society's Degree College, Bangalore",
      grade: "CGPA: 8.2/10",
      period: "Present - 05/2027",
      location: "Bangalore",
      description: "Currently pursuing comprehensive studies in computer science, focusing on software development, algorithms, and modern web technologies. Actively involved in technical clubs and hackathons.",
      highlights: ["Data Structures & Algorithms", "Web Development", "Database Management", "Artificial Intelligence"],
      icon: <GraduationCap className="w-7 h-7" />,
      color: "#3b82f6",
    },
    {
      degree: "Pre-University Course (PU)",
      institution: "KLE Independent PU College, Bangalore",
      grade: "First Class",
      period: "06/2024",
      location: "Bangalore",
      description: "Completed pre-university education with strong foundation in science and mathematics, preparing for computer science studies.",
      highlights: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
      icon: <BookOpen className="w-7 h-7" />,
      color: "#a855f7",
    },
    {
      degree: "Schooling (ICSE)",
      institution: "Mount Senoria School, Bangalore",
      grade: "90.80%",
      period: "03/2020",
      location: "Bangalore",
      description: "Built a solid academic foundation with excellence in mathematics and sciences. Participated in various inter-school competitions.",
      highlights: ["Mathematics", "Science", "Computer Applications"],
      icon: <School className="w-7 h-7" />,
      color: "#10b981",
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const offset = windowHeight / 2 - rect.top;
      const progress = Math.min(Math.max((offset / rect.height) * 100, 0), 100);
      setTimelineProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 px-4" ref={timelineRef}>

      {/* ── HORIZONTAL TIMELINE (md+) ── */}
      <div className="hidden md:block">
        {/* Horizontal line track */}
        <div className="relative flex items-center mb-0">
          {/* Background track line */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 left-[10%] right-[10%] h-[2px] rounded-full ${isLightMode ? 'bg-blue-100' : 'bg-blue-900/30'}`}
          />
          {/* Animated fill line */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-[10%] h-[2px] rounded-full transition-all duration-500"
            style={{
              width: `${timelineProgress * 0.8}%`,
              background: 'linear-gradient(90deg, #3b82f6, #a855f7, #10b981)',
              boxShadow: '0 0 12px rgba(59,130,246,0.6)',
            }}
          />

          {/* Icon dots centered on line */}
          <div className="relative w-full flex justify-around items-center py-8">
            {educationData.map((edu, index) => (
              <button
                key={index}
                onClick={() => toggleExpanded(index)}
                className="relative flex flex-col items-center gap-0 focus:outline-none group"
              >
                {/* Outer glow ring */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle, ${edu.color}25, transparent 70%)`,
                    boxShadow: expandedItem === index
                      ? `0 0 40px ${edu.color}80, 0 0 0 2px ${edu.color}60`
                      : `0 0 15px ${edu.color}30`,
                    transform: expandedItem === index ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  {/* Inner icon circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white border border-white/20 shadow-inner"
                    style={{ background: `linear-gradient(135deg, ${edu.color}ee, ${edu.color}99)` }}
                  >
                    {edu.icon}
                  </div>
                </div>

                {/* Connector line down to card */}
                {expandedItem === index && (
                  <div
                    className="w-[2px] h-8 mt-1 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${edu.color}, transparent)` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-3 gap-6">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out ${
                expandedItem === index ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2 hover:opacity-90'
              }`}
              onClick={() => toggleExpanded(index)}
            >
              <Card
                className={`relative overflow-hidden cursor-pointer border rounded-2xl transition-all duration-500 ${
                  isLightMode
                    ? 'bg-white/80 border-white/60 hover:border-blue-200'
                    : 'bg-[#0a1527]/80 border-white/5 hover:border-white/10'
                }`}
                style={{
                  boxShadow: expandedItem === index
                    ? `0 0 0 1px ${edu.color}50, 0 20px 50px ${edu.color}20`
                    : '0 8px 30px rgba(0,0,0,0.2)',
                }}
              >
                {/* Color accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${edu.color}, ${edu.color}44)` }} />

                {/* Hover fill */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `${edu.color}08` }}
                />

                <div className="p-5 relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className={`text-sm font-bold leading-snug flex-1 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                      {edu.degree}
                    </h3>
                    <Badge
                      className="shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold border-0 text-white"
                      style={{ background: edu.color }}
                    >
                      {edu.grade}
                    </Badge>
                  </div>

                  <p className={`text-xs mb-3 ${isLightMode ? 'text-blue-600' : 'text-gray-400'}`}>{edu.institution}</p>

                  <div className={`flex flex-wrap gap-3 text-xs font-medium mb-1 ${isLightMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" style={{ color: edu.color }} />
                      {edu.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" style={{ color: edu.color }} />
                      {edu.location}
                    </div>
                  </div>

                  {/* Expandable */}
                  <div className={`grid transition-[grid-template-rows] duration-500 ${expandedItem === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className={`pt-4 border-t ${isLightMode ? 'border-gray-100' : 'border-white/5'}`}>
                        <p className={`text-xs leading-relaxed mb-3 ${isLightMode ? 'text-gray-700' : 'text-gray-400'}`}>{edu.description}</p>
                        {edu.highlights.length > 0 && (
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-2">Key Areas</p>
                            <div className="flex flex-wrap gap-1.5">
                              {edu.highlights.map((h, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                                  style={{ background: `${edu.color}18`, color: edu.color, border: `1px solid ${edu.color}30` }}
                                >
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div
                    className="absolute top-4 right-4 transition-transform duration-500"
                    style={{ transform: expandedItem === index ? 'rotate(180deg)' : 'rotate(0deg)', color: edu.color + '80' }}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: vertical fallback ── */}
      <div className="md:hidden space-y-10 relative">
        <div className={`absolute left-[35px] top-[40px] bottom-[40px] w-[2px] rounded-full ${isLightMode ? 'bg-blue-100' : 'bg-blue-900/30'}`} />
        <div 
          className="absolute left-[35px] top-[40px] w-[2px] rounded-full transition-all duration-500 origin-top"
          style={{ 
            height: `calc(100% - 80px)`, 
            background: 'linear-gradient(to bottom, #3b82f6, #a855f7, #10b981)',
            transform: `scaleY(${timelineProgress / 100})`,
            opacity: timelineProgress > 0 ? 1 : 0
          }}
        />
        {educationData.map((edu, index) => (
          <div key={index} className="relative pl-24">
            <div
              className="absolute left-0 top-0 z-10 cursor-pointer flex items-center justify-center w-[72px] h-[72px] rounded-full transition-all duration-500"
              onClick={() => toggleExpanded(index)}
              style={{
                background: `radial-gradient(circle, ${edu.color}20, transparent 70%)`,
                boxShadow: expandedItem === index ? `0 0 35px ${edu.color}70` : `0 0 12px ${edu.color}30`,
                transform: expandedItem === index ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/20"
                style={{ background: `linear-gradient(135deg, ${edu.color}cc, ${edu.color}88)` }}
              >
                {edu.icon}
              </div>
            </div>

            <Card
              className={`relative overflow-hidden cursor-pointer border rounded-2xl transition-all duration-500 ${
                isLightMode ? 'bg-white/80 border-white/60' : 'bg-[#0a1527]/80 border-white/5'
              }`}
              style={{ boxShadow: expandedItem === index ? `0 0 0 1px ${edu.color}50, 0 20px 50px ${edu.color}20` : undefined }}
              onClick={() => toggleExpanded(index)}
            >
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${edu.color}, ${edu.color}44)` }} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className={`text-base font-bold leading-snug flex-1 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>{edu.degree}</h3>
                  <Badge className="shrink-0 text-[11px] px-2.5 py-0.5 rounded-full font-bold border-0 text-white" style={{ background: edu.color }}>{edu.grade}</Badge>
                </div>
                <p className={`text-sm mb-3 ${isLightMode ? 'text-blue-600' : 'text-gray-400'}`}>{edu.institution}</p>
                <div className={`flex flex-wrap gap-3 text-xs font-medium ${isLightMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3" style={{ color: edu.color }} />{edu.period}</div>
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" style={{ color: edu.color }} />{edu.location}</div>
                </div>
                <div className={`grid transition-[grid-template-rows] duration-500 ${expandedItem === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className={`pt-4 border-t ${isLightMode ? 'border-gray-100' : 'border-white/5'}`}>
                      <p className={`text-sm leading-relaxed mb-4 ${isLightMode ? 'text-gray-700' : 'text-gray-400'}`}>{edu.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((h, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ background: `${edu.color}18`, color: edu.color, border: `1px solid ${edu.color}30` }}>{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-5 right-5 transition-transform duration-500" style={{ transform: expandedItem === index ? 'rotate(180deg)' : 'rotate(0deg)', color: edu.color + '80' }}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveTimeline;
