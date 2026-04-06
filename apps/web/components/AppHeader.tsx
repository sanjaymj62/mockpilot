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
      layout?: 'stacked' | 'inline';
      subtitle?: string;
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
  },
  logoGradient: {
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  inlineNav: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inlineNavLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  stackedWrap: {
    padding: '1.5rem 2rem',
  },
  inlineAuthWrap: {
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inlineAuthLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    margin: '0.25rem 0 0 0',
  },
  stackedNav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    marginTop: '1rem',
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
  const logoHref = props.logoHref ?? '/';

  if (props.variant === 'landing') {
    return (
      <header style={styles.baseHeader}>
        <nav style={styles.inlineNav}>
          <div style={styles.logoGradient}>MockPilot</div>
          <div style={styles.inlineNavLinks}>
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
          </div>
        </nav>
      </header>
    );
  }

  const showNavigation = props.showNavigation ?? true;
  const layout = props.layout ?? 'stacked';

  if (layout === 'inline') {
    return (
      <header style={styles.baseHeader}>
        <div style={styles.inlineAuthWrap}>
          <div style={styles.inlineAuthLeft}>
            <Link href={logoHref} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1 style={styles.logo}>MockPilot</h1>
            </Link>
            {showNavigation && (
              <nav style={{ ...styles.stackedNav, marginTop: 0 }}>
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
              </nav>
            )}
          </div>
          {props.rightContent}
        </div>
        {props.subtitle && <p style={{ ...styles.subtitle, padding: '0 1.5rem 1rem 1.5rem' }}>{props.subtitle}</p>}
      </header>
    );
  }

  return (
    <header style={styles.baseHeader}>
      <div style={styles.stackedWrap}>
        <Link href={logoHref} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={styles.logo}>MockPilot</h1>
        </Link>
        {showNavigation && (
          <nav style={styles.stackedNav}>
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
          </nav>
        )}
      </div>
    </header>
  );
}
