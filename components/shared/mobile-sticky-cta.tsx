'use client'

import { Phone } from 'lucide-react'
import { CTAButton } from '@/components/shared/cta-button'
import { studioInfo } from '@/lib/data/studio'

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/92 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href={`tel:${studioInfo.phone}`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="Позвонить в студию"
        >
          <Phone className="h-5 w-5" />
        </a>
        <CTAButton className="h-12 flex-1 rounded-2xl text-sm shadow-lg shadow-primary/20" size="default">
          Записаться
        </CTAButton>
      </div>
    </div>
  )
}
