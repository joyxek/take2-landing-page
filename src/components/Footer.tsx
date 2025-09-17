'use client';

import { useState } from 'react';

export default function Footer() {




  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Event Link Section */}
        <div className="text-center mb-12 pb-12 border-b border-neutral-700">
          <h3 className="text-3xl font-instrument font-bold mb-4">Join Our Events</h3>
          <p className="font-carlita text-neutral-300 mb-6 max-w-2xl mx-auto">
            Check out upcoming Take2 events in your city and RSVP directly.
          </p>
          
          <div className="w-full max-w-md mx-auto px-4">
            <a 
              href="https://lu.ma/taketwo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-accent-green text-primary px-8 py-4 rounded-full font-carlita font-bold text-lg text-center hover:bg-accent-green/90 transition-colors shadow-lg"
            >
              View Events on Luma
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-instrument font-bold mb-4">Take2</h3>
            <p className="font-carlita text-neutral-300 leading-relaxed max-w-md">
              An invite-only dating event where singles in your city meet IRL. 
              Skip the apps, skip the stress - just show up to meet compatible singles.
            </p>
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
            &copy; 2024 Take2. All rights reserved.
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
