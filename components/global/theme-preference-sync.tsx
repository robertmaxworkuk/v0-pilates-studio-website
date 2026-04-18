"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { getCurrentUserThemePreferenceAction, type ThemePreference } from "@/lib/actions/user"

export function ThemePreferenceSync({ preferredTheme }: { preferredTheme: ThemePreference | null }) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    if (!preferredTheme) return
    if (theme === preferredTheme) return
    setTheme(preferredTheme)
  }, [preferredTheme, setTheme, theme])

  useEffect(() => {
    let isActive = true

    const syncFromServer = async () => {
      const serverTheme = await getCurrentUserThemePreferenceAction()
      if (!isActive || !serverTheme) return
      if (theme === serverTheme) return
      setTheme(serverTheme)
    }

    void syncFromServer()

    return () => {
      isActive = false
    }
  }, [pathname, setTheme, theme])

  return null
}
