import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

interface TerminalLine {
  id: number;
  text: React.ReactNode;
  type: 'command' | 'output' | 'success' | 'warn' | 'error' | 'system';
}

let globalLineId = 0;

export const HeroTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bootSequence = [
      { text: 'ssh admin@prod-bastion-01', type: 'command', delay: 400 },
      { text: 'Authentication successful. Last login: UTC 14:22:05 from 192.168.1.104', type: 'system', delay: 300 },
      { text: 'kubectl config use-context eks-production', type: 'command', delay: 800 },
      { text: 'Switched to context "eks-production".', type: 'success', delay: 200 },
      { text: 'kubectl get nodes --label-selector=node-role.kubernetes.io/worker', type: 'command', delay: 600 },
      { text: 'NAME                               STATUS   ROLES    AGE   VERSION\nip-10-0-1-23.ec2.internal          Ready    worker   342d  v1.28.2\nip-10-0-2-105.ec2.internal         Ready    worker   342d  v1.28.2\nip-10-0-3-42.ec2.internal          Ready    worker   342d  v1.28.2', type: 'output', delay: 500 },
      { text: 'ansible-playbook -i inventory/prod deploy.yml', type: 'command', delay: 1000 },
      { text: 'PLAY [Update production services] **********************************************\nTASK [Gathering Facts] *********************************************************\nok: [worker-01]\nok: [worker-02]', type: 'output', delay: 800 },
      { text: 'PLAY RECAP *********************************************************************\nworker-01                  : ok=5    changed=1    unreachable=0    failed=0\nworker-02                  : ok=5    changed=1    unreachable=0    failed=0', type: 'success', delay: 400 },
      { text: 'argocd app sync production-core', type: 'command', delay: 1000 },
      { text: 'Application production-core has been successfully synced.\nHealth Status: Healthy\nSync Status: Synced', type: 'success', delay: 600 },
      { text: './fetch_engineer_metrics.sh --target="Ramesh Kanna"', type: 'command', delay: 1200 },
      { text: 'Loading telemetry data from resume.ts...', type: 'system', delay: 400 },
      { 
        text: (
          <div className="mt-2 p-4 border border-nord-8/30 bg-nord-8/5 rounded-lg shadow-inner-glow">
            <div className="text-nord-8 font-bold font-mono tracking-wider mb-3">--- DEVOPS ENGINEER PROFILE ---</div>
            <div className="grid grid-cols-[120px_1fr] gap-y-2 text-sm font-mono">
              <span className="text-nord-4">Status:</span><span className="text-terminal-green flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse"></span> ONLINE</span>
              <span className="text-nord-4">Experience:</span><span className="text-nord-6">3+ Years (Production)</span>
              <span className="text-nord-4">Specialties:</span><span className="text-nord-6">AWS, CI/CD, Containers, Python Backend</span>
              <span className="text-nord-4">Key Tools:</span><span className="text-nord-6">Docker, Kubernetes, GitHub Actions, Terraform</span>
              <span className="text-nord-4">Certifications:</span><span className="text-nord-6">AWS CCP (In Progress), Docker DCA (Planned)</span>
              <span className="text-nord-4">Current Task:</span><span className="text-nord-6">Automating all the things.</span>
            </div>
          </div>
        ), 
        type: 'output', 
        delay: 500 
      }
    ];

    let isCancelled = false;

    const runSequence = async () => {
      for (const step of bootSequence) {
        if (isCancelled) break;
        await new Promise(r => setTimeout(r, step.delay));
        if (isCancelled) break;
        setLines(prev => [...prev, { id: ++globalLineId, text: step.text, type: step.type as any }]);
      }
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="terminal-window h-[450px] flex flex-col">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-control terminal-control-close" />
          <div className="terminal-control terminal-control-minimize" />
          <div className="terminal-control terminal-control-maximize" />
        </div>
        <div className="terminal-title flex items-center gap-2">
          <Icon icon="mdi:console" className="w-4 h-4" />
          admin@platform-ops:~
        </div>
        <div className="w-14" /> {/* Spacer for centering */}
      </div>
      
      {/* Terminal Body */}
      <div ref={terminalRef} className="terminal-content flex-1 overflow-y-auto scrollbar-hide space-y-2">
        {lines.map((line) => (
          <div key={line.id} className="leading-relaxed">
            {line.type === 'command' && (
              <div className="flex items-start">
                <span className="terminal-prompt mr-2 select-none">$</span>
                <span className="text-nord-6">{line.text}</span>
              </div>
            )}
            {line.type === 'output' && <div className="text-nord-4 whitespace-pre-wrap">{line.text}</div>}
            {line.type === 'success' && <div className="text-terminal-green whitespace-pre-wrap">{line.text}</div>}
            {line.type === 'warn' && <div className="text-terminal-amber whitespace-pre-wrap">{line.text}</div>}
            {line.type === 'error' && <div className="text-terminal-red whitespace-pre-wrap">{line.text}</div>}
            {line.type === 'system' && <div className="text-nord-4/60 italic whitespace-pre-wrap">{line.text}</div>}
          </div>
        ))}
        
        {/* Blinking Cursor */}
        <div className="flex items-center mt-1">
          <span className="terminal-prompt mr-2 select-none">$</span>
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
};
