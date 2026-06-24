import React, { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lazy?: boolean;
  placeholder?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  lazy = true,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  objectFit = 'cover',
  placeholder,
  className,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!lazy || !imgRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    observer.observe(imgRef.current);
    
    return () => observer.disconnect();
  }, [lazy]);

  const basePath = src.replace(/\.\w+$/, '');
  const ext = src.match(/\.\w+$/)?.[0] || '';
  
  const imageSources = {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
    original: src,
    srcset: width 
      ? `${basePath}-400w${ext} 400w, ${basePath}-800w${ext} 800w, ${basePath}-1200w${ext} 1200w`
      : undefined,
  };

  return (
    <picture className={twMerge(clsx('optimized-image relative block overflow-hidden bg-[#3b4252]', className))}>
      {isInView && !hasError && (
        <>
          <source srcSet={imageSources.avif} type="image/avif" sizes={sizes} />
          <source srcSet={imageSources.webp} type="image/webp" sizes={sizes} />
        </>
      )}
      
      <img
        ref={imgRef}
        src={isInView ? imageSources.original : placeholder}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        srcSet={imageSources.srcset}
        sizes={sizes}
        className={twMerge(clsx(
          'w-full h-auto opacity-0 transition-opacity duration-400',
          { 'opacity-100': isLoaded, 'opacity-50 grayscale': hasError }
        ))}
        style={{ objectFit, aspectRatio: width && height ? `${width} / ${height}` : undefined }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          console.warn(`Failed to load image: ${src}`);
        }}
        decoding="async"
        {...props}
      />
      
      {!isLoaded && !hasError && placeholder && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-[10px] scale-110 opacity-60 transition-opacity duration-400"
          style={{ backgroundImage: `url(${placeholder})` }}
        />
      )}
    </picture>
  );
};
