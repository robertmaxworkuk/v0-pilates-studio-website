'use client'

import { useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { testimonials } from '@/lib/data/testimonials'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <SectionWrapper id="testimonials">
      <SectionHeading
        title="Отзывы клиентов"
        subtitle="Истории тех, кто уже тренируется со мной"
      />

      {/* Featured testimonial */}
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-lg bg-muted p-8 md:p-12">
          {/* Quote icon */}
          <Quote className="absolute left-6 top-6 h-8 w-8 text-primary/20 md:left-8 md:top-8 md:h-12 md:w-12" />

          {/* Content */}
          <div className="relative">
            {/* Stars */}
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < currentTestimonial.rating
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground/30'
                  )}
                />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-center">
              <p className="font-serif text-lg text-foreground md:text-xl leading-relaxed">
                "{currentTestimonial.text}"
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-primary">
                  {currentTestimonial.name.charAt(0)}
                </span>
              </div>
              <p className="mt-3 font-medium text-foreground">
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
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full"
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
                    'h-2 w-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-6 bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
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
              className="h-10 w-10 rounded-full"
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
              'text-left rounded-lg border p-4 transition-all',
              index === currentIndex
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/30'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {testimonial.name}
                </p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-3 w-3',
                        i < testimonial.rating
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground/30'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {testimonial.text}
            </p>
          </button>
        ))}
      </div>
    </SectionWrapper>
  )
}
