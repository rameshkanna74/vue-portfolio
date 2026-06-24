import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { HeroTerminal } from "../components/terminal/HeroTerminal";
import { SEO } from "../components/ui/SEO";

// Typewriter effect component without GSAP TextPlugin
const TypewriterTitle = () => {
  const roles = ["DevOps Engineer", "Cloud Architect", "Platform Engineer", "Site Reliability Engineer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
      if (currentText.length > 0) {
        timer = setTimeout(() => setCurrentText(c => c.slice(0, -1)), 30);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (currentText.length < currentRole.length) {
        timer = setTimeout(() => setCurrentText(currentRole.slice(0, currentText.length + 1)), 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-nord-8 to-nord-14">
      {currentText}
      <span className="animate-pulse border-r-2 border-nord-14 ml-1"></span>
    </span>
  );
};

export const HomePage: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(buttonsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(statsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(terminalContainerRef.current, {
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=1");

  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-0 relative overflow-hidden flex flex-col">
      <SEO 
        title="Command Center" 
        description="DevOps & Platform Engineering Portfolio featuring production metrics, cloud architecture, and automation pipelines."
      />
      
      {/* Background Decor */}
      <div className="absolute inset-0 grid-dots opacity-30 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-nord-8/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-nord-14/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-12 lg:py-20 z-10">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-8 items-center px-4 sm:px-6 lg:px-8">
          
          {/* Left Column: Text & CTA */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-nord-14/30 bg-nord-14/10 text-nord-14 text-xs font-mono shadow-glow-sm">
              <span className="w-2 h-2 rounded-full bg-nord-14 animate-pulse" />
              GLOBAL INFRASTRUCTURE STATUS: OPERATIONAL
            </div>

            <div className="space-y-4">
              <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-nord-6 leading-[1.1]">
                RAMESH KANNA <br/>
                <TypewriterTitle />
              </h1>
              
              <div ref={subtitleRef} className="text-base sm:text-lg text-nord-4 max-w-xl border-l-2 border-nord-8 pl-5 py-2 leading-relaxed bg-nord-8/5 rounded-r-lg">
                Automating deployments, managing cloud infrastructure on AWS, and building scalable CI/CD pipelines. Transforming manual operations into resilient code.
              </div>
            </div>

            <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-2">
              <NavLink to="/projects" className="btn-primary flex items-center gap-2 shadow-glow-sm">
                <Icon icon="mdi:server-network" className="w-5 h-5" />
                Explore Infrastructure
              </NavLink>
              <a href="/Ramesh_Kanna_DevOpsResume.docx" className="btn-secondary flex items-center gap-2">
                <Icon icon="mdi:download" className="w-5 h-5" />
                Download Resume
              </a>
              <NavLink to="/contact" className="btn-ghost flex items-center gap-2">
                <Icon icon="mdi:calendar-clock" className="w-5 h-5" />
                Book Interview &rarr;
              </NavLink>
            </div>

            {/* Live Widget Grid */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-nord-3/40">
              <div className="panel p-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-nord-6 font-mono">3+</div>
                <div className="text-xs font-mono text-nord-4/80 uppercase mt-1 flex items-center gap-1.5">
                  <Icon icon="mdi:calendar" className="text-nord-8" /> Years Exp.
                </div>
              </div>
              <div className="panel p-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-nord-6 font-mono">50K+</div>
                <div className="text-xs font-mono text-nord-4/80 uppercase mt-1 flex items-center gap-1.5">
                  <Icon icon="mdi:file-document-multiple-outline" className="text-nord-8" /> Docs Processed
                </div>
              </div>
              <div className="panel p-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-nord-6 font-mono">&lt;100ms</div>
                <div className="text-xs font-mono text-nord-4/80 uppercase mt-1 flex items-center gap-1.5">
                  <Icon icon="mdi:speedometer" className="text-nord-8" /> API Latency
                </div>
              </div>
              <div className="panel p-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-nord-6 font-mono">40%</div>
                <div className="text-xs font-mono text-nord-4/80 uppercase mt-1 flex items-center gap-1.5">
                  <Icon icon="mdi:clock-fast" className="text-terminal-green" /> Release Time ↓
                </div>
              </div>
              <div className="panel p-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-nord-6 font-mono">0</div>
                <div className="text-xs font-mono text-nord-4/80 uppercase mt-1 flex items-center gap-1.5">
                  <Icon icon="mdi:shield-check" className="text-terminal-green" /> Downtime Deploys
                </div>
              </div>
              <div className="panel p-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-nord-6 font-mono">100%</div>
                <div className="text-xs font-mono text-nord-4/80 uppercase mt-1 flex items-center gap-1.5">
                  <Icon icon="mdi:check-all" className="text-terminal-green" /> IaC Coverage
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal */}
          <div ref={terminalContainerRef} className="w-full max-w-2xl mx-auto xl:max-w-none">
            <div className="relative">
              {/* Decorative elements behind terminal */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-nord-8/30 to-nord-14/10 rounded-xl blur opacity-50" />
              <HeroTerminal />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
