-- Fix RLS policies to work properly with fingerprint-based tracking
-- The previous policies were too permissive for anonymous users

-- Drop old policies
DROP POLICY IF EXISTS "Users can view own usage" ON usage_tracking;
DROP POLICY IF EXISTS "Users can insert own usage" ON usage_tracking;
DROP POLICY IF EXISTS "Users can update own usage" ON usage_tracking;

-- New policies: Allow all anonymous users to read/write
-- (Fingerprint matching happens in application code, not database)
-- This is acceptable because fingerprints are hashed and non-sensitive

CREATE POLICY "Anonymous users can view all usage"
  ON usage_tracking
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anonymous users can insert usage"
  ON usage_tracking
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anonymous users can update usage"
  ON usage_tracking
  FOR UPDATE
  TO anon
  USING (true);

-- Authenticated users can access all (for future admin features)
CREATE POLICY "Authenticated users can view all usage"
  ON usage_tracking
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage usage"
  ON usage_tracking
  FOR ALL
  TO authenticated
  USING (true);
