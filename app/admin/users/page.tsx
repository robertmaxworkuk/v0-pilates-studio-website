import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UsersClient } from "./users-client";

export const metadata = { title: "Пользователи | Pilatta Admin" };

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: users, error } = await supabase
    .from("users_profile")
    .select("id, email, first_name, last_name, phone, role, status, created_at")
    .order("created_at", { ascending: false });

  if (error) return <p className="text-destructive">Ошибка загрузки: {error.message}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Пользователи</h1>
        <p className="text-muted-foreground mt-1">Управление клиентами и сотрудниками студии.</p>
      </div>
      <UsersClient users={users ?? []} />
    </div>
  );
}
