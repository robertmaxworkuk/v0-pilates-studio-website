'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { LogIn, User as UserIcon, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export function AuthNav({ className, isMobile = false }: { className?: string, isMobile?: boolean }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    // Получаем текущего пользователя
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    // Подписываемся на изменения состояния авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
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

  if (user) {
    return (
      <div className={cn("flex items-center gap-2", isMobile ? "flex-col w-full" : "", className)}>
        <Button variant="outline" className={cn(isMobile ? "w-full justify-start" : "")} asChild>
          <Link href="/profile">
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
