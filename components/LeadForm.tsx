'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const personalDomains = new Set(['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'proton.me', 'protonmail.com']);
type ErrorTarget = 'email' | 'form' | null;

export function LeadForm({ source = 'contact-page' }: { source?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [errorTarget, setErrorTarget] = useState<ErrorTarget>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const full = source === 'contact-page-consultation';

  useEffect(() => {
    if (!error) return;
    if (errorTarget === 'email') emailRef.current?.focus();
    else errorRef.current?.focus();
  }, [error, errorTarget]);

  function showError(message: string, target: ErrorTarget = 'form') {
    setError(message);
    setErrorTarget(target);
    setBusy(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    setErrorTarget(null);
    const data = new FormData(event.currentTarget);

    if (full) {
      const domain = String(data.get('email') || '').trim().toLowerCase().split('@')[1];
      if (!domain || personalDomains.has(domain)) {
        showError('Please use your business email address.', 'email');
        return;
      }
    }

    try {
      const response = await fetch('/api/submit-lead', { method: 'POST', body: data });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        const message = result.message || 'Please check your details and try again.';
        showError(message, /business email/i.test(message) ? 'email' : 'form');
        return;
      }
      if (result.ignored) {
        setBusy(false);
        return;
      }

      const payload = Object.fromEntries(data.entries());
      delete payload.website_url;
      window.acrTracker?.trackLead({ ...payload, source });
      router.push('/thank-you');
    } catch {
      showError('We could not send your request. Please try again.');
    }
  }

  const emailError = errorTarget === 'email';
  const emailDescription = full
    ? `business-email-help${emailError ? ' lead-form-error' : ''}`
    : emailError ? 'lead-form-error' : undefined;

  return <form className="lead-form" onSubmit={submit} aria-describedby={error && !emailError ? 'lead-form-error' : undefined}>
    {full ? <>
      <label>First Name <span aria-hidden="true">*</span><input name="first_name" autoComplete="given-name" required /></label>
      <label>Last Name <span aria-hidden="true">*</span><input name="last_name" autoComplete="family-name" required /></label>
      <label className="form-wide">Business Email <span aria-hidden="true">*</span><input ref={emailRef} name="email" type="email" autoComplete="email" required aria-invalid={emailError || undefined} aria-describedby={emailDescription} /></label>
      <p id="business-email-help" className="form-help form-wide">Use your HVAC company email. Personal email providers are not accepted.</p>
      <label>Country code<select name="phone_country" defaultValue="+1" aria-label="Phone country code"><option value="+1">US/CA +1</option><option value="+44">UK +44</option><option value="+61">AU +61</option><option value="+63">PH +63</option><option value="other">Other</option></select></label>
      <label>Phone Number<input name="phone" type="tel" autoComplete="tel-national" inputMode="tel" /></label>
      <label>Company Name <span aria-hidden="true">*</span><input name="company" autoComplete="organization" required /></label>
      <label>Website / URL<input name="company_website" type="url" autoComplete="url" placeholder="https://" /></label>
      <label>Company Size <span aria-hidden="true">*</span><select name="company_size" defaultValue="" required><option value="" disabled>Select company size</option><option>1 to 10</option><option>11 to 50</option><option>51 to 200</option><option>201 to 500</option><option>501+</option></select></label>
      <label>How Many Positions to Fill <span aria-hidden="true">*</span><select name="positions_to_fill" defaultValue="" required><option value="" disabled>Select positions</option><option>1</option><option>2 to 3</option><option>4 to 10</option><option>11+</option><option>Not sure yet</option></select></label>
      <label className="form-wide">How Did You Hear About Us? <span aria-hidden="true">*</span><select name="referral_source" defaultValue="" required><option value="" disabled>Select a source</option><option>Search engine</option><option>Referral</option><option>Trade association</option><option>Social media</option><option>Stealth Agents</option><option>Other</option></select></label>
      <label className="form-wide">Message<textarea name="message" rows={2} placeholder="Describe the HVAC office workflow, current owner, and support you need." /></label>
    </> : <>
      <label>Full name<input name="name" autoComplete="name" required /></label>
      <label>Work email<input ref={emailRef} name="email" type="email" autoComplete="email" required aria-invalid={emailError || undefined} aria-describedby={emailDescription} /></label>
      <label>How did you hear about us?<select name="referral_source" defaultValue=""><option value="">Choose one</option><option>Search</option><option>Industry colleague</option><option>Professional group</option><option>Social</option><option>Other</option></select></label>
      <label className="form-wide">Message<textarea name="message" rows={5} placeholder="Tell us what needs support" /></label>
    </>}
    <input type="hidden" name="source" value={source} />
    <label className="honeypot" aria-hidden="true">Website<input name="website_url" tabIndex={-1} autoComplete="off" /></label>
    {error && <p ref={errorRef} id="lead-form-error" className="form-error" role="alert" tabIndex={-1}>{error}</p>}
    <button className="button primary form-wide" type="submit" disabled={busy}>{busy ? 'Sending request' : full ? 'Book a Free Consultation' : 'Request your free consultation'}</button>
  </form>;
}
