#!/usr/bin/env node

/**
 * Test script for Dodo Payments webhook
 * Usage: node test-webhook.js
 */

const crypto = require('crypto');

const WEBHOOK_URL = 'http://localhost:3001/api/webhooks/dodo';
const WEBHOOK_SECRET = process.env.DODO_WEBHOOK_SECRET || 'your-webhook-secret';

// Sample webhook payload (matches actual Dodo Payments structure)
const webhookPayload = {
  business_id: 'bus_test123',
  type: 'payment.succeeded',
  timestamp: new Date().toISOString(),
  data: {
    payment_id: 'pay_test_123456789',
    invoice_id: 'inv_test_123',
    checkout_session_id: 'cks_test_123',
    status: 'succeeded',
    total_amount: 2900, // 29.00 EUR (in cents)
    currency: 'EUR',
    tax: 463,
    settlement_amount: 2900,
    settlement_currency: 'EUR',
    settlement_tax: 463,
    product_cart: [
      {
        product_id: 'pdt_0NZ9JhvVa7AvXh2yQOMRP', // Team plan product ID
        quantity: 1,
      },
    ],
    customer: {
      customer_id: 'cus_test_123',
      email: 'test@example.com',
      name: 'Test User',
      metadata: {},
    },
    metadata: {
      user_id: 'REPLACE-WITH-REAL-USER-UUID', // ⚠️ Replace this!
    },
    payment_method: 'card',
    card_network: 'visa',
    card_last_four: '4242',
    billing: {
      street: 'Test Street 123',
      city: 'Test City',
      zipcode: '12345',
      state: 'Test State',
      country: 'US',
    },
    created_at: new Date().toISOString(),
  },
};

async function testWebhook() {
  try {
    console.log('🧪 Testing Dodo Payments webhook...\n');
    
    // Convert payload to JSON string
    const payloadString = JSON.stringify(webhookPayload);
    const payloadBuffer = Buffer.from(payloadString);
    
    // Generate signature
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const signature = hmac.update(payloadBuffer).digest('hex');
    
    console.log('📦 Payload:');
    console.log(JSON.stringify(webhookPayload, null, 2));
    console.log('\n🔑 Signature:', signature);
    console.log('🔒 Secret:', WEBHOOK_SECRET);
    console.log('🌐 URL:', WEBHOOK_URL);
    console.log('\n🚀 Sending request...\n');
    
    // Send request
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-dodo-signature': signature,
      },
      body: payloadString,
    });
    
    const responseText = await response.text();
    
    console.log('📊 Response Status:', response.status);
    console.log('📨 Response:', responseText);
    
    if (response.ok) {
      console.log('\n✅ Webhook test successful!');
    } else {
      console.log('\n❌ Webhook test failed!');
    }
  } catch (error) {
    console.error('\n❌ Error testing webhook:', error.message);
    console.error(error);
  }
}

testWebhook();
