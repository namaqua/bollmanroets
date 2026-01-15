import { cn } from '@/lib/utils'
import { Card, CardContent } from './card'
import { H3, Small } from './typography'
import { CheckIcon } from './icons'

interface ComparisonColumn {
  title: string
  highlight: boolean
  points: readonly string[]
}

interface ComparisonGridProps {
  columns: readonly ComparisonColumn[]
  className?: string
}

export function ComparisonGrid({ columns, className }: ComparisonGridProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-3', className)}>
      {columns.map((column, index) => (
        <Card
          key={index}
          className={cn(
            'h-full transition-all',
            column.highlight
              ? 'border-brass-gold bg-brass-gold/5 shadow-lg ring-2 ring-brass-gold/20'
              : 'hover:border-muted-foreground/30'
          )}
        >
          <CardContent className="p-6">
            <H3 className={cn(
              'text-lg text-center mb-6 pb-4 border-b',
              column.highlight ? 'text-brass-gold border-brass-gold/30' : 'border-border'
            )}>
              {column.title}
            </H3>
            <ul className="space-y-3">
              {column.points.map((point, pointIndex) => (
                <li key={pointIndex} className="flex items-start gap-3">
                  <div className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                    column.highlight
                      ? 'bg-brass-gold text-white'
                      : 'bg-muted-foreground/20 text-muted-foreground'
                  )}>
                    <CheckIcon size={12} />
                  </div>
                  <Small className={cn(
                    column.highlight ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}>
                    {point}
                  </Small>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
