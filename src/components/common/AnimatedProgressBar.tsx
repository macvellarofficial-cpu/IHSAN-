import React from 'react';
import { motion } from 'motion/react';

interface AnimatedProgressBarProps {
  percentage: number;
  heightClass?: string;
  trackBgClass?: string;
  barColorClass?: string;
  showGlowTip?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  percentage,
  heightClass = 'h-2.5',
  trackBgClass = 'bg-[#E6E2D3]',
  barColorClass = 'bg-[#F27D26]',
  showGlowTip = true,
  delay = 0.1,
  duration = 1.2,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(percentage)));

  return (
    <div className={`w-full ${heightClass} ${trackBgClass} rounded-full overflow-hidden relative ${className}`}>
      <motion.div
        className={`h-full ${barColorClass} rounded-full relative`}
        initial={{ width: '0%' }}
        whileInView={{ width: `${clamped}%` }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration,
          delay,
          ease: [0.25, 1, 0.5, 1], // Smooth cubic-bezier easeOut
        }}
      >
        {/* Subtle dynamic shimmer light sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        
        {/* Glowing tip indicator */}
        {showGlowTip && clamped > 0 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white/80 rounded-full blur-[1px] shadow-sm pointer-events-none" />
        )}
      </motion.div>
    </div>
  );
};
