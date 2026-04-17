"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import { updateSessionAction } from "@/lib/actions/admin";
import { motion } from "framer-motion";
import { format } from "date-fns";

type SessionType = { id: string; title: string; default_price: number; default_capacity: number };
type Trainer = { id: string; first_name: string; last_name: string };

type Session = {
  id: string;
  type_id: string;
  instructor_id: string;
  title: string;
  description: string | null;
  price: number;
  max_capacity: number;
  location: string;
  start_time: string;
  end_time: string;
  status: string;
};

// Convert ISO string to datetime-local value
function toLocalDatetime(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface EditSessionFormProps {
  session: Session;
  sessionTypes: SessionType[];
  trainers: Trainer[];
}

export function EditSessionForm({ session, sessionTypes, trainers }: EditSessionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    type_id: session.type_id,
    instructor_id: session.instructor_id,
    title: session.title,
    description: session.description ?? "",
    price: session.price,
    max_capacity: session.max_capacity,
    location: session.location,
    start_time: toLocalDatetime(session.start_time),
    end_time: toLocalDatetime(session.end_time),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.start_time || !form.end_time || !form.location || !form.title) {
      toast.error("Заполните все обязательные поля");
      return;
    }
    startTransition(async () => {
      const result = await updateSessionAction(session.id, {
        ...form,
        price: Number(form.price),
        max_capacity: Number(form.max_capacity),
        start_time: new Date(form.start_time).toISOString(),
        end_time: new Date(form.end_time).toISOString(),
      });
      if (result.error) { toast.error(result.error); return; }
      toast.success("Занятие обновлено");
      router.push("/admin/sessions");
    });
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-muted-foreground">Тип занятия *</label>
          <select
            value={form.type_id}
            onChange={e => {
              const type = sessionTypes.find(t => t.id === e.target.value);
              setForm(f => ({ ...f, type_id: e.target.value, title: type?.title ?? f.title }));
            }}
            className={inputClass}
          >
            {sessionTypes.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-muted-foreground">Название занятия *</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className={inputClass}
            required
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-muted-foreground">Описание</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className={`${inputClass} resize-none`}
            rows={2}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Тренер *</label>
          <select
            value={form.instructor_id}
            onChange={e => setForm({ ...form, instructor_id: e.target.value })}
            className={inputClass}
          >
            {trainers.map(t => (
              <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Зал / Место *</label>
          <input
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className={inputClass}
            placeholder="Зал реформеров"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Начало *</label>
          <input
            type="datetime-local"
            value={form.start_time}
            onChange={e => setForm({ ...form, start_time: e.target.value })}
            className={inputClass}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Конец *</label>
          <input
            type="datetime-local"
            value={form.end_time}
            onChange={e => setForm({ ...form, end_time: e.target.value })}
            className={inputClass}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Цена (₽)</label>
          <input
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
            className={inputClass}
            min={0}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Мест</label>
          <input
            type="number"
            value={form.max_capacity}
            onChange={e => setForm({ ...form, max_capacity: Number(e.target.value) })}
            className={inputClass}
            min={1}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/sessions")}
          className="px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Назад
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-sm hover:bg-primary/90 disabled:opacity-50 transition-all"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isPending ? "Сохранение..." : "Сохранить изменения"}
        </button>
      </div>
    </motion.form>
  );
}
