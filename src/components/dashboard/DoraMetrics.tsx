import React from 'react';
import { Icon } from '@iconify/react';
import { SparklineChart } from './SparklineChart';

type PerformanceLevel = 'Elite' | 'High' | 'Medium' | 'Low';

interface DoraMetric {
  id: string;
  name: string;
  value: string;
  trend: string;
  isPositiveTrend: boolean;
  level: PerformanceLevel;
  history: number[];
  icon: string;
  description: string;
}

const metrics: DoraMetric[] = [
  {
    id: 'df',
    name: 'Deployment Frequency',
    value: 'Multiple/Day',
    trend: '+12% vs last month',
    isPositiveTrend: true,
    level: 'Elite',
    history: [2, 4, 3, 5, 4, 6, 8, 7, 9, 12, 10, 14],
    icon: 'mdi:rocket-launch',
    description: 'How often code is deployed to production',
  },
  {
    id: 'lt',
    name: 'Lead Time for Changes',
    value: '< 1 Hour',
    trend: '-15 mins vs last month',
    isPositiveTrend: true,
    level: 'Elite',
    history: [120, 110, 95, 90, 85, 80, 75, 70, 65, 55, 50, 45],
    icon: 'mdi:clock-fast',
    description: 'Time from commit to production',
  },
  {
    id: 'mttr',
    name: 'Time to Restore Service',
    value: '< 15 Mins',
    trend: '-5 mins vs last month',
    isPositiveTrend: true,
    level: 'Elite',
    history: [45, 40, 42, 35, 30, 25, 28, 20, 18, 15, 12, 10],
    icon: 'mdi:shield-check',
    description: 'Time to recover from a failure in production',
  },
  {
    id: 'cfr',
    name: 'Change Failure Rate',
    value: '0.8%',
    trend: '-0.2% vs last month',
    isPositiveTrend: true,
    level: 'High',
    history: [5.2, 4.8, 4.5, 3.2, 2.8, 2.5, 2.1, 1.8, 1.5, 1.2, 1.0, 0.8],
    icon: 'mdi:alert-circle-check',
    description: 'Percentage of deployments causing a failure',
  },
];

const getLevelColor = (level: PerformanceLevel) => {
  switch (level) {
    case 'Elite':
      return 'text-nord-15 bg-nord-15/10 border-nord-15/20';
    case 'High':
      return 'text-nord-14 bg-nord-14/10 border-nord-14/20';
    case 'Medium':
      return 'text-nord-13 bg-nord-13/10 border-nord-13/20';
    case 'Low':
      return 'text-nord-11 bg-nord-11/10 border-nord-11/20';
    default:
      return 'text-nord-4 bg-nord-3/30 border-nord-3/40';
  }
};

export const DoraMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="metric-card group relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-nord-8/5 rounded-full blur-3xl group-hover:bg-nord-8/10 transition-colors duration-500 pointer-events-none" />

          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-nord-2/50 rounded-lg border border-nord-3/30 text-nord-8">
                <Icon icon={metric.icon} className="w-5 h-5" />
              </div>
              <h3 className="text-nord-4 font-mono text-xs uppercase tracking-wider font-semibold">
                {metric.name}
              </h3>
            </div>
            <div className={`badge ${getLevelColor(metric.level)}`}>
              {metric.level}
            </div>
          </div>

          {/* Value & Trend */}
          <div className="mb-4">
            <div className="text-3xl font-bold text-nord-6 font-mono tracking-tight mb-1">
              {metric.value}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <Icon 
                icon={metric.isPositiveTrend ? 'mdi:trending-up' : 'mdi:trending-down'} 
                className={`w-3.5 h-3.5 ${metric.isPositiveTrend ? 'text-terminal-green' : 'text-terminal-red'}`} 
              />
              <span className={metric.isPositiveTrend ? 'text-terminal-green' : 'text-terminal-red'}>
                {metric.trend}
              </span>
            </div>
          </div>

          {/* Sparkline Chart */}
          <div className="mt-auto pt-4 border-t border-nord-3/30">
            <div className="h-[40px] w-full relative">
              {/* Invert the CFR/Lead/MTTR graphs so down looks "good" or just map them properly. The Sparkline maps min to bottom, max to top.
                  For MTTR, Lead Time, and CFR, lower is better. We'll draw the raw data, but maybe color it differently? 
                  Let's use terminal-green for positive trends, nord-8 for neutral.
              */}
              <SparklineChart 
                data={metric.history} 
                width={200} 
                height={40} 
                color="rgb(56, 189, 248)" // --nord-8
                className="absolute inset-0 w-full h-full object-cover"
                showArea={true}
              />
            </div>
          </div>
          
          {/* Tooltip on hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-nord-1/95 border-t border-nord-3 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-xs text-nord-4 font-sans leading-relaxed">
              {metric.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
