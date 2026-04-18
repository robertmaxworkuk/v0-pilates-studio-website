-- Persist user theme preference and keep values constrained.
ALTER TABLE public.users_profile
ADD COLUMN IF NOT EXISTS theme_preference TEXT NOT NULL DEFAULT 'system';

ALTER TABLE public.users_profile
DROP CONSTRAINT IF EXISTS users_profile_theme_preference_check;

ALTER TABLE public.users_profile
ADD CONSTRAINT users_profile_theme_preference_check
CHECK (theme_preference IN ('light', 'dark', 'system'));
