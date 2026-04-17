import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CreateSessionForm } from "./create-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Создать занятие | Pilatta Admin" };

export default async function CreateSessionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const [{ data: sessionTypes }, { data: trainers }] = await Promise.all([
    supabase.from("session_types").select("id, title, default_price, default_capacity, default_duration_minutes").eq("is_active", true),
    supabase.from("users_profile").select("id, first_name, last_name").in("role", ["trainer", "admin"]),
  ]);

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/sessions" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Новое занятие</h1>
          <p className="text-muted-foreground text-sm">Добавьте занятие в расписание студии.</p>
        </div>
      </div>
      <CreateSessionForm sessionTypes={sessionTypes ?? []} trainers={trainers ?? []} />
    </div>
  );
}
