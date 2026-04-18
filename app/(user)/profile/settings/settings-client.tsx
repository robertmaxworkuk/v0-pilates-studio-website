"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { updateUserThemePreferenceAction, type ThemePreference } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import {
  Shield, Moon, Sun, Monitor, LogOut, Trash2, ChevronRight, Mail, User, Lock
} from "lucide-react";
import Link from "next/link";

interface SettingsClientProps {
  email: string;
  profile: { email: string; first_name: string; last_name: string; role: string } | null;
}

const itemVars = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export function SettingsClient({ email, profile }: SettingsClientProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const applyTheme = async (value: ThemePreference) => {
    setTheme(value);
    const result = await updateUserThemePreferenceAction(value);
    if (result?.error) {
      toast.error("Не удалось сохранить тему", { description: result.error });
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const handleChangePassword = () => {
    toast.info("Смена пароля", {
      description: "Письмо для смены пароля отправлено на " + email,
    });
    const supabase = createClient();
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
  };

  const themeOptions = [
    { value: "light", label: "Светлая", icon: Sun },
    { value: "dark", label: "Тёмная", icon: Moon },
    { value: "system", label: "Системная", icon: Monitor },
  ];

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-6">
      {/* Account Info */}
      <motion.div variants={itemVars} className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-xl">
            <User className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Аккаунт</h2>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-3 border-b border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </div>
            <span className="font-medium">{email}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Роль</span>
            </div>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full capitalize">
              {profile?.role ?? "user"}
            </span>
          </div>
          <Link
            href="/profile/edit"
            className="flex items-center justify-between py-3 hover:text-primary transition-colors cursor-pointer"
          >
            <span className="text-muted-foreground">Редактировать профиль</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div variants={itemVars} className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Sun className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Отображение</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Выберите тему интерфейса.</p>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => void applyTheme(value as ThemePreference)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-sm font-medium transition-all ${
                theme === value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div variants={itemVars} className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Безопасность</h2>
        </div>
        <div className="space-y-2">
          <button
            onClick={handleChangePassword}
            className="w-full flex items-center justify-between py-3 px-1 text-sm hover:text-primary transition-colors cursor-pointer border-b border-border/50"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Сменить пароль</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full flex items-center gap-2 py-3 px-1 text-sm text-destructive hover:text-destructive/80 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            {isSigningOut ? "Выход..." : "Выйти из аккаунта"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
