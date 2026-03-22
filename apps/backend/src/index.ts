import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import yaml from 'js-yaml';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import DodoPayments from 'dodopayments';
import {
  OpenAPISpec,
  GenerateResponse,
  generateHTTPFile,
} from '@mockpilot/core';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Dodo Payments config
const DODO_API_KEY = process.env.DODO_API_KEY || '';
const DODO_WEBHOOK_SECRET = process.env.DODO_WEBHOOK_SECRET || '';
const DODO_PRICE_PRO = process.env.DODO_PRICE_PRO || '';
const DODO_PRICE_TEAM = process.env.DODO_PRICE_TEAM || '';

// Debug: Log env vars on startup
console.log('🔧 Environment Variables Loaded:');
console.log('  DODO_API_KEY:', DODO_API_KEY ? '✅ Set' : '❌ Not set');
console.log('  DODO_WEBHOOK_SECRET:', DODO_WEBHOOK_SECRET ? '✅ Set' : '❌ Not set');
console.log('  DODO_PRICE_PRO:', DODO_PRICE_PRO || '❌ Not set');
console.log('  DODO_PRICE_TEAM:', DODO_PRICE_TEAM || '❌ Not set');
console.log('  PORT:', PORT);

// Initialize Dodo Payments client
const dodoClient = new DodoPayments({
  bearerToken: DODO_API_KEY,
  environment: 'test_mode', // hardcoded for testing
});

app.use(cors());

// Special handling for webhook endpoint - must be before express.json()
app.use('/api/webhooks/dodo', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '10mb' }));

