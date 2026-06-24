import React, { useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { TimelineItem } from '../components/ui/TimelineItem';

export const ExperiencePage: React.FC = () => {
  const { portfolioData, sortedExperience } = usePortfolioStore();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);

  const downloadResume = () => {
    window.open('/Ramesh_Kanna_DevOpsResume.docx', '_blank');
  };

  return (
    <div className="space-y-16 animate-fade-in pb-12">
      {/* Header */}
      <div ref={headerRef} className="border-b border-nord-3/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nord-6 flex items-center gap-3 tracking-tight">
            <Icon icon="mdi:timeline-clock" className="text-nord-8 w-8 h-8" />
            Operational History
          </h1>
          <p className="text-nord-4/80 mt-2 max-w-2xl text-sm leading-relaxed">
            A log of production deployments, infrastructure management, and engineering roles.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button onClick={downloadResume} className="btn-secondary flex items-center gap-2 shadow-glow-sm">
            <Icon icon="mdi:download" className="w-4 h-4" />
            Download Resume
          </button>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative max-w-4xl">
        <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-nord-3/30 hidden sm:block" />
        {sortedExperience.map((exp: any, index: number) => (
          <TimelineItem
            key={exp.id}
            experience={exp}
            index={index}
            isLast={index === sortedExperience.length - 1}
          />
        ))}
      </div>
      
      {/* Education Section */}
      <section className="pt-8 border-t border-nord-3/40">
        <h2 className="text-xl font-bold text-nord-6 flex items-center gap-2 font-mono mb-8">
          <Icon icon="mdi:school-outline" className="text-nord-9 w-6 h-6" />
          ACADEMIC BACKGROUND
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.education.map((edu: any) => (
            <div key={edu.institution} className="panel p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nord-9/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-nord-9/10 transition-colors" />
              
              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-nord-8">{edu.degree} in {edu.field}</h3>
                  <div className="text-nord-6 font-mono text-sm mt-1">{edu.institution}</div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-nord-4/60">
                  <span className="flex items-center gap-1.5">
                    <Icon icon="mdi:map-marker-outline" className="w-4 h-4" />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon icon="mdi:calendar-blank-outline" className="w-4 h-4" />
                    {edu.startDate.substring(0, 4)} - {edu.endDate.substring(0, 4)}
                  </span>
                </div>
                
                {edu.gpa && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-nord-9/10 border border-nord-9/30 rounded text-nord-9 text-xs font-mono font-bold">
                    <Icon icon="mdi:star-outline" className="w-4 h-4" />
                    CGPA: {edu.gpa}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
