import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { trainer } from '@/lib/data/trainer'

const principles = [
  {
    number: '01',
    title: 'Осознанность',
    description: 'Каждое движение выполняется с полным вниманием к телу. Вы учитесь слышать себя.',
  },
  {
    number: '02',
    title: 'Дыхание',
    description: 'Правильное дыхание — основа эффективной тренировки и инструмент расслабления.',
  },
  {
    number: '03',
    title: 'Контроль',
    description: 'Качество важнее количества. Каждое упражнение выполняется с точной техникой.',
  },
  {
    number: '04',
    title: 'Центрирование',
    description: 'Работа начинается с центра тела — мышц кора, которые поддерживают позвоночник.',
  },
  {
    number: '05',
    title: 'Плавность',
    description: 'Движения перетекают одно в другое без рывков и напряжения.',
  },
  {
    number: '06',
    title: 'Точность',
    description: 'Внимание к деталям и правильному положению тела в каждом упражнении.',
  },
]

export function MethodSection() {
  return (
    <SectionWrapper id="method">
      <SectionHeading
        title="Моя методика"
        subtitle="Классический пилатес с индивидуальным подходом"
      />

      {/* Philosophy quote */}
      <div className="mx-auto mb-16 max-w-3xl rounded-lg bg-muted p-8 md:p-12">
        <blockquote className="text-center">
          <p className="font-serif text-xl text-foreground md:text-2xl leading-relaxed italic">
            "{trainer.philosophy}"
          </p>
          <footer className="mt-4 text-sm text-muted-foreground">
            — {trainer.name}
          </footer>
        </blockquote>
      </div>

      {/* Principles grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle) => (
          <div
            key={principle.number}
            className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
          >
            <span className="text-sm font-medium text-primary">
              {principle.number}
            </span>
            <h3 className="mt-2 font-serif text-xl font-medium text-foreground">
              {principle.title}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
