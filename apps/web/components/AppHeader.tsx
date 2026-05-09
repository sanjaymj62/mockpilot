'use client';

import Link from 'next/link';
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

const gradientClass = 'bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent';

export function AppHeader(props: AppHeaderProps) {
  const logoHref = props.variant === 'authenticated' ? (props.logoHref ?? '/') : (props.logoHref ?? '/');

  if (props.variant === 'landing') {
    return (
      <header className="border-b border-gray-800 bg-[#111]">
        <div className="px-4 md:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <Link href={logoHref} className="no-underline">
<h1 className={`text-2xl font-bold ${gradientClass}`}>MockPilot</h1>
          </Link>
          <nav className="flex flex-wrap items-center gap-3 md:gap-6 justify-center md:justify-end">
            <Link href="#features" className="text-gray-400 text-sm hover:text-gray-200 transition-colors no-underline">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-400 text-sm hover:text-gray-200 transition-colors no-underline">
              Pricing
            </Link>
            <Link href="/auth/login" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 text-sm hover:bg-gray-700 hover:text-gray-200 transition-all no-underline">
              Login
            </Link>
            <Link href="/auth/register" className="px-6 py-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg text-white text-sm hover:opacity-90 transition-opacity no-underline">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  const showNavigation = props.showNavigation ?? true;

  return (
    <header className="border-b border-gray-800 bg-[#111]">
      <div className="px-4 md:px-8 py-4 md:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href={logoHref} className="no-underline">
            <h1 className={`text-xl md:text-2xl font-bold ${gradientClass}`}>MockPilot</h1>
          </Link>
          {showNavigation && (
            <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex gap-2 flex-wrap">
                <Link
                  href="/app"
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm transition-all no-underline ${
                    props.activePage === 'generator'
                      ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                      : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  Generator
                </Link>
                <Link
                  href="/plans"
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm transition-all no-underline ${
                    props.activePage === 'plans'
                      ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                      : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  Plans
                </Link>
                <Link
                  href="/profile"
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm transition-all no-underline ${
                    props.activePage === 'profile'
                      ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                      : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  }`}
                >
                  Profile
                </Link>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {props.rightContent}
                <button
                  onClick={props.onSignOut}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-transparent border border-gray-700 rounded-md text-xs md:text-sm text-gray-400 hover:border-[#667eea] hover:text-gray-200 transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}