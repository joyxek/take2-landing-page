'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';


const checkmarkPoints = [
  "1 Simple Application to join the right Take2 event.",
  "Skip everything: swiping, texting, matching, planning, scheduling, asking them out.",
  "Ghosting is impossible.",
  "$10 to get matchmade into the right event.",
  "Multiple introductions in one event.",
  "Matchmaking happens privately - no need to ask them out."
];

export default function ComparisonSection() {
  const [visiblePoints, setVisiblePoints] = useState(0);
  const [orbPosition, setOrbPosition] = useState({ x: 20, y: 20 });

  useEffect(() => {
    // Animate checkmark points every 200ms
    const pointInterval = setInterval(() => {
      setVisiblePoints(prev => {
        if (prev < checkmarkPoints.length) {
          return prev + 1;
        }
        clearInterval(pointInterval);
        return prev;
      });
    }, 200);

    // Animate orb gradient position every 200ms
    const orbInterval = setInterval(() => {
      setOrbPosition({
        x: Math.random() * 60 + 20, // 20-80%
        y: Math.random() * 60 + 20  // 20-80%
      });
    }, 200);

    return () => {
      clearInterval(pointInterval);
      clearInterval(orbInterval);
    };
  }, []);

  return (
    <section className="comparison-section relative py-20 overflow-hidden">
      {/* Animated Orb Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(110, 231, 183, 0.4) 80%, rgba(59, 91, 195, 0.3) 90%, transparent 90%)`,
            left: `${orbPosition.x}%`,
            top: `${orbPosition.y}%`,
          }}
          animate={{
            left: `${orbPosition.x}%`,
            top: `${orbPosition.y}%`,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbit text-primary mb-4">
            Take2 is NOT a dating app
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-2xl mx-auto">
            We want you to focus on the <em>forming the relationship</em> part. Not sourcing a bunch of maybes.
          </p>
        </div>

        {/* Checkmark Points */}
        <div className="max-w-3xl mx-auto space-y-6">
          {checkmarkPoints.map((point, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index < visiblePoints ? 1 : 0,
                y: index < visiblePoints ? 0 : 20
              }}
              transition={{ 
                duration: 0.4,
                delay: 1.0,
                ease: "easeOut"
              }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-accent-green flex items-center justify-center">
                  <Check className="text-white" size={16} />
                </div>
              </div>
              <p className="text-lg font-inter text-neutral-700 leading-relaxed">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <motion.button
            onClick={() => window.open('https://form.typeform.com/to/llHovcds', '_blank')}
            className="bg-[#3b5bc3] hover:bg-[#2d4aa3] text-white font-inter  px-8 py-3 rounded-full text-base shadow-lg transition-all duration-200"
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
