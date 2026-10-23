'use client';

import Link from 'next/link';
import TocSync from './TocSync';
import { useEffect, useMemo, useState } from 'react';

type Section = { heading: string; paragraphs: string[] };
type Related = { href: string; label: string };
type Source = { label: string; url: string };

type Props = {
  title: string;
  summary: string;
  category: string;
  kind: 'blog' | 'research';
  publishedAt: string;
  readTime?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  sections: Section[];
  related: Related[];
  sources?: Source[];
  children?: React.ReactNode;
};

const slugify = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function ArticleFrame({ title, summary, category, kind, publishedAt, readTime, thumbnail, thumbnailAlt, sections, related, sources = [], children }: Props) {
  const items = useMemo(() => sections.map((section) => ({ ...section, id: slugify(section.heading) })), [sections]);
  const [active, setActive] = useState(items[0]?.id ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: '-112px 0px -62% 0px', threshold: [0, 1] });
    items.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, [items]);
  const formatted = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${publishedAt}T00:00:00Z`));
  const toc = <nav className="article-toc" aria-label="Table of contents"><strong>Table of contents</strong>{items.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>{item.heading}</a>)}</nav>;

  return <div className="article-page">
    <TocSync />
    <header className="article-opening">
      <div><p className="kicker">{category}</p><h1>{title}</h1><p className="article-dek">{summary}</p><div className="article-meta"><span>HVAC Staffing Company Editorial Team</span><span>Published <time dateTime={publishedAt}>{formatted}</time></span>{readTime && <span>{readTime}</span>}</div></div>
      {thumbnail ? <img className="article-hero-image" src={thumbnail} alt={thumbnailAlt ?? `Topic illustration for ${title}`} /> : <div className="topic-hero" role="img" aria-label={`Technical workflow illustration for ${title}`}><span>INPUT</span><i /><span>REVIEW</span><i /><span>HANDOFF</span><strong>{title}</strong></div>}
    </header>
    <details className="article-mobile-toc"><summary>Table of contents</summary>{toc}</details>
    <div className="article-shell">
      <article className="article-body">
        {items.map((section) => <section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, index) => <p key={`${section.id}-${index}`}>{paragraph}</p>)}</section>)}
        {children}
        <section className="article-final-cta"><h2>Map the next controlled handoff</h2><p>Bring one recurring workflow, its source records, and the person who owns exceptions.</p><Link id={kind === 'blog' ? 'cta-blog-final-bookcall' : 'cta-research-final-bookcall'} className="button primary" href="/contact-us">Plan a free consultation</Link></section>
      </article>
      <aside className="article-sidebar" aria-label="Article tools">
        {toc}
        <section><h2>Article details</h2><p>Published by the HVAC Staffing Company editorial team for owners and service managers.</p></section>
        {sources.length > 0 && <section><h2>Sources</h2>{sources.map((source) => <a key={source.url} href={source.url} rel="noopener noreferrer">{source.label}</a>)}</section>}
        <section><h2>Related reading</h2>{related.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</section>
        <Link id={kind === 'blog' ? 'cta-blog-sidebar-schedulecall' : undefined} className="button primary" href="/contact-us">Map your workflow</Link>
      </aside>
    </div>
  </div>;
}
