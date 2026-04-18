"use client"

import { useLayoutEffect, useRef } from "react"
import { useTheme } from "next-themes"
import type { ThemePreference } from "@/lib/actions/user"

export function ThemePreferenceSync({ preferredTheme }: { preferredTheme: ThemePreference | null }) {
  const { theme, setTheme } = useTheme()
  const lastAppliedTheme = useRef<ThemePreference | null>(null)

  useLayoutEffect(() => {
    if (!preferredTheme) return
    if (theme === preferredTheme) {
      lastAppliedTheme.current = preferredTheme
      return
    }

    if (lastAppliedTheme.current === preferredTheme) return

    lastAppliedTheme.current = preferredTheme
    setTheme(preferredTheme)
  }, [preferredTheme, setTheme, theme])

  return null
}
