'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const handleCallback = async () => {
      const fullUrl = window.location.href;
      const urlObj = new URL(fullUrl);
      
      const tokenHash = urlObj.searchParams.get('token_hash');
      const type = urlObj.searchParams.get('type') || 'signup';
      const redirectTo = urlObj.searchParams.get('redirect_to');
      
      console.log('=== Auth Callback Debug ===');
      console.log('Full URL:', fullUrl);
      console.log('Token hash:', tokenHash ? 'present' : 'missing');
      console.log('Type:', type);
      console.log('Redirect to:', redirectTo);
      console.log('===========================');

      if (!tokenHash) {
        console.log('No token hash in URL, checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setStatus('error');
          router.push('/auth/login?error=callback_failed');
          return;
        }

        if (session) {
          console.log('Existing session found');
          setStatus('success');
          router.push('/app');
        } else {
          console.log('No session found');
          setStatus('no_session');
          router.push('/auth/login');
        }
        return;
      }

      console.log('Calling getSession to exchange token...');
      const { data, error } = await supabase.auth.getSession();
      
      console.log('Result:', data?.session ? 'Session exists' : 'No session', error ? `Error: ${error.message}` : 'No error');

      if (error) {
        console.error('Error exchanging token:', error);
        setStatus('error');
        router.push('/auth/login?error=verification_failed');
        return;
      }

      if (data.session) {
        console.log('Session established successfully, redirecting to /app');
        setStatus('success');
        router.push('/app');
      } else {
        console.log('No session after token exchange');
        setStatus('no_session');
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
        }}>
          MockPilot
        </div>
        <p>{status === 'verifying' ? 'Verifying your account...' : 
           status === 'error' ? 'Verification failed' :
           status === 'no_session' ? 'No session found' : 'Success!'}</p>
      </div>
    </div>
  );
}
