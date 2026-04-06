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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold' as const,
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: '3rem',
  },
  section: {
    background: '#111',
    border: '1px solid #1f2937',
    borderRadius: '0.75rem',
    padding: '2rem',
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold' as const,
    marginBottom: '1.5rem',
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
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  buttonSecondary: {
    background: '#1f2937',
    border: '1px solid #374151',
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
  },
  infoBox: {
    padding: '1rem',
    background: '#1f2937',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem',
  },
  infoLabel: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginBottom: '0.25rem',
  },
  infoValue: {
    fontSize: '1rem',
    color: '#f3f4f6',
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Email change
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  
  // Password change
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // API Token
  const [apiToken, setApiToken] = useState<string>('');
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenCopied, setTokenCopied] = useState(false);

  // Delete Account
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    checkUser();
    loadApiToken();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setUser(user);
    setLoading(false);
  };

  const loadApiToken = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      // Call backend API instead of Supabase directly
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/user/token`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          setApiToken(data.token);
        }
      }
    } catch (err) {
      console.error('Error loading token:', err);
    }
  };

  const generateApiToken = async () => {
    setTokenLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('Not authenticated');

      // Call backend API instead of Supabase directly
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/user/token/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate token');
      }

      const data = await response.json();
      setApiToken(data.token);
      setTokenCopied(false);
    } catch (err: any) {
      console.error('Error generating token:', err);
      alert('Failed to generate API token. Please try again.');
    } finally {
      setTokenLoading(false);
    }
  };

  const copyToken = async () => {
    if (!apiToken) return;
    try {
      await navigator.clipboard.writeText(apiToken);
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy token');
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }

    setDeleteLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('Not authenticated');

      // Call backend API to delete account
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/user/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete account');
      }

      // Sign out and redirect to home
      await supabase.auth.signOut();
      router.push('/');
    } catch (err: any) {
      console.error('Error deleting account:', err);
      alert(err.message || 'Failed to delete account. Please try again.');
      setDeleteLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailError('');
    setEmailSuccess('');

    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) throw error;

      setEmailSuccess('Check your new email for a confirmation link!');
      setNewEmail('');
    } catch (err: any) {
      setEmailError(err.message || 'Failed to update email');
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      setPasswordLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setPasswordSuccess('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
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

  return (
    <div style={styles.container}>
      <AppHeader
        variant="authenticated"
        activePage="profile"
        onSignOut={handleSignOut}
        logoHref="/"
      />

      <main style={styles.main}>
        <h1 style={styles.title}>Profile Settings</h1>
        <p style={styles.subtitle}>Manage your account settings</p>

        {/* Account Info */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Account Information</h2>
          <div style={styles.infoBox}>
            <div style={styles.infoLabel}>Current Email</div>
            <div style={styles.infoValue}>{user?.email}</div>
          </div>
          <div style={styles.infoBox}>
            <div style={styles.infoLabel}>User ID</div>
            <div style={styles.infoValue}>{user?.id}</div>
          </div>
        </div>

        {/* API Token for CLI */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>API Token (CLI Access)</h2>
          <p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            Use this token to authenticate the MockPilot CLI for unlimited local generations.
          </p>
          
          {apiToken ? (
            <>
              <div style={styles.infoBox}>
                <div style={styles.infoLabel}>Your API Token</div>
                <div style={{
                  ...styles.infoValue,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  wordBreak: 'break-all' as const,
                }}>
                  {apiToken}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={copyToken}
                  style={{
                    ...styles.button,
                    flex: 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {tokenCopied ? '✓ Copied!' : 'Copy Token'}
                </button>
                <button
                  onClick={generateApiToken}
                  style={{
                    ...styles.button,
                    ...styles.buttonSecondary,
                    flex: 1,
                  }}
                  disabled={tokenLoading}
                >
                  {tokenLoading ? 'Generating...' : 'Regenerate'}
                </button>
              </div>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#1f2937', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                  <strong>How to use:</strong>
                </div>
                <code style={{ fontSize: '0.75rem', color: '#d1d5db', display: 'block' }}>
                  # Install CLI<br />
                  npm install -g @mockpilot/cli<br /><br />
                  # Login<br />
                  mockpilot login {apiToken.substring(0, 20)}...<br /><br />
                  # Generate<br />
                  mockpilot generate openapi.yaml -o api.http
                </code>
              </div>
            </>
          ) : (
            <button
              onClick={generateApiToken}
              style={styles.button}
              disabled={tokenLoading}
              onMouseEnter={(e) => !tokenLoading && (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => !tokenLoading && (e.currentTarget.style.opacity = '1')}
            >
              {tokenLoading ? 'Generating...' : 'Generate API Token'}
            </button>
          )}
        </div>

        {/* Change Email */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Change Email</h2>
          {emailError && <div style={styles.error}>{emailError}</div>}
          {emailSuccess && <div style={styles.success}>{emailSuccess}</div>}
          
          <form style={styles.form} onSubmit={handleEmailChange}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>New Email Address</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                style={styles.input}
                placeholder="new@example.com"
                required
                onFocus={(e) => (e.currentTarget.style.borderColor = '#667eea')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#374151')}
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={emailLoading}
              onMouseEnter={(e) => !emailLoading && (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => !emailLoading && (e.currentTarget.style.opacity = '1')}
            >
              {emailLoading ? 'Updating...' : 'Update Email'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Change Password</h2>
          {passwordError && <div style={styles.error}>{passwordError}</div>}
          {passwordSuccess && <div style={styles.success}>{passwordSuccess}</div>}
          
          <form style={styles.form} onSubmit={handlePasswordChange}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
                placeholder="••••••••"
                required
                minLength={6}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#667eea')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#374151')}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                placeholder="••••••••"
                required
                minLength={6}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#667eea')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#374151')}
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={passwordLoading}
              onMouseEnter={(e) => !passwordLoading && (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => !passwordLoading && (e.currentTarget.style.opacity = '1')}
            >
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Delete Account */}
        <div style={{
          ...styles.section,
          borderColor: '#dc2626',
        }}>
          <h2 style={{
            ...styles.sectionTitle,
            color: '#ef4444',
          }}>Danger Zone</h2>
          <p style={{
            color: '#9ca3af',
            marginBottom: '1rem',
            fontSize: '0.875rem',
          }}>
            Once you delete your account, there is no going back. This action cannot be undone.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: '1px solid #dc2626',
              borderRadius: '0.5rem',
              color: '#ef4444',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontWeight: 'bold' as const,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#dc2626';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ef4444';
            }}
          >
            Delete Account
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div style={{
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              background: '#111',
              border: '1px solid #dc2626',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold' as const,
                color: '#ef4444',
                marginBottom: '1rem',
              }}>Delete Account?</h2>
              
              <p style={{
                color: '#d1d5db',
                marginBottom: '1rem',
                lineHeight: '1.6',
              }}>
                This will permanently delete your account and all associated data including:
              </p>
              
              <ul style={{
                color: '#9ca3af',
                marginBottom: '1.5rem',
                paddingLeft: '1.5rem',
                lineHeight: '1.8',
              }}>
                <li>Profile information</li>
                <li>API tokens</li>
                <li>Usage history</li>
                <li>Purchase records</li>
              </ul>

              <p style={{
                color: '#ef4444',
                marginBottom: '1.5rem',
                fontWeight: 'bold' as const,
              }}>
                This action cannot be undone!
              </p>

              <div style={{
                marginBottom: '1.5rem',
              }}>
                <label style={{
                  display: 'block',
                  color: '#d1d5db',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                }}>
                  Type <strong>DELETE</strong> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                  }}
                  placeholder="DELETE"
                  autoFocus
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#dc2626')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#374151')}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
              }}>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText('');
                  }}
                  disabled={deleteLoading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#374151',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '0.875rem',
                    cursor: deleteLoading ? 'not-allowed' : 'pointer',
                    opacity: deleteLoading ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => !deleteLoading && (e.currentTarget.style.background = '#4b5563')}
                  onMouseLeave={(e) => !deleteLoading && (e.currentTarget.style.background = '#374151')}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading || deleteConfirmText !== 'DELETE'}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: deleteConfirmText === 'DELETE' ? '#dc2626' : '#374151',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '0.875rem',
                    cursor: (deleteLoading || deleteConfirmText !== 'DELETE') ? 'not-allowed' : 'pointer',
                    opacity: (deleteLoading || deleteConfirmText !== 'DELETE') ? 0.5 : 1,
                    fontWeight: 'bold' as const,
                  }}
                  onMouseEnter={(e) => {
                    if (!deleteLoading && deleteConfirmText === 'DELETE') {
                      e.currentTarget.style.background = '#b91c1c';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!deleteLoading && deleteConfirmText === 'DELETE') {
                      e.currentTarget.style.background = '#dc2626';
                    }
                  }}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete My Account'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
