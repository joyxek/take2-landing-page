'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const datingAppSteps = [
  { 
    id: 1, 
    title: "Create Profile", 
    duration: "30-60 min", 
    icon: "📝", 
    description: "Upload photos, write bio, set preferences",
    angle: -90,
    progressStart: 0.1,
    progressEnd: 0.3
  },
  { 
    id: 2, 
    title: "Swipe & Browse", 
    duration: "2-4 weeks", 
    icon: "📱", 
    description: "Daily swiping through hundreds of profiles",
    angle: -30,
    progressStart: 0.3,
    progressEnd: 0.5
  },
  { 
    id: 3, 
    title: "Get Matches", 
    duration: "1-3 weeks", 
    icon: "💕", 
    description: "Wait for mutual interest and matches",
    angle: 30,
    progressStart: 0.5,
    progressEnd: 0.65
  },
  { 
    id: 4, 
    title: "Message Back & Forth", 
    duration: "1-2 weeks", 
    icon: "💬", 
    description: "Endless texting to build rapport",
    angle: 90,
    progressStart: 0.65,
    progressEnd: 0.8,
    hasTyping: true
  },
  { 
    id: 5, 
    title: "Plan & Go on Date", 
    duration: "2-3 weeks", 
    icon: "🍽️", 
    description: "Coordinate schedules and meet IRL",
    angle: 150,
    progressStart: 0.8,
    progressEnd: 0.95
  }
];

export default function TimelineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCTA, setShowCTA] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to a slower, more deliberate pace
  const draggyProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Radial progress (0 to 360 degrees)
  const radialProgress = useTransform(draggyProgress, [0.2, 0.9], [0, 360]);
  
  useEffect(() => {
    const unsubscribe = draggyProgress.onChange((latest) => {
      if (latest >= 1.0 && !showCTA) {
        setTimeout(() => setShowCTA(true), 500);
      }
    });
    
    return unsubscribe;
  }, [draggyProgress, showCTA]);

  return (
    <>
      <div 
        ref={containerRef}
        className="h-[400vh] relative"
      >
        <div className="h-screen bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden sticky top-0 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center pt-12 sm:pt-20 pb-8 sm:pb-12 px-2 sm:px-6">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-6xl font-instrument font-bold text-primary mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          The Dating App Journey
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-neutral-600 font-carlita max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Scroll to see just how long it really takes
        </motion.p>
        <motion.div 
          className="mt-8 text-2xl font-instrument font-bold text-red-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          6–12 weeks total
        </motion.div>
      </div>

      {/* Central Circular Progress */}
      <div className="flex items-center justify-center min-h-[60vh] relative">
        {/* Main Circle */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full border-4 border-neutral-200" />
          
          {/* Progress Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="301.59 301.59"
              style={{
                strokeDashoffset: useTransform(radialProgress, [0, 360], [301.59, 0])
              }}
            />
          </svg>

          {/* Inner Glow Effect */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-red-100/50 to-red-200/30 backdrop-blur-sm"
            style={{
              opacity: useTransform(draggyProgress, [0, 1], [0, 0.8])
            }}
          />

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-center"
              style={{
                opacity: useTransform(draggyProgress, [0.85, 0.95], [0, 1])
              }}
            >
              <div className="text-2xl sm:text-3xl font-instrument font-bold text-red-600 mb-2">
                Finally...
              </div>
              <div className="text-base sm:text-lg font-carlita text-neutral-600">
                Your first date
              </div>
            </motion.div>
          </div>
        </div>

        {/* Milestone Cards - Only show one at a time */}
        {datingAppSteps.map((step, index) => {
          // Only show this card if we're in its progress range
          const isInRange = useTransform(draggyProgress, 
            [step.progressStart, step.progressEnd], 
            [0, 1]
          );
          
          // Hide previous cards when moving to next
          const shouldShow = useTransform(draggyProgress, (progress) => {
            return progress >= step.progressStart && progress < step.progressEnd ? 1 : 0;
          });
          
          const radius = typeof window !== 'undefined' 
            ? (window.innerWidth < 640 ? 120 : window.innerWidth < 768 ? 140 : 200)
            : 200;
          const x = radius * Math.cos((step.angle * Math.PI) / 180);
          const y = radius * Math.sin((step.angle * Math.PI) / 180);

          return (
            <motion.div
              key={step.id}
              className="absolute"
              style={{
                x: x,
                y: y,
                opacity: shouldShow
              }}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-xl border border-red-100 min-w-[160px] sm:min-w-[200px] max-w-[180px] sm:max-w-[220px]"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <div className="flex items-center mb-2">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{step.icon}</span>
                  <div>
                    <h3 className="font-instrument font-bold text-primary text-xs sm:text-sm">
                      {step.title}
                    </h3>
                    <motion.div 
                      className="text-red-600 font-carlita font-bold text-[10px] sm:text-xs"
                      animate={{ 
                        opacity: [0.7, 1, 0.7],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    >
                      {step.duration}
                    </motion.div>
                  </div>
                </div>
                <p className="text-neutral-600 font-carlita text-[10px] sm:text-xs mt-1 leading-tight">
                  {step.description}
                </p>

                {/* Typing Bubbles for Message Step */}
                {step.hasTyping && (
                  <motion.div 
                    className="mt-3 flex space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-neutral-400 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

        </div>
      </div>
      
      {/* Take2 CTA Button - Outside sticky container */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            className="flex justify-center py-20 px-6 bg-white relative z-30"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.a
              href="/apply"
              className="relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glassmorphic Button */}
              <div className="relative bg-gradient-to-r from-teal-400/20 to-blue-500/20 backdrop-blur-xl rounded-full px-12 py-6 border border-white/30 shadow-2xl overflow-hidden">
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-blue-500/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative z-10 text-center">
                  <div className="text-2xl font-instrument font-bold text-primary mb-2">
                    Skip the Wait
                  </div>
                  <div className="text-lg font-carlita text-teal-600 font-semibold">
                    Apply for an Invite ($10)
                  </div>
                </div>
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
