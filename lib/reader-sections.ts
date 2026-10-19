import type { BlogPost, ContentSection, ResearchPost } from './types';

function between(text: string, start: string, end: string): string {
  const begin = text.indexOf(start);
  if (begin < 0) return '';
  const from = begin + start.length;
  const finish = text.indexOf(end, from);
  return (finish < 0 ? text.slice(from) : text.slice(from, finish)).trim();
}

export function readerSectionsForBlog(post: BlogPost): ContentSection[] | undefined {
  if (post.publishedAt !== '2026-10-13') return undefined;
  const opening = post.sections[0]?.paragraphs ?? [];
  const scope = between(opening[0] || '', 'The bounded objective is ', '. Start with');
  const sources = between(opening[0] || '', 'Start with ', '. Control');
  const acceptance = between(opening[2] || '', ' only when ', '. Record why');
  const boundary = between(opening[2] || '', 'Remote support may ', '. If authority');

  return [
    { heading: 'Operating scope', paragraphs: [post.description, scope ? `For this workflow, the office role is bounded to ${scope}.` : 'Define the administrative outcome and the qualified owner before work begins.'] },
    { heading: 'Source record', paragraphs: [sources ? `Retain ${sources}.` : 'Retain the authoritative record, its version, timestamp, owner, and durable evidence link.', 'Separate customer reports, coordinator observations, technician findings, calculated fields, and authorized decisions so the record does not imply a conclusion its sources cannot support.'] },
    { heading: 'Exception path', paragraphs: ['Preserve the first observed state. Append later evidence with its source and effective time rather than overwriting history.', 'Missing evidence, conflicting sources, unclear authority, or an unavailable qualified owner keeps the item open and routes it to the named escalation owner.'] },
    { heading: 'Acceptance check', paragraphs: [acceptance ? `Close the item only when ${acceptance}.` : 'Close only when the evidence, current status, next owner, review time, approved wording, and stop rule agree.', 'Retain the disposition, communication receipt, and event that would reopen the record.'] },
    { heading: 'Decision boundary', paragraphs: [boundary ? `Remote support may ${boundary}.` : 'Remote support may organize records, compare approved sources, request missing material, and route a review packet.', 'Diagnosis, safety determinations, code interpretation, licensed trade work, pricing, warranty, payroll, and release authority remain with qualified owners.'] },
  ];
}

export function readerSectionsForResearch(post: ResearchPost): ContentSection[] | undefined {
  if (post.publishedAt !== '2026-10-13') return undefined;
  const opening = post.sections?.[0]?.paragraphs ?? [];
  const question = between(opening[0] || '', ' to examine ', '. Pre-register');
  const preregister = between(opening[0] || '', 'Pre-register ', '. Retain');
  const fields = between(opening[0] || '', 'Retain ', '. Protocol');
  const sample = between(opening[1] || '', ' sample from ', '. Two authorized');
  const analysis = between(opening[1] || '', 'Two authorized ', '. Do not describe');

  return [
    { heading: 'Operating scope', paragraphs: [post.finding, question ? `The protocol asks ${question}.` : post.summary] },
    { heading: 'Source record', paragraphs: [preregister ? `Before reviewing results, pre-register ${preregister}.` : 'Freeze the population, unit of analysis, observation window, procedure version, exclusions, and primary outcome.', fields ? `Retain ${fields}.` : 'Retain only the fields needed to reproduce the review and its denominator.'] },
    { heading: 'Exception path', paragraphs: [sample ? `Draw the sample from ${sample}.` : 'Report selected, unavailable, excluded, transferred, reopened, unresolved, and late records separately.', 'Keep nulls visible. Preserve disagreement, missingness, late evidence, and changed classifications rather than resolving them silently.'] },
    { heading: 'Acceptance check', paragraphs: [analysis ? `Use ${analysis}.` : 'Use independent review where the protocol calls for it, preserve the frozen transformation, and show declared sensitivity alternatives.', 'Describe only what the bounded records support. Do not present association, reviewer agreement, or queue timing as causation or a universal HVAC benchmark.'] },
    { heading: 'Decision boundary', paragraphs: ['Use pseudonymous study identifiers, least-privilege access, approved source references, field-level extraction, and a named retention owner.', 'The protocol prepares evidence for accountable review. Trade, safety, legal, environmental, payroll, workforce, warranty, pricing, diagnosis, and release authority remain outside the research-preparation role.'] },
  ];
}
