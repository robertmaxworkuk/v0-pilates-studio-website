import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format, isToday, isTomorrow } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import { Clock, MapPin, Users, ChevronRight } from "lucide-react";

export const metadata = { title: "Мои занятия | Pilatta" };

export default async function TrainerSchedulePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: sessions } = await supabase
    .from("sessions")
    .select("id, title, start_time, end_time, location, max_capacity, status")
    .eq("instructor_id", user.id)
    .gte("start_time", new Date().toISOString())
    .order("start_time", { ascending: true });

  const groupLabel = (dt: string) => {
    const d = new Date(dt);
    if (isToday(d)) return "Сегодня";
    if (isTomorrow(d)) return "Завтра";
    return format(d, "d MMMM yyyy", { locale: ru });
  };

  const grouped = (sessions ?? []).reduce<Record<string, typeof sessions>>((acc, s) => {
    if (!s) return acc;
    const label = groupLabel(s.start_time);
    if (!acc[label]) acc[label] = [];
    acc[label]!.push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Мои занятия</h1>
        <p className="text-muted-foreground mt-1">Ваше расписание на ближайшее время.</p>
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="rounded-2xl border bg-card/60 p-10 text-center">
          <p className="text-muted-foreground">У вас нет запланированных занятий.</p>
        </div>
      )}

      {Object.entries(grouped).map(([label, group]) => (
        <div key={label} className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{label}</h2>
          {(group ?? []).map(s => s && (
            <Link
              key={s.id}
              href={`/trainer/sessions/${s.id}/attendance`}
              className="block rounded-2xl border bg-card/60 backdrop-blur-sm p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(s.start_time), "HH:mm")} – {format(new Date(s.end_time), "HH:mm")}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {s.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      до {s.max_capacity} чел.
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-3" />
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
