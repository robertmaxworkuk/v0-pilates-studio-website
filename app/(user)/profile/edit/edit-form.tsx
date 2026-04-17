"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, User, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { updateProfileAction, type ProfileFormValues } from "@/lib/actions/profile";

const profileSchema = z.object({
  first_name: z.string().min(1, "Имя обязательно").max(50),
  last_name: z.string().min(1, "Фамилия обязательна").max(50),
  phone: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address_line: z.string().optional(),
  postal_code: z.string().optional(),
});

interface EditProfileFormProps {
  profile: {
    first_name: string;
    last_name: string;
    phone?: string | null;
    country?: string | null;
    city?: string | null;
    address_line?: string | null;
    postal_code?: string | null;
  };
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      phone: profile.phone || "",
      country: profile.country || "",
      city: profile.city || "",
      address_line: profile.address_line || "",
      postal_code: profile.postal_code || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsPending(true);
    try {
      const result = await updateProfileAction(data);
      if (result.error) {
        toast.error("Ошибка", { description: result.error });
      } else {
        toast.success("Профиль обновлён", { description: "Ваши данные успешно сохранены." });
        router.push("/profile");
      }
    } catch {
      toast.error("Что-то пошло не так");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-xl">
            <User className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Личные данные</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">Имя</label>
            <input
              {...register("first_name")}
              className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              placeholder="Анна"
            />
            {errors.first_name && (
              <p className="text-xs text-destructive">{errors.first_name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">Фамилия</label>
            <input
              {...register("last_name")}
              className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              placeholder="Смирнова"
            />
            {errors.last_name && (
              <p className="text-xs text-destructive">{errors.last_name.message}</p>
            )}
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-foreground/80">Телефон</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                {...register("phone")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                placeholder="+7 (999) 000-00-00"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Address */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-3xl border bg-card/60 backdrop-blur-sm p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-xl">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Адрес</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">Страна</label>
            <input
              {...register("country")}
              className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              placeholder="Россия"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">Город</label>
            <input
              {...register("city")}
              className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              placeholder="Москва"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-foreground/80">Улица, дом, квартира</label>
            <input
              {...register("address_line")}
              className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              placeholder="ул. Пушкина, д. 10, кв. 5"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/80">Почтовый индекс</label>
            <input
              {...register("postal_code")}
              className="w-full px-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              placeholder="101000"
            />
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between pt-2"
      >
        <Link
          href="/profile"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>
        <button
          type="submit"
          disabled={isPending || !isDirty}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Сохранение..." : "Сохранить"}
        </button>
      </motion.div>
    </form>
  );
}
