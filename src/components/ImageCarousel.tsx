'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

// Placeholder images - you can replace these with your actual image paths
const carouselImages = [
  '/take2social-3 copy.jpg',
  '/take2social-7 copy.jpg',
  '/take2social-8 copy.jpg',
  '/take2social-12 copy.jpg',
  '/take2social-13 copy.jpg',
  '/take2social-15 copy.jpg',
  '/take2social-20 copy.jpg',
  '/take2social-25 copy.jpg',
  '/take2social-27 copy.jpg',
  '/take2social-11 copy.jpg',
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const [isInView, setIsInView] = useState(false);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      carouselImages.forEach((src, index) => {
        const img = new window.Image();
        img.onload = () => {
          setImagesLoaded(prev => new Set([...prev, index]));
        };
        img.src = src;
      });
    };

    if (isInView) {
      preloadImages();
    }
  }, [isInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleInView = useCallback(() => {
    setIsInView(true);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={handleInView}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-gilda-display font-bold text-gray-900 mb-4">
            This is our first time doing this.
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel Track */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * (300 + 24)}px` // 300px width + 24px gap
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            >
              {/* Duplicate images for seamless loop */}
              {[...carouselImages, ...carouselImages].map((image, index) => {
                const originalIndex = index % carouselImages.length;
                const isLoaded = imagesLoaded.has(originalIndex);
                const isVisible = Math.abs(index - currentIndex) <= 2 || Math.abs(index - (currentIndex + carouselImages.length)) <= 2;
                
                return (
                  <motion.div
                    key={`${image}-${index}`}
                    className="flex-shrink-0 w-[300px] h-[300px] rounded-2xl overflow-hidden bg-gray-200 shadow-lg relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Loading placeholder */}
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    <Image
                      src={image}
                      alt={`Take2 event ${originalIndex + 1}`}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={index < 3} // Prioritize first 3 images
                      quality={85}
                      sizes="(max-width: 768px) 280px, 300px"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 mb-12 space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#3b5bc3] scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Delayed Text */}
        <motion.div
          className="text-center mt-8 mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl md:text-4xl font-gilda-display font-bold text-gray-900 mb-4">
            Well... the applications, not the dating events.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

