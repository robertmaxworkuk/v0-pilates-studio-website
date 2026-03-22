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
        subtitle="Выберите формат, который подходит именно вам"
      />

      <div ref={sectionRef} className="mobile-snap-row md:grid md:grid-cols-2">
        {programs.map((program, index) => (
          <div
            key={program.id}
            className={cn(
              'mobile-snap-card group overflow-hidden rounded-[1.75rem] border border-border/50 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            )}
            style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden md:h-56">
              <ImagePlaceholder
                src={program.imageUrl}
                alt={program.title}
                className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {/* Level badge */}
              <div className="absolute top-4 right-4">
                <span className="rounded-full bg-card/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-foreground">
                  {program.level}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-8">
              <h3 className="font-serif text-xl font-semibold text-foreground md:text-2xl">
                {program.title}
              </h3>

              {/* Meta */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground md:mt-4 md:gap-4 md:text-sm">
                <span className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1">
                  <Clock className="h-4 w-4 text-primary" />
                  {program.duration}
                </span>
                <span className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1">
                  <Users className="h-4 w-4 text-primary" />
                  {program.level}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {program.description}
              </p>

              {/* Features */}
              <ul className="mt-5 space-y-2">
                {program.features.slice(0, 3).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 md:mt-8">
                <CTAButton variant="outline" size="default" className="w-full justify-center whitespace-nowrap">
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
