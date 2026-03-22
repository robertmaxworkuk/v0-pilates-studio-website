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
  const [quoteMinHeight, setQuoteMinHeight] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const measureRefs = useRef<(HTMLParagraphElement | null)[]>([])

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

  useEffect(() => {
    const measureQuoteHeight = () => {
      const heights = measureRefs.current
        .map((element) => element?.getBoundingClientRect().height ?? 0)
        .filter(Boolean)

      if (heights.length > 0) {
        setQuoteMinHeight(Math.ceil(Math.max(...heights)))
      }
    }

    const animationFrame = window.requestAnimationFrame(measureQuoteHeight)
    window.addEventListener('resize', measureQuoteHeight)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', measureQuoteHeight)
    }
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
          <div className="relative rounded-[2rem] border border-border/50 bg-card p-5 shadow-xl sm:p-6 md:rounded-3xl md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-5 right-5 top-16 opacity-0 sm:left-6 sm:right-6 sm:top-20 md:left-12 md:right-12 md:top-24"
            >
              {testimonials.map((testimonial, index) => (
                <p
                  key={testimonial.id}
                  ref={(element) => {
                    measureRefs.current[index] = element
                  }}
                  className="font-serif text-lg leading-relaxed text-foreground sm:text-xl md:text-2xl"
                >
                  "{testimonial.text}"
                </p>
              ))}
            </div>

            {/* Quote icon */}
            <div className="absolute left-5 top-5 sm:left-6 sm:top-6 md:left-12 md:top-12">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 sm:h-12 sm:w-12 md:h-16 md:w-16">
                <Quote className="h-5 w-5 text-primary sm:h-6 sm:w-6 md:h-8 md:w-8" />
              </div>
            </div>

            {/* Content */}
            <div className="relative pt-10 sm:pt-12 md:pt-12">
              {/* Stars */}
              <div className="mb-4 flex justify-center gap-1 sm:mb-5 md:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5 transition-all duration-300 md:h-6 md:w-6',
                      i < currentTestimonial.rating
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground/30'
                    )}
                  />
                ))}
              </div>

              {/* Text */}
              <blockquote
                className="flex items-center justify-center text-center"
                style={quoteMinHeight > 0 ? { minHeight: `${quoteMinHeight}px` } : undefined}
              >
                <p className="font-serif text-lg leading-relaxed text-foreground sm:text-xl md:text-2xl">
                  "{currentTestimonial.text}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="mt-6 flex flex-col items-center sm:mt-8 md:mt-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 ring-4 ring-background sm:h-14 sm:w-14 md:h-16 md:w-16">
                  <span className="font-serif text-lg font-semibold text-primary sm:text-xl">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
                <p className="mt-3 text-base font-semibold text-foreground sm:mt-4 sm:text-lg">
                  {currentTestimonial.name}
                </p>
                <div className="mt-1 text-center sm:hidden">
                  {(currentTestimonial.occupation || currentTestimonial.date) && (
                    <p className="text-[13px] leading-snug text-muted-foreground">
                      {currentTestimonial.occupation}
                      {currentTestimonial.age && `, ${currentTestimonial.age} лет`}
                      {currentTestimonial.occupation && currentTestimonial.date && ' · '}
                      {currentTestimonial.date}
                    </p>
                  )}
                </div>
                {currentTestimonial.occupation && (
                  <p className="hidden text-sm text-muted-foreground sm:block">
                    {currentTestimonial.occupation}
                    {currentTestimonial.age && `, ${currentTestimonial.age} лет`}
                  </p>
                )}
                {currentTestimonial.date && (
                  <p className="mt-1 hidden text-xs text-muted-foreground/70 sm:block">
                    {currentTestimonial.date}
                  </p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4 md:mt-10 md:gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full border-border/50 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground md:h-12 md:w-12"
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
                      'h-2 rounded-full transition-all duration-300 md:h-2.5',
                      index === currentIndex
                        ? 'w-6 bg-primary md:w-8'
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50 md:w-2.5'
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
                className="h-10 w-10 rounded-full border-border/50 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground md:h-12 md:w-12"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Следующий отзыв</span>
              </Button>
            </div>
          </div>
        </div>

        {/* All testimonials grid (smaller) */}
        <div className="mt-12 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
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
