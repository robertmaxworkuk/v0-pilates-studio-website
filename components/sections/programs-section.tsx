'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { CTAButton } from '@/components/shared/cta-button'
import { programs } from '@/lib/data/programs'
import { Clock, Users, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ProgramsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <SectionWrapper id="programs" animate={false}>
      <SectionHeading
        title="Программы тренировок"
        subtitle="На мобильном — короткие, наглядные карточки с быстрым выбором формата"
      />

      <div
        ref={sectionRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-2"
      >
        {programs.map((program, index) => (
          <div
            key={program.id}
            className={cn(
              'group flex min-w-[85%] snap-start flex-col overflow-hidden rounded-[1.75rem] border border-border/50 bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1 md:min-w-0',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            )}
            style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
          >
            <div className="relative h-44 overflow-hidden md:h-56">
              <ImagePlaceholder
                src={program.imageUrl}
                alt={program.title}
                className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

              <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-3">
                <span className="max-w-[65%] rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm">
                  {program.level}
                </span>
                <span className="rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
                  {program.duration}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 md:p-8">
              <h3 className="font-serif text-xl font-semibold text-foreground md:text-2xl">
                {program.title}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground md:mt-4 md:text-sm">
                <span className="flex items-center gap-2 rounded-full bg-muted/60 px-3 py-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                  {program.duration}
                </span>
                <span className="flex items-center gap-2 rounded-full bg-muted/60 px-3 py-1.5">
                  <Users className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                  {program.level}
                </span>
              </div>

              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {program.description}
              </p>

              <ul className="mt-5 space-y-2 md:mt-6">
                {program.features.slice(0, 2).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 md:mt-8">
                <CTAButton variant="outline" size="default" className="h-11 w-full justify-center whitespace-nowrap rounded-2xl">
                  Записаться
                </CTAButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
