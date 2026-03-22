import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-4 md:text-xl text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  )
}
