"use server"

import { createClient } from "@/lib/supabase/server"

export const THEME_PREFERENCES = ["light", "dark", "system"] as const
export type ThemePreference = (typeof THEME_PREFERENCES)[number]

function isThemePreference(value: string): value is ThemePreference {
  return THEME_PREFERENCES.includes(value as ThemePreference)
}

/**
 * Returns the current user's role and booking count.
 * Used for UI visibility logic (e.g., hiding trial booking buttons).
 */
export async function getUserStatusAction() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
      isAuthenticated: false,
      role: null,
      bookingCount: 0
    }
  }

  // Fetch profile and booking count in parallel
  const [profileResult, bookingsResult] = await Promise.all([
    supabase
      .from("users_profile")
      .select("role")
      .eq("id", user.id)
      .single(),
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
  ])

  return {
    isAuthenticated: true,
    role: profileResult.data?.role || "user",
    bookingCount: bookingsResult.count || 0
  }
}

export async function getCurrentUserThemePreferenceAction(): Promise<ThemePreference | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from("users_profile")
    .select("theme_preference")
    .eq("id", user.id)
    .single()

  const themePreference = data?.theme_preference
  if (typeof themePreference !== "string" || !isThemePreference(themePreference)) {
    return null
  }

  return themePreference
}

export async function updateUserThemePreferenceAction(theme: ThemePreference) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Пользователь не авторизован" }
  }

  if (!isThemePreference(theme)) {
    return { error: "Недопустимое значение темы" }
  }

  const { error } = await supabase
    .from("users_profile")
    .update({ theme_preference: theme })
    .eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
