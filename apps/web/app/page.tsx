'use client';

import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import { CookieConsent } from '@/components/CookieConsent';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <AppHeader variant="landing" />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          10x Your Team's <br />
          <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Development Productivity</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
          Generate production-ready HTTP request files from OpenAPI specs<br />
          with realistic mock data in seconds, not hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link 
            href="/app" 
            className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all no-underline inline-block"
          >
            Try Now - No Registration Required
          </Link>
        </div>
        <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> No User Tracking
          </span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> No Analytics
          </span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> GDPR Compliant
          </span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Your Data Stays Private
          </span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16">Why Development Teams Choose MockPilot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Generate complete HTTP request files in seconds. Stop wasting hours writing boilerplate API calls.' },
            { icon: '🎯', title: 'Realistic Mock Data', desc: 'Powered by Faker.js, generate realistic test data that matches your API schema perfectly.' },
            { icon: '🔧', title: 'VS Code Compatible', desc: 'Generated .http files work seamlessly with VS Code REST Client and other popular tools.' },
            { icon: '📦', title: 'OpenAPI Support', desc: 'Supports OpenAPI 3.0 and Swagger 2.0 specifications out of the box.' },
            { icon: '🚀', title: 'CLI for Teams', desc: 'Automate with our powerful CLI. Perfect for CI/CD pipelines and team workflows.' },
            { icon: '🤖', title: 'AI-Powered Testing', desc: 'Professional tier includes AI-based context-aware test data generation for edge cases.' },
          ].map((feature, i) => (
            <div 
              key={i}
              className="p-8 bg-[#111] border border-gray-800 rounded-2xl hover:-translate-y-1 hover:border-[#667eea] transition-all cursor-pointer"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-24 bg-[#0a0a0a]">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free */}
          <div className="p-8 bg-[#111] border border-gray-800 rounded-2xl">
            <div className="text-gray-400 mb-2">Free</div>
            <div className="text-5xl font-bold mb-2">$0</div>
            <div className="text-gray-400 mb-8">Forever free</div>
            <ul className="space-y-3 mb-8">
              {['Web-based generator', '3 generations per session', 'OpenAPI 3.0 & Swagger 2.0', 'Realistic mock data', 'VS Code compatible'].map((f, i) => (
                <li key={i} className="text-gray-300 border-b border-gray-800 pb-3">✓ {f}</li>
              ))}
            </ul>
            <Link href="/app" className="block w-full py-4 bg-gray-800 border border-gray-700 rounded-lg text-center text-white hover:bg-gray-700 transition-colors no-underline">
              Try Now
            </Link>
          </div>

          {/* Team */}
          <div className="p-8 bg-[#111] border-2 border-[#667eea] rounded-2xl transform md:scale-105 relative">
            <div className="absolute -top-3 right-5 px-4 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full text-xs font-bold">
              MOST POPULAR
            </div>
            <div className="text-gray-400 mb-2">Team</div>
            <div className="text-5xl font-bold mb-2">$29</div>
            <div className="text-gray-400 mb-8">one-time</div>
            <ul className="space-y-3 mb-8">
              {['Everything in Free', 'Unlimited generations', 'CLI tool access', 'CI/CD integration', 'Priority support', 'Team collaboration'].map((f, i) => (
                <li key={i} className="text-gray-300 border-b border-gray-800 pb-3">✓ {f}</li>
              ))}
            </ul>
            <button className="w-full py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg text-white font-bold hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>

          {/* Pro */}
          <div className="p-8 bg-[#111] border border-gray-800 rounded-2xl">
            <div className="text-gray-400 mb-2">Professional</div>
            <div className="text-5xl font-bold mb-2">$99</div>
            <div className="text-gray-400 mb-8">one-time</div>
            <ul className="space-y-3 mb-8">
              {['Everything in Team', 'AI-powered test data', 'Context-aware generation', 'Edge case detection', 'Custom data patterns', 'Dedicated support'].map((f, i) => (
                <li key={i} className="text-gray-300 border-b border-gray-800 pb-3">✓ {f}</li>
              ))}
            </ul>
            <button className="w-full py-4 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 text-center text-gray-500">
        <p>© 2026 MockPilot. Open source and built with ❤️ for developers.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          <Link href="/legal/disclaimer" className="text-gray-400 hover:text-gray-300 no-underline">Disclaimer</Link>
          <Link href="/legal/faq" className="text-gray-400 hover:text-gray-300 no-underline">FAQ</Link>
          <Link href="/legal/privacy" className="text-gray-400 hover:text-gray-300 no-underline">Privacy</Link>
          <Link href="/legal/terms" className="text-gray-400 hover:text-gray-300 no-underline">Terms</Link>
        </div>
      </footer>

      <CookieConsent />
    </div>
  );
}