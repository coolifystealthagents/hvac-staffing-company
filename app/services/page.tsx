import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';
import { ArrowIcon } from '@/components/Icons';

export const metadata: Metadata = { title: 'HVAC Office Staffing Services', description: `Explore remote support roles shaped for ${site.audience}.`, alternates: { canonical: '/services' } };

export default function ServicesPage() {
  return <div>
    <header className="services-hero"><div><p className="kicker">HVAC office operations</p><h1>Six support lanes. One controlled service system.</h1><p>Build remote office capacity around documented queues, visible evidence, named reviewers, and explicit escalation. Your team keeps every technical and business decision.</p><Link className="button primary" href="/contact-us">Map your first workflow <ArrowIcon /></Link></div><div className="services-hero-image"><Image src="/hero.png" alt={site.heroAlt} fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div></header>
    <section className="service-system"><div className="system-title"><p className="kicker">Complete offering</p><h2>Choose the queue that needs a dependable owner.</h2><p>Each service is a starting scope. The final role is shaped around your systems, approved procedures, access controls, and review capacity.</p></div><div className="service-directory">{site.services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}><div><h3>{service.name}</h3><p>{service.short}</p></div><span>Scope, workflow, controls, and FAQs <ArrowIcon /></span></Link>)}</div></section>
    <section className="boundary-band"><h2>A staffing role is not a transfer of authority.</h2><p>Remote staff can prepare, update, organize, communicate from approved guidance, and surface exceptions. Licensed work, diagnosis, safety, pricing, customer commitments, payments, and policy decisions stay with your authorized team.</p></section>
    <section className="section decision-grid"><div><p className="kicker">Decision guidance</p><h2>What makes a workflow ready?</h2></div><div className="technical-list"><article><h3>A known source</h3><p>The assistant can identify the approved system, record, template, or instruction that governs the task.</p></article><article><h3>A testable output</h3><p>A reviewer can inspect required fields, timestamps, notes, attachments, and next ownership.</p></article><article><h3>A clear stop rule</h3><p>Incomplete evidence, safety concerns, technical questions, and policy exceptions pause for the right owner.</p></article></div></section>
    <section className="section service-faq"><h2>How an engagement starts</h2><details><summary>Do we need to delegate an entire department?</summary><p>No. A narrow, recurring queue is easier to document, review, and improve.</p></details><details><summary>Can support span more than one service?</summary><p>Yes, after the initial workflow is stable and the ownership boundaries remain clear.</p></details><details><summary>Who approves the completed work?</summary><p>Your business names the reviewer and retains authority for every technical, financial, safety, and customer decision.</p></details><Link className="button primary" href="/contact-us">Discuss your office workflow</Link></section>
  </div>;
}
