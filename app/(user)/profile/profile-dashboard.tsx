"use client";

import { motion } from "framer-motion";
import { User, Activity, Settings, CreditCard, ChevronRight } from "lucide-react";
import { SessionCard } from "@/components/ui/session-card";
import Link from "next/link";

interface ProfileDashboardProps {
  profile: any;
  email: string | undefined;
  upcomingSession: any | null;
}

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export function ProfileDashboard({ profile, email, upcomingSession }: ProfileDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Личный кабинет</h1>
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground/90">
            С возвращением, {profile?.first_name || 'Гость'}! Продолжайте заботиться о себе вместе с нашими профессиональными тренерами.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Раскройте свой потенциал с <span className="font-semibold text-primary">Pilatta</span>. 
            Присоединяйтесь к комьюнити профессионалов и найдите свой идеальный баланс между телом и разумом.
          </p>
        </div>
      </div>

      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Card 1: User Profile */}
        <motion.div variants={itemVars} className="md:col-span-1 rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <User className="w-24 h-24" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mb-4 ring-4 ring-background">
                {profile?.first_name?.[0] || 'U'}
              </div>
              <h2 className="text-xl font-bold">{profile?.first_name} {profile?.last_name}</h2>
              <p className="text-muted-foreground text-sm font-medium">{email}</p>
            </div>
            <Link 
              href="/profile/edit"
              className="pt-4 border-t border-border/50 flex items-center justify-between text-sm font-medium text-foreground/80 hover:text-primary cursor-pointer transition-colors"
            >
              Редактировать профиль
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.div>

        {/* Card 2 & 3: Only visible for regular users */}
        {(!profile?.role || profile.role === 'user') && (
          <>
            <motion.div variants={itemVars} className="md:col-span-2 rounded-3xl border bg-gradient-to-br from-primary/5 via-background to-background p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Мой абонемент</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-green-500/10 text-green-600 rounded-full">Активен</span>
              </div>
              
              <Link href="/schedule" className="space-y-3 group block">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1 group-hover:text-primary transition-colors">Осталось занятий</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold group-hover:text-primary transition-colors">8</span>
                      <span className="text-muted-foreground font-medium">/ 10</span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Действует до 25.05.2026</p>
                </div>
                
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full group-hover:bg-primary/80 transition-colors" 
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVars} className="md:col-span-2 rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-accent/10 rounded-xl">
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Ближайшая тренировка</h3>
              </div>
              
              {upcomingSession ? (
                <SessionCard session={upcomingSession} compact />
              ) : (
                 <Link href="/schedule" className="flex-1 flex flex-col items-center justify-center py-6 text-center border-2 border-dashed rounded-2xl hover:bg-muted/50 transition-colors">
                   <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                     <span className="text-xl">🧘</span>
                   </div>
                   <p className="text-sm text-foreground/80 mb-2 font-medium">У вас нет предстоящих занятий</p>
                   <span className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                     Перейти к расписанию
                   </span>
                 </Link>
              )}
            </motion.div>
          </>
        )}

        {/* Card 4: Settings */}
        <motion.div variants={itemVars} className="md:col-span-1 rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:border-primary/30 transition-colors group">
          <Link href="/profile/settings" className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-secondary rounded-xl group-hover:bg-primary/10 transition-colors">
                  <Settings className="w-5 h-5 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-lg">Настройки</h3>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Смена темы, пароля и управление аккаунтом
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
