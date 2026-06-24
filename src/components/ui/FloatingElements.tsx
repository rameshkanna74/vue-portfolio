import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FloatingElementData {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle';
}

interface FloatingElementsProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  colors?: string[];
  blur?: boolean;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomShape = (): 'circle' | 'square' | 'triangle' => {
  const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

export const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 8,
  minSize = 50,
  maxSize = 200,
  colors = ['rgba(136, 192, 208, 0.1)', 'rgba(129, 161, 193, 0.1)', 'rgba(94, 129, 172, 0.1)'],
  blur = true,
}) => {
  const [elements, setElements] = useState<FloatingElementData[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: random(minSize, maxSize),
      x: random(0, 100),
      y: random(0, 100),
      color: colors[Math.floor(Math.random() * colors.length)] || 'rgba(136, 192, 208, 0.1)',
      duration: random(15, 30),
      delay: random(0, 5),
      shape: randomShape(),
    }));
    setElements(newElements);
  }, [count, minSize, maxSize, colors]);

  return (
    <div className="floating-elements-container fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className={twMerge(clsx(
            'floating-element absolute',
            {
              'backdrop-blur-sm': blur,
              'rounded-full': element.shape === 'circle',
              'rounded-lg': element.shape === 'square',
            }
          ))}
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.x}%`,
            top: `${element.y}%`,
            background: element.color,
            animationDuration: `${element.duration}s`,
            animationDelay: `${element.delay}s`,
            clipPath: element.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
          }}
        />
      ))}
      <style>{`
        .floating-element {
          animation: float-random 20s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes float-random {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -30px) rotate(5deg);
          }
          50% {
            transform: translate(-15px, 20px) rotate(-5deg);
          }
          75% {
            transform: translate(30px, 10px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
};
