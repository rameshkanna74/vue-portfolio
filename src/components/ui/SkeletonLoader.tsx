import React from 'react';
import { clsx } from 'clsx';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'avatar' | 'list';
  count?: number;
  width?: string;
  height?: string;
  shimmer?: boolean;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  count = 1,
  width = '100%',
  height = '200px',
  shimmer = true,
}) => {
  const baseClass = shimmer ? 'skeleton-shimmer' : 'skeleton';

  const renderContent = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={clsx(baseClass)} style={{ width, height }}>
            <div className="p-6 space-y-4">
              <div className={clsx(baseClass, 'h-6 w-3/4')} />
              <div className={clsx(baseClass, 'h-4 w-full')} />
              <div className={clsx(baseClass, 'h-4 w-5/6')} />
              <div className="flex gap-2 mt-4">
                <div className={clsx(baseClass, 'h-8 w-20')} />
                <div className={clsx(baseClass, 'h-8 w-20')} />
              </div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className={clsx(baseClass, 'h-4')} style={{ width }} />
            ))}
          </div>
        );

      case 'avatar':
        return (
          <div className="flex items-center gap-4">
            <div className={clsx(baseClass, 'w-16 h-16 rounded-full')} />
            <div className="flex-1 space-y-2">
              <div className={clsx(baseClass, 'h-4 w-1/2')} />
              <div className={clsx(baseClass, 'h-3 w-1/3')} />
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={clsx(baseClass, 'w-12 h-12 rounded')} />
                <div className="flex-1 space-y-2">
                  <div className={clsx(baseClass, 'h-4 w-3/4')} />
                  <div className={clsx(baseClass, 'h-3 w-1/2')} />
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div className="skeleton-loader">{renderContent()}</div>;
};
