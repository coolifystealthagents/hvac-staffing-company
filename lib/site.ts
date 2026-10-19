import type { SiteConfig } from './types';

type ServiceManual = {
  roleFit: string[];
  problem: string[];
  inputsAccess: string[];
  workflowSteps: string[];
  deliverables: string[];
  qualityControls: string[];
  exceptionPaths: string[];
  decisionBoundaries: string[];
  startingScenarios: string[];
  faqs: { q: string; a: string }[];
};

type SiteWithServiceManual = Omit<SiteConfig, 'services'> & {
  services: (SiteConfig['services'][number] & { heroImage: string; heroAlt: string; manual: ServiceManual })[];
};

export const site: SiteWithServiceManual = {
  "name": "HVAC Staffing Company",
  "domain": "hvacstaffingcompany.com",
  "siteId": "hvac-staffing-company",
  "niche": "HVAC businesses",
  "audience": "HVAC owners, dispatch leaders, and service managers",
  "design": "craft",
  "eyebrow": "Built for the rhythm of HVAC work",
  "hero": "Keep the field moving",
  "heroAccent": "from the office.",
  "heroBody": "Specialist remote staff support dispatch records, maintenance plan follow up, estimate coordination, customer communication, and back office workflows for growing HVAC teams.",
  "manifesto": "Strong field service depends on an office system that never loses the next step.",
  "primary": "#e35c28",
  "secondary": "#8dc6d2",
  "accent": "#f0c15f",
  "canvas": "#f4f0e8",
  "ink": "#172d33",
  "displayFont": "Rockwell",
  "bodyFont": "Trebuchet MS",
  "heroImage": "/hero.png",
  "heroAlt": "HVAC ductwork, copper tubing, gauge, and blank plans arranged on a bright workshop table",
  "services": [
    {
      "slug": "dispatch-support",
      "name": "Dispatch support",
      "short": "Keep job records, technician updates, and customer windows organized.",
      "heroImage": "/editorial/hvac-dispatch-handoff-checklist.svg",
      "heroAlt": "HVAC dispatch handoff workflow showing a controlled request and technician update path",
      "tasks": ["Prepare dispatch records", "Update job statuses", "Coordinate approved notices", "Flag schedule conflicts"],
      "manual": {
        "roleFit": [
          "This lane is for a dispatcher or service manager whose technician board is accurate only when one busy person keeps every change in memory.",
          "It fits teams with written priority rules, defined service areas, approved customer messages, and an on-duty person who owns field and safety decisions."
        ],
        "problem": [
          "A late technician update, an unrecorded access note, or two jobs promised for the same window can make the dispatch board unreliable.",
          "Dispatch support keeps source-backed job status and customer communication together so the dispatcher can resolve capacity rather than reconstruct the day."
        ],
        "inputsAccess": [
          "Provide role-based access to the dispatch board, job records, technician status channel, service-area map, on-call roster, and approved arrival templates.",
          "Each job needs the service address, contact details, promised window, job type, equipment or access notes already supplied by the customer, and assigned priority."
        ],
        "workflowSteps": [
          "Open the active job board and reconcile technician acknowledgements with the recorded assignment.",
          "Check each job for address, contact, access, promised window, and approved priority fields before marking it ready.",
          "Record technician-provided en route, arrived, paused, and complete updates without interpreting field findings.",
          "Send only approved window notices, log the communication, and place conflicts in the dispatcher's review queue.",
          "Close the handoff with the current job status, source timestamp, next action, and named owner."
        ],
        "deliverables": [
          "An updated technician board with source timestamps, customer contact history, and unresolved job conflicts visible.",
          "A shift handoff listing waiting customers, jobs without acknowledgement, access constraints, and decisions needed from the dispatcher."
        ],
        "qualityControls": [
          "Compare every moved job against the original promised window and verify that the technician update came from the authorized channel.",
          "Before shift handoff, check that no active job lacks a next owner and that customer notices match the approved dispatch template."
        ],
        "exceptionPaths": [
          "Route double bookings, unavailable technicians, out-of-area jobs, repeated no-contact attempts, and missed windows to the on-duty dispatcher with the job record attached.",
          "Escalate any customer report involving gas odor, smoke, electrical hazard, medical risk, or immediate danger through the company's emergency path rather than placing it in the routine job queue."
        ],
        "decisionBoundaries": [
          "The support role may maintain job records and send approved notices; it may not diagnose equipment, assign technical priority, direct technician work, or promise an arrival outside approved dispatch rules.",
          "Schedule overrides, after-hours acceptance, safety instructions, and changes to field capacity remain with authorized dispatch or technical leadership."
        ],
        "startingScenarios": [
          "Start with the morning job-board check for one service area where technician acknowledgements are currently collected in chat.",
          "Another controlled start is the afternoon window-notice queue, with every job conflict returned to the dispatcher before any customer promise changes."
        ],
        "faqs": [
          { "q": "Can dispatch support reassign a technician when a job runs long?", "a": "No. The assistant documents the technician update and shows the conflict, while the authorized dispatcher decides whether to reassign the job or change the customer window." },
          { "q": "How are urgent dispatch calls handled?", "a": "The assistant follows the company's written urgent-call path, records the caller's words, and immediately alerts the designated dispatcher without diagnosing the equipment or giving safety instructions." },
          { "q": "What proves that the dispatch board is current?", "a": "Each active job should show the source and time of the latest technician status, the last approved customer notice, the next action, and the person who owns it." }
        ]
      }
    },
    {
      "slug": "maintenance-plan-support",
      "name": "Maintenance plan support",
      "short": "Maintain renewal, reminder, and service records for plan customers.",
      "heroImage": "/editorial/hvac-maintenance-plan-follow-up.svg",
      "heroAlt": "HVAC maintenance plan follow-up workflow with renewal and service record checkpoints",
      "tasks": ["Prepare renewal queues", "Send approved reminders", "Update plan records", "Escalate account exceptions"],
      "manual": {
        "roleFit": [
          "This lane fits teams with a defined maintenance plan, a recurring renewal or visit queue, and an owner for plan eligibility and account exceptions.",
          "It is useful when membership terms are documented but reminders, visit history, and renewal status are split between billing and service records."
        ],
        "problem": [
          "Plan customers lose confidence when a completed visit is missing, a renewal reminder uses the wrong term, or an account is contacted despite an unresolved balance question.",
          "Maintenance plan support creates one reviewable membership trail without deciding benefits, coverage, or service eligibility."
        ],
        "inputsAccess": [
          "Provide the plan roster, approved plan terms, renewal dates, completed maintenance history, customer contact preferences, approved reminder templates, and role-based CRM access.",
          "The plan record should identify location, covered equipment when recorded, visit entitlement, renewal method, current status, and the staff owner for membership exceptions."
        ],
        "workflowSteps": [
          "Build the plan queue by renewal date or outstanding maintenance visit and exclude records with a documented hold.",
          "Compare the membership record with completed service history and flag mismatched plan status or visit counts.",
          "Send the approved plan reminder through the customer's permitted channel and record the attempt.",
          "Apply only documented response statuses, then route cancellation, benefit, billing, or eligibility questions to the plan owner.",
          "Set the next plan action and retain the source record used for the update."
        ],
        "deliverables": [
          "A renewal and maintenance queue showing plan term, contact result, outstanding visit status, next action, and exception owner.",
          "A membership exception list for duplicate plans, missing service history, disputed renewals, and records whose plan terms cannot be confirmed."
        ],
        "qualityControls": [
          "Match each plan reminder to the approved term and renewal date, and suppress any membership record marked do not contact or pending review.",
          "Reconcile completed maintenance visits to the plan ledger before changing visit status, preserving the job reference as evidence."
        ],
        "exceptionPaths": [
          "Pause plan outreach when renewal terms conflict, a payment is disputed, a customer requests cancellation, or completed maintenance is absent from the membership record.",
          "Send questions about covered work, transferability, refunds, lapsed-plan treatment, or unusual equipment eligibility to the authorized plan owner."
        ],
        "decisionBoundaries": [
          "The support role may prepare plan queues and send approved reminders; it may not interpret membership terms, grant benefits, waive fees, issue refunds, or determine technical maintenance needs.",
          "Plan eligibility, pricing, cancellation outcomes, financial adjustments, and technical recommendations remain with authorized company staff."
        ],
        "startingScenarios": [
          "Start with plans renewing in one defined month after the plan owner verifies terms and removes accounts already under review.",
          "A second safe start is a plan-visit reconciliation for one completed week, with missing or duplicate membership history routed before customer outreach."
        ],
        "faqs": [
          { "q": "Can maintenance plan support explain whether a repair is covered?", "a": "No. The assistant can share approved plan language and route the question, but an authorized plan owner decides how membership terms apply to a specific repair." },
          { "q": "What happens when a plan visit is missing from the account?", "a": "The assistant preserves the service-job reference, flags the mismatch in the plan queue, and waits for the plan owner to confirm whether the membership record should change." },
          { "q": "Can the assistant cancel or renew a membership?", "a": "The assistant records the customer's request and prepares the plan record, while cancellation, renewal authorization, charges, and refunds follow the company's approved financial process." }
        ]
      }
    },
    {
      "slug": "estimate-follow-up",
      "name": "Estimate follow up",
      "short": "Keep approved estimate follow up visible and consistent.",
      "heroImage": "/editorial/hvac-estimate-follow-up-workflow.svg",
      "heroAlt": "HVAC estimate follow-up workflow showing proposal review and customer response routing",
      "tasks": ["Prepare follow up queues", "Record customer responses", "Route technical questions", "Maintain next actions"],
      "manual": {
        "roleFit": [
          "This lane is for sales or service teams that already issue approved estimates but lack a consistent record of customer response and next action.",
          "It works when each proposal has an owner, validity details, approved follow-up wording, and a clear route for pricing and technical questions."
        ],
        "problem": [
          "An estimate can stall when follow-up lives in personal inboxes, the customer asks a technical question, or a revised proposal is discussed without a recorded approval.",
          "Estimate follow-up keeps contact attempts and customer intent visible while protecting the boundary between coordination and sales, pricing, or system-design judgment."
        ],
        "inputsAccess": [
          "Provide read access to the approved estimate, issue date, validity or expiry note, customer preferences, assigned estimator, financing handoff if applicable, and approved contact sequence.",
          "Only the current proposal version and company-approved explanation templates should enter the estimate queue; drafts and superseded options stay excluded."
        ],
        "workflowSteps": [
          "Verify that the estimate is approved, assigned, and within its documented follow-up period before contacting the customer.",
          "Review prior estimate contacts so the next message follows the approved cadence and channel preference.",
          "Send the approved follow-up, record the customer's words and level of interest without reframing technical or price details.",
          "Route requests for revised scope, equipment comparison, discount, financing advice, or technical explanation to the estimate owner.",
          "Record the proposal's next action, due date, owner, and source communication."
        ],
        "deliverables": [
          "An estimate pipeline with current proposal version, last contact, verbatim response summary, next action, due date, and sales owner.",
          "A review queue separating ready-to-schedule responses from requested revisions, technical questions, price objections, and no-contact estimates."
        ],
        "qualityControls": [
          "Confirm the estimate identifier and approved version before every contact, and never copy price or scope from an earlier proposal.",
          "Check that each estimate response is tied to its source message and that requested changes remain open until the authorized estimator resolves them."
        ],
        "exceptionPaths": [
          "Pause estimate follow-up when validity has expired, scope appears changed, customer identity is uncertain, or the customer disputes what was proposed.",
          "Route discount requests, competitor comparisons, financing questions, equipment substitutions, load or sizing questions, and readiness-to-buy responses to the named estimate owner."
        ],
        "decisionBoundaries": [
          "The support role may coordinate an approved estimate and document interest; it may not alter scope or price, recommend equipment, promise savings, negotiate, or provide technical advice.",
          "Proposal approval, system design, code and permit interpretation, financing guidance, discounts, and final sales commitments remain with qualified authorized staff."
        ],
        "startingScenarios": [
          "Start with approved residential estimates issued during one recent week, excluding proposals awaiting technical revision or management approval.",
          "Another useful start is an aging estimate queue where the estimator first marks the valid version and assigns a specific response path."
        ],
        "faqs": [
          { "q": "Can estimate follow-up offer a discount to secure the work?", "a": "No. The assistant records the price concern and routes it to the estimate owner; only authorized staff may change pricing, scope, terms, or incentives." },
          { "q": "How are customer equipment questions answered?", "a": "The assistant captures the estimate question and links it to the current proposal, then a qualified team member explains equipment selection, sizing, installation, or expected performance." },
          { "q": "When is an estimate ready to leave the follow-up queue?", "a": "It leaves only under the company's documented estimate status rules, such as an authorized scheduled handoff, confirmed decline, approved closure, or replacement by a new proposal version." }
        ]
      }
    },
    {
      "slug": "customer-service",
      "name": "Customer service support",
      "short": "Handle routine customer communication with clear escalation rules.",
      "heroImage": "/editorial/hvac-customer-escalation-path.svg",
      "heroAlt": "HVAC customer service escalation path separating routine cases from urgent review",
      "tasks": ["Answer approved questions", "Document service requests", "Route urgent issues", "Prepare resolution summaries"],
      "manual": {
        "roleFit": [
          "This lane fits an HVAC office with repeatable customer questions, approved service information, and a named owner for complaints, emergencies, and policy exceptions.",
          "It supports teams that need consistent intake and case notes without asking the first-line customer contact to diagnose or promise a resolution."
        ],
        "problem": [
          "Customer context is lost when calls, texts, and emails create separate accounts of the same request or when a routine question hides a safety concern.",
          "Customer service support creates a complete case record and sends each caller to the correct owner under written urgency and escalation rules."
        ],
        "inputsAccess": [
          "Provide approved service-area, hours, appointment, payment-method, and communication policies plus role-based access to customer and job history.",
          "The customer intake form should capture contact details, service location, caller's own description, related job if known, preferred response channel, and escalation category."
        ],
        "workflowSteps": [
          "Confirm the customer's identity and service location using the company's approved verification fields.",
          "Capture the caller's request in their own words and check for an existing customer case or open job before creating another record.",
          "Answer only from approved office information, then classify the case using written routine, priority, complaint, and emergency paths.",
          "Route the customer case with its contact history and supporting job references to the responsible team member.",
          "Send an approved acknowledgement and record the expected next owner without guaranteeing an outcome or timing."
        ],
        "deliverables": [
          "A customer case containing verified contact context, verbatim issue summary, linked job history, communication log, classification, and next owner.",
          "An unresolved-case handoff grouped by safety alert, active-service complaint, scheduling request, billing question, and routine information request."
        ],
        "qualityControls": [
          "Review customer records for duplicate cases, accurate service location, source-linked notes, correct consent or channel preference, and a named next owner.",
          "Audit escalated caller notes to confirm that urgent phrases were preserved rather than softened and that only approved customer wording was sent."
        ],
        "exceptionPaths": [
          "Immediately use the company's emergency path for customer reports of gas odor, smoke, fire, carbon monoxide alarm, electrical hazard, injury, or another stated immediate danger.",
          "Route threats, legal or insurance statements, repeated complaints, refund demands, disputed work, abusive contact, and vulnerable-customer concerns to the designated customer service owner."
        ],
        "decisionBoundaries": [
          "The support role may document customer requests and provide approved office information; it may not diagnose, give safety or technical instructions, admit liability, promise refunds, or commit field resources.",
          "Emergency direction, complaint resolution, credits, policy exceptions, legal responses, and technical advice remain with authorized personnel and emergency services where applicable."
        ],
        "startingScenarios": [
          "Start with routine customer requests about existing appointment windows and job-record copies, while all complaints and urgent calls follow the existing escalation owner.",
          "A second starting lane is after-hours customer intake that acknowledges receipt but leaves scheduling, diagnosis, and priority decisions to the on-call team."
        ],
        "faqs": [
          { "q": "Can customer service tell a caller how to make equipment safe?", "a": "No. The assistant follows the company's emergency script and escalation path without diagnosing or giving technical or safety instructions; immediate danger belongs with emergency services and authorized staff." },
          { "q": "How should a customer complaint be documented?", "a": "Record the customer's own words, related job and contact history, requested outcome, and any urgent concern, then route the case without admitting fault or promising a remedy." },
          { "q": "Can the customer support role promise an appointment time?", "a": "Only an already approved window may be repeated. New timing, technician availability, priority, and exceptions must be confirmed by the authorized scheduling or dispatch owner." }
        ]
      }
    },
    {
      "slug": "parts-warranty-admin",
      "name": "Parts and warranty administration",
      "short": "Organize records that support parts, warranty, and vendor workflows.",
      "heroImage": "/editorial/parts-warranty-admin-source-quality-audit-17.svg",
      "heroAlt": "HVAC parts and warranty source quality workflow for claim evidence and vendor review",
      "tasks": ["Maintain claim records", "Prepare document packets", "Track request status", "Flag missing information"],
      "manual": {
        "roleFit": [
          "This lane fits service departments that submit recurring parts or warranty paperwork and have a technical reviewer who confirms diagnosis, part selection, and claim eligibility.",
          "It is effective when model and serial evidence, vendor references, labor records, and claim status need one controlled administrative trail."
        ],
        "problem": [
          "A warranty claim can stall because the model label is unreadable, the failed part is not linked to the job, or a vendor request lacks required proof.",
          "Parts and warranty administration assembles evidence and tracks status without deciding whether a component failed, which replacement is correct, or whether coverage applies."
        ],
        "inputsAccess": [
          "Provide the service job, technician-supplied diagnosis, model and serial image, installation or purchase record, part number supplied by authorized staff, vendor portal requirements, and claim owner.",
          "Role-based access should permit claim preparation and status review but exclude authority to select parts, certify technical findings, approve coverage, or accept vendor terms."
        ],
        "workflowSteps": [
          "Open the parts or warranty request and match it to the service job, customer equipment record, and authorized technical finding.",
          "Check the claim packet for required model, serial, installation date, part reference, proof of purchase, photos, and labor documentation.",
          "Enter source-backed fields into the vendor claim or parts request and save a review copy before submission where approval is required.",
          "Record vendor acknowledgement, return authorization, shipment, credit, denial, or request for information exactly as received.",
          "Route technical, coverage, substitute-part, financial, and deadline exceptions to the named claim owner."
        ],
        "deliverables": [
          "A review-ready claim packet with service-job link, model and serial evidence, authorized part reference, required attachments, and missing-item checklist.",
          "A parts and warranty tracker showing vendor case number, request date, return deadline, shipment or credit status, next action, and claim owner."
        ],
        "qualityControls": [
          "Compare model, serial, and part identifiers character by character against their source images or authorized records before preparing the claim.",
          "Check every warranty packet against the specific vendor checklist and retain submission confirmation, return tracking, and vendor correspondence in the claim record."
        ],
        "exceptionPaths": [
          "Pause a part or claim packet for unreadable labels, conflicting serial numbers, absent technical findings, missing purchase evidence, expired return windows, or mismatched job records.",
          "Route claim denials, suspected duplicate claims, substitute-part proposals, coverage disputes, refrigerant or safety-related technical questions, and vendor credit discrepancies to authorized owners."
        ],
        "decisionBoundaries": [
          "The support role may assemble and track a warranty claim; it may not diagnose failure, select or substitute parts, certify coverage, alter technician findings, authorize returns, or post a vendor credit.",
          "Technical conclusions stay with qualified HVAC personnel, coverage stays with the manufacturer or authorized claim owner, and financial posting stays with authorized accounting staff."
        ],
        "startingScenarios": [
          "Start with open warranty claims that already have an authorized diagnosis and part reference, using one manufacturer's current packet checklist.",
          "Another controlled start is tracking acknowledged parts orders and return deadlines after the technical and purchasing decisions have already been made."
        ],
        "faqs": [
          { "q": "Can warranty administration decide whether a failed part is covered?", "a": "No. The assistant assembles claim evidence and records the vendor response, while the manufacturer and authorized claim owner determine warranty coverage." },
          { "q": "What happens when the model or serial label cannot be read?", "a": "The claim packet is paused and the missing evidence is routed to the claim owner; the assistant does not infer model or serial characters from a similar parts record." },
          { "q": "Can the assistant choose a substitute part offered by a vendor?", "a": "No. Any substitute-part proposal is attached to the parts request and sent to qualified authorized staff for compatibility, technical, safety, purchasing, and customer decisions." }
        ]
      }
    },
    {
      "slug": "hvac-bookkeeping-support",
      "name": "HVAC bookkeeping support",
      "short": "Prepare operational records for review by your financial team.",
      "heroImage": "/editorial/hvac-bookkeeping-support-workflow-boundary-review-6.svg",
      "heroAlt": "HVAC bookkeeping support workflow showing transaction preparation and financial review boundaries",
      "tasks": ["Organize receipts", "Prepare invoice records", "Maintain vendor files", "Flag reconciliation questions"],
      "manual": {
        "roleFit": [
          "This lane fits an HVAC business with documented bookkeeping procedures and an authorized bookkeeper, controller, or accountant who reviews classifications and financial exceptions.",
          "It supports recurring transaction preparation when job invoices, supplier receipts, payment records, and vendor documents arrive through several operational systems."
        ],
        "problem": [
          "Bookkeeping review slows when a supplier receipt lacks a job reference, an invoice status differs from the payment feed, or a transaction is coded without support.",
          "HVAC bookkeeping support organizes source documents and reconciliation questions without making accounting, tax, payment, or financial-policy decisions."
        ],
        "inputsAccess": [
          "Provide least-privilege access to approved invoice, receipt, payment, vendor, job-cost, and bank-feed records plus the current chart-of-accounts guidance from the financial owner.",
          "Each transaction should retain its source document, date, amount, counterparty, job or business-purpose reference, payment status, and reviewer when financial judgment is required."
        ],
        "workflowSteps": [
          "Collect invoice and receipt records from approved sources and check that each transaction has a legible document and reference.",
          "Match customer payments and supplier charges to existing records without creating an unsupported match or classification.",
          "Prepare the transaction using documented bookkeeping rules and attach the source evidence for reviewer inspection.",
          "Place duplicates, variances, credits, refunds, tax questions, new vendors, and unclear job allocations in the financial review queue.",
          "Record the approved outcome and preserve a reconciliation trail without deleting the original discrepancy."
        ],
        "deliverables": [
          "A review-ready transaction batch with linked invoice or receipt evidence, documented preliminary classification, job reference, and reviewer flags.",
          "A reconciliation exception schedule listing unmatched payments, duplicate-looking charges, amount or date variances, vendor gaps, and the financial owner needed."
        ],
        "qualityControls": [
          "Check transaction amount, date, counterparty, document identifier, and job reference against the source before placing it in the bookkeeping review batch.",
          "Use duplicate checks and preserve an audit trail for every reconciliation change; reviewer approval must remain visible for classification or correction decisions."
        ],
        "exceptionPaths": [
          "Pause a transaction when support is missing, amounts conflict, a bank item is unfamiliar, vendor details changed, a customer payment is split, or the job reference is uncertain.",
          "Escalate suspected fraud, payroll items, tax treatment, chargebacks, refunds, write-offs, account changes, cash movements, and material reconciliation differences to the authorized financial owner."
        ],
        "decisionBoundaries": [
          "The support role may organize documents and prepare bookkeeping records; it may not authorize payment, move funds, approve vendors, decide tax treatment, sign filings, issue refunds, or make final account classifications.",
          "Financial approval, accounting policy, payroll, tax, banking access, journal-entry approval, and final reconciliation remain with qualified authorized personnel."
        ],
        "startingScenarios": [
          "Start with one week of supplier receipts that already have purchase and job references, then let the financial reviewer resolve every unclear transaction before expanding.",
          "A second controlled start is matching posted customer payments to approved invoices while all partial, duplicate, refunded, or disputed amounts remain in the reconciliation queue."
        ],
        "faqs": [
          { "q": "Can HVAC bookkeeping support choose the final ledger account?", "a": "Only a classification explicitly covered by approved bookkeeping rules may be prepared; uncertain or new transaction types go to the authorized financial reviewer for the final ledger decision." },
          { "q": "Does the bookkeeping assistant have authority to pay a vendor?", "a": "No. The assistant can organize the invoice and supporting transaction record, but vendor approval, payment authorization, bank access, and release of funds stay with authorized personnel." },
          { "q": "How are unmatched customer payments handled?", "a": "The payment remains in the reconciliation exception schedule with its source, amount, date, and possible invoice context until the financial owner approves the match or other treatment." }
        ]
      }
    }
  ],
  "categories": ["Dispatch systems", "Customer care", "Maintenance plans", "Role design"],
  "principles": ["Role-matched selection", "Clear role boundaries", "Reviewable workflows"],
  "sources": [{ "label": "United States Environmental Protection Agency", "url": "https://www.epa.gov/section608" }]
};
