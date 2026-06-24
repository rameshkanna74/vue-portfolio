import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import type { Experience } from '../../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast?: boolean;
}

const formatDate = (date: string | 'Present'): string => {
  if (date === 'Present') return 'Present';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ experience, index, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // Open the first one by default
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      gsap.from(itemRef.current, {
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 90%',
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out',
      });
    }
  }, [index]);

  return (
    <div ref={itemRef} className="relative flex gap-6 pb-12 group">
      {/* Timeline Connector */}
      <div className="flex flex-col items-center flex-shrink-0 w-8">
        <div className="relative z-10 p-1.5 bg-nord-0 rounded-full border border-nord-3/50 shadow-glow-sm">
          <Icon icon="mdi:record-circle-outline" className="text-nord-8 w-5 h-5" />
        </div>
        {!isLast && (
          <div className="w-[1px] flex-1 bg-gradient-to-b from-nord-8/50 to-nord-3/30 my-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 -mt-1">
        <div className="panel p-0 overflow-hidden transition-all duration-300">
          
          {/* Header Bar */}
          <div 
            className="bg-nord-2/30 border-b border-nord-3/40 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-nord-2/50 transition-colors" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-nord-8 font-bold text-lg font-mono tracking-tight">{experience.company}</span>
              <span className="hidden sm:inline text-nord-4/30">|</span>
              <span className="text-nord-4/80 font-mono text-sm">{experience.position}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <span className="text-xs font-mono px-2 py-1 bg-nord-0 border border-nord-3/50 rounded text-nord-4/60 flex items-center gap-1.5">
                <Icon icon="mdi:calendar-clock" />
                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
              </span>
              <Icon 
                icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} 
                className="w-5 h-5 text-nord-4/50" 
              />
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <p className="text-nord-4 text-sm mb-5 leading-relaxed bg-nord-0 p-3 rounded border border-nord-3/30 border-l-2 border-l-nord-8">
              {experience.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {experience.tech?.map(t => (
                <span key={t} className="px-2 py-1 bg-nord-2 border border-nord-3/50 rounded text-xs text-nord-4 font-mono transition-colors hover:border-nord-8/50 hover:text-nord-6">
                  {t}
                </span>
              ))}
            </div>

            {/* Expandable Diff View */}
            {isExpanded && (
              <div className="mt-6 bg-nord-0 rounded border border-nord-3/50 p-5 font-mono text-xs sm:text-sm overflow-hidden animate-fade-in relative shadow-inner">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nord-8 to-transparent opacity-20" />
                <div className="text-nord-4/40 mb-3 flex items-center gap-2 pb-2 border-b border-nord-3/30">
                  <Icon icon="mdi:source-commit" className="w-4 h-4" />
                  <span>@@ -1,{experience.achievements?.length || 0} +1,{experience.achievements?.length || 0} @@</span>
                </div>
                <div className="space-y-2">
                  {experience.achievements?.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3 group/ach hover:bg-nord-2/20 p-1 -mx-1 rounded transition-colors">
                      <span className="select-none text-terminal-green mt-0.5">+</span>
                      <span className="text-nord-4 leading-relaxed group-hover/ach:text-nord-6 transition-colors">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
