import { NextResponse } from 'next/server';
import { sendLeadFallbackToMattermost } from '../../../lib/lead-fallback-mattermost';
import { clientAddress, consumeRequest, isAllowedOrigin } from '../../../lib/request-guards';

const MAX_BODY_BYTES = 65_536;
const FORWARD_TIMEOUT_MS = 5_000;
const personalDomains = new Set(['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'proton.me', 'protonmail.com']);
const allowedSources = new Set(['contact-page', 'contact-page-consultation']);
const allowedFields = new Set([
  'first_name',
  'last_name',
  'name',
  'email',
  'phone_country',
  'phone',
  'company',
  'company_website',
  'company_size',
  'positions_to_fill',
  'referral_source',
  'message',
  'source',
  'website_url',
]);
const fieldLimits: Record<string, number> = {
  first_name: 100,
  last_name: 100,
  name: 200,
  email: 254,
  phone_country: 16,
  phone: 50,
  company: 200,
  company_website: 2_048,
  company_size: 50,
  positions_to_fill: 50,
  referral_source: 100,
  message: 4_000,
  source: 64,
  website_url: 500,
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

async function readLimitedBody(request: Request): Promise<Uint8Array | null> {
  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

async function parseForm(body: Uint8Array, contentType: string): Promise<FormData> {
  const bytes = body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength) as ArrayBuffer;
  return new Response(bytes, { headers: { 'content-type': contentType } }).formData();
}

function scalarFields(form: FormData): { fields?: Record<string, string>; error?: string } {
  const fields: Record<string, string> = {};
  for (const key of new Set(form.keys())) {
    if (!allowedFields.has(key) || form.getAll(key).length !== 1) return { error: 'Invalid form submission.' };
    const value = form.get(key);
    if (typeof value !== 'string') return { error: 'Invalid form submission.' };
    if (value.length > fieldLimits[key]) return { error: 'Field is too long.' };
    fields[key] = value;
  }
  return { fields };
}

async function forwardToAcr(endpoint: string, payload: Record<string, string>): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS);
  try {
    const forwarded = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    });
    return forwarded.ok;
  } catch (error) {
    console.error('[submit-lead] ACR forwarding failed', error);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) return jsonError('Origin not allowed.', 403);
  const rateKey = `lead:${clientAddress(request)}`;
  if (!consumeRequest(rateKey, 8, 10 * 60_000)) return jsonError('Too many requests. Please try again later.', 429);

  const contentLength = request.headers.get('content-length');
  if (contentLength && (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_BODY_BYTES)) {
    return jsonError('Request is too large.', 413);
  }

  const contentType = request.headers.get('content-type') || '';
  const supportedType = contentType.toLowerCase().startsWith('multipart/form-data;')
    || contentType.toLowerCase().startsWith('application/x-www-form-urlencoded');
  if (!supportedType) return jsonError('Unsupported request format.', 415);

  let form: FormData;
  try {
    const body = await readLimitedBody(request);
    if (!body) return jsonError('Request is too large.', 413);
    form = await parseForm(body, contentType);
  } catch {
    return badRequest('Invalid form submission.');
  }

  const validated = scalarFields(form);
  if (!validated.fields) return badRequest(validated.error || 'Invalid form submission.');
  const fields = validated.fields;

  if (fields.website_url) return NextResponse.json({ ok: false, ignored: true });

  const source = (fields.source || '').trim();
  if (!allowedSources.has(source)) return badRequest('Invalid form source.');

  const full = source === 'contact-page-consultation';
  const firstName = (fields.first_name || '').trim();
  const lastName = (fields.last_name || '').trim();
  const legacyName = (fields.name || '').trim();
  const email = (fields.email || '').trim().toLowerCase();
  const company = (fields.company || '').trim();
  const companySize = (fields.company_size || '').trim();
  const positions = (fields.positions_to_fill || '').trim();
  const referral = (fields.referral_source || '').trim();

  if (!/^\S+@\S+\.\S+$/.test(email) || (full ? (!firstName || !lastName || !company || !companySize || !positions || !referral) : !legacyName)) {
    return badRequest('Please complete every required field.');
  }
  if (full && personalDomains.has(email.split('@')[1])) {
    return badRequest('Please use your business email address.');
  }

  const payload: Record<string, string> = { ...fields, email };
  delete payload.website_url;

  const endpoint = process.env.ACR_LEAD_ENDPOINT;
  if (endpoint && await forwardToAcr(endpoint, payload)) {
    return NextResponse.json({ ok: true });
  }

  const fallbackAccepted = await sendLeadFallbackToMattermost({
    name: [firstName, lastName].filter(Boolean).join(' ') || legacyName,
    email,
    phone: fields.phone || '',
    phoneCountry: fields.phone_country || '',
    business: company,
    companyWebsite: fields.company_website || '',
    source,
    message: fields.message || '',
    companySize,
    positions,
    referral,
    pageUrl: request.headers.get('referer') || '',
    userAgent: request.headers.get('user-agent') || '',
  });
  if (fallbackAccepted) return NextResponse.json({ ok: true, fallback: true });

  return jsonError('We could not send your request.', 502);
}
