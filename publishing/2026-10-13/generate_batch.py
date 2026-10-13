import hashlib, html, json, pathlib, re, textwrap

ROOT=pathlib.Path(__file__).resolve().parents[2]
DATE='2026-10-13'
BASE='64f92d688b84f0d587535dd1eeb6ba4390c7f5b6'

BLOGS=[
 ('generator-interlock-service-precondition-record','Confirm Generator Interlock Service Preconditions','Safety handoffs','record equipment identity, energy-source status, site authority, technician assignment, access limits, stop conditions, and verified arrival without directing electrical work'),
 ('heat-pump-defrost-complaint-evidence-packet','Prepare a Heat Pump Defrost Complaint Evidence Packet','Customer care','preserve the customer statement, outdoor conditions, display state, timing, equipment identity, media, recent work, and technical-review owner without diagnosing remotely'),
 ('commercial-filter-change-service-proof','Reconcile Commercial Filter Change Service Proof','Maintenance plans','match asset, filter specification, visit date, technician evidence, quantity, exception, customer acknowledgement, and next due state'),
 ('smart-thermostat-remote-access-revocation','Audit Smart Thermostat Remote Access Revocation','Access control','trace user identity, approved authority, connected property, vendor account, revocation request, completion evidence, residual access, and accountable owner'),
 ('condensate-drain-overflow-callback-record','Build a Condensate Drain Overflow Callback Record','Dispatch systems','capture the original report, property risk, equipment location, prior visit, observed water, customer-safe instructions, dispatch owner, and follow-up evidence'),
 ('economizer-inspection-evidence-before-quote','Verify Economizer Inspection Evidence Before Quote','Estimate support','organize asset identity, inspection scope, sensor observations, control sequence evidence, field notes, excluded tests, reviewer, and quote assumptions'),
 ('coil-cleaning-occupant-protection-handoff','Coordinate a Coil Cleaning Occupant Protection Handoff','Safety handoffs','record site approval, occupancy window, product documentation, access boundary, shutdown owner, ventilation plan, technician confirmation, and reopening decision'),
 ('compressor-warranty-supplement-request-tracker','Track Compressor Warranty Claim Supplement Requests','Parts and warranty','connect claim identifier, equipment evidence, requested supplement, supplier message, custodian, due date, submission proof, and acceptance state'),
 ('recovery-machine-calibration-record-reconciliation','Reconcile Recovery Machine Calibration Records','Compliance records','compare equipment identifier, procedure reference, calibration or verification record, service date, custodian, exception, corrective owner, and release state'),
 ('emergency-cooling-rental-site-readiness','Prepare an Emergency Cooling Rental Site Readiness Packet','Dispatch systems','collect site contact, load request, access route, placement constraints, power information, condensate plan, delivery window, safety owner, and unresolved decisions'),
 ('duct-leakage-test-documentation-gaps','Close Duct Leakage Test Documentation Gaps','Quality records','inventory project identity, test method reference, instrument record, test conditions, result artifact, signatures, exceptions, and qualified review'),
 ('technician-certification-expiration-alerts','Validate Technician Certification Expiration Alerts','Workforce records','align worker identity, credential type, issuer record, expiration, role requirement, reminder history, restriction state, and authorized workforce decision'),
]

