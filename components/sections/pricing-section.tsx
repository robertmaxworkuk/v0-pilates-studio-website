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
        'relative flex min-w-[84%] snap-start flex-col rounded-[1.75rem] border bg-card p-5 transition-all duration-500 hover:-translate-y-1 md:min-w-0 md:p-8',
        plan.isPopular
          ? 'border-primary shadow-2xl shadow-primary/10 md:scale-[1.02] z-10'
          : 'border-border/50 hover:border-primary/30 hover:shadow-xl'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25">
            <Star className="h-3.5 w-3.5 fill-current" />
            Популярный выбор
          </span>
        </div>
      )}

      {plan.isTrial && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Первое занятие
          </span>
        </div>
      )}

      <div className="mb-5 flex min-h-12 items-start pt-2 md:mb-6 md:min-h-14">
        <h3 className="font-serif text-lg font-semibold text-foreground md:text-xl">
          {plan.name}
        </h3>
      </div>

      <div className="mb-5 md:mb-6">
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            {formatPrice(plan.price)}
          </span>
        </div>
        {plan.perSession && (
          <p className="mt-2 text-sm text-muted-foreground">
            {formatPrice(plan.perSession)} за занятие
          </p>
        )}
      </div>

      <ul className="mb-6 flex-1 space-y-2.5 md:mb-8 md:space-y-3">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3 w-3 text-primary" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <p className="mb-4 text-xs text-muted-foreground">
        Срок действия: {plan.validDays} дней
      </p>

      <CTAButton
        variant={plan.isPopular || plan.isTrial ? 'default' : 'outline'}
        size="default"
        className="h-11 w-full rounded-2xl"
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
        subtitle="Тарифы упакованы в мобильную карусель — не нужно листать длинную стену карточек"
      />

      <div className="mx-auto mb-8 flex max-w-md rounded-[1.25rem] bg-card p-1.5 shadow-sm border border-border/50 md:mb-12 md:rounded-2xl">
        <button
          onClick={() => setActiveType('individual')}
          className={cn(
            'flex-1 rounded-[0.9rem] px-4 py-3 text-sm font-semibold transition-all duration-300 md:px-6 md:rounded-xl',
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
            'flex-1 rounded-[0.9rem] px-4 py-3 text-sm font-semibold transition-all duration-300 md:px-6 md:rounded-xl',
            activeType === 'group'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Групповые
        </button>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
        {currentPricing.map((plan, index) => (
          <PricingCard key={plan.id} plan={plan} index={index} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground md:mt-10">
        Оплата производится наличными или переводом. Возможна рассрочка на абонементы.
      </p>
    </SectionWrapper>
  )
}
