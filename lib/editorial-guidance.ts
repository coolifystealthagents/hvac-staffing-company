import { site } from './site';

type Section = { heading: string; paragraphs: string[] };
type Artwork = { src: string; alt: string };
type MethodSlug = 'workflow-boundary-review' | 'source-quality-audit' | 'exception-pattern-study' | 'handoff-reliability-brief' | 'review-consistency-report';

export const legacyBlogSlugs = [
  'hvac-office-manager-vs-hvac-va',
  'hvac-dispatch-handoff-checklist',
  'hvac-maintenance-plan-follow-up',
  'hvac-customer-escalation-path',
  'hvac-estimate-follow-up-workflow',
] as const;

export const legacyResearchSlugs = [
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
] as const;

export const legacyArtwork = {
  'hvac-office-manager-vs-hvac-va': { src: '/editorial/hvac-office-manager-vs-hvac-va.svg', alt: 'Office manager and HVAC virtual assistant responsibilities arranged around a dispatch review queue' },
  'hvac-dispatch-handoff-checklist': { src: '/editorial/hvac-dispatch-handoff-checklist.svg', alt: 'HVAC dispatch handoff checklist connecting job records, technician status, and dispatcher review' },
  'hvac-maintenance-plan-follow-up': { src: '/editorial/hvac-maintenance-plan-follow-up.svg', alt: 'HVAC maintenance plan follow up queue with membership records, reminders, and exception review' },
  'hvac-customer-escalation-path': { src: '/editorial/hvac-customer-escalation-path.svg', alt: 'HVAC customer escalation path routing a documented case to routine, priority, and urgent owners' },
  'hvac-estimate-follow-up-workflow': { src: '/editorial/hvac-estimate-follow-up-workflow.svg', alt: 'HVAC estimate follow up workflow linking an approved proposal, customer response, and estimate owner' },
  'dispatch-support-workflow-boundary-review-1': { src: '/editorial/dispatch-support-workflow-boundary-review-1.svg', alt: 'Dispatch workflow boundary review separating job record preparation from dispatcher decisions' },
  'maintenance-plan-support-source-quality-audit-2': { src: '/editorial/maintenance-plan-support-source-quality-audit-2.svg', alt: 'Maintenance plan source quality audit comparing membership and completed service records' },
  'estimate-follow-up-exception-pattern-study-3': { src: '/editorial/estimate-follow-up-exception-pattern-study-3.svg', alt: 'Estimate follow up exception pattern study sorting proposal questions for owner review' },
  'customer-service-handoff-reliability-brief-4': { src: '/editorial/customer-service-handoff-reliability-brief-4.svg', alt: 'Customer service handoff reliability brief tracing a caller record to its next owner' },
  'parts-warranty-admin-review-consistency-report-5': { src: '/editorial/parts-warranty-admin-review-consistency-report-5.svg', alt: 'Parts and warranty review consistency report checking claim evidence against a review list' },
  'hvac-bookkeeping-support-workflow-boundary-review-6': { src: '/editorial/hvac-bookkeeping-support-workflow-boundary-review-6.svg', alt: 'HVAC bookkeeping workflow boundary review separating transaction preparation from approval' },
  'dispatch-support-source-quality-audit-7': { src: '/editorial/dispatch-support-source-quality-audit-7.svg', alt: 'Dispatch source quality audit comparing technician updates with active job records' },
  'maintenance-plan-support-exception-pattern-study-8': { src: '/editorial/maintenance-plan-support-exception-pattern-study-8.svg', alt: 'Maintenance plan exception pattern study grouping renewal and visit record conflicts' },
  'estimate-follow-up-handoff-reliability-brief-9': { src: '/editorial/estimate-follow-up-handoff-reliability-brief-9.svg', alt: 'Estimate follow up handoff reliability brief tracking proposal response and next action' },
  'customer-service-review-consistency-report-10': { src: '/editorial/customer-service-review-consistency-report-10.svg', alt: 'Customer service review consistency report checking case notes and escalation ownership' },
  'parts-warranty-admin-workflow-boundary-review-11': { src: '/editorial/parts-warranty-admin-workflow-boundary-review-11.svg', alt: 'Parts and warranty workflow boundary review separating claim assembly from technical judgment' },
  'hvac-bookkeeping-support-source-quality-audit-12': { src: '/editorial/hvac-bookkeeping-support-source-quality-audit-12.svg', alt: 'HVAC bookkeeping source quality audit comparing invoices, receipts, and payment records' },
  'dispatch-support-exception-pattern-study-13': { src: '/editorial/dispatch-support-exception-pattern-study-13.svg', alt: 'Dispatch exception pattern study grouping job conflicts, missed windows, and access issues' },
  'maintenance-plan-support-handoff-reliability-brief-14': { src: '/editorial/maintenance-plan-support-handoff-reliability-brief-14.svg', alt: 'Maintenance plan handoff reliability brief tracing membership status to the plan owner' },
  'estimate-follow-up-review-consistency-report-15': { src: '/editorial/estimate-follow-up-review-consistency-report-15.svg', alt: 'Estimate follow up review consistency report checking proposal version and response evidence' },
  'customer-service-workflow-boundary-review-16': { src: '/editorial/customer-service-workflow-boundary-review-16.svg', alt: 'Customer service workflow boundary review separating case intake from resolution decisions' },
  'parts-warranty-admin-source-quality-audit-17': { src: '/editorial/parts-warranty-admin-source-quality-audit-17.svg', alt: 'Parts and warranty source quality audit checking model, serial, job, and vendor records' },
  'hvac-bookkeeping-support-exception-pattern-study-18': { src: '/editorial/hvac-bookkeeping-support-exception-pattern-study-18.svg', alt: 'HVAC bookkeeping exception pattern study grouping unmatched and unclear transaction records' },
  'dispatch-support-handoff-reliability-brief-19': { src: '/editorial/dispatch-support-handoff-reliability-brief-19.svg', alt: 'Dispatch handoff reliability brief tracing technician status and customer notice ownership' },
  'maintenance-plan-support-review-consistency-report-20': { src: '/editorial/maintenance-plan-support-review-consistency-report-20.svg', alt: 'Maintenance plan review consistency report checking renewal, visit, and hold records' },
} satisfies Record<(typeof legacyBlogSlugs)[number] | (typeof legacyResearchSlugs)[number], Artwork>;

