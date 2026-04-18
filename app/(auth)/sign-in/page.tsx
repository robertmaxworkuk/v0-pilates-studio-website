'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signInAction } from '../actions'
import { motion } from 'framer-motion'

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
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Eye, EyeOff, Phone, Mail } from 'lucide-react'
import { BrandLogo } from '@/components/shared/brand-logo'

const signInSchema = z.object({
  identifier: z.string().min(1, 'Введите email или номер телефона'),
  password: z.string().min(1, 'Введите пароль'),
})

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 340, damping: 30 },
  },
}

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  // Определяем иконку по введенному значению
  const identifierValue = form.watch('identifier')
  const isPhone = /^[\d\s\+\-\(\)]+$/.test(identifierValue) && identifierValue.length > 0
  const IdentifierIcon = isPhone ? Phone : Mail

  function onSubmit(values: z.infer<typeof signInSchema>) {
    setError(null)
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      const res = await signInAction(formData)
      if (res?.error) {
        setError(res.error)
        toast.error('Ошибка входа', { description: res.error })
      } else {
        toast.success('Добро пожаловать!')
      }
    })
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Левая панель — изображение */}
      <div className="hidden md:block relative bg-muted overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
              className="max-w-md"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-md">
                С возвращением
              </h2>
              <p className="text-lg text-white/85 drop-shadow-sm font-medium leading-relaxed">
                Продолжайте заботиться о себе вместе с нашими профессиональными тренерами.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Правая панель — форма */}
      <div className="flex items-center justify-center p-8 bg-background relative">
        {/* Кнопка назад */}
        <div className="absolute top-8 left-8 sm:top-10 sm:left-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            На главную
          </Link>
        </div>

        <motion.div
          className="w-full max-w-[400px] mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Логотип и заголовок */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <BrandLogo />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Вход в аккаунт
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Войдите через email или номер телефона
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email / Phone field */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email или телефон</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Email или телефон"
                            type="text"
                            autoComplete="username"
                            className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl pl-12 pr-4 text-sm sm:text-base"
                            {...field}
                          />
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                            <motion.div
                              key={isPhone ? 'phone' : 'mail'}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <IdentifierIcon className="w-4 h-4" />
                            </motion.div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Password field */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Пароль</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="text-sm font-medium text-primary hover:underline underline-offset-4"
                        >
                          Забыли пароль?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl pr-12 text-sm sm:text-base"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              setShowPassword(v => !v)
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 z-10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-lg"
                            tabIndex={-1}
                            aria-label="Показать/скрыть пароль"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Сообщение об ошибке */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-destructive p-3 bg-destructive/10 rounded-xl"
                >
                  {error}
                </motion.div>
              )}

              {/* Кнопка входа */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-12 text-base rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all font-semibold"
                  disabled={isPending}
                >
                  {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Войти
                </Button>
              </motion.div>
            </form>
          </Form>

          <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <Link
              href="/sign-up"
              className="font-semibold text-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              Создать сейчас
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
