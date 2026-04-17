import { createClient } from '@supabase/supabase-js'

/**
 * Service Role client — только для серверных операций.
 * Имеет полный доступ к БД, обходя RLS-политики.
 * НИКОГДА не используй на клиенте или не отдавай в браузер.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
