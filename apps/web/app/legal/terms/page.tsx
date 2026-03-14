'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function TermsPage() {
  const content = (
    <div style={{ maxWidth: '100%' }}>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        <strong>Last Updated:</strong> February 24, 2026
      </p>

      <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '2rem', fontSize: '1.125rem' }}>
        BY USING MOCKPILOT, YOU AGREE TO THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THE SERVICE.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          1. Agreement to Terms
        </h2>
        <p style={{ color: '#d1d5db' }}>
          By accessing or using MockPilot, you agree to be bound by these Terms of Service. 
          If you disagree with any part of these terms, you may not access the Service.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          2. Use License
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          We grant you a limited, non-exclusive, non-transferable license to use the Service.
        </p>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Free Tier:</h3>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8', marginBottom: '1rem' }}>
          <li>3 generations per session</li>
          <li>Web-based access only</li>
          <li>No API access</li>
          <li>No warranty or support</li>
        </ul>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Paid Plans:</h3>
        <p style={{ color: '#d1d5db' }}>
          Team and Professional plans grant additional features as described on our pricing page.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          3. Acceptable Use
        </h2>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>You May NOT:</h3>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Violate any laws or regulations</li>
          <li>Infringe intellectual property rights</li>
          <li>Transmit malicious code or viruses</li>
          <li>Attempt unauthorized access to the Service</li>
          <li>Reverse engineer the Service</li>
          <li>Resell or redistribute the Service</li>
          <li>Use for illegal purposes</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          4. Payment Terms
        </h2>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>All prices are in USD</li>
          <li>Payments processed through Dodo Payments</li>
          <li><strong style={{ color: '#ef4444' }}>All sales are final (no refunds)</strong></li>
          <li>Prices may change with 30 days notice</li>
          <li>You are responsible for applicable taxes</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem', background: '#1f1f1f', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #ef4444' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444' }}>
          5. DISCLAIMER OF WARRANTIES
        </h2>
        <p style={{ color: '#d1d5db', fontWeight: 'bold', marginBottom: '1rem' }}>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.
        </p>
        <p style={{ color: '#d1d5db' }}>We do NOT warrant that:</p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>The Service will meet your requirements</li>
          <li>The Service will be error-free or secure</li>
          <li>Results obtained will be accurate or reliable</li>
          <li>Defects will be corrected</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem', background: '#1f1f1f', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #ef4444' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444' }}>
          6. LIMITATION OF LIABILITY
        </h2>
        <p style={{ color: '#d1d5db', fontWeight: 'bold', marginBottom: '1rem' }}>
          WE SHALL NOT BE LIABLE FOR ANY:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8', marginBottom: '1rem' }}>
          <li>Indirect, incidental, special, or consequential damages</li>
          <li>Loss of profits, data, use, or goodwill</li>
          <li>Damages from unauthorized access</li>
          <li>Bugs, viruses, or other harmful code</li>
        </ul>
        <p style={{ color: '#d1d5db', fontWeight: 'bold' }}>
          OUR MAXIMUM LIABILITY: $100 USD or the amount you paid us (whichever is greater)
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          7. Indemnification
        </h2>
        <p style={{ color: '#d1d5db' }}>
          You agree to defend, indemnify, and hold harmless MockPilot from any claims arising from:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Your use of the Service</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any third-party rights</li>
          <li>Content you submit or generate</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          8. Termination
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          We may suspend or terminate your access immediately for:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Violation of these Terms</li>
          <li>Illegal activity</li>
          <li>Abuse or misuse of the Service</li>
          <li>Non-payment</li>
          <li>At our discretion for any reason</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          9. Dispute Resolution
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          Any disputes shall be resolved through binding arbitration, except where prohibited by law.
        </p>
        <p style={{ color: '#d1d5db', fontWeight: 'bold' }}>
          You agree to resolve disputes individually and waive the right to participate in class actions.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          10. Contact
        </h2>
        <p style={{ color: '#d1d5db' }}>
          For questions about these Terms:<br />
          <strong>Email:</strong> legal@mockpilot.com
        </p>
      </section>

      <div style={{ background: '#111', border: '1px solid #ef4444', borderRadius: '0.75rem', padding: '2rem', marginTop: '3rem' }}>
        <p style={{ color: '#ef4444', fontWeight: 'bold', textAlign: 'center', fontSize: '1.125rem' }}>
          BY USING MOCKPILOT, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
        </p>
      </div>
    </div>
  );

  return <LegalPageLayout title="Terms of Service" content={content} />;
}
