import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

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

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Личный кабинет</h1>
        <p className="text-muted-foreground mt-2">
          Управляйте своим профилем и настройками.
        </p>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6 border-b">
          <h3 className="font-semibold leading-none tracking-tight">Данные пользователя</h3>
        </div>
        <div className="p-6 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Имя</p>
              <p className="font-medium mt-1">{profile?.first_name || 'Не указано'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Фамилия</p>
              <p className="font-medium mt-1">{profile?.last_name || 'Не указано'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="font-medium mt-1">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Роль в системе</p>
            <p className="font-medium mt-1 capitalize text-primary">{profile?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
