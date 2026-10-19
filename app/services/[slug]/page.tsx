import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { serviceBySlug } from '@/lib/content';

export function generateStaticParams() { return site.services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = serviceBySlug(slug);
  return service ? { title: service.name, description: service.short, alternates: { canonical: `/services/${service.slug}` } } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = serviceBySlug(slug); if (!service) notFound();
  const related = site.services.filter((item) => item.slug !== service.slug).slice(0, 3);
  return <div>
    <header className="service-detail-hero"><div><p className="kicker">HVAC office support lane</p><h1>{service.name}</h1><p>{service.short} Build the lane around approved source material, visible completion evidence, and a named reviewer.</p><Link id={`cta-services-${service.slug}-bookcall`} className="button primary" href="/contact-us">Discuss this role</Link></div><div className="service-schematic" role="img" aria-label={`${service.name} workflow from intake to owner review`}><span>REQUEST</span><i /><span>PREPARE</span><i /><span>CHECK</span><i /><span>OWNER REVIEW</span><strong>{service.name}</strong></div></header>
    <div className="service-manual">
      <aside><Image src="/hero.png" alt="HVAC workshop tools and planning materials" width={520} height={420} /><strong>Operating principle</strong><p>Preparation can be delegated. Accountable judgment cannot.</p></aside>
      <article className="prose">
        <section><h2>Who this role is for</h2>{service.manual.roleFit.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
        <section><h2>The problem it addresses</h2>{service.manual.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
        <section><h2>Scope of work</h2><ul>{service.tasks.map((task) => <li key={task}>{task}</li>)}</ul><p>The exact scope is documented before launch. Work outside that scope is returned or escalated, not guessed.</p></section>
        <section><h2>Inputs and access</h2><ul>{service.manual.inputsAccess.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>Workflow and deliverables</h2><ol>{service.manual.workflowSteps.map((step) => <li key={step}>{step}</li>)}</ol><h3>Deliverables</h3><ul>{service.manual.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>Quality controls</h2><ul>{service.manual.qualityControls.map((control) => <li key={control}>{control}</li>)}</ul></section>
        <section><h2>Decision boundaries</h2><h3>Exception paths</h3><ul>{service.manual.exceptionPaths.map((path) => <li key={path}>{path}</li>)}</ul><h3>Reserved decisions</h3>{service.manual.decisionBoundaries.map((boundary) => <p key={boundary}>{boundary}</p>)}</section>
        <section><h2>Common starting scenarios</h2><ul>{service.manual.startingScenarios.map((scenario) => <li key={scenario}>{scenario}</li>)}</ul></section>
        <section><h2>Frequently asked questions</h2>{service.manual.faqs.map((faq) => <div key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</section>
        <section><h2>Related services</h2><div className="related-services">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`}><strong>{item.name}</strong><span>{item.short}</span></Link>)}</div></section>
        <section className="manual-cta"><h2>Start with a controlled handoff</h2><p>Bring one recurring queue and the person who owns its decisions. We will help shape the support lane around your operating reality.</p><Link id={`cta-services-${service.slug}-consultation`} className="button primary" href="/contact-us">Plan a free consultation</Link></section>
      </article>
    </div>
  </div>;
}
