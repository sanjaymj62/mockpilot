-- Create API tokens table for CLI authentication
CREATE TABLE IF NOT EXISTS api_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT 'CLI Token',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

-- Index for fast lookups
CREATE INDEX idx_api_tokens_token ON api_tokens(token);
CREATE INDEX idx_api_tokens_user_id ON api_tokens(user_id);

-- RLS policies
ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only see their own tokens
CREATE POLICY "Users can view own tokens"
  ON api_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own tokens
CREATE POLICY "Users can create own tokens"
  ON api_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own tokens
CREATE POLICY "Users can delete own tokens"
  ON api_tokens
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to generate API token
CREATE OR REPLACE FUNCTION generate_api_token(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  token TEXT;
BEGIN
  -- Generate a random token (64 characters)
  token := encode(gen_random_bytes(32), 'hex');
  
  -- Insert token
  INSERT INTO api_tokens (user_id, token)
  VALUES (user_uuid, token);
  
  RETURN token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
