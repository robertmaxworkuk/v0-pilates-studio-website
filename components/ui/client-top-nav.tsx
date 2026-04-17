"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CalendarDays, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export function ClientTopNav({ userEmail, initials }: { userEmail: string, initials: string }) {
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
      {/* Desktop Navigation */}
      <div className="mr-8 hidden md:flex items-center space-x-6">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-primary pb-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {link.name}
              </div>
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* User Actions */}
      <div className="ml-auto flex items-center space-x-4">
        <ThemeToggle />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="relative w-9 h-9 rounded-full ring-2 ring-transparent transition-all hover:ring-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Avatar className="w-9 h-9 border shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Личный кабинет</p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer flex items-center">
                <User className="mr-2 w-4 h-4" />
                Профиль
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer flex items-center"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 w-4 h-4" />
              Выход
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t pb-safe">
        <div className="flex justify-around items-center h-16">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-mobile-tab"
                    className="absolute top-0 w-12 h-1 bg-primary rounded-b-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <Icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
                <span className="text-[10px] font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
