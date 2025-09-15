'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Undertone Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-coral-50 to-warm-white animate-gradient-shift" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Animated Headline */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-instrument font-bold text-primary leading-tight">
            <span className="handwriting-strike">
              <span className="handwriting-strike-original">
                Date
              </span>
              <div className="handwriting-strike-through"></div>
              <span className="handwriting-strike-text">
                Meet
              </span>
            </span>
            {" "}People You're Actually Compatible With
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl font-carlita text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.6 }}
        >
          Take2 is an invite-only dating event where singles in your city meet IRL. 
          We cut the stress of planning and asking people out. Just show up to meet 
          singles who already check your basic boxes.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.6 }}
        >
          <motion.button
            className="bg-primary hover:bg-primary-800 text-white font-carlita font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(13, 13, 13, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            Apply for an Invite ($10)
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle parallax particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-green rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
