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

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
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
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
              <span className="text-sm font-semibold text-primary">Контакты</span>
            </div>
            
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Свяжитесь с нами
            </h3>

            <div className="space-y-4">
              <a
                href={`tel:${studioInfo.phone}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-all duration-300 group-hover:from-primary group-hover:to-primary/80">
                  <Phone className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <p className="font-semibold text-foreground text-lg">{formatPhone(studioInfo.phone)}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </a>

              <a
                href={`mailto:${studioInfo.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-all duration-300 group-hover:from-primary group-hover:to-primary/80">
                  <Mail className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{studioInfo.email}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p className="font-semibold text-foreground">{studioInfo.address}</p>
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
              'rounded-3xl bg-card border border-border/50 p-8 md:p-10 shadow-xl transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
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
                <p className="mt-3 text-muted-foreground max-w-sm">
                  Мы свяжемся с вами в ближайшее время для уточнения деталей.
                </p>
                <Button
                  variant="outline"
                  className="mt-8"
                  onClick={() => setIsSubmitted(false)}
                >
                  Отправить ещё одну заявку
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Ваше имя
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Как к вам обращаться?"
                    className="bg-muted/50 border-border/50 h-12 rounded-xl focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Телефон
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    className="bg-muted/50 border-border/50 h-12 rounded-xl focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-sm font-semibold text-foreground mb-2">
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
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Сообщение <span className="text-muted-foreground font-normal">(необязательно)</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Расскажите о ваших целях или задайте вопросы"
                    className="bg-muted/50 border-border/50 rounded-xl resize-none focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base font-semibold rounded-xl"
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
