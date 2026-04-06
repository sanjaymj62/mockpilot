'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import http from 'react-syntax-highlighter/dist/esm/languages/hljs/http';
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

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    background: '#111827',
    color: '#f3f4f6',
  },
  main: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  panel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  panelHeader: {
    background: '#1f2937',
    borderBottom: '1px solid #374151',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelTitle: {
    fontWeight: '600' as const,
    margin: 0,
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  button: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    background: '#374151',
    color: '#f3f4f6',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonPrimary: {
    background: '#2563eb',
  },
  textarea: {
    flex: 1,
    padding: '1rem',
    background: '#111827',
    color: '#f3f4f6',
    border: 'none',
    outline: 'none',
    resize: 'none' as const,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
  },
  outputContainer: {
    flex: 1,
    overflow: 'auto',
    background: '#111827',
  },
  placeholder: {
    padding: '1rem',
    color: '#6b7280',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
  },
  footer: {
    background: '#1f2937',
    borderTop: '1px solid #374151',
    padding: '1rem 1.5rem',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.75rem',
  },
  generateButton: {
    padding: '0.75rem 2rem',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '600' as const,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '1rem',
  },
  error: {
    width: '100%',
    maxWidth: '48rem',
    padding: '0.75rem',
    background: 'rgba(127, 29, 29, 0.5)',
    border: '1px solid #b91c1c',
    borderRadius: '0.375rem',
    color: '#fecaca',
    fontSize: '0.875rem',
  },
  hiddenInput: {
    display: 'none',
  },
};

export default function Home() {
  const router = useRouter();
  const [yamlInput, setYamlInput] = useState('');
  const [httpOutput, setHttpOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usageRemaining, setUsageRemaining] = useState<number>(3);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUsageStats();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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
    // Check usage limit first
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ yaml: yamlInput }),
      });

      const data: GenerateResponse = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate HTTP requests');
      }

      setHttpOutput(data.httpFile);
      
      // Increment usage count on success
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

  return (
    <div style={styles.container}>
      <AppHeader
        variant="authenticated"
        activePage="generator"
        onSignOut={handleSignOut}
        logoHref="/"
        showNavigation={Boolean(user)}
        layout="inline"
        subtitle="OpenAPI/Swagger to HTTP File Generator"
        rightContent={
          <div
            style={{
              padding: '0.5rem 1rem',
              background: usageRemaining > 0 ? '#1f2937' : '#991b1b',
              borderRadius: '0.5rem',
              border: '1px solid',
              borderColor: usageRemaining > 0 ? '#374151' : '#dc2626',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              {user ? 'Unlimited' : 'Free generations'}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              {user ? '∞' : `${usageRemaining} / 3 remaining`}
            </div>
          </div>
        }
      />

      <main style={styles.main}>
        <div style={{ ...styles.panel, borderRight: '1px solid #374151' }}>
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>OpenAPI/Swagger YAML</h2>
            <div style={styles.buttonGroup}>
              <button
                onClick={loadExample}
                style={styles.button}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#4b5563')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#374151')}
              >
                Load Example
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={styles.button}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#4b5563')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#374151')}
              >
                Upload File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".yaml,.yml"
                onChange={handleFileUpload}
                style={styles.hiddenInput}
              />
            </div>
          </div>
          <textarea
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            placeholder="Paste your OpenAPI/Swagger YAML here or upload a file..."
            style={styles.textarea}
            spellCheck={false}
          />
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>Generated HTTP Requests</h2>
            {httpOutput && (
              <div style={styles.buttonGroup}>
                <button
                  onClick={copyToClipboard}
                  style={styles.button}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#4b5563')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#374151')}
                >
                  Copy
                </button>
                <button
                  onClick={downloadHttpFile}
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
                >
                  Download .http
                </button>
              </div>
            )}
          </div>
          <div style={styles.outputContainer}>
            {httpOutput ? (
              <SyntaxHighlighter
                language="http"
                style={atomOneDark}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: 'transparent',
                  fontSize: '0.875rem',
                }}
                wrapLongLines={true}
              >
                {httpOutput}
              </SyntaxHighlighter>
            ) : (
              <div style={styles.placeholder}>
                Generated HTTP requests will appear here...
              </div>
            )}
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <button
            onClick={generateHttpRequests}
            disabled={!yamlInput || loading}
            style={{
              ...styles.generateButton,
              ...((!yamlInput || loading) && {
                background: '#4b5563',
                cursor: 'not-allowed',
              }),
            }}
            onMouseEnter={(e) => {
              if (!yamlInput || loading) return;
              e.currentTarget.style.background = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              if (!yamlInput || loading) {
                e.currentTarget.style.background = '#4b5563';
              } else {
                e.currentTarget.style.background = '#2563eb';
              }
            }}
          >
            {loading ? 'Generating...' : 'Generate HTTP Requests'}
          </button>
          
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
        </div>
      </footer>

      {/* Limit Reached Modal */}
      {showLimitModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '0.75rem',
            padding: '2rem',
            maxWidth: '28rem',
            width: '90%',
          }}>
            <h2 style={{ marginTop: 0, fontSize: '1.5rem' }}>Free Limit Reached</h2>
            <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
              You've used all 3 free generations. To continue using MockPilot:
            </p>
            <ul style={{ color: '#9ca3af', lineHeight: '1.8' }}>
              <li>Clear your browser data to reset the counter</li>
              <li>Star the project on GitHub ⭐ (much appreciated!)</li>
              <li>Consider self-hosting for unlimited use</li>
            </ul>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
              Note: The backend has rate limiting to prevent abuse.
            </p>
            <button
              onClick={() => setShowLimitModal(false)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
