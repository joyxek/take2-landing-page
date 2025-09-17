'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { 
    id: 1,
    number: '400+', 
    label: 'Attendees',
    description: 'Singles have joined Take2 events across our cities',
    gradient: 'from-orange-500 via-pink-500 to-red-500',
    bgImage: 'linear-gradient(135deg, rgba(251, 146, 60, 0.8) 0%, rgba(236, 72, 153, 0.8) 50%, rgba(239, 68, 68, 0.8) 100%)',
    details: {
      subtitle: 'Growing Community',
      stats: ['85% match rate', '13 avg connections per event', '92% would recommend']
    }
  },
  { 
    id: 2,
    number: '3', 
    label: 'Cities',
    description: 'NYC, SF, and LA with more cities launching soon',
    gradient: 'from-blue-500 via-purple-500 to-indigo-600',
    bgImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 50%, rgba(79, 70, 229, 0.8) 100%)',
    details: {
      subtitle: 'Expanding Nationwide',
      stats: ['Next: Austin', 'Then: Chicago', 'Goal: 15 cities by 2025']
    }
  },
  { 
    id: 3,
    number: '2024', 
    label: 'Founded',
    description: 'Built by singles, for singles who are tired of dating apps',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    bgImage: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(20, 184, 166, 0.8) 50%, rgba(6, 182, 212, 0.8) 100%)',
    details: {
      subtitle: 'Fresh Approach',
      stats: ['Founded by 2 friends', 'Bootstrapped & authentic', 'Community-first mindset']
    }
  }
];

export default function NumbersStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Show CTA after component mounts
    const timer = setTimeout(() => setShowCTA(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: 'white' }}
    >
      {/* Hazy animated gradient background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh] select-none [mask-image:linear-gradient(to_top,black,transparent_60%)]">
        {/* Primary blue blob */}
        <div className="absolute left-1/4 bottom-[-10%] aspect-square w-[40rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,#4F46E5_0%,transparent_70%)] blur-3xl opacity-70 animate-blob" />
        {/* Supporting teal blob */}
        <div className="absolute right-1/5 bottom-[-15%] aspect-square w-[42rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,#14B8A6_0%,transparent_70%)] blur-3xl opacity-90 animate-blob2" />
        {/* Secondary blue tint for depth */}
        <div className="absolute left-[55%] bottom-[-20%] aspect-square w-[36rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,#6366F1_0%,transparent_75%)] blur-3xl opacity-70 animate-blob3" />
        {/* Accent green blob */}
        <div className="absolute left-[35%] bottom-[-25%] aspect-square w-[30rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,#10B981_0%,transparent_75%)] blur-2xl opacity-90 animate-blob4" />

        {/* Soft color wash behind */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#4F46E5]/30 via-[#14B8A6]/20 to-transparent blur-[60px]" />
      </div>
      <div className="max-w-md mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-instrument font-bold text-gray-700 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Take2 Numbers
        </motion.h2>
        
        {/* Stacked Cards Container */}
        <div className="relative mb-16 space-y-4">
          {stats.map((stat, index) => {
            const isExpanded = expandedCard === stat.id;
            const stackOffset = expandedCard === null ? index * 8 : 0;
            const zIndex = isExpanded ? 50 : stats.length - index;
            
            return (
              <motion.div
                key={stat.id}
                className="relative cursor-pointer"
                style={{ zIndex }}
                initial={{ 
                  opacity: 0, 
                  y: 100 + (index * 20),
                  scale: 0.95
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: stackOffset,
                  scale: 1
                }}
                animate={{
                  y: isExpanded ? 0 : stackOffset,
                  scale: isExpanded ? 1 : 1,
                  zIndex
                }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                viewport={{ once: true }}
                onClick={() => handleCardClick(stat.id)}
                whileHover={!isExpanded && !reducedMotion ? {
                  scale: 1.02,
                  y: stackOffset - 4,
                  transition: { duration: 0.2 }
                } : {}}
              >
                <motion.div
                  className="relative rounded-3xl shadow-2xl overflow-hidden"
                  style={{
                    background: stat.bgImage,
                    minHeight: isExpanded ? '320px' : '120px'
                  }}
                  animate={{
                    height: isExpanded ? 'auto' : '120px'
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-6 text-white">
                    {/* Collapsed State */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl font-instrument font-bold">
                          {stat.number}
                        </div>
                        <div>
                          <div className="text-lg font-carlita font-semibold">
                            {stat.label}
                          </div>
                          <div className="text-sm opacity-80 font-carlita">
                            {stat.description}
                          </div>
                        </div>
                      </div>
                      
                      {/* Expand Indicator */}
                      <motion.div
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                          />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="mt-6 pt-6 border-t border-white/20"
                        >
                          <div className="mb-4">
                            <h4 className="text-xl font-instrument font-bold mb-3">
                              {stat.details.subtitle}
                            </h4>
                            <div className="space-y-2">
                              {stat.details.stats.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + (idx * 0.1) }}
                                  className="flex items-center space-x-3"
                                >
                                  <div className="w-2 h-2 rounded-full bg-white/60" />
                                  <span className="font-carlita text-sm opacity-90">
                                    {item}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                        repeatDelay: 4,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          className="w-full max-w-md mx-auto px-4 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={showCTA ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.a
            href="https://form.typeform.com/to/llHovcds"
            className="block w-full bg-primary text-white px-8 py-4 rounded-full font-carlita font-bold text-lg text-center hover:text-white hover:shadow-[0_10px_30px_rgba(59,91,195,0.4)] transition-all duration-300 shadow-lg"
            whileHover={reducedMotion ? {} : { scale: 1.02 }}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
          >
            Apply Now 💌
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
