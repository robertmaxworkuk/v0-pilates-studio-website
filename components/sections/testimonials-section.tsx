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
          subtitle="Один главный отзыв на экране и компактный мобильный навигатор вместо перегруженной сетки"
        />

        <div
          className={cn(
            'mx-auto max-w-4xl transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="relative rounded-[2rem] border border-border/50 bg-card p-5 shadow-xl md:p-12">
            <div className="absolute left-5 top-5 md:left-12 md:top-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 md:h-16 md:w-16">
                <Quote className="h-6 w-6 text-primary md:h-8 md:w-8" />
              </div>
            </div>

            <div className="relative pt-12 md:pt-12">
              <div className="mb-5 flex justify-center gap-1 md:mb-6">
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

              <blockquote className="text-center">
                <p className="font-serif text-lg leading-relaxed text-foreground md:text-2xl">
                  "{currentTestimonial.text}"
                </p>
              </blockquote>

              <div className="mt-8 flex flex-col items-center md:mt-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 ring-4 ring-background md:h-16 md:w-16">
                  <span className="font-serif text-lg font-semibold text-primary md:text-xl">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                </div>
                <p className="mt-4 text-base font-semibold text-foreground md:text-lg">
                  {currentTestimonial.name}
                </p>
                {currentTestimonial.occupation && (
                  <p className="text-center text-sm text-muted-foreground">
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

            <div className="mt-8 flex items-center justify-center gap-3 md:mt-10 md:gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="h-11 w-11 rounded-full border-border/50 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground md:h-12 md:w-12"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Предыдущий отзыв</span>
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'h-2.5 rounded-full transition-all duration-300',
                      index === currentIndex
                        ? 'w-7 bg-primary'
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
                className="h-11 w-11 rounded-full border-border/50 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground md:h-12 md:w-12"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Следующий отзыв</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 md:mt-12 md:grid md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'min-w-[78%] rounded-[1.5rem] border p-4 text-left transition-all duration-300 md:min-w-0 md:p-6',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                index === currentIndex
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-border/50 bg-card hover:border-primary/30 hover:shadow-md'
              )}
              style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms' }}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
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
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:mt-4">
                {testimonial.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
