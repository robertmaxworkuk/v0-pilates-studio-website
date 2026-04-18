"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, Check, Dumbbell } from "lucide-react";
import { createSessionTypeAction, updateSessionTypeAction, deleteSessionTypeAction } from "@/lib/actions/admin";
import Link from "next/link";

type SessionType = {
  id: string;
  title: string;
  description: string | null;
  default_price: number;
  default_capacity: number;
  default_duration_minutes: number;
  is_active: boolean;
};

const emptyForm = { title: "", description: "", default_price: 0, default_capacity: 6, default_duration_minutes: 55 };

export function SessionTypesClient({ sessionTypes }: { sessionTypes: SessionType[] }) {
  const [items, setItems] = useState(sessionTypes);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createSessionTypeAction({
        title: form.title,
        description: form.description || undefined,
        default_price: form.default_price,
        default_capacity: form.default_capacity,
        default_duration_minutes: form.default_duration_minutes,
      });
      if (result.error) { toast.error(result.error); return; }
      toast.success("Тип добавлен");
      setShowForm(false);
      setForm(emptyForm);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteSessionTypeAction(id);
      if (result.error) { toast.error(result.error); return; }
      toast.success("Тип деактивирован");
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-sm hover:bg-primary/90 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Добавить тип
      </button>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Новый тип занятия</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Название</label>
                <input
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Например: Пилатес на реформере"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Описание</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Цена (₽)</label>
                <input
                  type="number"
                  value={form.default_price}
                  onChange={e => setForm({...form, default_price: Number(e.target.value)})}
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Кол-во мест</label>
                <input
                  type="number"
                  value={form.default_capacity}
                  onChange={e => setForm({...form, default_capacity: Number(e.target.value)})}
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Длительность (мин)</label>
                <input
                  type="number"
                  value={form.default_duration_minutes}
                  onChange={e => setForm({...form, default_duration_minutes: Number(e.target.value)})}
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCreate}
                disabled={isPending || !form.title}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                Сохранить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sessionTypes.filter(st => st.is_active).map((st, i) => (
          <motion.div
            key={st.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border bg-card/60 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Dumbbell className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/session-types/${st.id}/edit`}
                  className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  title="Редактировать тип"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(st.id)}
                  disabled={isPending}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                  title="Деактивировать тип"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold mb-1">{st.title}</h3>
            {st.description && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{st.description}</p>}
            <div className="flex gap-3 text-xs text-muted-foreground border-t border-border/40 pt-3 mt-3">
              <span>{st.default_price.toLocaleString("ru-RU")} ₽</span>
              <span>•</span>
              <span>{st.default_capacity} мест</span>
              <span>•</span>
              <span>{st.default_duration_minutes} мин</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
