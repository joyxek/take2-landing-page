'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { 
    id: 1,
    number: '400+', 
    label: 'Attendees',
    description: 'Singles have joined Take2 events across our cities',
    gradient: 'from-[#d4d9b7] via-[#e3ebc7] to-[#f0f4d3]',
    bgImage: 'radial-gradient(circle at 30% 70%, rgba(227, 235, 199, 0.9) 0%, rgba(255, 183, 77, 0.3) 40%, rgba(240, 244, 211, 0.8) 100%)',
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
    gradient: 'from-[#c5d1a7] via-[#d4d9b7] to-[#e3ebc7]',
    bgImage: 'radial-gradient(circle at 70% 30%, rgba(212, 217, 183, 0.9) 0%, rgba(251, 146, 60, 0.4) 35%, rgba(197, 209, 167, 0.8) 100%)',
    details: {
      subtitle: 'Expanding Nationwide',
      stats: ['Next: LA', 'Then: DC', 'Goal: 15 cities by 2026']
    }
  },
  { 
    id: 3,
    number: '10', 
    label: 'Events',
    description: '2 part events, Speed Dates, and Friendship Events',
    gradient: 'from-[#b6c997] via-[#c5d1a7] to-[#d4d9b7]',
    bgImage: 'radial-gradient(circle at 50% 50%, rgba(182, 201, 151, 0.9) 0%, rgba(234, 88, 12, 0.3) 45%, rgba(197, 209, 167, 0.8) 100%)',
    details: {
      subtitle: 'We love doing this.',
      stats: ['8 Events in NYC', 'Popups in SF and LA', 'Growing team of volunteers in new cities.']
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
      className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100"
    >
      {/* Subtle animated gradient background - neutral theme */}
      <div className="pointer-events-none absolute inset-0 select-none">
        {/* Primary neutral blob */}
        <div className="absolute left-1/4 top-[20%] aspect-square w-[40rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,rgba(110,231,183,0.3)_0%,transparent_70%)] blur-3xl opacity-40 animate-blob" />
        {/* Supporting blue blob */}
        <div className="absolute right-1/5 top-[30%] aspect-square w-[42rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,rgba(59,91,195,0.2)_0%,transparent_70%)] blur-3xl opacity-50 animate-blob2" />
        {/* Secondary teal tint for depth */}
        <div className="absolute left-[55%] top-[40%] aspect-square w-[36rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,rgba(110,231,183,0.25)_0%,transparent_75%)] blur-3xl opacity-30 animate-blob3" />
      </div>
      <div className="max-w-md mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-gilda-display font-bold text-gray-900 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          In just one year...
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
                  className="relative rounded-3xl shadow-2xl overflow-hidden bg-white"
                  style={{
                    minHeight: isExpanded ? '320px' : '120px'
                  }}
                  animate={{
                    height: isExpanded ? 'auto' : '120px'
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >

                  {/* Card Content */}
                  <div className="relative z-10 p-6 text-black">
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
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200"
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
                          className="mt-6 pt-6 border-t border-gray-200"
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
                                  <div className="w-2 h-2 rounded-full bg-gray-400" />
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
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/20 to-transparent"
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
          <motion.button
            onClick={() => window.open('https://form.typeform.com/to/llHovcds', '_blank')}
            className="w-full bg-[#3b5bc3] hover:bg-[#2d4aa3] text-white font-inter px-8 py-3 rounded-full text-base shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
