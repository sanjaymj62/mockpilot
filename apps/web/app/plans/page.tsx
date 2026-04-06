'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AppHeader } from '@/components/AppHeader';
import { useRouter } from 'next/navigation';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f3f4f6',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#9ca3af',
    textAlign: 'center' as const,
    marginBottom: '3rem',
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginTop: '3rem',
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
  pricingCardCurrent: {
    border: '2px solid #059669',
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
  currentBadge: {
    position: 'absolute' as const,
    top: '-12px',
    right: '20px',
    padding: '0.25rem 1rem',
    background: '#059669',
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
  },
  pricingButtonPrimary: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
  },
  pricingButtonDisabled: {
    background: '#374151',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};

export default function PlansPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setUser(user);
    await loadUserPlan(user.id);
    setLoading(false);
  };

  const loadUserPlan = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_user_plan', {
        user_uuid: userId,
      });

      if (!error && data) {
        setCurrentPlan(data);
      }
    } catch (err) {
      console.error('Error loading plan:', err);
    }
  };

  const handleCheckout = async (productId: string, planName: string) => {
    if (!user) return;
    
    setCheckoutLoading(planName);
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          userId: user.id,
          userEmail: user.email,
          userName: user.email?.split('@')[0] || 'Customer',
        }),
      });

      if (!response.ok) throw new Error('Checkout failed');

      const { url } = await response.json();
      window.location.href = url; // Redirect to Dodo Payments checkout
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{
        ...styles.container,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  const PRODUCT_IDS = {
    team: 'pdt_0NZ9JhvVa7AvXh2yQOMRP',
    professional: 'pdt_0NZ9JhvVa7AvXh2yQOMRP',
  };

  return (
    <div style={styles.container}>
      <AppHeader
        variant="authenticated"
        activePage="plans"
        onSignOut={handleSignOut}
        logoHref="/"
      />

      <main style={styles.main}>
        <h1 style={styles.title}>Choose Your Plan</h1>
        <p style={styles.subtitle}>Upgrade to unlock unlimited generations and premium features</p>

        <div style={styles.pricingGrid}>
          {/* Free Tier */}
          <div style={{
            ...styles.pricingCard,
            ...(currentPlan === 'free' && styles.pricingCardCurrent),
          }}>
            {currentPlan === 'free' && <div style={styles.currentBadge}>CURRENT PLAN</div>}
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
            <button
              style={{
                ...styles.pricingButton,
                ...(currentPlan === 'free' && styles.pricingButtonDisabled),
              }}
              disabled={currentPlan === 'free'}
            >
              {currentPlan === 'free' ? 'Current Plan' : 'Downgrade'}
            </button>
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
              onClick={() => handleCheckout(PRODUCT_IDS.team, 'team')}
              disabled={currentPlan === 'team' || currentPlan === 'professional' || checkoutLoading === 'team'}
              onMouseEnter={(e) => !(currentPlan === 'team' || currentPlan === 'professional') && (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => !(currentPlan === 'team' || currentPlan === 'professional') && (e.currentTarget.style.opacity = '1')}
            >
              {checkoutLoading === 'team' ? 'Loading...' : currentPlan === 'team' ? 'Current Plan' : currentPlan === 'professional' ? 'Downgrade' : 'Upgrade to Team'}
            </button>
          </div>

          {/* Professional Tier */}
          <div style={{
            ...styles.pricingCard,
            ...(currentPlan === 'professional' && styles.pricingCardCurrent),
          }}>
            {currentPlan === 'professional' && <div style={styles.currentBadge}>CURRENT PLAN</div>}
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
              style={{
                ...styles.pricingButton,
                ...(currentPlan === 'professional' && styles.pricingButtonDisabled),
              }}
              onClick={() => handleCheckout(PRODUCT_IDS.professional, 'professional')}
              disabled={currentPlan === 'professional' || checkoutLoading === 'professional'}
              onMouseEnter={(e) => currentPlan !== 'professional' && (e.currentTarget.style.background = '#374151')}
              onMouseLeave={(e) => currentPlan !== 'professional' && (e.currentTarget.style.background = '#1f2937')}
            >
              {checkoutLoading === 'professional' ? 'Loading...' : currentPlan === 'professional' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
