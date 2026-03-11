'use client'

import { useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { CTAButton } from '@/components/shared/cta-button'
import { individualPricing, groupPricing, type PricingPlan } from '@/lib/data/pricing'
import { formatPrice } from '@/lib/format'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type PricingType = 'individual' | 'group'

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-lg border bg-card p-6 transition-all duration-300',
        plan.isPopular 
          ? 'border-primary shadow-lg scale-[1.02]' 
          : 'border-border hover:border-primary/30 hover:shadow-md'
      )}
    >
      {/* Popular badge */}
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
            Популярный выбор
          </span>
        </div>
      )}

      {/* Trial badge */}
      {plan.isTrial && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-accent px-4 py-1 text-xs font-medium text-accent-foreground">
            Первое занятие
          </span>
        </div>
      )}

      <div className="mb-4 pt-2">
        <h3 className="font-serif text-lg font-medium text-foreground">
          {plan.name}
        </h3>
        {plan.sessions > 1 && plan.sessions < 999 && (
          <p className="text-sm text-muted-foreground">
            {plan.sessions} {plan.sessions === 8 ? 'занятий' : 'занятий'}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="font-serif text-3xl font-medium text-foreground">
          {formatPrice(plan.price)}
        </span>
        {plan.perSession && (
          <p className="mt-1 text-sm text-muted-foreground">
            {formatPrice(plan.perSession)} за занятие
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="mb-6 flex-1 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Validity */}
      <p className="mb-4 text-xs text-muted-foreground">
        Срок действия: {plan.validDays} {plan.validDays === 30 ? 'дней' : plan.validDays === 14 ? 'дней' : 'дней'}
      </p>

      {/* CTA */}
      <CTAButton 
        variant={plan.isPopular || plan.isTrial ? 'default' : 'outline'} 
        size="default"
        className="w-full"
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
      <div className="mx-auto mb-12 flex max-w-md rounded-lg bg-card p-1 shadow-sm">
        <button
          onClick={() => setActiveType('individual')}
          className={cn(
            'flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all',
            activeType === 'individual'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Индивидуальные
        </button>
        <button
          onClick={() => setActiveType('group')}
          className={cn(
            'flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all',
            activeType === 'group'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Групповые
        </button>
      </div>

      {/* Pricing cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {currentPricing.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>

      {/* Note */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Оплата производится наличными или переводом. Возможна рассрочка на абонементы.
      </p>
    </SectionWrapper>
  )
}
