'use client'

import { useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { studioInfo } from '@/lib/data/studio'
import { formatPhone } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react'

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        title="Записаться на занятие"
        subtitle="Оставьте заявку, и я свяжусь с вами в ближайшее время"
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Contact info */}
        <div>
          <h3 className="font-serif text-xl font-medium text-foreground mb-6">
            Контактная информация
          </h3>

          <div className="space-y-6">
            <a
              href={`tel:${studioInfo.phone}`}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Телефон</p>
                <p className="font-medium text-foreground">{formatPhone(studioInfo.phone)}</p>
              </div>
            </a>

            <a
              href={`mailto:${studioInfo.email}`}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{studioInfo.email}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Адрес</p>
                <p className="font-medium text-foreground">{studioInfo.address}</p>
                <p className="text-sm text-muted-foreground">{studioInfo.metro}</p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Также можете написать в мессенджер:
            </p>
            <div className="flex flex-wrap gap-3">
              {studioInfo.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-lg bg-muted p-6 md:p-8">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-medium text-foreground">
                Заявка отправлена!
              </h3>
              <p className="mt-2 text-muted-foreground">
                Я свяжусь с вами в ближайшее время для уточнения деталей.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setIsSubmitted(false)}
              >
                Отправить ещё одну заявку
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Ваше имя
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Как к вам обращаться?"
                  className="bg-card"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Телефон
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="bg-card"
                />
              </div>

              <div>
                <label htmlFor="program" className="block text-sm font-medium text-foreground mb-2">
                  Интересующая программа
                </label>
                <select
                  id="program"
                  name="program"
                  className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Сообщение <span className="text-muted-foreground">(необязательно)</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Расскажите о ваших целях или задайте вопросы"
                  className="bg-card resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Отправка...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
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
    </SectionWrapper>
  )
}
