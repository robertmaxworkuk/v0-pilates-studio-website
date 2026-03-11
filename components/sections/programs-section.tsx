import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { CTAButton } from '@/components/shared/cta-button'
import { programs } from '@/lib/data/programs'
import { Clock, Users, Check } from 'lucide-react'

export function ProgramsSection() {
  return (
    <SectionWrapper id="programs">
      <SectionHeading
        title="Программы тренировок"
        subtitle="Выберите формат, который подходит именно вам"
      />

      <div className="grid gap-8 md:grid-cols-2">
        {programs.map((program) => (
          <div
            key={program.id}
            className="group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <ImagePlaceholder
                src={program.imageUrl}
                alt={program.title}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                fill
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-serif text-xl font-medium text-foreground">
                {program.title}
              </h3>

              {/* Meta */}
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {program.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {program.level}
                </span>
              </div>

              <p className="mt-4 text-muted-foreground">
                {program.description}
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-2">
                {program.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <CTAButton variant="outline" size="default" className="w-full">
                  Записаться
                </CTAButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
