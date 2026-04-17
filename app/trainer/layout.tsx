import { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TrainerSideNav } from "@/components/ui/trainer-side-nav";

export default async function TrainerLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("users_profile")
    .select("role, first_name, last_name")
    .eq("id", user.id)
    .single();

  if (!["trainer", "admin", "superadmin"].includes(profile?.role ?? "")) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      <TrainerSideNav
        firstName={profile?.first_name ?? ""}
        lastName={profile?.last_name ?? ""}
      />

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