RESEARCH=[
 ('dispatch-priority-reviewer-agreement-study','Dispatch Priority Reviewer Agreement Study','whether two trained reviewers assign the same documented priority under a frozen, non-diagnostic dispatch matrix','case key, intake version, symptom label, safety flag, entitlement state, reviewer labels, disagreement reason, adjudication, and final owner'),
 ('preventive-maintenance-completion-denominator-study','Preventive Maintenance Completion Denominator Study','how alternative eligible-asset and eligible-visit denominators change reported preventive-maintenance completion','agreement key, asset roster version, visit requirement, exclusion, scheduled event, completion proof, deferral, cancellation, and reporting period'),
 ('callback-attribution-window-sensitivity-study','Callback Attribution Window Sensitivity Study','how declared attribution windows change the share of return visits linked to an earlier service event','pseudonymous job key, asset key, first visit, symptom class, return contact, return visit, elapsed time, reviewer classification, and disposition'),
 ('parts-eta-update-reliability-study','Parts ETA Update Reliability Study','how often customer-facing parts updates remain consistent with the latest supplier evidence and uncertainty state','order key, supplier message version, estimated date, confidence state, customer update, channel, receipt evidence, exception, and resolution'),
 ('technician-certification-alert-lead-time-study','Technician Certification Alert Lead-Time Study','whether credential alerts provide enough observable lead time for an authorized workforce owner to act before expiration','pseudonymous worker key, credential class, issuer evidence, expiration, alert rule, delivery event, acknowledgement, restriction, and owner action'),
]

SOURCES=[
 {'label':'EPA Section 608 Refrigerant Management','url':'https://www.epa.gov/section608'},
 {'label':'EPA Indoor Air Quality','url':'https://www.epa.gov/indoor-air-quality-iaq'},
 {'label':'U.S. Department of Energy Heat Pump Systems','url':'https://www.energy.gov/energysaver/heat-pump-systems'},
 {'label':'OSHA Heat Exposure','url':'https://www.osha.gov/heat-exposure'},
 {'label':'OSHA Electrical Safety','url':'https://www.osha.gov/electrical'},
 {'label':'CDC NIOSH Ventilation','url':'https://www.cdc.gov/niosh/ventilation/about/index.html'},
 {'label':'ASHRAE Standards and Guidelines','url':'https://www.ashrae.org/technical-resources/standards-and-guidelines'},
 {'label':'NFPA Codes and Standards','url':'https://www.nfpa.org/codes-and-standards'},
 {'label':'CISA Secure by Design','url':'https://www.cisa.gov/securebydesign'},
 {'label':'NIST Privacy Framework','url':'https://www.nist.gov/privacy-framework'},
]

STAGES=['define the operational question','freeze governing source versions','separate reported and verified facts','construct the preparation record','route incomplete or conflicting evidence','minimize customer and worker information','exercise ordinary and exception cases','reconcile dependent systems','prepare the accountable-owner handoff','verify communication and receipt','apply stop and rollback rules','retain a reviewable closure packet']

def wc(value): return len(re.findall(r"\b[\w'-]+\b",value))

def blog_item(slug,title,category,objective,index):
 sections=[]
 for n,stage in enumerate(STAGES,1):
  control=f'HSC-1013-{index+1:02d}-{n:02d}'
  sections.append({'heading':stage.capitalize(),'paragraphs':[
   f'{title} checkpoint {n} applies {stage} to {category.lower()}. The bounded objective is to {objective}. Start with the exact customer, site, work-order, asset, source-system version, timestamp, preparation owner, technical owner, expected outcome, exception state, and durable evidence link. Control {control} distinguishes a customer report, a coordinator observation, a technician finding, a calculated field, and an authorized decision. That separation prevents a polished office record from implying diagnosis, code compliance, environmental compliance, safety, warranty coverage, pricing, or completion that a qualified owner has not established.',
   f'For {title}, test checkpoint {n} with one ordinary synthetic or specifically authorized work order, one missing-evidence case, one conflicting-source case, and one late-arriving update. Preserve the first observation before changing a status. Append later evidence with provenance and effective time instead of overwriting history. Compare the field-service platform, approved document repository, customer communication log, inventory or supplier record, and dispatch board only to the extent needed for {category.lower()}. A mismatch remains an exception until the accountable HVAC company owner resolves it under current procedure.',
   f'Close {title} checkpoint {n} only when the evidence link, current state, next owner, due or review time, customer-safe wording, and stop rule agree. Record why an alternative state was rejected and what event would reopen the item. Remote support may organize, compare, send approved requests, and route the packet; licensed trade work, electrical and refrigerant decisions, diagnosis, safety determinations, code interpretation, warranty, pricing, payroll, and release authority remain with qualified owners. If authority or the controlling procedure is unclear, pause and escalate rather than infer a result.'
  ]})
 return {'slug':slug,'title':title,'description':f'A controlled HVAC office workflow for {category.lower()} that preserves evidence, exceptions, and qualified decision ownership.','category':category,'publishedAt':DATE,'readTime':'18 min read','thumbnail':f'/october-13-2026/{slug}.svg','sections':sections,'faq':[
  {'q':f'What can remote support prepare for {category.lower()}?','a':'Remote support can organize approved source records, compare versions, maintain the exception state, and route evidence. It cannot diagnose equipment, direct regulated work, or replace the qualified company owner.'},
  {'q':'What should stop the workflow?','a':'Stop when identity, authority, safety, procedure version, source evidence, access scope, or the accountable owner is unclear. Preserve the observed state and use the approved escalation route.'},
  {'q':'What proves completion?','a':'Completion requires durable evidence, a reviewable status history, the accountable owner’s disposition, approved communication evidence, and an explicit retention or reopening rule.'}
 ],'internalService':'/services/dispatch-support','internalSibling':f'/blog/{BLOGS[(index+1)%len(BLOGS)][0]}','source':SOURCES[index%len(SOURCES)]}

