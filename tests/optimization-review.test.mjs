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
  for (const contract of ['value={activeCategory}', 'chooseCategory', 'Reset filter', 'window.history.replaceState', 'aria-live']) assert.match(source, new RegExp(contract));
  assert.match(source, /<Link className="article-card" href=\{`\/blog\/\$\{post\.slug\}`\}/);
  assert.match(source, /<select className="library-filter-select"/);
  assert.match(source, /type BlogListing = Pick<BlogPost/);
  assert.match(read('app/blog/page.tsx'), /const listings=blogPosts\.map/);
  assert.match(source, /const pageSize = 24/);
  assert.match(source, /slice\(firstPost - 1, lastPost\)/);
  assert.match(source, /aria-label="Blog article pagination"/);
  assert.match(source, /window\.history\.pushState/);
  assert.match(source, /window\.addEventListener\('popstate', syncFromLocation\)/);
  assert.match(source, /import Image from 'next\/image'/);
  assert.match(source, /type="button"/);
});

test('research index filters by cluster and passes only card fields to the client', () => {
  const index = read('components/ResearchIndex.tsx');
  for (const contract of ['value={activeCluster}', 'chooseCluster', 'Reset filter', "params\\.get\\('cluster'\\)", 'window.history.replaceState', 'aria-live']) assert.match(index, new RegExp(contract));
  assert.match(index, /<select className="library-filter-select"/);
  assert.match(index, /const pageSize = 24/);
  assert.match(index, /slice\(firstPost - 1, lastPost\)/);
  assert.match(index, /aria-label="Research brief pagination"/);
  assert.match(index, /window\.history\.pushState/);
  assert.match(index, /window\.addEventListener\('popstate', syncFromLocation\)/);
  assert.match(index, /import Image from 'next\/image'/);
  assert.match(index, /href=\{`\/research\/\$\{post\.slug\}`\}/);
  assert.match(read('app/research/page.tsx'), /const listings=researchPosts\.map/);
  assert.match(read('app/research/[slug]/page.tsx'), /item\.cluster === post\.cluster/);
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

test('contact presents the request form before first-party reviews and keeps decisions with the client', () => {
  const contact = read('app/contact-us/page.tsx');
  const form = contact.indexOf('className="contact-form-card"');
  const reviews = contact.indexOf('className="contact-reviews"');
  assert.ok(form > -1 && reviews > form, 'the consultation form precedes the review rail');
  assert.match(contact, /consultation-outline/);
  assert.match(contact, /LeadForm source="contact-page-consultation"/);
  assert.match(contact, /approval authority stays with your HVAC team/);
});

test('reviewed homepage and services duplication is absent without changing destinations', () => {
  const home = read('components/Marketing.tsx');
  const site = read('lib/site.ts');
  const services = read('app/services/page.tsx');
  assert.doesNotMatch(home, /Start with one recurring office queue|hero-offer|site\.heroBody/);
  assert.match(home, /hvac-approved-handoff-review\.jpg/);
  assert.match(home, /Illustrative dispatch handoff and records review/);
  assert.match(home, /Dispatch updates, service follow-ups, estimates, and office records are prepared for review/);
  assert.doesNotMatch(home, /workflow-diagram/);
  assert.match(home, /Common office pressure points/);
  assert.doesNotMatch(site, /Specialist remote staff support dispatch records/);
  assert.match(site, /"heroImage": "\/hvac-staffing-operations-team\.jpg"/);
  assert.match(services, /\/hvac-services-workflow\.jpg/);
  assert.match(read('app/globals.css'), /\.service-directory\{min-width:0\}/);
  for (const removed of ['Selection guidance', 'Decision guidance', 'Start where operating context is being lost', 'What makes a workflow ready']) {
    assert.doesNotMatch(services, new RegExp(removed));
  }
  assert.match(services, /id="service-directory"/);
  assert.match(services, /site\.services\.map/);
  assert.match(services, /href=\{`\/services\/\$\{service\.slug\}`\}/);
});

test('article sidebars lead to the associated service and related editorial material', () => {
  const blog = read('app/blog/[slug]/page.tsx');
  const research = read('app/research/[slug]/page.tsx');
  assert.match(blog, /post\.internalService/);
  assert.match(blog, /post\.internalSibling/);
  assert.match(blog, /item\.category === post\.category/);
  assert.match(research, /item\.cluster === post\.cluster/);
  assert.match(read('components/ArticleFrame.tsx'), /Related resources/);
});

test('SEO previews and sitemap dates follow the updated page artwork and routes', () => {
  const sitemap = read('app/sitemap.ts');
  for (const [file, asset] of [
    ['app/services/page.tsx', '/hvac-services-workflow.jpg'],
    ['app/blog/page.tsx', '/hvac-blog-editorial.jpg'],
    ['app/research/page.tsx', '/hvac-research-editorial.jpg'],
    ['app/contact-us/page.tsx', '/hvac-approved-handoff-review.jpg'],
  ]) {
    assert.match(read(file), /openGraph:/, `${file} defines Open Graph metadata`);
    assert.ok(read(file).includes(asset), `${file} uses its relevant share image`);
  }
  assert.match(read('app/services/[slug]/page.tsx'), /images: \[\{ url: service\.heroImage/);
  assert.match(read('app/blog/[slug]/page.tsx'), /const artwork = guidance\?\.artwork \?\?/);
  assert.match(read('app/research/[slug]/page.tsx'), /const artwork = guidance\?\.artwork \?\?/);
  for (const path of ['/services', '/contact-us', '/blog', '/research']) assert.ok(sitemap.includes(`path: '${path}'`), `sitemap has a date for ${path}`);
  assert.match(sitemap, /path: '\/contact-us', lastModified: '2026-11-25'/);
  assert.match(sitemap, /path: '\/blog', lastModified: '2026-11-25'/);
  assert.match(sitemap, /const editorialTemplateUpdatedAt = updated\('2026-11-24'\)/);
  assert.match(sitemap, /lastModified: latestEditorialUpdate\(post\.publishedAt\)/);
});
