"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateUserProfileAdminAction } from "@/lib/actions/admin";

type UserEditValues = {
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  country: string;
  role: "user" | "client" | "trainer" | "admin";
  status: "active" | "blocked";
};

const ROLES: Array<UserEditValues["role"]> = ["user", "client", "trainer", "admin"];

export function UserEditForm({
  userId,
  initialValues,
}: {
  userId: string;
  initialValues: UserEditValues;
}) {
  const [form, setForm] = useState<UserEditValues>(initialValues);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await updateUserProfileAdminAction(userId, form);
      if (result.error) {
        toast.error("Ошибка обновления", { description: result.error });
        return;
      }
      toast.success("Данные пользователя обновлены");
    });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm space-y-4">
      <h2 className="font-semibold">Редактирование профиля</h2>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Имя</span>
          <input
            value={form.first_name}
            onChange={(e) => setForm((prev) => ({ ...prev, first_name: e.target.value }))}
            className="w-full rounded-lg border bg-background px-3 py-2"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Фамилия</span>
          <input
            value={form.last_name}
            onChange={(e) => setForm((prev) => ({ ...prev, last_name: e.target.value }))}
            className="w-full rounded-lg border bg-background px-3 py-2"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Телефон</span>
          <input
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full rounded-lg border bg-background px-3 py-2"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Город</span>
          <input
            value={form.city}
            onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
            className="w-full rounded-lg border bg-background px-3 py-2"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Страна</span>
          <input
            value={form.country}
            onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
            className="w-full rounded-lg border bg-background px-3 py-2"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Роль</span>
          <select
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as UserEditValues["role"] }))}
            className="w-full rounded-lg border bg-background px-3 py-2"
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Статус</span>
          <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as "active" | "blocked" }))}
            className="w-full rounded-lg border bg-background px-3 py-2"
          >
            <option value="active">active</option>
            <option value="blocked">blocked</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-60"
      >
        {isPending ? "Сохранение..." : "Сохранить изменения"}
      </button>
    </form>
  );
}
