import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileDashboard } from "./profile-dashboard"
import { BlockedProfileBanner } from "./blocked-profile-banner"

export default async function UserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.status === 'blocked') {
    return <BlockedProfileBanner />
  }

  // Admins and trainers can access the generic profile to edit their info and settings.

  // For presentation, let's fetch any upcoming session starting from now
  const { data: upcomingSessions } = await supabase
    .from('sessions')
    .select('*')
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })
    .limit(1)

  const upcomingSession = upcomingSessions?.[0] || null

  return <ProfileDashboard profile={profile} email={user.email} upcomingSession={upcomingSession} />
}
