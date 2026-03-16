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
      console.log('Token:', token);
      console.log('TokenHash:', tokenHash);
      console.log('HashToken:', hashToken);
      console.log('Type:', type);
      console.log('===========================');

      const tokenToUse = token || tokenHash || hashToken;

      if (tokenToUse) {
        let email = urlObj.searchParams.get('email') || hashParams.get('email');
        
        if (!email) {
          console.log('No email in URL, extracting from JWT token...');
          try {
            const parts = tokenToUse.split('.');
            if (parts.length === 3) {
              let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
              while (base64.length % 4) {
                base64 += '=';
              }
              const payload = JSON.parse(atob(base64));
              console.log('JWT payload:', payload);
              email = payload.email || payload.email_confirm || payload.new_email;
              console.log('Extracted email from token:', email);
            } else {
              console.log('Token does not have 3 parts:', parts.length);
            }
          } catch (err) {
            console.error('Failed to decode token:', err);
          }
        }

        console.log('Verifying token via GoTrue API...', { token: tokenToUse, type, email });
        
        try {
          const verifyBody: Record<string, string> = {
            token_hash: tokenToUse,
            type: type,
          };
          if (email) {
            verifyBody.email = email;
          }
          
          const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
          const response = await fetch('http://91.98.125.157:8000/auth/v1/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': anonKey,
            },
            body: JSON.stringify(verifyBody),
          });
          
          const data = await response.json();
          console.log('Verify response:', response.status, data);
          
          if (response.ok && data.access_token) {
            console.log('Token verified, setting session...');
            
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            });

            if (sessionError) {
              console.error('setSession error:', sessionError);
            } else if (sessionData?.session) {
              console.log('Session established, redirecting to /app');
              setStatus('success');
              router.push('/app');
              return;
            }
          } else {
            console.error('Verify failed:', data);
          }
        } catch (err) {
          console.error('Verify request failed:', err);
        }
      }

      console.log('Falling back to getSession...');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('getSession result:', session ? 'has session' : 'no session', error || '');
      
      if (session) {
        setStatus('success');
        router.push('/app');
      } else {
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
