import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Возвращает домашний путь для пользователя по его роли
 */
function getHomeForRole(role: string | null | undefined): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard'
    case 'trainer':
      return '/trainer/schedule'
    default:
      return '/profile'
  }
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  // Неавторизованный пользователь пытается зайти на защищённый маршрут
  if (!user && !isAuthRoute && pathname !== '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/sign-in'
    return NextResponse.redirect(url)
  }

  // Авторизованный пользователь зашёл на страницу входа/регистрации
  // → перенаправляем его в нужный дашборд по роли
  if (user && isAuthRoute) {
    const { data: profile } = await supabase
      .from('users_profile')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    url.pathname = getHomeForRole(profile?.role)
    return NextResponse.redirect(url)
  }

  // Защита /admin — только для роли admin
  if (user && pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('users_profile')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = getHomeForRole(profile?.role)
      return NextResponse.redirect(url)
    }
  }

  // Защита /trainer — только для роли trainer или admin
  if (user && pathname.startsWith('/trainer')) {
    const { data: profile } = await supabase
      .from('users_profile')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'trainer' && profile?.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = getHomeForRole(profile?.role)
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}