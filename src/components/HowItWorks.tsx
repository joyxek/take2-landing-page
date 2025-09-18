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
  },
  {
    id: 3,
    title: "secure your spot and date IRL",
    description: "We remove all the stress of dating logistics so you can focus on being yourself and dating IRL. Apply now, get matched, and secure your event just for $10.",
    type: "cta",
    icon: "✨",
    gradient: "from-green-400 via-lime-400 to-yellow-300",
    accentColor: "text-green-300",
    bgPattern: "radial-gradient(circle at 40% 60%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(255,255,255,0.15) 0%, transparent 50%)"
  }
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
  const handleScrollToApplication = () => {
    window.open('https://form.typeform.com/to/llHovcds', '_blank');
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
                
                {/* CTA Button on last step */}
                {step.type === 'cta' && (
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (index * 0.2) }}
                  >
                    <motion.button
                      onClick={handleScrollToApplication}
                      className="bg-[#3b5bc3] hover:bg-[#2d4aa3] text-white font-inter px-8 py-3 rounded-full text-base shadow-lg transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply Now
                    </motion.button>
                  </motion.div>
                )}
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
                
                {step.type === 'cta' && (
                  <motion.div
                    className="text-6xl"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (index * 0.2), type: "spring" }}
                  >
                    
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
