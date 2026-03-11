import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { ImagePlaceholder } from '@/components/shared/image-placeholder'
import { trainer } from '@/lib/data/trainer'
import { Award, Clock, Users } from 'lucide-react'

export function AboutSection() {
  return (
    <SectionWrapper id="about" background="muted">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Image */}
        <div className="relative">
          <ImagePlaceholder
            src={trainer.photoUrl}
            alt={`Тренер ${trainer.name}`}
            aspectRatio="portrait"
            className="rounded-lg shadow-lg"
            fill
          />
          {/* Decorative element */}
          <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg bg-primary/10" />
        </div>

        {/* Content */}
        <div>
          <SectionHeading
            title={`Привет, я ${trainer.name}`}
            subtitle="Ваш тренер по пилатесу"
            align="left"
            className="mb-8"
          />

          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {trainer.bio}
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Опыт</p>
                <p className="font-medium">{trainer.experience}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Тренер</p>
                <p className="font-medium">{trainer.trainerExperience}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Клиенты</p>
                <p className="font-medium">500+</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-8">
            <h3 className="mb-4 font-medium text-foreground">Сертификаты и обучение</h3>
            <ul className="space-y-2">
              {trainer.certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
