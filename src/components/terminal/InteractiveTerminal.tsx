import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Terminal, Maximize2, Minimize2, X, Search } from 'lucide-react';
import { useTerminalStore } from '../../store/useTerminalStore';

interface InteractiveTerminalProps {
  onSwitchToPalette: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ onSwitchToPalette }) => {
  const { 
    isOpen, 
    isFullScreen, 
    lines, 
    commandHistory, 
    setOpen, 
    toggleFullScreen, 
    executeCommand 
  } = useTerminalStore();

  const [inputVal, setInputVal] = useState('');
  const [localHistoryIdx, setLocalHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const commandsList = [
    'help', 'clear', 'exit', 'neofetch', 'skills', 
    'projects', 'experience', 'contact', 'metrics', 'github', 'goto'
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.95, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = inputVal.trim();
      if (cmd) {
        executeCommand(cmd, navigate);
        setInputVal('');
        setLocalHistoryIdx(-1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = localHistoryIdx === -1 ? commandHistory.length - 1 : Math.max(0, localHistoryIdx - 1);
      setLocalHistoryIdx(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || localHistoryIdx === -1) return;
      const nextIdx = localHistoryIdx + 1;
      if (nextIdx >= commandHistory.length) {
        setLocalHistoryIdx(-1);
        setInputVal('');
      } else {
        setLocalHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = inputVal.toLowerCase();
      if (!currentInput) return;
      
      const match = commandsList.find(cmd => cmd.startsWith(currentInput));
      if (match) {
        setInputVal(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-nord-0/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Terminal Container */}
      <div 
        ref={containerRef}
        className={`relative w-full transition-all duration-300 bg-nord-1 border border-nord-3 rounded-lg shadow-2xl flex flex-col overflow-hidden font-mono ${
          isFullScreen ? 'max-w-4xl h-[80vh]' : 'max-w-xl h-[50vh]'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-nord-3 bg-nord-0/50 flex-shrink-0">
          <div className="flex items-center gap-2 text-nord-8 text-xs font-semibold">
            <Terminal size={14} className="text-nord-8 animate-pulse" />
            <span>admin@platform-ops:~ (bash)</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleFullScreen}
              className="p-1 rounded hover:bg-nord-2 text-nord-4 hover:text-nord-6 transition-colors"
              title={isFullScreen ? 'Minimize window' : 'Maximize window'}
            >
              {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button 
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-nord-11/20 text-nord-4 hover:text-nord-11 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Terminal Screen lines */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-1.5 text-sm leading-relaxed scrollbar-hide bg-nord-0/20"
        >
          {lines.map((line) => (
            <div key={line.id} className="whitespace-pre-wrap">
              {line.type === 'input' && (
                <div className="flex items-start">
                  <span className="text-nord-8 mr-2 select-none">$</span>
                  <span className="text-nord-6">{line.text}</span>
                </div>
              )}
              {line.type === 'output' && <div className="text-nord-4">{line.text}</div>}
              {line.type === 'success' && <div className="text-terminal-green">{line.text}</div>}
              {line.type === 'error' && <div className="text-terminal-red font-semibold">{line.text}</div>}
              {line.type === 'system' && <div className="text-nord-4/60 italic">{line.text}</div>}
              {line.type === 'header' && <div className="text-nord-6 font-bold">{line.text}</div>}
            </div>
          ))}

          {/* Input prompt line */}
          <div className="flex items-center pt-1">
            <span className="text-nord-8 mr-2 select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-nord-6 p-0 font-mono text-sm"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-label="Terminal command prompt"
            />
          </div>
        </div>

        {/* Footer shortcuts & helper info */}
        <div className="px-4 py-2 bg-nord-0/50 border-t border-nord-3 flex items-center justify-between text-xs font-mono text-nord-4/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="bg-nord-2 px-1 rounded border border-nord-3">↑↓</kbd> history</span>
            <span className="flex items-center gap-1"><kbd className="bg-nord-2 px-1 rounded border border-nord-3">Tab</kbd> complete</span>
          </div>
          
          <button 
            onClick={onSwitchToPalette}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-nord-3/50 hover:border-nord-8/50 hover:bg-nord-2 text-nord-4 hover:text-nord-8 transition-all"
          >
            <Search size={12} />
            <span>Search Palette</span>
          </button>
        </div>
      </div>
    </div>
  );
};
