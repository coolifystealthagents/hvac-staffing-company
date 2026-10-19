const buckets = new Map<string, { count: number; resetAt: number }>();
const MAX_BUCKETS = 10_000;
const PRODUCTION_HOSTS = new Set(['hvacstaffingcompany.com', 'www.hvacstaffingcompany.com']);

/** Cloudflare overwrites this header at the production edge. Unknown clients share one bounded bucket. */
export function clientAddress(request: Request): string {
  return request.headers.get('cf-connecting-ip')?.trim() || 'unknown';
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  let parsed: URL;
  try { parsed = new URL(origin); } catch { return false; }

  const hostname = parsed.hostname.toLowerCase();
  if (parsed.protocol === 'https:' && PRODUCTION_HOSTS.has(hostname)) return true;
  return process.env.NODE_ENV !== 'production'
    && parsed.protocol === 'http:'
    && (hostname === 'localhost' || hostname === '127.0.0.1');
}

export function consumeRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const current = buckets.get(key);
  if (current && current.resetAt > now) {
    if (current.count >= limit) return false;
    current.count += 1;
    return true;
  }

  if (buckets.size >= MAX_BUCKETS) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
    if (buckets.size >= MAX_BUCKETS && !buckets.has(key)) return false;
  }
  buckets.set(key, { count: 1, resetAt: now + windowMs });
  return true;
}
