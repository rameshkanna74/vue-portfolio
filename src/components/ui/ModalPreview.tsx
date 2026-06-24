import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import type { Project } from '../../types/portfolio';

interface ModalPreviewProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalPreview: React.FC<ModalPreviewProps> = ({ project, isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nord-0/90 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="terminal-window max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="terminal-controls">
              <div
                className="terminal-control terminal-control-close cursor-pointer hover:scale-125"
                onClick={onClose}
              />
              <div className="terminal-control terminal-control-minimize" />
              <div className="terminal-control terminal-control-maximize" />
            </div>
            <span className="terminal-title">{project.title}</span>
          </div>
        </div>
        
        <div className="terminal-content overflow-y-auto max-h-[calc(90vh-60px)] scrollbar-hide p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <h2 className="text-3xl font-bold text-nord-6">{project.title}</h2>
              <span className="text-sm text-nord-3 font-mono bg-nord-2 px-3 py-1 rounded">
                {project.year}
              </span>
            </div>
            
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-nord-8 mb-2">Overview</h3>
              <p className="text-nord-4 leading-relaxed">{project.longDescription}</p>
            </div>
            
            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-nord-8 mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-nord-4 flex gap-3">
                      <span className="text-nord-8 flex-shrink-0 mt-1">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-nord-8 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="badge badge-tech">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Links */}
            {project.links && (
              <div className="flex gap-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-nord-8 hover:text-nord-10 transition-colors"
                  >
                    <Icon icon="mdi:github" className="w-5 h-5" />
                    <span className="font-mono text-sm">View on GitHub</span>
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-nord-8 hover:text-nord-10 transition-colors"
                  >
                    <Icon icon="mdi:open-in-new" className="w-5 h-5" />
                    <span className="font-mono text-sm">Live Demo</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
