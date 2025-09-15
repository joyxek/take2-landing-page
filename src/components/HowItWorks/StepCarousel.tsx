'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ArrowUp, ArrowDown } from 'lucide-react';
import * as THREE from 'three';

interface StepCarouselProps {
  onScrollToApplication: () => void;
}

const steps = [
  {
    title: "Apply once",
    description: "Fill out a short profile with basics, preferences, and values.",
    icon: "📝",
    color: "#6EE7B7" // accent-green
  },
  {
    title: "Get matched into events",
    description: "We place you in an event with singles who already fit your basics.",
    icon: "🎯", 
    color: "#3B82F6" // accent-blue
  },
  {
    title: "Show up & connect",
    description: "We remove all the stress of logistics; you just focus on being yourself.",
    icon: "✨",
    color: "#0D0D0D" // primary
  }
];

// Three.js ambient background component
function AmbientBackground({ currentStep, reducedMotion }: { currentStep: number; reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const safeCurrentStep = Math.max(0, Math.min(currentStep, steps.length - 1));
  const targetColor = useRef(new THREE.Color(steps[safeCurrentStep]?.color || steps[0].color));
  const currentColor = useRef(new THREE.Color(steps[0].color));

  useEffect(() => {
    const safeStep = Math.max(0, Math.min(currentStep, steps.length - 1));
    const color = steps[safeStep]?.color || steps[0].color;
    targetColor.current.set(color);
  }, [currentStep]);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Smooth color transition
    currentColor.current.lerp(targetColor.current, 0.02);
    
    if (meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.uTime.value = time;
      meshRef.current.material.uniforms.uColor.value = currentColor.current;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Subtle ambient movement
      float wave1 = sin(uv.x * 3.0 + uTime * 0.2) * cos(uv.y * 2.0 + uTime * 0.15);
      float wave2 = sin(uv.x * 2.0 + uTime * 0.1) * cos(uv.y * 3.0 + uTime * 0.25);
      
      // Create soft gradient with step color
      vec3 baseColor = mix(vec3(0.98, 0.97, 0.97), uColor, 0.1);
      vec3 finalColor = mix(baseColor, uColor, (wave1 + wave2) * 0.05 + 0.05);
      
      gl_FragColor = vec4(finalColor, 0.8);
    }
  `;

  return (
    <mesh ref={meshRef} position={[0, 0, -1]} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: currentColor.current }
        }}
        transparent
      />
    </mesh>
  );
}

export default function StepCarousel({ onScrollToApplication }: StepCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [rubberBand, setRubberBand] = useState<'top' | 'bottom' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Add debounce state to prevent rapid navigation
  const [isNavigating, setIsNavigating] = useState(false);

  // Gesture handling for vertical swipe
  const bind = useGesture({
    onDrag: ({ movement: [, my], direction: [, dy], velocity: [, vy], last, event }) => {
      if (Math.abs(my) < 50 && !last) return;
      if (isNavigating) return; // Prevent navigation during animation
      
      if (last) {
        const threshold = 100;
        const shouldChange = Math.abs(my) > threshold || Math.abs(vy) > 0.5;
        
        if (shouldChange) {
          setIsNavigating(true);
          event?.preventDefault();
          
          if (dy > 0) {
            // Swiping down - go to previous step
            if (currentStep > 0) {
              setCurrentStep(prev => prev - 1);
            } else {
              // Rubber band at first step
              setRubberBand('top');
              setTimeout(() => setRubberBand(null), 300);
            }
          } else {
            // Swiping up - go to next step
            if (currentStep < steps.length - 1) {
              setCurrentStep(prev => prev + 1);
            } else {
              // Rubber band at last step
              setRubberBand('bottom');
              setTimeout(() => setRubberBand(null), 300);
            }
          }
          
          // Reset navigation lock after animation
          setTimeout(() => setIsNavigating(false), 500);
        }
      }
    },
    onWheel: ({ direction: [, dy], event }) => {
      if (isNavigating) return; // Prevent navigation during animation
      
      event?.preventDefault();
      setIsNavigating(true);
      
      if (dy > 0 && currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (dy < 0 && currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      }
      
      // Reset navigation lock after animation
      setTimeout(() => setIsNavigating(false), 500);
    }
  }, {
    drag: {
      axis: 'y',
      filterTaps: true,
      threshold: 10
    },
    wheel: {
      axis: 'y'
    }
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavigating) return; // Prevent navigation during animation
      
      if (e.key === 'ArrowUp' && currentStep > 0) {
        setIsNavigating(true);
        setCurrentStep(prev => prev - 1);
        setTimeout(() => setIsNavigating(false), 500);
      } else if (e.key === 'ArrowDown' && currentStep < steps.length - 1) {
        setIsNavigating(true);
        setCurrentStep(prev => prev + 1);
        setTimeout(() => setIsNavigating(false), 500);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isNavigating]);

  return (
    <div 
      ref={containerRef}
      className="relative h-full pt-20 overflow-hidden"
      {...bind()}
    >
      {/* Three.js Background */}
      <div className="absolute inset-0">
        {reducedMotion ? (
          <div 
            className="absolute inset-0 transition-colors duration-500"
            style={{ backgroundColor: `${steps[currentStep]?.color || steps[0].color}10` }}
          />
        ) : (
          <Canvas camera={{ position: [0, 0, 5] }}>
            <AmbientBackground currentStep={currentStep} reducedMotion={reducedMotion} />
          </Canvas>
        )}
      </div>

      {/* Step Cards */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="max-w-md w-full text-center"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              // Rubber band effects
              ...(rubberBand === 'top' && { y: -20 }),
              ...(rubberBand === 'bottom' && { y: 20 })
            }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              ...(rubberBand && { 
                type: "spring",
                damping: 15,
                stiffness: 400
              })
            }}
          >
            {/* Icon */}
            <motion.div
              className="text-8xl mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
            >
              {steps[currentStep]?.icon || "📝"}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-3xl md:text-4xl font-instrument font-bold text-primary mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {steps[currentStep]?.title || "Apply once"}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl font-carlita text-neutral-600 leading-relaxed mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {steps[currentStep]?.description || "Fill out a short profile with basics, preferences, and values."}
            </motion.p>

            {/* CTA on last step */}
            {currentStep === steps.length - 1 && (
              <motion.button
                onClick={onScrollToApplication}
                className="bg-primary hover:bg-primary-800 text-white font-carlita font-bold px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Got it! Let's apply
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <motion.button
          onClick={() => {
            if (currentStep > 0 && !isNavigating) {
              setIsNavigating(true);
              setCurrentStep(prev => prev - 1);
              setTimeout(() => setIsNavigating(false), 500);
            }
          }}
          className={`p-3 rounded-full ${
            currentStep > 0 
              ? 'bg-white/20 hover:bg-white/30 text-white' 
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
          whileHover={currentStep > 0 && !reducedMotion ? { scale: 1.1 } : {}}
          whileTap={currentStep > 0 && !reducedMotion ? { scale: 0.9 } : {}}
          disabled={currentStep === 0 || isNavigating}
          aria-label="Previous step"
        >
          <ArrowUp size={20} />
        </motion.button>
        
        <motion.button
          onClick={() => {
            if (currentStep < steps.length - 1 && !isNavigating) {
              setIsNavigating(true);
              setCurrentStep(prev => prev + 1);
              setTimeout(() => setIsNavigating(false), 500);
            }
          }}
          className={`p-3 rounded-full ${
            currentStep < steps.length - 1 
              ? 'bg-white/20 hover:bg-white/30 text-white' 
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
          whileHover={currentStep < steps.length - 1 && !reducedMotion ? { scale: 1.1 } : {}}
          whileTap={currentStep < steps.length - 1 && !reducedMotion ? { scale: 0.9 } : {}}
          disabled={currentStep === steps.length - 1 || isNavigating}
          aria-label="Next step"
        >
          <ArrowDown size={20} />
        </motion.button>
      </div>

      {/* Step Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isNavigating && index !== currentStep) {
                  setIsNavigating(true);
                  setCurrentStep(index);
                  setTimeout(() => setIsNavigating(false), 500);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentStep 
                  ? 'bg-primary scale-125' 
                  : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              disabled={isNavigating}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Swipe Hint */}
      {currentStep === 0 && (
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-neutral-500 text-sm font-carlita z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Swipe up to continue
        </motion.div>
      )}
    </div>
  );
}
