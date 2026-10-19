import type { BlogPost, ResearchPost } from './types';

const publishedAt = '2026-10-12';

type BlogSpec = {
  slug: string; title: string; description: string; category: string; service: string;
  intake: string; procedure: string; boundary: string; exception: string; verification: string; scenario: string;
};

const blogSpecs: BlogSpec[] = [
  {
    slug: 'hvac-no-cool-call-intake-triage-record', title: 'Build an HVAC No-Cool Call Intake Record', category: 'Dispatch systems', service: '/services/dispatch-support',
    description: 'A dispatch-ready intake record that captures symptoms, site constraints, equipment clues, and escalation needs without attempting remote diagnosis.',
    intake: 'Capture the caller, service address, safe callback number, occupancy type, affected zones, first observed time, thermostat display, recent work, equipment identifier if safely available, access constraints, and any vulnerable occupants. Preserve the customer’s own words before applying an approved symptom label.',
    procedure: 'Check the account and equipment history, confirm the promised communication window, label what is observed versus inferred, and place the case in the documented urgency lane. Give the dispatcher one concise record instead of forwarding a chain of partial messages.',
    boundary: 'The coordinator can collect facts and apply written dispatch rules. A licensed technician or designated service manager owns diagnosis, electrical or refrigerant advice, safety determinations, and changes to technical priority outside the approved matrix.',
    exception: 'Escalate immediately for smoke, burning odors, sparking, suspected carbon monoxide, a medically sensitive occupant, inaccessible equipment, conflicting addresses, or any request for the caller to open energized equipment. Use the company’s emergency script without improvising technical instructions.',
    verification: 'Confirm that the service record contains the original symptom statement, assigned priority, technician or dispatcher owner, customer window, and exception note. After assignment, compare the outbound confirmation with the dispatch board rather than treating a sent text as proof of scheduling.',
    scenario: 'A restaurant reports one dining zone warm while another remains comfortable. The coordinator records zone-specific symptoms and rooftop access hours, checks whether the site has multiple assets, and asks the service manager to select the correct asset and priority.',
  },
  {
    slug: 'hvac-refrigerant-cylinder-return-documentation', title: 'Control Refrigerant Cylinder Return Documentation', category: 'Role design', service: '/services/parts-warranty-admin',
    description: 'An administrative chain-of-custody workflow for returnable cylinders, supplier documents, credits, and unresolved discrepancies.',
    intake: 'Record the cylinder serial or barcode, refrigerant label, supplier, related purchase or job, technician custodian, pickup location, tare information when supplied, return deadline, and expected credit document. Photographs should show identifiers without exposing unrelated customer records.',
    procedure: 'Open one return record per cylinder, reconcile the technician handoff to the supplier receipt, and retain the supplier’s transaction identifier. Keep a discrepancy state for missing, rejected, or mismatched cylinders instead of silently closing them when transport begins.',
    boundary: 'Administrative staff may organize documents and request status. Technicians and qualified environmental-compliance owners determine refrigerant handling, labeling, recovery, transport suitability, and responses to suspected releases.',
    exception: 'Stop routine processing for an unreadable label, damaged valve, inconsistent refrigerant marking, unknown custodian, rejected supplier receipt, or request to consolidate identities. Route the physical-safety question to the qualified owner before arranging movement.',
    verification: 'Match the supplier receipt and credit to the exact cylinder record, then confirm any inventory or job-cost entry uses the same identifier. A courier scan proves movement, not supplier acceptance or financial credit.',
    scenario: 'Two identical-looking recovery cylinders return from different jobs, but only one barcode is readable. The coordinator preserves both photos, keeps both records open, and asks the operations owner to establish identity before either credit is assigned.',
  },
  {
    slug: 'commercial-rooftop-unit-access-coordination', title: 'Coordinate Commercial Rooftop Unit Access', category: 'Dispatch systems', service: '/services/dispatch-support',
    description: 'A pre-visit coordination checklist for keys, escorts, roof rules, tenant windows, and technician arrival evidence.',
    intake: 'Capture the property, suite or tenant, roof access point, building contact, escort requirement, key or badge process, ladder or hatch restrictions, approved service window, parking and loading rules, unit identifier, and emergency contact.',
    procedure: 'Confirm access with the building contact using the approved channel, attach the current site note to the work order, and distinguish confirmed facts from prior-visit history. Send the technician only the minimum access detail needed for the assigned visit.',
    boundary: 'The coordinator can verify logistics and document authorization. The technician and site safety owners decide whether conditions are safe, whether equipment may be accessed, and whether work can proceed under applicable rules.',
    exception: 'Escalate an unverified caller, changed access code, unavailable escort, locked hatch, conflicting unit labels, restricted roof conditions, severe-weather rule, or request to bypass property management. Do not reuse an old credential merely because it worked before.',
    verification: 'Before dispatch, confirm the access owner acknowledged the same date and window shown on the work order. After the visit, record whether access was gained, which unit was reached, and whether a new site constraint needs owner review.',
    scenario: 'A technician is booked before a shopping center opens, but the prior access note names an employee who has left. The coordinator obtains a fresh named contact and approval rather than sending the technician with an obsolete phone number.',
  },
  {
    slug: 'hvac-after-hours-dispatch-coverage-board', title: 'Run an HVAC After-Hours Dispatch Coverage Board', category: 'Dispatch systems', service: '/services/dispatch-support',
    description: 'A controlled coverage board for on-call ownership, customer updates, response windows, and next-morning reconciliation.',
    intake: 'List the on-call technician, backup, service area, effective start and end, accepted call classes, manager escalation contact, communication channel, response target, open carryover jobs, and any customer-specific commitments.',
    procedure: 'Freeze the approved roster at shift start, timestamp every reassignment, and connect each incoming case to one accountable owner. Use explicit states for awaiting callback, accepted, en route, deferred by owner, and transferred to daytime operations.',
    boundary: 'An after-hours coordinator follows the approved severity and contact matrix. A manager or technician owns technical triage, overtime authorization, geographic exceptions, and promises outside contracted coverage.',
    exception: 'Escalate an unreachable primary and backup, overlapping assignments, safety allegation, out-of-area request, disputed entitlement, missing customer identity, or system outage. Never mark a call accepted based solely on an unanswered outbound message.',
    verification: 'At shift close, reconcile calls, messages, assignments, technician acknowledgements, customer notices, and open work orders. The daytime handoff must name every unresolved decision and the next promised contact time.',
    scenario: 'The primary technician loses connectivity while two priority calls arrive. The coordinator records contact attempts, activates the named backup through the manager-approved path, and updates both customers without guessing arrival times.',
  },
  {
    slug: 'hvac-equipment-serial-model-photo-verification', title: 'Verify HVAC Equipment Model and Serial Photos', category: 'Parts and warranty', service: '/services/parts-warranty-admin',
    description: 'A photo-evidence workflow that reduces transposed identifiers while keeping compatibility and warranty decisions with qualified owners.',
    intake: 'Associate each photo with the work order, site, equipment position, capture time, photographer, model plate, serial plate, and any separately photographed component label. Preserve the original file and avoid relying on a renamed screenshot.',
    procedure: 'Check legibility, orientation, completeness, and consistency with the asset record. Transcribe characters into a review field, flag ambiguous glyphs, and retain the photo beside the transcription so a reviewer can compare both.',
    boundary: 'The administrator can verify documentary agreement and request a clearer image. A technician, manufacturer, distributor, or warranty owner decides equipment identity when plates conflict and determines part compatibility or coverage.',
    exception: 'Stop for cropped digits, glare, altered labels, multiple units in one record, conflicting model formats, missing asset location, or a request to infer a serial from installation age. Never convert an uncertain character into a confident order.',
    verification: 'Require the released parts or warranty packet to cite the reviewed identifier and source image. Compare confirmations from the supplier or manufacturer with the submitted record and reopen discrepancies before scheduling dependent work.',
    scenario: 'A plate could read the numeral zero or letter O. The coordinator marks the character uncertain, requests a straight-on photo and context image, and withholds the transcription from the order field until the qualified owner confirms it.',
  },
  {
    slug: 'maintenance-agreement-asset-roster-reconciliation', title: 'Reconcile a Maintenance Agreement Asset Roster', category: 'Maintenance plans', service: '/services/maintenance-plan-support',
    description: 'A repeatable reconciliation between contract scope, site assets, visit history, and unresolved equipment changes.',
    intake: 'Collect the executed agreement, customer and site identifiers, covered asset schedule, service frequency, inclusions, effective dates, amendment history, installed-equipment list, completed visits, and designated contract owner.',
    procedure: 'Build a line-by-line comparison that preserves both the contract description and current asset record. Mark additions, removals, replacements, duplicates, and location changes separately, citing the evidence and date for each difference.',
    boundary: 'Support staff can reconcile records and prepare questions. The contract owner decides coverage, pricing, retroactive treatment, amendment language, and whether changed equipment alters the service obligation.',
    exception: 'Escalate an asset with no agreement line, conflicting quantities, undocumented replacement, merged locations, expired amendment, completed visit against an unknown unit, or request to edit contract scope without approval.',
    verification: 'After the owner decides, confirm the agreement register, maintenance schedule, asset list, visit templates, and customer-facing summary reflect the same authorized scope. Retain the prior state and decision reference.',
    scenario: 'A new rooftop unit appears in technician notes but not in the executed schedule. The coordinator links the evidence and asks the contract owner whether it replaced a covered unit or requires an amendment.',
  },
  {
    slug: 'hvac-permit-inspection-appointment-coordination', title: 'Coordinate HVAC Permit Inspection Appointments', category: 'Customer care', service: '/services/customer-service',
    description: 'A scheduling and evidence workflow for inspection prerequisites without representing administrative staff as code authorities.',
    intake: 'Record the permit identifier, jurisdiction, project address, approved inspection type, prerequisite status, request channel, available dates, responsible licensed party, site contact, access window, and confirmation number.',
    procedure: 'Use the jurisdiction’s current published channel, preserve the submitted request, and copy the appointment into the project record with timezone and prerequisites. Send the customer and field owner an approved notice that distinguishes requested from confirmed time.',
    boundary: 'The coordinator manages appointment logistics and evidence. Licensed contractors and jurisdiction officials determine code compliance, inspection readiness, correction requirements, and whether work may be concealed or energized.',
    exception: 'Escalate a missing permit, unmatched address, unavailable licensed contact, changed inspection type, rejected request, correction notice, fee dispute, or instruction that conflicts with the official confirmation.',
    verification: 'Confirm the appointment appears in both the jurisdiction response and project schedule, then retain the inspection result and next required action. A calendar entry alone is not evidence that the authority accepted the request.',
    scenario: 'A customer requests drywall closure before the confirmed inspection. The coordinator records the request and alerts the project owner, but does not advise that concealment is permissible.',
  },
  {
    slug: 'hvac-warranty-core-return-deadline-tracker', title: 'Track HVAC Warranty Core Return Deadlines', category: 'Parts and warranty', service: '/services/parts-warranty-admin',
    description: 'A deadline tracker connecting replacement parts, removed cores, return authorization, carrier proof, and supplier credit.',
    intake: 'Capture the claim, replacement part, removed-core identifier, return authorization, supplier, technician custodian, storage point, packaging instruction, ship-by date, carrier service, tracking number, and potential charge exposure.',
    procedure: 'Start the return clock from the supplier’s documented trigger, assign custody, schedule reminders before internal cutoffs, and preserve packing and label evidence. Separate prepared, collected, delivered, accepted, and credited states.',
    boundary: 'The coordinator can monitor deadlines and prepare a compliant packet. Technicians verify the correct removed component; warranty owners decide claim eligibility; suppliers control acceptance and credit.',
    exception: 'Escalate a missing or damaged core, conflicting identifiers, expired authorization, hazardous-material question, changed ship-to address, rejected delivery, or supplier request for documentation not present in the job record.',
    verification: 'Match carrier delivery to supplier acceptance and final credit or disposition. Reconcile any chargeback with the claim and accounting owner instead of closing the tracker at delivery.',
    scenario: 'Tracking shows delivery one day before the deadline, but the supplier portal still lists the core missing. The coordinator preserves carrier proof and opens a supplier exception while the financial exposure remains visible.',
  },
  {
    slug: 'thermostat-compatibility-question-packet', title: 'Prepare a Thermostat Compatibility Question Packet', category: 'Customer care', service: '/services/customer-service',
    description: 'A structured evidence packet for routing thermostat questions to technicians without providing unlicensed installation advice.',
    intake: 'Record the current thermostat model, proposed model, equipment identifiers, system type as documented, wiring photo if safely supplied, accessory controls, customer goal, installation status, power state reported by the customer, and requested deadline.',
    procedure: 'Keep customer statements separate from verified asset data, label every image, and assemble the manufacturer links or documents already approved by the company. Route one bounded compatibility question to the designated technical owner.',
    boundary: 'Customer support can gather evidence and communicate the technician’s approved response. Only a qualified technical owner interprets wiring, power, controls, equipment compatibility, and installation steps.',
    exception: 'Escalate exposed wiring, signs of heat or damage, unknown equipment, incomplete images, conflicting model numbers, installed but nonworking controls, or requests to energize, jumper, or bypass a circuit.',
    verification: 'Record the technical owner’s attributable response, scope, conditions, and expiration if relevant. Confirm the customer communication matches that response and that any service appointment references the same evidence packet.',
    scenario: 'A homeowner sends a cropped wiring photo and asks which terminals to bridge. The coordinator declines to interpret it, records the question, requests the approved safe evidence, and routes the case to a qualified technician.',
  },
  {
    slug: 'technician-timecard-job-code-exception-queue', title: 'Manage Technician Timecard Job-Code Exceptions', category: 'Role design', service: '/services/hvac-bookkeeping-support',
    description: 'A review queue for mismatched jobs, travel, training, callbacks, and approvals before payroll processing.',
    intake: 'Capture the employee, work date, clock events, job or activity code, dispatch record, travel segment, supervisor, submitted note, edit history, payroll cutoff, and applicable approval reference.',
    procedure: 'Compare time entries with dispatch and approved activity records, categorize discrepancies without changing source facts, and return a precise question to the employee or supervisor. Preserve original and proposed values with timestamps.',
    boundary: 'Administrative support can identify and document exceptions. Supervisors approve operational coding; payroll and HR owners interpret pay rules, timekeeping policy, deductions, and corrections.',
    exception: 'Escalate missing punches, overlapping jobs, off-clock work allegations, disputed travel, unauthorized edits, absent supervisor, system outage, or a proposed change that could reduce recorded work time.',
    verification: 'After approval, compare the authorized correction with the payroll-ready record and exception queue. Confirm the audit trail identifies who requested, approved, entered, and reviewed the change.',
    scenario: 'A technician’s last job ends after the clock-out time. The coordinator preserves both records and asks the supervisor and payroll owner to resolve the discrepancy rather than shortening the job or extending time independently.',
  },
  {
    slug: 'indoor-air-quality-lead-consent-routing', title: 'Route Indoor Air Quality Leads with Clear Consent', category: 'Customer care', service: '/services/customer-service',
    description: 'A privacy-aware intake and routing process for indoor-air-quality inquiries, contact permission, and technical boundaries.',
    intake: 'Record the requester, property, preferred contact channel, consent statement, source campaign, stated concern, affected area, timing, prior service relationship, occupants’ scheduling needs, and any voluntarily provided sensitive detail.',
    procedure: 'Collect only the information required for routing, preserve the source and consent event, apply suppression rules, and assign the inquiry to the approved sales or service queue. Describe the request in the customer’s words without making health claims.',
    boundary: 'The coordinator may schedule and relay approved service information. Qualified technical owners discuss HVAC assessment; medical professionals address health questions; privacy and marketing owners define contact permission.',
    exception: 'Escalate reports of an immediate emergency, suspected carbon monoxide, medical symptoms, conflicting consent, a suppressed contact, a minor’s information, or a demand for a guaranteed health outcome.',
    verification: 'Confirm the CRM source, consent, owner, promised contact window, and suppression status. Audit the first outbound message against the approved purpose and remove unnecessary sensitive detail from general notes.',
    scenario: 'A web lead describes respiratory symptoms and requests a diagnosis. The coordinator uses the emergency and medical disclaimer path, limits CRM detail, and routes only the HVAC service question to the qualified team.',
  },
  {
    slug: 'seasonal-demand-callback-priority-log', title: 'Build a Seasonal Demand Callback Priority Log', category: 'Dispatch systems', service: '/services/dispatch-support',
    description: 'A fair, inspectable callback log for peak-weather queues, changed circumstances, and customer communication.',
    intake: 'Capture request time, customer and site, service entitlement, approved urgency factors, equipment impact, vulnerable-occupant flag under policy, last contact, promised callback window, assigned owner, current state, and escalation reason.',
    procedure: 'Apply the published priority matrix consistently, retain the original position and every authorized change, and group duplicate contacts into one case. Update customers using approved language that avoids unsupported arrival promises.',
    boundary: 'The coordinator can maintain the queue and apply documented criteria. Dispatch leadership owns discretionary reprioritization, capacity allocation, overtime, service-area exceptions, and technical severity decisions.',
    exception: 'Escalate new safety information, repeated failed contact, suspected duplicate households, disputed entitlement, system outage, inaccessible property, or a request from an employee to bypass the queue without recorded authority.',
    verification: 'Reconcile the callback log to dispatched work, deferrals, cancellations, and unresolved cases at each shift change. Sample priority changes for an attributable reason and owner approval.',
    scenario: 'A customer calls again after conditions worsen. The coordinator adds the new timestamped facts, preserves the original request, and asks the dispatch owner to reassess priority rather than manually moving the record to the top.',
  },
];

