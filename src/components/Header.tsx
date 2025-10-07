'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 p-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="cursor-pointer bg-transparent border-none p-2 relative z-50 pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label="Return to top"
          >
            <Image
              src="/Take 2 Logo - Color copy.png"
              alt="Take2 Logo"
              width={350}
              height={75}
              className="h-10 w-auto cursor-pointer"
              priority
            />
          </motion.button>

          {/* Hamburger Menu */}
          <motion.button
            className="p-3 relative z-50 cursor-pointer bg-transparent hover:bg-gray-200 rounded-lg transition-colors"
            onClick={toggleMenu}
            type="button"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 h-0.5 bg-[#3b5bc3] mb-1.5"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-[#3b5bc3] mb-1.5"
              animate={{
                opacity: isMenuOpen ? 0 : 1
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-[#3b5bc3]"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center min-h-screen">
              <motion.nav
                className="text-center space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <motion.a
                  href="https://form.typeform.com/to/pDkrBtdV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-2xl font-orbit font-bold text-gray-900 hover:text-[#3b5bc3] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apply Now
                </motion.a>
                
                <motion.a
                  href="https://instagram.com/take2.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-2xl font-orbit font-bold text-gray-900 hover:text-[#3b5bc3] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Instagram
                </motion.a>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
