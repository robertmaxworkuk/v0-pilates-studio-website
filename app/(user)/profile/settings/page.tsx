import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsClient } from "./settings-client";

export const metadata = { title: "Настройки | Pilatta" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("users_profile")
    .select("email, first_name, last_name, role, status")
    .eq("id", user.id)
    .single();

  if (profile?.status === "blocked") redirect("/profile");

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
          <p className="text-muted-foreground mt-2">
            Управление аккаунтом и параметрами безопасности.
          </p>
        </div>
        <SettingsClient email={user.email ?? ""} profile={profile} />
      </div>
    </div>
  );
}
