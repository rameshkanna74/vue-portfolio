import React from 'react';
import { Icon } from '@iconify/react';
// import { useAnalytics } from '../../hooks/useAnalytics';

export const ResumeDownload: React.FC = () => {
  // const { trackEvent } = useAnalytics();
  const trackEvent = (name: string) => console.log('trackEvent', name);

  const downloadResume = () => {
    trackEvent('resume_download');
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Ramesh_Kanna_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadResume}
      className="group inline-flex items-center gap-2 px-6 py-3 bg-nord-8 text-nord-0 rounded-lg transition-all duration-300 hover:bg-nord-9 hover:shadow-glow-md hover:-translate-y-0.5 font-mono text-sm"
    >
      <Icon icon="mdi:file-download" className="w-5 h-5" />
      <span>Download Resume</span>
      <Icon icon="mdi:arrow-down" className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
    </button>
  );
};
