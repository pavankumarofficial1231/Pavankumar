import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Briefcase, FileCheck, Eye } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import OptimizedImage from './shared/OptimizedImage';

const InternshipsSection = () => {
    const { theme } = useTheme();
    const isLightMode = theme === 'light';
    const [selectedCertificate, setSelectedCertificate] = useState<{ company: string, image: string } | null>(null);

    const internships = [
        {
            company: "Sanna Innovations",
            role: "AI Agent Implementation Intern",
            period: "07/2025 – 10/2025",
            location: "Bengaluru, Karnataka",
            tagline: "Focused on AI Agent Implementation and business process enhancement.",
            color: "#3b82f6", // Blue
            gradient: "from-blue-500/20 to-cyan-500/20",
            certificate: "/sanna-internship.png"
        },
        {
            company: "Epicminds Information Technology",
            role: "AIML Intern",
            period: "17/11/2025 - 12/12/2025",
            location: "Bengaluru, Karnataka",
            tagline: "Worked on AIML projects and software development documentation.",
            color: "#a855f7", // Purple
            gradient: "from-purple-500/20 to-pink-500/20",
            certificate: "/epicminds-internship.png"
        }
    ];

    return (
        <div className="mb-20 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-10 justify-center">
                <div className={`p-3 rounded-2xl transition-transform duration-300 hover:scale-110 hover:rotate-6 shadow-md ${isLightMode ? 'bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 border border-blue-100' : 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 text-blue-400 border border-blue-500/20'}`}>
                    <Briefcase className="w-6 h-6" />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isLightMode ? 'from-blue-700 via-indigo-700 to-purple-700' : 'from-blue-400 via-indigo-400 to-purple-400'}`}>
                    Professional Experience
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
                {internships.map((internship, index) => (
                    <div key={index} className="h-full">
                        <Card
                            className={`
                                group h-full relative overflow-hidden border-0 transition-all duration-500 ease-out flex flex-col
                                hover:translate-y-[-4px] cursor-default
                                ${isLightMode
                                    ? 'bg-white shadow-lg shadow-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/60'
                                    : 'bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl shadow-black/50'
                                }
                            `}
                        >
                            {/* Decorative Gradient Background */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${internship.gradient}`} />

                            {/* Border Gradient Line */}
                            <div
                                className="absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                style={{ background: internship.color }}
                            />

                            <CardHeader className="relative z-10 pb-2 space-y-4">
                                <div className="flex justify-between items-start w-full">
                                    <div
                                        className={`p-3 rounded-xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isLightMode ? 'bg-gray-50' : 'bg-gray-800'}`}
                                    >
                                        <Building2 className="w-8 h-8" style={{ color: internship.color }} />
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={`
                                            px-3 py-1 text-xs font-semibold tracking-wide border
                                            ${isLightMode
                                                ? 'bg-gray-50 text-gray-600 border-gray-200'
                                                : 'bg-gray-800 text-gray-300 border-gray-700'
                                            }
                                        `}
                                    >
                                        {internship.period}
                                    </Badge>
                                </div>

                                <div>
                                    <h4 className={`text-xl font-bold mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${isLightMode ? 'text-gray-900 from-blue-700 to-purple-700' : 'text-gray-100 from-blue-400 to-purple-400'} transition-colors duration-300`}>
                                        {internship.role}
                                    </h4>
                                    <p className={`font-medium text-base ${isLightMode ? 'text-blue-700' : 'text-blue-400'}`}>
                                        {internship.company}
                                    </p>
                                </div>
                            </CardHeader>

                            <CardContent className="relative z-10 pt-2 flex-grow flex flex-col justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    {internship.location}
                                </div>

                                <div className={`mb-6 p-4 rounded-xl border transition-colors duration-300 group-hover:border-transparent ${isLightMode ? 'bg-gray-50 border-gray-100 group-hover:bg-white/60' : 'bg-gray-800/50 border-gray-700 group-hover:bg-gray-800/80'}`}>
                                    <p className={`text-sm italic leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
                                        "{internship.tagline}"
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedCertificate({ company: internship.company, image: internship.certificate })}
                                    className={`
                                        mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300
                                        ${isLightMode 
                                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100' 
                                            : 'bg-blue-900/30 text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/30'
                                        }
                                    `}
                                >
                                    <Eye className="w-4 h-4" />
                                    View Certificate
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            <FileCheck className="w-6 h-6 text-green-500" />
                            {selectedCertificate?.company} Internship Certificate
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 rounded-lg overflow-hidden border shadow-inner">
                        <OptimizedImage
                            src={selectedCertificate?.image || ''}
                            alt="Internship Certificate"
                            containerClassName="w-full h-auto"
                            className="w-full h-auto object-contain shadow-2xl"
                            fallbackText="Certificate loading..."
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InternshipsSection;
