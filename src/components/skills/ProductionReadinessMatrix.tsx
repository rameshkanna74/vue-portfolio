import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Icon } from '@iconify/react';

interface SkillNode {
  id: string;
  name: string;
  level: number; // 0-100
  icon: string;
  category: string;
  yearsOfExperience?: number;
}

interface ProductionReadinessMatrixProps {
  skills: SkillNode[];
}

export const ProductionReadinessMatrix: React.FC<ProductionReadinessMatrixProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillNode[]>);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const bars = containerRef.current.querySelectorAll('.skill-progress-bar');
    
    gsap.fromTo(bars,
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 1.2, 
        ease: "power3.out", 
        stagger: 0.05,
        transformOrigin: "left center"
      }
    );
  }, [skills]);

  const getLevelLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    return 'Familiar';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cloud & Infra': return 'mdi:cloud-outline';
      case 'Containers': return 'mdi:docker';
      case 'CI/CD': return 'mdi:rocket-launch-outline';
      case 'IaC & Config': return 'mdi:code-json';
      case 'Monitoring': return 'mdi:monitor-dashboard';
      case 'Languages': return 'mdi:code-braces';
      default: return 'mdi:server';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cloud & Infra': return 'text-nord-8 border-nord-8/30 bg-nord-8/10';
      case 'Containers': return 'text-nord-9 border-nord-9/30 bg-nord-9/10';
      case 'CI/CD': return 'text-terminal-green border-terminal-green/30 bg-terminal-green/10';
      case 'IaC & Config': return 'text-nord-15 border-nord-15/30 bg-nord-15/10';
      case 'Monitoring': return 'text-terminal-amber border-terminal-amber/30 bg-terminal-amber/10';
      case 'Languages': return 'text-nord-14 border-nord-14/30 bg-nord-14/10';
      default: return 'text-nord-4 border-nord-3 bg-nord-2';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={containerRef}>
      {Object.entries(categories).map(([category, categorySkills]) => (
        <div key={category} className="panel p-0 overflow-hidden flex flex-col">
          {/* Category Header */}
          <div className="p-4 border-b border-nord-3/40 bg-nord-2/30 flex items-center gap-3">
            <div className={`p-2 rounded-lg border ${getCategoryColor(category)}`}>
              <Icon icon={getCategoryIcon(category)} className="w-5 h-5" />
            </div>
            <h3 className="text-nord-6 font-mono font-bold uppercase tracking-wider">{category}</h3>
          </div>
          
          {/* Skills List */}
          <div className="p-4 flex-1 space-y-4">
            {categorySkills.map((skill) => (
              <div key={skill.id} className="group">
                <div className="flex justify-between items-end mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon icon={skill.icon} className="w-4 h-4 text-nord-4 group-hover:text-nord-8 transition-colors" />
                    <span className="text-nord-6 font-mono text-sm">{skill.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-nord-4/60 uppercase tracking-widest">{getLevelLabel(skill.level)}</span>
                    {skill.yearsOfExperience && (
                      <span className="ml-2 text-[10px] font-mono text-nord-8 bg-nord-8/10 px-1.5 py-0.5 rounded">
                        {skill.yearsOfExperience}y prod
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar Container */}
                <div className="h-1.5 w-full bg-nord-0 border border-nord-3/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full skill-progress-bar rounded-full ${skill.level >= 90 ? 'bg-terminal-green' : skill.level >= 80 ? 'bg-nord-8' : 'bg-nord-15'}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
