-- Add purchases table for Dodo Payments one-time payments
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Dodo Payments data
  order_id TEXT NOT NULL UNIQUE,
  product_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  
  -- Purchase details
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, refunded
  amount INTEGER NOT NULL, -- in cents
  currency TEXT NOT NULL DEFAULT 'USD',
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Plan type derived from product
  plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'team', 'professional'))
);

-- Indexes
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_order_id ON purchases(order_id);
CREATE INDEX idx_purchases_status ON purchases(status);

-- RLS policies
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases"
  ON purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Only backend can insert purchases (via service role)
CREATE POLICY "Service role can insert purchases"
  ON purchases
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Only backend can update purchases
CREATE POLICY "Service role can update purchases"
  ON purchases
  FOR UPDATE
  TO service_role
  USING (true);

-- Function to get user's current plan
CREATE OR REPLACE FUNCTION get_user_plan(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  user_plan TEXT;
BEGIN
  -- Get the highest plan the user has purchased
  SELECT 
    CASE 
      WHEN MAX(CASE WHEN plan_type = 'professional' THEN 3 ELSE 0 END) > 0 THEN 'professional'
      WHEN MAX(CASE WHEN plan_type = 'team' THEN 2 ELSE 0 END) > 0 THEN 'team'
      ELSE 'free'
    END INTO user_plan
  FROM purchases
  WHERE user_id = user_uuid
    AND status = 'paid';
  
  RETURN COALESCE(user_plan, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has paid plan
CREATE OR REPLACE FUNCTION has_paid_plan(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM purchases 
    WHERE user_id = user_uuid 
      AND status = 'paid'
      AND plan_type IN ('team', 'professional')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
