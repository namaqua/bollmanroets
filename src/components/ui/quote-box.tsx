import { cn } from '@/lib/utils'
import { Body, Small } from './typography'

interface QuoteBoxProps {
  quote: string
  attribution?: string
  className?: string
  variant?: 'default' | 'highlight' | 'subtle' | 'centered'
}

export function QuoteBox({
  quote,
  attribution,
  className,
  variant = 'default',
}: QuoteBoxProps) {
  if (variant === 'centered') {
    return (
      <blockquote
        className={cn(
          'text-center py-6 px-8 bg-brass-gold/5 border border-brass-gold/20 rounded-lg',
          className
        )}
      >
        <Body className="text-lg text-foreground italic">
          "{quote}"
        </Body>
        {attribution && (
          <footer className="mt-4">
            <Small className="text-muted-foreground not-italic font-medium">
              — {attribution}
            </Small>
          </footer>
        )}
      </blockquote>
    )
  }

  return (
    <blockquote
      className={cn(
        'relative pl-6 py-4',
        'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full',
        variant === 'default' && 'before:bg-brass-gold bg-accent/30',
        variant === 'highlight' && 'before:bg-brass-gold bg-brass-gold/10 border border-brass-gold/20 rounded-lg px-6',
        variant === 'subtle' && 'before:bg-border bg-transparent',
        className
      )}
    >
      <Body className="text-foreground italic">
        "{quote}"
      </Body>
      {attribution && (
        <footer className="mt-3">
          <Small className="text-muted-foreground not-italic">
            — {attribution}
          </Small>
        </footer>
      )}
    </blockquote>
  )
}
