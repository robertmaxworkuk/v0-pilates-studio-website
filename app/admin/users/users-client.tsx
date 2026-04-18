"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Search, Shield, ShieldOff, UserCog } from "lucide-react";
import { updateUserRoleAction, updateUserStatusAction } from "@/lib/actions/admin";
import Link from "next/link";

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  role: string;
  status: string;
  created_at: string;
};

const ROLES = ["user", "client", "trainer", "admin"];
const ROLE_LABELS: Record<string, string> = {
  user: "Пользователь",
  client: "Клиент",
  trainer: "Тренер",
  admin: "Администратор",
};
const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500/10 text-green-600",
  blocked: "bg-destructive/10 text-destructive",
};

export function UsersClient({ users }: { users: User[] }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = users.filter((u) => {
    const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
    return fullName.includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
  });

  const handleRoleChange = (userId: string, role: string) => {
    startTransition(async () => {
      const result = await updateUserRoleAction(userId, role);
      if (result.error) toast.error("Ошибка", { description: result.error });
      else toast.success("Роль обновлена");
    });
  };

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    startTransition(async () => {
      const result = await updateUserStatusAction(userId, newStatus as "active" | "blocked");
      if (result.error) toast.error("Ошибка", { description: result.error });
      else toast.success(newStatus === "blocked" ? "Пользователь заблокирован" : "Пользователь разблокирован");
    });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск по имени или email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <p className="text-sm text-muted-foreground">Найдено: {filtered.length}</p>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((u) => (
          <div key={u.id} className="rounded-2xl border bg-card/60 backdrop-blur-sm p-4 shadow-sm space-y-4">
            <div className="space-y-1">
              <Link href={`/admin/users/${u.id}`} className="block hover:text-primary transition-colors">
                <div className="font-medium">{u.first_name} {u.last_name}</div>
                <div className="text-xs text-muted-foreground break-all">{u.email}</div>
              </Link>
              <div className="text-xs text-muted-foreground">{u.phone ?? "Телефон не указан"}</div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={u.role}
                disabled={isPending}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                className="min-w-[9rem] flex-1 text-xs rounded-lg border bg-background px-2 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/40"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </select>

              <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[u.status] ?? ""}`}>
                {u.status === "active" ? "Активен" : "Заблокирован"}
              </span>

              <button
                disabled={isPending}
                onClick={() => handleStatusToggle(u.id, u.status)}
                className="ml-auto p-2 rounded-lg hover:bg-muted transition-colors"
                title={u.status === "active" ? "Заблокировать" : "Разблокировать"}
              >
                {u.status === "active"
                  ? <ShieldOff className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  : <Shield className="w-4 h-4 text-green-600" />
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="hidden md:block rounded-2xl border bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Пользователь</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Телефон</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Роль</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Статус</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b last:border-b-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${u.id}`} className="hover:text-primary transition-colors">
                      <div className="font-medium">{u.first_name} {u.last_name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {u.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      disabled={isPending}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="text-xs rounded-lg border bg-background px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/40"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[u.status] ?? ""}`}>
                      {u.status === "active" ? "Активен" : "Заблокирован"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={isPending}
                      onClick={() => handleStatusToggle(u.id, u.status)}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      title={u.status === "active" ? "Заблокировать" : "Разблокировать"}
                    >
                      {u.status === "active"
                        ? <ShieldOff className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        : <Shield className="w-4 h-4 text-green-600" />
                      }
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
