import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Terminal, Box, Database, Briefcase, FileText, X, Command } from 'lucide-react';
import { useTerminalStore } from '../../store/useTerminalStore';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';

interface CommandItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  shortcut: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const terminalOpen = useTerminalStore((state) => state.isOpen);
  const setTerminalOpen = useTerminalStore((state) => state.setOpen);

  const commands: CommandItem[] = [
    { id: 'home', name: 'Go to Home / System Status', icon: <Terminal size={18} className="text-nord-8"/>, shortcut: 'G H', action: () => navigate('/') },
    { id: 'dashboard', name: 'View Grafana Metrics Dashboard', icon: <Box size={18} className="text-nord-14"/>, shortcut: 'G D', action: () => navigate('/dashboard') },
    { id: 'skills', name: 'View Tech Stack / Matrix', icon: <Terminal size={18} className="text-terminal-green"/>, shortcut: 'G S', action: () => navigate('/skills') },
    { id: 'architecture', name: 'View System Architecture', icon: <Database size={18} className="text-nord-13"/>, shortcut: 'G A', action: () => navigate('/architecture') },
    { id: 'projects', name: 'View Infrastructure Projects', icon: <Box size={18} className="text-nord-14"/>, shortcut: 'G P', action: () => navigate('/projects') },
    { id: 'experience', name: 'View Commit History (Experience)', icon: <Briefcase size={18} className="text-nord-10"/>, shortcut: 'G E', action: () => navigate('/experience') },
    { id: 'incidents', name: 'View Incident Response Postmortems', icon: <FileText size={18} className="text-nord-11"/>, shortcut: 'G I', action: () => navigate('/incidents') },
    { id: 'platform', name: 'View Platform Engineering Hub', icon: <Database size={18} className="text-nord-7"/>, shortcut: 'G PL', action: () => navigate('/platform') },
    { id: 'contact', name: 'Initialize Contact Protocol', icon: <FileText size={18} className="text-nord-9"/>, shortcut: 'G C', action: () => navigate('/contact') },
    { 
      id: 'terminal-mode', 
      name: 'Switch to Interactive CLI', 
      icon: <Terminal size={18} className="text-nord-8 animate-pulse"/>, 
      shortcut: 'T M', 
      action: () => {
        setIsOpen(false);
        setTerminalOpen(true);
      } 
    },
    { id: 'resume', name: 'Download Resume PDF', icon: <FileText size={18} className="text-nord-4"/>, shortcut: 'D R', action: () => window.open('/resume.pdf', '_blank') },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase()) || 
    cmd.id.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (terminalOpen) {
          setTerminalOpen(false);
        } else {
          setIsOpen(prev => !prev);
        }
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      gsap.fromTo(paletteRef.current, 
        { opacity: 0, scale: 0.95, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    }
    if (e.key === 'Enter' && filteredCommands.length > 0) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      setIsOpen(false);
    }
  };

  const handleSwitchToTerminal = () => {
    setIsOpen(false);
    setTerminalOpen(true);
  };

  return (
    <>
      {/* Interactive Terminal Component */}
      <InteractiveTerminal onSwitchToPalette={() => {
        setTerminalOpen(false);
        setIsOpen(true);
      }} />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <div 
            className="absolute inset-0 bg-nord-0/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div 
            ref={paletteRef}
            className="relative w-full max-w-xl bg-nord-1 border border-nord-3 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-nord-3 bg-nord-0/50">
              <Command size={20} className="text-nord-4 mr-3" />
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-nord-6 font-mono text-lg placeholder:text-nord-3"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-nord-2 text-nord-4 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-nord-4 font-mono text-sm">No commands found for "{query}"</p>
                </div>
              ) : (
                <ul className="px-2">
                  {filteredCommands.map((cmd, idx) => (
                    <li key={cmd.id}>
                      <button
                        onClick={() => {
                          cmd.action();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-colors ${
                          idx === selectedIndex ? 'bg-nord-3 text-nord-6' : 'text-nord-4 hover:bg-nord-2'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {cmd.icon}
                          <span className="font-mono text-sm">{cmd.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {cmd.shortcut.split(' ').map((key, i) => (
                            <kbd key={i} className="px-1.5 py-0.5 rounded bg-nord-0 border border-nord-2 text-nord-4 font-mono text-xs">
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="px-4 py-2 bg-nord-0/50 border-t border-nord-3 flex items-center justify-between text-xs font-mono text-nord-4/60">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="bg-nord-1 px-1 rounded border border-nord-2">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-nord-1 px-1 rounded border border-nord-2">↵</kbd> execute</span>
              </div>

              <button 
                onClick={handleSwitchToTerminal}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-nord-3/50 hover:border-nord-8/50 hover:bg-nord-2 text-nord-4 hover:text-nord-8 transition-all"
              >
                <Terminal size={12} />
                <span>Interactive CLI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

