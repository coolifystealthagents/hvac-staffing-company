import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');
const guidance = () => read('lib/editorial-guidance.ts');

const blogSlugs = [
  'hvac-office-manager-vs-hvac-va',
  'hvac-dispatch-handoff-checklist',
  'hvac-maintenance-plan-follow-up',
  'hvac-customer-escalation-path',
  'hvac-estimate-follow-up-workflow',
];
const researchSlugs = [
  'dispatch-support-workflow-boundary-review-1',
  'maintenance-plan-support-source-quality-audit-2',
  'estimate-follow-up-exception-pattern-study-3',
  'customer-service-handoff-reliability-brief-4',
  'parts-warranty-admin-review-consistency-report-5',
  'hvac-bookkeeping-support-workflow-boundary-review-6',
  'dispatch-support-source-quality-audit-7',
  'maintenance-plan-support-exception-pattern-study-8',
  'estimate-follow-up-handoff-reliability-brief-9',
  'customer-service-review-consistency-report-10',
  'parts-warranty-admin-workflow-boundary-review-11',
  'hvac-bookkeeping-support-source-quality-audit-12',
  'dispatch-support-exception-pattern-study-13',
  'maintenance-plan-support-handoff-reliability-brief-14',
  'estimate-follow-up-review-consistency-report-15',
  'customer-service-workflow-boundary-review-16',
  'parts-warranty-admin-source-quality-audit-17',
  'hvac-bookkeeping-support-exception-pattern-study-18',
  'dispatch-support-handoff-reliability-brief-19',
  'maintenance-plan-support-review-consistency-report-20',
];
const allSlugs = [...blogSlugs, ...researchSlugs];

function arrayValues(source, name) {
  const match = source.match(new RegExp(`export const ${name} = \\[(.*?)\\] as const`, 's'));
  assert.ok(match, `${name} is an explicit exported route set`);
  return [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]);
}

function artworkEntries(source) {
  const match = source.match(/export const legacyArtwork = \{(.*?)\n\} satisfies/s);
  assert.ok(match, 'legacyArtwork is an explicit assignment map');
  return [...match[1].matchAll(/^\s*'([^']+)': \{ src: '([^']+)', alt: '([^']+)' \},?$/gm)].map(([, slug, src, alt]) => ({ slug, src, alt }));
}

test('legacy editorial route sets and artwork assignments have exact coverage', () => {
  const source = guidance();
  assert.deepEqual(arrayValues(source, 'legacyBlogSlugs'), blogSlugs);
  assert.deepEqual(arrayValues(source, 'legacyResearchSlugs'), researchSlugs);
  const artwork = artworkEntries(source);
  assert.deepEqual(artwork.map(({ slug }) => slug), allSlugs);
  assert.equal(new Set(artwork.map(({ src }) => src)).size, allSlugs.length, 'every route has a unique artwork path');
  const files = readdirSync(join(root, 'public/editorial')).filter((file) => file.endsWith('.svg')).sort();
  assert.deepEqual(files, artwork.map(({ src }) => src.replace('/editorial/', '')).sort(), 'no missing or orphan editorial SVG assets');
});

test('artwork files are safe, visible, topic specific, and accessibly assigned', () => {
  for (const { slug, src, alt } of artworkEntries(guidance())) {
    assert.ok(existsSync(join(root, 'public', src)), `${src} exists`);
    assert.ok(alt.length >= 45, `${slug} has substantive alt text`);
    const serviceToken = slug.startsWith('hvac-office') ? 'office' : slug.split('-').find((word) => ['dispatch', 'maintenance', 'estimate', 'customer', 'parts', 'bookkeeping'].includes(word));
    assert.match(alt.toLowerCase(), new RegExp(serviceToken), `${slug} alt identifies its topic`);
    const svg = read(`public${src}`);
    assert.match(svg, /^<svg[^>]+viewBox=/);
    assert.match(svg, /<title>[^<]+<\/title>/);
    assert.match(svg, /<text[^>]*>[^<]+<\/text>/);
    assert.match(svg.toLowerCase(), new RegExp(serviceToken), `${slug} has visible topic text`);
    assert.doesNotMatch(svg, /<script|javascript:|foreignObject|on\w+=/i);
  }
});

test('blog guidance uses the matching service manual and replaces legacy repeated sections', () => {
  const source = guidance();
  const expected = {
    'hvac-office-manager-vs-hvac-va': 'dispatch-support',
    'hvac-dispatch-handoff-checklist': 'dispatch-support',
    'hvac-maintenance-plan-follow-up': 'maintenance-plan-support',
    'hvac-customer-escalation-path': 'customer-service',
    'hvac-estimate-follow-up-workflow': 'estimate-follow-up',
  };
  for (const [slug, service] of Object.entries(expected)) {
    assert.match(source, new RegExp(`'${slug}': \\{ serviceSlug: '${service}'`));
  }
  const page = read('app/blog/[slug]/page.tsx');
  assert.match(page, /blogGuidanceFor\(post\.slug\)/);
  assert.match(page, /guidance\?\.sections \?\? readerSectionsForBlog\(post\) \?\? post\.sections/);
});

test('research guidance is service specific, method specific, and explicitly bounded', () => {
  const source = guidance();
  for (const slug of researchSlugs) assert.match(source, new RegExp(`slug: '${slug}'`));
  for (const method of ['workflow-boundary-review', 'source-quality-audit', 'exception-pattern-study', 'handoff-reliability-brief', 'review-consistency-report']) assert.match(source, new RegExp(`'${method}'`));
  for (const service of ['dispatch-support', 'maintenance-plan-support', 'estimate-follow-up', 'customer-service', 'parts-warranty-admin', 'hvac-bookkeeping-support']) assert.match(source, new RegExp(`serviceSlug: '${service}'`));
  for (const term of ['actual workflow records', 'Sample and comparison method', 'Evidence to inspect', 'Exceptions and escalation', 'Conceptual, non-empirical finding', 'Bounded interpretation']) assert.match(source, new RegExp(term, 'i'));
  const page = read('app/research/[slug]/page.tsx');
  assert.match(page, /researchGuidanceFor\(post\.slug\)/);
  assert.match(page, /guidance\?\.sections/);
});

test('legacy routes use assigned artwork and explicit alt instead of the generic fallback', () => {
  for (const pagePath of ['app/blog/[slug]/page.tsx', 'app/research/[slug]/page.tsx']) {
    const page = read(pagePath);
    assert.match(page, /guidance\?\.artwork\.src \?\? post\.thumbnail/);
    assert.match(page, /thumbnailAlt=\{guidance\?\.artwork\.alt\}/);
  }
  const frame = read('components/ArticleFrame.tsx');
  assert.match(frame, /thumbnailAlt\?: string/);
  assert.match(frame, /alt=\{thumbnailAlt \?\? `Topic illustration for \$\{title\}`\}/);
});

test('new reader-facing editorial material has no prohibited dash glyphs or outcome claims', () => {
  const files = ['lib/editorial-guidance.ts', 'app/blog/[slug]/page.tsx', 'app/research/[slug]/page.tsx', 'components/ArticleFrame.tsx', ...artworkEntries(guidance()).map(({ src }) => `public${src}`)];
  const combined = files.map(read).join('\n');
  assert.doesNotMatch(combined, /[\u2013\u2014]/);
  assert.doesNotMatch(guidance(), /\b(?:increased|decreased|improved|reduced|saved)\s+\d|\d+%/i);
});
