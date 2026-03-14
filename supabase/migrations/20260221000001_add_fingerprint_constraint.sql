-- Add unique constraint to fingerprint_hash to prevent duplicate tracking
-- This ensures one device = one tracking record regardless of localStorage clearing

ALTER TABLE usage_tracking 
ADD CONSTRAINT unique_fingerprint_hash UNIQUE (fingerprint_hash);

-- Optional: Create a composite unique index for better performance
-- This allows the same fingerprint to exist with NULL user_id, but ensures uniqueness
DROP INDEX IF EXISTS idx_usage_tracking_fingerprint;
CREATE UNIQUE INDEX idx_unique_fingerprint ON usage_tracking(fingerprint_hash) 
WHERE fingerprint_hash IS NOT NULL;
