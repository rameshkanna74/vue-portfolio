import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface DataPoint {
  date: string;
  deployments: number;
  errors: number;
}

// Generate some realistic looking data for the last 30 days
const generateData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Higher deployments on weekdays, lower on weekends
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    
    // Base deployments: 2-5 on weekends, 8-15 on weekdays
    const baseDeploys = isWeekend 
      ? Math.floor(Math.random() * 4) + 2 
      : Math.floor(Math.random() * 8) + 8;
      
    // Random spikes
    const spike = Math.random() > 0.8 ? Math.floor(Math.random() * 10) : 0;
    
    const deployments = baseDeploys + spike;
    
    // Errors roughly proportional to deployments, but mostly zero
    const errors = Math.random() > 0.7 ? Math.floor(Math.random() * (deployments / 4)) : 0;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      deployments,
      errors
    });
  }
  
  return data;
};

export const ActivityChart: React.FC = () => {
  const data = useRef(generateData()).current;
  const svgRef = useRef<SVGSVGElement>(null);
  const deploysPathRef = useRef<SVGPathElement>(null);
  const errorsPathRef = useRef<SVGPathElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  const width = 800;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  
  const maxDeploys = Math.max(...data.map(d => d.deployments)) * 1.2; // 20% headroom
  
  const getX = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth;
  const getY = (value: number) => padding.top + innerHeight - (value / maxDeploys) * innerHeight;

  useEffect(() => {
    // Initial draw animation
    if (deploysPathRef.current && errorsPathRef.current) {
      const deployLen = deploysPathRef.current.getTotalLength();
      const errLen = errorsPathRef.current.getTotalLength();
      
      gsap.fromTo(deploysPathRef.current, 
        { strokeDasharray: deployLen, strokeDashoffset: deployLen },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }
      );
      
      gsap.fromTo(errorsPathRef.current, 
        { strokeDasharray: errLen, strokeDashoffset: errLen },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", delay: 0.2 }
      );
      
      // Animate area fills
      gsap.fromTo('.chart-area',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1, stagger: 0.2 }
      );
    }
  }, []);

  // Generate paths
  const createPath = (key: 'deployments' | 'errors', isArea: boolean = false) => {
    if (data.length === 0) return '';
    
    let path = `M ${getX(0)} ${getY(data[0][key])}`;
    
    for (let i = 1; i < data.length; i++) {
      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1][key]);
      const currX = getX(i);
      const currY = getY(data[i][key]);
      
      // Curve
      const cpX = (prevX + currX) / 2;
      path += ` Q ${cpX} ${prevY}, ${currX} ${currY}`;
    }
    
    if (isArea) {
      path += ` L ${getX(data.length - 1)} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;
    }
    
    return path;
  };

  return (
    <div className="panel p-5 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-nord-6 font-mono font-semibold tracking-wide">DEPLOYMENT ACTIVITY</h3>
          <p className="text-xs text-nord-4 font-mono mt-1">30-Day Rolling Window</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-nord-8"></span>
            <span className="text-xs font-mono text-nord-4">Deployments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-terminal-red"></span>
            <span className="text-xs font-mono text-nord-4">Errors</span>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg 
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="deployGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(56, 189, 248)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(56, 189, 248)" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="errorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.0" />
            </linearGradient>
            
            {/* Grid Pattern */}
            <pattern id="grid" width={innerWidth / 10} height={innerHeight / 4} patternUnits="userSpaceOnUse">
              <path d={`M ${innerWidth / 10} 0 L 0 0 0 ${innerHeight / 4}`} fill="none" stroke="currentColor" className="text-nord-3/20" strokeWidth="1"/>
            </pattern>
          </defs>

          {/* Grid */}
          <rect x={padding.left} y={padding.top} width={innerWidth} height={innerHeight} fill="url(#grid)" />
          
          {/* Y-Axis Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <text 
              key={`y-${i}`} 
              x={padding.left - 10} 
              y={padding.top + innerHeight - (innerHeight * ratio)} 
              className="text-[10px] font-mono fill-nord-4"
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {Math.round(maxDeploys * ratio)}
            </text>
          ))}

          {/* X-Axis Labels (show every 5th day) */}
          {data.map((d, i) => i % 5 === 0 && (
            <text 
              key={`x-${i}`} 
              x={getX(i)} 
              y={height - 10} 
              className="text-[10px] font-mono fill-nord-4"
              textAnchor="middle"
            >
              {d.date}
            </text>
          ))}

          {/* Areas */}
          <path 
            className="chart-area"
            d={createPath('deployments', true)} 
            fill="url(#deployGradient)" 
            opacity="0"
          />
          <path 
            className="chart-area"
            d={createPath('errors', true)} 
            fill="url(#errorGradient)" 
            opacity="0"
          />

          {/* Lines */}
          <path 
            ref={deploysPathRef}
            d={createPath('deployments')} 
            fill="none" 
            stroke="rgb(56, 189, 248)" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            ref={errorsPathRef}
            d={createPath('errors')} 
            fill="none" 
            stroke="rgb(239, 68, 68)" 
            strokeWidth="2" 
            strokeLinecap="round"
          />

          {/* Interaction Overlay */}
          {data.map((_, i) => (
            <rect
              key={`overlay-${i}`}
              x={i === 0 ? getX(0) : getX(i - 0.5)}
              y={padding.top}
              width={i === 0 ? (getX(1) - getX(0)) / 2 : (i === data.length - 1 ? (getX(i) - getX(i-1)) / 2 : getX(i+0.5) - getX(i-0.5))}
              height={innerHeight}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoverIndex(i)}
            />
          ))}

          {/* Hover indicator */}
          {hoverIndex !== null && (
            <g>
              <line 
                x1={getX(hoverIndex)} 
                y1={padding.top} 
                x2={getX(hoverIndex)} 
                y2={height - padding.bottom} 
                stroke="currentColor" 
                className="text-nord-4/50 stroke-dasharray-[4,4]" 
                strokeWidth="1"
              />
              <circle 
                cx={getX(hoverIndex)} 
                cy={getY(data[hoverIndex].deployments)} 
                r="4" 
                fill="rgb(56, 189, 248)" 
                stroke="rgb(11, 17, 32)" 
                strokeWidth="2" 
              />
              <circle 
                cx={getX(hoverIndex)} 
                cy={getY(data[hoverIndex].errors)} 
                r="4" 
                fill="rgb(239, 68, 68)" 
                stroke="rgb(11, 17, 32)" 
                strokeWidth="2" 
              />
            </g>
          )}
        </svg>

        {/* HTML Tooltip */}
        {hoverIndex !== null && (
          <div 
            className="absolute z-10 bg-nord-1 border border-nord-3 shadow-panel p-3 rounded-lg pointer-events-none transition-all duration-75"
            style={{
              left: `max(10px, min(calc(${100 * (hoverIndex / (data.length - 1))}% - 75px), calc(100% - 160px)))`,
              top: '20px'
            }}
          >
            <div className="text-xs font-mono text-nord-4 mb-2">{data[hoverIndex].date}</div>
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-sm font-mono text-nord-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-nord-8"></span> Deployments
              </span>
              <span className="text-sm font-bold font-mono text-nord-8">{data[hoverIndex].deployments}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-mono text-nord-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terminal-red"></span> Errors
              </span>
              <span className="text-sm font-bold font-mono text-terminal-red">{data[hoverIndex].errors}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
