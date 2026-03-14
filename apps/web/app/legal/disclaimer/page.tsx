'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function DisclaimerPage() {
  const content = (
    <div style={{ maxWidth: '100%' }}>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        <strong>Last Updated:</strong> February 24, 2026
      </p>

      <div style={{ background: '#1f1f1f', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #ef4444', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444', textAlign: 'center' }}>
          ⚠️ USE AT YOUR OWN RISK ⚠️
        </h2>
        <p style={{ color: '#d1d5db', textAlign: 'center', fontWeight: 'bold' }}>
          MockPilot is provided "AS IS" without any warranty, express or implied.
        </p>
      </div>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          1. No Warranty
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem', fontWeight: 'bold' }}>
          THE SERVICE IS PROVIDED WITHOUT WARRANTY OF ANY KIND INCLUDING:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Merchantability</li>
          <li>Fitness for a particular purpose</li>
          <li>Non-infringement</li>
          <li>Accuracy or reliability</li>
          <li>Uninterrupted or error-free operation</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          2. No Guarantee of Accuracy
        </h2>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>We do not warrant the accuracy of generated data</li>
          <li>Mock data is randomly generated</li>
          <li>Information may be incomplete or outdated</li>
          <li><strong style={{ color: '#ef4444' }}>You must verify all generated data before use</strong></li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem', background: '#1f1f1f', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #ef4444' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444' }}>
          3. Limitation of Liability
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem', fontWeight: 'bold' }}>
          WE ARE NOT LIABLE FOR ANY DAMAGES INCLUDING:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8', marginBottom: '1rem' }}>
          <li>Direct, indirect, incidental, or consequential damages</li>
          <li>Loss of profits, data, or business opportunities</li>
          <li>Damages from use or inability to use the Service</li>
          <li>Damages from third-party services</li>
          <li>Damages from unauthorized access or data breaches</li>
        </ul>
        <p style={{ color: '#ef4444', fontWeight: 'bold' }}>
          Maximum Liability: $100 USD or the amount you paid us (whichever is greater)
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          4. Not for Production Use
        </h2>
        <p style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.125rem' }}>
          DO NOT USE GENERATED MOCK DATA IN PRODUCTION ENVIRONMENTS WITHOUT PROPER VALIDATION AND SECURITY REVIEW.
        </p>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          MockPilot is intended for:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Testing and development purposes</li>
          <li>Generating mock data for API testing</li>
          <li>Creating sample HTTP requests</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          5. No Professional Advice
        </h2>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Not legal advice:</strong> Consult a qualified attorney for legal matters</li>
          <li><strong>Not technical consulting:</strong> Use at your own discretion</li>
          <li><strong>Not security certification:</strong> Implement your own security measures</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          6. Third-Party Services
        </h2>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>We do not control third-party services or content</li>
          <li>We are not responsible for third-party terms or practices</li>
          <li>Links to third parties do not imply endorsement</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          7. Your Responsibility
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem', fontWeight: 'bold' }}>
          You are solely responsible for:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>How you use the Service</li>
          <li>Testing and validation of generated content</li>
          <li>Compliance with applicable laws</li>
          <li>Security of your implementations</li>
          <li>Data backup and recovery</li>
          <li>Verifying all generated data</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444' }}>
          8. DO NOT USE FOR
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          MockPilot is <strong style={{ color: '#ef4444' }}>NOT intended for:</strong>
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Medical device testing or healthcare applications</li>
          <li>Life-support systems or safety-critical applications</li>
          <li>Financial transactions or banking applications</li>
          <li>Production environments without proper validation</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          9. Contact
        </h2>
        <p style={{ color: '#d1d5db' }}>
          For questions about this Disclaimer:<br />
          <strong>Email:</strong> legal@mockpilot.com
        </p>
      </section>

      <div style={{ background: '#111', border: '1px solid #ef4444', borderRadius: '0.75rem', padding: '2rem', marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444', textAlign: 'center' }}>
          ACKNOWLEDGMENT
        </h3>
        <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '1rem' }}>
          BY USING MOCKPILOT, YOU ACKNOWLEDGE THAT:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '2rem', lineHeight: '2', textAlign: 'left' }}>
          <li>✅ You have read and understood this Disclaimer</li>
          <li>✅ You agree to use the Service at your own risk</li>
          <li>✅ You understand we provide no warranties</li>
          <li>✅ You accept the limitations of liability</li>
          <li>✅ You will comply with all applicable laws</li>
          <li>✅ You are solely responsible for your use</li>
        </ul>
        <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '1.5rem', fontWeight: 'bold' }}>
          IF YOU DO NOT AGREE, DO NOT USE THE SERVICE.
        </p>
      </div>
    </div>
  );

  return <LegalPageLayout title="Disclaimer" content={content} />;
}
