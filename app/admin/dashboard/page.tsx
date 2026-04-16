import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Получаем профиль чтобы удостовериться что мы зашли
  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-muted-foreground mt-2">
          Добро пожаловать в панель администратора студии.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold tracking-tight text-sm">Ваш статус</h3>
          <p className="text-2xl font-bold mt-2 truncate text-primary">{profile?.role}</p>
        </div>
      </div>
    </div>
  )
}
