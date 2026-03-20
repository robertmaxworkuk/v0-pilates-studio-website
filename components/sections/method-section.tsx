'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { trainer } from '@/lib/data/trainer'
import { cn } from '@/lib/utils'
import { Quote } from 'lucide-react'

const principles = [
  {
    number: '01',
    title: 'Осознанность',
    description: 'Каждое движение выполняется с полным вниманием к телу. Вы учитесь слышать себя.',
  },
  {
    number: '02',
    title: 'Дыхание',
    description: 'Правильное дыхание — основа эффективной тренировки и инструмент расслабления.',
  },
  {
    number: '03',
    title: 'Контроль',
    description: 'Качество важнее количества. Каждое упражнение выполняется с точной техникой.',
  },
  {
    number: '04',
    title: 'Центрирование',
    description: 'Работа начинается с центра тела — мышц кора, которые поддерживают позвоночник.',
  },
  {
    number: '05',
    title: 'Плавность',
    description: 'Движения перетекают одно в другое без рывков и напряжения.',
  },
  {
    number: '06',
    title: 'Точность',
    description: 'Внимание к деталям и правильному положению тела в каждом упражнении.',
  },
]

export function MethodSection() {
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
    <SectionWrapper id="method" background="muted" animate={false}>
      <div ref={sectionRef}>
        <SectionHeading
          title="Методика Pilatta"
          subtitle="Классический пилатес с индивидуальным подходом"
        />

        {/* Philosophy quote */}
        <div 
          className={cn(
            'mx-auto mb-16 max-w-3xl relative transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="absolute -top-6 left-8 text-primary/20">
            <Quote className="h-16 w-16" />
          </div>
          <div className="rounded-2xl bg-card border border-border/50 p-8 md:p-12 shadow-lg relative">
            <blockquote className="text-center">
              <p className="font-serif text-xl text-foreground md:text-2xl leading-relaxed">
                {trainer.philosophy}
              </p>
              <footer className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-primary/30" />
                <span className="text-sm font-semibold text-primary">{trainer.name}</span>
                <div className="h-px w-12 bg-primary/30" />
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Principles grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <div
              key={principle.number}
              className={cn(
                'group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              {/* Number badge */}
              <div className="absolute -top-3 -left-3 h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-sm font-bold text-primary-foreground">
                  {principle.number}
                </span>
              </div>
              
              <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">
                {principle.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
              
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
