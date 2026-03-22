'use client'

import { useEffect, useRef } from 'react'
import { CTAButton } from '@/components/shared/cta-button'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { ArrowDown } from 'lucide-react'

const stats = [
  { value: '15+', label: 'лет опыта' },
  { value: '1000+', label: 'учеников' },
  { value: '10+', label: 'программ' },
]

const highlights = ['Здоровая спина', 'Осанка и гибкость', 'Индивидуальный темп']

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
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 pt-24 md:min-h-screen md:pt-0"
    >
      <div className="absolute inset-0 z-0 md:hidden">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent" />
        <div className="absolute right-[-120px] top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="absolute inset-0 z-0 hidden md:block">
        <ImagePlaceholder
          src="/images/hero.jpg"
          alt="Pilatta студия пилатеса"
          className="h-full w-full scale-105 object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent dark:from-background/98 dark:via-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2rem)] max-w-7xl items-center px-4 pb-10 sm:px-6 md:min-h-screen md:px-8 md:py-0 lg:px-8">
        <div ref={contentRef} className="w-full max-w-2xl py-2 md:py-32">
          <div className="rounded-[2rem] border border-border/60 bg-card/88 p-5 shadow-2xl backdrop-blur-xl sm:p-6 md:rounded-2xl md:border-border/50 md:bg-card/80 md:p-12">
            <div className="md:hidden">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border/50 bg-muted shadow-lg">
                <ImagePlaceholder
                  src="/images/hero.jpg"
                  alt="Pilatta студия пилатеса"
                  aspectRatio="portrait"
                  className="w-full object-cover"
                  priority
                  width={720}
                  height={960}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-background/75 px-4 py-3 backdrop-blur-md">
                  <p className="text-sm font-medium text-foreground">Студия пилатеса в спокойной приватной атмосфере</p>
                  <p className="mt-1 text-xs text-muted-foreground">Комфортный темп, бережная нагрузка и фокус на результате.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 md:mt-0 md:mb-6">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
                Персональные тренировки
              </span>
            </div>

            <h1 className="mt-4 font-serif text-[2rem] font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-[2.5rem] md:mt-0 md:text-5xl lg:text-6xl">
              Откройте силу <span className="text-primary">осознанного</span> движения
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground text-pretty sm:text-lg md:mt-6 md:text-xl">
              Пилатес с сертифицированным тренером для здоровья спины, красивой осанки и гармонии тела.
              Бережный подход, понятная программа и спокойная атмосфера студии с первого касания.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 md:hidden">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8 md:gap-4">
              <CTAButton size="lg" className="w-full justify-center shadow-lg shadow-primary/25 sm:w-auto" />
              <a
                href="#about"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border/60 bg-background/75 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-background md:min-h-0 md:justify-start md:border-0 md:bg-transparent md:px-0 md:text-muted-foreground md:hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Узнать больше</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-border/50 pt-6 sm:grid-cols-3 sm:gap-4 md:mt-10 md:gap-6 md:pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-background/65 px-4 py-3 shadow-sm ring-1 ring-border/40 md:bg-transparent md:px-0 md:py-0 md:shadow-none md:ring-0">
                  <div className="text-2xl font-serif font-semibold text-foreground md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
