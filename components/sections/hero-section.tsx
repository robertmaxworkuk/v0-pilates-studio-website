import { CTAButton } from '@/components/shared/cta-button'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImagePlaceholder
          src="/images/hero.jpg"
          alt="Студия пилатеса"
          className="h-full w-full"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-2xl">
          {/* Tagline */}
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary md:text-base">
            Персональные тренировки
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Откройте силу <br className="hidden sm:block" />
            осознанного движения
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl text-pretty">
            Пилатес с сертифицированным тренером для здоровья спины, 
            красивой осанки и гармонии тела. 15 лет опыта, индивидуальный подход.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CTAButton size="lg" />
            <a
              href="#about"
              className="text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-left"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Узнать больше
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce md:block">
        <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 p-1">
          <div className="h-2 w-1 rounded-full bg-muted-foreground/50 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  )
}
