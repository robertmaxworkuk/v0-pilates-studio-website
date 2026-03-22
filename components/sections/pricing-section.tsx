'use client'

import { useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { CTAButton } from '@/components/shared/cta-button'
import { individualPricing, groupPricing, type PricingPlan } from '@/lib/data/pricing'
import { formatPrice } from '@/lib/format'
import { Check, Sparkles, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type PricingType = 'individual' | 'group'

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-2xl border bg-card p-6 md:p-8 transition-all duration-500 hover:-translate-y-1',
        plan.isPopular 
          ? 'border-primary shadow-2xl shadow-primary/10 scale-[1.02] z-10' 
          : 'border-border/50 hover:border-primary/30 hover:shadow-xl'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Popular badge */}
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25">
            <Star className="h-3.5 w-3.5 fill-current" />
            Популярный выбор
          </span>
        </div>
      )}

      {/* Trial badge */}
      {plan.isTrial && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Первое занятие
          </span>
        </div>
      )}

      <div className="mb-6 min-h-[4.75rem] pt-2">
        <h3 className="font-serif text-xl font-semibold leading-tight text-foreground">
          {plan.name}
        </h3>
      </div>

      {/* Price */}
      <div className="mb-6 min-h-[5.75rem]">
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-4xl font-semibold text-foreground">
            {formatPrice(plan.price)}
          </span>
        </div>
        {plan.perSession && (
          <p className="mt-2 text-sm text-muted-foreground">
            {formatPrice(plan.perSession)} за занятие
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3 w-3 text-primary" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {/* Validity */}
      <p className="mb-4 text-xs text-muted-foreground">
        Срок действия: {plan.validDays} дней
      </p>

      {/* CTA */}
      <CTAButton 
        variant={plan.isPopular || plan.isTrial ? 'default' : 'outline'} 
        size="default"
        className="w-full"
        showArrow={false}
      >
        {plan.isTrial ? 'Записаться на пробное' : 'Выбрать'}
      </CTAButton>
    </div>
  )
}

export function PricingSection() {
  const [activeType, setActiveType] = useState<PricingType>('individual')

  const currentPricing = activeType === 'individual' ? individualPricing : groupPricing

  return (
    <SectionWrapper id="pricing" background="muted">
      <SectionHeading
        title="Стоимость занятий"
        subtitle="Прозрачные цены, гибкие абонементы"
      />

      {/* Type switcher */}
      <div className="mx-auto mb-12 flex max-w-md rounded-2xl bg-card p-1.5 shadow-sm border border-border/50">
        <button
          onClick={() => setActiveType('individual')}
          className={cn(
            'flex-1 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300',
            activeType === 'individual'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Индивидуальные
        </button>
        <button
          onClick={() => setActiveType('group')}
          className={cn(
            'flex-1 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300',
            activeType === 'group'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Групповые
        </button>
      </div>

      {/* Pricing cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {currentPricing.map((plan, index) => (
          <PricingCard key={plan.id} plan={plan} index={index} />
        ))}
      </div>

      {/* Note */}
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Оплата производится наличными или переводом. Возможна рассрочка на абонементы.
      </p>
    </SectionWrapper>
  )
}
