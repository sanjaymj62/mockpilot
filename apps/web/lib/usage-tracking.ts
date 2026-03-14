const FREE_TIER_LIMIT = 3;
const USAGE_COUNT_KEY = 'mockpilot_usage_count';

// Get usage count from localStorage (fallback)
function getLocalUsageCount(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const count = localStorage.getItem(USAGE_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
  } catch {
    return 0;
  }
}

// Set usage count in localStorage
function setLocalUsageCount(count: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(USAGE_COUNT_KEY, count.toString());
  } catch {
    // Ignore errors
  }
}

// Check if user has exceeded limit (simple localStorage check)
export async function checkUsageLimit(): Promise<{ allowed: boolean; remaining: number; total: number }> {
  const localCount = getLocalUsageCount();
  const remaining = Math.max(0, FREE_TIER_LIMIT - localCount);
  
  return {
    allowed: localCount < FREE_TIER_LIMIT,
    remaining,
    total: FREE_TIER_LIMIT,
  };
}

// Increment usage count
export async function incrementUsageCount(): Promise<{ success: boolean; newCount: number }> {
  const localCount = getLocalUsageCount() + 1;
  setLocalUsageCount(localCount);
  
  return { success: true, newCount: localCount };
}

// Get current usage stats
export async function getUsageStats(): Promise<{ count: number; limit: number; remaining: number }> {
  const localCount = getLocalUsageCount();
  const remaining = Math.max(0, FREE_TIER_LIMIT - localCount);
  
  return {
    count: localCount,
    limit: FREE_TIER_LIMIT,
    remaining,
  };
}
