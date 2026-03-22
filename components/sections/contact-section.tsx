'use client'

import { useState, useEffect, useRef } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { studioInfo } from '@/lib/data/studio'
import { formatPhone } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, Send, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PHONE_MASK_LENGTH = 10

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, '')
  const normalized = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits
  const phoneDigits = normalized.slice(0, PHONE_MASK_LENGTH)

  if (!phoneDigits) {
    return ''
  }

  const parts = ['+7']

  if (phoneDigits.length > 0) {
    parts.push(` (${phoneDigits.slice(0, 3)}`)
  }

  if (phoneDigits.length >= 4) {
    parts.push(`) ${phoneDigits.slice(3, 6)}`)
  }

  if (phoneDigits.length >= 7) {
    parts.push(`-${phoneDigits.slice(6, 8)}`)
  }

  if (phoneDigits.length >= 9) {
    parts.push(`-${phoneDigits.slice(8, 10)}`)
  }

  return parts.join('')
}

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [phoneValue, setPhoneValue] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)
    setPhoneValue('')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(formatPhoneInput(e.target.value))
  }

  return (
    <SectionWrapper id="contact" background="muted" animate={false}>
      <div ref={sectionRef}>
        <SectionHeading
          title="Записаться на занятие"
          subtitle="Оставьте заявку, и мы свяжемся с вами в ближайшее время"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact info */}
          <div
            className={cn(
              'transition-all duration-700',
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            )}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <span className="text-sm font-semibold text-primary">Контакты</span>
            </div>

            <h3 className="mb-6 font-serif text-2xl font-semibold text-foreground">
              Свяжитесь с нами
            </h3>

            <div className="space-y-4">
              <a
                href={`tel:${studioInfo.phone}`}
                aria-label={`Позвонить: ${formatPhone(studioInfo.phone)}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl sm:p-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-all duration-300 group-hover:from-primary group-hover:to-primary/80">
                  <Phone className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <p className="text-lg font-semibold text-foreground">{formatPhone(studioInfo.phone)}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </a>

              <a
                href={`mailto:${studioInfo.email}`}
                aria-label={`Написать на email: ${studioInfo.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl sm:p-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-all duration-300 group-hover:from-primary group-hover:to-primary/80">
                  <Mail className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="break-all font-semibold text-foreground">{studioInfo.email}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </a>

              <a
                href={studioInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Открыть адрес в картах: ${studioInfo.address}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl sm:p-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-all duration-300 group-hover:from-primary group-hover:to-primary/80">
                  <MapPin className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p className="font-semibold text-foreground">{studioInfo.address}</p>
                  <p className="text-sm text-muted-foreground">{studioInfo.metro}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8">
              <p className="mb-4 text-sm text-muted-foreground">Также можете написать в мессенджер:</p>
              <div className="flex flex-wrap gap-3">
                {studioInfo.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-border/50 bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={cn(
              'rounded-3xl border border-border/50 bg-card p-6 shadow-xl transition-all duration-700 delay-200 sm:p-8 md:p-10',
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            )}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground">
                  Заявка отправлена!
                </h3>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время для уточнения деталей.
                </p>
                <Button variant="outline" className="mt-8" onClick={() => setIsSubmitted(false)}>
                  Отправить ещё одну заявку
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                    Ваше имя
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Как к вам обращаться?"
                    className="h-12 rounded-xl border-border/50 bg-muted/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">
                    Телефон
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel-national"
                    minLength={18}
                    pattern="\+7 \\(\d{3}\\) \d{3}-\d{2}-\d{2}"
                    title="Введите номер телефона полностью"
                    placeholder="+7 (___) ___-__-__"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    className="h-12 rounded-xl border-border/50 bg-muted/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="mb-2 block text-sm font-semibold text-foreground">
                    Интересующая программа
                  </label>
                  <select
                    id="program"
                    name="program"
                    className="w-full rounded-xl border border-border/50 bg-muted/50 px-4 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Выберите программу</option>
                    <option value="trial">Пробное занятие</option>
                    <option value="individual">Индивидуальные занятия</option>
                    <option value="group">Групповые занятия</option>
                    <option value="online">Онлайн-занятия</option>
                    <option value="pregnancy">Пилатес для беременных</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                    Сообщение <span className="font-normal text-muted-foreground">(необязательно)</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Расскажите о ваших целях или задайте вопросы"
                    className="resize-none rounded-xl border-border/50 bg-muted/50 focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-14 w-full rounded-xl text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Отправка...'
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Записаться на пробное занятие
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
