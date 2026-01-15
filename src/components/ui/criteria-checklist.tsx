import { cn } from '@/lib/utils'
import { Body } from './typography'
import { CheckIcon } from './icons'

interface CriteriaChecklistProps {
  items: readonly string[]
  variant?: 'default' | 'compact' | 'card'
  className?: string
}

export function CriteriaChecklist({
  items,
  variant = 'default',
  className,
}: CriteriaChecklistProps) {
  return (
    <ul
      className={cn(
        variant === 'default' && 'space-y-3',
        variant === 'compact' && 'space-y-2',
        variant === 'card' && 'space-y-0 divide-y',
        className
      )}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(
            'flex items-start gap-3',
            variant === 'card' && 'py-3 first:pt-0 last:pb-0'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center flex-shrink-0 rounded-full',
              variant === 'default' && 'w-5 h-5 mt-0.5 bg-brass-gold/10',
              variant === 'compact' && 'w-4 h-4 mt-0.5 bg-brass-gold/10',
              variant === 'card' && 'w-6 h-6 bg-brass-gold/20'
            )}
          >
            <CheckIcon
              size={variant === 'compact' ? 10 : 12}
              className="text-brass-gold"
            />
          </div>
          <Body
            className={cn(
              'text-muted-foreground',
              variant === 'compact' && 'text-sm'
            )}
          >
            {item}
          </Body>
        </li>
      ))}
    </ul>
  )
}
