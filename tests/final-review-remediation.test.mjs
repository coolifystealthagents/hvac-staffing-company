import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

test('contact route does not emit a linked empty stylesheet chunk', () => {
  const page = read('app/contact-us/page.tsx');
  assert.doesNotMatch(page, /import ['"]\.\/contact\.css['"]/);
});

test('both public ingestion routes enforce same-origin and bounded per-client throttling', () => {
  for (const path of ['app/api/submit-lead/route.ts', 'app/ingest/track/route.ts']) {
    const source = read(path);
    assert.match(source, /isAllowedOrigin/);
    assert.match(source, /429/);
    assert.match(source, /consumeRequest/);
  }
  const guards = read('lib/request-guards.ts');
  assert.match(guards, /cf-connecting-ip/);
  assert.doesNotMatch(guards, /x-real-ip|x-forwarded-for/);
  assert.match(guards, /MAX_BUCKETS/);
});

test('tracking relay parses and validates a site-bound event instead of forwarding arbitrary text', () => {
  const source = read('app/ingest/track/route.ts');
  assert.match(source, /JSON\.parse/);
  assert.match(source, /MAX_EVENTS_PER_BATCH/);
  assert.match(source, /MAX_EVENT_BYTES/);
  assert.match(source, /hvac-staffing-company/);
  assert.doesNotMatch(source, /body,\s*\n\s*cache/);
});

test('fallback includes every protected lead field and neutralizes Mattermost mentions', () => {
  const source = read('lib/lead-fallback-mattermost.ts');
  for (const field of ['phoneCountry', 'companyWebsite', 'source']) assert.match(source, new RegExp(field));
  assert.match(source, /replace\(\/@/);
  const api = read('app/api/submit-lead/route.ts');
  for (const field of ['fields.phone_country', 'fields.company_website', 'source']) assert.match(api, new RegExp(field.replace('.', '\\.')));
});

test('accepted lead navigation is not cancelled by optional tracker failure', () => {
  const source = read('components/LeadForm.tsx');
  assert.match(source, /try\s*\{\s*window\.acrTracker\?\.trackLead[\s\S]*?\}\s*catch/);
  assert.ok(source.indexOf("router.push('/thank-you')") > source.indexOf('window.acrTracker?.trackLead'));
});

test('trust copy is provenance accurate and contains no unsupported selection-rate claim', () => {
  const contact = read('app/contact-us/page.tsx');
  assert.match(contact, /Source-displayed rating: 5 out of 5/);
  assert.doesNotMatch(contact, /aria-label="5 out of 5 stars"|★★★★★/);
  assert.doesNotMatch(read('lib/site.ts'), /Top 1 percent/i);
});

test('legacy guidance is comparison-specific and suppresses unrelated generic sources', () => {
  const guidance = read('lib/editorial-guidance.ts');
  for (const term of ['Decision owner', 'Daily queue ownership', 'Hiring and coaching', 'Escalation authority']) assert.match(guidance, new RegExp(term, 'i'));
  const page = read('app/blog/[slug]/page.tsx');
  assert.match(page, /sources=\{guidance \? \[\] : \[post\.source\]\}/);
});

test('October 13 routes render concise stage-specific sections rather than repeated checkpoint prose', () => {
  const helper = read('lib/reader-sections.ts');
  for (const heading of ['Operating scope', 'Source record', 'Exception path', 'Acceptance check', 'Decision boundary']) assert.match(helper, new RegExp(heading));
  assert.doesNotMatch(helper, /checkpoint \d|stage \d/i);
  assert.match(read('app/blog/[slug]/page.tsx'), /readerSectionsForBlog/);
  assert.match(read('app/research/[slug]/page.tsx'), /readerSectionsForResearch/);
});