const blogSections = (s: BlogSpec) => [
  { heading: 'Define the operating record', paragraphs: [`Published October 12, 2026. ${s.intake}`, `For ${s.title.toLowerCase()}, a useful record lets a backup understand the request, evidence, deadline, present state, and accountable owner without reconstructing a private message. Use named fields and source links rather than a single free-form status box.`] },
  { heading: 'Separate preparation from technical judgment', paragraphs: [s.boundary, `Write the authority boundary for ${s.title.toLowerCase()} into access permissions, scripts, and review criteria. A controlled stop is better than an unsupported answer when safety, licensing, employment, contract, or customer rights may be affected.`] },
  { heading: 'Run the workflow in one traceable queue', paragraphs: [s.procedure, `The ${s.title.toLowerCase()} queue should use named accounts, retain receipt and action times, and identify the version of every changing source. Missing inputs and pending decisions must remain visible rather than disappearing into a generic status.`] },
  { heading: 'Design the exception path before launch', paragraphs: [s.exception, `An escalation for ${s.title.toLowerCase()} should identify the affected record, evidence checked, immediate safeguard, decision owner, exact question, and next review time. A bare blocked label is not enough for a time-sensitive service operation.`] },
  { heading: 'Test the handoff with a real case', paragraphs: [s.scenario, `Ask a second operator to reconstruct this ${s.title.toLowerCase()} case using only the retained record. If that reviewer needs memory, private chat, or an unexplained code, revise the handoff before expanding the workflow.`] },
  { heading: 'Verify the result at its destination', paragraphs: [s.verification, `Completion for ${s.title.toLowerCase()} means the authorized result appears in every affected destination and every unresolved risk has an owner. Preserve the before state, decision, actor, action time, after state, and customer communication.`] },
  { heading: 'Measure quality without rewarding shortcuts', paragraphs: [`For ${s.title.toLowerCase()}, track first-pass completeness, exception categories, owner wait time, returned work, corrections, aged open items, and verified closure. Separate coordinator handling from waits caused by customers, technicians, managers, suppliers, jurisdictions, or systems.`, `Review ordinary, escalated, corrected, and unresolved ${s.title.toLowerCase()} cases. Use patterns to improve intake fields, examples, training, permissions, and owner availability instead of treating every delay as an individual performance problem.`] },
  { heading: 'Pilot the procedure', paragraphs: [`Pilot ${s.title.toLowerCase()} with one normal case, one missing source, one conflicting source, one absent owner, and one late change. Record what a backup reviewer can and cannot reconstruct.`, `Expand ${s.title.toLowerCase()} only when the team can show stable intake, an explicit authority boundary, a usable exception packet, an attributable decision, and destination-level verification. Retain the pilot evidence with the procedure revision.`] },
];

