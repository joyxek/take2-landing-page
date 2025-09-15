'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual email capture service
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Email Capture Section */}
        <div className="text-center mb-12 pb-12 border-b border-neutral-700">
          <h3 className="text-3xl font-instrument font-bold mb-4">Stay in the Loop</h3>
          <p className="font-carlita text-neutral-300 mb-6 max-w-2xl mx-auto">
            Get notified when Take2 events are happening in your city. No spam, just real opportunities to meet compatible singles.
          </p>
          
          {isSubmitted ? (
            <div className="bg-accent-green/20 border border-accent-green/30 rounded-lg p-4 max-w-md mx-auto">
              <p className="font-carlita text-accent-green font-semibold">
                ✅ Thanks! We'll keep you updated on events in your area.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full font-carlita text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-green"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent-green text-primary px-6 py-3 rounded-full font-carlita font-bold hover:bg-accent-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Join List'}
              </button>
            </form>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-instrument font-bold mb-4">Take2</h3>
            <p className="font-carlita text-neutral-300 leading-relaxed max-w-md">
              An invite-only dating event where singles in your city meet IRL. 
              Skip the apps, skip the stress - just show up to meet compatible singles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-instrument font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-carlita text-neutral-300">
              <li><a href="#how-it-works" className="hover:text-accent-green transition-colors">How It Works</a></li>
              <li><a href="/apply" className="hover:text-accent-green transition-colors">Apply Now</a></li>
              <li><a href="#faq" className="hover:text-accent-green transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-accent-green transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-instrument font-bold mb-4">Cities</h4>
            <ul className="space-y-2 font-carlita text-neutral-300">
              <li>New York</li>
              <li>San Francisco</li>
              <li>Los Angeles</li>
              <li className="text-accent-green">More coming soon...</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-carlita text-neutral-400 text-sm">
            © 2024 Take2. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="font-carlita text-neutral-400 hover:text-accent-green text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-carlita text-neutral-400 hover:text-accent-green text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
