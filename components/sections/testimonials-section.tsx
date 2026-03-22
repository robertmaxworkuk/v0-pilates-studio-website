'use client'

import { useState, useEffect, useRef } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { testimonials } from '@/lib/data/testimonials'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <SectionWrapper id="testimonials" animate={false}>
      <div ref={sectionRef}>
        <SectionHeading
          title="Отзывы клиентов"
          subtitle="Истории тех, кто уже тренируется в Pilatta"
        />

        {/* Featured testimonial */}
        <div 
          className={cn(
            'mx-auto max-w-4xl transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="relative rounded-3xl bg-card border border-border/50 p-8 md:p-12 shadow-xl">
            {/* Quote icon */}
            <div className="absolute left-8 top-8 md:left-12 md:top-12">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="relative pt-16 md:pt-12">
              {/* Stars */}
              <div className="mb-6 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-6 w-6 transition-all duration-300',
                      i < currentTestimonial.rating
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground/30'
                    )}
                  />
                ))}
              </div>

              {/* Text */}
              <blockquote className="flex min-h-[15rem] items-center justify-center text-center md:min-h-[11rem] lg:min-h-[9rem]">
                <p className="font-serif text-xl text-foreground md:text-2xl leading-relaxed">
                  "{currentTestimonial.text}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="mt-10 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-4 ring-background">
                  <span className="font-serif text-xl font-semibold text-primary">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
                <p className="mt-4 font-semibold text-foreground text-lg">
                  {currentTestimonial.name}
                </p>
                {currentTestimonial.occupation && (
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.occupation}
                    {currentTestimonial.age && `, ${currentTestimonial.age} лет`}
                  </p>
                )}
                {currentTestimonial.date && (
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {currentTestimonial.date}
                  </p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="h-12 w-12 rounded-full border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Предыдущий отзыв</span>
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'h-2.5 rounded-full transition-all duration-300',
                      index === currentIndex
                        ? 'w-8 bg-primary'
                        : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    )}
                  >
                    <span className="sr-only">Отзыв {index + 1}</span>
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="h-12 w-12 rounded-full border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Следующий отзыв</span>
              </Button>
            </div>
          </div>
        </div>

        {/* All testimonials grid (smaller) */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'text-left rounded-2xl border p-6 transition-all duration-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                index === currentIndex
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-border/50 bg-card hover:border-primary/30 hover:shadow-md'
              )}
              style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms' }}
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-3.5 w-3.5',
                          i < testimonial.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground/30'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {testimonial.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
