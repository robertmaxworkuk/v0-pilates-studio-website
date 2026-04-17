import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ScheduleClient } from "./schedule-client"

export default async function SchedulePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Fetch upcoming sessions from now until 7 days ahead
  const { data: sessions } = await supabase
    .from('sessions')
    .select(`
      id,
      title,
      description,
      price,
      max_capacity,
      location,
      start_time,
      end_time,
      status,
      type_id
    `)
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })

  return <ScheduleClient sessions={sessions || []} />
}
