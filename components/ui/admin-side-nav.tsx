"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Calendar, BookOpen, Dumbbell, ChevronLeft, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/sessions", label: "Расписание", icon: Calendar },
  { href: "/admin/session-types", label: "Типы занятий", icon: Dumbbell },
  { href: "/admin/bookings", label: "Бронирования", icon: BookOpen },
];

interface AdminSideNavProps {
  firstName: string;
  lastName: string;
  role: string;
}

export function AdminSideNav({ firstName, lastName, role }: AdminSideNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <aside className="w-full md:w-64 md:min-h-screen border-r bg-background/80 backdrop-blur-sm shrink-0 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b shrink-0">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
          <span className="text-primary">Pilatta</span>
          <span className="text-muted-foreground text-sm font-medium">Admin</span>
        </Link>
      </div>

      {/* User card */}
      <div className="p-4 border-b shrink-0">
        <div className="px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground mb-0.5">Вы вошли как</p>
          <p className="text-sm font-semibold truncate">{firstName} {lastName}</p>
          <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-md font-medium capitalize mt-1 inline-block">
            {role}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-nav-pill"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="relative w-4 h-4 shrink-0" />
              <span className="relative">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-4 border-t shrink-0 flex flex-col gap-1">
        <Link
          href="/profile"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Вернуться в профиль
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          Выйти
        </button>
      </div>
    </aside>
  );
}
