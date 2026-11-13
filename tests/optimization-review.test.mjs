import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

test('home, services, blog, and research use distinct relevant visual assets', () => {
  const assets = [
    'public/hvac-operations-hero.jpg',
    'public/hvac-services-workflow.jpg',
    'public/hvac-blog-editorial.jpg',
    'public/hvac-research-editorial.jpg',
  ];
  for (const asset of assets) assert.ok(existsSync(join(root, asset)), asset);
  assert.match(read('lib/site.ts'), /"heroImage": "\/hvac-operations-hero\.jpg"/);
  assert.match(read('app/services/page.tsx'), /\/hvac-services-workflow\.jpg/);
  assert.match(read('app/blog/page.tsx'), /\/hvac-blog-editorial\.jpg/);
  assert.match(read('app/research/page.tsx'), /\/hvac-research-editorial\.jpg/);
});

test('blog category controls filter, expose active state, and reset without replacing article links', () => {
  const source = read('components/BlogIndex.tsx');
  for (const contract of ['aria-pressed', 'chooseCategory', 'Reset filter', 'window.history.replaceState', 'aria-live']) assert.match(source, new RegExp(contract));
  assert.match(source, /<Link className="article-card" href=\{`\/blog\/\$\{post\.slug\}`\}/);
  assert.match(source, /type="button"/);
});

test('article framing has one responsive TOC system and closes mobile disclosure after anchor choice', () => {
  const source = read('components/ArticleFrame.tsx');
  assert.doesNotMatch(source, /TocSync/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /closest\('details'\)\?\.removeAttribute\('open'\)/);
  assert.match(source, /article-mobile-toc/);
  assert.match(read('app/globals.css'), /\.article-mobile-toc\{position:sticky/);
});

test('contact team photo carries repository-approved first-party attribution', () => {
  const provenance = JSON.parse(read('app/review-provenance.json'));
  assert.equal(provenance.photo.source, 'https://stealthagents.com/');
  assert.equal(provenance.photo.sourceType, 'Official StealthAgents first-party website');
  const contact = read('app/contact-us/page.tsx');
  assert.match(contact, /Official StealthAgents team photo, Bacolod/);
  assert.match(contact, /provenance\.photo\.source/);
});
