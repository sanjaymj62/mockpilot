'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import http from 'react-syntax-highlighter/dist/esm/languages/hljs/http';
import type { User } from '@supabase/supabase-js';
import { GenerateResponse } from '@/types/schema';
import { checkUsageLimit, incrementUsageCount, getUsageStats } from '@/lib/usage-tracking';
import { supabase } from '@/lib/supabase';
import { AppHeader } from '@/components/AppHeader';
import { useRouter } from 'next/navigation';

SyntaxHighlighter.registerLanguage('http', http);

const EXAMPLE_YAML = `openapi: 3.0.0
info:
  title: Sample API
  version: 1.0.0
servers:
  - url: https://api.example.com
paths:
  /users:
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '201':
          description: User created
  /users/{id}:
    put:
      summary: Update a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '200':
          description: User updated
components:
  schemas:
    User:
      type: object
      required:
        - email
        - firstName
      properties:
        firstName:
          type: string
          example: John
        lastName:
          type: string
        email:
          type: string
          format: email
        age:
          type: integer
          minimum: 0
          maximum: 120
        isActive:
          type: boolean`;

export default function Home() {
  const router = useRouter();
  const [yamlInput, setYamlInput] = useState('');
  const [httpOutput, setHttpOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usageRemaining, setUsageRemaining] = useState<number>(3);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUsageStats();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    router.push('/');
  };

  const loadUsageStats = async () => {
    try {
      const stats = await getUsageStats();
      setUsageRemaining(stats.remaining);
    } catch (err) {
      console.error('Failed to load usage stats:', err);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setYamlInput(text);
      setError('');
    } catch (err) {
      setError('Failed to read file');
    }
  };

  const generateHttpRequests = async () => {
    const usageCheck = await checkUsageLimit();
    
    if (!usageCheck.allowed) {
      setShowLimitModal(true);
      return;
    }

    setLoading(true);
    setError('');
    setHttpOutput('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yaml: yamlInput }),
      });

      const data: GenerateResponse = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate HTTP requests');
      }

      setHttpOutput(data.httpFile);
      await incrementUsageCount();
      await loadUsageStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadHttpFile = () => {
    const blob = new Blob([httpOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'requests.http';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(httpOutput);
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const loadExample = () => {
    setYamlInput(EXAMPLE_YAML);
    setError('');
  };

  const isDisabled = !yamlInput || loading;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <AppHeader
        variant="authenticated"
        activePage="generator"
        onSignOut={handleSignOut}
        logoHref="/app"
        showNavigation={currentUser !== null}
        rightContent={
          <div className={`px-4 py-2 rounded-lg border ${usageRemaining > 0 ? 'bg-gray-800 border-gray-700' : 'bg-red-900 border-red-700'}`}>
            <div className="text-xs text-gray-400">
              {currentUser ? 'Unlimited' : 'Free generations'}
            </div>
            <div className="text-xl font-bold">
              {currentUser ? '∞' : `${usageRemaining} / 3 remaining`}
            </div>
          </div>
        }
      />

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-gray-700">
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
            <h2 className="font-semibold">OpenAPI/Swagger YAML</h2>
            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="px-3 py-1.5 text-sm bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
              >
                Load Example
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-sm bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
              >
                Upload File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".yaml,.yml"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
          <textarea
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            placeholder="Paste your OpenAPI/Swagger YAML here or upload a file..."
            className="flex-1 p-4 bg-gray-900 text-gray-100 border-none outline-none resize-none font-mono text-sm"
            spellCheck={false}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
            <h2 className="font-semibold">Generated HTTP Requests</h2>
            {httpOutput && (
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 text-sm bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
                >
                  Copy
                </button>
                <button
                  onClick={downloadHttpFile}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Download .http
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-auto bg-gray-900">
            {httpOutput ? (
              <SyntaxHighlighter
                language="http"
                style={atomOneDark}
                customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.875rem' }}
                wrapLongLines={true}
              >
                {httpOutput}
              </SyntaxHighlighter>
            ) : (
              <div className="p-4 text-gray-500 font-mono text-sm">
                Generated HTTP requests will appear here...
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={generateHttpRequests}
            disabled={isDisabled}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-colors ${
              isDisabled 
                ? 'bg-gray-600 cursor-not-allowed text-gray-300' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Generating...' : 'Generate HTTP Requests'}
          </button>
          
          {error && (
            <div className="w-full max-w-2xl p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>
      </footer>

      {/* Limit Reached Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-sm w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Free Limit Reached</h2>
            <p className="text-gray-400 mb-4">
              You've used all 3 free generations. To continue using MockPilot:
            </p>
            <ul className="text-gray-400 space-y-2 mb-4">
              <li>• Clear your browser data to reset the counter</li>
              <li>• Star the project on GitHub ⭐ (much appreciated!)</li>
              <li>• Consider self-hosting for unlimited use</li>
            </ul>
            <p className="text-gray-500 text-sm mb-4">
              Note: The backend has rate limiting to prevent abuse.
            </p>
            <button
              onClick={() => setShowLimitModal(false)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}