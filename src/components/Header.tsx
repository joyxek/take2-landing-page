'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const { scrollY } = useScroll();
  
  // Fade out logo as user scrolls down
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const logoY = useTransform(scrollY, [0, 200], [0, -20]);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 p-6"
      style={{
        opacity: logoOpacity,
        y: logoY
      }}
    >
      <div className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src="/Take 2 Logo - color copy.svg"
            alt="Take2 Logo"
            width={200}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </motion.div>
      </div>
    </motion.header>
  );
}
