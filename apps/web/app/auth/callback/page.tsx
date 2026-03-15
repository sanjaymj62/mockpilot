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
      
      const token = urlObj.searchParams.get('token');
      const tokenHash = urlObj.searchParams.get('token_hash');
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const hashToken = hashParams.get('token_hash');
      const hashType = hashParams.get('type');
      const type = urlObj.searchParams.get('type') || hashType || 'signup';
      
      console.log('=== Auth Callback Debug ===');
      console.log('Full URL:', fullUrl);
      console.log('Hash:', window.location.hash);
      console.log('Token (query):', token ? 'present' : 'missing');
      console.log('TokenHash (query):', tokenHash ? 'present' : 'missing');
      console.log('Token (hash):', hashToken ? 'present' : 'missing');
      console.log('Type:', type);
      console.log('===========================');

      const tokenToUse = token || tokenHash || hashToken;

      if (tokenToUse) {
        console.log('Exchanging token for session using setSession...');
        
        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
          access_token: tokenToUse,
          refresh_token: '',
        });

        console.log('setSession result:', sessionData?.session ? 'Session established' : 'No session', sessionError ? `Error: ${sessionError.message}` : 'No error');

        if (sessionData?.session) {
          console.log('Session established successfully, redirecting to /app');
          setStatus('success');
          router.push('/app');
          return;
        }

        if (sessionError) {
          console.error('setSession error:', sessionError);
        }
      }

      if (!tokenToUse) {
        console.log('No token in URL, checking for existing session...');
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
