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
    <section id="hero" className="relative overflow-hidden bg-background">
      {/* Desktop background image with overlay */}
      <div className="absolute inset-0 z-0 hidden md:block">
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
      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 pt-6 pb-12 sm:px-6 md:min-h-screen md:px-8 md:py-16">
        <div ref={contentRef} className="w-full max-w-2xl md:py-20">
          <div className="mb-5 md:hidden">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-2xl shadow-primary/10">
              <ImagePlaceholder
                src="/images/hero.jpg"
                alt="Pilatta студия пилатеса"
                aspectRatio="portrait"
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                    Pilatta studio
                  </span>
                </div>
                <p className="mt-3 max-w-[16rem] text-sm font-medium leading-relaxed text-foreground">
                  Спокойный ритм, персональное сопровождение и фокус на результате без перегруза.
                </p>
              </div>
            </div>
          </div>

          {/* Text card */}
          <div className="rounded-[2rem] border border-border/50 bg-card/95 p-5 shadow-2xl shadow-primary/10 backdrop-blur-md sm:p-8 md:rounded-2xl md:bg-card/80 md:p-12">
            {/* Tagline */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 sm:px-4">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm sm:tracking-wider">
                Персональные тренировки
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-balance font-serif text-[2rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Откройте силу{' '}
              <span className="text-primary">осознанного</span>{' '}
              движения
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:mt-6 sm:text-lg md:text-xl">
              Пилатес с сертифицированным тренером для здоровья спины, 
              красивой осанки и гармонии тела. 15 лет опыта, индивидуальный подход.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <CTAButton size="lg" className="w-full shrink-0 shadow-lg shadow-primary/25 sm:w-auto" />
              <a
                href="#about"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/60 px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground shrink-0 sm:min-h-0 sm:justify-start sm:border-0 sm:px-0"
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
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border/50 pt-6 sm:mt-10 sm:gap-6 sm:pt-8">
              <div>
                <div className="font-serif text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">15+</div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">лет опыта</div>
              </div>
              <div>
                <div className="font-serif text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">1000+</div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">учеников</div>
              </div>
              <div>
                <div className="font-serif text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">10+</div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">программ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
