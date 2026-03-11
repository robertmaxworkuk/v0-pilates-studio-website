'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

interface SectionWrapperProps {
  id?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
  background?: 'default' | 'muted' | 'card'
  padding?: 'default' | 'large' | 'none'
  animate?: boolean
}

export function SectionWrapper({
  id,
  children,
  className,
  containerClassName,
  background = 'default',
  padding = 'default',
  animate = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(!animate)

  useEffect(() => {
    if (!animate) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animate])

  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    card: 'bg-card',
  }

  const paddingClasses = {
    default: 'py-16 md:py-24',
    large: 'py-20 md:py-32',
    none: '',
  }

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          animate && 'transition-all duration-700 ease-out',
          animate && (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'),
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
