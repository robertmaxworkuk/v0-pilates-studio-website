"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";
import { updateSessionTypeAction } from "@/lib/actions/admin";

type SessionType = {
  id: string;
  title: string;
  description: string | null;
  default_price: number;
  default_capacity: number;
  default_duration_minutes: number;
};

export function EditSessionTypeForm({ sessionType }: { sessionType: SessionType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    title: sessionType.title,
    description: sessionType.description ?? "",
    default_price: sessionType.default_price,
    default_capacity: sessionType.default_capacity,
    default_duration_minutes: sessionType.default_duration_minutes,
  });

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Название обязательно");
      return;
    }

    startTransition(async () => {
      const result = await updateSessionTypeAction(sessionType.id, {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        default_price: Number(form.default_price),
        default_capacity: Number(form.default_capacity),
        default_duration_minutes: Number(form.default_duration_minutes),
      });

      if (result.error) {
        toast.error("Ошибка обновления", { description: result.error });
        return;
      }

      toast.success("Тип занятия обновлен");
      router.push("/admin/session-types");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Название *</label>
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className={inputClass}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Описание</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          className={`${inputClass} resize-none`}
          rows={3}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Цена (₽)</label>
          <input
            type="number"
            min={0}
            value={form.default_price}
            onChange={(e) => setForm((prev) => ({ ...prev, default_price: Number(e.target.value) }))}
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Мест</label>
          <input
            type="number"
            min={1}
            value={form.default_capacity}
            onChange={(e) => setForm((prev) => ({ ...prev, default_capacity: Number(e.target.value) }))}
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Длительность (мин)</label>
          <input
            type="number"
            min={1}
            value={form.default_duration_minutes}
            onChange={(e) => setForm((prev) => ({ ...prev, default_duration_minutes: Number(e.target.value) }))}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => router.push("/admin/session-types")}
          className="px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Назад
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full disabled:opacity-60"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isPending ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </form>
  );
}
