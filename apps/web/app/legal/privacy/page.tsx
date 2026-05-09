'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function PrivacyPage() {
  const content = (
    <div style={{ maxWidth: '100%' }}>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        <strong>Last Updated:</strong> February 24, 2026
      </p>

      <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '2rem', fontSize: '1.125rem' }}>
        We respect your privacy. This policy explains how we collect, use, and protect your information.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          1. Information We Collect
        </h2>
        
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>You Provide:</h3>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8', marginBottom: '1rem' }}>
          <li>Email address</li>
          <li>Name (optional)</li>
          <li>Password (encrypted)</li>
          <li>Payment information (processed by Dodo Payments)</li>
        </ul>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Automatically Collected:</h3>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Basic usage data (pages visited, features used) - <strong style={{ color: '#10b981' }}>no personal tracking</strong></li>
          <li>Session data for authentication</li>
        </ul>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem', fontStyle: 'italic' }}>
          ⚠️ We do NOT collect: IP addresses, browser fingerprints, device fingerprints, or any form of user tracking.
          We value your privacy and employ data minimization principles.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          2. How We Use Your Information
        </h2>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Providing and managing your account</li>
          <li>Processing transactions</li>
          <li>Improving the Service</li>
          <li>Detecting and preventing fraud</li>
          <li>Sending service-related notifications</li>
          <li>Complying with legal obligations</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem', background: '#1f1f1f', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #10b981' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>
          3. We Do NOT Sell Your Data
        </h2>
        <p style={{ color: '#d1d5db', fontWeight: 'bold' }}>
          We do not sell your personal information to third parties.
        </p>
      </section>

      <section style={{ marginBottom: '3rem', background: '#1f1f1f', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #10b981' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>
          🔒 No Tracking Policy
        </h2>
        <ul style={{ color: '#d1d5db', lineHeight: '2' }}>
          <li>✅ <strong>No Analytics:</strong> We do not use Google Analytics, Mixpanel, or any tracking tools</li>
          <li>✅ <strong>No Ad Tracking:</strong> We do not serve ads or share data with advertising networks</li>
          <li>✅ <strong>No User Profiling:</strong> We do not build profiles based on your behavior</li>
          <li>✅ <strong>No Cross-Site Tracking:</strong> We do not track you across other websites</li>
          <li>✅ <strong>No Browser Fingerprinting:</strong> We do not collect device fingerprints</li>
          <li>✅ <strong>Data Minimization:</strong> We only collect what's absolutely necessary for the service</li>
        </ul>
        <p style={{ color: '#9ca3af', marginTop: '1rem' }}>
          Your data is used only to provide the service you requested. Nothing more.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          4. How We Share Information
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>We may share information with:</p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Service Providers:</strong> Payment processors, hosting providers</li>
          <li><strong>Legal Requirements:</strong> To comply with law or legal process</li>
          <li><strong>Your Consent:</strong> When you explicitly agree</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          5. Your Rights
        </h2>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Access:</strong> Request a copy of your data</li>
          <li><strong>Correction:</strong> Update incorrect information</li>
          <li><strong>Deletion:</strong> Permanently delete your account</li>
          <li><strong>Portability:</strong> Export your data</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails</li>
        </ul>
        <p style={{ color: '#d1d5db', marginTop: '1rem' }}>
          <strong>Contact:</strong> privacy@mockpilot.com to exercise your rights
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          6. Data Security
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>We implement security measures:</p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>HTTPS encryption</li>
          <li>Encrypted password storage</li>
          <li>Secure authentication</li>
          <li>Regular security audits</li>
        </ul>
        <p style={{ color: '#ef4444', marginTop: '1rem', fontWeight: 'bold' }}>
          However, no method of transmission or storage is 100% secure.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          7. Cookies
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>We use cookies for:</p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Essential:</strong> Authentication and security (required)</li>
          <li><strong>Analytics:</strong> Understanding usage patterns (can be disabled)</li>
          <li><strong>Preferences:</strong> Remembering your settings</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          8. GDPR & CCPA Compliance
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          <strong>European Users (GDPR):</strong>
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8', marginBottom: '1rem' }}>
          <li>Right to access, rectify, and erase data</li>
          <li>Right to data portability</li>
          <li>Right to object to processing</li>
          <li>Contact our DPO at: dpo@mockpilot.com</li>
        </ul>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          <strong>California Residents (CCPA):</strong>
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Right to know what data is collected</li>
          <li>Right to delete personal information</li>
          <li>We do not sell personal information</li>
          <li>No discrimination for exercising rights</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          9. Children's Privacy
        </h2>
        <p style={{ color: '#d1d5db' }}>
          Our Service is not intended for children under 13. We do not knowingly collect information from children under 13.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          10. Contact Us
        </h2>
        <p style={{ color: '#d1d5db' }}>
          For privacy-related questions or to exercise your rights:<br />
          <strong>Privacy Email:</strong> privacy@mockpilot.com<br />
          <strong>Data Protection Officer:</strong> dpo@mockpilot.com<br />
          <strong>Response Time:</strong> Within 30 days
        </p>
      </section>

      <div style={{ background: '#111', border: '1px solid #667eea', borderRadius: '0.75rem', padding: '2rem', marginTop: '3rem' }}>
        <p style={{ color: '#667eea', fontWeight: 'bold', textAlign: 'center', fontSize: '1.125rem' }}>
          BY USING MOCKPILOT, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THIS PRIVACY POLICY.
        </p>
      </div>
    </div>
  );

  return <LegalPageLayout title="Privacy Policy" content={content} />;
}
