import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

test('home, services, blog, and research use distinct relevant visual assets', () => {
  const assets = [
    'public/hvac-staffing-operations-team.jpg',
    'public/hvac-services-workflow.jpg',
    'public/hvac-blog-editorial.jpg',
    'public/hvac-research-editorial.jpg',
  ];
  for (const asset of assets) assert.ok(existsSync(join(root, asset)), asset);
  assert.match(read('lib/site.ts'), /"heroImage": "\/hvac-staffing-operations-team\.jpg"/);
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

test('contact team photo matches the official first-party company deck', () => {
  const provenance = JSON.parse(read('app/review-provenance.json'));
  assert.equal(provenance.photo.source, 'https://stealthagents.com/wp-content/uploads/2025/07/stealth-deck.pdf');
  assert.equal(provenance.photo.sourceType, 'Official Stealth Agents first-party company deck');
  assert.equal(provenance.photo.asset, '/stealth-agents-bacolod-team-official.jpg');
  assert.ok(!('verifiedOn' in provenance.photo));
  const contact = read('app/contact-us/page.tsx');
  assert.match(contact, /Stealth Agents team in Bacolod/);
  assert.match(contact, /official Stealth Agents company deck/);
  assert.doesNotMatch(contact, /First-party source verified/);
  assert.match(contact, /provenance\.photo\.source/);
  const photo = readFileSync(join(root, 'public/stealth-agents-bacolod-team-official.jpg'));
  assert.equal(createHash('sha256').update(photo).digest('hex'), '19543866547bd6bb5b5eb9a329db2e8495ea580a87016c8cb48b1ccdca916736');
});

test('reviewed homepage and services duplication is absent without changing destinations', () => {
  const home = read('components/Marketing.tsx');
  const site = read('lib/site.ts');
  const services = read('app/services/page.tsx');
  assert.doesNotMatch(home, /Start with one recurring office queue|hero-offer|site\.heroBody/);
  assert.match(home, /hvac-approved-handoff-review\.jpg/);
  assert.match(home, /Illustrative dispatch handoff and records review/);
  assert.doesNotMatch(home, /workflow-diagram/);
  assert.doesNotMatch(site, /Specialist remote staff support dispatch records/);
  assert.match(site, /"heroImage": "\/hvac-staffing-operations-team\.jpg"/);
  for (const removed of ['Selection guidance', 'Decision guidance', 'Start where operating context is being lost', 'What makes a workflow ready']) {
    assert.doesNotMatch(services, new RegExp(removed));
  }
  assert.match(services, /id="service-directory"/);
  assert.match(services, /site\.services\.map/);
  assert.match(services, /href=\{`\/services\/\$\{service\.slug\}`\}/);
});
