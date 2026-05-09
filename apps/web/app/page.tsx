'use client';

import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import { CookieConsent } from '@/components/CookieConsent';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f3f4f6',
  },
  hero: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '8rem 2rem',
    textAlign: 'center' as const,
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: 'bold' as const,
    marginBottom: '1.5rem',
    lineHeight: '1.2',
  },
  gradient: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    color: '#9ca3af',
    marginBottom: '3rem',
    lineHeight: '1.6',
  },
  ctaButton: {
    padding: '1rem 3rem',
    fontSize: '1.25rem',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
    textDecoration: 'none',
    display: 'inline-block',
  },
  features: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '6rem 2rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    marginBottom: '4rem',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  featureCard: {
    padding: '2rem',
    background: '#111',
    border: '1px solid #1f2937',
    borderRadius: '1rem',
    transition: 'transform 0.2s, border-color 0.2s',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold' as const,
    marginBottom: '0.75rem',
  },
  featureDesc: {
    color: '#9ca3af',
    lineHeight: '1.6',
  },
  pricing: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '6rem 2rem',
    background: '#0a0a0a',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  pricingCard: {
    padding: '2.5rem',
    background: '#111',
    border: '1px solid #1f2937',
    borderRadius: '1rem',
    position: 'relative' as const,
  },
  pricingCardPopular: {
    border: '2px solid #667eea',
    transform: 'scale(1.05)',
  },
  popularBadge: {
    position: 'absolute' as const,
    top: '-12px',
    right: '20px',
    padding: '0.25rem 1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: 'bold' as const,
  },
  pricingTier: {
    fontSize: '1rem',
    color: '#9ca3af',
    marginBottom: '0.5rem',
  },
  pricingPrice: {
    fontSize: '3rem',
    fontWeight: 'bold' as const,
    marginBottom: '0.5rem',
  },
  pricingPeriod: {
    color: '#9ca3af',
    marginBottom: '2rem',
  },
  pricingFeatures: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '2rem',
  },
  pricingFeature: {
    padding: '0.75rem 0',
    color: '#d1d5db',
    borderBottom: '1px solid #1f2937',
  },
  pricingButton: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    background: '#1f2937',
    color: 'white',
    border: '1px solid #374151',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center' as const,
  },
  pricingButtonPrimary: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
  },
  footer: {
    borderTop: '1px solid #1f2937',
    padding: '3rem 2rem',
    textAlign: 'center' as const,
    color: '#6b7280',
  },
};

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <AppHeader variant="landing" />

      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          10x Your Team's <br />
          <span style={styles.gradient}>Development Productivity</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Generate production-ready HTTP request files from OpenAPI specs<br />
          with realistic mock data in seconds, not hours.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
          <Link href="/app" style={styles.ctaButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.3)';
          }}
        >
          Try Now - No Registration Required
        </Link>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', color: '#6b7280', fontSize: '0.875rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>✓</span> No User Tracking
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>✓</span> No Analytics
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>✓</span> GDPR Compliant
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#10b981' }}>✓</span> Your Data Stays Private
          </span>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Development Teams Choose MockPilot</h2>
        <div style={styles.featureGrid}>
          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#1f2937';
            }}
          >
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Lightning Fast</h3>
            <p style={styles.featureDesc}>
              Generate complete HTTP request files in seconds. Stop wasting hours writing boilerplate API calls.
            </p>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#1f2937';
            }}
          >
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Realistic Mock Data</h3>
            <p style={styles.featureDesc}>
              Powered by Faker.js, generate realistic test data that matches your API schema perfectly.
            </p>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#1f2937';
            }}
          >
            <div style={styles.featureIcon}>🔧</div>
            <h3 style={styles.featureTitle}>VS Code Compatible</h3>
            <p style={styles.featureDesc}>
              Generated .http files work seamlessly with VS Code REST Client and other popular tools.
            </p>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#1f2937';
            }}
          >
            <div style={styles.featureIcon}>📦</div>
            <h3 style={styles.featureTitle}>OpenAPI Support</h3>
            <p style={styles.featureDesc}>
              Supports OpenAPI 3.0 and Swagger 2.0 specifications out of the box.
            </p>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#1f2937';
            }}
          >
            <div style={styles.featureIcon}>🚀</div>
            <h3 style={styles.featureTitle}>CLI for Teams</h3>
            <p style={styles.featureDesc}>
              Automate with our powerful CLI. Perfect for CI/CD pipelines and team workflows.
            </p>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#1f2937';
            }}
          >
            <div style={styles.featureIcon}>🤖</div>
            <h3 style={styles.featureTitle}>AI-Powered Testing</h3>
            <p style={styles.featureDesc}>
              Professional tier includes AI-based context-aware test data generation for edge cases.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={styles.pricing}>
        <h2 style={styles.sectionTitle}>Simple, Transparent Pricing</h2>
        <div style={styles.pricingGrid}>
          {/* Free Tier */}
          <div style={styles.pricingCard}>
            <div style={styles.pricingTier}>Free</div>
            <div style={styles.pricingPrice}>$0</div>
            <div style={styles.pricingPeriod}>Forever free</div>
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeature}>✓ Web-based generator</li>
              <li style={styles.pricingFeature}>✓ 3 generations per session</li>
              <li style={styles.pricingFeature}>✓ OpenAPI 3.0 & Swagger 2.0</li>
              <li style={styles.pricingFeature}>✓ Realistic mock data</li>
              <li style={styles.pricingFeature}>✓ VS Code compatible</li>
            </ul>
            <Link 
              href="/app" 
              style={styles.pricingButton}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#374151')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1f2937')}
            >
              Try Now
            </Link>
          </div>

          {/* Team Tier */}
          <div style={{ ...styles.pricingCard, ...styles.pricingCardPopular }}>
            <div style={styles.popularBadge}>MOST POPULAR</div>
            <div style={styles.pricingTier}>Team</div>
            <div style={styles.pricingPrice}>$29</div>
            <div style={styles.pricingPeriod}>per user/month</div>
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeature}>✓ Everything in Free</li>
              <li style={styles.pricingFeature}>✓ Unlimited generations</li>
              <li style={styles.pricingFeature}>✓ CLI tool access</li>
              <li style={styles.pricingFeature}>✓ CI/CD integration</li>
              <li style={styles.pricingFeature}>✓ Priority support</li>
              <li style={styles.pricingFeature}>✓ Team collaboration</li>
            </ul>
            <button
              style={{ ...styles.pricingButton, ...styles.pricingButtonPrimary }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Get Started
            </button>
          </div>

          {/* Professional Tier */}
          <div style={styles.pricingCard}>
            <div style={styles.pricingTier}>Professional</div>
            <div style={styles.pricingPrice}>$99</div>
            <div style={styles.pricingPeriod}>per user/month</div>
            <ul style={styles.pricingFeatures}>
              <li style={styles.pricingFeature}>✓ Everything in Team</li>
              <li style={styles.pricingFeature}>✓ AI-powered test data</li>
              <li style={styles.pricingFeature}>✓ Context-aware generation</li>
              <li style={styles.pricingFeature}>✓ Edge case detection</li>
              <li style={styles.pricingFeature}>✓ Custom data patterns</li>
              <li style={styles.pricingFeature}>✓ Dedicated support</li>
            </ul>
            <button
              style={styles.pricingButton}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#374151')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1f2937')}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 MockPilot. Open source and built with ❤️ for developers.</p>
        <p style={{ marginTop: '1rem' }}>
          <Link href="/legal/disclaimer" style={{ color: '#9ca3af', marginRight: '2rem', textDecoration: 'none' }}>Disclaimer</Link>
          <Link href="/legal/faq" style={{ color: '#9ca3af', marginRight: '2rem', textDecoration: 'none' }}>FAQ</Link>
          <Link href="/legal/privacy" style={{ color: '#9ca3af', marginRight: '2rem', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/legal/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms</Link>
        </p>
</footer>
        <CookieConsent />
      </div>
    );
  }
