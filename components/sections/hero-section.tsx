'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CTAButton } from '@/components/shared/cta-button'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { ArrowDown } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }
  },
}

export function HeroSection() {

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
      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 pt-24 pb-12 sm:px-6 sm:pt-28 md:min-h-screen md:max-w-[88rem] md:px-8 md:py-16 xl:max-w-[96rem]">
        <motion.div 
          className="w-full max-w-2xl md:py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="md:hidden">
            <motion.div variants={itemVariants} className="px-1">
              <h1 className="text-balance font-serif text-[2.35rem] font-semibold leading-[0.98] tracking-tight text-foreground sm:text-[2.75rem]">
                Откройте силу{' '}
                <span className="text-primary relative inline-block">
                  осознанного
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-primary/30" 
                    initial={{ scaleX: 0 }} 
                    animate={{ scaleX: 1 }} 
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>{' '}
                движения
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                Пилатес с сертифицированным тренером для здоровья спины, красивой осанки и гармонии тела.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl shadow-primary/10">
              <div className="relative">
                <ImagePlaceholder
                  src="/images/hero.jpg"
                  alt="Pilatta студия пилатеса"
                  aspectRatio="portrait"
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-card via-card/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      Персональные тренировки
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-card px-5 pb-5 pt-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  15 лет опыта, персональный подход и программа, адаптированная под тело, цели и текущее самочувствие.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/50 pt-5">
                  <div>
                    <div className="font-serif text-xl font-semibold text-foreground">15+</div>
                    <div className="mt-1 text-xs leading-snug text-muted-foreground">лет опыта</div>
                  </div>
                  <div>
                    <div className="font-serif text-xl font-semibold text-foreground">1000+</div>
                    <div className="mt-1 text-xs leading-snug text-muted-foreground">учеников</div>
                  </div>
                  <div>
                    <div className="font-serif text-xl font-semibold text-foreground">10+</div>
                    <div className="mt-1 text-xs leading-snug text-muted-foreground">программ</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <CTAButton size="lg" className="w-full shrink-0 shadow-lg shadow-primary/25" />
                  <a
                    href="#about"
                    className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/60 px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span>Узнать больше</span>
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop text card */}
          <motion.div 
            variants={itemVariants} 
            className="hidden rounded-3xl border border-border/40 bg-background/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10 md:block md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -m-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Персональные тренировки
              </span>
            </div>

            <h1 className="text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Откройте силу{' '}
              <span className="text-primary">осознанного</span>{' '}
              движения
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
              Пилатес с сертифицированным тренером для здоровья спины, красивой осанки и гармонии тела. 15 лет опыта, индивидуальный подход.
            </p>

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

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border/50 pt-8">
              <div>
                <div className="font-serif text-2xl font-semibold text-foreground md:text-3xl">15+</div>
                <div className="mt-1 text-sm text-muted-foreground">лет опыта</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-foreground md:text-3xl">1000+</div>
                <div className="mt-1 text-sm text-muted-foreground">учеников</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-foreground md:text-3xl">10+</div>
                <div className="mt-1 text-sm text-muted-foreground">программ</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
