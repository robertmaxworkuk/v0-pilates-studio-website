import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { UserEditForm } from "./user-edit-form";

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const adminDb = createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const [{ data: profile }, { data: bookings }] = await Promise.all([
    adminDb
      .from("users_profile")
      .select("*")
      .eq("id", id)
      .single(),
    adminDb
      .from("bookings")
      .select("id, status, booked_at, is_paid, sessions(title, start_time, location)")
      .eq("user_id", id)
      .order("booked_at", { ascending: false })
      .limit(20),
  ]);

  if (!profile) notFound();

  const statusColors: Record<string, string> = {
    booked: "bg-blue-500/10 text-blue-600",
    attended: "bg-green-500/10 text-green-600",
    no_show: "bg-orange-500/10 text-orange-600",
    cancelled_by_user: "bg-muted text-muted-foreground",
    cancelled_by_admin: "bg-destructive/10 text-destructive",
  };
  const statusLabels: Record<string, string> = {
    booked: "Забронировано",
    attended: "Посетил",
    no_show: "Прогул",
    cancelled_by_user: "Отменено клиентом",
    cancelled_by_admin: "Отменено администратором",
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{profile.first_name} {profile.last_name}</h1>
          <p className="text-muted-foreground text-sm">Профиль клиента</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm space-y-3">
          <h2 className="font-semibold mb-4">Контактные данные</h2>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{profile.email}</span>
          </div>
          {profile.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{profile.phone}</span>
            </div>
          )}
          {profile.city && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{profile.city}{profile.country ? `, ${profile.country}` : ""}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>С нами с {format(new Date(profile.created_at), "d MMMM yyyy", { locale: ru })}</span>
          </div>
        </div>

        <div className="rounded-2xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Статус аккаунта</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Роль</span>
              <span className="font-medium capitalize">{profile.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Статус</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${profile.status === "active" ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
                {profile.status === "active" ? "Активен" : "Заблокирован"}
              </span>
            </div>
          </div>
        </div>

        <UserEditForm
          userId={profile.id}
          initialValues={{
            first_name: profile.first_name ?? "",
            last_name: profile.last_name ?? "",
            phone: profile.phone ?? "",
            city: profile.city ?? "",
            country: profile.country ?? "",
            role: profile.role ?? "user",
            status: profile.status ?? "active",
          }}
        />
      </div>

      {/* Bookings */}
      <div className="rounded-2xl border bg-card/60 backdrop-blur-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">История бронирований</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/20">
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Занятие</th>
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium hidden md:table-cell">Дата</th>
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Статус</th>
                <th className="text-left px-4 py-2.5 text-muted-foreground font-medium">Оплата</th>
              </tr>
            </thead>
            <tbody>
              {(bookings ?? []).map((b) => {
                const session = b.sessions as any;
                return (
                  <tr key={b.id} className="border-b last:border-b-0 hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium">{session?.title ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{session?.location ?? ""}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                      {session?.start_time ? format(new Date(session.start_time), "d MMM, HH:mm", { locale: ru }) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[b.status] ?? ""}`}>
                        {statusLabels[b.status] ?? b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${b.is_paid ? "text-green-600" : "text-muted-foreground"}`}>
                        {b.is_paid ? "Оплачено" : "Не оплачено"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {(!bookings || bookings.length === 0) && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Нет бронирований</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
