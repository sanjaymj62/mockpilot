'use client';

import { useState } from 'react';
import Link from 'next/link';

const COOKIE_KEY = 'mockpilot_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const consent = localStorage.getItem(COOKIE_KEY);
    return !consent;
  });

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-gray-800 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 z-50 shadow-lg">
      <div className="text-sm text-gray-400 text-center md:text-left">
        <span className="font-medium">We use only essential cookies</span> for authentication and security. 
        We do NOT use analytics or tracking cookies. 
        By using MockPilot, you agree to our{' '}
        <Link href="/legal/cookies" className="text-[#667eea] underline hover:text-[#764ba2]">Cookie Policy</Link> and{' '}
        <Link href="/legal/privacy" className="text-[#667eea] underline hover:text-[#764ba2]">Privacy Policy</Link>.
      </div>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={handleDecline}
          className="px-5 py-2.5 bg-transparent border border-gray-700 rounded-lg text-gray-400 text-sm hover:border-[#667eea] hover:text-gray-200 transition-all cursor-pointer"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-5 py-2.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Accept
        </button>
      </div>
    </div>
  );
}