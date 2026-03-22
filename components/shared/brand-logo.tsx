import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  compact?: boolean
  light?: boolean
}

export function BrandLogo({ className, compact = false, light = false }: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center', compact ? 'gap-2' : 'gap-3', className)}>
      <span
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] border shadow-lg transition-transform duration-300 group-hover:scale-[1.03]',
          compact ? 'h-9 w-9 rounded-xl text-lg' : 'h-11 w-11 text-xl',
          light
            ? 'border-white/15 bg-white/10 text-white shadow-black/20'
            : 'border-primary/15 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground shadow-primary/20'
        )}
      >
        <span className="absolute inset-x-1 top-1 h-1/2 rounded-full bg-white/20 blur-md" />
        <span className="relative font-sans text-[1.05em] font-bold tracking-[-0.06em]">P</span>
      </span>

      <span
        className={cn(
          'font-sans font-semibold tracking-[0.18em] uppercase leading-none',
          compact ? 'text-[0.95rem]' : 'text-[1.05rem] md:text-[1.2rem]',
          light ? 'text-white' : 'text-foreground'
        )}
      >
        <span className="-ml-1 inline-block">ilatta</span>
      </span>
    </span>
  )
}
