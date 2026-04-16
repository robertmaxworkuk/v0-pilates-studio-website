'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const signUpSchema = z.object({
  first_name: z.string().min(2, 'Имя должно содержать минимум 2 буквы'),
  last_name: z.string().min(2, 'Фамилия должна содержать минимум 2 буквы'),
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

export async function signUpAction(formData: FormData) {
  const supabase = await createClient()
  
  const rawData = Object.fromEntries(formData)
  const validation = signUpSchema.safeParse(rawData)

  if (!validation.success) {
    return { error: 'Пожалуйста, проверьте правильность заполнения полей' }
  }

  const { error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      data: {
        first_name: validation.data.first_name,
        last_name: validation.data.last_name,
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}
