import { create } from 'zustand';
import { profile, skills, projects, experience } from '../data/resume';

export interface TerminalLine {
  id: number;
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'header';
}

interface TerminalState {
  isOpen: boolean;
  isFullScreen: boolean;
  commandHistory: string[];
  historyIndex: number;
  lines: TerminalLine[];
  lineIdCounter: number;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  toggleFullScreen: () => void;
  clear: () => void;
  executeCommand: (rawCmd: string, navigate: (path: string) => void) => void;
}

export const useTerminalStore = create<TerminalState>((set, get) => {
  const welcomeLines: TerminalLine[] = [
    { id: 1, text: 'PLATFORM.OS [Version 1.0.0]', type: 'header' },
    { id: 2, text: '(c) 2026 Ramesh Kanna. All rights reserved.', type: 'system' },
    { id: 3, text: 'Type "help" for a list of available commands.', type: 'output' },
    { id: 4, text: '', type: 'output' },
  ];

  return {
    isOpen: false,
    isFullScreen: false,
    commandHistory: [],
    historyIndex: -1,
    lines: welcomeLines,
    lineIdCounter: 5,

    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: (open) => set({ isOpen: open }),
    toggleFullScreen: () => set((state) => ({ isFullScreen: !state.isFullScreen })),
    clear: () => set({ lines: [] }),

    executeCommand: (rawCmd: string, navigate: (path: string) => void) => {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;

      const cmdId = get().lineIdCounter;
      const inputLine: TerminalLine = {
        id: cmdId,
        text: trimmed,
        type: 'input',
      };

      const parts = trimmed.split(' ');
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      let output: TerminalLine[] = [];
      const nextId = (offset: number) => cmdId + 1 + offset;

      switch (command) {
        case 'help':
          output = [
            { id: nextId(0), text: 'Available commands:', type: 'system' },
            { id: nextId(1), text: '  help          - Display this help menu', type: 'output' },
            { id: nextId(2), text: '  neofetch      - Display system information', type: 'output' },
            { id: nextId(3), text: '  skills        - List technology stack and proficiency', type: 'output' },
            { id: nextId(4), text: '  projects      - Show deployed infrastructure projects', type: 'output' },
            { id: nextId(5), text: '  experience    - Print professional logs & commit history', type: 'output' },
            { id: nextId(6), text: '  contact       - Display communication protocol link', type: 'output' },
            { id: nextId(7), text: '  metrics       - Print real-time DORA & system metrics', type: 'output' },
            { id: nextId(8), text: '  github        - Show engineering activity metrics', type: 'output' },
            { id: nextId(9), text: '  goto <page>   - Navigate to: dashboard | skills | projects | experience | incidents | platform | contact', type: 'output' },
            { id: nextId(10), text: '  clear         - Clear terminal screen', type: 'output' },
            { id: nextId(11), text: '  exit          - Close interactive terminal modal', type: 'output' },
          ];
          break;

        case 'clear':
          // Handled separately below, but resets terminal lines
          break;

        case 'exit':
        case 'close':
          setTimeout(() => set({ isOpen: false }), 200);
          output = [{ id: nextId(0), text: 'Terminating terminal session...', type: 'system' }];
          break;

        case 'neofetch':
          output = [
            {
              id: nextId(0),
              text: `   _  __                     ___  ____
  / |/ /__ ___  ___ ___ ____/ _ \\/ __/
 /    / -_) _ \\/ -_(_-</___/ // /\\ \\  
/_/|_/\\__/_//_/\\__/___/    \\___/___/  
`,
              type: 'success'
            },
            { id: nextId(1), text: '----------------------------------------', type: 'system' },
            { id: nextId(2), text: 'OS: Platform.OS v1.0.0 (Ubuntu LTS Kernel emulation)', type: 'output' },
            { id: nextId(3), text: 'Kernel: x86_64 Linux 5.15.0-generic', type: 'output' },
            { id: nextId(4), text: 'Uptime: 342 days, 4 hours, 12 mins', type: 'output' },
            { id: nextId(5), text: 'Shell: custom-bash-v4', type: 'output' },
            { id: nextId(6), text: 'CPU: AMD EPYC (2 vCPUs @ 2.4GHz)', type: 'output' },
            { id: nextId(7), text: 'Memory: 1042MB / 2048MB (50.8%)', type: 'output' },
            { id: nextId(8), text: '', type: 'output' },
            { id: nextId(9), text: `Engineer: ${profile.name}`, type: 'success' },
            { id: nextId(10), text: `Role: ${profile.title}`, type: 'output' },
            { id: nextId(11), text: `Location: ${profile.location}`, type: 'output' },
            { id: nextId(12), text: `Languages: Tamil (Native), English (Proficient), Japanese (Conversational)`, type: 'output' },
            { id: nextId(13), text: '----------------------------------------', type: 'system' },
          ];
          break;

        case 'skills': {
          const list = skills.map((s, idx) => {
            const barLength = Math.round(s.level / 10);
            const bar = '='.repeat(barLength) + ' '.repeat(10 - barLength);
            const namePadding = s.name.padEnd(38, ' ');
            return {
              id: nextId(idx + 1),
              text: `${namePadding} [${bar}] ${s.level}%`,
              type: 'output' as const
            };
          });
          output = [
            { id: nextId(0), text: 'TECHNOLOGY STACK & CONFICIENCY MATRIX:', type: 'success' },
            { id: nextId(0.5), text: '--------------------------------------------------------------', type: 'system' },
            ...list,
            { id: nextId(list.length + 1), text: '--------------------------------------------------------------', type: 'system' },
          ];
          break;
        }

        case 'projects': {
          const list: TerminalLine[] = [];
          projects.forEach((p, idx) => {
            list.push({ id: nextId(idx * 4 + 1), text: `${idx + 1}. ${p.title} (${p.year})`, type: 'success' });
            list.push({ id: nextId(idx * 4 + 2), text: `   - Tech: ${p.tech.join(', ')}`, type: 'output' });
            list.push({ id: nextId(idx * 4 + 3), text: `   - Impact: ${p.highlights.join('; ')}`, type: 'output' });
            list.push({ id: nextId(idx * 4 + 4), text: '', type: 'output' });
          });
          output = [
            { id: nextId(0), text: 'DEPLOYED PRODUCTION SYSTEMS:', type: 'success' },
            { id: nextId(0.5), text: '--------------------------------------------------------------', type: 'system' },
            ...list,
          ];
          break;
        }

        case 'experience': {
          const list: TerminalLine[] = [];
          experience.forEach((e, idx) => {
            list.push({ id: nextId(idx * 4 + 1), text: `* ${e.position} @ ${e.company} (${e.startDate} to ${e.endDate})`, type: 'success' });
            e.achievements.slice(0, 2).forEach((ach, aIdx) => {
              list.push({ id: nextId(idx * 4 + 2 + aIdx), text: `  - ${ach}`, type: 'output' });
            });
            list.push({ id: nextId(idx * 4 + 4), text: '', type: 'output' });
          });
          output = [
            { id: nextId(0), text: 'PROFESSIONAL COMMIT LOGS:', type: 'success' },
            { id: nextId(0.5), text: '--------------------------------------------------------------', type: 'system' },
            ...list,
          ];
          break;
        }

        case 'contact':
          output = [
            { id: nextId(0), text: 'COMMUNICATION PROTOCOLS:', type: 'success' },
            { id: nextId(1), text: `  Email:    ${profile.email}`, type: 'output' },
            { id: nextId(2), text: `  LinkedIn: ${profile.links.linkedin}`, type: 'output' },
            { id: nextId(3), text: `  GitHub:   ${profile.links.github}`, type: 'output' },
            { id: nextId(4), text: `  LeetCode: ${profile.links.leetcode}`, type: 'output' },
            { id: nextId(5), text: '', type: 'output' },
            { id: nextId(6), text: 'Type "goto contact" to load form UI.', type: 'system' },
          ];
          break;

        case 'metrics':
          output = [
            { id: nextId(0), text: 'DORA METRICS STATUS:', type: 'success' },
            { id: nextId(1), text: '  Deployment Frequency:  Daily (Performance: Elite)', type: 'output' },
            { id: nextId(2), text: '  Lead Time for Changes: <1 Hour (Performance: Elite)', type: 'output' },
            { id: nextId(3), text: '  Mean Time to Recovery: <45 mins (Performance: High)', type: 'output' },
            { id: nextId(4), text: '  Change Failure Rate:   <5% (Performance: Elite)', type: 'output' },
            { id: nextId(5), text: '', type: 'output' },
            { id: nextId(6), text: 'SYSTEM TELEMETRY SUMMARY:', type: 'success' },
            { id: nextId(7), text: '  AWS ECS Clusters: Operational (99.99% Availability)', type: 'output' },
            { id: nextId(8), text: '  Avg API Latency:  84ms', type: 'output' },
            { id: nextId(9), text: '  CPU Load avg:     12.4%', type: 'output' },
          ];
          break;

        case 'github':
          output = [
            { id: nextId(0), text: 'ENGINEERING INTEL (GITHUB INTEGRATION):', type: 'success' },
            { id: nextId(1), text: `  API Username:       rameshkanna74`, type: 'output' },
            { id: nextId(2), text: '  Connection state:   Active/Verified', type: 'output' },
            { id: nextId(3), text: '  Contribution Score: 874 commits (last 12 months)', type: 'output' },
            { id: nextId(4), text: '  PR Acceptance rate: 98.4%', type: 'output' },
            { id: nextId(5), text: '  Security Alerts:    0 Critical, 0 High', type: 'output' },
          ];
          break;

        case 'goto': {
          const target = args[0]?.toLowerCase();
          if (!target) {
            output = [{ id: nextId(0), text: 'Usage: goto <dashboard | skills | projects | experience | incidents | platform | contact>', type: 'error' }];
          } else {
            const routesMap: Record<string, string> = {
              dashboard: '/dashboard',
              skills: '/skills',
              projects: '/projects',
              experience: '/experience',
              incidents: '/incidents',
              platform: '/platform',
              contact: '/contact',
              home: '/',
            };

            const route = routesMap[target];
            if (route) {
              setTimeout(() => {
                navigate(route);
                set({ isOpen: false });
              }, 300);
              output = [{ id: nextId(0), text: `Navigating to ${target}...`, type: 'success' }];
            } else {
              output = [{ id: nextId(0), text: `Unknown route: "${target}". Available routes: dashboard, skills, projects, experience, incidents, platform, contact`, type: 'error' }];
            }
          }
          break;
        }

        default:
          output = [
            { id: nextId(0), text: `Command not found: "${command}".`, type: 'error' },
            { id: nextId(1), text: 'Type "help" to display valid system operations.', type: 'system' },
          ];
          break;
      }

      set((state) => {
        const updatedHistory = [...state.commandHistory, trimmed];
        const nextLines = command === 'clear' 
          ? [] 
          : [...state.lines, inputLine, ...output];
        return {
          commandHistory: updatedHistory,
          historyIndex: updatedHistory.length,
          lines: nextLines,
          lineIdCounter: nextLines.length > 0 ? nextLines[nextLines.length - 1].id + 1 : 1,
        };
      });
    },
  };
});
