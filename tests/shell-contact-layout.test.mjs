import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

const routeShells = [
  'app/about/page.tsx',
  'app/blog/page.tsx',
  'app/contact-us/page.tsx',
  'app/not-found.tsx',
  'app/privacy/page.tsx',
  'app/research/page.tsx',
  'app/services/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/terms/page.tsx',
  'app/thank-you/page.tsx',
  'app/thanks-whats-next/page.tsx',
  'components/ArticleFrame.tsx',
  'components/Marketing.tsx',
];

test('root layout owns the sole main landmark and preserves the skip-link target', () => {
  const layout = read('app/layout.tsx');
  const chrome = read('components/SiteChrome.tsx');
  assert.match(layout, /<main id="main-content" tabIndex=\{-1\}>\{children\}<\/main>/);
  assert.equal((layout.match(/<main\b/g) || []).length, 1);
  assert.match(chrome, /<a className="skip-link" href="#main-content">Skip to content<\/a>/);
  for (const path of routeShells) {
    assert.doesNotMatch(read(path), /<\/?main\b/, `${path} must not nest a main landmark`);
  }
});

test('full consultation keeps its complete contract in a compact, sensible field order', () => {
  const form = read('components/LeadForm.tsx');
  const fullBlock = form.match(/\{full \? <>[\s\S]*?<\/> : <>/)?.[0] ?? '';
  const expected = ['first_name', 'last_name', 'email', 'phone_country', 'phone', 'company', 'company_website', 'company_size', 'positions_to_fill', 'referral_source'];
  const positions = expected.map((name) => {
    const index = fullBlock.indexOf(`name="${name}"`);
    assert.notEqual(index, -1, `missing full-form field ${name}`);
    return index;
  });
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b), 'full-form fields must remain in a sensible established order');
  assert.match(form, /name="message" rows=\{2\}/);
  assert.match(form, /name="source" value=\{source\}/);
  assert.match(form, /name="website_url"/);
  assert.match(form, /source === 'contact-page-consultation'/);
  assert.match(form, /fetch\('\/api\/submit-lead'/);
  assert.match(form, /trackLead\(\{ \.\.\.payload, source \}\)/);
  assert.match(form, /router\.push\('\/thank-you'\)/);
});

test('desktop consultation pairs related fields and mobile remains one column', () => {
  const form = read('components/LeadForm.tsx');
  for (const name of ['company', 'company_website', 'company_size', 'positions_to_fill']) {
    const label = form.match(new RegExp(`<label([^>]*)>[^<]*(?:<span[^>]*>\\*<\\/span>)?<input[^>]*name="${name}"|<label([^>]*)>[^<]*(?:<span[^>]*>\\*<\\/span>)?<select[^>]*name="${name}"`))?.[0] ?? '';
    assert.doesNotMatch(label, /form-wide/, `${name} should share a desktop row with its related field`);
  }
  const css = read('app/globals.css');
  assert.match(css, /@media\(min-width:901px\)[\s\S]*\.contact-form-card/);
  assert.match(css, /@media\(min-width:901px\)[\s\S]*\.lead-form textarea/);
  assert.match(css, /@media\(max-width:900px\)[\s\S]*\.lead-form\{grid-template-columns:1fr\}/);
});

test('honeypot stays non-visual and editorial diagrams preserve their full canvas', () => {
  const form = read('components/LeadForm.tsx');
  const css = read('app/globals.css');
  assert.match(form, /className="honeypot"[^>]*aria-hidden="true"/);
  assert.match(css, /\.honeypot\{[^}]*position:absolute!important[^}]*left:-10000px!important/);
  assert.match(css, /\.article-hero-image\{[^}]*height:auto[^}]*object-fit:contain/);
});

test('changed reader-facing shells contain no em or en dash glyphs', () => {
  for (const path of [...routeShells, 'app/layout.tsx', 'components/LeadForm.tsx']) {
    assert.doesNotMatch(read(path), /[\u2013\u2014]/, `${path} contains a forbidden dash glyph`);
  }
});
