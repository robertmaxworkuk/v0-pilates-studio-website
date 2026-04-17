import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { SessionsClient } from "./sessions-client";

export const metadata = { title: "Расписание | Pilatta Admin" };

export default async function AdminSessionsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const [{ data: sessions }, { data: sessionTypes }, { data: trainers }] = await Promise.all([
    supabase
      .from("sessions")
      .select("*, session_types(title), users_profile!instructor_id(first_name, last_name)")
      .order("start_time", { ascending: true })
      .gte("start_time", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from("session_types").select("id, title").eq("is_active", true),
    supabase.from("users_profile").select("id, first_name, last_name").in("role", ["trainer", "admin"]),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Расписание</h1>
          <p className="text-muted-foreground mt-1">Управление занятиями студии.</p>
        </div>
        <Link
          href="/admin/sessions/create"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить занятие
        </Link>
      </div>
      <SessionsClient sessions={sessions ?? []} />
    </div>
  );
}
