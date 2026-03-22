'use client'

import { useEffect, useRef } from 'react'
import { CTAButton } from '@/components/shared/cta-button'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { ArrowDown, CheckCircle2, Sparkles } from 'lucide-react'

const heroHighlights = [
  'Персональные программы',
  'Мягкая работа со спиной',
  'Уютная студия в центре',
]

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
    <section id="hero" className="relative overflow-hidden bg-background pt-20 md:min-h-screen md:pt-0">
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100svh-5rem)] items-center gap-8 py-6 md:min-h-screen md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] md:gap-10 md:py-20">
          <div ref={contentRef} className="w-full max-w-2xl">
            <div className="rounded-[2rem] border border-border/60 bg-card/88 p-5 shadow-2xl backdrop-blur-md md:p-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 md:px-4 md:py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary md:text-sm">
                  Персональные тренировки
                </span>
              </div>

              <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                Пилатес, который
                <span className="text-primary"> выглядит идеально </span>
                и ощущается легко на мобильном ритме жизни
              </h1>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-xl text-pretty">
                Тренировки для здоровой спины, красивой осанки и спокойного тела. На телефоне — короткий путь к записи, понятная подача и акцент на главное.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5 md:mt-6">
                {heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-2 text-sm text-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8 md:gap-4">
                <CTAButton size="lg" className="h-12 rounded-2xl px-6 shadow-lg shadow-primary/25 md:h-14" />
                <a
                  href="#about"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/70 px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:justify-start"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span>Узнать больше</span>
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border/50 pt-5 md:mt-10 md:gap-6 md:pt-8">
                <div className="rounded-2xl bg-background/70 px-3 py-3 text-center md:bg-transparent md:px-0 md:py-0 md:text-left">
                  <div className="text-xl font-serif font-semibold text-foreground md:text-3xl">15+</div>
                  <div className="mt-1 text-xs text-muted-foreground md:text-sm">лет опыта</div>
                </div>
                <div className="rounded-2xl bg-background/70 px-3 py-3 text-center md:bg-transparent md:px-0 md:py-0 md:text-left">
                  <div className="text-xl font-serif font-semibold text-foreground md:text-3xl">1000+</div>
                  <div className="mt-1 text-xs text-muted-foreground md:text-sm">учеников</div>
                </div>
                <div className="rounded-2xl bg-background/70 px-3 py-3 text-center md:bg-transparent md:px-0 md:py-0 md:text-left">
                  <div className="text-xl font-serif font-semibold text-foreground md:text-3xl">10+</div>
                  <div className="mt-1 text-xs text-muted-foreground md:text-sm">программ</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative md:justify-self-end">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-2 shadow-2xl md:hidden">
              <ImagePlaceholder
                src="/images/hero.jpg"
                alt="Pilatta студия пилатеса"
                aspectRatio="portrait"
                className="rounded-[1.5rem]"
                fill
                priority
              />
              <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-[1.5rem] bg-background/88 p-4 shadow-lg backdrop-blur-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  HERO теперь виден на телефоне
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  Крупная фотография, быстрые преимущества и прямой CTA без лишней высоты экрана.
                </p>
              </div>
            </div>

            <div className="hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-sm md:block">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
                <ImagePlaceholder
                  src="/images/hero.jpg"
                  alt="Pilatta студия пилатеса"
                  aspectRatio="portrait"
                  className="min-h-[36rem]"
                  fill
                  priority
                />
                <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] bg-background/88 p-5 shadow-xl backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Pilatta Studio</p>
                  <p className="mt-3 text-lg font-medium leading-relaxed text-foreground">
                    Компактный мобильный опыт: видно фото, понятно предложение, легко дойти до записи.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
