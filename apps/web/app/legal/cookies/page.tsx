'use client';

import LegalPageLayout from '@/components/LegalPageLayout';

export default function CookiePolicyPage() {
  const content = (
    <div style={{ maxWidth: '100%' }}>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        <strong>Last Updated:</strong> February 24, 2026
      </p>

      <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '2rem', fontSize: '1.125rem' }}>
        This Cookie Policy explains how MockPilot uses cookies and similar technologies.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          1. What Are Cookies?
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          Cookies are small text files stored on your device when you visit a website. They help websites remember 
          your preferences and understand how you use the site.
        </p>
        <p style={{ color: '#d1d5db' }}>
          We use cookies and similar technologies (web beacons, pixels, local storage) to provide and improve 
          our Service.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          2. Types of Cookies We Use
        </h2>

        <div style={{ marginBottom: '2rem', background: '#111', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #374151' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>
            Essential Cookies (Required)
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            These cookies are necessary for the Service to function. You cannot opt out of these.
          </p>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Authentication:</strong> Keep you logged in</li>
            <li><strong>Security:</strong> Protect against CSRF attacks</li>
            <li><strong>Session Management:</strong> Track your session state</li>
            <li><strong>Load Balancing:</strong> Route requests to appropriate servers</li>
          </ul>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
            <strong>Duration:</strong> Session (deleted when browser closes) or up to 7 days
          </p>
        </div>

        <div style={{ marginBottom: '2rem', background: '#111', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #374151' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#9ca3af' }}>
            Analytics Cookies (Not Used)
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            <strong style={{ color: '#10b981' }}>We do not use analytics cookies.</strong> We respect your privacy and do not track your usage behavior.
          </p>
        </div>

        <div style={{ marginBottom: '2rem', background: '#111', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #374151' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
            Preference Cookies (Optional)
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            These cookies remember your preferences and settings.
          </p>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>UI Preferences:</strong> Theme, language, layout</li>
            <li><strong>Settings:</strong> Default values, display options</li>
            <li><strong>Dismissed Messages:</strong> Banners or notices you've closed</li>
          </ul>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
            <strong>Duration:</strong> Up to 1 year
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          3. No Tracking Policy
        </h2>
        <div style={{ background: '#1f1f1f', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #10b981' }}>
          <p style={{ color: '#d1d5db', marginBottom: '1rem', fontWeight: 'bold' }}>
            ✅ MockPilot does NOT use tracking technologies.
          </p>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>No Google Analytics or similar tracking tools</li>
            <li>No browser fingerprinting</li>
            <li>No cross-site tracking</li>
            <li>No advertising cookies</li>
            <li>No user profiling</li>
          </ul>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
            Free tier usage is tracked via session cookies only - no persistent tracking.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          4. Third-Party Cookies
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          We may use third-party services that set their own cookies:
        </p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Payment Processing (Dodo Payments)
          </h3>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Purpose: Process payments securely</li>
            <li>Privacy Policy: https://dodopayments.com/privacy</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Analytics (If Enabled)
          </h3>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Purpose: Understand user behavior and improve service</li>
            <li>Examples: Google Analytics, Plausible, or similar</li>
          </ul>
        </div>

        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
          <strong>Note:</strong> We are not responsible for cookies set by third-party services. 
          Please review their privacy policies.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          5. How to Control Cookies
        </h2>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Browser Settings
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            Most browsers allow you to control cookies through their settings:
          </p>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
            <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
            <li><strong>Edge:</strong> Settings → Privacy & Security → Cookies</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Cookie Preferences
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
            You can manage your cookie preferences:
          </p>
          <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Accept All:</strong> Enable all cookies for full functionality</li>
            <li><strong>Essential Only:</strong> Only use required cookies</li>
            <li><strong>Custom:</strong> Choose which categories to allow</li>
          </ul>
        </div>

        <div style={{ background: '#1f1f1f', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #ef4444' }}>
          <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            ⚠️ Important:
          </p>
          <p style={{ color: '#d1d5db' }}>
            Disabling essential cookies will prevent you from using the Service. 
            Disabling other cookies may limit functionality.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          6. Cookie Consent
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          When you first visit MockPilot, you will see a cookie consent banner. You can:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8', marginBottom: '1rem' }}>
          <li>Accept all cookies</li>
          <li>Reject non-essential cookies</li>
          <li>Customize your cookie preferences</li>
        </ul>
        <p style={{ color: '#d1d5db' }}>
          You can change your preferences at any time through the cookie settings in the footer.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          7. Do Not Track (DNT)
        </h2>
        <p style={{ color: '#d1d5db' }}>
          We currently do not respond to Do Not Track signals because there is no industry standard for 
          compliance. However, you can control cookies through your browser settings.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          8. Data Collection and Usage
        </h2>
        <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
          Information collected through cookies is used for:
        </p>
        <ul style={{ color: '#d1d5db', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Service Provision:</strong> Authentication, session management</li>
          <li><strong>Usage Tracking:</strong> Free tier limits (3 generations/session)</li>
          <li><strong>Security:</strong> Fraud detection, abuse prevention</li>
          <li><strong>Analytics:</strong> Usage patterns, feature popularity</li>
          <li><strong>Improvement:</strong> Service optimization, bug fixes</li>
        </ul>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '1rem' }}>
          See our <a href="/legal/privacy" style={{ color: '#667eea' }}>Privacy Policy</a> for more details on data processing.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          9. Cookie Lifespan
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#d1d5db' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #374151' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Cookie Type</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Duration</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Can Opt Out?</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #374151' }}>
                <td style={{ padding: '1rem' }}>Session Cookies</td>
                <td style={{ padding: '1rem' }}>Until browser closes</td>
                <td style={{ padding: '1rem' }}>❌ No (Essential)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #374151' }}>
                <td style={{ padding: '1rem' }}>Authentication</td>
                <td style={{ padding: '1rem' }}>7 days</td>
                <td style={{ padding: '1rem' }}>❌ No (Essential)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #374151' }}>
                <td style={{ padding: '1rem' }}>Preferences</td>
                <td style={{ padding: '1rem' }}>1 year</td>
                <td style={{ padding: '1rem' }}>✅ Yes</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem' }}>Analytics</td>
                <td style={{ padding: '1rem' }}>2 years</td>
                <td style={{ padding: '1rem' }}>✅ Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          10. Updates to This Policy
        </h2>
        <p style={{ color: '#d1d5db' }}>
          We may update this Cookie Policy from time to time. Changes will be posted on this page with 
          an updated "Last Updated" date. We encourage you to review this policy periodically.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#667eea' }}>
          11. Contact Us
        </h2>
        <p style={{ color: '#d1d5db' }}>
          For questions about our use of cookies:<br />
          <strong>Privacy Email:</strong> privacy@mockpilot.com<br />
          <strong>Data Protection Officer:</strong> dpo@mockpilot.com
        </p>
      </section>

      <div style={{ background: '#111', border: '1px solid #10b981', borderRadius: '0.75rem', padding: '2rem', marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>
          🍪 Privacy-First Cookie Policy
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '2' }}>
          <li>✅ <strong>Essential cookies only</strong> - required for authentication and security</li>
          <li>✅ <strong>No analytics tracking</strong> - we don't track your behavior</li>
          <li>✅ <strong>No browser fingerprinting</strong> - we don't collect device fingerprints</li>
          <li>✅ <strong>No advertising cookies</strong> - we don't serve ads</li>
          <li>✅ <strong>Data minimization</strong> - we only collect what's necessary</li>
          <li>✅ <strong>GDPR compliant</strong> - your privacy is protected</li>
        </ul>
      </div>
    </div>
  );

  return <LegalPageLayout title="Cookie Policy" content={content} />;
}
