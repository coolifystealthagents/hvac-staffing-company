import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';
import { blogPosts } from '@/lib/content';
import { ArrowIcon, CheckIcon, SparkIcon } from './Icons';

const CTA = ({ id, children }: { id: string; children: React.ReactNode }) => <Link id={id} className="button primary" href="/contact-us">{children} <ArrowIcon /></Link>;

function ServiceCards() { return <div className="service-grid">{site.services.map((service) => <Link className="service-card reveal" href={`/services/${service.slug}`} key={service.slug}><h3>{service.name}</h3><p>{service.short}</p><span className="text-link">Explore the role <ArrowIcon /></span></Link>)}</div>; }
function Principles() { return <div className="principles">{site.principles.map((item) => <div key={item}><CheckIcon /><span>{item}</span></div>)}</div>; }
function Latest() { return <div className="article-grid">{blogPosts.slice(0, 3).map((post) => <Link href={`/blog/${post.slug}`} className="article-card" key={post.slug}><span className="pill">{post.category}</span><h3>{post.title}</h3><p>{post.description}</p><span className="text-link">Read the guide <ArrowIcon /></span></Link>)}</div>; }

const handoffChecks = [
  ['Known source', 'The system, record, template, or instruction that governs the work is named.'],
  ['Reviewable output', 'A manager can inspect required fields, notes, evidence, and next ownership.'],
  ['Explicit stop rule', 'Technical questions, safety concerns, and policy exceptions return to an authorized owner.'],
] as const;

export function HomePage() {
  const design = site.design;
  return <div className={`home design-${design}`}>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">{site.eyebrow}</p><h1>{site.hero} <em>{site.heroAccent}</em></h1><p className="hero-body">{site.heroBody}</p><p className="hero-offer">Start with one recurring office queue. We help define the role, match managed remote support to the work, and establish the review points your contractor keeps.</p><div className="hero-actions"><CTA id="cta-home-hero-bookcall">Map your first workflow</CTA><Link className="quiet-link" href="/services">Compare all six roles</Link></div><Principles /></div>
      <div className="hero-visual"><Image src={site.heroImage} alt={site.heroAlt} fill priority sizes="(max-width: 900px) 100vw, 54vw" /><div className="hero-label"><SparkIcon /><span>{site.manifesto}</span></div></div>
    </section>
    {design === 'signal' && <section className="signal-strip" aria-label="Inside sales workflow"><span>Prospecting support</span><span>CRM hygiene</span><span>Follow through</span><span>Pipeline visibility</span></section>}
    {design === 'conversation' && <section className="conversation-band"><div className="bubble one">Clear replies</div><div className="bubble two">Useful context</div><div className="bubble three">Thoughtful escalation</div></section>}
    <section className="section intro"><p className="eyebrow">Specialist support, shaped around your work</p><div><h2>Build office capacity around the queue, not a vague job title.</h2><p>{site.manifesto} Your assistant works from documented priorities, clear decision rights, and a practical review rhythm.</p><p>Use remote support for repeatable preparation, coordination, record upkeep, and approved communication. Keep diagnosis, field direction, pricing, safety, payments, and customer commitments with qualified people inside your business.</p></div></section>
    <section className="section services"><div className="section-heading"><p className="eyebrow">Roles that fit the work</p><h2>Choose the support your team can actually use.</h2></div><ServiceCards /></section>
    <section className="section method"><div className="workflow-diagram" aria-hidden="true"><span>Source</span><i /><span>Prepare</span><i /><span>Review</span></div><div><p className="eyebrow">A useful working model</p><h2>Define. Delegate. Improve.</h2><p>Start with the recurring work that already has an owner, a standard, and a clear escalation path. Then create a small review loop that makes the handoff stronger over time.</p><ol><li><strong>Define the boundary.</strong> Separate preparation and coordination from licensed or executive judgment.</li><li><strong>Document the handoff.</strong> Set inputs, output format, review points, and exception rules.</li><li><strong>Improve with evidence.</strong> Review a focused sample and update the process when patterns emerge.</li></ol><CTA id="cta-home-method-consultation">Plan a free consultation</CTA></div></section>
    <section className="section handoff-readiness"><div><p className="eyebrow">Decision support</p><h2>Is this workflow ready to delegate?</h2><p>Use these checks before adding headcount. If one is missing, document it with the person who currently owns the decision.</p></div><div className="readiness-grid">{handoffChecks.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div><Link className="text-link" href="/services">See how each service lane handles inputs, outputs, QA, and exceptions <ArrowIcon /></Link></section>
    <section className="boundary-band home-boundary"><h2>Remote support prepares the work. Your team keeps accountable judgment.</h2><p>Licensed work, diagnosis, safety instructions, schedule overrides, pricing, payment authorization, policy exceptions, and final customer commitments remain with authorized HVAC personnel.</p></section>
    <section className="section journal"><div className="section-heading"><p className="eyebrow">Field notes</p><h2>Practical guidance for better delegation.</h2></div><Latest /></section>
    <section className="closing"><p className="eyebrow">Make room for the work only you can do</p><h2>Let us map your first specialist support role.</h2><p>A focused conversation can turn scattered tasks into a clear, reviewable role brief.</p><CTA id="cta-home-closing-schedulecall">Schedule a free call</CTA></section>
  </div>;
}
