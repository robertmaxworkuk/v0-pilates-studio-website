-- Начальная схема базы данных для Pilates Studio Website

-- Подключаем необходимые расширения
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Типы (ENUMs)
CREATE TYPE "public"."user_role" AS ENUM ('user', 'client', 'trainer', 'admin');
CREATE TYPE "public"."user_status" AS ENUM ('active', 'blocked');
CREATE TYPE "public"."session_status" AS ENUM ('scheduled', 'ongoing', 'completed', 'cancelled');
CREATE TYPE "public"."booking_status" AS ENUM ('booked', 'cancelled_by_user', 'cancelled_by_admin', 'attended', 'no_show');

-- 2. Таблицы
-- 2.1. users_profile (Профили пользователей)
CREATE TABLE "public"."users_profile" (
    "id" UUID PRIMARY KEY REFERENCES "auth"."users"("id") ON DELETE CASCADE,
    "email" TEXT UNIQUE NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "city" TEXT,
    "address_line" TEXT,
    "postal_code" TEXT,
    "role" "public"."user_role" DEFAULT 'user'::"public"."user_role",
    "status" "public"."user_status" DEFAULT 'active'::"public"."user_status",
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2. session_types (Типы занятий)
CREATE TABLE "public"."session_types" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "default_price" NUMERIC NOT NULL,
    "default_capacity" INTEGER NOT NULL,
    "default_duration_minutes" INTEGER NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "image_url" TEXT,
    "gallery_urls" TEXT[],
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3. session_tags (Теги занятий)
CREATE TABLE "public"."session_tags" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT UNIQUE NOT NULL,
    "color_scheme" TEXT
);

-- 2.4. session_type_tags (Связь типов и тегов)
CREATE TABLE "public"."session_type_tags" (
    "session_type_id" UUID REFERENCES "public"."session_types"("id") ON DELETE CASCADE,
    "tag_id" UUID REFERENCES "public"."session_tags"("id") ON DELETE CASCADE,
    PRIMARY KEY ("session_type_id", "tag_id")
);

-- 2.5 sessions (Занятия)
CREATE TABLE "public"."sessions" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "type_id" UUID REFERENCES "public"."session_types"("id") ON DELETE RESTRICT,
    "instructor_id" UUID REFERENCES "public"."users_profile"("id") ON DELETE RESTRICT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" NUMERIC NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "start_time" TIMESTAMPTZ NOT NULL,
    "end_time" TIMESTAMPTZ NOT NULL,
    "status" "public"."session_status" DEFAULT 'scheduled'::"public"."session_status",
    "cancel_reason" TEXT,
    "canceled_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6. bookings (Бронирования)
CREATE TABLE "public"."bookings" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "session_id" UUID REFERENCES "public"."sessions"("id") ON DELETE RESTRICT,
    "user_id" UUID REFERENCES "public"."users_profile"("id") ON DELETE RESTRICT,
    "status" "public"."booking_status" DEFAULT 'booked'::"public"."booking_status",
    "is_paid" BOOLEAN DEFAULT false,
    "booked_at" TIMESTAMPTZ DEFAULT NOW(),
    "canceled_at" TIMESTAMPTZ
);

-- Индекс для предотвращения двойного бронирования
CREATE UNIQUE INDEX "unique_active_booking" ON "public"."bookings" ("session_id", "user_id") WHERE status = 'booked';

-- 2.7. global_settings (Настройки)
CREATE TABLE "public"."global_settings" (
    "key" TEXT PRIMARY KEY,
    "value" JSONB NOT NULL
);

-- 2.8. user_packages (Пакеты)
CREATE TABLE "public"."user_packages" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" UUID REFERENCES "public"."users_profile"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "total_sessions" INTEGER,
    "used_sessions" INTEGER DEFAULT 0,
    "expires_at" TIMESTAMPTZ,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Таблицы истории
CREATE TABLE "public"."user_history" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" UUID REFERENCES "public"."users_profile"("id") ON DELETE CASCADE,
    "changed_by" UUID REFERENCES "public"."users_profile"("id") ON DELETE SET NULL,
    "action" TEXT NOT NULL,
    "old_data" JSONB,
    "new_data" JSONB,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "public"."session_history" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "session_id" UUID REFERENCES "public"."sessions"("id") ON DELETE CASCADE,
    "action" TEXT NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "public"."booking_history" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "booking_id" UUID REFERENCES "public"."bookings"("id") ON DELETE CASCADE,
    "action" TEXT NOT NULL,
    "old_status" TEXT,
    "new_status" TEXT,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Триггеры обновления updated_at
CREATE OR REPLACE FUNCTION "public"."handle_updated_at"()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_users_profile_updated
    BEFORE UPDATE ON "public"."users_profile"
    FOR EACH ROW EXECUTE PROCEDURE "public"."handle_updated_at"();

CREATE TRIGGER on_session_types_updated
    BEFORE UPDATE ON "public"."session_types"
    FOR EACH ROW EXECUTE PROCEDURE "public"."handle_updated_at"();

CREATE TRIGGER on_sessions_updated
    BEFORE UPDATE ON "public"."sessions"
    FOR EACH ROW EXECUTE PROCEDURE "public"."handle_updated_at"();

CREATE TRIGGER on_user_packages_updated
    BEFORE UPDATE ON "public"."user_packages"
    FOR EACH ROW EXECUTE PROCEDURE "public"."handle_updated_at"();

-- 4. Триггер авто-создания профиля
CREATE OR REPLACE FUNCTION "public"."on_auth_user_created"()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "public"."users_profile" (id, email, first_name, last_name, phone)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        NEW.raw_user_meta_data->>'phone'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON "auth"."users"
    FOR EACH ROW EXECUTE PROCEDURE "public"."on_auth_user_created"();

-- 5. Row Level Security (RLS)
ALTER TABLE "public"."users_profile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."session_types" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."session_tags" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."session_type_tags" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."bookings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."global_settings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user_packages" ENABLE ROW LEVEL SECURITY;

-- Политики users_profile 
-- Пользователи могут читать только свой профиль
CREATE POLICY "Users can view own profile" 
    ON "public"."users_profile" FOR SELECT 
    USING (auth.uid() = id);

-- Пользователи могут обновлять только свой профиль
CREATE POLICY "Users can update own profile" 
    ON "public"."users_profile" FOR UPDATE 
    USING (auth.uid() = id);

-- Политики session_types (публичное чтение для всех авторизованных (или анонимов если нужно, добавим позже))
CREATE POLICY "Anyone can view session_types" 
    ON "public"."session_types" FOR SELECT 
    TO public
    USING (true);

-- Политики sessions (публичное чтение)
CREATE POLICY "Anyone can view sessions" 
    ON "public"."sessions" FOR SELECT 
    TO public
    USING (true);

-- Администраторы видят все. Мы будем добавлять политики для admin через Supabase UI или дополнительный скрипт, 
-- поскольку проверка "role" требует селекта к той же таблице, что может вызвать рекурсию.
-- Простейший подход без рекурсии (проверка jwt claim) или отдельная таблица для ролей мы реализуем позже, 
-- для начала - базовая защита.
