import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EditProfileForm } from "./edit-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Редактирование профиля | Pilatta" };

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("users_profile")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/profile");
  if (profile.status === "blocked") redirect("/profile");

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Редактирование профиля</h1>
          <p className="text-muted-foreground mt-2">
            Обновите ваши личные данные и контактную информацию.
          </p>
        </div>
        <EditProfileForm profile={profile} />
      </div>
    </div>
  );
}
