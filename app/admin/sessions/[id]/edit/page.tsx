import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditSessionForm } from "./edit-form";

export const metadata = { title: "Редактировать занятие | Pilatta Admin" };

export default async function EditSessionPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const [{ data: session }, { data: sessionTypes }, { data: trainers }] = await Promise.all([
    supabase.from("sessions").select("*").eq("id", params.id).single(),
    supabase.from("session_types").select("id, title, default_price, default_capacity").eq("is_active", true),
    supabase.from("users_profile").select("id, first_name, last_name").in("role", ["trainer", "admin"]),
  ]);

  if (!session) return notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/sessions"
          className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Редактировать занятие</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">{session.title}</p>
        </div>
      </div>

      <EditSessionForm
        session={session}
        sessionTypes={sessionTypes ?? []}
        trainers={trainers ?? []}
      />
    </div>
  );
}
