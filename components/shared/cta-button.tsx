'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'lg' | 'sm'
  className?: string
  children?: React.ReactNode
}

export function CTAButton({
  variant = 'default',
  size = 'lg',
  className,
  children = 'Записаться на пробное занятие',
}: CTAButtonProps) {
  const handleClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      // Focus on first input after scroll
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input')
        if (firstInput) {
          firstInput.focus()
        }
      }, 800)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
        'font-medium transition-all duration-300',
        variant === 'default' && 'hover:opacity-90 hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </Button>
  )
}
