"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Search, CreditCard, XCircle } from "lucide-react";
import { updateBookingPaymentAction, cancelBookingAdminAction } from "@/lib/actions/admin";

type Booking = {
  id: string;
  status: string;
  is_paid: boolean;
  booked_at: string;
  sessions: { title: string; start_time: string; location: string } | null;
  users_profile: { first_name: string; last_name: string; email: string } | null;
};

const STATUS_COLORS: Record<string, string> = {
  booked: "bg-blue-500/10 text-blue-600",
  attended: "bg-green-500/10 text-green-600",
  no_show: "bg-orange-500/10 text-orange-600",
  cancelled_by_user: "bg-muted text-muted-foreground",
  cancelled_by_admin: "bg-destructive/10 text-destructive",
};
const STATUS_LABELS: Record<string, string> = {
  booked: "Забронировано",
  attended: "Посетил",
  no_show: "Прогул",
  cancelled_by_user: "Отменено клиентом",
  cancelled_by_admin: "Отменено администратором",
};

export function BookingsClient({ bookings }: { bookings: Booking[] }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = bookings.filter(b => {
    const user = b.users_profile;
    if (!user) return false;
    const name = `${user.first_name} ${user.last_name}`.toLowerCase();
    return name.includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase());
  });

  const togglePayment = (id: string, isPaid: boolean) => {
    startTransition(async () => {
      const result = await updateBookingPaymentAction(id, !isPaid);
      if (result.error) toast.error(result.error);
      else toast.success(!isPaid ? "Оплата подтверждена" : "Оплата отменена");
    });
  };

  const cancelBooking = (id: string) => {
    startTransition(async () => {
      const result = await cancelBookingAdminAction(id);
      if (result.error) toast.error(result.error);
      else toast.success("Бронирование отменено");
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск по клиенту..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="rounded-2xl border bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Клиент</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Занятие</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Статус</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Оплата</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <motion.tr
                  key={b.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b last:border-b-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{b.users_profile?.first_name} {b.users_profile?.last_name}</div>
                    <div className="text-xs text-muted-foreground">{b.users_profile?.email}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="font-medium">{b.sessions?.title ?? "—"}</div>
                    <div className="text-xs text-muted-foreground">
                      {b.sessions?.start_time
                        ? format(new Date(b.sessions.start_time), "d MMM, HH:mm", { locale: ru })
                        : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[b.status] ?? ""}`}>
                      {STATUS_LABELS[b.status] ?? b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePayment(b.id, b.is_paid)}
                      disabled={isPending || b.status.startsWith("cancelled")}
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors disabled:opacity-40 ${
                        b.is_paid
                          ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                          : "bg-muted hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <CreditCard className="w-3 h-3" />
                      {b.is_paid ? "Оплачено" : "Отметить"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {b.status === "booked" && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        disabled={isPending}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                        title="Отменить бронирование"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Ничего не найдено</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
