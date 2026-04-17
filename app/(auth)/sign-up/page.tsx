'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signUpAction } from '../actions'
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
import { Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { BrandLogo } from '@/components/shared/brand-logo'

const signUpSchema = z.object({
  first_name: z.string().min(2, 'Имя должно содержать минимум 2 буквы'),
  last_name: z.string().min(2, 'Фамилия должна содержать минимум 2 буквы'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

// Контейнер с анимациями для дочерних элементов
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
}

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    setError(null)
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      const res = await signUpAction(formData)
      if (res?.error) {
        setError(res.error)
        toast.error('Ошибка регистрации', { description: res.error })
      } else {
        toast.success('Успешная регистрация', { description: 'Добро пожаловать в студию!' })
      }
    })
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Левая панель с формой */}
      <div className="flex items-center justify-center p-8 bg-background relative">
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            На главную
          </Link>
        </div>

        <motion.div 
          className="w-full max-w-[400px] mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <BrandLogo />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Создать аккаунт
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Присоединяйтесь к Pilatta и начните свой путь к здоровью
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Анна" className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Фамилия</FormLabel>
                      <FormControl>
                        <Input placeholder="Смирнова" className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон</FormLabel>
                      <FormControl>
                        <Input placeholder="+7 (999) 000-00-00" type="tel" className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="anna@pilatta.ru" type="email" className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Минимум 6 символов"
                            type={showPassword ? 'text' : 'password'}
                            className="h-12 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl pr-12"
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

              {error && (
                <motion.div variants={itemVariants} className="text-sm font-medium text-destructive p-3 bg-destructive/10 rounded-lg">
                  {error}
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="pt-2">
                <Button type="submit" className="w-full h-12 text-base rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all font-semibold" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Зарегистрироваться
                </Button>
              </motion.div>
            </form>
          </Form>

          <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link href="/sign-in" className="font-semibold text-foreground hover:text-primary transition-colors underline underline-offset-4">
              Войти
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Правая панель с изображением */}
      <div className="hidden md:block relative bg-muted overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Заглушка, если нет конкретного фото, берем эстетичное случайное с Unsplash */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop')" }}
          />
          {/* Градиентный оверлей для премиального вида и читаемости текста */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-md"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-md">
                Раскройте свой потенциал с Pilatta
              </h2>
              <p className="text-lg text-white/80 drop-shadow-sm font-medium">
                Присоединяйтесь к комьюнити профессионалов и найдите свой идеальный баланс между телом и разумом.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
