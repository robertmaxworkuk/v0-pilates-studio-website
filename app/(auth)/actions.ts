'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

const signUpSchema = signInSchema.extend({
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

  const { error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

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
        phone: validation.data.phone,
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}
