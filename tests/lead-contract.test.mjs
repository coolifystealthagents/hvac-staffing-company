import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

const route = () => read('app/api/submit-lead/route.ts');
const fallback = () => read('lib/lead-fallback-mattermost.ts');
const form = () => read('components/LeadForm.tsx');

test('lead API validates actual body bytes, media parsing, fields, scalars, lengths, and exact sources', () => {
  const source = route();
  assert.match(source, /MAX_BODY_BYTES\s*=\s*65_?536/);
  assert.match(source, /request\.body\.getReader\(\)/);
  assert.match(source, /try\s*\{[\s\S]*formData\(\)[\s\S]*\}\s*catch/);
  assert.match(source, /allowedFields/);
  for (const field of ['first_name', 'last_name', 'email', 'phone_country', 'phone', 'company', 'company_website', 'company_size', 'positions_to_fill', 'referral_source', 'message', 'source', 'website_url']) {
    assert.match(source, new RegExp(`['"]${field}['"]`));
  }
  assert.match(source, /value instanceof File|typeof value !== ['"]string['"]/);
  assert.match(source, /form\.getAll\(key\)\.length/);
  assert.match(source, /allowedSources/);
  assert.match(source, /['"]contact-page['"]/);
  assert.match(source, /['"]contact-page-consultation['"]/);
  assert.match(source, /Field is too long|fieldLimits/);
});

test('accepted API response means ACR HTTP success or awaited successful fallback', () => {
  const api = route();
  const directFallback = fallback();
  assert.match(api, /AbortController/);
  assert.match(api, /await sendLeadFallbackToMattermost/);
  assert.match(api, /fallbackAccepted/);
  assert.match(api, /forwarded\.ok/);
  assert.doesNotMatch(api, /await forwarded\.json\(\)/);
  assert.match(directFallback, /Promise<boolean>/);
  assert.match(directFallback, /return response\.ok/);
  assert.match(directFallback, /AbortController/);
});

test('honeypot success is identified as ignored and cannot produce client analytics or navigation', () => {
  const api = route();
  const client = form();
  assert.match(api, /ok:\s*true,\s*ignored:\s*true/);
  assert.match(client, /result\.ignored/);
  assert.ok(client.indexOf('result.ignored') < client.indexOf('trackLead'));
  assert.ok(client.indexOf('result.ignored') < client.indexOf("router.push('/thank-you')"));
});

test('form errors expose associations and focus an actionable field', () => {
  const client = form();
  assert.match(client, /useRef/);
  assert.match(client, /id="lead-form-error"/);
  assert.match(client, /aria-invalid/);
  assert.match(client, /aria-describedby/);
  assert.match(client, /\.focus\(\)/);
  for (const field of ['first_name', 'last_name', 'email', 'phone_country', 'phone', 'company', 'company_size', 'positions_to_fill', 'referral_source', 'source']) {
    assert.match(client, new RegExp(`name=["']${field}["']`));
  }
});

test('privacy disclosure covers submitted staffing data, request metadata, and processors', () => {
  const privacy = read('app/privacy/page.tsx');
  for (const phrase of ['phone number', 'company name', 'company size', 'positions', 'user agent', 'page URL', 'ACR', 'Mattermost']) {
    assert.match(privacy, new RegExp(phrase, 'i'));
  }
  assert.match(privacy, /emergency/i);
});
