"use server"

import { createClient } from "@/lib/supabase/server"

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
