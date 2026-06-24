import React from 'react';
import { Icon } from '@iconify/react';
import { DoraMetrics } from '../components/dashboard/DoraMetrics';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { MetricsDashboard } from '../components/dashboard/MetricsDashboard';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-nord-3/40 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-nord-6 flex items-center gap-3 tracking-tight">
            <Icon icon="mdi:monitor-dashboard" className="text-nord-8" width="32" height="32" />
            Executive Dashboard
          </h1>
          <p className="text-nord-4/80 mt-2 max-w-2xl text-sm leading-relaxed">
            High-level overview of infrastructure performance, deployment velocity, and operational stability.
            Metrics are aggregated across all production clusters and AWS regions.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="status-badge status-operational hover-glow cursor-default transition-all duration-300">
            <Icon icon="mdi:shield-check" className="w-4 h-4" />
            <span>ALL SYSTEMS NOMINAL</span>
          </div>
          <div className="status-badge status-neutral border-nord-3/40 bg-surface-1 font-mono text-xs hover:border-nord-8/30 transition-colors cursor-default">
            <Icon icon="mdi:clock-outline" className="w-4 h-4" />
            <span>UTC {new Date().toISOString().substring(11, 16)}</span>
          </div>
        </div>
      </div>

      {/* DORA Metrics Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono font-bold text-nord-6 uppercase tracking-widest flex items-center gap-2">
            <Icon icon="mdi:chart-timeline-variant" className="text-nord-8 w-5 h-5" />
            DORA Metrics
          </h2>
          <span className="text-xs font-mono text-nord-4/60">Last 30 Days</span>
        </div>
        <DoraMetrics />
      </section>

      {/* Activity & Scale Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        
        {/* Scale Panel */}
        <div className="panel p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-nord-6 font-mono font-semibold tracking-wide flex items-center gap-2 mb-6">
              <Icon icon="mdi:server-network" className="text-nord-8" />
              INFRASTRUCTURE SCALE
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-mono text-nord-4 uppercase">AWS EC2 Instances</span>
                  <span className="text-lg font-bold font-mono text-nord-6">12</span>
                </div>
                <div className="w-full bg-nord-2/50 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-nord-8 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-mono text-nord-4 uppercase">Running Containers</span>
                  <span className="text-lg font-bold font-mono text-nord-6">~45</span>
                </div>
                <div className="w-full bg-nord-2/50 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-nord-14 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-mono text-nord-4 uppercase">Database Connections</span>
                  <span className="text-lg font-bold font-mono text-nord-6">850/1k</span>
                </div>
                <div className="w-full bg-nord-2/50 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-terminal-amber h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-mono text-nord-4 uppercase">Storage Allocated</span>
                  <span className="text-lg font-bold font-mono text-nord-6">1.2 TB</span>
                </div>
                <div className="w-full bg-nord-2/50 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-nord-15 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-nord-3/40 flex justify-between items-center text-xs font-mono">
            <span className="text-nord-4/60">Auto-scaling enabled</span>
            <span className="text-terminal-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green"></span>
              Healthy
            </span>
          </div>
        </div>
      </section>

      {/* Operational Metrics */}
      <section className="pt-4">
        <MetricsDashboard />
      </section>
      
    </div>
  );
};
