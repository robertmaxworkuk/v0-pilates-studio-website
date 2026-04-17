import { ReactNode } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ClientTopNav } from "@/components/ui/client-top-nav"
import { redirect } from "next/navigation"

export default async function UserLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Get user profile for avatar info
  const { data: profile } = await supabase
    .from('users_profile')
    .select('first_name, last_name')
    .eq('id', user.id)
    .single()

  const initials = profile 
    ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`.toUpperCase() || "U"
    : "U";

  const fullName = profile?.first_name || profile?.last_name
    ? `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()
    : undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col md:overflow-hidden">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-8">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:bg-primary/90 transition-colors">
              P
            </div>
            <span className="hidden font-bold sm:inline-block text-lg tracking-tight">
              Pilatta Studio
            </span>
          </Link>
          
          <ClientTopNav userEmail={user.email || ""} initials={initials} fullName={fullName} />
        </div>
      </header>

      {/* 
        Main layout wrapper
        On mobile, we add pb-20 to ensure content isn't hidden under the bottom tab bar
      */}
      <main className="flex-1 overflow-y-auto">
        <div className="container py-8 px-4 md:px-8 pb-24 md:pb-12 max-w-7xl mx-auto w-full h-full">
          {children}
        </div>
      </main>
    </div>
  )
}
