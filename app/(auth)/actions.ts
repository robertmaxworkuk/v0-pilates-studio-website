'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { z } from 'zod'

// Признак телефонного номера: только цифры, +, -, (), пробелы
function isPhoneNumber(value: string): boolean {
  return /^[\d\s\+\-\(\)]{7,}$/.test(value.trim())
}

// Получить роль пользователя для редиректа
async function getRoleRedirectPath(userId: string): Promise<string> {
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('users_profile')
    .select('role')
    .eq('id', userId)
    .single()

  switch (profile?.role) {
    case 'admin':
      return '/admin/dashboard'
    case 'trainer':
      return '/trainer/schedule'
    default:
      return '/profile'
  }
}

const signInSchema = z.object({
  identifier: z.string().min(1, 'Введите email или номер телефона'),
  password: z.string().min(1, 'Введите пароль'),
})

const signUpSchema = z.object({
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  first_name: z.string().min(2, 'Имя должно содержать минимум 2 буквы'),
  last_name: z.string().min(2, 'Фамилия должна содержать минимум 2 буквы'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
})

export async function signInAction(formData: FormData) {
  const supabase = await createClient()

  const rawData = Object.fromEntries(formData)
  const validation = signInSchema.safeParse(rawData)

  if (!validation.success) {
    return { error: 'Пожалуйста, проверьте правильность заполнения полей' }
  }

  const { identifier, password } = validation.data
  let emailToUse = identifier.trim()

  // Если введён телефон, ищем привязанный email через Service Role
  if (isPhoneNumber(identifier)) {
    const adminClient = createAdminClient()
    const { data: profileData, error: lookupError } = await adminClient
      .from('users_profile')
      .select('email')
      .eq('phone', identifier.trim())
      .single()

    if (lookupError || !profileData?.email) {
      return { error: 'Пользователь с таким номером телефона не найден' }
    }
    emailToUse = profileData.email
  }

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email: emailToUse,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Неверный email, телефон или пароль' }
    }
    return { error: error.message }
  }

  const redirectPath = await getRoleRedirectPath(signInData.user.id)
  revalidatePath('/', 'layout')
  redirect(redirectPath)
}

export async function signUpAction(formData: FormData) {
  const supabase = await createClient()

  const rawData = Object.fromEntries(formData)
  const validation = signUpSchema.safeParse(rawData)

  if (!validation.success) {
    const firstError = validation.error.errors[0]?.message
    return { error: firstError || 'Пожалуйста, проверьте правильность заполнения полей' }
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      data: {
        first_name: validation.data.first_name,
        last_name: validation.data.last_name,
        phone: validation.data.phone,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Новый пользователь всегда идет в профиль
  revalidatePath('/', 'layout')
  if (signUpData.user) {
    const redirectPath = await getRoleRedirectPath(signUpData.user.id)
    redirect(redirectPath)
  } else {
    redirect('/profile')
  }
}
