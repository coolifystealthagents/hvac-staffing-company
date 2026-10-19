import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy policy', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return <div>
    <header className="page-hero"><p className="eyebrow">Privacy</p><h1>Privacy policy</h1><p>Last updated October 19, 2026</p></header>
    <section className="content-wrap"><div className="prose">
      <h2>Information we collect</h2>
      <p>We collect the information you submit through our contact form, including your name, business email address, phone number, company name, company website, company size, number of positions to fill, referral source, and the staffing context in your message. We also collect the page URL and user agent associated with the request, along with basic site usage and performance events.</p>
      <h2>How we use information</h2>
      <p>We use submitted information to respond to your request, coordinate a consultation, understand your staffing needs, improve the site, and protect the service from abuse.</p>
      <h2>How form submissions are processed</h2>
      <p>We send contact form submissions to ACR for lead processing. If that primary submission cannot be accepted, we may send the submitted information, page URL, and user agent to an emergency Mattermost channel so the request is not lost.</p>
      <h2>Contact</h2>
      <p>Questions can be sent to hello@{site.domain}.</p>
    </div></section>
  </div>;
}
