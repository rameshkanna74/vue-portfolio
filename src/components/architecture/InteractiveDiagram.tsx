import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Icon } from '@iconify/react';

export interface DiagramNode {
  id: string;
  label: string;
  icon: string;
  type: string;
  status: 'healthy' | 'warning' | 'critical' | 'inactive';
  metrics?: { [key: string]: string };
  desc: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
}

export interface DiagramEdge {
  source: string;
  target: string;
  animated?: boolean;
}

interface InteractiveDiagramProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  title?: string;
  description?: string;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ nodes, edges, title = "System Architecture", description }) => {
  const [activeNode, setActiveNode] = useState<DiagramNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const nodeElements = containerRef.current.querySelectorAll('.arch-node');
    const edgePaths = svgRef.current.querySelectorAll('.arch-edge');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    // Animate edges first
    tl.from(edgePaths, {
      strokeDashoffset: 1000,
      strokeDasharray: 1000,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power2.inOut',
    });

    // Then pop in the nodes
    tl.from(nodeElements, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
    }, "-=1");

  }, [nodes, edges]);

  const getStatusColor = (status: DiagramNode['status']) => {
    switch(status) {
      case 'healthy': return 'text-terminal-green border-terminal-green/30 bg-terminal-green/10';
      case 'warning': return 'text-terminal-amber border-terminal-amber/30 bg-terminal-amber/10';
      case 'critical': return 'text-terminal-red border-terminal-red/30 bg-terminal-red/10';
      case 'inactive': return 'text-nord-4 border-nord-3/50 bg-nord-2/50';
    }
  };

  const getStatusDot = (status: DiagramNode['status']) => {
    switch(status) {
      case 'healthy': return 'bg-terminal-green shadow-[0_0_8px_rgba(163,190,140,0.8)]';
      case 'warning': return 'bg-terminal-amber animate-pulse';
      case 'critical': return 'bg-terminal-red animate-ping';
      case 'inactive': return 'bg-nord-3';
    }
  };

  return (
    <div className="bg-nord-0 border border-nord-3/40 rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-glow-sm">
      
      {/* Diagram Area */}
      <div className="flex-1 relative min-h-[500px] p-8 border-b lg:border-b-0 lg:border-r border-nord-3/40" ref={containerRef}>
        <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
        
        {title && (
          <div className="absolute top-4 left-4 z-20">
            <h3 className="text-nord-6 font-mono font-bold tracking-wider">{title}</h3>
            {description && <p className="text-nord-4/60 text-xs font-mono mt-1">{description}</p>}
          </div>
        )}

        {/* SVG Edges */}
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(136, 192, 208, 0.5)" />
            </marker>
            <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(136, 192, 208, 0.2)" />
              <stop offset="100%" stopColor="rgba(136, 192, 208, 0.8)" />
            </linearGradient>
          </defs>
          
          {edges.map((edge, i) => {
            const source = nodes.find(n => n.id === edge.source);
            const target = nodes.find(n => n.id === edge.target);
            if (!source || !target) return null;
            
            // Generate a curved path between nodes
            const sx = source.x;
            const sy = source.y;
            const tx = target.x;
            const ty = target.y;
            
            // Control points for bezier curve (horizontal bias)
            const cp1x = sx + Math.abs(tx - sx) / 2;
            const cp1y = sy;
            const cp2x = tx - Math.abs(tx - sx) / 2;
            const cp2y = ty;

            return (
              <g key={`${edge.source}-${edge.target}-${i}`}>
                <path 
                  className="arch-edge"
                  d={`M ${sx}% ${sy}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${tx}% ${ty}%`}
                  fill="none"
                  stroke="rgba(76, 86, 106, 0.4)"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                {edge.animated && (
                  <path 
                    d={`M ${sx}% ${sy}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${tx}% ${ty}%`}
                    fill="none"
                    stroke="url(#edge-gradient)"
                    strokeWidth="2"
                    strokeDasharray="10 10"
                    className="animate-data-flow"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <div 
            key={node.id}
            className={`arch-node absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onClick={() => setActiveNode(node)}
            onMouseEnter={() => setActiveNode(node)}
          >
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 backdrop-blur-sm
              ${activeNode?.id === node.id ? 'scale-110 shadow-[0_0_20px_rgba(136,192,208,0.3)] ' + getStatusColor(node.status).replace('text-', 'border-').split(' ')[1] : 'border-nord-3 bg-nord-1 hover:border-nord-8'}`}
            >
              <Icon 
                icon={node.icon} 
                className={`w-8 h-8 ${activeNode?.id === node.id ? 'text-nord-6' : 'text-nord-4 group-hover:text-nord-8'}`} 
              />
              {/* Status Dot */}
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusDot(node.status)} border-2 border-nord-0`} />
            </div>
            
            {/* Label below node */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap text-center pointer-events-none">
              <div className="text-xs font-bold text-nord-6">{node.label}</div>
              <div className="text-[10px] font-mono text-nord-4/60 uppercase">{node.type}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Panel */}
      <div className="w-full lg:w-80 bg-nord-1 p-6 flex flex-col">
        <h3 className="text-nord-6 font-mono font-bold tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-nord-3/40 pb-4">
          <Icon icon="mdi:information-outline" className="text-nord-8" />
          Component Details
        </h3>
        
        {activeNode ? (
          <div className="animate-fade-in flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getStatusColor(activeNode.status)}`}>
                <Icon icon={activeNode.icon} className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-nord-6 leading-tight">{activeNode.label}</h4>
                <div className="text-xs font-mono text-nord-4/80">{activeNode.type}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs font-mono text-nord-4/60 uppercase tracking-widest mb-2">Description</div>
              <p className="text-sm text-nord-4 leading-relaxed bg-nord-2/30 p-3 rounded border border-nord-3/30">
                {activeNode.desc}
              </p>
            </div>

            {activeNode.metrics && (
              <div>
                <div className="text-xs font-mono text-nord-4/60 uppercase tracking-widest mb-2">Live Metrics</div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(activeNode.metrics).map(([key, value]) => (
                    <div key={key} className="bg-nord-2/50 border border-nord-3 p-3 rounded">
                      <div className="text-[10px] font-mono text-nord-4/60 uppercase mb-1">{key}</div>
                      <div className="text-sm font-bold text-nord-6 font-mono">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-4 border-t border-nord-3/40">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-nord-4/60">Status</span>
                <span className={`flex items-center gap-1.5 uppercase ${getStatusColor(activeNode.status).split(' ')[0]}`}>
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(activeNode.status)}`}></span>
                  {activeNode.status}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
            <Icon icon="mdi:cursor-default-click" className="w-12 h-12 text-nord-4 mb-4" />
            <p className="text-sm text-nord-4 font-mono max-w-[200px]">
              Hover or click on a component in the diagram to view its telemetry data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
