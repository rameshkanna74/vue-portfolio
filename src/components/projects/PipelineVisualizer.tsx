import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

interface PipelineStage {
  name: string;
  status: string;
  duration: string;
  icon: string;
}

interface PipelineVisualizerProps {
  stages: PipelineStage[];
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ stages }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const steps = containerRef.current.querySelectorAll('.pipeline-step');
    const connectors = containerRef.current.querySelectorAll('.pipeline-connector');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });
    
    tl.from(steps, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      stagger: 0.2,
      ease: 'back.out(1.5)'
    }, 0);
    
    tl.from(connectors, {
      scaleX: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.2,
      ease: 'power2.out',
      transformOrigin: 'left center'
    }, 0.2);
    
  }, [stages]);
  
  if (!stages || stages.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide" ref={containerRef}>
      <div className="flex items-center min-w-max">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.name}>
            <div className={`pipeline-step w-32 ${stage.status === 'success' ? 'pipeline-step-active' : ''}`}>
              <div className="pipeline-step-icon">
                <Icon 
                  icon={stage.icon} 
                  className={`w-6 h-6 ${stage.status === 'success' ? 'text-terminal-green' : 'text-nord-4'}`} 
                />
              </div>
              <div className="text-center w-full">
                <div className="pipeline-step-label mb-1 truncate">{stage.name}</div>
                <div className="flex items-center justify-center gap-1">
                  <Icon 
                    icon={stage.status === 'success' ? 'mdi:check-circle' : 'mdi:circle-outline'} 
                    className={`w-3 h-3 ${stage.status === 'success' ? 'text-terminal-green' : 'text-nord-4/50'}`} 
                  />
                  <span className="text-[10px] font-mono text-nord-4/60">{stage.duration}</span>
                </div>
              </div>
            </div>
            
            {index < stages.length - 1 && (
              <div className="flex-1 min-w-[3rem] px-2 flex items-center justify-center">
                <div className={`w-full h-[2px] rounded-full relative overflow-hidden bg-nord-3/40`}>
                  {stage.status === 'success' && (
                    <div className="absolute inset-0 bg-terminal-green/50 animate-data-flow" style={{ width: '100%' }} />
                  )}
                </div>
                <Icon icon="mdi:chevron-right" className="text-nord-4/40 -ml-2 z-10 bg-surface-1" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
