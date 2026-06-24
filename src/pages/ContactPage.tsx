import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { GlowButton } from '../components/ui/GlowButton';
import { SEO } from '../components/ui/SEO';

export const ContactPage: React.FC = () => {
  const { portfolioData } = usePortfolioStore();
  const profile = portfolioData.profile;
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');


  const isValid = useMemo(() => {
    return formData.name && 
           formData.email && 
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
           formData.subject && 
           formData.message.length >= 10;
  }, [formData]);

  const markTouched = (field: 'name' | 'email' | 'subject' | 'message') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const field = id.replace('contact-', '');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const trackEvent = (eventName: string, eventParams: Record<string, unknown> = {}) => {
    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: eventName,
        ...eventParams
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (!isValid) {
      if (formRef.current) {
        gsap.fromTo(formRef.current, 
          { x: -10 },
          { x: 10, duration: 0.1, repeat: 3, yoyo: true, ease: 'power1.inOut', onComplete: () => {
            gsap.set(formRef.current, { x: 0 });
          }}
        );
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      
      if (!apiUrl) {
        throw new Error('API URL not configured.');
      }
      
      const response = await fetch(`${apiUrl}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Message dispatched successfully. Connection established!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
        
        trackEvent('contact_form_submit', {
          subject: formData.subject,
          success: true
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        setStatusMessage('Backend dispatch offline. Please email directly at rameshkanna788@gmail.com');
      } else {
        setStatusMessage('Failed to dispatch message. Please use direct email channel.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      <SEO 
        title="Initialize Comm Link" 
        description="Connect with Ramesh Kanna - DevOps and Platform Engineer. Operational contact dispatch panel."
      />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-terminal-green/30 bg-terminal-green/10 text-terminal-green text-xs font-mono mb-4 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
            COMM DISPATCH STATUS: ONLINE
          </div>
          <h1 className="text-4xl font-bold text-nord-6 mb-3 tracking-tight">
            Initialize Communication Protocol
          </h1>
          <p className="text-nord-4 font-mono text-sm">
            <span className="text-terminal-green">$</span> rsync --progress client_inquiry.log ranna@platform.os
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dispatch Panel Metadata */}
          <div className="space-y-6">
            <div className="panel p-6 space-y-4">
              <h3 className="text-sm font-bold text-nord-6 font-mono uppercase tracking-wider flex items-center gap-2 border-b border-nord-3/40 pb-2">
                <Icon icon="mdi:server-network" className="text-nord-8" />
                OPERATIONAL SLA
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-nord-0/50 p-3 rounded border border-nord-3/30">
                  <div className="text-nord-4/60">Response SLA</div>
                  <div className="text-sm font-bold text-terminal-green mt-1">&lt; 24 Hours</div>
                </div>
                <div className="bg-nord-0/50 p-3 rounded border border-nord-3/30">
                  <div className="text-nord-4/60">Location / Time</div>
                  <div className="text-sm font-bold text-nord-6 mt-1 truncate">Asia/Kolkata (IST)</div>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono pt-2">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-colors p-2 rounded hover:bg-nord-2/50">
                  <Icon icon="mdi:email" className="w-4 h-4 text-nord-8" />
                  <span>{profile.email}</span>
                </a>
                
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-colors p-2 rounded hover:bg-nord-2/50">
                  <Icon icon="mdi:phone" className="w-4 h-4 text-nord-8" />
                  <span>{profile.phone}</span>
                </a>
              </div>
            </div>

            <div className="panel p-6 space-y-4">
              <h3 className="text-sm font-bold text-nord-6 font-mono uppercase tracking-wider flex items-center gap-2 border-b border-nord-3/40 pb-2">
                <Icon icon="mdi:link-variant" className="text-nord-10" />
                TELEMETRY LINKS
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a 
                  href={profile.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded bg-nord-0/50 border border-nord-3/30 hover:border-nord-8/50 hover:bg-nord-2 transition-all text-nord-4 hover:text-nord-6"
                >
                  <Icon icon="mdi:github" className="w-4 h-4 text-nord-8" />
                  <span>GitHub</span>
                </a>
                <a 
                  href={profile.links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded bg-nord-0/50 border border-nord-3/30 hover:border-nord-8/50 hover:bg-nord-2 transition-all text-nord-4 hover:text-nord-6"
                >
                  <Icon icon="mdi:linkedin" className="w-4 h-4 text-nord-8" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="panel p-5 relative overflow-hidden bg-nord-8/5 border-nord-8/20">
              <div className="relative z-10 space-y-2">
                <h3 className="text-sm font-bold text-nord-6 font-mono uppercase tracking-wider flex items-center gap-2">
                  <Icon icon="mdi:calendar-check" className="text-nord-8" />
                  Availability Status
                </h3>
                <p className="text-xs text-nord-4 leading-relaxed">
                  Open to DevOps, Site Reliability, and Platform Engineering roles. Available immediately for container pipeline automation contracts.
                </p>
              </div>
            </div>
          </div>
          
          {/* Dispatch Panel Form */}
          <div className="panel p-6 space-y-5">
            <h3 className="text-sm font-bold text-nord-6 font-mono uppercase tracking-wider flex items-center gap-2 border-b border-nord-3/40 pb-2">
              <Icon icon="mdi:message-text" className="text-nord-8" />
              DISPATCH CHANNEL
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" aria-label="Dispatch channel contact form">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-nord-4 mb-1.5">
                  Sender Name *
                </label>
                <input
                  id="contact-name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => markTouched('name')}
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-nord-0/50 border border-nord-3/50 rounded text-sm font-mono text-nord-6 focus:outline-none focus:border-nord-8 transition-colors"
                  placeholder="e.g. Administrator"
                />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-nord-4 mb-1.5">
                  Sender Endpoint (Email) *
                </label>
                <input
                  id="contact-email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => markTouched('email')}
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-nord-0/50 border border-nord-3/50 rounded text-sm font-mono text-nord-6 focus:outline-none focus:border-nord-8 transition-colors"
                  placeholder="name@endpoint.com"
                />
              </div>
              
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono text-nord-4 mb-1.5">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={() => markTouched('subject')}
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-nord-0/50 border border-nord-3/50 rounded text-sm font-mono text-nord-6 focus:outline-none focus:border-nord-8 transition-colors"
                  placeholder="Core metrics sync/contract"
                />
              </div>
              
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-nord-4 mb-1.5">
                  Payload (Message) *
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => markTouched('message')}
                  rows={4}
                  required
                  className="w-full px-3 py-2 bg-nord-0/50 border border-nord-3/50 rounded text-sm font-mono text-nord-6 focus:outline-none focus:border-nord-8 transition-colors resize-none"
                  placeholder="Detailed message logs..."
                />
              </div>
              
              <GlowButton
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full group font-mono text-xs"
              >
                {isSubmitting ? 'Dispatching...' : 'Dispatch Message'}
              </GlowButton>
              
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-terminal-green/10 border border-terminal-green/30 rounded text-terminal-green text-xs font-mono">
                  <Icon icon="mdi:check-circle" className="w-4 h-4 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-terminal-red/10 border border-terminal-red/30 rounded text-terminal-red text-xs font-mono">
                  <Icon icon="mdi:alert-circle" className="w-4 h-4 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

