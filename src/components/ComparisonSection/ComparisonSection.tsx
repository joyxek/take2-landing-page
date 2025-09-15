'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import SceneBackdrop from './SceneBackdrop';


const comparisonData = {
  shared: [
    'Let you "filter" who you might meet',
    'Ask for basic preferences and profile info',
    'Aim to connect singles looking for relationships'
  ],
  datingApps: {
    title: 'Dating Apps',
    issues: [
      { text: 'Your success depends on your profile + pictures'},
      { text: '0% chance of connection without a mutual match'},
      { text: 'Texting etiquette is highly judged'},
      { text: 'High effort to low payoff: Weeks of chat before a single IRL meeting'},
      { text: 'If you\'re a man: You plan and pay for it all'},
      { text: 'Bad dating morale if you don\'t stand out on the apps' }
    ]
  },
  take2: {
    title: 'Take2',
    benefits: [
      { text: 'One simple application instead of curating a perfect profile', category: 'clarity' },
      { text: 'We do the heavy lifting: Our team places you in the right event with compatible singles', category: 'safety' },
      { text: 'IRL first: Skip texting games and go straight to face-to-face vibe checks', category: 'vibe' },
      { text: 'Curated programming: Structured experiences designed to cut awkward small talk', category: 'vibe' },
      { text: 'Zero logistics stress: We set the time, venue, and gather the group', category: 'safety' },
      { text: 'Built-in momentum: Multiple introductions in one event leading to more real chances to connect', category: 'time' }
    ]
  }
};

export default function ComparisonSection() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className="comparison-section relative py-20 overflow-hidden">
      {/* Scene Backdrop */}
      <SceneBackdrop activeChip="all" reducedMotion={reducedMotion} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-instrument font-bold text-primary mb-4">
            Take2 is NOT a dating app
          </h2>
          <p className="text-xl font-carlita text-neutral-600 max-w-3xl mx-auto">
            See how we're different from everything you've tried before
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Dating Apps Card - Muted */}
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <X className="text-red-500 mr-3" size={24} />
              <h3 className="text-2xl font-instrument font-bold text-primary">
                {comparisonData.datingApps.title}
              </h3>
            </div>
            
            <div className="space-y-4">
              {comparisonData.datingApps.issues.map((issue, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg border bg-red-50 border-red-200 ring-2 ring-red-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="font-carlita text-neutral-700">{issue.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Take2 Card - Alive & Biased */}
          <motion.div
            className="relative bg-gradient-to-br from-accent-green/10 to-accent-blue/10 rounded-2xl p-8 border border-accent-green/20 shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={reducedMotion ? {} : {
              scale: 1.02,
              rotateY: 2,
              rotateX: -1,
              transition: { duration: 0.2 }
            }}
            style={reducedMotion ? {} : {
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 to-accent-blue/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Check className="text-accent-green mr-3" size={24} />
                <h3 className="text-2xl font-instrument font-bold text-primary">
                  {comparisonData.take2.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {comparisonData.take2.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg border bg-accent-green/10 border-accent-green/30 ring-2 ring-accent-green/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={!reducedMotion ? { 
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(110, 231, 183, 0.15)"
                    } : {}}
                  >
                    <p className="font-carlita text-neutral-700">{benefit.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated glow ring */}
            {!reducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-accent-green/30"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(110, 231, 183, 0.3)",
                    "0 0 30px rgba(110, 231, 183, 0.5)",
                    "0 0 20px rgba(110, 231, 183, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
