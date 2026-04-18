'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CTAButton } from '@/components/shared/cta-button'
import { BrandLogo } from '@/components/shared/brand-logo'

interface NavItem {
  label: string
  href: string
}

interface MobileNavProps {
  navItems: NavItem[]
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-full border border-border/50 bg-background/80 shadow-sm">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-sm h-dvh bg-background border-l border-border overflow-hidden pb-[max(env(safe-area-inset-bottom),0.75rem)]"
      >
        <SheetHeader className="text-left">
          <SheetTitle>
            <BrandLogo compact />
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-1 flex-col min-h-0">
          <div className="flex flex-col gap-2 overflow-y-auto px-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-lg font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted px-4 py-3 rounded-xl"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto px-4 pt-5 border-t border-border/70">
            <CTAButton className="w-full" size="lg" initialVisible onClick={() => setIsOpen(false)} />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
