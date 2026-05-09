'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/app');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md p-10 bg-[#111] border border-gray-800 rounded-2xl">
        <Link href="/">
          <div className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            MockPilot
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-gray-400 text-center mb-8">Sign in to your account</p>

        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 outline-none focus:border-[#667eea] transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 outline-none focus:border-[#667eea] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[#667eea] font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}