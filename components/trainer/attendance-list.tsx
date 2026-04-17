"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, X, User } from "lucide-react";
import { markAttendanceAction } from "@/lib/actions/trainer";

type Booking = {
  id: string;
  status: string;
  is_paid: boolean;
  users_profile: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string | null;
  } | null;
};

const STATUS_LABELS: Record<string, string> = {
  booked: "Ожидается",
  attended: "Пришёл",
  no_show: "Прогул",
};

const STATUS_COLORS: Record<string, string> = {
  booked: "bg-blue-500/10 text-blue-600",
  attended: "bg-green-500/10 text-green-600",
  no_show: "bg-orange-500/10 text-orange-600",
};

export function AttendanceList({ bookings, sessionId }: { bookings: Booking[]; sessionId: string }) {
  const [isPending, startTransition] = useTransition();

  const mark = (bookingId: string, status: "attended" | "no_show") => {
    startTransition(async () => {
      const result = await markAttendanceAction(bookingId, status);
      if (result.error) toast.error(result.error);
      else toast.success(status === "attended" ? "Отмечен как присутствующий" : "Отмечен как прогул");
    });
  };

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border bg-card/60 p-10 text-center">
        <p className="text-muted-foreground">На это занятие нет записей.</p>
      </div>
    );
  }

  const attended = bookings.filter(b => b.status === "attended").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-green-500/10 text-green-600 px-3 py-1.5 text-sm font-medium">
          ✓ Пришли: {attended} / {bookings.length}
        </div>
      </div>

      <div className="space-y-2">
        {bookings.map((b, i) => {
          const u = b.users_profile;
          if (!u) return null;
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl border bg-card/60 backdrop-blur-sm p-4 shadow-sm"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                {u.first_name[0]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium">{u.first_name} {u.last_name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>

              {/* Status badge */}
              <span className={`hidden md:inline text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[b.status] ?? ""}`}>
                {STATUS_LABELS[b.status] ?? b.status}
              </span>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => mark(b.id, "attended")}
                  disabled={isPending || b.status === "attended"}
                  className={`p-2 rounded-xl transition-all ${
                    b.status === "attended"
                      ? "bg-green-500/20 text-green-600 cursor-default"
                      : "hover:bg-green-500/10 hover:text-green-600"
                  }`}
                  title="Пришёл"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => mark(b.id, "no_show")}
                  disabled={isPending || b.status === "no_show"}
                  className={`p-2 rounded-xl transition-all ${
                    b.status === "no_show"
                      ? "bg-orange-500/20 text-orange-600 cursor-default"
                      : "hover:bg-orange-500/10 hover:text-orange-600"
                  }`}
                  title="Прогул"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
