import Link from 'next/link';
export default function NotFound(){return <div className="not-found"><div><p className="eyebrow">Page not found</p><h1>That page is not here.</h1><p>Return to the home page or explore our services.</p><Link className="button primary" href="/">Return home</Link></div></div>}
