import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Users, TrendingUp, Calendar, CreditCard, BookOpen, Dumbbell, ChevronRight } from "lucide-react"
import Link from "next/link"

export const metadata = { title: "Панель управления | Pilatta Admin" }

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/sign-in")

  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin' && profile?.role !== 'superadmin') {
    redirect("/profile")
  }

  const [
    { count: usersCount },
    { count: sessionsCount },
    { count: bookingsCount },
    { data: recentBookings },
  ] = await Promise.all([
    supabase.from('users_profile').select('*', { count: 'exact', head: true }),
    supabase.from('sessions').select('*', { count: 'exact', head: true }).gte('start_time', new Date().toISOString()),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'booked'),
    supabase
      .from('bookings')
      .select('id, booked_at, is_paid, users_profile!user_id(first_name, last_name), sessions(title)')
      .order('booked_at', { ascending: false })
      .limit(5),
  ])

  const revenue = (bookingsCount || 0) * 1500

  const stats = [
    { label: "Всего клиентов", value: usersCount || 0, icon: Users, color: "text-primary", bg: "bg-primary/10", trend: "+12% за месяц", trendColor: "text-green-500", href: "/admin/users" },
    { label: "Активных броней", value: bookingsCount || 0, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10", trend: "Текущих записей", trendColor: "text-muted-foreground", href: "/admin/bookings" },
    { label: "Будущих занятий", value: sessionsCount || 0, icon: Calendar, color: "text-accent", bg: "bg-accent/10", trend: "В расписании", trendColor: "text-muted-foreground", href: "/admin/sessions" },
    { label: "Доход (прогноз)", value: `${revenue.toLocaleString('ru-RU')} ₽`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10", trend: "По текущим броням", trendColor: "text-muted-foreground", href: "/admin/bookings" },
  ]

  const quickActions = [
    { label: "Управление расписанием", desc: "Добавляйте новые тренировки, назначайте тренеров и отслеживайте свободные места.", icon: Calendar, href: "/admin/sessions", cta: "Открыть расписание" },
    { label: "База клиентов", desc: "Просмотр профилей, управление ролями и историей посещений.", icon: Users, href: "/admin/users", cta: "Открыть клиентов" },
    { label: "Типы занятий", desc: "Справочник шаблонов тренировок. Используется при создании занятий.", icon: Dumbbell, href: "/admin/session-types", cta: "Открыть типы" },
    { label: "Бронирования", desc: "Все активные и прошедшие бронирования, управление оплатой.", icon: CreditCard, href: "/admin/bookings", cta: "Открыть брони" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-muted-foreground mt-2">
          Добро пожаловать, <span className="font-semibold text-foreground">{profile.first_name}</span>. Сводка по текущему состоянию студии.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-muted-foreground tracking-tight">{s.label}</h3>
              <div className={`p-2 ${s.bg} rounded-lg group-hover:scale-110 transition-transform`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className={`text-xs font-medium mt-2 flex items-center gap-1 ${s.trendColor}`}>
              {s.trendColor === "text-green-500" && <TrendingUp className="w-3 h-3" />}
              {s.trend}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {quickActions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-between min-h-[200px] hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <a.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{a.label}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
              {a.cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      {recentBookings && recentBookings.length > 0 && (
        <div className="rounded-2xl border bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Последние бронирования</h2>
            <Link href="/admin/bookings" className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-1">
              Все <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y">
            {recentBookings.map((b) => {
              const u = b.users_profile as any
              const s = b.sessions as any
              return (
                <div key={b.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{u?.first_name} {u?.last_name}</p>
                    <p className="text-xs text-muted-foreground">{s?.title ?? "—"}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${b.is_paid ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                    {b.is_paid ? "Оплачено" : "Не оплачено"}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
