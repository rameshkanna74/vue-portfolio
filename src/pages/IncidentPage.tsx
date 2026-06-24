import React from 'react';
import { Icon } from '@iconify/react';
import { IncidentTimeline } from '../components/incidents/IncidentTimeline';
import { SEO } from '../components/ui/SEO';

export const IncidentPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <SEO 
        title="Incident Response Command Center" 
        description="SEV-1 incident timeline, metrics, root cause analysis (RCA), and preventative remediation strategies."
      />

      {/* Header */}
      <div className="border-b border-nord-3/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nord-6 flex items-center gap-3 tracking-tight">
            <Icon icon="mdi:shield-alert" className="text-terminal-red w-8 h-8 animate-pulse" />
            Incident Response Command Center
          </h1>
          <p className="text-nord-4/80 mt-2 max-w-2xl text-sm leading-relaxed">
            Real-time incident response log and postmortem report for operational telemetry audit.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-terminal-green/30 bg-terminal-green/10 text-terminal-green text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
          SYSTEM STATE: OPERATIONAL
        </div>
      </div>

      {/* Incident Executive Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="panel p-5 flex flex-col justify-between min-h-[120px]">
          <div className="text-xs font-mono text-nord-4/60 uppercase tracking-wider">Incident Reference</div>
          <div className="text-xl font-bold text-nord-6 font-mono mt-2 flex items-center gap-2">
            INC-2025-0812
          </div>
          <span className="text-[10px] font-mono text-nord-4/80 mt-1">Operational Audit Ticket</span>
        </div>

        <div className="panel p-5 flex flex-col justify-between min-h-[120px]">
          <div className="text-xs font-mono text-nord-4/60 uppercase tracking-wider">Incident Severity</div>
          <div className="text-xl font-bold text-terminal-red font-mono mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terminal-red animate-ping" />
            SEV-1 (Critical)
          </div>
          <span className="text-[10px] font-mono text-nord-4/80 mt-1">High business process impact</span>
        </div>

        <div className="panel p-5 flex flex-col justify-between min-h-[120px]">
          <div className="text-xs font-mono text-nord-4/60 uppercase tracking-wider">MTTR (Resolution Time)</div>
          <div className="text-3xl font-bold text-nord-6 font-mono mt-2 text-glow">
            42m <span className="text-sm font-normal text-nord-4">00s</span>
          </div>
          <span className="text-[10px] font-mono text-terminal-green mt-1">SLA Target: &lt;60m (Met)</span>
        </div>

        <div className="panel p-5 flex flex-col justify-between min-h-[120px]">
          <div className="text-xs font-mono text-nord-4/60 uppercase tracking-wider">Target Component</div>
          <div className="text-xl font-bold text-nord-8 font-mono mt-2 truncate">
            Async Doc Pipeline
          </div>
          <span className="text-[10px] font-mono text-nord-4/80 mt-1">Celery Broker / Redis Stack</span>
        </div>
      </div>

      {/* Incident Telemetry Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Queue Depth Backlog */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4 border-b border-nord-3/30 pb-2">
            <h3 className="text-xs font-mono font-bold text-nord-6 uppercase tracking-wider flex items-center gap-2">
              <Icon icon="mdi:chart-bell-curve" className="text-nord-8" />
              Queue Depth Backlog (Pending Tasks)
            </h3>
            <span className="text-[10px] font-mono text-terminal-red">Peak: 15,482 tasks</span>
          </div>
          <div className="h-48 w-full flex items-end relative pt-6">
            {/* Simple styling grid */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-l border-b border-nord-3/20">
              <div className="border-t border-nord-3/10 w-full" />
              <div className="border-t border-nord-3/10 w-full" />
              <div className="border-t border-nord-3/10 w-full" />
            </div>
            <svg viewBox="0 0 100 30" className="w-full h-full text-terminal-red fill-terminal-red/10" preserveAspectRatio="none">
              <path 
                d="M0 30 L10 29 L20 28 L30 25 L40 10 L50 2 L60 8 L70 20 L80 29 L90 30 L100 30 L100 30 Z" 
                className="fill-terminal-red/10"
              />
              <path 
                d="M0 30 L10 29 L20 28 L30 25 L40 10 L50 2 L60 8 L70 20 L80 29 L90 30 L100 30" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.75" 
                className="text-terminal-red"
              />
            </svg>
            <div className="absolute bottom-1 right-2 text-[10px] font-mono text-nord-4/40">42 min window</div>
            <div className="absolute top-1 left-2 text-[10px] font-mono text-nord-4/40">15K</div>
            <div className="absolute bottom-1 left-2 text-[10px] font-mono text-nord-4/40">0</div>
          </div>
        </div>

        {/* Chart 2: Worker Node Memory Usage */}
        <div className="panel p-5">
          <div className="flex items-center justify-between mb-4 border-b border-nord-3/30 pb-2">
            <h3 className="text-xs font-mono font-bold text-nord-6 uppercase tracking-wider flex items-center gap-2">
              <Icon icon="mdi:memory" className="text-nord-8" />
              Celery Worker Node RAM Usage
            </h3>
            <span className="text-[10px] font-mono text-nord-11">Max: 98.6% (OOM Danger)</span>
          </div>
          <div className="h-48 w-full flex items-end relative pt-6">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-l border-b border-nord-3/20">
              <div className="border-t border-nord-3/10 w-full" />
              <div className="border-t border-nord-3/10 w-full" />
              <div className="border-t border-nord-3/10 w-full" />
            </div>
            <svg viewBox="0 0 100 30" className="w-full h-full text-nord-12 fill-nord-12/10" preserveAspectRatio="none">
              <path 
                d="M0 12 L10 13 L20 15 L30 22 L40 28 L50 29 L60 26 L70 18 L80 12 L90 12 L100 12 L100 30 L0 30 Z" 
                className="fill-nord-12/10"
              />
              <path 
                d="M0 12 L10 13 L20 15 L30 22 L40 28 L50 29 L60 26 L70 18 L80 12 L90 12 L100 12" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.75" 
                className="text-nord-12"
              />
            </svg>
            <div className="absolute bottom-1 right-2 text-[10px] font-mono text-nord-4/40">42 min window</div>
            <div className="absolute top-1 left-2 text-[10px] font-mono text-nord-4/40">100%</div>
            <div className="absolute bottom-1 left-2 text-[10px] font-mono text-nord-4/40">0%</div>
          </div>
        </div>
      </div>

      {/* Incident Resolution Timeline */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-nord-6 flex items-center gap-2 font-mono border-b border-nord-3/40 pb-4">
          <Icon icon="mdi:clock-fast" className="text-nord-8 w-6 h-6" />
          CHRONOLOGICAL DISPATCH LOG
        </h2>
        <IncidentTimeline />
      </section>

      {/* Postmortem & RCA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="panel p-6 space-y-4">
          <h3 className="text-md font-bold text-nord-6 font-mono border-b border-nord-3/40 pb-3 flex items-center gap-2">
            <Icon icon="mdi:comment-alert-outline" className="text-nord-13" />
            ROOT CAUSE ANALYSIS (RCA)
          </h3>
          <div className="space-y-3 text-sm text-nord-4 leading-relaxed">
            <p>
              The incident was caused by a memory leak inside the core PDF parsing engine used by the Celery asynchronous worker nodes. 
              Under standard workloads, garbage collection mitigated minor leaks. However, a bulk upload of nested vector graphics inside large PDF documents triggered recursive loops that rapidly exhausted container RAM.
            </p>
            <p>
              Once RAM hit 98%, Linux OOM-killer terminated worker threads. Sub-processes were auto-restarted by supervisord/systemd, but immediately re-queued the same unparsed documents, creating a "poison pill" crash loop that locked up all worker resources.
            </p>
          </div>
        </div>

        <div className="panel p-6 space-y-4">
          <h3 className="text-md font-bold text-nord-6 font-mono border-b border-nord-3/40 pb-3 flex items-center gap-2">
            <Icon icon="mdi:shield-check-outline" className="text-terminal-green" />
            PREVENTATIVE ACTION PLAN
          </h3>
          <ul className="space-y-2 text-sm text-nord-4 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-terminal-green font-bold">[x]</span>
              <span>Replaced core PDF parser library with optimized streaming module</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-green font-bold">[x]</span>
              <span>Implemented Celery `--max-tasks-per-child` flag to recycle leaky worker processes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-green font-bold">[x]</span>
              <span>Created a Dead-Letter Queue (DLQ) trigger: task aborts after 3 failures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-nord-8 font-bold">[/]</span>
              <span>Configuring CPU/RAM resource limits in Helm values (planned)</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
