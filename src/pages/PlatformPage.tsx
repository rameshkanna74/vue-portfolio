import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { SEO } from '../components/ui/SEO';

export const PlatformPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modules' | 'gitops'>('modules');

  const goldenPathSteps = [
    {
      id: '01',
      title: 'Service Bootstrap',
      desc: 'Developer initializes template repository via Backstage Service Catalog.',
      icon: 'mdi:application-cog-outline',
      color: 'text-nord-8 border-nord-8/20 bg-nord-8/5'
    },
    {
      id: '02',
      title: 'IaC Provisioning',
      desc: 'Terraform automatically provisions AWS VPC, IAM roles, and RDS databases.',
      icon: 'mdi:terraform',
      color: 'text-nord-15 border-nord-15/20 bg-nord-15/5'
    },
    {
      id: '03',
      title: 'CI/CD Pipelines',
      desc: 'GitHub Actions builds Docker container, runs tests, and pushes to Amazon ECR.',
      icon: 'mdi:github',
      color: 'text-nord-10 border-nord-10/20 bg-nord-10/5'
    },
    {
      id: '04',
      title: 'GitOps Deployment',
      desc: 'ArgoCD syncs drift automatically, deploying the container pod to EKS cluster.',
      icon: 'mdi:sync',
      color: 'text-terminal-green border-terminal-green/20 bg-terminal-green/5'
    }
  ];

  const reusableModules = [
    {
      name: 'terraform-aws-vpc-module',
      category: 'Infrastructure',
      description: 'Standardized VPC module enforcing public/private subnet isolation, NAT gateways, and flow logs enablement.',
      stats: { version: 'v3.2.1', rating: '98%' },
      icon: 'mdi:network-outline'
    },
    {
      name: 'terraform-aws-eks-blueprint',
      category: 'Compute',
      description: 'Pre-configured EKS node group template featuring AWS VPC CNI, EBS CSI driver, and CoreDNS auto-scaling.',
      stats: { version: 'v1.4.0', rating: '95%' },
      icon: 'devicon:kubernetes'
    },
    {
      name: 'github-actions-python-ci',
      category: 'Pipelines',
      description: 'Reusable GitHub Action CI workflow integrating flake8 linting, pytest suits, and Snyk security container scan.',
      stats: { version: 'v2.1.0', rating: '99%' },
      icon: 'mdi:github'
    },
    {
      name: 'fastapi-docker-multistage',
      category: 'Containers',
      description: 'Highly optimized Python FastAPI Dockerfile utilizing distroless non-root images to minimize footprint and attack surface.',
      stats: { version: 'v1.1.2', rating: '97%' },
      icon: 'devicon:docker'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <SEO 
        title="Platform Engineering" 
        description="Golden paths, developer self-service automation, GitOps workflows, and reusable infrastructure blueprints."
      />

      {/* Header */}
      <div className="border-b border-nord-3/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nord-6 flex items-center gap-3 tracking-tight">
            <Icon icon="mdi:server-security" className="text-nord-7 w-8 h-8" />
            Platform Engineering Portal
          </h1>
          <p className="text-nord-4/80 mt-2 max-w-2xl text-sm leading-relaxed">
            Reducing cognitive load for developers through self-service infrastructure automation and standard golden paths.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-nord-8/30 bg-nord-8/10 text-nord-8 text-xs font-mono">
          <span>Target EKS: k8s-prod-ap-south-1</span>
        </div>
      </div>

      {/* Section 1: Golden Path Workflow */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-nord-6 flex items-center gap-2 font-mono uppercase border-b border-nord-3/40 pb-4">
          <Icon icon="mdi:road" className="text-nord-8 w-6 h-6" />
          The Developer Golden Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goldenPathSteps.map((step, idx) => (
            <div key={idx} className="panel p-5 relative flex flex-col justify-between hover:border-nord-8/20 transition-all duration-300 group">
              <div className="absolute top-4 right-4 text-xs font-bold font-mono text-nord-4/30 group-hover:text-nord-8/40 transition-colors">
                #{step.id}
              </div>
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${step.color.split(' ')[0]} ${step.color.split(' ')[1]} ${step.color.split(' ')[2]}`}>
                  <Icon icon={step.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-nord-6 font-mono">{step.title}</h3>
                <p className="text-xs text-nord-4 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Tabs */}
      <div className="border-b border-nord-3/40 flex items-center gap-4">
        <button
          onClick={() => setActiveTab('modules')}
          className={`pb-3 text-sm font-mono font-bold transition-all border-b-2 ${
            activeTab === 'modules' ? 'border-nord-8 text-nord-8' : 'border-transparent text-nord-4 hover:text-nord-6'
          }`}
        >
          Reusable Blueprints
        </button>
        <button
          onClick={() => setActiveTab('gitops')}
          className={`pb-3 text-sm font-mono font-bold transition-all border-b-2 ${
            activeTab === 'gitops' ? 'border-nord-8 text-nord-8' : 'border-transparent text-nord-4 hover:text-nord-6'
          }`}
        >
          GitOps Engine Sync Status
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'modules' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {reusableModules.map((mod, idx) => (
            <div key={idx} className="panel p-5 hover:border-nord-8/20 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon icon={mod.icon} className="w-5 h-5 text-nord-8" />
                    <span className="text-xs font-mono font-bold text-nord-6">{mod.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-nord-3/30 border border-nord-3/50 text-[10px] font-mono text-nord-4">
                    {mod.category}
                  </span>
                </div>
                <p className="text-xs text-nord-4 leading-relaxed">
                  {mod.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-nord-3/20 text-[10px] font-mono text-nord-4/60">
                <span>Release: {mod.stats.version}</span>
                <span className="text-terminal-green">Approval Index: {mod.stats.rating}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel p-6 animate-fade-in space-y-6">
          {/* ArgoCD Style Visualizer */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-nord-3/40 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-nord-0 flex items-center justify-center text-nord-8 border border-nord-3">
                <Icon icon="mdi:sync" className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-nord-6 font-mono">production-core-api</h3>
                <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                  <span className="text-nord-4">Repo:</span>
                  <a href="https://github.com/rameshkanna788/react-portfolio" className="text-nord-8 hover:underline">ops-gitops-repo</a>
                  <span className="text-nord-4">| Target:</span>
                  <span className="text-nord-6">eks-production</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="badge badge-success px-3 py-1 text-xs flex items-center gap-1.5">
                <Icon icon="mdi:check-decagram" />
                Synced
              </span>
              <span className="badge badge-success px-3 py-1 text-xs flex items-center gap-1.5 bg-terminal-green/10 text-terminal-green border-terminal-green/30">
                <Icon icon="mdi:heart-pulse" />
                Healthy
              </span>
            </div>
          </div>

          {/* Sync Tree visualization */}
          <div className="p-4 bg-nord-0/40 border border-nord-3/50 rounded-lg font-mono text-xs overflow-x-auto">
            <div className="min-w-[500px] space-y-4 py-2">
              <div className="flex items-center gap-2 text-nord-6 font-bold">
                <Icon icon="mdi:application-parent" className="text-nord-8" />
                <span>Application: production-core-api</span>
              </div>
              <div className="pl-6 border-l border-nord-3/50 space-y-3">
                {/* Node level 1 */}
                <div className="flex items-center gap-2 text-nord-5">
                  <Icon icon="mdi:graph-outline" className="text-nord-4" />
                  <span>Service: core-api-service</span>
                  <span className="text-[10px] text-terminal-green">(Synced / Healthy)</span>
                </div>
                <div className="flex items-center gap-2 text-nord-5">
                  <Icon icon="mdi:layers-outline" className="text-nord-4" />
                  <span>Deployment: core-api-deployment</span>
                  <span className="text-[10px] text-terminal-green">(Synced / Healthy)</span>
                </div>
                {/* Node level 2 (child of Deployment) */}
                <div className="pl-6 border-l border-nord-3/50 space-y-2">
                  <div className="flex items-center gap-2 text-nord-4">
                    <Icon icon="mdi:cube-outline" className="text-nord-10" />
                    <span>ReplicaSet: core-api-deployment-7fbf49547d</span>
                    <span className="text-[10px] text-terminal-green">(Healthy)</span>
                  </div>
                  {/* Node level 3 (child of ReplicaSet) */}
                  <div className="pl-6 border-l border-nord-3/50 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-nord-4/80">
                      <Icon icon="mdi:pod" className="text-nord-8" />
                      <span>Pod: core-api-deployment-7fbf49547d-q7rm9</span>
                      <span className="text-[10px] text-terminal-green">(Running)</span>
                    </div>
                    <div className="flex items-center gap-2 text-nord-4/80">
                      <Icon icon="mdi:pod" className="text-nord-8" />
                      <span>Pod: core-api-deployment-7fbf49547d-zxs2b</span>
                      <span className="text-[10px] text-terminal-green">(Running)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
