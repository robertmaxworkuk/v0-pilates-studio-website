"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { createClient } from "@/lib/supabase/client"
import type { ThemePreference } from "@/lib/actions/user"

function isThemePreference(value: string): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system"
}

export function ThemePreferenceSync({ preferredTheme }: { preferredTheme: ThemePreference | null }) {
  const { theme, setTheme } = useTheme()
  const supabase = createClient()
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

  useEffect(() => {
    let isActive = true

    const syncFromServer = async () => {
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") {
        void syncFromServer()
      }
      if (event === "SIGNED_OUT") {
        setTheme("light")
      }
    })

    return () => {
      isActive = false
      subscription.unsubscribe()
    }
  }, [setTheme, supabase])

  return null
}
