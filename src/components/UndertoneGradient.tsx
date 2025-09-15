'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface UndertoneGradientProps {
  intensity?: 'full' | 'soft' | 'subtle';
  children?: React.ReactNode;
  className?: string;
}

export default function UndertoneGradient({ 
  intensity = 'full', 
  children, 
  className = '' 
}: UndertoneGradientProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getIntensityStyles = () => {
    switch (intensity) {
      case 'full':
        return 'opacity-100';
      case 'soft':
        return 'opacity-60';
      case 'subtle':
        return 'opacity-30';
      default:
        return 'opacity-100';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Base gradient layers */}
      <div className={`absolute inset-0 ${getIntensityStyles()}`}>
        {/* Layer 1: Powder blue base */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-blue-100 via-blue-50 to-transparent"
          style={{
            background: `radial-gradient(circle at 20% 30%, #E7EEF6 0%, #BED3EA 30%, transparent 70%)`
          }}
          animate={reducedMotion ? {} : {
            backgroundPosition: ['20% 30%', '25% 35%', '20% 30%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Layer 2: Coral bloom */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 60%, #FF6E5A 0%, #FF8A6A 25%, transparent 60%)`
          }}
          animate={reducedMotion ? {} : {
            backgroundPosition: ['70% 60%', '75% 55%', '70% 60%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />

        {/* Layer 3: Secondary blue field */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 40% 80%, #AFC6E0 0%, transparent 50%)`
          }}
          animate={reducedMotion ? {} : {
            backgroundPosition: ['40% 80%', '45% 75%', '40% 80%'],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />

        {/* Layer 4: Warm white highlights */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 10% 10%, #FAF9F7 0%, transparent 40%)`
          }}
          animate={reducedMotion ? {} : {
            backgroundPosition: ['10% 10%', '15% 15%', '10% 10%'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
