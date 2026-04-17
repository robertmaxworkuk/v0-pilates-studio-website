import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SessionTypesClient } from "./session-types-client";

export const metadata = { title: "Типы занятий | Pilatta Admin" };

export default async function SessionTypesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: sessionTypes } = await supabase
    .from("session_types")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Типы занятий</h1>
        <p className="text-muted-foreground mt-1">Справочник шаблонов тренировок. Используются для создания занятий в расписании.</p>
      </div>
      <SessionTypesClient sessionTypes={sessionTypes ?? []} />
    </div>
  );
}
