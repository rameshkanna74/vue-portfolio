import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, LayoutDashboard, Cpu, Network, Layers, FileText, Send, Menu, X, ShieldAlert, Server } from 'lucide-react';

interface CommandCenterLayoutProps {
  children: React.ReactNode;
}

export const CommandCenterLayout: React.FC<CommandCenterLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sysTime, setSysTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setSysTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { to: '/', icon: <Terminal size={18} />, label: 'Terminal / Home' },
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/skills', icon: <Cpu size={18} />, label: 'Skills & Tech' },
    { to: '/architecture', icon: <Network size={18} />, label: 'Architecture' },
    { to: '/projects', icon: <Layers size={18} />, label: 'Projects' },
    { to: '/experience', icon: <FileText size={18} />, label: 'Experience Logs' },
    { to: '/incidents', icon: <ShieldAlert size={18} />, label: 'Incident Command' },
    { to: '/platform', icon: <Server size={18} />, label: 'Platform Hub' },
    { to: '/contact', icon: <Send size={18} />, label: 'Comm Link' },
  ];

  return (
    <div className="flex min-h-screen bg-nord-0 text-nord-5 selection:bg-nord-8 selection:text-nord-0">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 w-64 h-screen bg-nord-1 border-r border-nord-3 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col`}>
        {/* Logo / Header */}
        <div className="h-16 flex items-center px-6 border-b border-nord-3 bg-nord-2/50 justify-between flex-shrink-0">
          <div className="flex items-center gap-3 text-nord-6 font-bold tracking-wider">
            <Terminal className="text-nord-8" size={24} />
            <span>PLATFORM.OS</span>
          </div>
          <button className="md:hidden text-nord-4 hover:text-nord-6" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-xs transition-all duration-200
                ${isActive 
                  ? 'bg-nord-8/10 text-nord-8 border-l-2 border-nord-8 shadow-[inset_2px_0_10px_rgba(0,200,255,0.1)] font-bold' 
                  : 'text-nord-4 hover:bg-nord-2 hover:text-nord-6 hover:border-l-2 hover:border-nord-3 border-l-2 border-transparent'}
              `}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Status Profile */}
        <div className="p-4 border-t border-nord-3 bg-nord-2/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-nord-3 flex items-center justify-center font-bold text-nord-6 border border-nord-4/30 relative text-sm font-mono">
              RK
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-nord-14 rounded-full border-2 border-nord-1 animate-pulse"></span>
            </div>
            <div>
              <div className="text-sm font-bold text-nord-6 font-mono">Ramesh Kanna</div>
              <div className="text-xs text-nord-14 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-nord-14"></span>
                System Online
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Topbar for mobile & breadcrumbs */}
        <header className="sticky top-0 h-16 flex items-center justify-between px-4 sm:px-6 border-b border-nord-3 bg-nord-1/80 backdrop-blur z-30 flex-shrink-0">
          <button 
            className="md:hidden text-nord-4 hover:text-nord-6 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 text-xs font-mono text-nord-4 ml-auto">
            <div className="hidden sm:flex items-center gap-2 border-r border-nord-3/50 pr-4">
              <span className="text-nord-14">●</span> Env: Production
            </div>
            <div className="hidden sm:flex items-center gap-2 border-r border-nord-3/50 pr-4">
              <span className="text-nord-8">●</span> Region: ap-south-1
            </div>
            <div className="hidden md:flex items-center gap-2 border-r border-nord-3/50 pr-4">
              <span className="text-nord-4">Clock:</span>
              <span className="text-nord-6 font-semibold">{sysTime}</span>
            </div>
            <div className="flex items-center gap-2 bg-nord-2 px-3 py-1 rounded border border-nord-3 hover:border-nord-8 transition-colors cursor-pointer text-nord-6">
              <span className="text-nord-4">Cmd</span> + <span className="text-nord-4">K</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

