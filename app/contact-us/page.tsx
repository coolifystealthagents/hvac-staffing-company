import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LeadForm } from '@/components/LeadForm';
import { site } from '@/lib/site';
import provenance from '../review-provenance.json';

export const metadata: Metadata = {
  title: 'Contact Us | HVAC Staffing Consultation',
  description: 'Map a controlled HVAC office support role with clear inputs, outputs, review points, and decision boundaries.',
  alternates: { canonical: '/contact-us' },
};

const faqs = [
  ['What can remote HVAC office staff support?', 'Remote staff can maintain approved dispatch records, coordinate customer windows, prepare maintenance plan queues, follow up on approved estimates, and organize warranty or vendor documents.'],
  ['Can remote staff diagnose systems or direct technicians?', 'No. Diagnosis, repair decisions, refrigerant handling, safety instructions, code interpretation, and field supervision stay with qualified HVAC professionals.'],
  ['Can we begin with one workflow?', 'Yes. A narrow first workflow makes access, ownership, standards, and escalation easier to test before the role expands.'],
];

export default function ContactPage() {
  return <div className="contact-page">
    <section className="contact-first-fold">
      <div className="contact-intro">
        <p className="kicker">HVAC office staffing consultation</p>
        <h1>Build the office system your field team can rely on.</h1>
        <p>Bring the recurring queue that consumes owner or manager attention. We will map a focused remote role while technical, safety, and approval authority stays with your HVAC team.</p>
        <div className="scope-labels"><span>Clear role boundaries</span><span>Business email required</span><span>No scheduler on this page</span></div>
        <div className="reviews-heading"><strong>StealthAgents reviews</strong><span>Approved first-party client feedback · Source-displayed rating: 5 out of 5</span></div>
        <div className="review-window" aria-label="StealthAgents reviews">
          <div className="review-rail">
            <div className="review-sequence">
              {provenance.records.map((review) => <article className="review-card" key={review.name} tabIndex={0}>
                <h2>{review.headline}</h2><p>“{review.body}”</p><footer><strong>{review.name}</strong><span>{review.detail}</span></footer>
              </article>)}
            </div>
            <div className="review-sequence" aria-hidden="true">
              {provenance.records.map((review) => <article className="review-card" key={`duplicate-${review.name}`}>
                <h2>{review.headline}</h2><p>“{review.body}”</p><footer><strong>{review.name}</strong><span>{review.detail}</span></footer>
              </article>)}
            </div>
          </div>
        </div>
      </div>
      <div className="contact-form-card" aria-labelledby="consultation-title">
        <p className="kicker">Start with the workflow</p><h2 id="consultation-title">Request a free consultation</h2>
        <p>Share only business contact and staffing context. Do not include credentials or customer payment details.</p>
        <LeadForm source="contact-page-consultation" />
      </div>
    </section>

    <section className="parent-proof">
      <div className="team-photo"><Image src="/stealth-agents-team.webp" alt="Official StealthAgents team in Bacolod" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
      <div className="parent-copy"><p className="kicker">Managed operating support</p><h2>Delivered with StealthAgents.</h2><p>StealthAgents supports recruiting, matching, and managed staffing operations. HVAC Staffing Company keeps the role centered on HVAC office workflows, while your business retains technical, financial, safety, and customer approval authority.</p><div className="official-plate"><Image src="/stealth-agents-logo-black.png" alt="StealthAgents" width={184} height={46} /><strong>Official team, Bacolod</strong></div></div>
    </section>

    <section className="contact-detail section"><div><p className="kicker">Prepare a useful brief</p><h2>What to bring to the conversation</h2></div><div className="technical-list"><article><h3>The recurring queue</h3><p>Name where work enters, how often it arrives, and who owns it today.</p></article><article><h3>The completion evidence</h3><p>Show the fields, notes, documents, or status needed before a reviewer can accept the work.</p></article><article><h3>The decision boundary</h3><p>Identify what follows a written rule and what must pause for an authorized owner.</p></article></div></section>

    <section className="boundary-band"><h2>Remote support prepares and coordinates. Qualified people decide.</h2><p>Remote staff do not diagnose equipment, specify repairs, direct field work, handle refrigerants, interpret code, approve warranty coverage, authorize payments, or replace licensed personnel.</p></section>

    <section className="section faq"><h2>Questions before you contact us</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<Link className="text-link" href="/services">Review all HVAC support services</Link></section>
  </div>;
}
