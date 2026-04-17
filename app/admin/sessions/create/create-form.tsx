"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { createSessionAction } from "@/lib/actions/admin";
import { motion } from "framer-motion";

type SessionType = {
  id: string;
  title: string;
  default_price: number;
  default_capacity: number;
  default_duration_minutes: number;
};

type Trainer = { id: string; first_name: string; last_name: string };

export function CreateSessionForm({ sessionTypes, trainers }: { sessionTypes: SessionType[]; trainers: Trainer[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    type_id: sessionTypes[0]?.id ?? "",
    instructor_id: trainers[0]?.id ?? "",
    title: sessionTypes[0]?.title ?? "",
    description: "",
    price: sessionTypes[0]?.default_price ?? 0,
    max_capacity: sessionTypes[0]?.default_capacity ?? 6,
    location: "",
    start_time: "",
    end_time: "",
  });

  const handleTypeChange = (typeId: string) => {
    const type = sessionTypes.find(t => t.id === typeId);
    if (type) {
      setForm(f => ({
        ...f,
        type_id: typeId,
        title: type.title,
        price: type.default_price,
        max_capacity: type.default_capacity,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.start_time || !form.end_time || !form.location) {
      toast.error("Заполните все обязательные поля");
      return;
    }
    startTransition(async () => {
      const result = await createSessionAction({
        ...form,
        price: Number(form.price),
        max_capacity: Number(form.max_capacity),
      });
      if (result.error) { toast.error(result.error); return; }
      toast.success("Занятие добавлено в расписание");
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
            onChange={e => handleTypeChange(e.target.value)}
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
            onChange={e => setForm({...form, title: e.target.value})}
            className={inputClass}
            placeholder="Будет заполнено из типа занятия"
            required
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-muted-foreground">Описание</label>
          <textarea
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            className={`${inputClass} resize-none`}
            rows={2}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Тренер *</label>
          <select
            value={form.instructor_id}
            onChange={e => setForm({...form, instructor_id: e.target.value})}
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
            onChange={e => setForm({...form, location: e.target.value})}
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
            onChange={e => setForm({...form, start_time: e.target.value})}
            className={inputClass}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Конец *</label>
          <input
            type="datetime-local"
            value={form.end_time}
            onChange={e => setForm({...form, end_time: e.target.value})}
            className={inputClass}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Цена (₽)</label>
          <input
            type="number"
            value={form.price}
            onChange={e => setForm({...form, price: Number(e.target.value)})}
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Мест</label>
          <input
            type="number"
            value={form.max_capacity}
            onChange={e => setForm({...form, max_capacity: Number(e.target.value)})}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-sm hover:bg-primary/90 disabled:opacity-50 transition-all"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Сохранение..." : "Создать занятие"}
        </button>
      </div>
    </motion.form>
  );
}
