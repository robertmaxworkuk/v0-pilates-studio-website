'use client'

import { useState } from 'react'
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
        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm bg-background border-l border-border">
        <SheetHeader className="text-left">
          <SheetTitle>
            <BrandLogo compact />
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-left text-lg font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted px-4 py-3 rounded-xl"
            >
              {item.label}
            </button>
          ))}
          <div className="mt-6 pt-6 border-t border-border">
            <CTAButton className="w-full" size="lg" />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
