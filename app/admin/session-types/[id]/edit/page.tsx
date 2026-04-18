import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { EditSessionTypeForm } from "./edit-form";

export const metadata = { title: "Редактировать тип занятия | Pilatta Admin" };

export default async function EditSessionTypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const adminDb = createAdminClient();
  const { data: sessionType } = await adminDb
    .from("session_types")
    .select("id, title, description, default_price, default_capacity, default_duration_minutes, is_active")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (!sessionType) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/session-types"
          className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Редактировать тип занятия</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">{sessionType.title}</p>
        </div>
      </div>

      <EditSessionTypeForm sessionType={sessionType} />
    </div>
  );
}
