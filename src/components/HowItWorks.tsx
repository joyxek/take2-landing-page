'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';

const steps = [
  {
    id: 1,
    title: "Submit your profile.",
    description: "Take 5-7 minutes to create your profile. We will collect basic information about you as well as your dating preferences and values. Answer as little or as much as you'd like.",
    icon: "📝",
    gradient: "from-blue-500 via-teal-400 to-green-400",
    accentColor: "text-blue-300",
    bgPattern: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)"
  },
  {
    id: 2,
    title: "Get matched into an event.",
    description: "The team will evaluate profiles to curate an event for singles like you. We place you in an event with the most singles who fit your basic preferences.",
    icon: "🎯",
    gradient: "from-teal-500 via-cyan-400 to-yellow-400",
    accentColor: "text-teal-300",
    bgPattern: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 50%)"
  },
  {
    id: 3,
    title: "Show up & date irl",
    description: "We remove all the stress of dating logistics. You just focus on being yourself and dating irl.",
    icon: "✨",
    gradient: "from-green-400 via-lime-400 to-yellow-300",
    accentColor: "text-green-300",
    bgPattern: "radial-gradient(circle at 40% 60%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(255,255,255,0.15) 0%, transparent 50%)"
  }
];

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleScrollToApplication = () => {
    window.open('https://form.typeform.com/to/llHovcds', '_blank');
  };

  // Horizontal swipe gesture handling
  const bind = useGesture({
    onDrag: ({ movement: [mx], direction: [dx], velocity: [vx], last }) => {
      if (Math.abs(mx) < 50 && !last) return;
      if (isNavigating) return;
      
      if (last) {
        const threshold = 100;
        const shouldChange = Math.abs(mx) > threshold || Math.abs(vx) > 0.5;
        
        if (shouldChange) {
          setIsNavigating(true);
          
          if (dx > 0) {
            // Swiping right - go to previous step
            if (currentStep > 0) {
              setCurrentStep(prev => prev - 1);
            }
          } else {
            // Swiping left - go to next step
            if (currentStep < steps.length - 1) {
              setCurrentStep(prev => prev + 1);
            }
          }
          
          setTimeout(() => setIsNavigating(false), 600);
        }
      }
    }
  }, {
    drag: {
      axis: 'x',
      filterTaps: true,
      threshold: 10
    }
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavigating) return;
      
      if (e.key === 'ArrowLeft' && currentStep > 0) {
        setIsNavigating(true);
        setCurrentStep(prev => prev - 1);
        setTimeout(() => setIsNavigating(false), 600);
      } else if (e.key === 'ArrowRight' && currentStep < steps.length - 1) {
        setIsNavigating(true);
        setCurrentStep(prev => prev + 1);
        setTimeout(() => setIsNavigating(false), 600);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isNavigating]);

  return (
    <section className="py-20 relative overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: '#3b5bc3' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform skew-y-12" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-6xl font-instrument font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl font-carlita text-neutral-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Three steps to find your event.
          </motion.p>
        </div>

        {/* Card Container */}
        <div ref={cardRef} className="relative max-w-lg mx-auto" {...bind()}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className={`relative bg-gradient-to-br ${steps[currentStep].gradient} rounded-3xl p-8 shadow-2xl overflow-hidden`}
              style={{
                background: `linear-gradient(135deg, ${
                  currentStep === 0 ? 'rgba(59, 130, 246, 0.2), rgba(45, 212, 191, 0.2), rgba(74, 222, 128, 0.2)' :
                  currentStep === 1 ? 'rgba(20, 184, 166, 0.2), rgba(34, 211, 238, 0.2), rgba(250, 204, 21, 0.2)' :
                  'rgba(74, 222, 128, 0.2), rgba(200, 211, 183, 0.2), rgba(253, 224, 71, 0.2)'
                })`,
                minHeight: '400px'
              }}
              initial={{ opacity: 0, x: 300, rotateY: 45 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -300, rotateY: -45 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 100,
                duration: 0.6
              }}
              whileHover={!reducedMotion ? {
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              } : {}}
            >
              {/* Animated Background Blobs */}
              {!reducedMotion && (
                <>
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-xl"
                    animate={{
                      x: [0, 20, 0],
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-24 h-24 bg-white/15 rounded-full blur-lg"
                    animate={{
                      x: [0, -15, 0],
                      y: [0, 15, 0],
                      scale: [1, 0.9, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </>
              )}

              {/* Card Content */}
              <div className="relative z-10 text-center text-white h-full flex flex-col justify-center items-center px-8 py-4">
                

                {/* Icon */}
                <motion.div
                  className="text-7xl mb-6"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", damping: 12 }}
                >
                  {steps[currentStep].icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-3xl md:text-4xl font-instrument font-bold mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {steps[currentStep].title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-lg font-carlita leading-relaxed opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {steps[currentStep].description}
                </motion.p>

                {/* CTA on last step */}
                {currentStep === steps.length - 1 && (
                  <motion.button
                    onClick={handleScrollToApplication}
                    className="mt-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-carlita font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-200 border border-white/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Got it! Apply Now 💌
                  </motion.button>
                )}
              </div>

              {/* Shimmer Effect */}
              {!reducedMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {steps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (!isNavigating && index !== currentStep) {
                  setIsNavigating(true);
                  setCurrentStep(index);
                  setTimeout(() => setIsNavigating(false), 600);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              disabled={isNavigating}
              whileHover={!reducedMotion ? { scale: index === currentStep ? 1.25 : 1.1 } : {}}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        {currentStep === 0 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-neutral-400 text-sm font-carlita">
              Swipe or use navigation buttons to navigate
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
