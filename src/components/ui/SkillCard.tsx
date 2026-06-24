import React, { useRef, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Skill } from '../../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [displayLevel, setDisplayLevel] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
    
    // Animate progress bar
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Animate counter
    if (cardRef.current) {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: skill.level,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setDisplayLevel(Math.round(obj.value));
        },
      });
    }
  }, [skill]);

  return (
    <div 
      ref={cardRef} 
      className="group relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-6 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-8/70 hover:shadow-glow-md hover:-translate-y-1"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-nord-10/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Header with Icon and Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl text-nord-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Icon icon={skill.icon} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-nord-6 group-hover:text-nord-8 transition-colors">
              {skill.name}
            </h3>
            <p className="text-xs text-nord-3 font-mono">{skill.category}</p>
          </div>
          {/* Animated Percentage Counter */}
          <div 
            className="text-2xl font-bold text-nord-8 font-mono tabular-nums"
          >
            {displayLevel}%
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="relative h-3 bg-nord-2/50 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Animated Progress Bar with Gradient */}
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-nord-8 via-nord-9 to-nord-10 shadow-inner-glow"
            style={{ width: '0%' }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="mt-3 flex justify-between items-center text-xs text-nord-4/70">
          <span className="font-mono">Proficiency</span>
          {skill.yearsOfExperience && (
            <span className="font-mono flex items-center gap-1">
              <Icon icon="mdi:clock-outline" className="w-3 h-3" />
              {skill.yearsOfExperience}+ years
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
