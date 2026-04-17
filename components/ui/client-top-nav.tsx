"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CalendarDays, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/global/theme-toggle";

const NAV_LINKS = [
  { name: "Профиль", href: "/profile", icon: LayoutDashboard },
  { name: "Расписание", href: "/schedule", icon: CalendarDays },
];

interface ClientTopNavProps {
  userEmail: string;
  initials: string;
  fullName?: string;
}

export function ClientTopNav({ userEmail, initials, fullName }: ClientTopNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <>
      {/* ── Desktop Navigation ────────────────────────────── */}
      <nav className="mr-8 hidden md:flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="desktop-nav-pill"
                  className="absolute inset-0 bg-primary/10 rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="relative w-4 h-4 shrink-0" />
              <span className="relative">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── User Actions ─────────────────────────────────── */}
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative w-9 h-9 rounded-full ring-2 ring-transparent transition-colors hover:ring-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Avatar className="w-9 h-9 border shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                {fullName && (
                  <p className="text-sm font-semibold leading-none">{fullName}</p>
                )}
                <p className={cn(
                  "leading-none text-muted-foreground truncate",
                  fullName ? "text-xs mt-1" : "text-sm font-medium"
                )}>
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer flex items-center">
                <User className="mr-2 w-4 h-4" />
                Мой профиль
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer flex items-center"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 w-4 h-4" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Mobile Bottom Tab Bar ─────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t safe-bottom">
        <div className="flex items-center h-16 px-4">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-pill"
                    className="absolute top-0 inset-x-4 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { scale: 1 } : { scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
                </motion.div>
                <span className="text-[10px] font-medium">{link.name}</span>
              </Link>
            );
          })}

          {/* Mobile sign-out */}
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">Выйти</span>
          </button>
        </div>
      </div>
    </>
  );
}
