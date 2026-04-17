"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  first_name: z.string().min(1, "Имя обязательно").max(50),
  last_name: z.string().min(1, "Фамилия обязательна").max(50),
  phone: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address_line: z.string().optional(),
  postal_code: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export async function updateProfileAction(data: ProfileFormValues) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Не авторизован" };
  }

  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { error } = await supabase
    .from("users_profile")
    .update({
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      phone: parsed.data.phone || null,
      country: parsed.data.country || null,
      city: parsed.data.city || null,
      address_line: parsed.data.address_line || null,
      postal_code: parsed.data.postal_code || null,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Ошибка обновления профиля: " + error.message };
  }

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  return { success: true };
}
