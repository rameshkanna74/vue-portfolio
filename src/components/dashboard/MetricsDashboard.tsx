import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Icon } from '@iconify/react';
import { SparklineChart } from './SparklineChart';

interface MetricWidgetProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: string;
  trend?: string;
  isPositiveTrend?: boolean;
  history: number[];
  colorTheme?: 'primary' | 'success' | 'warning' | 'info' | 'purple';
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ 
  title, 
  value, 
  suffix = '', 
  prefix = '', 
  icon, 
  trend, 
  isPositiveTrend = true,
  history,
  colorTheme = 'primary'
}) => {
  const valueRef = useRef<HTMLDivElement>(null);

  // Map theme to actual CSS colors
  const getThemeColor = () => {
    switch (colorTheme) {
      case 'success': return 'rgb(34, 197, 94)'; // nord-14
      case 'warning': return 'rgb(234, 179, 8)'; // nord-13
      case 'info': return 'rgb(56, 189, 248)'; // nord-8
      case 'purple': return 'rgb(168, 85, 247)'; // nord-15
      case 'primary':
      default: return 'rgb(56, 189, 248)'; // nord-8
    }
  };

  const getThemeClasses = () => {
    switch (colorTheme) {
      case 'success': return 'text-nord-14 bg-nord-14/10 border-nord-14/20';
      case 'warning': return 'text-nord-13 bg-nord-13/10 border-nord-13/20';
      case 'info': return 'text-nord-8 bg-nord-8/10 border-nord-8/20';
      case 'purple': return 'text-nord-15 bg-nord-15/10 border-nord-15/20';
      case 'primary':
      default: return 'text-nord-8 bg-nord-8/10 border-nord-8/20';
    }
  };

  useEffect(() => {
    if (valueRef.current) {
      gsap.fromTo(valueRef.current, 
        { innerHTML: 0 }, 
        { 
          innerHTML: value, 
          duration: 2, 
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            if (valueRef.current) {
              const val = Math.round(Number(this.targets()[0].innerHTML));
              valueRef.current.innerHTML = `${prefix}${val}${suffix}`;
            }
          }
        }
      );
    }
  }, [value, prefix, suffix]);

  return (
    <div className="metric-card group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-nord-4 font-mono text-xs uppercase tracking-wider font-semibold">{title}</h3>
        <div className={`p-1.5 rounded-lg border ${getThemeClasses()}`}>
          <Icon icon={icon} className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex justify-between items-end mb-4">
        <div>
          <div className="text-3xl font-bold text-nord-6 font-mono tracking-tight" ref={valueRef}>
            {prefix}0{suffix}
          </div>
          {trend && (
            <div className="text-xs font-mono mt-2 flex items-center gap-1.5">
              <Icon 
                icon={isPositiveTrend ? 'mdi:trending-up' : 'mdi:trending-down'} 
                className={`w-3.5 h-3.5 ${isPositiveTrend ? 'text-terminal-green' : 'text-terminal-red'}`} 
              />
              <span className={isPositiveTrend ? 'text-terminal-green' : 'text-terminal-red'}>
                {trend}
              </span>
            </div>
          )}
        </div>
        
        {/* Mini Sparkline right next to value */}
        <div className="w-16 h-10 opacity-70 group-hover:opacity-100 transition-opacity">
          <SparklineChart 
            data={history} 
            width={64} 
            height={40} 
            color={getThemeColor()} 
            showArea={false}
            strokeWidth={2}
          />
        </div>
      </div>
    </div>
  );
};

export const MetricsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6 border-b border-nord-3/40 pb-4">
        <div>
          <h2 className="text-xl font-bold text-nord-6 flex items-center gap-2 font-mono">
            <Icon icon="mdi:server-network" className="text-nord-8 w-6 h-6" />
            OPERATIONAL_METRICS
          </h2>
          <p className="text-nord-4/60 text-sm font-mono mt-1">Aggregated telemetry from production systems</p>
        </div>
        <div className="flex gap-3">
          <div className="status-badge status-operational">
            <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            LIVE
          </div>
          <select className="bg-surface-1 border border-nord-3/50 text-nord-4 text-xs font-mono rounded px-3 py-1 outline-none focus:border-nord-8">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 24 Hours</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <MetricWidget 
          title="Global Uptime" 
          value={99} 
          suffix=".99%" 
          icon="mdi:check-decagram" 
          trend="SLA Maintained" 
          isPositiveTrend={true}
          history={[99.9, 99.95, 99.8, 99.99, 99.99, 100, 100]}
          colorTheme="success" 
        />
        <MetricWidget 
          title="Avg API Latency" 
          value={85} 
          suffix="ms" 
          icon="mdi:speedometer" 
          trend="-15ms vs last week" 
          isPositiveTrend={true}
          history={[120, 115, 100, 95, 90, 88, 85]}
          colorTheme="info" 
        />
        <MetricWidget 
          title="Background Jobs" 
          value={50} 
          prefix="~"
          suffix="K/hr" 
          icon="mdi:cogs" 
          trend="Peak processing" 
          isPositiveTrend={true}
          history={[20, 35, 40, 45, 52, 48, 50]}
          colorTheme="purple" 
        />
        <MetricWidget 
          title="Infra as Code" 
          value={100} 
          suffix="%" 
          icon="mdi:terraform" 
          trend="Fully managed" 
          isPositiveTrend={true}
          history={[70, 80, 85, 90, 95, 100, 100]}
          colorTheme="purple" 
        />
        <MetricWidget 
          title="Security Score" 
          value={98} 
          suffix="/100" 
          icon="mdi:shield-check" 
          trend="Zero critical vulns" 
          isPositiveTrend={true}
          history={[85, 88, 90, 95, 95, 98, 98]}
          colorTheme="success" 
        />
        <MetricWidget 
          title="Active Alerts" 
          value={2} 
          icon="mdi:bell-badge" 
          trend="Non-critical warnings" 
          isPositiveTrend={false}
          history={[5, 4, 3, 5, 2, 1, 2]}
          colorTheme="warning" 
        />
        <MetricWidget 
          title="Cost Optimization" 
          value={35} 
          suffix="%" 
          icon="mdi:piggy-bank" 
          trend="Savings achieved" 
          isPositiveTrend={true}
          history={[10, 15, 20, 25, 30, 32, 35]}
          colorTheme="success" 
        />
        <MetricWidget 
          title="Docker Images" 
          value={24} 
          icon="mdi:docker" 
          trend="Optimized builds" 
          isPositiveTrend={true}
          history={[10, 12, 15, 18, 20, 22, 24]}
          colorTheme="info" 
        />
      </div>
    </div>
  );
};
