"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireTrainer() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("users_profile")
    .select("role, id")
    .eq("id", user.id)
    .single();

  if (!["trainer", "admin", "superadmin"].includes(profile?.role ?? "")) {
    redirect("/profile");
  }

  return { supabase, userId: user.id };
}

export async function markAttendanceAction(
  bookingId: string,
  status: "attended" | "no_show"
) {
  const { supabase } = await requireTrainer();

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);

  if (error) return { error: error.message };
  revalidatePath("/trainer/sessions");
  return { success: true };
}
