import { NextRequest, NextResponse } from 'next/server';

const apex = 'hvacstaffingcompany.com';

export function proxy(request: NextRequest) {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '').split(':')[0].toLowerCase();
  const cfVisitor = request.headers.get('cf-visitor');
  let visitorScheme = '';
  try { visitorScheme = cfVisitor ? String(JSON.parse(cfVisitor).scheme || '') : ''; } catch { visitorScheme = ''; }
  const forwardedScheme = request.headers.get('x-forwarded-proto')?.split(',')[0].trim();
  const scheme = visitorScheme || forwardedScheme || request.nextUrl.protocol.replace(':', '');
  const publicHost = host === apex || host === `www.${apex}`;
  if (publicHost && (scheme === 'http' || host === `www.${apex}`)) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = apex;
    url.port = '';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
