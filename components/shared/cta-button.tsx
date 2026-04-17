'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getUserStatusAction } from '@/lib/actions/user'

interface CTAButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'lg' | 'sm'
  className?: string
  children?: React.ReactNode
  showArrow?: boolean
}

export function CTAButton({
  variant = 'default',
  size = 'lg',
  className,
  children = 'Записаться на пробное',
  showArrow = true,
}: CTAButtonProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Only apply visibility logic if it's the default "book a trial" button
    if (children === 'Записаться на пробное') {
      const checkVisibility = async () => {
        const status = await getUserStatusAction()
        if (
          status.isAuthenticated &&
          (status.role === 'admin' || status.role === 'trainer' || status.bookingCount > 0)
        ) {
          setIsVisible(false)
        }
      }
      checkVisibility()
    }
  }, [children])

  const handleClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input')
        if (firstInput) {
          firstInput.focus()
        }
      }, 800)
    }
  }

  if (!isVisible) return null

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
        'group font-semibold transition-all duration-300 gap-2',
        variant === 'default' && 'hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]',
        className
      )}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </Button>
  )
}
