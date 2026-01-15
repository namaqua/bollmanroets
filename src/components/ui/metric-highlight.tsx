import { cn } from '@/lib/utils'
import { Body, Small } from './typography'

interface MetricHighlightProps {
  label: string
  value: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  variant?: 'default' | 'positive' | 'negative' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MetricHighlight({
  label,
  value,
  trend,
  trendValue,
  variant = 'default',
  size = 'md',
  className,
}: MetricHighlightProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        size === 'sm' && 'gap-0.5',
        size === 'md' && 'gap-1',
        size === 'lg' && 'gap-2',
        className
      )}
    >
      <Small className="text-muted-foreground">{label}</Small>
      <div className="flex items-baseline gap-2">
        <Body
          className={cn(
            'font-bold',
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-2xl',
            size === 'lg' && 'text-4xl',
            variant === 'default' && 'text-foreground',
            variant === 'positive' && 'text-green-600',
            variant === 'negative' && 'text-destructive',
            variant === 'warning' && 'text-amber-600'
          )}
        >
          {value}
        </Body>
        {trend && trendValue && (
          <span
            className={cn(
              'text-sm font-medium',
              trend === 'up' && 'text-green-600',
              trend === 'down' && 'text-destructive',
              trend === 'neutral' && 'text-muted-foreground'
            )}
          >
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trendValue}
          </span>
        )}
      </div>
    </div>
  )
}

interface MetricGridProps {
  metrics: Array<{
    label: string
    value: string
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: string
    variant?: 'default' | 'positive' | 'negative' | 'warning'
  }>
  columns?: 2 | 3 | 4
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MetricGrid({
  metrics,
  columns = 3,
  size = 'md',
  className,
}: MetricGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        columns === 2 && 'grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-3',
        columns === 4 && 'grid-cols-2 sm:grid-cols-4',
        className
      )}
    >
      {metrics.map((metric, index) => (
        <MetricHighlight
          key={index}
          label={metric.label}
          value={metric.value}
          trend={metric.trend}
          trendValue={metric.trendValue}
          variant={metric.variant}
          size={size}
        />
      ))}
    </div>
  )
}
