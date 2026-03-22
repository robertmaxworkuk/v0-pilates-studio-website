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
    <section id="hero" className="relative overflow-hidden bg-background pb-10 pt-24 md:min-h-screen md:pb-0 md:pt-0">
      {/* Background Image with overlay */}
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
      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8 md:min-h-screen">
        <div ref={contentRef} className="w-full py-2 md:max-w-2xl md:py-32">
          {/* Glass card for text */}
          <div className="overflow-hidden rounded-[2rem] border border-border/50 bg-card/95 p-5 shadow-xl shadow-primary/10 backdrop-blur-md md:bg-card/80 md:p-12 md:shadow-2xl">
            <div className="relative -mx-5 -mt-5 mb-6 aspect-[5/4] overflow-hidden md:hidden">
              <ImagePlaceholder
                src="/images/hero.jpg"
                alt="Pilatta студия пилатеса"
                className="h-full w-full"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                  Пилатес для осанки и спины
                </span>
                <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">
                  Центр Москвы
                </span>
              </div>
            </div>
            {/* Tagline */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 md:mb-6 md:px-4">
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
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-xl text-pretty">
              Пилатес с сертифицированным тренером для здоровья спины, 
              красивой осанки и гармонии тела. 15 лет опыта, индивидуальный подход.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-8">
              <CTAButton size="lg" className="w-full shrink-0 shadow-lg shadow-primary/25 sm:w-auto" />
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
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border/50 pt-6 md:mt-10 md:gap-6 md:pt-8">
              <div className="rounded-2xl bg-muted/60 p-3 md:bg-transparent md:p-0">
                <div className="font-serif text-2xl font-semibold text-foreground md:text-3xl">15+</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">лет опыта</div>
              </div>
              <div className="rounded-2xl bg-muted/60 p-3 md:bg-transparent md:p-0">
                <div className="font-serif text-2xl font-semibold text-foreground md:text-3xl">1000+</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">учеников</div>
              </div>
              <div className="rounded-2xl bg-muted/60 p-3 md:bg-transparent md:p-0">
                <div className="font-serif text-2xl font-semibold text-foreground md:text-3xl">10+</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">программ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
