'use client';

const legalContent = {
  terms: `# Terms of Service

**Last Updated: February 24, 2026**

[Content from TERMS_OF_SERVICE.md - visit /legal/terms for full content]

By using MockPilot, you agree to these terms.

**Key Points:**
- Service provided "AS IS" without warranties
- No refunds on paid plans
- We may terminate accounts that violate terms
- You are responsible for your use of the service
- Disputes resolved through arbitration

For full terms, see the complete Terms of Service document.

**Contact:** legal@mockpilot.com
`,
  privacy: `# Privacy Policy

**Last Updated: February 24, 2026**

[Content from PRIVACY_POLICY.md - visit /legal/privacy for full content]

We respect your privacy. This policy explains our data practices.

**We Collect:**
- Account information (email, password)
- Usage data and analytics
- Browser fingerprints for sessions

**We DON'T:**
- Sell your data
- Store credit card information
- Collect children's data (under 13)

**Your Rights:**
- Access your data
- Delete your account
- Opt out of marketing
- Export your data

For full details, see the complete Privacy Policy document.

**Contact:** privacy@mockpilot.com
`,
  disclaimer: `# Disclaimer

**Last Updated: February 24, 2026**

**USE AT YOUR OWN RISK**

MockPilot is provided "AS IS" without any warranty.

**Important:**
- No guarantee of accuracy
- No liability for damages
- Not for production use without validation
- No professional advice provided
- Generated data must be verified

**Limitations:**
- We are not liable for any damages
- Maximum liability: $100 USD or your paid amount
- No warranty of fitness for purpose

**You Must:**
- Verify all generated data
- Comply with applicable laws
- Use for testing purposes only
- Implement proper security

For complete disclaimer, see the full document.

**Contact:** legal@mockpilot.com
`,
};

export default function LegalPage() {
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
    },
    main: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '3rem 2rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold' as const,
      marginBottom: '1rem',
    },
    section: {
      background: '#111',
      border: '1px solid #1f2937',
      borderRadius: '0.75rem',
      padding: '2rem',
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold' as const,
      marginBottom: '1rem',
      color: '#667eea',
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    content: {
      lineHeight: '1.8',
      color: '#d1d5db',
      whiteSpace: 'pre-wrap' as const,
    },
    button: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      marginTop: '1rem',
    },
    footer: {
      borderTop: '1px solid #1f2937',
      padding: '2rem',
      textAlign: 'center' as const,
      color: '#6b7280',
      fontSize: '0.875rem',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <a href="/" style={{ ...styles.link, fontSize: '1.25rem', fontWeight: 'bold' }}>
          MockPilot
        </a>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Legal Information</h1>
        <p style={{ color: '#9ca3af', marginBottom: '3rem', fontSize: '1.125rem' }}>
          Please read these important legal documents carefully before using MockPilot.
        </p>

        {/* Terms of Service */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📜 Terms of Service</h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem', lineHeight: '1.6' }}>
            Our Terms of Service outline the rules and regulations for using MockPilot.
            By using our service, you agree to these terms.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <strong>Key Points:</strong>
          </p>
          <ul style={{ color: '#9ca3af', fontSize: '0.875rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Service provided "AS IS" without warranties</li>
            <li>All sales are final (no refunds)</li>
            <li>We may terminate accounts that violate terms</li>
            <li>You are responsible for your use of the service</li>
            <li>Maximum liability: $100 or amount paid</li>
          </ul>
          <a 
            href="/legal/terms" 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Read Full Terms →
          </a>
        </div>

        {/* Privacy Policy */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔒 Privacy Policy</h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem', lineHeight: '1.6' }}>
            Our Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <strong>What We Collect:</strong>
          </p>
          <ul style={{ color: '#9ca3af', fontSize: '0.875rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Account information (email, password)</li>
            <li>Usage data and analytics</li>
            <li>Browser fingerprints for session management</li>
          </ul>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
            <strong>We DON'T:</strong> Sell your data, store credit cards, or collect children's data.
          </p>
          <a 
            href="/legal/privacy" 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Read Privacy Policy →
          </a>
        </div>

        {/* Disclaimer */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>⚠️ Disclaimer</h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem', lineHeight: '1.6' }}>
            Important limitations and disclaimers about using MockPilot.
          </p>
          <p style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            USE AT YOUR OWN RISK
          </p>
          <ul style={{ color: '#9ca3af', fontSize: '0.875rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>No guarantee of accuracy or reliability</li>
            <li>Not for production use without validation</li>
            <li>No professional or legal advice provided</li>
            <li>We are not liable for any damages</li>
            <li>You must verify all generated data</li>
          </ul>
          <a 
            href="/legal/disclaimer" 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Read Full Disclaimer →
          </a>
        </div>

        {/* FAQ */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>❓ Frequently Asked Questions</h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem', lineHeight: '1.6' }}>
            Find answers to common questions about MockPilot, billing, features, and more.
          </p>
          <a 
            href="/legal/faq" 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            View FAQ →
          </a>
        </div>

        {/* Cookie Policy */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🍪 Cookie Policy</h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem', lineHeight: '1.6' }}>
            Learn about how we use cookies and similar technologies on MockPilot.
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <strong>We use cookies for:</strong>
          </p>
          <ul style={{ color: '#9ca3af', fontSize: '0.875rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Essential functionality (authentication, security)</li>
            <li>Analytics to improve the service (optional)</li>
            <li>Remembering your preferences (optional)</li>
          </ul>
          <a 
            href="/legal/cookies" 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Read Cookie Policy →
          </a>
        </div>

        {/* Contact */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📧 Contact Us</h2>
          <p style={{ color: '#d1d5db', marginBottom: '1rem', lineHeight: '1.6' }}>
            Have questions about our legal policies or need assistance?
          </p>
          <div style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '2' }}>
            <p><strong>General Support:</strong> support@mockpilot.com</p>
            <p><strong>Privacy Requests:</strong> privacy@mockpilot.com</p>
            <p><strong>Legal Questions:</strong> legal@mockpilot.com</p>
            <p><strong>Data Protection Officer:</strong> dpo@mockpilot.com</p>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2026 MockPilot. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>
          <a href="/legal/terms" style={styles.link}>Terms</a>
          {' · '}
          <a href="/legal/privacy" style={styles.link}>Privacy</a>
          {' · '}
          <a href="/legal/cookies" style={styles.link}>Cookies</a>
          {' · '}
          <a href="/legal/disclaimer" style={styles.link}>Disclaimer</a>
          {' · '}
          <a href="/legal/faq" style={styles.link}>FAQ</a>
        </p>
      </footer>
    </div>
  );
}
