import { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

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
      <aside className="w-full md:w-64 md:min-h-screen border-r bg-background/80 backdrop-blur-sm shrink-0">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
            <span className="text-primary">Pilatta</span>
            <span className="text-muted-foreground text-sm font-medium">Тренер</span>
          </Link>
        </div>

        <div className="p-4">
          <div className="mb-4 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground">Тренер</p>
            <p className="text-sm font-semibold">{profile?.first_name} {profile?.last_name}</p>
          </div>

          <nav className="flex flex-col gap-1">
            <Link
              href="/trainer/schedule"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all group"
            >
              <Calendar className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
              Мои занятия
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t hidden md:block">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Вернуться в профиль
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
