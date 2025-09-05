import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check auth condition
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect to login if accessing dashboard without session
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Role-based access control
  if (session) {
    const { role } = session.user.user_metadata

    // County official routes protection
    if (req.nextUrl.pathname.startsWith('/dashboard/county-official') && role !== 'COUNTY_OFFICIAL') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return res
}
