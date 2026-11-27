'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/contact-us', label: 'Contact Us' },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('menu-open');
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', keydown);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', keydown);
      buttonRef.current?.focus();
    };
  }, [open]);

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header data-site-header="sticky" className="site-header">
      <Link className="brand" href="/" aria-label={`${site.name} home`}><Image src="/logo.svg" alt="" width={42} height={42} priority /><span>{site.name}<small className="standard-brand-credit">Powered by Stealth Agents</small></span></Link>

      <button ref={buttonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}><span aria-hidden="true">Menu</span><span className="sr-only">Toggle primary navigation</span></button>
      <nav ref={panelRef} id="primary-navigation" className={open ? 'is-open' : ''} aria-label="Primary navigation">
        {nav.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
      </nav>
      <Link id="cta-global-header-bookcall" className="button primary global-header-cta" href="/contact-us">Book a free consultation</Link>
    </header>
  </>;
}

export function Footer() {
  return <footer data-site-footer="true" className="site-footer">
    <div className="footer-container">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand inverse" href="/"><Image src="/logo.svg" alt="" width={48} height={48} /><span>{site.name}</span></Link>
          <p className="footer-powered">Powered by StealthAgents</p>
          <p className="footer-description">Remote office staffing systems for HVAC owners and service managers.</p>
          <Link className="button primary" href="/contact-us">Map your first workflow</Link>
        </div>
        <nav data-footer-menu="true" className="footer-group" aria-labelledby="footer-services-heading">
          <h2 id="footer-services-heading">Services</h2>
          <ul data-footer-menu="true">{site.services.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.name}</Link></li>)}</ul>
        </nav>
        <nav data-footer-menu="true" className="footer-group" aria-labelledby="footer-explore-heading">
          <h2 id="footer-explore-heading">Explore</h2>
          <ul data-footer-menu="true"><li><Link href="/">Home</Link></li><li><Link href="/about">About</Link></li><li><Link href="/blog">Blog</Link></li><li><Link href="/research">Research</Link></li><li><Link href="/contact-us">Contact Us</Link></li></ul>
        </nav>
      </div>
      <section className="footer-parent" aria-label="Parent company">
        <div className="footer-logo-plate"><Image src="/stealth-agents-logo-black.png" alt="StealthAgents logo" width={149} height={50} /></div>
        <div className="footer-parent-copy">
          <p className="footer-parent-label">Parent Company</p>
          <p>StealthAgents supports recruiting, matching, and managed staffing operations. HVAC Staffing Company keeps the role centered on HVAC office workflows, while your business retains technical, financial, safety, and customer approval authority.</p>
          <a className="footer-parent-link" href="https://stealthagents.com/" target="_blank" rel="noopener noreferrer">Powered by StealthAgents <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <div className="footer-bottom">
        <p className="copyright">© {new Date().getFullYear()} {site.name}</p>
        <div className="footer-bottom-links">
          <nav className="footer-legal" aria-label="Legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
          <Link className="footer-domain" href="/">hvacstaffingcompany.com</Link>
        </div>
      </div>
    </div>
  </footer>;
}
