'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LogIn, User as UserIcon, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { getUserStatusAction } from '@/lib/actions/user'

interface AuthState {
  isAuthenticated: boolean
  role: string | null
}

export function AuthNav({
  className,
  isMobile = false,
  initialAuthState,
}: {
  className?: string
  isMobile?: boolean
  initialAuthState?: AuthState
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialAuthState?.isAuthenticated))
  const [loading, setLoading] = useState(initialAuthState ? false : true)
  const supabase = createClient()
  const router = useRouter()

  const [role, setRole] = useState<string | null>(initialAuthState?.role ?? null)

  useEffect(() => {
    // Получаем текущего пользователя и его статус
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(Boolean(data.user))
      if (data.user) {
        getUserStatusAction().then(status => {
          setRole(status.role)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })

    // Подписываемся на изменения состояния авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(Boolean(session?.user))
        router.refresh()
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return <div className={cn("h-10 w-24 animate-pulse rounded-md bg-muted", className)} />
  }

  if (isAuthenticated) {
    return (
      <div className={cn("flex items-center gap-2", isMobile ? "flex-col w-full" : "", className)}>
        <Button variant="outline" className={cn(isMobile ? "w-full justify-start" : "")} asChild>
          <Link href={role === 'admin' ? '/admin/dashboard' : role === 'trainer' ? '/trainer/schedule' : '/profile'}>
            <UserIcon className="mr-2 h-4 w-4 text-primary" />
            Кабинет
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          size={isMobile ? "default" : "icon"} 
          className={cn(isMobile ? "w-full justify-start text-muted-foreground hover:text-destructive" : "text-muted-foreground hover:text-destructive")}
          onClick={handleSignOut}
          title="Выйти"
        >
          <LogOut className={cn("h-4 w-4", isMobile ? "mr-2" : "")} />
          {isMobile && "Выйти"}
        </Button>
      </div>
    )
  }

  return (
    <Button variant="ghost" className={cn(isMobile ? "w-full justify-start" : "", className)} asChild>
      <Link href="/sign-in">
        <LogIn className="mr-2 h-4 w-4 text-primary" />
        Войти
      </Link>
    </Button>
  )
}
