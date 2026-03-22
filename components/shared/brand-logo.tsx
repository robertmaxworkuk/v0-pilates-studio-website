import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  compact?: boolean
  light?: boolean
}

export function BrandLogo({ className, compact = false, light = false }: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center', compact ? 'gap-0' : 'gap-0.5', className)}>
      <span
        className={cn(
          'relative z-10 inline-flex shrink-0 items-center justify-center overflow-hidden border shadow-lg transition-transform duration-300 group-hover:scale-[1.03]',
          compact ? 'h-9 w-9 rounded-[1.1rem]' : 'h-11 w-11 rounded-[1.35rem]',
          light
            ? 'border-white/15 bg-white/12 text-white shadow-black/20'
            : 'border-primary/15 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground shadow-primary/20'
        )}
      >
        <span className="absolute inset-x-1 top-1 h-1/2 rounded-full bg-white/20 blur-md" />
        <span className={cn('relative font-serif font-semibold tracking-[-0.08em]', compact ? 'text-lg' : 'text-[1.4rem]')}>
          P
        </span>
        <span
          className={cn(
            'absolute rounded-full border',
            compact ? 'right-1.5 top-1.5 h-1.5 w-1.5' : 'right-2 top-2 h-2 w-2',
            light ? 'border-white/25 bg-white/70' : 'border-white/50 bg-white/80'
          )}
        />
      </span>

      <span
        className={cn(
          'relative inline-flex items-center overflow-hidden border backdrop-blur-sm',
          compact
            ? '-ml-2 rounded-full px-3.5 py-1 pl-4.5'
            : '-ml-2.5 rounded-full px-4.5 py-1.5 pl-5.5 md:px-5 md:pl-6',
          light
            ? 'border-white/12 bg-white/8 text-white'
            : 'border-border/60 bg-background/80 text-foreground'
        )}
      >
        <span
          className={cn(
            'absolute inset-y-0 left-0 w-8 bg-gradient-to-r opacity-90',
            light ? 'from-white/14 to-transparent' : 'from-primary/12 to-transparent'
          )}
        />
        <span
          className={cn(
            'relative font-sans font-semibold uppercase leading-none tracking-[0.22em]',
            compact ? 'text-[0.85rem]' : 'text-[0.95rem] md:text-[1.05rem]',
            light ? 'text-white' : 'text-foreground'
          )}
        >
          ilatta
        </span>
        <span
          className={cn(
            'absolute bottom-1.5 left-5 right-4 h-px rounded-full',
            light ? 'bg-gradient-to-r from-white/0 via-white/50 to-white/0' : 'bg-gradient-to-r from-primary/0 via-primary/45 to-primary/0'
          )}
        />
      </span>
    </span>
  )
}
