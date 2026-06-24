import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { HelmetProvider } from 'react-helmet-async';

import { CommandCenterLayout } from './components/layout/CommandCenterLayout';

// Pages
const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const SkillsPage = React.lazy(() => import('./pages/SkillsPage').then(module => ({ default: module.SkillsPage })));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ExperiencePage = React.lazy(() => import('./pages/ExperiencePage').then(module => ({ default: module.ExperiencePage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const ArchitecturePage = React.lazy(() => import('./pages/ArchitecturePage').then(module => ({ default: module.ArchitecturePage })));
const IncidentPage = React.lazy(() => import('./pages/IncidentPage').then(module => ({ default: module.IncidentPage })));
const PlatformPage = React.lazy(() => import('./pages/PlatformPage').then(module => ({ default: module.PlatformPage })));

import { CommandPalette } from './components/ui/CommandPalette';

export const App = () => {

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <CommandPalette />
        <CommandCenterLayout>
          <Suspense fallback={<div className="flex h-full w-full items-center justify-center font-mono text-nord-8">Initializing Platform.OS...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/incidents" element={<IncidentPage />} />
              <Route path="/platform" element={<PlatformPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<Navigate to="/experience" replace />} />
            </Routes>
          </Suspense>
        </CommandCenterLayout>
      </Router>
    </HelmetProvider>
  );
}

export default App;

