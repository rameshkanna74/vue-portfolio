import React, { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BaseCard } from './BaseCard';
import type { Project } from '../../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div 
      ref={cardRef} 
      onClick={() => onOpenModal(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transform-3d"
      style={{ perspective: '1000px' }}
    >
      <BaseCard 
        variant="glass" 
        className={`h-full cursor-pointer group relative overflow-hidden ${isHovered ? 'gradient-border-animated' : ''}`}
      >
        {/* Gradient overlay on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-nord-10/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-nord-6 group-hover:text-gradient-premium transition-all duration-300">
              {project.title}
            </h3>
            <span className="text-xs text-nord-3 font-mono bg-nord-2/50 px-2 py-1 rounded backdrop-blur-sm">
              {project.year}
            </span>
          </div>
          
          <p className="text-nord-4 text-sm mb-4 line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech, index) => (
              <span
                key={tech}
                className="badge badge-tech transition-all duration-300 hover:scale-110"
                style={{ transitionDelay: isHovered ? `${index * 50}ms` : '0ms' }}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="badge badge-tech">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-nord-8 font-mono group-hover:text-nord-10 transition-colors">
            <span className="group-hover:text-glow transition-all">View Details</span>
            <Icon icon="mdi:arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </BaseCard>
    </div>
  );
};
