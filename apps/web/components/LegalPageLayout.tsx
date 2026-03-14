'use client';

import Link from 'next/link';

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
}

export default function LegalPageLayout({ title, content }: LegalPageProps) {
  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#f3f4f6',
    },
    header: {
      borderBottom: '1px solid #1f2937',
      padding: '1.5rem 2rem',
      background: '#111',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    main: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '3rem 2rem',
    },
    content: {
      lineHeight: '1.8',
      color: '#d1d5db',
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
    },
    backButton: {
      padding: '0.5rem 1rem',
      background: '#1f2937',
      color: '#d1d5db',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
    },
    footer: {
      borderTop: '1px solid #1f2937',
      padding: '2rem',
      textAlign: 'center' as const,
      color: '#6b7280',
      fontSize: '0.875rem',
      marginTop: '4rem',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/" style={{ ...styles.link, fontSize: '1.25rem', fontWeight: 'bold' }}>
          MockPilot
        </Link>
        <Link 
          href="/legal" 
          style={styles.backButton}
          onMouseEnter={(e) => e.currentTarget.style.background = '#374151'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#1f2937'}
        >
          ← Back to Legal
        </Link>
      </header>

      <main style={styles.main}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>{title}</h1>
        <div style={styles.content}>
          {content}
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2026 MockPilot. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link href="/legal/terms" style={styles.link}>Terms</Link>
          {' · '}
          <Link href="/legal/privacy" style={styles.link}>Privacy</Link>
          {' · '}
          <Link href="/legal/cookies" style={styles.link}>Cookies</Link>
          {' · '}
          <Link href="/legal/disclaimer" style={styles.link}>Disclaimer</Link>
          {' · '}
          <Link href="/legal/faq" style={styles.link}>FAQ</Link>
        </p>
      </footer>
    </div>
  );
}
