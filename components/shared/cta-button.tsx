'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getUserStatusAction } from '@/lib/actions/user'

interface CTAButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'lg' | 'sm'
  className?: string
  children?: React.ReactNode
  showArrow?: boolean
  initialVisible?: boolean
  onClick?: () => void
}

export function CTAButton({
  variant = 'default',
  size = 'lg',
  className,
  children = 'Записаться на пробное',
  showArrow = true,
  initialVisible,
  onClick,
}: CTAButtonProps) {
  const isTrialCta = children === 'Записаться на пробное'
  const [isVisible, setIsVisible] = useState(
    initialVisible !== undefined ? initialVisible : true
  )
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    // Only apply visibility logic if it's the default "book a trial" button
    if (isTrialCta && initialVisible === undefined) {
      let isActive = true

      setIsChecking(true)

      const checkVisibility = async () => {
        try {
          const status = await getUserStatusAction()
          if (!isActive) return

          if (
            status.isAuthenticated &&
            (status.role === 'admin' || status.role === 'trainer' || status.bookingCount > 0)
          ) {
            setIsVisible(false)
          } else {
            setIsVisible(true)
          }
        } catch {
          if (isActive) {
            setIsVisible(true)
          }
        } finally {
          if (isActive) {
            setIsChecking(false)
          }
        }
      }

      checkVisibility()
      return () => {
        isActive = false
      }
    }
  }, [isTrialCta, initialVisible])

  const handleClick = () => {
    onClick?.()

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
      disabled={isChecking}
      onClick={handleClick}
      className={cn(
        'group font-semibold transition-all duration-300 gap-2',
        variant === 'default' && 'hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]',
        className
      )}
    >
      {isChecking && <Loader2 className="h-4 w-4 animate-spin" />}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </Button>
  )
}
