"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import type { ThemePreference } from "@/lib/actions/user"

export function ThemePreferenceSync({ preferredTheme }: { preferredTheme: ThemePreference | null }) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (!preferredTheme) return
    if (theme === preferredTheme) return
    setTheme(preferredTheme)
  }, [preferredTheme, setTheme, theme])

  return null
}
