"use client";

import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { ru } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { SessionCard } from "@/components/ui/session-card";
import { cn } from "@/lib/utils";

interface ScheduleClientProps {
  sessions: any[];
}

export function ScheduleClient({ sessions }: ScheduleClientProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate next 7 days for the pill slider
  const dates = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i));

  // Filter sessions for the selected day
  const filteredSessions = sessions.filter((s) => 
    isSameDay(new Date(s.start_time), selectedDate)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Расписание занятий</h1>
        <p className="text-muted-foreground mt-2">
          Выберите день и запишитесь на тренировку
        </p>
      </div>

      {/* Days Slider */}
      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-4">
          {dates.map((date, idx) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-[72px] h-[88px] rounded-2xl border transition-all snap-start",
                  isSelected 
                    ? "border-primary bg-primary text-primary-foreground shadow-md" 
                    : "bg-card border-border hover:border-primary/50 text-card-foreground"
                )}
              >
                <span className={cn("text-xs font-semibold uppercase mb-1 opacity-80")}>
                  {format(date, "EEEEEE", { locale: ru })}
                </span>
                <span className="text-xl font-bold">
                  {format(date, "d")}
                </span>
                
                {isSelected && (
                  <motion.div
                    layoutId="active-day-pill"
                    className="absolute inset-0 rounded-2xl bg-primary border-primary -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sessions List with AnimatePresence */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredSessions.length > 0 ? (
            <motion.div
              key={selectedDate.toISOString()}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSessions.map((session, idx) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <SessionCard session={session} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed rounded-3xl bg-card/30"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="text-lg font-semibold">На этот день тренировок нет</h3>
              <p className="text-muted-foreground mt-1 max-w-sm">
                Выберите другую дату или забронируйте индивидуальное занятие.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
