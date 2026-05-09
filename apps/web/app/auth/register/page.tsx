'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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
      const { error } = await supabase.auth.signUp({ email, password });
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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md p-10 bg-[#111] border border-gray-800 rounded-2xl">
        <Link href="/">
          <div className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            MockPilot
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-center mb-2">Create an account</h1>
        <p className="text-gray-400 text-center mb-8">Get started with unlimited generations</p>

        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-emerald-900/50 border border-emerald-700 rounded-lg text-emerald-200 text-sm mb-6 leading-relaxed">
            <strong>Check your email!</strong>
            <br />
            We've sent you a confirmation link. Click it to verify your account and start using MockPilot.
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
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
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-2">Must be at least 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#667eea] font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}