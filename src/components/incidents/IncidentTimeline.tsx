import React from 'react';
import { Icon } from '@iconify/react';

export interface TimelineEvent {
  timestamp: string;
  timeOffset: string;
  title: string;
  description: string;
  type: 'alert' | 'investigation' | 'mitigation' | 'recovery' | 'resolved';
  tools: string[];
}

const events: TimelineEvent[] = [
  {
    timestamp: '14:22:05 UTC',
    timeOffset: 'T+00:00',
    title: 'AWS CloudWatch Alarm — Critical Queue Depth Backlog',
    description: 'CloudWatch alarm `QueueLengthHigh` triggered. Async document processing queue (Celery broker on Redis) exceeded 15,000 pending tasks.',
    type: 'alert',
    tools: ['AWS CloudWatch', 'Slack Alerts'],
  },
  {
    timestamp: '14:27:10 UTC',
    timeOffset: 'T+00:05',
    title: 'On-Call Engineer Paged & Bastion Login',
    description: 'PagerDuty incident acknowledged. Logged into production bastion shell to inspect queue status using Redis CLI and check active worker pods.',
    type: 'investigation',
    tools: ['PagerDuty', 'SSH Bastion', 'Redis CLI'],
  },
  {
    timestamp: '14:37:30 UTC',
    timeOffset: 'T+00:15',
    title: 'Resource Starvation Diagnosed',
    description: 'Found Celery worker processes consuming 100% memory, resulting in swap memory thrashing. Isolated root cause to a memory leak in the PDF text extraction library under parallel workloads.',
    type: 'investigation',
    tools: ['htop', 'Kubectl logs', 'Celery Inspect'],
  },
  {
    timestamp: '14:47:15 UTC',
    timeOffset: 'T+00:25',
    title: 'Mitigation: Workers Scaled & Limits Restricted',
    description: 'Horizontally auto-scaled Celery worker nodes. Temporarily restricted concurrency limits per container pod to avoid out-of-memory (OOM) killer terminations.',
    type: 'mitigation',
    tools: ['Kubernetes Deployment', 'kubectl scale'],
  },
  {
    timestamp: '14:57:00 UTC',
    timeOffset: 'T+00:35',
    title: 'Queue Depth Returns to Baseline',
    description: 'Worker memory stabilized. Backlogged queues processed successfully, reducing queue depth from 15k to <100 tasks.',
    type: 'recovery',
    tools: ['AWS CloudWatch', 'Grafana'],
  },
  {
    timestamp: '15:04:12 UTC',
    timeOffset: 'T+00:42',
    title: 'Hotfix Deployed & Incident Resolved',
    description: 'Replaced leaky PDF parser dependency with an optimized streaming parser wrapper. Deployed hotfix v2.4.1 to production. Closed incident ticket.',
    type: 'resolved',
    tools: ['GitHub Actions', 'ArgoCD', 'Jira Service Desk'],
  },
];

export const IncidentTimeline: React.FC = () => {
  const getEventBadgeColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'alert':
        return 'border-terminal-red/30 bg-terminal-red/10 text-terminal-red';
      case 'investigation':
        return 'border-nord-13/30 bg-nord-13/10 text-nord-13';
      case 'mitigation':
        return 'border-nord-10/30 bg-nord-10/10 text-nord-10';
      case 'recovery':
        return 'border-nord-8/30 bg-nord-8/10 text-nord-8';
      case 'resolved':
        return 'border-terminal-green/30 bg-terminal-green/10 text-terminal-green';
    }
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'alert':
        return 'mdi:bell-ring-outline';
      case 'investigation':
        return 'mdi:search-web';
      case 'mitigation':
        return 'mdi:wrench-outline';
      case 'recovery':
        return 'mdi:chart-timeline-variant-shimmer';
      case 'resolved':
        return 'mdi:check-circle-outline';
    }
  };

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:left-[17px] before:w-0.5 before:bg-nord-3/30">
      {events.map((event, idx) => (
        <div key={idx} className="relative pl-12 group transition-all duration-300">
          {/* Node marker */}
          <div className={`absolute left-0 top-1.5 w-9 h-9 rounded-full border flex items-center justify-center z-10 transition-transform group-hover:scale-110 bg-nord-1 ${
            event.type === 'resolved' ? 'shadow-[0_0_10px_rgba(34,197,94,0.3)]' : ''
          } ${getEventBadgeColor(event.type).split(' ')[0]} ${getEventBadgeColor(event.type).split(' ')[1]}`}>
            <Icon icon={getEventIcon(event.type)} className={`w-5 h-5 ${getEventBadgeColor(event.type).split(' ')[2]}`} />
          </div>

          {/* Event Content */}
          <div className="panel hover:border-nord-8/20 transition-all duration-300 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-nord-3/30 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${getEventBadgeColor(event.type)}`}>
                  {event.type}
                </span>
                <h3 className="text-nord-6 font-bold text-sm tracking-wide font-mono">
                  {event.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-nord-4/60">
                <span>{event.timestamp}</span>
                <span className="text-nord-8 font-bold">({event.timeOffset})</span>
              </div>
            </div>

            <p className="text-nord-4 text-sm leading-relaxed mb-4">
              {event.description}
            </p>

            {/* Tools Used */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-nord-3/20">
              <span className="text-[10px] font-mono text-nord-4/50 uppercase tracking-wider">Tools:</span>
              {event.tools.map((tool) => (
                <span key={tool} className="px-2 py-0.5 bg-nord-2 border border-nord-3/50 text-nord-5 text-[10px] rounded font-mono">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
