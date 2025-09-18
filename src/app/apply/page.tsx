'use client';

import { useEffect } from 'react';

export default function ApplyPage() {
  useEffect(() => {
    // TODO: Replace with actual Take2 application form URL
    // Example: window.location.href = 'https://airtable.com/shrXXXXXXXXXXXXXX';
    // Or: window.location.href = 'https://typeform.com/to/XXXXXXXXX';
    window.location.href = 'https://forms.gle/REPLACE-WITH-ACTUAL-TAKE2-FORM-ID';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-green/10 via-transparent to-accent-blue/10">
      <div className="text-center px-6">
        <div className="mb-8" aria-label="Loading">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" role="status" aria-hidden="true"></div>
        </div>
        <h1 className="text-2xl font-instrument font-bold text-primary mb-4">
          Redirecting to Application...
        </h1>
        <p className="text-lg font-carlita text-neutral-600 mb-6">
          You&apos;re being redirected to our secure application form.
        </p>
        <p className="text-sm font-carlita text-neutral-500">
          If you&apos;re not redirected automatically, 
          <a 
            href="https://forms.gle/REPLACE-WITH-ACTUAL-TAKE2-FORM-ID" 
            className="text-primary hover:underline ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}
