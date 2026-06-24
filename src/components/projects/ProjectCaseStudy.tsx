import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import type { Project } from '../../types/portfolio';
import { PipelineVisualizer } from './PipelineVisualizer';

interface ProjectCaseStudyProps {
  project: Project;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'pipeline'>('overview');

  return (
    <div className="panel overflow-hidden group">
      {/* Header */}
      <div className="p-6 border-b border-nord-3/40 bg-nord-2/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-nord-8/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-nord-8/10 transition-colors duration-500" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-nord-6">{project.title}</h3>
              <span className="badge badge-tech hidden sm:inline-flex">{project.category}</span>
            </div>
            <p className="text-nord-4 font-mono text-sm leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
          
          {project.links && (
            <div className="flex gap-3">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary px-3 py-1.5 flex items-center gap-2">
                  <Icon icon="mdi:github" className="w-4 h-4" />
                  <span className="text-xs">Repository</span>
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary px-3 py-1.5 flex items-center gap-2">
                  <Icon icon="mdi:open-in-new" className="w-4 h-4" />
                  <span className="text-xs">Live Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded bg-nord-2 border border-nord-3/50 text-xs font-mono text-nord-4">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-nord-3/40 bg-surface-0/50">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-200 border-b-2 ${activeTab === 'overview' ? 'border-nord-8 text-nord-8 bg-nord-8/5' : 'border-transparent text-nord-4 hover:text-nord-6 hover:bg-nord-2/50'}`}
        >
          Overview & Impact
        </button>
        {project.architecture && project.architecture.length > 0 && (
          <button 
            onClick={() => setActiveTab('architecture')}
            className={`px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-200 border-b-2 ${activeTab === 'architecture' ? 'border-nord-8 text-nord-8 bg-nord-8/5' : 'border-transparent text-nord-4 hover:text-nord-6 hover:bg-nord-2/50'}`}
          >
            Architecture
          </button>
        )}
        {project.pipeline && project.pipeline.length > 0 && (
          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-200 border-b-2 ${activeTab === 'pipeline' ? 'border-nord-8 text-nord-8 bg-nord-8/5' : 'border-transparent text-nord-4 hover:text-nord-6 hover:bg-nord-2/50'}`}
          >
            CI/CD Pipeline
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {project.businessProblem && (
              <div className="bg-nord-2/30 p-5 rounded-lg border border-nord-3/50 border-l-4 border-l-terminal-amber">
                <h4 className="text-xs font-mono text-nord-4/80 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Icon icon="mdi:alert-circle-outline" className="w-4 h-4 text-terminal-amber" />
                  The Problem
                </h4>
                <p className="text-nord-5 text-sm leading-relaxed">{project.businessProblem}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-nord-6 mb-4 flex items-center gap-2">
                  <Icon icon="mdi:check-circle-outline" className="text-nord-14" />
                  Implementation Highlights
                </h4>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Icon icon="mdi:chevron-right" className="w-4 h-4 text-nord-8 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-nord-4 leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-6">
                {project.businessImpact && project.businessImpact.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-nord-6 mb-4 flex items-center gap-2">
                      <Icon icon="mdi:chart-line" className="text-nord-8" />
                      Business Impact
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {project.businessImpact.map((metric, i) => (
                        <div key={i} className="panel p-4 bg-nord-2/20">
                          <div className="text-2xl font-bold text-nord-6 font-mono tracking-tight text-terminal-green">
                            {metric.value}
                          </div>
                          <div className="text-xs font-mono text-nord-4/80 mt-1 uppercase tracking-wider">{metric.metric}</div>
                          <div className="text-[10px] text-nord-4/50 mt-1">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.monitoringStrategy && (
                  <div>
                    <h4 className="text-xs font-mono text-nord-4/80 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Icon icon="mdi:monitor-dashboard" className="w-4 h-4 text-nord-8" />
                      Observability
                    </h4>
                    <p className="text-sm text-nord-4 leading-relaxed bg-nord-2/30 p-3 rounded border border-nord-3/30">
                      {project.monitoringStrategy}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ARCHITECTURE TAB */}
        {activeTab === 'architecture' && project.architecture && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-nord-0 p-6 rounded-lg border border-nord-3/50 min-h-[300px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid-dots opacity-30" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {project.architecture.map((node) => (
                  <div key={node.id} className="panel p-4 flex flex-col items-center text-center relative z-10 hover-lift hover:border-nord-8/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-nord-2 flex items-center justify-center text-nord-8 mb-3 border border-nord-3/50">
                      <Icon icon={node.icon} className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-nord-6 text-sm mb-1">{node.label}</div>
                    <div className="text-[10px] font-mono text-nord-4/60 uppercase tracking-wider mb-2 px-2 py-0.5 bg-nord-2 rounded">{node.type}</div>
                    <div className="text-xs text-nord-4/80 leading-relaxed mt-2 border-t border-nord-3/40 pt-2 w-full">
                      {node.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {project.securityControls && project.securityControls.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 p-4 bg-nord-2/20 rounded-lg border border-nord-3/30">
                  <h4 className="text-xs font-mono font-bold text-nord-6 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon icon="mdi:shield-check" className="text-nord-14 w-4 h-4" />
                    Security Controls
                  </h4>
                  <ul className="space-y-2">
                    {project.securityControls.map((sec, i) => (
                      <li key={i} className="text-xs text-nord-4 flex items-start gap-2">
                        <Icon icon="mdi:check" className="w-3.5 h-3.5 text-nord-14 mt-0.5 flex-shrink-0" />
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {project.reliabilityStrategy && (
                  <div className="md:col-span-2 p-4 bg-nord-2/20 rounded-lg border border-nord-3/30">
                    <h4 className="text-xs font-mono font-bold text-nord-6 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Icon icon="mdi:shield-refresh" className="text-nord-8 w-4 h-4" />
                      Reliability Strategy
                    </h4>
                    <p className="text-sm text-nord-4 leading-relaxed">
                      {project.reliabilityStrategy}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* PIPELINE TAB */}
        {activeTab === 'pipeline' && project.pipeline && (
          <div className="animate-fade-in space-y-8">
            <div className="bg-nord-0 p-8 rounded-lg border border-nord-3/50 overflow-hidden relative">
              <div className="absolute inset-0 grid-fine opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <h4 className="text-xs font-mono text-nord-4/60 uppercase tracking-widest mb-8 text-center">
                  CI/CD Execution Flow
                </h4>
                <PipelineVisualizer stages={project.pipeline} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="panel p-5">
                <h4 className="text-xs font-mono font-bold text-nord-6 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Icon icon="mdi:lightbulb-on-outline" className="text-terminal-amber w-4 h-4" />
                  Lessons Learned
                </h4>
                <ul className="space-y-3">
                  {project.lessonsLearned?.map((lesson, i) => (
                    <li key={i} className="text-sm text-nord-4 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal-amber mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
