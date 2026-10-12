import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const publicationDate = '2026-10-12';
const blog = [
  ['hvac-no-cool-call-intake-triage-record', 'Build an HVAC No-Cool Call Intake Record'],
  ['hvac-refrigerant-cylinder-return-documentation', 'Control Refrigerant Cylinder Return Documentation'],
  ['commercial-rooftop-unit-access-coordination', 'Coordinate Commercial Rooftop Unit Access'],
  ['hvac-after-hours-dispatch-coverage-board', 'Run an HVAC After-Hours Dispatch Coverage Board'],
  ['hvac-equipment-serial-model-photo-verification', 'Verify HVAC Equipment Model and Serial Photos'],
  ['maintenance-agreement-asset-roster-reconciliation', 'Reconcile a Maintenance Agreement Asset Roster'],
  ['hvac-permit-inspection-appointment-coordination', 'Coordinate HVAC Permit Inspection Appointments'],
  ['hvac-warranty-core-return-deadline-tracker', 'Track HVAC Warranty Core Return Deadlines'],
  ['thermostat-compatibility-question-packet', 'Prepare a Thermostat Compatibility Question Packet'],
  ['technician-timecard-job-code-exception-queue', 'Manage Technician Timecard Job-Code Exceptions'],
  ['indoor-air-quality-lead-consent-routing', 'Route Indoor Air Quality Leads with Clear Consent'],
  ['seasonal-demand-callback-priority-log', 'Build a Seasonal Demand Callback Priority Log'],
];
const research = [
  ['weather-normalized-hvac-dispatch-demand-forecast', 'Weather-Normalized HVAC Dispatch Demand Forecast'],
  ['hvac-technician-travel-time-buffer-study', 'HVAC Technician Travel-Time Buffer Study'],
  ['maintenance-agreement-renewal-cohort-research', 'Maintenance Agreement Renewal Cohort Research'],
  ['parts-delay-customer-update-cadence-experiment', 'Parts-Delay Customer Update Cadence Experiment'],
  ['first-visit-hvac-evidence-completeness-study', 'First-Visit HVAC Evidence Completeness Study'],
];
const items = [...blog.map(([slug, title]) => ({ section: 'Blog', slug, title })), ...research.map(([slug, title]) => ({ section: 'Research', slug, title }))]
  .map((item) => ({ ...item, publicationDate, sourcePath: 'lib/october-12-content.ts', thumbnailPath: `public/october-12-2026/${item.slug}.svg`, route: `/${item.section.toLowerCase()}/${item.slug}` }));

const manifest = {
  site: 'HVACStaffingCompany.com', canonicalDomain: 'https://hvacstaffingcompany.com',
  repository: 'coolifystealthagents/hvac-staffing-company', branch: 'main', baseSha: 'e38999ea200437a76b0349c81389e974124b63d3', publicationDate,
  counts: { blog: 12, research: 5, total: 17 },
  registryPaths: ['lib/october-12-content.ts', 'lib/content.ts'],
  routePaths: ['app/blog/[slug]/page.tsx', 'app/research/[slug]/page.tsx'],
  indexPaths: ['app/blog/page.tsx', 'app/research/page.tsx'],
  sidebarPaths: ['app/blog/[slug]/page.tsx', 'app/research/[slug]/page.tsx'], items,
};

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function wrap(title, max = 22) {
  const words = title.split(' '), lines = []; let current = '';
  for (const word of words) { const next = current ? `${current} ${word}` : word; if (next.length > max && current) { lines.push(current); current = word; } else current = next; }
  if (current) lines.push(current); return lines;
}
function thumbnail(item, index) {
  const lines = wrap(item.title); const y0 = 260 - (lines.length - 1) * 35;
  const title = lines.map((line, i) => `<text x="96" y="${y0 + i * 70}" font-size="46" font-weight="800" fill="#f8f3e8">${escapeXml(line)}</text>`).join('\n  ');
  const accent = ['#f0c15f', '#8dc6d2', '#e35c28', '#d6e6c3', '#f39a6b'][index % 5];
  const marks = Array.from({ length: 5 }, (_, n) => `<circle cx="${820 + n * 61}" cy="${124 + ((index + n) % 3) * 68}" r="${18 + (index + n) % 12}" fill="${n % 2 ? '#8dc6d2' : accent}" opacity="${0.48 + n * 0.08}"/>`).join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(item.title)}</title><desc id="desc">HVAC Staffing Company ${item.section} cover illustration</desc>
  <rect width="1200" height="630" rx="28" fill="#172d33"/><path d="M760 0h440v630H650c130-122 101-286 110-630Z" fill="#244850"/>
  <path d="M760 540c120-122 210-180 440-223v313H760Z" fill="${accent}" opacity=".9"/>${marks}
  <g font-family="Arial, Helvetica, sans-serif">${title}<text x="96" y="520" font-size="24" font-weight="700" letter-spacing="3" fill="${accent}">${item.section.toUpperCase()} · HVAC STAFFING COMPANY</text></g>
  <g stroke="#f8f3e8" stroke-width="12" fill="none" opacity=".9"><path d="M885 366h142v104H885z"/><path d="M920 366v-50h72v50"/><path d="M885 418h142"/></g>
</svg>\n`;
}

fs.mkdirSync(path.join(root, 'public/october-12-2026'), { recursive: true });
for (const [index, item] of items.entries()) fs.writeFileSync(path.join(root, item.thumbnailPath), thumbnail(item, index));
fs.writeFileSync(path.join(import.meta.dirname, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${items.length} exact-title thumbnails and manifest.`);
