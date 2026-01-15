import { cn } from '@/lib/utils'
import { Body, Small } from './typography'

interface EntityBlockProps {
  data: Record<string, string>
  variant?: 'default' | 'dark' | 'highlight'
  layout?: 'grid' | 'list'
  className?: string
}

export function EntityBlock({
  data,
  variant = 'default',
  layout = 'grid',
  className,
}: EntityBlockProps) {
  const entries = Object.entries(data)

  return (
    <div
      className={cn(
        'rounded-lg p-6 font-mono',
        variant === 'default' && 'bg-accent border',
        variant === 'dark' && 'bg-midnight-navy text-white',
        variant === 'highlight' && 'bg-brass-gold/10 border border-brass-gold/30',
        layout === 'grid' && 'grid grid-cols-2 gap-4',
        layout === 'list' && 'space-y-3',
        className
      )}
    >
      {entries.map(([key, value]) => (
        <div
          key={key}
          className={cn(
            layout === 'list' && 'flex justify-between items-start gap-4'
          )}
        >
          <Small
            className={cn(
              'uppercase tracking-wide',
              variant === 'dark' ? 'text-stone-gray/70' : 'text-muted-foreground'
            )}
          >
            {key}
          </Small>
          <Body
            className={cn(
              'text-sm font-medium',
              layout === 'list' && 'text-right',
              variant === 'dark' ? 'text-brass-gold' : 'text-foreground'
            )}
          >
            {value}
          </Body>
        </div>
      ))}
    </div>
  )
}
