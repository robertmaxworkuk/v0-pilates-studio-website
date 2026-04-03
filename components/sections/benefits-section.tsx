'use client'

import { motion } from 'framer-motion'
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
import { cn } from '@/lib/utils'

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
        title="Преимущества Pilatta"
        subtitle="Метод, который трансформирует тело и улучшает качество жизни"
      />

      <motion.div 
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className={cn(
              'group relative flex h-full flex-col rounded-[1.5rem] border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 sm:rounded-2xl lg:p-8',
              /* Настройка Bento Grid: чередование размеров карточек на десктопе */
              index === 0 || index === 3 ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
            )}
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 sm:rounded-2xl" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground sm:mb-5 lg:h-14 lg:w-14">
                {iconMap[benefit.icon] || <Sparkles className="h-6 w-6" />}
              </div>
              <h3 className="font-serif text-lg font-semibold leading-tight text-foreground sm:text-xl lg:text-2xl">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base flex-grow">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
