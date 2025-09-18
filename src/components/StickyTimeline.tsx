'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineSteps = [
  {
    id: 1,
    bubbleText: "10-30 min",
    cardText: "create your profile",
    icon: "📝"
  },
  {
    id: 2,
    bubbleText: "up to 8 months*", 
    cardText: "swipe and send likes",
    icon: "📱"
  },
  {
    id: 3,
    bubbleText: "1-3 days",
    cardText: "get matches",
    icon: "💛"
  },
  {
    id: 4,
    bubbleText: "1-3 days",
    cardText: "message back and forth", 
    icon: "💬"
  },
  {
    id: 5,
    bubbleText: "1-2 weeks",
    cardText: "plan a date",
    icon: "🗓️"
  },
  {
    id: 6,
    bubbleText: "WILDCARD",
    cardText: "get ghosted",
    icon: "👻"
  },
  {
    id: 7,
    bubbleText: "WILDCARD",
    cardText: "get unmatched",
    icon: "❌"
  },
  {
    id: 8,
    bubbleText: "1-2 weeks",
    cardText: "go on a first date",
    icon: "☕"
  }
];

export default function StickyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalText, setShowFinalText] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const stepProgress = useTransform(scrollYProgress, [0, 1], [0, timelineSteps.length]);

  useEffect(() => {
    if (!isDesktop) {
      // Original smooth scrolling for mobile/tablet
      const unsubscribe = stepProgress.onChange((latest) => {
        const newStep = Math.floor(latest);
        if (newStep !== currentStep && newStep >= 0 && newStep < timelineSteps.length) {
          setCurrentStep(newStep);
          setShowFinalText(false);
        } else if (newStep >= timelineSteps.length) {
          setShowFinalText(true);
        }
      });
      return unsubscribe;
    } else {
      // Discrete wheel-based scrolling for desktop
      let wheelTimeout: NodeJS.Timeout;
      
      const handleWheel = (e: WheelEvent) => {
        const containerElement = containerRef.current;
        if (!containerElement) return;
        
        const containerRect = containerElement.getBoundingClientRect();
        
        // Check if we're within the sticky timeline section
        if (containerRect.top <= 0 && containerRect.bottom >= window.innerHeight) {
          // Only prevent default if we're actually changing steps
          const shouldPreventDefault = 
            (e.deltaY > 0 && currentStep < timelineSteps.length - 1) ||
            (e.deltaY < 0 && currentStep > 0) ||
            (currentStep >= timelineSteps.length - 1 && e.deltaY > 0 && !showFinalText);
          
          if (shouldPreventDefault) {
            e.preventDefault();
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
              if (e.deltaY > 0 && currentStep < timelineSteps.length - 1) {
                // Scrolling down
                setCurrentStep(prev => prev + 1);
                setShowFinalText(false);
              } else if (e.deltaY < 0 && currentStep > 0) {
                // Scrolling up
                setCurrentStep(prev => prev - 1);
                setShowFinalText(false);
              } else if (currentStep >= timelineSteps.length - 1 && e.deltaY > 0) {
                setShowFinalText(true);
              }
            }, 100); // Debounce to prevent rapid firing
          }
          // If we're at the boundaries and trying to scroll beyond, allow normal scroll
        }
      };
      
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        window.removeEventListener('wheel', handleWheel);
        clearTimeout(wheelTimeout);
      };
    }
  }, [stepProgress, currentStep, isDesktop]);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: `${timelineSteps.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white px-6">
        
        {/* Static Header Text */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <h2 className="text-2xl md:text-3xl font-orbit font-bold text-gray-900 text-center">
            Here&apos;s how a dating app works.
          </h2>
        </div>

        {/* Progress Dots */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3">
          {timelineSteps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 cursor-pointer ${
                index === currentStep 
                  ? 'bg-red-500 scale-125 shadow-lg' 
                  : index < currentStep 
                    ? 'bg-gray-400 hover:bg-red-400' 
                    : 'bg-gray-200 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Go to step {index + 1}</span>
            </motion.button>
          ))}
        </div>

        {/* Red Bubble - Moved above card container */}
        <motion.div
          className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mb-6"
          key={`bubble-${currentStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {timelineSteps[currentStep]?.bubbleText}
        </motion.div>

        {/* Card Container */}
        <div className="relative w-80 h-96 mx-auto">

          {/* Main Card */}
          <motion.div
            className={`w-full h-full rounded-2xl flex flex-col items-center justify-center relative overflow-hidden ${
              currentStep === 5 || currentStep === 6 
                ? 'bg-red-500' 
                : currentStep === 7
                ? 'bg-green-200'
                : 'bg-gray-200'
            }`}
            key={`card-${currentStep}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            
            {/* Card Icon */}
            <motion.div
              className="text-6xl mb-6"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 10 }}
            >
              {timelineSteps[currentStep]?.icon}
            </motion.div>

            {/* Card Text */}
            <motion.h3
              className={`text-xl font-orbit font-medium text-center px-6 ${
                currentStep === 5 || currentStep === 6 
                  ? 'text-white' 
                  : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {timelineSteps[currentStep]?.cardText}
            </motion.h3>

            {/* Footnote for card 2 */}
            {currentStep === 1 && (
              <motion.p
                className="absolute bottom-4 left-4 right-4 text-xs font-inter text-gray-500 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                *the average American swipes 3,960 times before finding a partner
              </motion.p>
            )}

          </motion.div>
        </div>

        {/* Final Text */}
        {showFinalText && (
          <motion.div
            className="absolute top-[750px] left-6 right-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg font-inter text-gray-700 mb-4">
              We&apos;ll say the quiet part out loud ...
            </p>
            <p className="text-xl font-inter font-semibold text-gray-900 mb-8">
              The dating apps don&apos;t care about your relationships goals. 
            </p>
            <p className="text-xl font-inter font-semibold text-gray-900 mb-8">
              If they did, there wouldn&apos;t be this much friction just to go on a date.
            </p>
            
            {/* Downward Arrow */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600"
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  delay: 2,
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path
                  d="M12 5V19M12 19L19 12M12 19L5 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
