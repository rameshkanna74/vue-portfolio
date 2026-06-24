import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Icon } from '@iconify/react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ProjectCaseStudy } from '../components/projects/ProjectCaseStudy';

export const ProjectsPage: React.FC = () => {
  const { portfolioData } = usePortfolioStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.panel');
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="space-y-12 animate-fade-in pb-12" ref={containerRef}>
      <div className="border-b border-nord-3/40 pb-6">
        <h1 className="text-3xl font-bold text-nord-6 flex items-center gap-3 tracking-tight">
          <Icon icon="mdi:server-network" className="text-nord-8 w-8 h-8" />
          Infrastructure Command Center
        </h1>
        <p className="text-nord-4/80 mt-2 max-w-3xl text-sm leading-relaxed">
          Deep dives into production deployments, architectural decisions, and automation pipelines.
          Showcasing measurable business impact and engineering excellence.
        </p>
      </div>

      <div className="space-y-16">
        {portfolioData.projects.map((project) => (
          <ProjectCaseStudy key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
