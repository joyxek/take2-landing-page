'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';



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
  const [currentStep, setCurrentStep] = useState(0);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const nextStep = () => {
    if (currentStep < timelineSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };




  const handleApplyNow = () => {
    window.open('https://form.typeform.com/to/llHovcds', '_blank');
  };

  return (
    <div className="relative bg-white py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        
            
          
        

        {/* CTA under Carousel */}
        <div className="flex justify-center mb-12">
          <motion.button
            onClick={handleApplyNow}
            className="bg-[#3b5bc3] hover:bg-[#2d4aa3] text-white font-inter px-8 py-3 rounded-full text-base shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
          </motion.button>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto">
          {/* Header Text */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbit font-bold text-gray-900 mb-8">
              Here&apos;s how a dating app works.
            </h2>
          </div>

        {/* Progress Dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 sm:space-x-3">
            {timelineSteps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-150 cursor-pointer ${
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
        </div>

        {/* Card and Navigation Container */}
        <div className="flex flex-col items-center">
          {/* Red Bubble */}
          <motion.div
            className="bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap mb-4 sm:mb-6 max-w-[90vw] overflow-hidden text-ellipsis"
            key={`bubble-${currentStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {timelineSteps[currentStep]?.bubbleText}
          </motion.div>

          {/* Card Container */}
          <div className="relative w-72 h-80 sm:w-80 sm:h-96 mx-auto max-w-[90vw] mb-8">
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
              <div className="flex flex-col items-center justify-center h-full w-full px-4 sm:px-6 text-center">
                {/* Card Icon */}
                <motion.div
                  className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 10 }}
                >
                  {timelineSteps[currentStep]?.icon}
                </motion.div>

                {/* Card Text */}
                <motion.h3
                  className={`text-lg sm:text-xl font-orbit font-medium ${
                    currentStep === 5 || currentStep === 6 
                      ? 'text-white' 
                      : 'text-gray-900'
                  } break-words`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {timelineSteps[currentStep]?.cardText}
                </motion.h3>
              </div>

              {/* Footnote for card 2 */}
              {currentStep === 1 && (
                <motion.p
                  className="absolute bottom-4 left-4 right-4 text-xs font-inter text-gray-500 text-center break-words"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  *the average American swipes 3,960 times before finding a partner
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center space-x-6">
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                currentStep === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-110'
              }`}
              whileHover={currentStep > 0 ? { scale: 1.1 } : {}}
              whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button
              onClick={nextStep}
              disabled={currentStep === timelineSteps.length - 1}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                currentStep === timelineSteps.length - 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-110'
              }`}
              whileHover={currentStep < timelineSteps.length - 1 ? { scale: 1.1 } : {}}
              whileTap={currentStep < timelineSteps.length - 1 ? { scale: 0.95 } : {}}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Final Text Section - Always visible */}
        <div className="mt-16 text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-base md:text-lg font-inter text-gray-700 mb-4">
              We&apos;ll say the quiet part out loud ...
            </p>
            <p className="text-lg md:text-xl font-inter font-semibold text-gray-900 mb-6">
              The dating apps don&apos;t care about your relationship goals. 
            </p>
            <p className="text-lg md:text-xl font-inter font-semibold text-gray-900 mb-8">
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
        </div>
        </div>
      </div>
    </div>
  );
}
