'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AppHeader } from '@/components/AppHeader';
import { useRouter } from 'next/navigation';

const PRODUCT_IDS = {
  team: 'pdt_0NZ9JhvVa7AvXh2yQOMRP',
  professional: 'pdt_0NZ9JhvVa7AvXh2yQOMRP',
};

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'Forever free',
    features: [
      '✓ Web-based generator',
      '✓ 3 generations per session',
      '✓ OpenAPI 3.0 & Swagger 2.0',
      '✓ Realistic mock data',
      '✓ VS Code compatible',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    price: '$29',
    period: 'one-time',
    popular: true,
    features: [
      '✓ Everything in Free',
      '✓ Unlimited generations',
      '✓ CLI tool access',
      '✓ CI/CD integration',
      '✓ Priority support',
      '✓ Team collaboration',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$99',
    period: 'one-time',
    features: [
      '✓ Everything in Team',
      '✓ AI-powered test data',
      '✓ Context-aware generation',
      '✓ Edge case detection',
      '✓ Custom data patterns',
      '✓ Dedicated support',
    ],
  },
];

export default function PlansPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => { checkUser(); }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth/login'); return; }
    setUser(user);
    await loadUserPlan(user.id);
    setLoading(false);
  };

  const loadUserPlan = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_user_plan', { user_uuid: userId });
      if (!error && data) setCurrentPlan(data);
    } catch (err) { console.error('Error loading plan:', err); }
  };

  const handleCheckout = async (productId: string, planName: string) => {
    if (!user) return;
    setCheckoutLoading(planName);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, userId: user.id, userEmail: user.email, userName: user.email?.split('@')[0] || 'Customer' }),
      });
      if (!response.ok) throw new Error('Checkout failed');
      const { url } = await response.json();
      window.location.href = url;
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

  const isCurrentOrHigher = (planId: string) => {
    if (planId === 'free') return currentPlan === 'free';
    if (planId === 'team') return currentPlan === 'team' || currentPlan === 'professional';
    if (planId === 'professional') return currentPlan === 'professional';
    return false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <AppHeader variant="authenticated" activePage="plans" onSignOut={handleSignOut} logoHref="/app" />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">Choose Your Plan</h1>
        <p className="text-gray-400 text-center mb-12">Upgrade to unlock unlimited generations and premium features</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative p-8 bg-[#111] rounded-2xl border ${plan.popular ? 'border-2 border-[#667eea] md:scale-105' : currentPlan === plan.id ? 'border-2 border-emerald-500' : 'border-gray-800'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-5 px-4 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              {currentPlan === plan.id && !plan.popular && (
                <div className="absolute -top-3 right-5 px-4 py-1 bg-emerald-600 rounded-full text-xs font-bold">
                  CURRENT PLAN
                </div>
              )}
              <div className="text-gray-400 mb-2">{plan.name}</div>
              <div className="text-5xl font-bold mb-2">{plan.price}</div>
              <div className="text-gray-400 mb-8">{plan.period}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-300 border-b border-gray-800 pb-3">{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(PRODUCT_IDS[plan.id as keyof typeof PRODUCT_IDS], plan.id)}
                disabled={isCurrentOrHigher(plan.id) || checkoutLoading === plan.id}
                className={`w-full py-4 rounded-lg font-bold transition-all ${
                  isCurrentOrHigher(plan.id) 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : plan.popular 
                      ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:opacity-90'
                      : 'bg-gray-800 border border-gray-700 text-white hover:bg-gray-700'
                }`}
              >
                {checkoutLoading === plan.id ? 'Loading...' : isCurrentOrHigher(plan.id) ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}