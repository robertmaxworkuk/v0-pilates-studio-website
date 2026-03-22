import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  compact?: boolean
  light?: boolean
}

export function BrandLogo({ className, compact = false, light = false }: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center', compact ? 'gap-1' : 'gap-1.5', className)}>
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

      <span className="relative inline-flex items-center">
        <span
          className={cn(
            'pointer-events-none absolute top-1/2 h-px -translate-y-1/2 rounded-full opacity-70',
            compact ? '-left-2 w-3.5' : '-left-3 w-5',
            light
              ? 'bg-gradient-to-r from-white/0 via-white/75 to-white/10'
              : 'bg-gradient-to-r from-primary/0 via-primary/65 to-primary/5'
          )}
        />
        <span
          className={cn(
            'inline-block font-serif font-bold leading-none tracking-[0.03em]',
            compact ? '-ml-2 text-[1.02rem]' : '-ml-2.5 text-[1.18rem] md:text-[1.32rem]',
            light ? 'text-white' : 'text-foreground'
          )}
        >
          ilatta
        </span>
      </span>
    </span>
  )
}