const blogTopics = {
  'hvac-office-manager-vs-hvac-va': { serviceSlug: 'dispatch-support', opening: 'An office manager owns priorities, staffing choices, policy exceptions, and final review. A virtual assistant can prepare dispatch records, reconcile authorized status updates, send approved notices, and maintain the exception queue. The useful comparison is therefore decision ownership, not job title.' },
  'hvac-dispatch-handoff-checklist': { serviceSlug: 'dispatch-support', opening: 'A dispatch handoff should let the next owner understand the active board without reconstructing the shift. Each job needs a source timestamp, current technician status, latest approved customer notice, unresolved conflict, next action, and named owner.' },
  'hvac-maintenance-plan-follow-up': { serviceSlug: 'maintenance-plan-support', opening: 'Maintenance plan follow up starts with a plan roster that can be reconciled to renewal dates and completed service history. Outreach belongs only in the ready queue after holds, contact restrictions, disputed terms, and missing visits are separated for review.' },
  'hvac-customer-escalation-path': { serviceSlug: 'customer-service', opening: 'A customer escalation path begins at intake, not after a complaint becomes difficult. Preserve the caller\'s words, verify the service location, link related job history, apply the written classification, and identify the person who owns the next response.' },
  'hvac-estimate-follow-up-workflow': { serviceSlug: 'estimate-follow-up', opening: 'Estimate follow up should use only the current approved proposal and its documented contact sequence. The coordinator records the customer response and next action while price, scope, equipment, financing, and technical questions return to the estimate owner.' },
} as const;

