import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `How ${site.name} approaches specialist remote support for HVAC office workflows.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <div>
    <header className="page-hero page-hero-with-image">
      <div className="page-hero-copy">
        <p className="eyebrow">About {site.name}</p>
        <h1>Better delegation starts with a better role.</h1>
        <p>We help {site.audience} shape focused remote support roles around real workflows, useful boundaries, and clear review points.</p>
      </div>
      <Image className="page-hero-image" src="/stealth-agents-team.webp" alt="Official StealthAgents team in Bacolod" width={1200} height={800} priority />
    </header>

    <section className="content-wrap">
      <div className="prose">
        <h2>Specialist context matters</h2>
        <p>Generic task lists often fail because they ignore the systems, language, and risks inside HVAC office work. Dispatch, maintenance plans, estimates, customer requests, warranty records, and bookkeeping queues each have different inputs and different decision owners.</p>
        <p>We begin with the operating workflow. The support role is then defined around repeatable preparation, coordination, documentation, and follow-through that can be checked by the people who remain accountable.</p>

        <h2>How the operating model works</h2>
        <p>A useful lane begins with a named queue, approved source records, a documented output, and a reviewer. The assistant works from those sources, records the next action, and returns exceptions instead of filling gaps with assumptions.</p>
        <p>Starting with one controlled workflow gives the HVAC team a practical way to test access, instructions, communication templates, turnaround expectations, and review evidence before expanding the role.</p>

        <h2>What belongs in the role brief</h2>
        <p>The brief should state which records are authoritative, what the assistant may update, which customer messages are approved, and who owns exceptions. It should also identify sensitive access, expected handoff timing, and the evidence that proves a task was completed correctly.</p>
        <p>Selection can then focus on the strengths the lane actually needs, such as careful record handling, written communication, queue discipline, or experience working with structured service operations.</p>

        <h2>How accountability stays visible</h2>
        <p>Every completed item should retain its source, current status, next action, and accountable reviewer. This makes the workflow inspectable without asking one person to reconstruct what happened from memory or scattered messages.</p>
        <p>Quality review belongs inside the operating rhythm. Early samples, exception logs, queue checks, and documented corrections help managers refine the role while keeping final approval where it belongs.</p>

        <h2>Where the role stops</h2>
        <p>Remote staff can prepare, coordinate, document, and follow through. They do not diagnose HVAC equipment, provide safety instructions, determine technical priority, alter approved pricing, interpret warranty coverage, move funds, or make licensed and executive decisions.</p>
        <p>Those boundaries protect customers and the operating team. Urgent reports, technical questions, policy exceptions, financial approvals, and commitments outside written rules are routed to qualified, authorized owners.</p>

        <h2>Built with StealthAgents</h2>
        <p>HVAC Staffing Company is powered by StealthAgents. The official StealthAgents team pictured above is based in Bacolod and supports the parent operating infrastructure behind this specialist site.</p>
        <p>The purpose of the consultation is to understand the workflow and its boundaries before discussing a role. Bring one recurring office queue, its current owner, and the points where work usually waits or loses context.</p>

        <Link id="cta-about-story-bookcall" className="button primary" href="/contact-us">Book a free consultation</Link>
      </div>
    </section>
  </div>;
}
