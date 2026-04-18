'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { updatePasswordAction } from '../actions'
import { BrandLogo } from '@/components/shared/brand-logo'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Подтвердите пароль'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const formData = new FormData()
      formData.append('password', values.password)

      const result = await updatePasswordAction(formData)
      if (result?.error) {
        setError(result.error)
        toast.error('Не удалось обновить пароль', { description: result.error })
        return
      }

      const message = 'Пароль успешно обновлён. Теперь вы можете войти с новым паролем.'
      setSuccess(message)
      toast.success('Пароль обновлён', { description: message })
      form.reset({ password: '', confirmPassword: '' })
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background relative">
      <div className="absolute top-8 left-8 sm:top-10 sm:left-10">
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Ко входу
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-[420px]"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <BrandLogo />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Новый пароль</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Введите новый пароль для вашего аккаунта.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новый пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Минимум 6 символов"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl pr-12"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Показать или скрыть пароль"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подтвердите пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Повторите пароль"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl pr-12"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Показать или скрыть подтверждение пароля"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-sm font-medium text-destructive p-3 bg-destructive/10 rounded-xl">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300 p-3 bg-emerald-500/10 rounded-xl">
                {success}{' '}
                <Link href="/sign-in" className="underline underline-offset-4 font-semibold">
                  Перейти ко входу
                </Link>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all font-semibold"
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Обновить пароль
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}
