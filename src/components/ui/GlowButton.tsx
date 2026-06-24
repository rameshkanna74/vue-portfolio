import React, { useState, type MouseEvent, type ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'gradient';
  loading?: boolean;
  shimmer?: boolean;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  shimmer = true,
  className,
  onClick,
  ...props
}) => {
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });

  const variantClasses = {
    primary: 'bg-nord-10 hover:bg-nord-9 text-nord-6 shadow-glow-sm hover:shadow-glow-md',
    secondary: 'bg-nord-3 hover:bg-nord-2 text-nord-4 border border-nord-3',
    success: 'bg-nord-14 hover:bg-nord-14/90 text-nord-0 shadow-glow-sm',
    danger: 'bg-nord-11 hover:bg-nord-11/90 text-nord-6 shadow-glow-sm',
    ghost: 'bg-transparent hover:bg-nord-3/30 text-nord-4 border border-nord-3/50 hover:border-nord-8/50',
    gradient: 'bg-gradient-to-r from-nord-10 via-nord-9 to-nord-8 text-nord-6 shadow-colored-glow',
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    setRipplePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    
    setShowRipple(true);
    setTimeout(() => {
      setShowRipple(false);
    }, 600);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={cn(
        'glow-button relative overflow-hidden group',
        variantClasses[variant],
        { 'opacity-50 cursor-not-allowed': disabled || loading },
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {/* Shimmer Effect */}
      {shimmer && !disabled && !loading && (
        <span 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"
        />
      )}
      
      {/* Ripple Effect */}
      {showRipple && (
        <span
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: `${ripplePos.x}px`,
            top: `${ripplePos.y}px`,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />}
        {children}
      </span>
    </button>
  );
};