const serviceFor = (slug: string) => {
  const service = site.services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown editorial service: ${slug}`);
  return service;
};

export function blogGuidanceFor(slug: string): { artwork: Artwork; sections: Section[] } | undefined {
  const topic = blogTopics[slug as keyof typeof blogTopics];
  if (!topic) return undefined;
  const service = serviceFor(topic.serviceSlug);
  const manual = service.manual;
  const comparisonSections: Section[] = slug === 'hvac-office-manager-vs-hvac-va' ? [
    { heading: 'Compare decision ownership', paragraphs: ['An HVAC office manager remains the decision owner for queue priorities, customer exceptions, staffing tradeoffs, and final operating review. A virtual assistant works inside the documented lane and returns decisions that fall outside it.', 'The comparison is not a replacement test. It identifies which preparation can move while management accountability remains visible.'] },
    { heading: 'Compare daily queue ownership', paragraphs: ['The office manager decides which queue takes precedence when dispatch, maintenance plans, estimates, customer issues, and administrative deadlines compete. A virtual assistant can maintain an assigned queue, prepare its records, and surface blocked items using the agreed status rules.', 'Daily ownership needs a named handoff time, current source record, next action, and exception owner.'] },
    { heading: 'Keep hiring and coaching with management', paragraphs: ['Hiring and coaching belong to the employer and its authorized managers. They define performance expectations, assess conduct, approve access, and decide when the role or workload changes.', 'A managed staffing partner can support recruiting and matching, while the HVAC company retains workplace policy and operating decisions.'] },
    { heading: 'Define escalation authority', paragraphs: ['Escalation authority should state who receives safety concerns, technical questions, customer commitments, pricing exceptions, schedule conflicts, and sensitive workforce matters.', 'The virtual assistant records and routes the exception. The office manager or other qualified owner decides the response and authorizes closure.'] },
  ] : [];
  return {
    artwork: legacyArtwork[slug as (typeof legacyBlogSlugs)[number]],
    sections: [
      ...comparisonSections,
      { heading: 'Define the operating boundary', paragraphs: [topic.opening, ...manual.roleFit] },
      { heading: 'Use the real source records', paragraphs: manual.inputsAccess },
      { heading: 'Run the workflow in order', paragraphs: manual.workflowSteps },
      { heading: 'Make the handoff reviewable', paragraphs: [...manual.deliverables, ...manual.qualityControls] },
      { heading: 'Route exceptions without guessing', paragraphs: manual.exceptionPaths },
      { heading: 'Keep accountable decisions with the owner', paragraphs: manual.decisionBoundaries },
      { heading: 'Choose a controlled starting queue', paragraphs: manual.startingScenarios },
    ],
  };
}

const methods: Record<MethodSlug, { label: string; purpose: string; sample: string; comparison: string; interpretation: string }> = {
  'workflow-boundary-review': {
    label: 'Workflow boundary review',
    purpose: 'This conceptual review asks where repeatable preparation ends and accountable judgment begins.',
    sample: 'Select actual workflow records from one defined queue and period. Include ordinary records and records returned for review rather than choosing only clean examples.',
    comparison: 'Compare each recorded action with the written role boundary, required source fields, approval point, and named owner. Record ambiguity as a design question, not as staff performance evidence.',
    interpretation: 'The review can expose places where ownership or instructions need clarification. It cannot establish productivity, causation, compliance, or performance across the business.',
  },
  'source-quality-audit': {
    label: 'Source quality audit',
    purpose: 'This conceptual audit asks whether a reviewer can trace a prepared status back to the record that supports it.',
    sample: 'Select actual workflow records from one defined queue and period, including complete records and records placed on hold for missing or conflicting material.',
    comparison: 'Compare required fields with the source document, source timestamp, identifier, communication record, and retained attachment. Treat an unsupported field as an evidence gap rather than proof that the underlying event did not occur.',
    interpretation: 'The audit can identify source and traceability questions in the reviewed records. It does not validate the underlying technical or financial decision and does not support a rate or trend claim.',
  },
  'exception-pattern-study': {
    label: 'Exception pattern study',
    purpose: 'This conceptual study organizes the kinds of exceptions that leave the routine path and the owners needed to resolve them.',
    sample: 'Select actual workflow records from one defined queue and period, retaining routine items as a comparison set alongside paused, returned, and escalated records.',
    comparison: 'Compare each exception with the written trigger, evidence attached, route taken, and resolution owner. Group only records that share the same operational condition, and preserve uncommon cases separately.',
    interpretation: 'The study can inform checklist and routing questions. It cannot estimate prevalence, predict future exceptions, or attribute an exception to a person or process without further evidence.',
  },
  'handoff-reliability-brief': {
    label: 'Handoff reliability brief',
    purpose: 'This conceptual brief examines whether a receiving owner can identify the record state, evidence, open question, and next action.',
    sample: 'Select actual workflow records from one defined queue and period, including completed handoffs, open handoffs, and handoffs returned for clarification.',
    comparison: 'Compare the sending record with the receiving queue for matching identifiers, status, source time, next action, and owner. A mismatch is a review item and not evidence of an outcome.',
    interpretation: 'The brief can show where the handoff specification needs attention. It does not demonstrate reliability across other periods, teams, systems, or service lines.',
  },
  'review-consistency-report': {
    label: 'Review consistency report',
    purpose: 'This conceptual report asks whether the same documented review rule is applied to comparable records.',
    sample: 'Select actual workflow records from one defined queue and period. Form comparison groups only where records share the same status, required evidence, and review rule.',
    comparison: 'Compare reviewer dispositions with the checklist and retained evidence. Send legitimate policy, technical, or financial differences to the accountable owner instead of forcing unlike records into one result.',
    interpretation: 'The report can identify questions about checklist application in the selected records. It cannot grade reviewers, establish correctness, or support a broader performance conclusion.',
  },
};

const researchRoutes = [
  { slug: 'dispatch-support-workflow-boundary-review-1', serviceSlug: 'dispatch-support', method: 'workflow-boundary-review' },
  { slug: 'maintenance-plan-support-source-quality-audit-2', serviceSlug: 'maintenance-plan-support', method: 'source-quality-audit' },
  { slug: 'estimate-follow-up-exception-pattern-study-3', serviceSlug: 'estimate-follow-up', method: 'exception-pattern-study' },
  { slug: 'customer-service-handoff-reliability-brief-4', serviceSlug: 'customer-service', method: 'handoff-reliability-brief' },
  { slug: 'parts-warranty-admin-review-consistency-report-5', serviceSlug: 'parts-warranty-admin', method: 'review-consistency-report' },
  { slug: 'hvac-bookkeeping-support-workflow-boundary-review-6', serviceSlug: 'hvac-bookkeeping-support', method: 'workflow-boundary-review' },
  { slug: 'dispatch-support-source-quality-audit-7', serviceSlug: 'dispatch-support', method: 'source-quality-audit' },
  { slug: 'maintenance-plan-support-exception-pattern-study-8', serviceSlug: 'maintenance-plan-support', method: 'exception-pattern-study' },
  { slug: 'estimate-follow-up-handoff-reliability-brief-9', serviceSlug: 'estimate-follow-up', method: 'handoff-reliability-brief' },
  { slug: 'customer-service-review-consistency-report-10', serviceSlug: 'customer-service', method: 'review-consistency-report' },
  { slug: 'parts-warranty-admin-workflow-boundary-review-11', serviceSlug: 'parts-warranty-admin', method: 'workflow-boundary-review' },
  { slug: 'hvac-bookkeeping-support-source-quality-audit-12', serviceSlug: 'hvac-bookkeeping-support', method: 'source-quality-audit' },
  { slug: 'dispatch-support-exception-pattern-study-13', serviceSlug: 'dispatch-support', method: 'exception-pattern-study' },
  { slug: 'maintenance-plan-support-handoff-reliability-brief-14', serviceSlug: 'maintenance-plan-support', method: 'handoff-reliability-brief' },
  { slug: 'estimate-follow-up-review-consistency-report-15', serviceSlug: 'estimate-follow-up', method: 'review-consistency-report' },
  { slug: 'customer-service-workflow-boundary-review-16', serviceSlug: 'customer-service', method: 'workflow-boundary-review' },
  { slug: 'parts-warranty-admin-source-quality-audit-17', serviceSlug: 'parts-warranty-admin', method: 'source-quality-audit' },
  { slug: 'hvac-bookkeeping-support-exception-pattern-study-18', serviceSlug: 'hvac-bookkeeping-support', method: 'exception-pattern-study' },
  { slug: 'dispatch-support-handoff-reliability-brief-19', serviceSlug: 'dispatch-support', method: 'handoff-reliability-brief' },
  { slug: 'maintenance-plan-support-review-consistency-report-20', serviceSlug: 'maintenance-plan-support', method: 'review-consistency-report' },
] as const;

export function researchGuidanceFor(slug: string): { artwork: Artwork; sections: Section[] } | undefined {
  const route = researchRoutes.find((item) => item.slug === slug);
  if (!route) return undefined;
  const service = serviceFor(route.serviceSlug);
  const manual = service.manual;
  const method = methods[route.method];
  return {
    artwork: legacyArtwork[route.slug],
    sections: [
      { heading: 'Conceptual, non-empirical finding', paragraphs: [`${method.label}: ${method.purpose}`, `For ${service.name.toLowerCase()}, this is a study design and operating interpretation. It reports no measured result, person, business outcome, or performance claim.`] },
      { heading: 'Actual workflow records', paragraphs: [`Inspect records created by the operating workflow rather than hypothetical examples. For this service, the relevant record path is: ${manual.workflowSteps.join(' ')}`, `The review set should retain the inputs used by the role. ${manual.inputsAccess.join(' ')}`] },
      { heading: 'Sample and comparison method', paragraphs: [method.sample, method.comparison] },
      { heading: 'Evidence to inspect', paragraphs: [...manual.deliverables, ...manual.qualityControls] },
      { heading: 'Exceptions and escalation', paragraphs: manual.exceptionPaths },
      { heading: 'Bounded interpretation', paragraphs: [method.interpretation, ...manual.decisionBoundaries] },
    ],
  };
}

export function artworkFor(slug: string): Artwork | undefined {
  return legacyArtwork[slug as keyof typeof legacyArtwork];
}