// Rate limiting to prevent bot abuse
// 10 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    httpFile: '',
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Verify API token endpoint for CLI
app.post('/api/verify-token', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Verify token in database
    const { data: tokenData, error: tokenError } = await supabase
      .from('api_tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (tokenError || !tokenData) {
      console.error('Token error:', tokenError);
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user info
    const { data: userData } = await supabase.auth.admin.getUserById(tokenData.user_id);

    // Update last used timestamp
    await supabase
      .from('api_tokens')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', tokenData.id);

    // Return user info
    res.json({
      valid: true,
      user: {
        id: tokenData.user_id,
        email: userData?.user?.email || 'unknown',
        plan: 'team', // You can extend this with actual plan data
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create checkout session for Dodo Payments
app.post('/api/create-checkout', async (req: Request, res: Response) => {
  try {
    const { productId, userId, userEmail, userName } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!DODO_API_KEY) {
      return res.status(500).json({ error: 'Dodo Payments not configured' });
    }

    // Create checkout session via Dodo Payments SDK
    const session = await dodoClient.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { 
        email: userEmail || 'customer@example.com', 
        name: userName || 'Customer',
      },
      return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success`,
      metadata: {
        user_id: userId,
      },
    });

    // The SDK returns a response with the checkout URL
    const checkoutUrl = (session as any).url || (session as any).checkout_url || (session as any).payment_url;
    
    if (!checkoutUrl) {
      console.error('No checkout URL in response:', session);
      return res.status(500).json({ error: 'Failed to get checkout URL' });
    }

    res.json({ url: checkoutUrl });
  } catch (error: any) {
    console.error('Checkout creation error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Dodo Payments webhook handler
app.post('/api/webhooks/dodo', async (req: Request, res: Response) => {
  try {
    console.log('=== Dodo Webhook Received ===');
    console.log('Headers:', req.headers);
    console.log('Body type:', typeof req.body);
    
    const signature = req.headers['x-dodo-signature'] as string;
    const rawBody = req.body;

    /*if (!signature) {
      console.error('No signature in headers');
      return res.status(400).json({ error: 'Missing signature' });
    }

    if (!DODO_WEBHOOK_SECRET) {
      console.error('DODO_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    console.log('Signature received:', signature);
    console.log('Raw body length:', Buffer.isBuffer(rawBody) ? rawBody.length : 'Not a buffer');

    // Verify webhook signature
    const hmac = crypto.createHmac('sha256', DODO_WEBHOOK_SECRET);
    const digest = hmac.update(rawBody).digest('hex');

    console.log('Computed digest:', digest);
    console.log('Signature match:', digest === signature);

    if (digest !== signature) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }
*/
    const event = JSON.parse(rawBody.toString());
    const eventType = event.type;

    console.log('Dodo Payments webhook event type:', eventType);
    console.log('Event data:', JSON.stringify(event, null, 2));

    // Handle payment.succeeded event
    if (eventType === 'payment.succeeded') {
      const payment = event.data;
      const userId = payment.metadata?.user_id;
      
      if (!userId) {
        console.error('No user_id in webhook metadata');
        return res.status(400).json({ error: 'Missing user_id' });
      }

      console.log('Processing payment for user:', userId);

      // Get product ID from cart
      const productId = payment.product_cart?.[0]?.product_id || '';
      
      // Determine plan type from product ID
      let planType = 'free';
      const proPriceId = DODO_PRICE_PRO;
      const teamPriceId = DODO_PRICE_TEAM;

      console.log('Checking plan type...');
      console.log('Pro Price ID (from env):', proPriceId);
      console.log('Team Price ID (from env):', teamPriceId);
      console.log('Product ID (from webhook):', productId);
      
      if (productId === proPriceId) {
        planType = 'professional';
      } else if (productId === teamPriceId) {
        planType = 'team';
      } else {
        // Fallback to checking product cart or amount
        if (payment.total_amount >= 9900) {
          planType = 'professional';
        } else if (payment.total_amount >= 2900) {
          planType = 'team';
        }
      }

      console.log('Plan type:', planType);
      console.log('Product ID:', productId);
      console.log('Payment ID:', payment.payment_id);
      console.log('Total amount:', payment.total_amount);
      console.log('Currency:', payment.currency);

      // Save purchase to database
      const { error } = await supabase.from('purchases').insert({
        user_id: userId,
        order_id: payment.payment_id,
        product_id: productId,
        variant_id: payment.invoice_id || '',
        product_name: `${planType} Plan`,
        status: 'paid',
        amount: payment.total_amount,
        currency: payment.currency,
        plan_type: planType,
      });

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Database error' });
      }

      console.log('✅ Purchase recorded successfully for user:', userId);
    }

    // Handle payment.refunded event
    if (eventType === 'payment.refunded') {
      const payment = event.data;
      
      console.log('Processing refund for payment:', payment.payment_id);
      
      await supabase
        .from('purchases')
        .update({ status: 'refunded' })
        .eq('order_id', payment.payment_id);

      console.log('✅ Purchase refunded:', payment.payment_id);
    }

    console.log('=== Webhook processed successfully ===');
    res.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get user's API token (replaces direct Supabase call from frontend)
app.get('/api/user/token', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    
    // Verify the user's JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user's API token from database
    const { data, error } = await supabase
      .from('api_tokens')
      .select('token')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching token:', error);
      return res.status(500).json({ error: 'Failed to fetch token' });
    }

    res.json({ token: data?.token || null });
  } catch (error: any) {
    console.error('Token fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate API token for user
app.post('/api/user/token/generate', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    
    // Verify the user's JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Call Supabase function to generate token
    const { data, error } = await supabase.rpc('generate_api_token', {
      user_uuid: user.id,
    });

    if (error) {
      console.error('Error generating token:', error);
      return res.status(500).json({ error: 'Failed to generate token' });
    }

    res.json({ token: data });
  } catch (error: any) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user account
app.delete('/api/user/delete', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    
    // Verify the user's JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    console.log(`Deleting account for user: ${user.id}`);

    // Delete user data from all tables (cascading deletes should handle most)
    // But we'll explicitly delete to be sure
    
    // Delete API tokens
    await supabase.from('api_tokens').delete().eq('user_id', user.id);
    
    // Delete usage tracking
    await supabase.from('usage_tracking').delete().eq('user_id', user.id);
    
    // Delete purchases
    await supabase.from('purchases').delete().eq('user_id', user.id);

    // Delete the auth user (this is the final step)
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    
    if (deleteError) {
      console.error('Error deleting user from auth:', deleteError);
      return res.status(500).json({ error: 'Failed to delete account' });
    }

    console.log(`Successfully deleted account for user: ${user.id}`);
    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error: any) {
    console.error('Account deletion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/generate', limiter, async (req: Request, res: Response) => {
  try {
    const { yaml: yamlText } = req.body;

    if (!yamlText || typeof yamlText !== 'string') {
      return res.status(400).json({ httpFile: '', error: 'Invalid YAML input' });
    }

    const spec = yaml.load(yamlText) as OpenAPISpec;

    if (!spec || !spec.paths) {
      return res.status(400).json({ httpFile: '', error: 'Invalid OpenAPI/Swagger specification' });
    }

    const httpFile = generateHTTPFile(spec, {
      extractCommonParams: true,
      includeAllMethods: true,
    });

    return res.status(200).json({ httpFile });
  } catch (error) {
    console.error('Error generating HTTP file:', error);
    return res.status(500).json({
      httpFile: '',
      error: error instanceof Error ? error.message : 'Failed to generate HTTP file',
    });
  }
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
