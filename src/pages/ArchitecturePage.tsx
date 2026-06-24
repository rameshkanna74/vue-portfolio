import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { InteractiveDiagram } from '../components/architecture/InteractiveDiagram';
import type { DiagramNode, DiagramEdge } from '../components/architecture/InteractiveDiagram';

// Define the diagrams
const globalArchNodes: DiagramNode[] = [
  { id: 'user', label: 'Users', icon: 'mdi:account-group', type: 'External', status: 'healthy', desc: 'External internet traffic', x: 10, y: 50 },
  { id: 'route53', label: 'Route 53', icon: 'mdi:aws', type: 'DNS', status: 'healthy', metrics: { latency: '12ms', queries: '450/s' }, desc: 'Global DNS routing', x: 25, y: 50 },
  { id: 'waf', label: 'AWS WAF', icon: 'mdi:shield-check', type: 'Security', status: 'healthy', metrics: { blocked: '12/m', allowed: '438/s' }, desc: 'Web Application Firewall filtering malicious requests', x: 40, y: 50 },
  { id: 'alb', label: 'ALB', icon: 'mdi:format-horizontal-align-center', type: 'Load Balancer', status: 'healthy', metrics: { active: '438', errors: '0' }, desc: 'Application Load Balancer distributing traffic', x: 55, y: 50 },
  { id: 'ecs', label: 'ECS Fargate', icon: 'mdi:docker', type: 'Compute', status: 'healthy', metrics: { tasks: '12', cpu: '45%' }, desc: 'Containerized API services running on serverless compute', x: 75, y: 30 },
  { id: 'rds', label: 'PostgreSQL RDS', icon: 'mdi:database', type: 'Database', status: 'healthy', metrics: { cpu: '30%', conns: '245/1000' }, desc: 'Multi-AZ relational database instance', x: 90, y: 50 },
  { id: 'redis', label: 'ElastiCache', icon: 'mdi:memory', type: 'Cache', status: 'warning', metrics: { mem: '85%', hits: '94%' }, desc: 'Redis cluster for caching frequent queries', x: 75, y: 70 },
];

const globalArchEdges: DiagramEdge[] = [
  { source: 'user', target: 'route53', animated: true },
  { source: 'route53', target: 'waf', animated: true },
  { source: 'waf', target: 'alb', animated: true },
  { source: 'alb', target: 'ecs', animated: true },
  { source: 'ecs', target: 'rds', animated: true },
  { source: 'ecs', target: 'redis', animated: true },
];

const dataProcessingNodes: DiagramNode[] = [
  { id: 'api', label: 'Ingestion API', icon: 'mdi:api', type: 'Service', status: 'healthy', metrics: { rpm: '1200', err: '0.1%' }, desc: 'Receives documents for processing', x: 15, y: 50 },
  { id: 's3_raw', label: 'S3 (Raw)', icon: 'mdi:aws', type: 'Storage', status: 'healthy', desc: 'Stores incoming raw documents', x: 35, y: 30 },
  { id: 'sqs', label: 'SQS Queue', icon: 'mdi:message-badge', type: 'Queue', status: 'healthy', metrics: { length: '450', age: '1.2s' }, desc: 'Decouples ingestion from processing', x: 35, y: 70 },
  { id: 'workers', label: 'Celery Workers', icon: 'mdi:cog', type: 'Compute', status: 'healthy', metrics: { active: '24', idle: '6' }, desc: 'Auto-scaling workers for document processing', x: 60, y: 50 },
  { id: 's3_processed', label: 'S3 (Processed)', icon: 'mdi:aws', type: 'Storage', status: 'healthy', desc: 'Stores final processed artifacts', x: 85, y: 30 },
  { id: 'db', label: 'Metadata DB', icon: 'mdi:database', type: 'Database', status: 'healthy', desc: 'Stores processing status and metadata', x: 85, y: 70 },
];

const dataProcessingEdges: DiagramEdge[] = [
  { source: 'api', target: 's3_raw', animated: true },
  { source: 'api', target: 'sqs', animated: true },
  { source: 'sqs', target: 'workers', animated: true },
  { source: 'workers', target: 's3_raw', animated: false },
  { source: 'workers', target: 's3_processed', animated: true },
  { source: 'workers', target: 'db', animated: true },
];

export const ArchitecturePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'data'>('global');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-nord-3/40 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-nord-6 flex items-center gap-3 tracking-tight">
            <Icon icon="mdi:sitemap" className="text-nord-8 w-8 h-8" />
            System Architecture
          </h1>
          <p className="text-nord-4/80 mt-2 max-w-2xl text-sm leading-relaxed">
            High-level overview of production topologies, data flows, and component status.
            Select a diagram to explore the infrastructure.
          </p>
        </div>
      </div>

      <div className="flex border-b border-nord-3/40">
        <button 
          onClick={() => setActiveTab('global')}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-200 border-b-2 ${activeTab === 'global' ? 'border-nord-8 text-nord-8 bg-nord-8/5' : 'border-transparent text-nord-4 hover:text-nord-6 hover:bg-nord-2/50'}`}
        >
          <Icon icon="mdi:earth" className="inline-block mr-2 w-4 h-4" />
          Global Web Stack
        </button>
        <button 
          onClick={() => setActiveTab('data')}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-wider transition-colors duration-200 border-b-2 ${activeTab === 'data' ? 'border-nord-8 text-nord-8 bg-nord-8/5' : 'border-transparent text-nord-4 hover:text-nord-6 hover:bg-nord-2/50'}`}
        >
          <Icon icon="mdi:file-document-multiple-outline" className="inline-block mr-2 w-4 h-4" />
          Async Document Pipeline
        </button>
      </div>

      <div className="pt-4">
        {activeTab === 'global' && (
          <InteractiveDiagram 
            title="AWS Web Architecture"
            description="Multi-AZ highly available web stack deployed via Terraform."
            nodes={globalArchNodes} 
            edges={globalArchEdges} 
          />
        )}
        
        {activeTab === 'data' && (
          <InteractiveDiagram 
            title="Async Processing Pipeline"
            description="Scalable event-driven architecture for processing 50K+ documents."
            nodes={dataProcessingNodes} 
            edges={dataProcessingEdges} 
          />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="panel p-5">
          <h3 className="text-nord-8 font-mono text-sm font-bold uppercase mb-3 flex items-center gap-2">
            <Icon icon="mdi:server-network" />
            High Availability
          </h3>
          <p className="text-nord-4/80 text-sm leading-relaxed">
            Multi-AZ deployment strategy across primary AWS regions. 
            Auto-scaling groups configured for dynamic load balancing during traffic spikes.
          </p>
        </div>
        <div className="panel p-5">
          <h3 className="text-nord-14 font-mono text-sm font-bold uppercase mb-3 flex items-center gap-2">
            <Icon icon="mdi:shield-check" />
            Security Posture
          </h3>
          <p className="text-nord-4/80 text-sm leading-relaxed">
            VPC isolation with private subnets for compute/db layers. 
            AWS WAF rules updated regularly, and end-to-end TLS encryption enforced.
          </p>
        </div>
        <div className="panel p-5">
          <h3 className="text-terminal-amber font-mono text-sm font-bold uppercase mb-3 flex items-center gap-2">
            <Icon icon="mdi:database-refresh" />
            Disaster Recovery
          </h3>
          <p className="text-nord-4/80 text-sm leading-relaxed">
            Automated RDS snapshots hourly. Cross-region S3 replication for critical assets. 
            Demonstrated RTO &lt; 1h and RPO &lt; 5m.
          </p>
        </div>
      </div>
    </div>
  );
};
