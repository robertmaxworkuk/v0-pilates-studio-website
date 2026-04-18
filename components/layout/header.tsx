'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { CTAButton } from '@/components/shared/cta-button'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { BrandLogo } from '@/components/shared/brand-logo'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthNav } from '@/components/layout/auth-nav'
import Link from 'next/link'

const MobileNav = dynamic(() => import('./mobile-nav').then(mod => mod.MobileNav), {
  ssr: false,
  loading: () => (
    <Button variant="ghost" size="icon" className="relative h-10 w-10">
      <Menu className="h-5 w-5" />
    </Button>
  ),
})

const navItems = [
  { label: 'О тренере', href: '#about' },
  { label: 'Методика', href: '#method' },
  { label: 'Программы', href: '#programs' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Расписание', href: '#schedule' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#contact' },
]

interface HeaderProps {
  initialUserStatus?: {
    isAuthenticated: boolean
    role: string | null
    bookingCount: number
  }
}

export function Header({ initialUserStatus }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Find active section
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center"
            aria-label="Pilatta — на главную"
          >
            <BrandLogo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  activeSection === item.href.slice(1)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {initialUserStatus?.isAuthenticated === true && (
              <Button variant="outline" size="sm" asChild className="h-9 rounded-full px-4 lg:hidden">
                <Link
                  href={
                    initialUserStatus.role === 'admin'
                      ? '/admin/dashboard'
                      : initialUserStatus.role === 'trainer'
                        ? '/trainer/schedule'
                        : '/profile'
                  }
                >
                  Профиль
                </Link>
              </Button>
            )}
            {initialUserStatus?.isAuthenticated === false && (
              <Button variant="outline" size="sm" asChild className="h-9 rounded-full px-4 lg:hidden">
                <Link href="/sign-in">Войти</Link>
              </Button>
            )}
            <div className="hidden lg:flex items-center gap-3">
              <AuthNav
                initialAuthState={
                  initialUserStatus
                    ? {
                        isAuthenticated: initialUserStatus.isAuthenticated,
                        role: initialUserStatus.role,
                      }
                    : undefined
                }
              />
              <CTAButton
                size="default"
                initialVisible={
                  initialUserStatus
                    ? !(
                        initialUserStatus.isAuthenticated &&
                        (initialUserStatus.role === 'admin' ||
                          initialUserStatus.role === 'trainer' ||
                          initialUserStatus.bookingCount > 0)
                      )
                    : undefined
                }
              />
            </div>
            <div className="lg:hidden">
              <MobileNav
                navItems={navItems}
                isAuthenticated={initialUserStatus?.isAuthenticated}
                role={initialUserStatus?.role ?? null}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
