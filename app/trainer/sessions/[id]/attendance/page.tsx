import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AttendanceList } from "@/components/trainer/attendance-list";

export default async function AttendancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const [{ data: session }, { data: bookings }] = await Promise.all([
    supabase
      .from("sessions")
      .select("*, users_profile!instructor_id(id)")
      .eq("id", id)
      .single(),
    supabase
      .from("bookings")
      .select("id, status, is_paid, users_profile!user_id(id, first_name, last_name, email, avatar_url)")
      .eq("session_id", id)
      .in("status", ["booked", "attended", "no_show"]),
  ]);

  if (!session) notFound();

  // Ensure only this session's trainer can access
  if ((session as any).users_profile?.id !== user.id) {
    redirect("/trainer/schedule");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/trainer/schedule" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{session.title}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {format(new Date(session.start_time), "d MMMM, HH:mm", { locale: ru })}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {session.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {bookings?.length ?? 0} / {session.max_capacity}
            </span>
          </div>
        </div>
      </div>

      <AttendanceList bookings={(bookings as any) ?? []} sessionId={id} />
    </div>
  );
}
