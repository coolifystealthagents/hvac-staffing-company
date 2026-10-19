# V3 prompt clause ledger

## Design read

Reading this as: an HVAC office staffing operations system for owners and service managers, with a precise field-ready workshop character, leaning toward industrial utility and technical schematic design.

DESIGN_VARIANCE 8. MOTION_INTENSITY 3. VISUAL_DENSITY 7. Redesign mode: overhaul. Theme: light. Accent: safety orange. Shape: squared technical plates. Type: slab display and humanist sans body. Image direction: authentic HVAC workflow imagery and bespoke schematics. Motion is limited to the required review rail and state feedback.

## Implemented gates

| Contract clause | Implementation | Regression coverage |
| --- | --- | --- |
| Exact sticky Home, Services, Contact Us menu | `components/SiteChrome.tsx` | `tests/v3-contract.test.mjs` |
| Keyboard menu, Escape, focus containment, skip link | `components/SiteChrome.tsx` | Source contract and typecheck |
| Header and footer parent attribution | Visible `Powered by StealthAgents` in both global landmarks | Source contract |
| Uniform subsidiary logo | `/logo.svg` in metadata, header, and footer | Source contract |
| No promotional modal | Timed modal removed from chrome and layout | Source contract |
| Ten approved unique reviews | Copied provenance from approved repository and rendered once per record | Provenance uniqueness test |
| Contact conversion composition | Reviews and title left, complete owned form right | Source and render contract |
| No contact scheduler | Scheduler only remains on `/thank-you` | Source contract |
| Official parent proof | Approved team photograph, official logo, explanation, exact plate text | Asset and source contract |
| Six long-form service pages | Shared operating-manual template includes audience, problem, scope, inputs, workflow, deliverables, controls, boundaries, scenarios, FAQs, related services, CTA | Service contract |
| Complete editorial framing | Shared heading-derived TOC, active IntersectionObserver state, sticky populated desktop sidebar, mobile disclosure | Article contract |
| Canonicals and noindex | Dynamic article and service canonicals; confirmation routes noindex | Route contract |
| Security and redirects | CSP and security headers; Cloudflare visitor scheme aware apex HTTPS proxy | Security contract |
| Punctuation and decorative labels | Decorative zero-padded labels removed; rendered dash audit retained | Contract plus build audit |
| Design diversity | Repo-local registry records at least seven differing recent axes | Registry review |

## Preserved contracts

The lead form keeps approved field names and source value, posts to `/api/submit-lead`, tracks only an accepted response through `window.acrTracker.trackLead`, and then navigates to `/thank-you`. The tracker keeps site ID `hvac-staffing-company` and endpoint `/ingest/track`. OnceHub remains at `https://go.oncehub.com/StealthAgentsTeam` on `/thank-you`. Existing routes and CTA IDs remain.

## Verification boundaries

Automated source contracts, typecheck, production build, punctuation scan, dependency audit, and local HTTP route checks are release gates. Final browser review at 1366 by 768, 1440 by 800, and 390px, image crop and sharpness judgment, keyboard behavior in a real browser, OnceHub booking redirect configuration, and production-domain redirects or headers require external or visual verification. No lead or booking submission is authorized.
