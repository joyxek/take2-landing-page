'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "Apply once",
    description: "Fill out a short profile with basics, preferences, and values.",
    icon: "📝"
  },
  {
    title: "Get matched into events",
    description: "We place you in an event with singles who already fit your basics.",
    icon: "🎯"
  },
  {
    title: "Show up & connect",
    description: "We remove all the stress of logistics; you just focus on being yourself.",
    icon: "✨"
  }
];

export default function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    if (isDownSwipe && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }

    // Prevent body scroll with modal-open class
    document.body.classList.add('modal-open');
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Tab cycling
      if (e.key === 'Tab' && focusableElements) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'ArrowUp' && currentStep > 0) {
        setCurrentStep(currentStep - 1);
      } else if (e.key === 'ArrowDown' && currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose, currentStep]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 id="modal-title" className="text-2xl font-bold text-gray-900">How It Works</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Steps Container */}
            <div
              id="modal-description"
              className="relative h-96 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              aria-live="polite"
              aria-label={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep]?.title}`}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  initial={{ y: index === 0 ? 0 : 100, opacity: index === 0 ? 1 : 0 }}
                  animate={{
                    y: index === currentStep ? 0 : index < currentStep ? -100 : 100,
                    opacity: index === currentStep ? 1 : 0,
                    scale: index === currentStep ? 1 : 0.98
                  }}
                  transition={{ 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 300,
                    duration: 0.4
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="text-6xl mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: index === currentStep ? 1 : 0 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-xl font-bold text-gray-900 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: index === currentStep ? 0 : 20, 
                      opacity: index === currentStep ? 1 : 0 
                    }}
                    transition={{ delay: 0.3 }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-gray-600 leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: index === currentStep ? 0 : 20, 
                      opacity: index === currentStep ? 1 : 0 
                    }}
                    transition={{ delay: 0.4 }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              ))}

              {/* Rubber band effect indicators */}
              {currentStep === 0 && (
                <motion.div
                  className="absolute top-4 left-1/2 transform -translate-x-1/2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ChevronLeft className="text-gray-300" size={20} />
                </motion.div>
              )}
              
              {currentStep === steps.length - 1 && (
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ChevronRight className="text-gray-300" size={20} />
                </motion.div>
              )}
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center space-x-2 p-4 border-t border-gray-100" role="tablist" aria-label="Step navigation">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentStep 
                      ? 'bg-primary scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  role="tab"
                  aria-selected={index === currentStep}
                  aria-label={`Go to step ${index + 1}: ${step.title}`}
                />
              ))}
            </div>

            {/* CTA Button (appears on last step) */}
            {currentStep === steps.length - 1 && (
              <motion.div
                className="p-6 pt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={onClose}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-full transition-colors"
                  aria-label="Close modal and return to main page"
                >
                  Got it! Show me more
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
