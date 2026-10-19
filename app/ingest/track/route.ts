import { type NextRequest } from 'next/server';
import { clientAddress, consumeRequest, isAllowedOrigin } from '../../../lib/request-guards';

const TRACKING_API = 'https://acrtracking.stealthagents.us/api/track';
const SITE_ID = 'hvac-staffing-company';
const MAX_BODY_BYTES = 256_000;
const MAX_EVENTS_PER_BATCH = 100;
const MAX_EVENT_BYTES = 16_384;

export const runtime = 'nodejs';

function validEvent(event: unknown): event is Record<string, unknown> {
  if (!event || typeof event !== 'object' || Array.isArray(event)) return false;
  const encoded = JSON.stringify(event);
  return encoded.length > 2 && new TextEncoder().encode(encoded).byteLength <= MAX_EVENT_BYTES;
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) return Response.json({ status: 'error', detail: 'Origin not allowed' }, { status: 403 });
  const clientIp = clientAddress(request);
  if (!consumeRequest(`track:${clientIp}`, 120, 60_000)) {
    return Response.json({ status: 'error', detail: 'Too many requests' }, { status: 429 });
  }
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return Response.json({ status: 'error', detail: 'JSON required' }, { status: 415 });
  }

  try {
    const rawLength = request.headers.get('content-length');
    if (rawLength && (!/^\d+$/.test(rawLength) || Number(rawLength) > MAX_BODY_BYTES)) {
      return Response.json({ status: 'error', detail: 'Payload too large' }, { status: 413 });
    }
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return Response.json({ status: 'error', detail: 'Payload too large' }, { status: 413 });
    }

    let payload: { site_id?: unknown; events?: unknown };
    try { payload = JSON.parse(body); }
    catch { return Response.json({ status: 'error', detail: 'Invalid JSON' }, { status: 400 }); }
    if (Object.keys(payload).some((key) => key !== 'site_id' && key !== 'events')
      || payload.site_id !== SITE_ID
      || !Array.isArray(payload.events)
      || payload.events.length < 1
      || payload.events.length > MAX_EVENTS_PER_BATCH
      || payload.events.some((event) => !validEvent(event))) {
      return Response.json({ status: 'error', detail: 'Invalid tracking batch' }, { status: 400 });
    }

    const upstream = await fetch(TRACKING_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': clientIp,
        'X-ACR-Client-IP': clientIp,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    const responseBody = await upstream.arrayBuffer();
    const headers = new Headers();
    const contentType = upstream.headers.get('content-type');
    if (contentType) headers.set('content-type', contentType);
    headers.set('cache-control', 'no-store');
    return new Response(responseBody, { status: upstream.status, headers });
  } catch (error) {
    console.error('ACR proxy error', error);
    return Response.json({ status: 'error', detail: 'Tracking service unavailable' }, { status: 502 });
  }
}

export function GET() {
  return Response.json({ status: 'ok' }, { headers: { 'cache-control': 'no-store' } });
}
