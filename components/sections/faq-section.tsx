import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { faqs } from '@/lib/data/faq'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CTAButton } from '@/components/shared/cta-button'

export function FAQSection() {
  return (
    <SectionWrapper id="faq" background="muted">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Частые вопросы"
          subtitle="Ответы на популярные вопросы о занятиях"
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-border"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 rounded-lg bg-card p-8 text-center shadow-sm">
          <h3 className="font-serif text-xl font-medium text-foreground">
            Остались вопросы?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Напишите мне, и я с радостью отвечу на все ваши вопросы
          </p>
          <div className="mt-6">
            <CTAButton>
              Связаться со мной
            </CTAButton>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
