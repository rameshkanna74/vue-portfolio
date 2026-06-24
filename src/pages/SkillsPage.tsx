import React from 'react';
import { Icon } from '@iconify/react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ProductionReadinessMatrix } from '../components/skills/ProductionReadinessMatrix';

export const SkillsPage: React.FC = () => {
  const { portfolioData } = usePortfolioStore();

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      <div className="border-b border-nord-3/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nord-6 flex items-center gap-3 tracking-tight">
            <Icon icon="mdi:matrix" className="text-nord-8 w-8 h-8" />
            Production Readiness Matrix
          </h1>
          <p className="text-nord-4/80 mt-2 max-w-2xl text-sm leading-relaxed">
            System-level proficiency across the cloud-native ecosystem. 
            Metrics indicate confidence levels and production environment experience.
          </p>
        </div>
      </div>

      <ProductionReadinessMatrix skills={portfolioData.skills} />
      
      {/* Certifications Section */}
      <section className="pt-8">
        <h2 className="text-xl font-bold text-nord-6 flex items-center gap-2 font-mono mb-6 border-b border-nord-3/40 pb-4">
          <Icon icon="mdi:certificate" className="text-nord-15 w-6 h-6" />
          CERTIFICATIONS & CONTINUOUS LEARNING
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="panel p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-nord-8/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-nord-8/20 transition-colors" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 bg-nord-2 border border-nord-3 rounded-lg flex items-center justify-center text-nord-8 flex-shrink-0">
                <Icon icon="mdi:aws" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-nord-6 font-bold text-sm">AWS Certified Cloud Practitioner</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="badge badge-warning text-[10px]">IN PROGRESS</span>
                  <span className="text-[10px] font-mono text-nord-4/60">Target: Q4 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-nord-9/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-nord-9/20 transition-colors" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 bg-nord-2 border border-nord-3 rounded-lg flex items-center justify-center text-nord-9 flex-shrink-0">
                <Icon icon="devicon:kubernetes" className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-nord-6 font-bold text-sm">Certified Kubernetes Administrator (CKA)</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="badge badge-warning text-[10px]">IN PROGRESS</span>
                  <span className="text-[10px] font-mono text-nord-4/60">Target: Q1 2027</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-terminal-green/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-terminal-green/20 transition-colors" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 bg-nord-2 border border-nord-3 rounded-lg flex items-center justify-center text-terminal-green flex-shrink-0">
                <Icon icon="devicon:docker" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-nord-6 font-bold text-sm">Docker Certified Associate (DCA)</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="badge badge-info text-[10px]">PLANNED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="pt-8">
        <h2 className="text-xl font-bold text-nord-6 flex items-center gap-2 font-mono mb-6 border-b border-nord-3/40 pb-4">
          <Icon icon="mdi:translate" className="text-nord-8 w-6 h-6" />
          LANGUAGES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.profile.languages.map((lang, idx) => (
            <div key={idx} className="panel p-5 flex items-center justify-between">
              <div>
                <div className="text-nord-6 font-bold">{lang.name}</div>
                {lang.certification && (
                  <div className="text-xs text-nord-4/80 mt-1">{lang.certification}</div>
                )}
              </div>
              <div className="text-xs font-mono px-2 py-1 bg-nord-2 border border-nord-3/50 rounded text-nord-8 uppercase">
                {lang.level}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
