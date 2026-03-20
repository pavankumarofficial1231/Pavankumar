import React from 'react';
import { useTheme } from './ThemeProvider';
import { ExternalLink, Award } from 'lucide-react';

export interface Certification {
    title: string;
    issuer: string;
    date?: string;
    image?: string;
    link?: string;
    icon?: React.ReactNode;
}

interface CertificationsProps {
    certifications?: Certification[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
    const { theme } = useTheme();
    const isLightMode = theme === 'light';

    // Default Fallback
    const defaultCertifications: Certification[] = [
        {
            title: "Generative AI for Educators",
            issuer: "Google",
            icon: <Award className="w-6 h-6 text-blue-600" />
        }
    ];

    const displayCerts = certifications || defaultCertifications;

    return (
        <section className="py-8 px-4 relative max-w-5xl mx-auto">
            <h2 className={`text-xl md:text-2xl font-bold mb-6 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                Qualifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {displayCerts.map((cert, index) => (
                    <div
                        key={index}
                        className={`
                          group relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 overflow-hidden
                          hover:scale-[1.02] hover:-translate-y-1 cursor-pointer
                          ${isLightMode
                                ? 'bg-white/70 backdrop-blur-md shadow-sm border-white/50 hover:bg-blue-100/60 hover:border-blue-300 hover:shadow-lg'
                                : 'bg-[#1e293b]/40 backdrop-blur-xl border-white/10 hover:border-cyan-400/50 hover:bg-cyan-900/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
                            }
                        `}
                    >
                        {/* Backlit Glow Effect - Bottom Edge */}
                        <div
                            className="absolute inset-x-0 -bottom-px h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${isLightMode ? '#3b82f6' : '#06b6d4'}, transparent)`
                            }}
                        />

                        {/* Ambient Glow on Hover */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl ${isLightMode ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'shadow-[0_0_30px_rgba(6,182,212,0.2)]'}`} />

                        {/* Shimmer Effect */}
                        <div className={`absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_infinite] bg-gradient-to-r from-transparent ${isLightMode ? 'via-white/60' : 'via-white/5'} to-transparent z-0 pointer-events-none`} />

                        {/* Image/Icon Container - Square on Left */}
                        <div className={`
                            w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center shrink-0 overflow-hidden
                            ${isLightMode ? 'bg-white border border-gray-100' : 'bg-white'}
                        `}>
                            {/* Logic: Try image, if error/missing, show icon */}
                            {cert.image ? (
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='7'/%3E%3Cpolyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'/%3E%3C/svg%3E";
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center p-2">
                                    {cert.icon || <Award className="w-8 h-8 text-blue-500" />}
                                </div>
                            )}
                        </div>

                        {/* Text Content - Right Side */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                            <h3 className={`font-semibold text-sm md:text-[15px] leading-tight line-clamp-2 ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                                {cert.title}
                            </h3>

                            {cert.link && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                       flex items-center gap-1 text-xs font-medium transition-colors
                                       ${isLightMode
                                            ? 'text-blue-600 hover:text-blue-800'
                                            : 'text-[#38bdf8] hover:text-sky-300'
                                        }
                                     `}
                                >
                                    Verified
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
