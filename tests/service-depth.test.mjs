import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');

function serviceRecords() {
  const source = read('lib/site.ts');
  const objectStart = source.indexOf('{', source.indexOf('export const site'));
  const objectEnd = source.lastIndexOf('};');
  assert.ok(objectStart > -1 && objectEnd > objectStart, 'site config object is readable');
  return JSON.parse(source.slice(objectStart, objectEnd + 1)).services;
}

const expectedSlugs = [
  'dispatch-support',
  'maintenance-plan-support',
  'estimate-follow-up',
  'customer-service',
  'parts-warranty-admin',
  'hvac-bookkeeping-support',
];

const specificity = {
  'dispatch-support': /dispatch|job|technician/i,
  'maintenance-plan-support': /plan|membership/i,
  'estimate-follow-up': /estimate|proposal/i,
  'customer-service': /customer|caller/i,
  'parts-warranty-admin': /part|claim|warranty/i,
  'hvac-bookkeeping-support': /transaction|ledger|invoice|bookkeeping/i,
};

const sections = [
  'inputsAccess',
  'workflowSteps',
  'deliverables',
  'qualityControls',
  'exceptionPaths',
  'decisionBoundaries',
  'startingScenarios',
];

const sectionText = (manual, section) => manual[section].join(' ');

test('site defines exactly six complete service operating records', () => {
  const services = serviceRecords();
  assert.deepEqual(services.map(({ slug }) => slug), expectedSlugs);

  for (const service of services) {
    assert.match(service.heroImage, /^\/editorial\/.+\.svg$/, `${service.slug} has route-specific workflow hero art`);
    assert.ok(service.heroAlt.length >= 30, `${service.slug} has descriptive hero alt text`);
    assert.ok(service.manual, `${service.slug} has a manual`);
    assert.ok(service.manual.roleFit.length >= 2, `${service.slug} has specific role fit`);
    assert.ok(service.manual.problem.length >= 2, `${service.slug} has a specific problem statement`);
    for (const section of sections) {
      assert.ok(Array.isArray(service.manual[section]), `${service.slug} ${section} is structured`);
      assert.ok(service.manual[section].length >= 2, `${service.slug} has substantial ${section}`);
      assert.match(sectionText(service.manual, section), specificity[service.slug], `${service.slug} ${section} uses service vocabulary`);
    }
    assert.ok(service.manual.workflowSteps.length >= 4, `${service.slug} has an actionable workflow`);
    assert.ok(service.manual.faqs.length >= 3, `${service.slug} has at least three FAQs`);
    for (const faq of service.manual.faqs) {
      assert.ok(faq.q.length >= 20 && faq.a.length >= 40, `${service.slug} FAQ is substantive`);
      assert.match(`${faq.q} ${faq.a}`, specificity[service.slug], `${service.slug} FAQ is service-specific`);
    }
  }
  assert.equal(new Set(services.map(({ heroImage }) => heroImage)).size, 6, 'service hero artwork must be unique');
});

test('every operating section is meaningfully unique across services', () => {
  const services = serviceRecords();
  for (const section of [...sections, 'roleFit', 'problem']) {
    const bodies = services.map(({ manual }) => sectionText(manual, section).toLowerCase());
    assert.equal(new Set(bodies).size, 6, `${section} must have six distinct records`);
  }

  const questionSets = services.map(({ manual }) => manual.faqs.map(({ q }) => q.toLowerCase()).join('|'));
  assert.equal(new Set(questionSets).size, 6, 'FAQ questions must be distinct by service');
  assert.equal(new Set(questionSets.flatMap((set) => set.split('|'))).size, questionSets.reduce((count, set) => count + set.split('|').length, 0), 'FAQ questions must not be reused between services');
});

test('service page renders structured guidance while preserving route contracts', () => {
  const page = read('app/services/[slug]/page.tsx');
  for (const field of [...sections, 'roleFit', 'problem', 'faqs']) assert.match(page, new RegExp(`manual\\.${field}`));
  for (const heading of ['Who this role is for', 'The problem it addresses', 'Scope of work', 'Inputs and access', 'Workflow and deliverables', 'Quality controls', 'Decision boundaries', 'Common starting scenarios', 'Frequently asked questions', 'Related services', 'Start with a controlled handoff']) assert.match(page, new RegExp(heading));
  assert.match(page, /canonical: `\/services\/\$\{service\.slug\}`/);
  assert.match(page, /src=\{service\.heroImage\}/);
  assert.match(page, /alt=\{service\.heroAlt\}/);
  assert.doesNotMatch(page, /src="\/hero\.png"/);
  assert.match(page, /cta-services-\$\{service\.slug\}-bookcall/);
  assert.match(page, /cta-services-\$\{service\.slug\}-consultation/);
});

test('about page substantially explains the operating model and accountability boundaries', () => {
  const about = read('app/about/page.tsx');
  for (const heading of ['How the operating model works', 'What belongs in the role brief', 'How accountability stays visible', 'Where the role stops', 'Built with StealthAgents']) {
    assert.match(about, new RegExp(heading));
  }
  assert.ok((about.match(/<p>/g) || []).length >= 10, 'about page has substantial explanatory copy');
});
