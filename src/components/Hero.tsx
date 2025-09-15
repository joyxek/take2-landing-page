'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(() => import('./Hero/ParticleBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-transparent to-accent-blue/10" />
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Gesture handling for parallax effect
  const bind = useGesture({
    onMove: ({ xy }) => {
      if (reducedMotion || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (xy[0] - rect.left - rect.width / 2) / rect.width;
      const y = (xy[1] - rect.top - rect.height / 2) / rect.height;
      
      containerRef.current.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
    },
    onHover: ({ hovering }) => {
      if (reducedMotion || !containerRef.current) return;
      
      if (!hovering) {
        containerRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
    }
  });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ willChange: 'transform' }}
      {...bind()}
    >
      {/* Background with particles and gradient */}
      <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
        <ParticleBackground reducedMotion={reducedMotion} />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Animated Headline */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-instrument font-bold text-primary leading-tight">
            <span className="relative inline-block">
              {/* "Date" with strikethrough animation */}
              <motion.span
                className="relative"
                initial={{ opacity: 1 }}
                animate={{ opacity: animationStep >= 1 ? 0.3 : 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                onAnimationComplete={() => setAnimationStep(1)}
              >
                Date
                <motion.div
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: animationStep >= 1 ? 1 : 0 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: "easeInOut" }}
                  onAnimationComplete={() => setAnimationStep(2)}
                />
              </motion.span>
              
              {/* "Meet" with handwriting effect */}
              <motion.span
                className="absolute -top-8 right-2

                 text-red-500 transform -rotate-2 font-handwriting text-6xl md:text-8xl"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ 
                  opacity: animationStep >= 2 ? 1 : 0, 
                  y: animationStep >= 2 ? 0 : 10,
                  scale: animationStep >= 2 ? 1 : 0.9
                }}
                transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
                onAnimationComplete={() => setAnimationStep(3)}
              >
                Meet
              </motion.span>
            </span>
            {" "}people you're actually compatible with
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl font-carlita text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationStep >= 3 ? 1 : 0, y: animationStep >= 3 ? 0 : 20 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          We cut the stress of planning and asking people out. Just show up to meet the singles who already check your basic boxes.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationStep >= 3 ? 1 : 0, y: animationStep >= 3 ? 0 : 20 }}
          transition={{ delay: 1.7, duration: 0.3 }}
        >
          <motion.a
            href="/apply"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full font-carlita font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
          >
            Get your invite 💌
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
