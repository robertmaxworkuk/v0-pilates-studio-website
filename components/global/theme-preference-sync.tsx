"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { createClient } from "@/lib/supabase/client"
import type { ThemePreference } from "@/lib/actions/user"

function isThemePreference(value: string): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system"
}

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
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!isActive || !user) return

      const { data } = await supabase
        .from("users_profile")
        .select("theme_preference")
        .eq("id", user.id)
        .single()

      const serverTheme = data?.theme_preference
      if (!isActive || typeof serverTheme !== "string" || !isThemePreference(serverTheme)) return
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
