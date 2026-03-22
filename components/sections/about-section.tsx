'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { trainer } from '@/lib/data/trainer'
import { Award, Clock, Users, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <SectionWrapper id="about" background="default" animate={false}>
      <div ref={sectionRef} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <div 
          className={cn(
            'relative transition-all duration-700',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          )}
        >
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <ImagePlaceholder
              src={trainer.photoUrl}
              alt={`Тренер ${trainer.name}`}
              aspectRatio="portrait"
              className="rounded-2xl shadow-2xl"
              fill
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-4 right-0 -z-10 h-full w-[92%] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 md:-bottom-6 md:-right-6 md:w-full" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          
          {/* Floating card */}
          <div className="absolute bottom-3 right-3 rounded-2xl border border-border/50 bg-card p-3 shadow-xl md:bottom-8 md:right-[-3rem] md:p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-serif font-semibold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">лет в пилатесе</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div 
          className={cn(
            'transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          )}
        >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 md:mb-6">
            <span className="text-sm font-semibold text-primary">О тренере</span>
          </div>
          
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Привет, я {trainer.name}
          </h2>
          
          <p className="mt-2 text-lg text-muted-foreground md:text-xl">
            Ваш тренер по пилатесу
          </p>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
            {trainer.bio}
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-xl bg-muted/50 p-4 text-center">
              <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Опыт</p>
              <p className="font-semibold text-foreground">{trainer.experience}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 text-center">
              <Award className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Тренер</p>
              <p className="font-semibold text-foreground">{trainer.trainerExperience}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 text-center">
              <Users className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Клиенты</p>
              <p className="font-semibold text-foreground">500+</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-8">
            <h3 className="mb-4 font-semibold text-foreground">Образование и сертификаты</h3>
            <ul className="space-y-3">
              {trainer.certifications.map((cert, index) => (
                <li 
                  key={index} 
                  className={cn(
                    'flex items-start gap-3 text-muted-foreground transition-all duration-500',
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  )}
                  style={{ transitionDelay: isVisible ? `${400 + index * 100}ms` : '0ms' }}
                >
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
