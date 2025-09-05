import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

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

    // Admin routes protection
    if (req.nextUrl.pathname.startsWith('/dashboard/admin') && role !== 'GENERAL_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Federation routes protection
    if (req.nextUrl.pathname.startsWith('/dashboard/federation') && 
        !['LFA_OFFICIAL', 'BASKETBALL_FEDERATION', 'KICKBALL_FEDERATION', 'VOLLEYBALL_FEDERATION', 'ATHLETICS_FEDERATION'].includes(role)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // MYS Staff routes protection
    if (req.nextUrl.pathname.startsWith('/dashboard/mys-staff') && role !== 'MYS_STAFF') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Finance Officer routes protection
    if (req.nextUrl.pathname.startsWith('/dashboard/finance-officer') && role !== 'FINANCE_OFFICER') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Match Official routes protection
    if (req.nextUrl.pathname.startsWith('/dashboard/match-official') && role !== 'MATCH_OFFICIAL') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Journalist routes protection
    if (req.nextUrl.pathname.startsWith('/dashboard/journalist') && role !== 'JOURNALIST') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return res
}
