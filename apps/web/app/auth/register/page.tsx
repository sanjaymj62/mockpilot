'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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
    width: '100%',
    maxWidth: '28rem',
    padding: '2.5rem',
    background: '#111',
    border: '1px solid #1f2937',
    borderRadius: '1rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    marginBottom: '0.5rem',
    textAlign: 'center' as const,
  },
  subtitle: {
    color: '#9ca3af',
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500' as const,
    color: '#d1d5db',
  },
  input: {
    padding: '0.75rem',
    background: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '0.5rem',
    color: '#f3f4f6',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    marginTop: '0.5rem',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  error: {
    padding: '0.75rem',
    background: 'rgba(127, 29, 29, 0.5)',
    border: '1px solid #b91c1c',
    borderRadius: '0.5rem',
    color: '#fecaca',
    fontSize: '0.875rem',
  },
  success: {
    padding: '0.75rem',
    background: 'rgba(6, 78, 59, 0.5)',
    border: '1px solid #059669',
    borderRadius: '0.5rem',
    color: '#6ee7b7',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
  divider: {
    textAlign: 'center' as const,
    color: '#6b7280',
    margin: '1.5rem 0',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500' as const,
  },
};

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setSuccess(true);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link href="/">
          <div style={styles.logo}>MockPilot</div>
        </Link>
        <h1 style={styles.title}>Create an account</h1>
        <p style={styles.subtitle}>Get started with unlimited generations</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && (
          <div style={styles.success}>
            <strong>Check your email!</strong>
            <br />
            We've sent you a confirmation link. Click it to verify your account and start using MockPilot.
          </div>
        )}

        <form style={styles.form} onSubmit={handleRegister}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="you@example.com"
              required
              onFocus={(e) => (e.currentTarget.style.borderColor = '#667eea')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#374151')}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              required
              minLength={6}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#667eea')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#374151')}
            />
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
              Must be at least 6 characters
            </p>
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading && styles.buttonDisabled),
            }}
            disabled={loading}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.opacity = '1')}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div style={styles.divider}>
          Already have an account?{' '}
          <Link href="/auth/login" style={styles.link}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
