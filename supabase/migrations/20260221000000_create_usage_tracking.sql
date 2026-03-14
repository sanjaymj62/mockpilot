-- Create usage_tracking table
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  fingerprint_hash TEXT,
  generation_count INTEGER DEFAULT 0 NOT NULL,
  first_generation_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_generation_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_usage_tracking_user_id ON usage_tracking(user_id);
CREATE INDEX idx_usage_tracking_fingerprint ON usage_tracking(fingerprint_hash);

-- Enable Row Level Security
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own usage
CREATE POLICY "Users can view own usage"
  ON usage_tracking
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    auth.role() = 'anon'
  );

-- Policy: Users can insert their own usage
CREATE POLICY "Users can insert own usage"
  ON usage_tracking
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR
    auth.role() = 'anon'
  );

-- Policy: Users can update their own usage
CREATE POLICY "Users can update own usage"
  ON usage_tracking
  FOR UPDATE
  USING (
    auth.uid() = user_id OR
    auth.role() = 'anon'
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_usage_tracking_updated_at
  BEFORE UPDATE ON usage_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
