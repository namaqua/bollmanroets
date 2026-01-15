import { cn } from '@/lib/utils'
import { Card, CardContent } from './card'
import { Body, Small } from './typography'

interface TractionMetric {
  label: string
  value: string
  description?: string
}

interface TractionMetricsProps {
  metrics: TractionMetric[]
  columns?: 2 | 3 | 4 | 5
  variant?: 'default' | 'compact' | 'highlight'
  className?: string
}

export function TractionMetrics({
  metrics,
  columns = 3,
  variant = 'default',
  className,
}: TractionMetricsProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-2 sm:grid-cols-4',
        columns === 5 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
        className
      )}
    >
      {metrics.map((metric, index) => (
        <TractionCard
          key={index}
          metric={metric}
          variant={variant}
        />
      ))}
    </div>
  )
}

interface TractionCardProps {
  metric: TractionMetric
  variant?: 'default' | 'compact' | 'highlight'
  className?: string
}

export function TractionCard({
  metric,
  variant = 'default',
  className,
}: TractionCardProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex justify-between items-center py-2', className)}>
        <Small className="text-muted-foreground">{metric.label}</Small>
        <Body className="font-medium">{metric.value}</Body>
      </div>
    )
  }

  return (
    <Card className={cn(
      variant === 'highlight' && 'border-brass-gold/30 bg-brass-gold/5',
      className
    )}>
      <CardContent className={cn(
        variant === 'default' && 'p-4',
        variant === 'highlight' && 'p-4'
      )}>
        <Small className="text-muted-foreground">{metric.label}</Small>
        <Body className={cn(
          'font-medium',
          variant === 'highlight' && 'text-brass-gold'
        )}>
          {metric.value}
        </Body>
        {metric.description && (
          <Small className="text-muted-foreground/70 mt-1 block">
            {metric.description}
          </Small>
        )}
      </CardContent>
    </Card>
  )
}

interface TractionSummaryProps {
  status: string
  pipeline: string
  partnerInterest: string
  team: string
  runway: string
  labels?: {
    status?: string
    pipeline?: string
    partnerInterest?: string
    team?: string
    runway?: string
  }
  className?: string
}

export function TractionSummary({
  status,
  pipeline,
  partnerInterest,
  team,
  runway,
  labels = {},
  className,
}: TractionSummaryProps) {
  const metrics: TractionMetric[] = [
    { label: labels.status || 'Status', value: status },
    { label: labels.pipeline || 'Pipeline', value: pipeline },
    { label: labels.partnerInterest || 'Partner Interest', value: partnerInterest },
    { label: labels.team || 'Team', value: team },
    { label: labels.runway || 'Runway', value: runway },
  ]

  return <TractionMetrics metrics={metrics} columns={5} className={className} />
}
