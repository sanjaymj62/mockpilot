'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    maxWidth: '600px',
    width: '100%',
    background: '#111',
    border: '1px solid #1f2937',
    borderRadius: '1rem',
    padding: '3rem',
    textAlign: 'center' as const,
  },
  successIcon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 2rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold' as const,
    marginBottom: '1rem',
  },
  message: {
    color: '#9ca3af',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '2rem 0',
    textAlign: 'left' as const,
  },
  featureItem: {
    padding: '1rem',
    marginBottom: '0.5rem',
    background: '#1f2937',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  button: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '1rem',
  },
  loader: {
    border: '3px solid #1f2937',
    borderTop: '3px solid #667eea',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: '2rem auto',
  },
  countdown: {
    color: '#9ca3af',
    fontSize: '0.875rem',
    marginTop: '1rem',
  },
};

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    checkPaymentAndUser();
  }, []);

  useEffect(() => {
    if (!loading && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      router.push('/app');
    }
  }, [countdown, loading, router]);

  const checkPaymentAndUser = async () => {
    try {
      // Get authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUser(user);

      // Get user's plan
      const { data, error } = await supabase.rpc('get_user_plan', {
        user_uuid: user.id,
      });

      if (!error && data) {
        setPlan(data);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error checking payment:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loader}></div>
          <p>Processing your payment...</p>
        </div>
      </div>
    );
  }

  const isPaidPlan = plan === 'team' || plan === 'professional';

  return (
    <div style={styles.container}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={styles.card}>
        <div style={styles.successIcon}>✓</div>
        
        <h1 style={styles.title}>Payment Successful!</h1>
        
        <p style={styles.message}>
          Thank you for upgrading to <strong>{plan.charAt(0).toUpperCase() + plan.slice(1)}</strong> plan.
          Your account has been activated and you now have access to all premium features.
        </p>

        {isPaidPlan && (
          <>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>What's Available Now:</h2>
            
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>
                <span style={{ fontSize: '1.5rem' }}>🔑</span>
                <span>Generate API tokens from your profile</span>
              </li>
              <li style={styles.featureItem}>
                <span style={{ fontSize: '1.5rem' }}>💻</span>
                <span>Unlimited HTTP file generations</span>
              </li>
              <li style={styles.featureItem}>
                <span style={{ fontSize: '1.5rem' }}>🚀</span>
                <span>CLI tool access for automation</span>
              </li>
              {plan === 'professional' && (
                <li style={styles.featureItem}>
                  <span style={{ fontSize: '1.5rem' }}>🤖</span>
                  <span>AI-powered test data generation</span>
                </li>
              )}
            </ul>

            <p style={styles.countdown}>
              Redirecting to the app in {countdown} seconds...
            </p>

            <Link 
              href="/app" 
              style={styles.button}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Go to App Now
            </Link>
          </>
        )}

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #1f2937' }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Need help? Contact us at support@mockpilot.com
          </p>
        </div>
      </div>
    </div>
  );
}
