import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { benefits } from '@/lib/data/studio'
import { 
  Activity, 
  Heart, 
  Sparkles, 
  Wind, 
  Target,
  Users
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  'spine': <Activity className="h-6 w-6" />,
  'posture': <Target className="h-6 w-6" />,
  'flexibility': <Sparkles className="h-6 w-6" />,
  'relax': <Wind className="h-6 w-6" />,
  'body': <Heart className="h-6 w-6" />,
  'all-ages': <Users className="h-6 w-6" />,
}

export function BenefitsSection() {
  return (
    <SectionWrapper id="benefits" background="muted">
      <SectionHeading
        title="Почему пилатес?"
        subtitle="Система упражнений, которая меняет тело и качество жизни"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="group flex flex-col rounded-lg bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {iconMap[benefit.icon] || <Sparkles className="h-6 w-6" />}
            </div>
            <h3 className="font-serif text-lg font-medium text-foreground">
              {benefit.title}
            </h3>
            <p className="mt-2 flex-1 text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
