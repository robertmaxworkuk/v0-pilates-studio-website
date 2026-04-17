"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { XCircle, MapPin, Clock, Users } from "lucide-react";
import { cancelSessionAction } from "@/lib/actions/admin";

type Session = {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  max_capacity: number;
  price: number;
  status: string;
  session_types: any;
  users_profile: any;
};

const STATUS_COLORS: Record<string, string> = {
  scheduled: "bg-blue-500/10 text-blue-600",
  ongoing: "bg-green-500/10 text-green-600",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};
const STATUS_LABELS: Record<string, string> = {
  scheduled: "Запланировано",
  ongoing: "Идёт",
  completed: "Завершено",
  cancelled: "Отменено",
};

export function SessionsClient({ sessions }: { sessions: Session[] }) {
  const [isPending, startTransition] = useTransition();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  const handleCancel = (id: string) => {
    if (!reason.trim()) { toast.error("Укажите причину отмены"); return; }
    startTransition(async () => {
      const result = await cancelSessionAction(id, reason);
      if (result.error) { toast.error(result.error); return; }
      toast.success("Занятие отменено и все брони обновлены");
      setCancellingId(null);
      setReason("");
    });
  };

  return (
    <div className="space-y-3">
      {sessions.length === 0 && (
        <div className="rounded-2xl border bg-card/60 p-10 text-center">
          <p className="text-muted-foreground">Нет предстоящих занятий. Добавьте первое!</p>
        </div>
      )}
      {sessions.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="rounded-2xl border bg-card/60 backdrop-blur-sm p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold">{s.title}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[s.status] ?? ""}`}>
                  {STATUS_LABELS[s.status] ?? s.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {format(new Date(s.start_time), "d MMM yyyy, HH:mm", { locale: ru })}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {s.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {s.max_capacity} мест
                </span>
                <span>{s.price.toLocaleString("ru-RU")} ₽</span>
              </div>
              {s.users_profile && (
                <p className="text-xs text-muted-foreground mt-1">
                  Тренер: {s.users_profile.first_name} {s.users_profile.last_name}
                </p>
              )}
            </div>
            {s.status === "scheduled" && (
              <button
                onClick={() => setCancellingId(cancellingId === s.id ? null : s.id)}
                className="p-2 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                title="Отменить занятие"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cancel form */}
          {cancellingId === s.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t space-y-3"
            >
              <p className="text-sm font-medium text-destructive">Отмена занятия — все бронирования также будут отменены.</p>
              <input
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Причина отмены..."
                className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-destructive/30"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleCancel(s.id)}
                  disabled={isPending}
                  className="px-4 py-2 bg-destructive text-destructive-foreground text-sm font-medium rounded-full hover:bg-destructive/90 disabled:opacity-50"
                >
                  Подтвердить отмену
                </button>
                <button
                  onClick={() => setCancellingId(null)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
