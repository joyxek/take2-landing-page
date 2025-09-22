'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden py-16">
      {/* Hazy animated gradient background - matching HeroSection */}
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
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Event Link Section */}
        <motion.div 
          className="text-center mb-12 pb-12 border-b border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-orbit font-bold mb-4 text-gray-900">Feeling spontaneous? Join an event now.</h3>
          <p className="font-inter text-gray-600 mb-6 max-w-2xl mx-auto">
            Check out upcoming Take2 events in your city and RSVP directly.
          </p>
          
          <motion.div 
            className="w-full max-w-md mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => window.open('https://lu.ma/taketwo', '_blank')}
              className="w-full bg-[#3b5bc3] hover:bg-[#2d4aa3] text-white font-inter px-8 py-3 rounded-full text-base shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Events on Luma
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-orbit font-bold mb-4 text-gray-900">Take2</h3>
            <p className="font-inter text-gray-600 leading-relaxed max-w-md">
              An invite-only dating event where singles in your city meet IRL. 
              Skip the apps, skip the stress - just show up to meet compatible singles.
            </p>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-orbit font-bold mb-4 text-gray-900">Cities</h4>
            <ul className="space-y-2 font-inter text-gray-600">
              <li>New York</li>
              <li>San Francisco</li>
              <li>Los Angeles</li>
              <li className="text-[#3b5bc3]">More coming soon...</li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="font-inter text-gray-500 text-sm">
            &copy; 2024 Take2. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="font-inter text-gray-500 hover:text-[#3b5bc3] text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-inter text-gray-500 hover:text-[#3b5bc3] text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Blob Animation Styles - matching HeroSection */}
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
    </footer>
  );
}
