import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), 'utf8');
const chrome = () => read('components/SiteChrome.tsx');
const contact = () => read('app/contact-us/page.tsx');
const css = () => read('app/globals.css');

const luminance = (hex) => {
  const channels = hex.match(/[\da-f]{2}/gi).map((channel) => {
    const value = Number.parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

test('primary navigation stays exact and the established global CTA sits outside it', () => {
  const source = chrome();
  const navBlock = source.match(/const nav = \[([\s\S]*?)\] as const;/)?.[1] ?? '';
  assert.deepEqual([...navBlock.matchAll(/label: '([^']+)'/g)].map((match) => match[1]), ['Home', 'Services', 'Contact Us']);
  const primaryNav = source.match(/<nav ref={panelRef}[\s\S]*?<\/nav>/)?.[0] ?? '';
  assert.doesNotMatch(primaryNav, /cta-global-header-bookcall/);
  assert.match(source, /<Link id="cta-global-header-bookcall"[^>]*href="\/contact-us"/);
  assert.ok(source.indexOf('cta-global-header-bookcall') > source.indexOf('</nav>'));
});

test('mobile menu closes accessibly and restores focus for every close path', () => {
  const source = chrome();
  assert.match(source, /document\.body\.classList\.add\('menu-open'\)/);
  assert.match(source, /document\.body\.classList\.remove\('menu-open'\)/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(source, /event\.key !== 'Tab'/);
  assert.match(source, /return \(\) => \{[\s\S]*buttonRef\.current\?\.focus\(\)/);
});

test('reviews use two accessible identical sequences and a seamless motion contract', () => {
  const source = contact();
  assert.equal((source.match(/provenance\.records\.map/g) || []).length, 2);
  assert.match(source, /className="review-sequence"/);
  assert.match(source, /className="review-sequence" aria-hidden="true"/);
  assert.match(source, /key={`duplicate-/);
  const styles = css();
  assert.match(styles, /animation:review-rail 55s linear infinite/);
  assert.match(styles, /translateX\(-50%\)/);
  assert.match(styles, /\.review-rail:hover,\.review-rail:focus-within\{animation-play-state:paused\}/);
  assert.match(styles, /prefers-reduced-motion:reduce[\s\S]*\.review-sequence\[aria-hidden="true"\]\{display:none\}/);
});

test('review stars meet 3 to 1 contrast against white', () => {
  const match = css().match(/\.stars\{color:(#[\da-f]{6})/i);
  assert.ok(match, 'stars need an explicit six-digit color');
  const ratio = 1.05 / (luminance(match[1]) + 0.05);
  assert.ok(ratio >= 3, `star contrast was ${ratio.toFixed(2)}:1`);
});

test('about, blog, and research indexes have prominent approved hero imagery', () => {
  const pages = [
    ['app/about/page.tsx', '/stealth-agents-bacolod-team-official.jpg'],
    ['app/blog/page.tsx', '/hvac-blog-editorial.jpg'],
    ['app/research/page.tsx', '/hvac-research-editorial.jpg'],
  ];
  for (const [file, asset] of pages) {
    const source = read(file);
    assert.match(source, /import Image from 'next\/image'/);
    assert.match(source, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(source, /className="page-hero-image"/);
    assert.match(source, /priority/);
  }
});

test('narrow header has a dedicated 390px-safe responsive contract', () => {
  const styles = css();
  assert.match(styles, /@media\(max-width:420px\)/);
  assert.match(styles, /@media\(max-width:420px\)[\s\S]*\.site-header\{[^}]*gap:\.5rem/);
  assert.match(styles, /@media\(max-width:420px\)[\s\S]*\.site-header \.brand span\{display:block;max-width:94px/);
  assert.match(styles, /@media\(max-width:420px\)[\s\S]*\.standard-brand-credit\{display:none!important\}/);
  assert.match(styles, /@media\(max-width:420px\)[\s\S]*\.global-header-cta\{[^}]*padding:/);
});

test('390px keeps the business name visible and parent attribution in the footer', () => {
  const styles = css();
  assert.match(styles, /@media\(max-width:420px\)[\s\S]*\.site-header \.brand span\{display:block;max-width:94px/);
  assert.match(chrome(), /Powered by StealthAgents/);
});

test('shared footer groups company and resource links and keeps legal links with copyright', () => {
  const source = chrome();
  const footer = source.match(/export function Footer\(\)[\s\S]*?<\/footer>/)?.[0] ?? '';
  assert.match(footer, /<h2 id="footer-company-heading">Company<\/h2>[\s\S]*?href="\/">Home<\/Link>[\s\S]*?href="\/about">About<\/Link>[\s\S]*?href="\/contact-us">Contact Us<\/Link>/);
  assert.match(footer, /<h2 id="footer-resources-heading">Resources<\/h2>[\s\S]*?href="\/services">Services<\/Link>[\s\S]*?href="\/blog">Blog<\/Link>[\s\S]*?href="\/research">Research<\/Link>/);
  assert.match(footer, /Map your first workflow<\/Link>/);
  assert.match(footer, /className="footer-bottom">[\s\S]*className="copyright"[\s\S]*href="\/privacy">Privacy<\/Link>[\s\S]*href="\/terms">Terms<\/Link>/);
  const styles = css();
  assert.match(styles, /\.footer-container\{[^}]*max-width:1240px[^}]*grid-template-columns:minmax\(0,\.8fr\) minmax\(0,1\.1fr\)/);
  assert.match(styles, /\.footer-navigation\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(styles, /\.footer-group h2\{[^}]*margin:0 0 \.3rem/);
  assert.match(styles, /\.site-footer \.footer-group a,\.site-footer \.footer-legal a\{[^}]*min-height:44px/);
  assert.match(styles, /@media\(max-width:600px\)\{\.site-footer\{padding:/);
  assert.match(styles, /@media\(max-width:600px\)[\s\S]*\.footer-container\{grid-template-columns:1fr/);
  assert.match(styles, /@media\(max-width:600px\)[\s\S]*\.footer-navigation\{grid-template-columns:1fr/);
  assert.match(styles, /@media\(max-width:600px\)[\s\S]*\.footer-bottom\{align-items:center;gap:/);
});

test('three-column article grids permit cards to shrink without viewport overflow', () => {
  const styles = css();
  assert.match(styles, /\.article-grid,\.content-grid\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(styles, /\.article-card,\.content-card\{[^}]*min-width:0/);
});
