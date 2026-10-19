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
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${site.name} home`}><Image src="/logo.svg" alt="" width={42} height={42} priority /><span>{site.name}</span></Link>
      <span className="powered">Powered by StealthAgents</span>
      <button ref={buttonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}><span aria-hidden="true">Menu</span><span className="sr-only">Toggle primary navigation</span></button>
      <nav ref={panelRef} id="primary-navigation" className={open ? 'is-open' : ''} aria-label="Primary navigation">
        {nav.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
      </nav>
      <Link id="cta-global-header-bookcall" className="button primary global-header-cta" href="/contact-us">Book a free consultation</Link>
    </header>
  </>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-brand"><Link className="brand inverse" href="/"><Image src="/logo.svg" alt="" width={48} height={48} /><span>{site.name}</span></Link><p>Remote office staffing systems for HVAC owners and service managers.</p><strong>Powered by StealthAgents</strong></div>
    <nav className="footer-links" aria-label="Footer navigation">{nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/about">About</Link><Link href="/blog">Blog</Link><Link href="/research">Research</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
    <p className="copyright">© {new Date().getFullYear()} {site.name}</p>
  </footer>;
}
