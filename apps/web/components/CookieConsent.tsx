'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_KEY = 'mockpilot_cookie_consent';

const styles = {
  banner: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: '#111',
    borderTop: '1px solid #1f2937',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
  },
  text: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
  link: {
    color: '#667eea',
    textDecoration: 'underline',
  },
  buttons: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  acceptButton: {
    padding: '0.625rem 1.25rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '0.5rem',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  declineButton: {
    padding: '0.625rem 1.25rem',
    background: 'transparent',
    border: '1px solid #374151',
    borderRadius: '0.5rem',
    color: '#9ca3af',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

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
    <div style={styles.banner}>
      <div style={styles.text}>
        We use <strong>only essential cookies</strong> for authentication and security. 
        We do NOT use analytics or tracking cookies. 
        By using MockPilot, you agree to our{' '}
        <Link href="/legal/cookies" style={styles.link}>Cookie Policy</Link> and{' '}
        <Link href="/legal/privacy" style={styles.link}>Privacy Policy</Link>.
      </div>
      <div style={styles.buttons}>
        <button
          style={styles.declineButton}
          onClick={handleDecline}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#667eea';
            e.currentTarget.style.color = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#374151';
            e.currentTarget.style.color = '#9ca3af';
          }}
        >
          Decline
        </button>
        <button
          style={styles.acceptButton}
          onClick={handleAccept}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Accept
        </button>
      </div>
    </div>
  );
}