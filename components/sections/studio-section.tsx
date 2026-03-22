import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { studioInfo } from '@/lib/data/studio'
import { Check } from 'lucide-react'

export function StudioSection() {
  return (
    <SectionWrapper id="studio" background="muted">
      <SectionHeading
        title="Студия"
        subtitle="На мобильном — крупный главный кадр и компактная фотолента вместо тяжёлой мозаики"
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="grid gap-4">
          <ImagePlaceholder
            src="/images/studio-1.jpg"
            alt="Интерьер студии пилатеса"
            aspectRatio="video"
            className="rounded-[1.75rem]"
            fill
          />
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0">
            <ImagePlaceholder
              src="/images/studio-2.jpg"
              alt="Оборудование для пилатеса"
              aspectRatio="square"
              className="min-w-[68%] rounded-[1.5rem] sm:min-w-0"
              fill
            />
            <ImagePlaceholder
              src="/images/studio-3.jpg"
              alt="Зона отдыха в студии"
              aspectRatio="square"
              className="min-w-[68%] rounded-[1.5rem] sm:min-w-0"
              fill
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-base leading-relaxed whitespace-pre-line text-muted-foreground md:text-lg">
            {studioInfo.description}
          </p>

          <div className="mt-6 md:mt-8">
            <h3 className="mb-4 font-medium text-foreground">Что вас ждёт</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {studioInfo.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground md:text-base">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-card p-5 shadow-sm md:mt-8 md:p-6">
            <h3 className="mb-4 font-medium text-foreground">Часы работы</h3>
            <ul className="space-y-2">
              {studioInfo.workingHours.map((item) => (
                <li key={item.day} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{item.day}</span>
                  <span className="text-right font-medium text-foreground">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