export const october12BlogPosts: BlogPost[] = blogSpecs.map((s, index) => ({
  slug: s.slug, title: s.title, description: s.description, category: s.category, publishedAt, readTime: '11 min read',
  thumbnail: `/october-12-2026/${s.slug}.svg`, sections: blogSections(s), internalService: s.service,
  internalSibling: `/blog/${blogSpecs[(index + 1) % blogSpecs.length].slug}`,
  faq: [
    { q: 'What should the remote coordinator own?', a: 'The coordinator can own complete records, approved communication, queue states, and decision-ready exception packets within documented access and authority.' },
    { q: 'What stays with the HVAC company?', a: 'Technical, safety, licensing, contract, financial, employment, and policy judgments remain with the qualified and accountable company owner.' },
    { q: 'How should the workflow be reviewed?', a: 'Review a balanced sample against source evidence, authority, exception handling, and proof that the approved result reached every required destination.' },
  ],
  source: { label: 'United States Environmental Protection Agency Section 608', url: 'https://www.epa.gov/section608' },
}));

type ResearchSpec = {
  slug: string; title: string; summary: string; cluster: string; finding: string;
  question: string; population: string; design: string; measures: string; analysis: string; limitations: string; decision: string;
  sources: { label: string; url: string }[];
};

const commonSources = [
  { label: 'U.S. EPA Section 608', url: 'https://www.epa.gov/section608' },
  { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework' },
  { label: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework' },
  { label: 'U.S. GAO Green Book', url: 'https://www.gao.gov/green-book' },
  { label: 'OSHA Recommended Practices for Safety and Health Programs', url: 'https://www.osha.gov/safety-management' },
  { label: 'U.S. Department of Energy Energy Saver HVAC guidance', url: 'https://www.energy.gov/energysaver/heating-and-cooling' },
  { label: 'National Weather Service climate resources', url: 'https://www.weather.gov/climateservices/' },
];

const researchSpecs: ResearchSpec[] = [
  {
    slug: 'weather-normalized-hvac-dispatch-demand-forecast', title: 'Weather-Normalized HVAC Dispatch Demand Forecast', cluster: 'Dispatch systems',
    summary: 'A preregistered forecasting design for separating weather exposure, installed-base demand, queue practices, and calendar effects.',
    finding: 'A forecast is operationally useful only when its horizon, service population, weather source, error measure, and staffing decision are fixed before results are reviewed.',
    question: 'Does adding local weather exposure and calendar controls improve next-day and seven-day demand forecasts enough to change defensible coverage decisions?',
    population: 'Include eligible inbound service requests by service area and received hour for at least two cooling and heating transitions. Retain zero-demand intervals, cancellations, duplicates, and capacity-blocked requests as labeled states rather than deleting them.',
    design: 'Compare a seasonal-naive baseline, calendar-only model, and weather-plus-calendar model using rolling-origin evaluation. Freeze forecast issuance time, station mapping, temperature and humidity features, horizon, training window, and outage treatment before scoring.',
    measures: 'Use mean absolute error and bias by horizon, service area, day type, and temperature band. Add coverage-decision errors such as underplanned intervals, overplanned intervals, and late schedule changes, while keeping customer waits descriptive rather than causal.',
    analysis: 'Report paired errors on identical forecast origins with uncertainty intervals. Examine calibration across quiet, ordinary, and extreme conditions and publish missing-weather and system-outage counts with the denominator.',
    limitations: 'Weather association does not identify why customers call. Promotions, installed equipment, service entitlement, staffing, queue abandonment, and local events may change observed demand independently.',
    decision: 'Adopt the richer forecast only if it improves prespecified error and coverage thresholds across more than one season without hiding extreme-day misses. Preserve manager override reasons for later audit.',
    sources: [
      { label: 'NOAA Climate Data Online', url: 'https://www.ncei.noaa.gov/cdo-web/' },
      { label: 'ASHRAE climatic design information', url: 'https://www.ashrae.org/technical-resources/bookstore/weather-data-center' },
      { label: 'U.S. Energy Information Administration heating and cooling degree days', url: 'https://www.eia.gov/energyexplained/units-and-calculators/degree-days.php' },
    ],
  },
  {
    slug: 'hvac-technician-travel-time-buffer-study', title: 'HVAC Technician Travel-Time Buffer Study', cluster: 'Dispatch systems',
    summary: 'A route-level study of schedule buffers that distinguishes driving variation from job duration, dispatch delay, and customer access.',
    finding: 'Travel buffers should be estimated for defined route conditions and tested against both late arrival risk and unused capacity, not chosen from one fleetwide average.',
    question: 'Which route, time-of-day, and service-area buffer rules best protect customer windows without manufacturing excessive idle time?',
    population: 'Include completed technician legs with attributable prior-job close, departure, arrival, geography, day type, and documented exceptions. Separate first jobs, returns to base, multi-technician travel, and customer-caused access delays.',
    design: 'Evaluate candidate percentile buffers in a time-ordered holdout. Define geocoding precision, traffic-data snapshot, excluded private stops, clock conventions, and treatment of technician corrections before opening the outcome file.',
    measures: 'Measure absolute arrival error, late-window rate, early idle minutes, reschedules, and dispatcher interventions by route class. Report privacy-safe aggregates and never use raw location traces as an individual productivity score.',
    analysis: 'Compare candidate rules with the current schedule using paired route days. Stratify urban, suburban, rural, morning, midday, evening, and severe-weather conditions; report sample size and uncertainty for every subgroup.',
    limitations: 'Observed travel embeds dispatch choices and job overruns. Location gaps, customer access, refueling, meal periods, and unrecorded operational stops can make a leg appear faster or slower than road conditions alone.',
    decision: 'Change buffers only where a rule improves the agreed late-arrival threshold without breaching unused-capacity limits. Require dispatch-owner review for sparse segments and document any manual override policy.',
    sources: [
      { label: 'Federal Highway Administration travel time reliability', url: 'https://ops.fhwa.dot.gov/perf_measurement/reliability_measures/' },
      { label: 'Bureau of Transportation Statistics congestion data', url: 'https://www.bts.gov/congestion' },
      { label: 'U.S. Department of Labor hours worked guidance', url: 'https://www.dol.gov/agencies/whd/fact-sheets/22-flsa-hours-worked' },
    ],
  },
  {
    slug: 'maintenance-agreement-renewal-cohort-research', title: 'Maintenance Agreement Renewal Cohort Research', cluster: 'Maintenance plans',
    summary: 'A cohort design for evaluating renewal operations without confusing eligibility, contactability, price changes, and customer selection.',
    finding: 'Renewal reporting becomes decision-ready when the eligible cohort, observation window, contact policy, amendments, and competing outcomes are frozen before rates are calculated.',
    question: 'Which documented renewal-workflow changes are associated with complete, timely decisions among comparable maintenance-agreement cohorts?',
    population: 'Construct cohorts from agreements reaching a defined decision window, retaining renewals, declines, nonresponses, cancellations, ineligible accounts, ownership changes, and unresolved contracts with explicit reason codes.',
    design: 'Compare workflow periods using a frozen eligibility rule and observation horizon. Record contact schedule, channel consent, price or scope change, service history availability, account ownership, and system migrations.',
    measures: 'Report decision completion, renewal, decline, unresolved aging, contact delivery, opt-out, correction, and amendment rates with denominators. Separate administrative completion from commercial outcome.',
    analysis: 'Use stratified descriptive comparisons and adjusted models only when overlap and sample size support them. Publish sensitivity analyses for late decisions, changed eligibility, and accounts lost during system migration.',
    limitations: 'Customers self-select and pricing, service experience, weather, ownership, market conditions, and policy changes can influence renewal. An observed association is not evidence that reminders caused retention.',
    decision: 'Retain a workflow change when it improves complete decisions and evidence quality without increasing consent errors, unresolved exceptions, or misleading pressure. Commercial claims require a separate causal design.',
    sources: [
      { label: 'Federal Trade Commission CAN-SPAM compliance guide', url: 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business' },
      { label: 'Federal Communications Commission consumer consent resources', url: 'https://www.fcc.gov/rules-political-campaign-calls-and-texts' },
      { label: 'U.S. Census Bureau Business Dynamics Statistics', url: 'https://www.census.gov/programs-surveys/bds.html' },
    ],
  },
  {
    slug: 'parts-delay-customer-update-cadence-experiment', title: 'Parts-Delay Customer Update Cadence Experiment', cluster: 'Customer care',
    summary: 'A controlled communication study for update timing, channel consent, operational burden, and customer information quality.',
    finding: 'An update cadence should be judged by verified delivery, question burden, expectation accuracy, and exceptions, not by message volume alone.',
    question: 'Does a scheduled parts-delay update cadence improve information completeness and reduce unplanned status contacts relative to the current owner-directed process?',
    population: 'Include eligible delayed-part cases with customer consent, known order state, and an accountable service owner. Exclude emergencies and disputes requiring individualized legal, safety, or technical communication, documenting every exclusion.',
    design: 'Randomize eligible cases or time blocks between current practice and a preapproved cadence. Freeze templates, stop rules, channel, sender identity, owner escalation, delivery checks, and the definition of a material status change.',
    measures: 'Measure verified delivery, inbound status contacts, correction messages, missed material changes, opt-outs, complaints, owner handling time, and days with an accurate next-update promise. Do not substitute open rate for understanding.',
    analysis: 'Use intention-to-treat comparisons with confidence intervals and report crossover, undelivered messages, and early stops. Review qualitative exception themes without converting isolated comments into rates.',
    limitations: 'Supplier performance, part criticality, customer history, season, job value, and uncertain arrival estimates affect both communication and response. Blinding is not practical, and message metrics may be incomplete.',
    decision: 'Adopt a cadence only when it meets prespecified information-quality and consent safeguards without shifting excessive work to technicians or creating promises unsupported by supplier evidence.',
    sources: [
      { label: 'Federal Trade Commission truth-in-advertising guidance', url: 'https://www.ftc.gov/business-guidance/advertising-marketing/truth-advertising' },
      { label: 'Federal Communications Commission unwanted calls guidance', url: 'https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts' },
      { label: 'Digital.gov usability guidance', url: 'https://digital.gov/topics/usability/' },
    ],
  },
  {
    slug: 'first-visit-hvac-evidence-completeness-study', title: 'First-Visit HVAC Evidence Completeness Study', cluster: 'Role design',
    summary: 'A blinded record-review design linking intake evidence to review readiness without claiming that paperwork alone causes first-visit resolution.',
    finding: 'Evidence completeness can be measured reproducibly, but first-visit outcomes must be analyzed with equipment, job, technician, inventory, access, and season context.',
    question: 'Which pre-visit evidence fields are reliably available, reproducibly scored, and useful for preparing a technician’s first visit?',
    population: 'Sample completed and incomplete first visits across service types, technicians, areas, day types, and seasons. Preserve reschedules, no-access visits, safety stops, unknown assets, and unavailable parts as distinct outcomes.',
    design: 'Create a field-level rubric from approved operating needs, then have reviewers blinded to visit outcome score frozen intake packets. Measure inter-rater agreement before exploring relationships with downstream outcomes.',
    measures: 'Measure field completeness, source attribution, conflicting evidence, reviewer agreement, preparation changes, first-visit closure, return visit, safety stop, access failure, and correction frequency.',
    analysis: 'Report agreement and missingness before outcome associations. Use stratified or adjusted analysis with prespecified covariates; distinguish predictive usefulness from causal effect and publish uncertainty and excluded records.',
    limitations: 'Complex work may require more evidence and still need return visits. Technician expertise, inventory, diagnostic uncertainty, authorization, weather, and customer access create confounding that documentation cannot remove.',
    decision: 'Add an intake field only when staff can collect it safely and reliably, reviewers agree on its meaning, and its operational use justifies burden. Never ask customers to perform hazardous inspection for data completeness.',
    sources: [
      { label: 'CDC Epi Info data quality resources', url: 'https://www.cdc.gov/epi-info/' },
      { label: 'NIST measurement science', url: 'https://www.nist.gov/topics/measurement-science' },
      { label: 'U.S. Bureau of Labor Statistics occupational requirements survey', url: 'https://www.bls.gov/ors/' },
    ],
  },
];

const researchSections = (s: ResearchSpec) => [
  { heading: 'Research question and decision context', paragraphs: [`Published October 12, 2026. ${s.question}`, `For the ${s.title}, write the operational decision, decision owner, comparison, horizon, minimum useful difference, and guardrails before analysis. This keeps a descriptive pattern from becoming a staffing or customer promise after results are known.`] },
  { heading: 'Population and unit of analysis', paragraphs: [s.population, `The ${s.title} report should publish the inclusion flow from available to analyzed records, naming the unit, window, timezone, deduplication rule, missing-data states, and repeated observations.`] },
  { heading: 'Design and data protocol', paragraphs: [s.design, `Use least-privilege access, frozen extracts, a data dictionary, reproducible transformations, and an approved plan for the ${s.title}. Separate identifiers from the analytic table whenever individual identity is unnecessary.`] },
  { heading: 'Measures and quality checks', paragraphs: [s.measures, `Before estimating any ${s.title} effect, validate timestamps, identifiers, status transitions, impossible values, and source coverage. Report denominators for missing, corrected, excluded, and unresolved observations.`] },
  { heading: 'Analysis plan', paragraphs: [s.analysis, `Keep exploratory ${s.title} findings labeled as exploratory. Avoid rankings from sparse groups, report practical magnitude with uncertainty, and preserve the code or query version behind every published table.`] },
  { heading: 'Threats and limitations', paragraphs: [s.limitations, `The ${s.title} also needs explicit review of selection, measurement change, seasonality, concurrent policy changes, dependent observations, and behavior changes caused by measurement. Put these limits beside the result.`] },
  { heading: 'Decision rule and monitoring', paragraphs: [s.decision, `Assign the ${s.title} an owner, review date, rollback trigger, and monitoring sample for any adopted change. End with a bounded decision and evidence-retention plan, not a dashboard whose definitions can drift.`] },
];

export const october12ResearchPosts: ResearchPost[] = researchSpecs.map((s) => ({
  slug: s.slug, title: s.title, summary: s.summary, cluster: s.cluster, publishedAt, finding: s.finding,
  thumbnail: `/october-12-2026/${s.slug}.svg`, sections: researchSections(s), sources: [...commonSources, ...s.sources],
}));
