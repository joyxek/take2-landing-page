'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Hazy animated gradient background - centered */}
      <div className="pointer-events-none absolute inset-0 select-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
        {/* Primary blue blob (#3b5bc3) */}
        <div className="absolute left-1/4 top-[40%] aspect-square w-[40rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,#3b5bc3_0%,transparent_70%)] blur-3xl opacity-60 animate-blob" />
        {/* Supporting color blob (#e3ebc7) */}
        <div className="absolute right-1/5 top-[35%] aspect-square w-[42rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,#e3ebc7_0%,transparent_70%)] blur-3xl opacity-60 animate-blob2" />
        {/* Secondary blue tint (rgb(59,91,195)) for depth */}
        <div className="absolute left-[55%] top-[45%] aspect-square w-[36rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,rgb(59,91,195)_0%,transparent_75%)] blur-3xl opacity-40 animate-blob3" />
        {/* Neon lime accent blob (#E5FF7B) with stronger opacity */}
        <div className="absolute left-[35%] top-[50%] aspect-square w-[30rem] rounded-full bg-[radial-gradient(35%_35%_at_50%_50%,#E5FF7B_0%,transparent_75%)] blur-2xl opacity-70 animate-blob4" />

        {/* Soft color wash behind to mimic the base glow */}
        <div className="absolute inset-0 bg-radial-gradient from-[#3b5bc3]/20 via-[#e3ebc7]/15 to-transparent blur-[40px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-left px-6 max-w-md mx-auto">
        {/* Category Label */}
        <motion.p
          className="text-sm font-inter text-gray-500 mb-4 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          DATING EVENTS
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          className="text-4xl md:text-5xl font-gilda-display font-bold text-gray-900 leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Meet people you&apos;re{' '}
          <span className="block">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-black">
              <em>ACTUALLY</em>
            </span>
          </span>
          <span className="block">
            compatible with
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-base font-inter text-gray-600 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          We cut the stress of date planning and asking people out.
          You stick to meeting the right people.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.button
            onClick={() => window.open('https://form.typeform.com/to/llHovcds', '_blank')}
            className="bg-[#3b5bc3] hover:bg-[#2d4aa3] text-white font-inter  px-8 py-3 rounded-full text-base shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
          </motion.button>
        </motion.div>
      </div>

      {/* Blob Animation Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(-3%, -4%, 0) scale(1.05); }
          66% { transform: translate3d(3%, -2%, 0) scale(0.98); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes blob2 {
          0% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(2%, -6%, 0) scale(1.03); }
          66% { transform: translate3d(-2%, -3%, 0) scale(1.01); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes blob3 {
          0% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(-1%, -2%, 0) scale(1.08); }
          66% { transform: translate3d(1%, -5%, 0) scale(0.96); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes blob4 {
          0% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(4%, -3%, 0) scale(1.04); }
          66% { transform: translate3d(-3%, -6%, 0) scale(0.97); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        .animate-blob { animation: blob 18s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 22s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 26s ease-in-out infinite; }
        .animate-blob4 { animation: blob4 20s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
