'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AppHeader } from '@/components/AppHeader';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [apiToken, setApiToken] = useState<string>('');
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenCopied, setTokenCopied] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => { checkUser(); loadApiToken(); }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth/login'); return; }
    setUser(user);
    setLoading(false);
  };

  const loadApiToken = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/user/token`, {
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) setApiToken(data.token);
      }
    } catch (err) { console.error('Error loading token:', err); }
  };

  const generateApiToken = async () => {
    setTokenLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('Not authenticated');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/user/token/generate`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      });
      if (!response.ok) throw new Error('Failed to generate token');
      const data = await response.json();
      setApiToken(data.token);
    } catch (err: any) { console.error('Error:', err); } 
    finally { setTokenLoading(false); }
  };

  const copyToken = async () => {
    await navigator.clipboard.writeText(apiToken);
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2000);
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailError('');
    setEmailSuccess('');
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      setEmailSuccess('Verification email sent. Please check your inbox.');
      setNewEmail('');
    } catch (err: any) { setEmailError(err.message); }
    finally { setEmailLoading(false); }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword !== confirmPassword) { setPasswordError('Passwords do not match'); setPasswordLoading(false); return; }
    if (newPassword.length < 6) { setPasswordError('Password must be at least 6 characters'); setPasswordLoading(false); return; }
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordSuccess('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) { setPasswordError(err.message); }
    finally { setPasswordLoading(false); }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setDeleteLoading(true);
    try {
      await supabase.from('profiles').delete().eq('id', user.id);
      await supabase.auth.admin.deleteUser(user.id);
      await supabase.auth.signOut();
      router.push('/');
    } catch (err: any) { console.error('Error deleting account:', err); }
    finally { setDeleteLoading(false); }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <AppHeader variant="authenticated" activePage="profile" onSignOut={handleSignOut} logoHref="/app" />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-gray-400 mb-8">Manage your account settings and preferences</p>

        {/* Account Info */}
        <section className="bg-[#111] border border-gray-800 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Account Information</h2>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Email</div>
              <div className="p-4 bg-gray-800 rounded-lg">{user?.email}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">User ID</div>
              <div className="p-4 bg-gray-800 rounded-lg text-sm font-mono">{user?.id}</div>
            </div>
          </div>
        </section>

        {/* API Token */}
        <section className="bg-[#111] border border-gray-800 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">API Token (CLI Access)</h2>
          <div className="p-4 bg-gray-800 rounded-lg mb-4 font-mono text-sm break-all">{apiToken || 'No token generated'}</div>
          <div className="flex gap-3">
            <button onClick={generateApiToken} disabled={tokenLoading} className="px-6 py-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
              {tokenLoading ? 'Generating...' : apiToken ? 'Regenerate Token' : 'Generate Token'}
            </button>
            {apiToken && (
              <button onClick={copyToken} className="px-6 py-2 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600">
                {tokenCopied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </section>

        {/* Change Email */}
        <section className="bg-[#111] border border-gray-800 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Change Email</h2>
          {emailError && <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm mb-4">{emailError}</div>}
          {emailSuccess && <div className="p-3 bg-emerald-900/50 border border-emerald-700 rounded-lg text-emerald-200 text-sm mb-4">{emailSuccess}</div>}
          <form onSubmit={handleEmailChange} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">New Email</label>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 outline-none focus:border-[#667eea]" placeholder="newemail@example.com" required />
            </div>
            <button type="submit" disabled={emailLoading} className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
              {emailLoading ? 'Sending...' : 'Send Verification Email'}
            </button>
          </form>
        </section>

        {/* Change Password */}
        <section className="bg-[#111] border border-gray-800 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Change Password</h2>
          {passwordError && <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm mb-4">{passwordError}</div>}
          {passwordSuccess && <div className="p-3 bg-emerald-900/50 border border-emerald-700 rounded-lg text-emerald-200 text-sm mb-4">{passwordSuccess}</div>}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 outline-none focus:border-[#667eea]" placeholder="••••••••" required />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 outline-none focus:border-[#667eea]" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={passwordLoading} className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </section>

        {/* Delete Account */}
        <section className="bg-[#111] border border-red-900/50 rounded-xl p-8">
          <h2 className="text-xl font-bold mb-2 text-red-400">Delete Account</h2>
          <p className="text-gray-400 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
          <button onClick={() => setShowDeleteModal(true)} className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
            Delete My Account
          </button>
        </section>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-red-400 mb-4">Delete Account</h3>
              <p className="text-gray-400 mb-4">This will permanently delete your account and all associated data. This action cannot be undone.</p>
              <p className="text-gray-400 mb-4">Type <strong className="text-white">DELETE</strong> to confirm:</p>
              <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 mb-6" placeholder="DELETE" />
              <div className="flex gap-3">
                <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(''); }} className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600">
                  Cancel
                </button>
                <button onClick={handleDeleteAccount} disabled={deleteLoading || deleteConfirmText !== 'DELETE'} className={`flex-1 px-6 py-3 rounded-lg font-bold ${deleteConfirmText === 'DELETE' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700'} disabled:opacity-50`}>
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