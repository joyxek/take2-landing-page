'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "apply with your preferences",
    description: "Take 2-4 minutes to apply with your dating preferences.",
    type: "form",
    icon: "📝",
    gradient: "from-blue-500 via-teal-400 to-green-400",
    accentColor: "text-blue-300",
    bgPattern: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)"
  },
  {
    id: 2,
    title: "get matched into an event",
    description: "We evaluate profiles to curate invites to our events. We'll place you in an event with the most amount of compatible singles.",
    type: "matching",
    icon: "🎯",
    gradient: "from-teal-500 via-cyan-400 to-yellow-400",
    accentColor: "text-teal-300",
    bgPattern: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 50%)"
  }
];

// Cards used in the follow-up carousel section
const hwCarouselCards = [
  {
    id: 1,
    title: "Your profile is reviewed by our Team",
    description:
      "Our team personally reviews each application and places you in the right room based on your application. Your profile stays active for future events even if you can’t make the first one.",
  },
  {
    id: 2,
    title: "Matching work",
    description:
      "We do the hard part. Leave it up to us to build the right-sized event, balance the room, and make sure everyone there belongs there.",
  },
  {
    id: 3,
    title: "Tailored Event Experience",
    description:
      "Imagine walking into a room where everyone’s already been vetted and chosen for you. We want to build you the kind of meet-cute moment you’ve been waiting for.",
  },
  {
    id: 4,
    title: "Your $10 is a membership",
    description:
      "Your profile stays active and we will place you in events for as long as you want.",
  },
];

// Form Selection Animation Component
const FormMockup = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  const options = [
    "Dating Values",
    "Age",
    "Ethnicity", 
    " ",
    " "
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedOptions(prev => {
        if (prev.length >= 4) {
          return [];
        }
        const nextIndex = prev.length;
        return [...prev, nextIndex];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 rounded-2xl p-6 max-w-xs mx-auto">
      <div className="text-gray-800 text-sm font-medium mb-4">What matters to you?</div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <motion.div
            key={`${option}-${index}`}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-500 ${
              selectedOptions.includes(index) 
                ? 'bg-green-200 text-green-800' 
                : 'bg-white text-gray-600'
            }`}
            animate={{
              backgroundColor: selectedOptions.includes(index) ? '#bbf7d0' : '#ffffff',
              scale: selectedOptions.includes(index) ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {option}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 bg-gray-300 rounded-full h-2">
        <motion.div 
          className="bg-green-400 h-2 rounded-full"
          animate={{ width: `${(selectedOptions.length / 4) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

// Emoji People Animation Component  
const EmojiPeople = () => {
  const people = ['👨‍💼', '👩‍🎨', '👨‍🔬', '👩‍💻', '👨‍🍳', '👩‍⚕️'];
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {people.map((emoji, index) => (
        <motion.div
          key={index}
          className="text-4xl"
          initial={{ scale: 0, y: -100, rotate: -180 }}
          whileInView={{ scale: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: 0.8 + (index * 0.15),
            type: "spring",
            damping: 8,
            stiffness: 120,
            duration: 0.8
          }}
        >
          {emoji}
        </motion.div>
      ))}
      <motion.div
        className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium ml-4"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(250, 204, 21, 0)",
            "0 0 20px rgba(250, 204, 21, 0.6)",
            "0 0 0px rgba(250, 204, 21, 0)"
          ],
          rotate: [0, -2, 2, -1, 1, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          // Initial animation (whileInView)
          delay: 2.7,
          type: "spring",
          damping: 10,
          // Looping animations (animate)
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          },
          rotate: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            delay: 3
          },
          scale: {
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 2.7,
            delay: 3
          }
        }}
      >
        matched
      </motion.div>
    </div>
  );
};

export default function HowItWorks() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const nextCarouselCard = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % hwCarouselCards.length);
  };

  const prevCarouselCard = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + hwCarouselCards.length) % hwCarouselCards.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-orbit font-bold text-gray-900 mb-4">
            How it works.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Text Content */}
              <div className={`flex-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <motion.h3
                  className="text-2xl md:text-3xl font-orbit font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.2) }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 font-inter leading-relaxed"
                  initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.2) }}
                >
                  {step.description}
                </motion.p>
                
                {/* CTA Button moved to StickyTimeline carousel section */}
              </div>

              {/* Visual Content */}
              <div className={`flex-1 flex justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                {step.type === 'form' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (index * 0.2) }}
                  >
                    <FormMockup />
                  </motion.div>
                )}
                
                {step.type === 'matching' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (index * 0.2) }}
                  >
                    <EmojiPeople />
                  </motion.div>
                )}
                
                {/* Removed former CTA visual step */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Once we've received your application */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-8">
            <motion.h3
              className="text-2xl md:text-3xl font-orbit font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              once we&apos;ve received your application:
            </motion.h3>
          </div>

          {/* Cards: desktop grid matches StickyTimeline */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {hwCarouselCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="bg-gray-200 rounded-2xl p-6 flex flex-col h-full overflow-hidden min-w-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h4 className="font-orbit font-semibold text-gray-900 text-sm mb-4 leading-tight break-words hyphens-auto">
                  {card.title}
                </h4>
                <p className="font-inter text-xs text-gray-700 leading-relaxed flex-1 break-words hyphens-auto">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile View - Carousel copied from StickyTimeline */}
          <div className="md:hidden">
            <div className="relative">
              <motion.div
                className="bg-gray-200 rounded-2xl p-8 min-h-[16rem] flex flex-col mx-6"
                key={`hw-carousel-${currentCarouselIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-orbit font-semibold text-gray-900 text-base mb-4 leading-tight">
                  {hwCarouselCards[currentCarouselIndex].title}
                </h4>
                <p className="font-inter text-sm text-gray-700 leading-relaxed flex-1">
                  {hwCarouselCards[currentCarouselIndex].description}
                </p>
              </motion.div>

              {/* Navigation Arrows */}
              <button
                onClick={prevCarouselCard}
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={nextCarouselCard}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Dots Indicator intentionally omitted to match StickyTimeline current design */}
          </div>
        </div>
      </div>
    </section>
  );
}
