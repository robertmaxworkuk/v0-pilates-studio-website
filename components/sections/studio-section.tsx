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
        subtitle="Уютное пространство для вашей практики"
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="grid gap-4">
          <ImagePlaceholder
            src="/images/studio-1.jpg"
            alt="Интерьер студии пилатеса"
            aspectRatio="video"
            className="rounded-lg"
            fill
          />
          <div className="grid grid-cols-2 gap-4">
            <ImagePlaceholder
              src="/images/studio-2.jpg"
              alt="Оборудование для пилатеса"
              aspectRatio="square"
              className="rounded-lg"
              fill
            />
            <ImagePlaceholder
              src="/images/studio-3.jpg"
              alt="Зона отдыха в студии"
              aspectRatio="square"
              className="rounded-lg"
              fill
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line md:text-lg">
            {studioInfo.description}
          </p>

          <div className="mt-8">
            <h3 className="font-medium text-foreground mb-4">Что вас ждёт</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {studioInfo.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Working hours */}
          <div className="mt-8 rounded-2xl bg-card p-5 shadow-sm md:p-6">
            <h3 className="font-medium text-foreground mb-4">Часы работы</h3>
            <ul className="space-y-2">
              {studioInfo.workingHours.map((item) => (
                <li key={item.day} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.day}</span>
                  <span className="font-medium text-foreground">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
