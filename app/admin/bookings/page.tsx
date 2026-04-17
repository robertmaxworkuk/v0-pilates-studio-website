import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BookingsClient } from "./bookings-client";

export const metadata = { title: "Бронирования | Pilatta Admin" };

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, sessions(title, start_time, location), users_profile!user_id(first_name, last_name, email)")
    .order("booked_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Бронирования</h1>
        <p className="text-muted-foreground mt-1">Управление всеми бронированиями студии.</p>
      </div>
      <BookingsClient bookings={bookings ?? []} />
    </div>
  );
}
