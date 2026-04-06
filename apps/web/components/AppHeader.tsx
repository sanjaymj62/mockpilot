'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import type { ReactNode } from 'react';

type AuthPage = 'generator' | 'plans' | 'profile';

type AppHeaderProps =
  | {
      variant: 'landing';
      logoHref?: string;
    }
  | {
      variant: 'authenticated';
      activePage: AuthPage;
      onSignOut: () => Promise<void> | void;
      logoHref?: string;
      showNavigation?: boolean;
      rightContent?: ReactNode;
    };

const styles = {
  baseHeader: {
    borderBottom: '1px solid #1f2937',
    background: '#111',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    marginBottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  stackedWrap: {
    padding: '1.5rem 2rem',
  },
  landingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stackedNav: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  navLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.2s',
  },
  authButton: {
    padding: '0.5rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '0.5rem',
    color: 'white',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },
  signOutButton: {
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '1px solid #374151',
    borderRadius: '0.375rem',
    color: '#9ca3af',
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
};

const hoverNavLink = {
  onMouseEnter: (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#f3f4f6';
  },
  onMouseLeave: (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#9ca3af';
  },
};

function authLinkStyle(active: boolean) {
  if (active) {
    return { ...styles.navLink, color: '#f3f4f6' };
  }

  return styles.navLink;
}

export function AppHeader(props: AppHeaderProps) {
  const logoHref = props.variant === 'authenticated' ? (props.logoHref ?? '/app') : (props.logoHref ?? '/');

  if (props.variant === 'landing') {
    return (
      <header style={styles.baseHeader}>
        <div style={styles.stackedWrap}>
          <div style={styles.landingRow}>
            <Link href={logoHref} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1 style={styles.logo}>MockPilot</h1>
            </Link>
            <nav style={{ ...styles.stackedNav, marginTop: 0 }}>
              <a href="#features" style={styles.navLink} {...hoverNavLink}>
                Features
              </a>
              <a href="#pricing" style={styles.navLink} {...hoverNavLink}>
                Pricing
              </a>
              <Link href="/auth/login" style={styles.navLink} {...hoverNavLink}>
                Login
              </Link>
              <Link
                href="/auth/register"
                style={styles.authButton}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  const showNavigation = props.showNavigation ?? true;

  return (
    <header style={styles.baseHeader}>
      <div style={styles.stackedWrap}>
        <Link href={logoHref} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={styles.logo}>MockPilot</h1>
        </Link>
        {showNavigation && (
          <nav style={styles.stackedNav}>
            <div style={styles.navLinks}>
              <Link
                href="/app"
                style={authLinkStyle(props.activePage === 'generator')}
                {...(props.activePage === 'generator' ? {} : hoverNavLink)}
              >
                Generator
              </Link>
              <Link
                href="/plans"
                style={authLinkStyle(props.activePage === 'plans')}
                {...(props.activePage === 'plans' ? {} : hoverNavLink)}
              >
                Plans
              </Link>
              <Link
                href="/profile"
                style={authLinkStyle(props.activePage === 'profile')}
                {...(props.activePage === 'profile' ? {} : hoverNavLink)}
              >
                Profile
              </Link>
            </div>
            <div style={styles.navActions}>
              {props.rightContent}
              <button
                onClick={props.onSignOut}
                style={styles.signOutButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.color = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#374151';
                  e.currentTarget.style.color = '#9ca3af';
                }}
              >
                Sign Out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