def research_item(slug,title,question,evidence,index):
 sections=[]
 for n,stage in enumerate(STAGES+['replicate the result on a frozen follow-up cohort'],1):
  control=f'HSR-1013-{index+1:02d}-{n:02d}'
  paragraphs=[
   f'{title} stage {n} uses {stage} to examine {question}. Pre-register the eligible population, unit of analysis, observation window, frozen procedure date, primary outcome, exclusions, subgroup plan, and intended operational decision before inspecting results. Retain {evidence}. Protocol {control} preserves source facts separately from derived fields, reviewer classifications, adjudication, and owner actions, so a corrected final record does not erase its history or turn administrative evidence into an unsupported technical, safety, employment, or compliance conclusion.',
   f'For {title}, draw the stage {n} sample from a versioned eligible-record roster and report selected, available, unavailable, excluded, transferred, reopened, unresolved, and late records separately. Two authorized reviewers independently label a planned reliability subset using the same codebook; calculate raw agreement and category-specific disagreement before adjudication. Freeze transformations in a reproducible query or worksheet, preserve nulls, and show how the result changes under declared denominator, timing, and inclusion alternatives. Do not describe association, reviewer agreement, or queue timing as causation or a universal HVAC benchmark.',
   f'Protocol {control} minimizes customer and worker information through pseudonymous study identifiers, least-privilege access, approved source references, field-level extraction, and a named retention owner. Suppress small or identifying cells and keep credentials, access codes, unrestricted customer histories, and sensitive workforce documents outside the analysis. Any response must identify the qualified company decision owner, permitted preparation task, effective date, monitoring window, stop threshold, rollback, and follow-up review. Trade, safety, legal, environmental, payroll, workforce, warranty, pricing, diagnosis, and release authority remain outside the research-preparation role.'
  ]
  if n==11: paragraphs[2]=f'Limitations. {title} stage {n} may be affected by missing events, changed procedures, inconsistent clocks, selective documentation, seasonality, reviewer learning, inaccessible records, small subgroups, and differences between service systems. The study cannot establish causation, technical correctness, legal compliance, worker performance, customer entitlement, or a universal industry rate. Protocol {control} requires reporting these boundaries beside the result, retaining unresolved classifications, and seeking qualified review before any operational change. Replication on a later frozen cohort is necessary before expanding the interpretation.'
  sections.append({'heading':stage.capitalize(),'paragraphs':paragraphs})
 return {'slug':slug,'title':title,'summary':f'A reproducible HVAC operations protocol examining {question}, with explicit denominators, reviewer reliability, privacy limits, and decision boundaries.','cluster':'HVAC operations research','publishedAt':DATE,'finding':f'{title} supports only a bounded operational observation when source versions, exclusions, missingness, reviewer disagreement, sensitivity checks, and limitations remain visible.','thumbnail':f'/october-13-2026/{slug}.svg','sections':sections,'sources':SOURCES}

