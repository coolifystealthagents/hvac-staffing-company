import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

const chrome = () => read('components/SiteChrome.tsx');
const layout = () => read('app/layout.tsx');
const contact = () => read('app/contact-us/page.tsx');
const sourceFiles = (directory = root) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  if (entry.isDirectory()) {
    if (['.git', '.next', 'node_modules'].includes(entry.name)) return [];
    return sourceFiles(path);
  }
  return /\.(?:ts|tsx|js|mjs|md|json)$/.test(entry.name) ? [path] : [];
});

test('sticky accessible chrome has exact required menu and parent attribution', () => {
  const source = chrome();
  for (const text of ['Home', 'Services', 'Contact Us', 'Powered by StealthAgents', 'aria-expanded', 'aria-controls', 'Escape']) assert.match(source, new RegExp(text));
  assert.match(source, /skip-link/);
  assert.doesNotMatch(source, /TimedLeadModal|timed-modal/);
  assert.doesNotMatch(layout(), /TimedLeadModal/);
});

test('contact owns the complete form, ten approved reviews, and no scheduler', () => {
  const provenance = JSON.parse(read('app/review-provenance.json'));
  assert.equal(provenance.records.length, 10);
  assert.equal(new Set(provenance.records.map(({ headline, body, name }) => `${headline}|${body}|${name}`)).size, 10);
  const source = contact();
  assert.match(source, /StealthAgents reviews/);
  assert.match(source, /review-rail/);
  assert.match(source, /LeadForm source="contact-page-consultation"/);
  assert.match(source, /Official team, Bacolod/);
  assert.match(source, /stealth-agents-team\.webp/);
  assert.match(source, /stealth-agents-logo-black\.png/);
  assert.doesNotMatch(source, /oncehub|booking-frame|iframe/i);
});

test('conversion sequence, API ownership, and tracking contracts remain intact', () => {
  const form = read('components/LeadForm.tsx');
  const api = read('app/api/submit-lead/route.ts');
  const thanks = read('app/thank-you/page.tsx');
  for (const field of ['first_name', 'last_name', 'email', 'phone_country', 'phone', 'company', 'company_size', 'positions_to_fill', 'referral_source', 'source']) assert.match(form + api, new RegExp(field));
  assert.match(form, /\/api\/submit-lead/);
  assert.match(form, /trackLead/);
  assert.match(form, /router\.push\('\/thank-you'\)/);
  assert.match(api, /personalDomains/);
  assert.match(api, /status: 400/);
  assert.match(thanks, /go\.oncehub\.com\/StealthAgentsTeam/);
  assert.match(layout(), /hvac-staffing-company/);
});

test('all service routes use the complete operations manual contract', () => {
  const site = read('lib/site.ts');
  const page = read('app/services/[slug]/page.tsx');
  assert.equal((site.match(/"slug":/g) || []).length, 6);
  for (const heading of ['Who this role is for', 'Inputs and access', 'Workflow and deliverables', 'Quality controls', 'Decision boundaries', 'Common starting scenarios', 'Frequently asked questions', 'Related services']) assert.match(page, new RegExp(heading));
  assert.match(read('app/services/page.tsx'), /service-system/);
});

test('blog and research details share complete interactive article framing', () => {
  const article = read('components/ArticleFrame.tsx');
  assert.match(article, /Table of contents/);
  assert.match(article, /IntersectionObserver/);
  assert.match(article, /aria-current/);
  assert.match(article, /article-sidebar/);
  assert.match(article, /article-mobile-toc/);
  assert.match(article, /Related/);
  assert.match(read('app/blog/[slug]/page.tsx'), /ArticleFrame/);
  assert.match(read('app/research/[slug]/page.tsx'), /ArticleFrame/);
  for (const id of ['cta-blog-final-bookcall', 'cta-blog-sidebar-schedulecall', 'cta-research-final-bookcall']) assert.match(article, new RegExp(id));
});

test('uniform logos, official assets, route canonicals, and noindex confirmations', () => {
  for (const file of ['public/logo.svg', 'public/stealth-agents-logo-black.png', 'public/stealth-agents-team.webp']) assert.ok(existsSync(join(root, file)), file);
  assert.match(layout(), /icons:.*logo\.svg/s);
  assert.ok((chrome().match(/\/logo\.svg/g) || []).length >= 2);
  assert.match(read('app/services/page.tsx'), /canonical:\s*['"]\/services/);
  assert.match(read('app/services/[slug]/page.tsx'), /canonical:/);
  assert.match(read('app/privacy/page.tsx'), /canonical:\s*['"]\/privacy/);
  assert.match(read('app/terms/page.tsx'), /canonical:\s*['"]\/terms/);
  assert.match(read('app/thank-you/page.tsx'), /index:false/);
  assert.match(read('app/thanks-whats-next/page.tsx'), /index:false/);
});

test('security and redirect contracts account for Cloudflare scheme', () => {
  const config = read('next.config.mjs');
  const middleware = read('proxy.ts');
  for (const header of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) assert.match(config, new RegExp(header));
  assert.match(config, /acrtracking\.stealthagents\.us/);
  assert.match(config, /go\.oncehub\.com/);
  assert.match(middleware, /cf-visitor/);
  assert.match(middleware, /www\./);
  assert.match(middleware, /url\.port\s*=\s*['"]['"]/);
});

test('design record, clause ledger, and punctuation safeguards exist', () => {
  const registry = JSON.parse(read('design-registry.json'));
  assert.equal(registry.domain, 'hvacstaffingcompany.com');
  assert.equal(registry.designRead.DESIGN_VARIANCE, 8);
  assert.ok(existsSync(join(root, 'docs/v3-prompt-clause-ledger.md')));
  const commercial = ['components/SiteChrome.tsx','components/Marketing.tsx','app/contact-us/page.tsx','app/services/page.tsx','app/services/[slug]/page.tsx'].map(read).join('\n');
  const prohibitedDashes = new RegExp('[\\u2013\\u2014]');
  assert.doesNotMatch(commercial, prohibitedDashes);
  for (const file of sourceFiles()) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), prohibitedDashes, `prohibited dash glyph in ${file}`);
  }
  assert.doesNotMatch(commercial, />\s*0[1-9]\s*</);
  assert.doesNotMatch(commercial, /service-number|method-art|step-card[^\n]*0\{/);
});
