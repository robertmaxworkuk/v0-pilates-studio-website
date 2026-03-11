import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ImagePlaceholderProps {
  src?: string
  alt: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'video'
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
}

export function ImagePlaceholder({
  src,
  alt,
  aspectRatio = 'square',
  className,
  priority = false,
  fill = false,
  width,
  height,
}: ImagePlaceholderProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    video: 'aspect-video',
  }

  // If no src provided, show a placeholder div
  if (!src) {
    return (
      <div
        className={cn(
          'bg-muted flex items-center justify-center overflow-hidden',
          aspectRatioClasses[aspectRatio],
          className
        )}
        aria-label={alt}
      >
        <div className="text-muted-foreground text-sm text-center px-4">
          {alt}
        </div>
      </div>
    )
  }

  if (fill) {
    return (
      <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio], className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      priority={priority}
      className={cn('object-cover', className)}
    />
  )
}
