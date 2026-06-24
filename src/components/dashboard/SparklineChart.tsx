import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  showArea?: boolean;
  animate?: boolean;
  className?: string;
}

export const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  width = 120,
  height = 40,
  color = 'rgb(56, 189, 248)',
  fillColor,
  strokeWidth = 1.5,
  showArea = true,
  animate = true,
  className = '',
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);

  const generatePath = (): { linePath: string; areaPath: string } => {
    if (data.length < 2) return { linePath: '', areaPath: '' };

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const padding = 2;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;

    const points = data.map((value, index) => ({
      x: padding + (index / (data.length - 1)) * usableWidth,
      y: padding + usableHeight - ((value - min) / range) * usableHeight,
    }));

    // Create smooth curve using quadratic bezier
    let linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpX = (prev.x + curr.x) / 2;
      linePath += ` Q ${cpX} ${prev.y}, ${curr.x} ${curr.y}`;
    }

    // Area path (line path + close to bottom)
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const areaPath = `${linePath} L ${lastPoint.x} ${height} L ${firstPoint.x} ${height} Z`;

    return { linePath, areaPath };
  };

  const { linePath, areaPath } = generatePath();

  useEffect(() => {
    if (animate && pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      gsap.fromTo(
        pathRef.current,
        { strokeDasharray: pathLength, strokeDashoffset: pathLength },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }
      );
    }
    if (animate && areaRef.current) {
      gsap.fromTo(areaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.4, ease: 'power2.out' });
    }
  }, [animate, linePath]);

  if (data.length < 2) return null;

  const areaFill = fillColor || color;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible ${className}`}
      role="img"
      aria-label="Sparkline trend chart"
    >
      <defs>
        <linearGradient id={`sparkline-gradient-${color.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={areaFill} stopOpacity="0.2" />
          <stop offset="100%" stopColor={areaFill} stopOpacity="0" />
        </linearGradient>
      </defs>

      {showArea && (
        <path
          ref={areaRef}
          d={areaPath}
          fill={`url(#sparkline-gradient-${color.replace(/[^a-zA-Z0-9]/g, '')})`}
          opacity={animate ? 0 : 1}
        />
      )}

      <path
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