def svg(title,slug,kind,index):
 lines=textwrap.wrap(title,width=27,break_long_words=False,break_on_hyphens=False)
 if len(lines)>4: lines=lines[:3]+[' '.join(lines[3:])]
 titles=''.join(f'<text x="82" y="{225+i*60}" class="title">{html.escape(line)}</text>' for i,line in enumerate(lines))
 accent=['#f0c15f','#ef8354','#69c3c7','#a8d08d'][index%4]
 return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc"><title id="title">{html.escape(title)}</title><desc id="desc">HVAC Staffing Company {kind.lower()} artwork with the exact article title.</desc><rect width="1200" height="630" fill="#172d33"/><path d="M760 0h440v630H650c130-122 101-286 110-630Z" fill="#244850"/><g fill="none" stroke="{accent}" stroke-width="9" opacity=".9"><circle cx="1010" cy="306" r="104"/><path d="M1010 166v280M870 306h280M912 208l196 196M1108 208L912 404"/></g><rect x="62" y="54" width="620" height="58" rx="6" fill="#2f6973"/><text x="84" y="91" class="brand">HVAC STAFFING COMPANY / {kind.upper()}</text>{titles}<line x1="82" y1="522" x2="1120" y2="522" stroke="{accent}" stroke-width="5"/><text x="82" y="570" class="footer">TRACEABLE · QUALIFIED · READY FOR HANDOFF</text><style>.brand{{fill:#fff;font:700 21px Arial,sans-serif;letter-spacing:1.6px}}.title{{fill:#f8fafc;font:700 44px Georgia,serif}}.footer{{fill:#b9e2e6;font:700 21px Arial,sans-serif;letter-spacing:1.5px}}</style></svg>'''

blogs=[blog_item(*row,i) for i,row in enumerate(BLOGS)]
research=[research_item(*row,i) for i,row in enumerate(RESEARCH)]
def ts(name,typ,values): return f"import type {{ {typ} }} from './types';\nexport const {name}: readonly {typ}[] = "+json.dumps(values,indent=2,ensure_ascii=False)+";\n"
(ROOT/'lib/october-13-blog.ts').write_text(ts('october13BlogPosts','BlogPost',blogs))
(ROOT/'lib/october-13-research.ts').write_text(ts('october13ResearchPosts','ResearchPost',research))
thumbs=ROOT/'public/october-13-2026'; thumbs.mkdir(parents=True,exist_ok=True)
items=[]
for i,(kind,item) in enumerate([*[("blog",x) for x in blogs],*[("research",x) for x in research]]):
 path=thumbs/f"{item['slug']}.svg"; path.write_text(svg(item['title'],item['slug'],kind,i))
 body=' '.join(p for section in item['sections'] for p in section['paragraphs'])
 items.append({'kind':kind,'slug':item['slug'],'title':item['title'],'sourcePath':f"lib/october-13-{'blog' if kind=='blog' else 'research'}.ts",'thumbnailPath':str(path.relative_to(ROOT)),'publicationDate':DATE,'wordCount':wc(body),'sha256':hashlib.sha256(body.encode()).hexdigest()})
manifest={'site':'HVACStaffingCompany.com','canonicalDomain':'https://hvacstaffingcompany.com','repository':'coolifystealthagents/hvac-staffing-company','branch':'main','baseSha':BASE,'date':DATE,'counts':{'blog':12,'research':5,'total':17,'thumbnails':17},'items':items}
(ROOT/'publishing/2026-10-13/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'blog':len(blogs),'research':len(research),'minBlogWords':min(x['wordCount'] for x in items if x['kind']=='blog'),'minResearchWords':min(x['wordCount'] for x in items if x['kind']=='research')},indent=2))
