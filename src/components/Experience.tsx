import React from 'react';
import { useTheme } from './ThemeProvider';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import HackathonsSection from './HackathonsSection';
import Certifications from './Certifications';
import CourseworkMarquee from './CourseworkMarquee';
import GeniusphereMarquee, { GeniusphereActivity } from './GeniusphereMarquee';
import PublicationsSection from './PublicationsSection';
import ExtracurricularSection from './ExtracurricularSection';
import InternshipsSection from './InternshipsSection';
import { Sparkles } from 'lucide-react';

const Experience = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const [experienceRef, isExperienceVisible] = useScrollAnimation(0.05);

  // Updated certifications array with new Google AI certificates
  const certifications = [
    {
      title: "Gemini Certification for Students (K12)",
      issuer: "Google Cloud",
      date: "2025",
      image: "/gemini-certificate.png",
      link: "https://edu.exceedlms.com/student/award/3mq9jHMoY6dL29HR6pAQ8oP1"
    },
    {
      title: "UiPath Certified Professional",
      issuer: "UiPath",
      date: "2025",
      link: "https://credentials.uipath.com/e1809894-e0f9-4708-ba72-92a4d1a57b4a"
    },
    {
      title: "Python for Data Science",
      issuer: "Analogical",
      date: "01/08/2024",
      image: "/lovable-uploads/5891710e-b829-4ce8-902e-03303f54f153.png",
      link: "https://www.linkedin.com/learning/certificates/488485fc38ef76fca03c9d3eab26e7260b1aa2de317709e1c1422542bdefab76"
    },
    {
      title: "Build Your Generative AI Productivity Skills",
      issuer: "Microsoft and LinkedIn",
      date: "01/05/2024",
      image: "/lovable-uploads/46eb8b79-9f7b-4d9f-b66f-1d1b8c465e24.png",
      link: "https://www.linkedin.com/learning/certificates/84ac74d95c815dda8a24162901ff7bad1e5a41de60234da782b019c0d3389b4b"
    },
    {
      title: "Career Essentials in Cybersecurity",
      issuer: "Microsoft and LinkedIn",
      date: "01/05/2024",
      image: "/lovable-uploads/e40da43e-fa98-4a2d-a31c-525b5efd4c0f.png",
      link: "https://www.linkedin.com/learning/certificates/84ac74d95c815dda8a24162901ff7bad1e5a41de60234da782b019c0d3389b4b"
    },
    {
      title: "Generative AI for Educators Certificate",
      issuer: "Google",
      date: "06/15/2025",
      image: "/lovable-uploads/3c3d8556-3aed-4e6f-92b3-43763ffd4554.png",
      link: "https://edu.exceedlms.com/student/award/2sEp7nY7HihXS4r3QL5nFGFu"
    },
    {
      title: "Google AI for Higher Education",
      issuer: "Google",
      date: "06/16/2025",
      image: "/lovable-uploads/26b33c0a-9d27-4600-aa65-d765daa554f4.png",
      link: "https://edu.exceedlms.com/student/award/ubojGQu5fkSgUFgLLKXxB8jx"
    },
    {
      title: "Google AI for K12 Educators",
      issuer: "Google",
      date: "06/16/2025",
      image: "/lovable-uploads/be649bdb-92ff-4b7c-a7bd-c512b1c15318.png",
      link: "https://edu.exceedlms.com/student/award/kXm7XPWrWrkXqUHk3TexNuqW"
    },
    {
      title: "I Teach AI Responsibly",
      issuer: "Google",
      date: "06/16/2025",
      image: "/lovable-uploads/f325b149-f8a1-48ce-95c8-44eb983c5255.png",
      link: "https://skillshop.exceedlms.com/profiles/4ffe8b6621ed4db78c38a2658f333480"
    }
  ];

  const hackathonsRaw = [
    {
      title: "AIKYAM 2025 Hackathon – Certificate (uploaded, as sample)",
      issuer: "JSSATEB (GeeksforGeeks, SEG, CSE, AICTE)",
      date: "06/03/2025 - 07/03/2025",
      description: "Certificate of participation in AIKYAM, JSS Navotthana (uploaded image).",
      image: "/lovable-uploads/d91d44ea-b431-4c54-a2bd-bd98acf8a7cf.png",
    },
    {
      title: "INNOVEX 2025 Hackathon – Certificate (uploaded, as sample)",
      issuer: "Bengaluru City University",
      date: "03/04/2025 - 04/04/2025",
      description: "Certificate of participation in INNOVEX, BCU (uploaded image).",
      image: "/lovable-uploads/a6fffa43-662b-43fc-acc4-78bf3fc33b8b.png",
    },
    {
      title: "Innovex 2025 Hackathon",
      issuer: "Bengaluru City University",
      date: "03/04/2025 - 04/04/2025",
      description: "Created a web-based platform to connect hotels and volunteers for redistributing surplus food to the needy. Included features like real-time alerts, geo-location tracking, and contribution dashboards.",
      image: "/lovable-uploads/c92fabef-e997-4883-871d-10fbcbc0f71f.png"
    },
    {
      title: "JSS Navotthana 24-Hour Hackathon",
      issuer: "JSSATEB",
      date: "06/03/2025 - 07/03/2025",
      description: "Developed an AI-powered algorithmic trading system that analyzed real-time stock market data to make predictive trading decisions. Focused on automation, trend forecasting, and risk management.",
      image: "/lovable-uploads/122cef33-385e-459e-94b2-310a72021fbd.png"
    }
  ];

  // Remove broken, duplicate, and user-uploaded images from hackathons
  const seen = new Set();
  const hackathonsFiltered = hackathonsRaw
    .filter(h => {
      if (!h.image) return false;
      const key = `${h.title}|${h.issuer}|${h.date}`;
      if (seen.has(key)) return false;
      seen.add(key);
      // REMOVE: exclude any image that is in /lovable-uploads/
      if (h.image.startsWith("/lovable-uploads/")) return false;
      return true;
    });

  const geniusphereActivities: GeniusphereActivity[] = [
    { type: 'image', src: "/geniusphere-debate-1.jpg", caption: "Hosting E-Debate Competition" },
    { type: 'image', src: "/geniusphere-debate-2.jpg", caption: "Debate Panel & Judges" },
    { type: 'image', src: "/geniusphere-debate-3.jpg", caption: "Award Ceremony" },
    { type: 'image', src: "/geniusphere-code-club.jpg", caption: "Code Club - Raspberry Pi" },
    { type: 'image', src: "/geniusphere-ms-learn.jpg", caption: "Microsoft Learn Course" },
    { type: 'video', src: "/geniusphere-video-cover.png", caption: "Geniusphere Foundation Video", link: "https://youtube.com/shorts/hwko9zPR2Fo?si=zIXuHR2xWv_EiBid" }
  ];

  const activities = [
    "Active participant in online tech webinars and workshops",
    "Volunteered in inter-college tech fests and seminar coordination",
    "Event Co-ordination Head of student learning communities focused on AI and digital tools",
    "Mentoring school students in tech, finance & soft skills",
    "Exploring new tech tools and trends"
  ];

  const coursework = [
    "Ethics of Artificial Intelligence",
    "Quantum Computing Fundamentals",
    "AI in Business Strategy & Innovation",
    "Fundamentals of Artificial Intelligence",
    "Cybersecurity Basics",
    "Microsoft Applications (Word, Excel, PowerPoint, Access)",
    "Introduction to Computer Networks"
  ];

  const publications = [
    {
      title: "PTASE: The Pavan Theory of Artificial Superiorism and Extinction (v1.0)",
      journal: "Zenodo",
      date: "August 22, 2025",
      doi: "10.5281/zenodo.16926524",
      abstract: "A theoretical framework linking human-driven \"artificial superiorism\" to accelerated extinction risks through ecological imbalance. This research explores the hypothesis that humanity's pursuit of artificial enhancement and technological dominance creates systematic ecological disruptions that accelerate species extinction rates beyond natural evolutionary adaptation capabilities.",
      url: "https://zenodo.org/records/16926524"
    }
  ];

  const extracurriculars = [
    {
      title: "Chess Competition",
      place: "Bengaluru University (at Surana College)",
      image: "/lovable-uploads/7fdc64a4-89df-4815-82f2-9f626de130b8.png",
      date: "",
      description: "Participation in Bangalore Inter-College Chess Competition with the college team."
    },
    {
      title: "Innovex Hackathon",
      place: "Bengaluru City University",
      image: "/lovable-uploads/14029a2e-2f10-419b-ac97-072b6d13808e.png",
      date: "Apr 2025",
      description: "Team presented innovative tech solutions at the INNOVEX Hackathon."
    },
    {
      title: "Technical Fest",
      place: "KLE Society's Degree College",
      image: "/lovable-uploads/676b9740-b7b8-4ef8-bd2a-79057c86c4fc.png",
      date: "",
      description: "Organizing and coordinating at the major technical festival."
    },
    {
      title: "JSS Hackathon (Aikyam)",
      place: "JSSATEB",
      image: "/lovable-uploads/1f0e6810-f31a-4da6-b33e-c3c8bc6c6bb5.png",
      date: "",
      description: "With the Hackathon team after presenting project at Aikyam 2025."
    },
    {
      title: "Event Co-ordination Head for Under 25",
      place: "#InvestInYou Initiative",
      image: "/lovable-uploads/4ab3e85d-fd37-4baf-ab39-67da0c0bd59c.png",
      date: "",
      description: "Led event coordination activities for the Under 25 initiative, organizing and managing youth-focused programs and activities."
    }
  ];

  // Use the correct uploaded certificate images for hackathons
  const hackathons = [
    {
      title: "HACKWAVE 2026 – WINNER (1st Place)",
      issuer: "Global Institute of Management Sciences, Bengaluru",
      date: "06/03/2026 - 07/03/2026",
      description:
        "Secured 1st Place at the HACKWAVE 2026 (24-Hour Hackathon). Developed a 'Campus Energy Optimizer'—an AI-driven solution for sustainable campus energy management—under the theme 'Smart Campus – AI-Driven Solutions for Sustainable and Inclusive Education'.",
      image: "/hackwave-certificate.png",
    },
    {
      title: "JSS Navotthana 24-Hour Hackathon",
      issuer: "JSSATEB",
      date: "06/03/2025 - 07/03/2025",
      description:
        "Developed an AI-powered algorithmic trading system that analyzed real-time stock market data to make predictive trading decisions. Focused on automation, trend forecasting, and risk management. Collaborated in a team of four and presented the solution to industry mentors.",
      image: "/lovable-uploads/bc253449-4fba-4fcf-8759-f0eb0a47573c.png",
    },
    {
      title: "Innovex Hackathon – 22-Hour Hackathon by Bengaluru City University",
      issuer: "Bengaluru City University",
      date: "03/04/2025 - 04/04/2025",
      description:
        "Created a web-based platform to connect hotels and volunteers for redistributing surplus food to the needy. Included features like real-time alerts, geo-location tracking, and contribution dashboards. Aimed to reduce food wastage and improve community outreach.",
      image: "/lovable-uploads/fd4cab3c-9b66-4144-b8ef-fd07e450ed8d.png",
    }
  ];

  return (
    <section
      id="experience"
      className={`py-20 px-4 relative border-t-2 ${isLightMode
        ? 'bg-transparent border-blue-200/60'
        : 'bg-transparent border-gray-600/30'
        }`}
      ref={experienceRef}
    >
      {/* Simplified background to reduce extra glow */}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isExperienceVisible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Activities</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Internships Section */}
        <InternshipsSection />

        {/* Certifications Section */}
        <Certifications certifications={certifications} />

        {/* Hackathons Marquee Section */}
        <HackathonsSection
          hackathons={hackathons}
          isLightMode={isLightMode}
          isVisible={isExperienceVisible}
        />

        <div className={`transition-all duration-700 delay-600 ${isExperienceVisible ? 'animate-slide-up' : 'opacity-0 transform translate-y-10'}`}>
          <CourseworkMarquee coursework={coursework} />
          <GeniusphereMarquee items={geniusphereActivities} />
        </div>

        {/* Extracurricular Activities Marquee */}
        <PublicationsSection
          publications={publications}
          isLightMode={isLightMode}
          isVisible={isExperienceVisible}
        />

        <ExtracurricularSection
          extracurriculars={extracurriculars}
          isLightMode={isLightMode}
          isVisible={isExperienceVisible}
        />
      </div>
    </section>
  );
};

export default Experience;
