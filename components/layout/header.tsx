'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { CTAButton } from '@/components/shared/cta-button'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export function Header() {
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
            className="group flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-serif text-xl font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground md:text-2xl">
              Pilatta
            </span>
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
            <div className="hidden lg:block">
              <CTAButton size="default" />
            </div>
            <div className="lg:hidden">
              <MobileNav navItems={navItems} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
