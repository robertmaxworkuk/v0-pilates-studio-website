'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Mail } from 'lucide-react'
import { toast } from 'sonner'

import { requestPasswordResetAction } from '../actions'
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

const forgotPasswordSchema = z.object({
  email: z.string().email('Введите корректный email'),
})

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const formData = new FormData()
      formData.append('email', values.email)

      const result = await requestPasswordResetAction(formData)
      if (result?.error) {
        setError(result.error)
        toast.error('Не удалось отправить письмо', { description: result.error })
        return
      }

      const message = 'Мы отправили письмо со ссылкой для сброса пароля.'
      setSuccess(message)
      toast.success('Письмо отправлено', { description: message })
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
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Забыли пароль?</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Введите email, и мы отправим ссылку для восстановления доступа.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        autoComplete="email"
                        className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl pl-11"
                        {...field}
                      />
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                {success}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all font-semibold"
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Отправить ссылку
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}
