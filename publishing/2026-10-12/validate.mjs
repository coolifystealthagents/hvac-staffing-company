import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'manifest.json'), 'utf8'));
const source = fs.readFileSync(path.join(root, 'lib/october-12-content.ts'), 'utf8');
const errors = []; const ok = (value, message) => { if (!value) errors.push(message); };
ok(manifest.repository === 'coolifystealthagents/hvac-staffing-company', 'repository mismatch');
ok(manifest.branch === 'main', 'branch mismatch');
ok(manifest.baseSha === 'e38999ea200437a76b0349c81389e974124b63d3', 'base SHA mismatch');
ok(manifest.publicationDate === '2026-10-12', 'publication date mismatch');
ok(manifest.items.filter((x) => x.section === 'Blog').length === 12, 'requires exactly 12 Blog items');
ok(manifest.items.filter((x) => x.section === 'Research').length === 5, 'requires exactly 5 Research items');
ok(manifest.items.length === 17, 'requires exactly 17 items');
ok(new Set(manifest.items.map((x) => x.slug)).size === 17, 'slugs must be unique');
ok(new Set(manifest.items.map((x) => x.title.toLowerCase())).size === 17, 'titles must be unique');
ok(source.includes("const publishedAt = '2026-10-12'"), 'content publication date missing');
ok(source.includes('october12BlogPosts') && source.includes('october12ResearchPosts'), 'separate content registries missing');

const hashes = new Set();
for (const item of manifest.items) {
  ok(item.publicationDate === '2026-10-12', `${item.slug}: manifest date mismatch`);
  ok(!/\b(?:2026|oct(?:ober)?\s+12|12\s+oct(?:ober)?)\b/i.test(item.title), `${item.slug}: title contains date`);
  ok(source.includes(`slug: '${item.slug}'`) && source.includes(`title: '${item.title}'`), `${item.slug}: registry entry missing`);
  ok(source.includes("thumbnail: `/october-12-2026/${s.slug}.svg`"), `${item.slug}: thumbnail registry mapping missing`);
  const file = path.join(root, item.thumbnailPath); ok(fs.existsSync(file), `${item.slug}: thumbnail missing`); if (!fs.existsSync(file)) continue;
  const svg = fs.readFileSync(file, 'utf8');
  ok(svg.includes('width="1200" height="630"'), `${item.slug}: thumbnail must be 1200x630`);
  const escaped = item.title.replaceAll('&', '&amp;');
  ok(svg.includes(`<title id="title">${escaped}</title>`), `${item.slug}: semantic exact title missing`);
  for (const word of item.title.split(/\s+/)) ok(svg.includes(word.replaceAll('&', '&amp;')), `${item.slug}: visible title missing word ${word}`);
  hashes.add(crypto.createHash('sha256').update(svg).digest('hex'));
}
ok(hashes.size === 17, 'thumbnails must be unique');

const researchBlocks = source.split("slug: '").slice(1).filter((block) => manifest.items.some((item) => item.section === 'Research' && block.startsWith(item.slug)));
for (const block of researchBlocks) {
  const slug = block.slice(0, block.indexOf("'"));
  const localSources = (block.match(/url: 'https:\/\//g) || []).length;
  ok(localSources >= 3, `${slug}: requires at least 3 topic-specific HTTPS sources plus 7 common authoritative sources`);
}
ok(researchBlocks.length === 5, 'five Research specifications required');
ok((source.match(/url: 'https:\/\//g) || []).length >= 22, 'Research source depth is insufficient');

const required = ['lib/content.ts', 'app/blog/page.tsx', 'app/blog/[slug]/page.tsx', 'app/research/page.tsx', 'app/research/[slug]/page.tsx', 'components/SiteChrome.tsx', 'app/sitemap.ts'];
for (const file of required) ok(fs.existsSync(path.join(root, file)), `integration file missing: ${file}`);
const integration = required.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
for (const marker of ['...october12BlogPosts', '...october12ResearchPosts', "href: '/research'", 'blogBySlug', 'researchBySlug', 'Related articles', 'Related research', 'lastModified']) ok(integration.includes(marker), `integration marker missing: ${marker}`);

const paragraphBodies = [...source.matchAll(/'([^'\n]{160,})'/g)].map((match) => match[1].toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim());
const duplicates = paragraphBodies.filter((text, index) => paragraphBodies.indexOf(text) !== index);
ok(new Set(duplicates).size === 0, `duplicate substantive prose: ${[...new Set(duplicates)].slice(0, 3).join(' | ')}`);

if (errors.length) { console.error(`FAIL (${errors.length})`); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log('PASS: 12 Blog + 5 Research, exact visible date, date-free titles, 17 unique exact-title thumbnails, source depth, separate routes/indexes/sidebars/registries, manifest, and duplicate checks.');
