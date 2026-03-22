'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    const startViewTransition = (
      document as Document & {
        startViewTransition?: (callback: () => void | Promise<void>) => void
      }
    ).startViewTransition

    if (!startViewTransition) {
      setTheme(nextTheme)
      return
    }

    startViewTransition(async () => {
      setTheme(nextTheme)

      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve())
      })
    })
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={toggleTheme}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        {resolvedTheme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
      </span>
    </Button>
  )
}
