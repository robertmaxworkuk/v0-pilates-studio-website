"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("users_profile")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/profile");
  }
  return { supabase, user };
}

// --- USERS ---
export async function updateUserRoleAction(userId: string, role: string) {
  const { user: adminUser } = await requireAdmin();

  if (userId === adminUser.id) {
    return { error: "Вы не можете изменить свою собственную роль" };
  }

  const adminDb = createAdminClient();
  const allowedRoles = ["user", "client", "trainer", "admin"];
  if (!allowedRoles.includes(role)) return { error: "Недопустимая роль" };

  const { error } = await adminDb
    .from("users_profile")
    .update({ role })
    .eq("id", userId);

  if (error) return { error: error.message };
  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateUserStatusAction(userId: string, status: "active" | "blocked") {
  await requireAdmin();
  const adminDb = createAdminClient();
  const { error } = await adminDb
    .from("users_profile")
    .update({ status })
    .eq("id", userId);

  if (error) return { error: error.message };
  revalidatePath("/admin/users");
  return { success: true };
}

// --- SESSION TYPES ---
const sessionTypeSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  default_price: z.number().positive(),
  default_capacity: z.number().int().positive(),
  default_duration_minutes: z.number().int().positive(),
});

export async function createSessionTypeAction(data: z.infer<typeof sessionTypeSchema>) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("session_types").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/session-types");
  return { success: true };
}

export async function updateSessionTypeAction(id: string, data: Partial<z.infer<typeof sessionTypeSchema>>) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("session_types").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/session-types");
  return { success: true };
}

export async function deleteSessionTypeAction(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("session_types").update({ is_active: false }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/session-types");
  return { success: true };
}

// --- SESSIONS ---
const sessionSchema = z.object({
  type_id: z.string().uuid(),
  instructor_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  max_capacity: z.number().int().positive(),
  location: z.string().min(1),
  start_time: z.string(),
  end_time: z.string(),
});

export async function createSessionAction(data: z.infer<typeof sessionSchema>) {
  const { supabase } = await requireAdmin();
  const parsed = sessionSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase.from("sessions").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePath("/admin/sessions");
  return { success: true };
}

export async function updateSessionAction(sessionId: string, data: Partial<z.infer<typeof sessionSchema>>) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("sessions")
    .update(data)
    .eq("id", sessionId);
  if (error) return { error: error.message };
  revalidatePath("/admin/sessions");
  return { success: true };
}

export async function cancelSessionAction(sessionId: string, reason: string) {
  const { supabase } = await requireAdmin();

  // Cancel session
  const { error: sessionError } = await supabase
    .from("sessions")
    .update({ status: "cancelled", cancel_reason: reason, canceled_at: new Date().toISOString() })
    .eq("id", sessionId);
  if (sessionError) return { error: sessionError.message };

  // Cancel all bookings
  const { error: bookingsError } = await supabase
    .from("bookings")
    .update({ status: "cancelled_by_admin", canceled_at: new Date().toISOString() })
    .eq("session_id", sessionId)
    .eq("status", "booked");
  if (bookingsError) return { error: bookingsError.message };

  revalidatePath("/admin/sessions");
  revalidatePath("/admin/bookings");
  return { success: true };
}

// --- BOOKINGS ---
export async function updateBookingPaymentAction(bookingId: string, isPaid: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("bookings").update({ is_paid: isPaid }).eq("id", bookingId);
  if (error) return { error: error.message };
  revalidatePath("/admin/bookings");
  return { success: true };
}

export async function cancelBookingAdminAction(bookingId: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled_by_admin", canceled_at: new Date().toISOString() })
    .eq("id", bookingId);
  if (error) return { error: error.message };
  revalidatePath("/admin/bookings");
  return { success: true };
}
