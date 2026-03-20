'use client'

import { useEffect, useRef } from 'react'
import { CTAButton } from '@/components/shared/cta-button'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { ArrowDown } from 'lucide-react'

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (content) {
      content.style.opacity = '0'
      content.style.transform = 'translateY(30px)'
      
      setTimeout(() => {
        content.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
        content.style.opacity = '1'
        content.style.transform = 'translateY(0)'
      }, 200)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <ImagePlaceholder
          src="/images/hero.jpg"
          alt="Pilatta студия пилатеса"
          className="h-full w-full object-cover scale-105"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent dark:from-background/98 dark:via-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="w-full max-w-2xl py-32">
          {/* Glass card for text */}
          <div className="rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 p-8 md:p-12 shadow-2xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Персональные тренировки
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Откройте силу{' '}
              <span className="text-primary">осознанного</span>{' '}
              движения
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed text-pretty">
              Пилатес с сертифицированным тренером для здоровья спины, 
              красивой осанки и гармонии тела. 15 лет опыта, индивидуальный подход.
            </p>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <CTAButton size="lg" className="shadow-lg shadow-primary/25 shrink-0" />
              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground shrink-0"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Узнать больше</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 pt-8 border-t border-border/50 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl md:text-3xl font-serif font-semibold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground mt-1">лет опыта</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-serif font-semibold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">учеников</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-serif font-semibold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground mt-1">программ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-12 w-6 rounded-full border-2 border-muted-foreground/30 p-1">
            <div className="h-2 w-full rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
