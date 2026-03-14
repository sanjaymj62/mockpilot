'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function FAQPage() {
  const content = (
    <div style={{ maxWidth: '100%' }}>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        <strong>Last Updated:</strong> February 24, 2026
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#667eea' }}>
          General Questions
        </h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            What is MockPilot?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            MockPilot is a web-based tool that generates HTTP request files from OpenAPI/Swagger specifications 
            with realistic mock data. It helps developers test APIs without writing requests manually.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Is MockPilot free to use?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            Yes! We offer a free tier with 3 generations per session. Paid plans (Team and Professional) 
            offer unlimited generations and additional features.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Do I need to create an account?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            Yes, you need to create a free account to use MockPilot. This allows us to track your usage 
            and provide features like API tokens for CLI access.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#667eea' }}>
          Account & Billing
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Can I upgrade my plan?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            Yes! Visit the "Plans" page while logged in to upgrade to Team or Professional plans.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Do you offer refunds?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            No, all sales are final. We do not offer refunds except as required by law. 
            Please try the free tier before purchasing.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Can I delete my account?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            Yes. Go to your Profile page, scroll to the "Danger Zone" section, and click "Delete Account." 
            <strong style={{ color: '#ef4444' }}> This action is permanent and cannot be undone.</strong>
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#667eea' }}>
          Security & Privacy
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Is my data secure?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            Yes, we implement industry-standard security measures including HTTPS encryption, 
            encrypted password storage, and secure authentication. However, no system is 100% secure.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Do you sell my data?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            <strong style={{ color: '#10b981' }}>No.</strong> We do not sell your personal information to third parties.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Do you store my API specifications?
          </h3>
          <p style={{ color: '#d1d5db' }}>
            We temporarily process your specifications to generate HTTP files, but we do not permanently 
            store them on our servers.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#667eea' }}>
          Plans & Pricing
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            What's included in the Free plan?
          </h3>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Web-based generator</li>
            <li>3 generations per session</li>
            <li>OpenAPI 3.0 & Swagger 2.0 support</li>
            <li>Realistic mock data</li>
            <li>VS Code compatible</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            What's included in the Team plan? ($29)
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>Everything in Free, plus:</p>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Unlimited generations</li>
            <li>CLI tool access</li>
            <li>CI/CD integration</li>
            <li>Priority support</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            What's included in the Professional plan? ($99)
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>Everything in Team, plus:</p>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>AI-powered test data generation</li>
            <li>Context-aware generation</li>
            <li>Edge case detection</li>
            <li>Custom data patterns</li>
            <li>Dedicated support</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#667eea' }}>
          Support
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            How do I get help?
          </h3>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Email:</strong> support@mockpilot.com</li>
            <li><strong>Response Time:</strong> Within 24-48 hours</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            I found a bug. How do I report it?
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
            Email us at support@mockpilot.com with:
          </p>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Description of the issue</li>
            <li>Steps to reproduce</li>
            <li>Screenshots (if applicable)</li>
            <li>Your browser and OS version</li>
          </ul>
        </div>
      </section>

      <div style={{
        background: '#111',
        border: '1px solid #667eea',
        borderRadius: '0.75rem',
        padding: '2rem',
        marginTop: '3rem',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          Still Have Questions?
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          Can't find what you're looking for? Contact us:
        </p>
        <p style={{ color: '#d1d5db' }}>
          <strong>Email:</strong> support@mockpilot.com<br />
          <strong>Response Time:</strong> Within 24-48 hours
        </p>
      </div>
    </div>
  );

  return <LegalPageLayout title="Frequently Asked Questions" content={content} />;
}
