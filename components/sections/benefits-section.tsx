'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { benefits } from '@/lib/data/studio'
import { 
  Activity, 
  Heart, 
  Sparkles, 
  Wind, 
  Target,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ReactNode> = {
  'spine': <Activity className="h-6 w-6" />,
  'posture': <Target className="h-6 w-6" />,
  'flexibility': <Sparkles className="h-6 w-6" />,
  'relax': <Wind className="h-6 w-6" />,
  'body': <Heart className="h-6 w-6" />,
  'all-ages': <Users className="h-6 w-6" />,
}

export function BenefitsSection() {
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
    <SectionWrapper id="benefits" background="muted">
      <SectionHeading
        title="Преимущества Pilatta"
        subtitle="Метод, который трансформирует тело и улучшает качество жизни"
      />

      <div ref={sectionRef} className="mobile-snap-row lg:grid lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.id}
            className={cn(
              'mobile-snap-card group relative flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 md:p-8',
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
            style={{
              transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
            }}
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground md:mb-5 md:h-14 md:w-14">
                {iconMap[benefit.icon] || <Sparkles className="h-6 w-6" />}
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground md:text-xl">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
